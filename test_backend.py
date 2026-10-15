"""
Verification test for backend modules.
"""

import sys
from pathlib import Path

# Add backend to path
sys.path.insert(0, str(Path(__file__).resolve().parent / "backend"))

from samples import SAMPLES
from extractor import preprocess_legal_text
from chunker import chunk_document
from analyzer import run_intelligent_offline_analysis, format_recommended_output, build_legal_prompt

def test_samples():
    assert len(SAMPLES) >= 5, "Should have at least 5 sample documents"
    for key in ["employment", "nda", "service", "rental", "sales"]:
        assert key in SAMPLES, f"Missing sample: {key}"
        assert len(SAMPLES[key]["content"]) > 100, f"Sample {key} content is too short"
    print("PASS: Samples verification")

def test_preprocessing():
    emp = SAMPLES["employment"]["content"]
    res = preprocess_legal_text(emp)
    assert res["word_count"] > 100
    assert "Employment" in res["detected_doc_type"]
    assert res["detected_clause_count"] > 3
    print(f"PASS: Preprocessing (words: {res['word_count']}, doc_type: {res['detected_doc_type']}, clauses: {res['detected_clause_count']})")

def test_chunking():
    emp = SAMPLES["employment"]["content"]
    chunks = chunk_document(emp, chunk_size_words=150, overlap_words=25)
    assert len(chunks) > 1, "Document should be chunked into multiple pieces"
    print(f"PASS: Chunking (split into {len(chunks)} chunks)")

def test_analysis():
    emp = SAMPLES["employment"]["content"]
    analysis = run_intelligent_offline_analysis(emp)
    assert analysis["document_type"] == "Employment Agreement"
    assert len(analysis["parties"]) >= 2
    assert len(analysis["clauses"]) >= 4
    assert len(analysis["extractive_highlights"]) >= 1
    assert len(analysis["summary"]) > 50
    
    formatted = format_recommended_output(analysis)
    assert "LEGAL DOCUMENT ANALYSIS" in formatted
    assert "Document Type:" in formatted
    assert "Parties:" in formatted
    assert "Key Obligations:" in formatted
    print("PASS: Analysis and Recommended Output Format")

def test_prompt_generation():
    emp = SAMPLES["employment"]["content"]
    prompt = build_legal_prompt(emp)
    assert "You are a legal document analysis assistant." in prompt
    assert "Analyze and summarize the provided document." in prompt
    assert "Use only information present in the document." in prompt
    assert "Do not invent facts." in prompt
    assert "Present the result using headings and bullet points." in prompt
    print("PASS: Prompt generation adheres strictly to Section 5")

if __name__ == "__main__":
    test_samples()
    test_preprocessing()
    test_chunking()
    test_analysis()
    test_prompt_generation()
    print("\nALL BACKEND TESTS PASSED SUCCESSFULLY!")
