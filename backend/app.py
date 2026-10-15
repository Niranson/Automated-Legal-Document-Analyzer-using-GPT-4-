"""
FastAPI Backend Application for Experiment 5:
Automated Legal Document Analyzer using GPT-4
Course: 24CS2506 – Building Applications using GPT-4
"""

import os
from pathlib import Path
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel

from samples import SAMPLES
from extractor import extract_document_text, preprocess_legal_text
from chunker import chunk_document
from analyzer import (
    analyze_legal_document,
    answer_contract_question,
    build_legal_prompt,
    format_recommended_output
)

app = FastAPI(
    title="Automated Legal Document Analyzer using GPT-4",
    description="Full-featured API for Experiment 5: 24CS2506 Building Applications using GPT-4",
    version="1.0.0"
)

# Enable CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Models
class AnalyzeRequest(BaseModel):
    document_text: str
    api_key: Optional[str] = None
    model_name: Optional[str] = "gpt-4o"
    custom_instructions: Optional[str] = None

class ChunkAnalyzeRequest(BaseModel):
    document_text: str
    chunk_size_words: Optional[int] = 300
    overlap_words: Optional[int] = 40
    api_key: Optional[str] = None
    model_name: Optional[str] = "gpt-4o"

class ChatRequest(BaseModel):
    document_text: str
    question: str
    api_key: Optional[str] = None
    model_name: Optional[str] = "gpt-4o"

class PreprocessRequest(BaseModel):
    text: str

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "Automated Legal Document Analyzer using GPT-4",
        "course": "24CS2506 – Building Applications using GPT-4",
        "experiment": "Experiment 5",
        "openai_env_key_set": bool(os.getenv("OPENAI_API_KEY"))
    }

@app.get("/api/samples")
async def get_samples():
    """Returns catalog of pre-loaded sample legal documents."""
    return SAMPLES

@app.post("/api/upload")
async def upload_document(file: UploadFile = File(...)):
    """Extracts text from uploaded PDF, DOCX, or TXT file."""
    try:
        content = await file.read()
        extracted_text = extract_document_text(file.filename, content)
        if not extracted_text.strip():
            raise HTTPException(status_code=400, detail="Could not extract readable text from the uploaded file.")
        
        preprocessed = preprocess_legal_text(extracted_text)
        return {
            "filename": file.filename,
            "text": extracted_text,
            "metrics": preprocessed
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File processing error: {str(e)}")

@app.post("/api/preprocess")
async def preprocess_endpoint(req: PreprocessRequest):
    """Calculates document metrics, detects contract type, and finds clauses."""
    metrics = preprocess_legal_text(req.text)
    return metrics

@app.post("/api/analyze")
async def analyze_endpoint(req: AnalyzeRequest):
    """
    Primary analysis endpoint implementing Section 5 & 6.
    Generates structured analysis, extractive & abstractive summaries, and key clauses.
    """
    if not req.document_text.strip():
        raise HTTPException(status_code=400, detail="Document text is required.")
        
    result = await analyze_legal_document(
        document_text=req.document_text,
        api_key=req.api_key,
        model_name=req.model_name or "gpt-4o",
        custom_instructions=req.custom_instructions
    )
    return result

@app.post("/api/chunk-analyze")
async def chunk_analyze_endpoint(req: ChunkAnalyzeRequest):
    """
    Directly demonstrates Section 9: Chunking Long Documents.
    Divides text into chunks, provides per-chunk analysis, and combines them.
    """
    if not req.document_text.strip():
        raise HTTPException(status_code=400, detail="Document text is required.")
        
    chunks = chunk_document(
        text=req.document_text,
        chunk_size_words=req.chunk_size_words or 300,
        overlap_words=req.overlap_words or 40
    )
    
    # Process each chunk individually
    chunk_results = []
    combined_obligations = []
    combined_dates = []
    combined_clauses = []
    
    for c in chunks:
        # Perform localized extraction on each chunk
        local_res = await analyze_legal_document(
            document_text=c["text"],
            api_key=req.api_key,
            model_name=req.model_name or "gpt-4o"
        )
        c_info = {
            "chunk_id": c["chunk_id"],
            "title": c["title"],
            "word_count": c["word_count"],
            "estimated_tokens": c["estimated_tokens"],
            "text_preview": c["text"][:140] + "...",
            "chunk_summary": local_res.get("summary", ""),
            "detected_obligations": local_res.get("key_obligations", []),
            "detected_clauses": [cl.get("clause_name") for cl in local_res.get("clauses", []) if isinstance(cl, dict)]
        }
        chunk_results.append(c_info)
        
        for ob in local_res.get("key_obligations", []):
            if ob not in combined_obligations:
                combined_obligations.append(ob)
        for dt in local_res.get("important_dates", []):
            if dt not in combined_dates:
                combined_dates.append(dt)
        for cl in local_res.get("clauses", []):
            combined_clauses.append(cl)

    # Global synthesis (Combined Results -> Final Summary)
    overall_analysis = await analyze_legal_document(
        document_text=req.document_text,
        api_key=req.api_key,
        model_name=req.model_name or "gpt-4o"
    )

    return {
        "chunk_count": len(chunks),
        "chunk_size_words": req.chunk_size_words,
        "overlap_words": req.overlap_words,
        "chunks": chunk_results,
        "final_analysis": overall_analysis,
        "workflow_step": "Map-Reduce Chunk Synthesis Complete"
    }

@app.post("/api/chat")
async def chat_endpoint(req: ChatRequest):
    """Answers specific questions about the analyzed legal contract."""
    if not req.document_text.strip() or not req.question.strip():
        raise HTTPException(status_code=400, detail="Both document text and question are required.")
        
    answer_res = await answer_contract_question(
        document_text=req.document_text,
        question=req.question,
        api_key=req.api_key,
        model_name=req.model_name or "gpt-4o"
    )
    return answer_res

# Serve static build of frontend if present
FRONTEND_DIST = Path(__file__).resolve().parent.parent / "frontend" / "dist"
if FRONTEND_DIST.exists():
    app.mount("/assets", StaticFiles(directory=str(FRONTEND_DIST / "assets")), name="assets")
    
    @app.get("/")
    async def serve_index():
        return FileResponse(FRONTEND_DIST / "index.html")

    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        file_path = FRONTEND_DIST / full_path
        if file_path.is_file():
            return FileResponse(file_path)
        return FileResponse(FRONTEND_DIST / "index.html")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
