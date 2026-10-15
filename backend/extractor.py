"""
Document Text Extractor and Preprocessor for Legal Documents.
Supports PDF, DOCX, and TXT files, along with text cleaning and token counting.
Directly implements Section 6 & 9 of the lab guide:
Legal Document -> Text Extraction -> Document Preprocessing -> Section / Chunk Identification
"""

import io
import re
from typing import Dict, Any, List

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extract text from PDF using pypdf."""
    from pypdf import PdfReader
    reader = PdfReader(io.BytesIO(file_bytes))
    pages_text = []
    for idx, page in enumerate(reader.pages):
        text = page.extract_text() or ""
        pages_text.append(text)
    return "\n\n".join(pages_text).strip()

def extract_text_from_docx(file_bytes: bytes) -> str:
    """Extract text from DOCX using python-docx."""
    from docx import Document
    doc = Document(io.BytesIO(file_bytes))
    paragraphs = [p.text for p in doc.paragraphs if p.text.strip()]
    return "\n\n".join(paragraphs).strip()

def extract_text_from_txt(file_bytes: bytes) -> str:
    """Extract text from plain text file."""
    for encoding in ("utf-8", "latin-1", "windows-1252"):
        try:
            return file_bytes.decode(encoding).strip()
        except UnicodeDecodeError:
            continue
    return file_bytes.decode("utf-8", errors="replace").strip()

def extract_document_text(filename: str, file_bytes: bytes) -> str:
    """Unified file text extractor by extension."""
    ext = filename.lower().split(".")[-1] if "." in filename else ""
    if ext == "pdf":
        return extract_text_from_pdf(file_bytes)
    elif ext in ("docx", "doc"):
        return extract_text_from_docx(file_bytes)
    else:
        return extract_text_from_txt(file_bytes)

def preprocess_legal_text(raw_text: str) -> Dict[str, Any]:
    """
    Cleans, normalizes, and computes structural metrics for the legal document.
    """
    # Normalize carriage returns
    text = raw_text.replace("\r\n", "\n").replace("\r", "\n")
    
    # Strip excess multi-newlines
    text = re.sub(r'\n{3,}', '\n\n', text)
    
    # Basic word count and token estimation (~ 1 token per 0.75 words / 4 chars)
    words = text.split()
    word_count = len(words)
    estimated_tokens = int(word_count * 1.33)
    char_count = len(text)
    
    # Detect potential document type from header / first few hundred characters
    doc_type = detect_document_type(text)
    
    # Identify headings / clauses
    detected_clauses = identify_clauses(text)
    
    return {
        "cleaned_text": text,
        "word_count": word_count,
        "character_count": char_count,
        "estimated_tokens": estimated_tokens,
        "detected_doc_type": doc_type,
        "detected_clause_count": len(detected_clauses),
        "detected_clauses": detected_clauses
    }

def detect_document_type(text: str) -> str:
    """Heuristic identification of common legal document types (Page 1 of manual)."""
    t_lower = text[:1500].lower()
    if "employment" in t_lower or "employee" in t_lower and "employer" in t_lower:
        return "Employment Agreement"
    elif "non-disclosure" in t_lower or "nda" in t_lower or "confidential disclosure" in t_lower:
        return "Non-Disclosure Agreement (NDA)"
    elif "service agreement" in t_lower or "statement of work" in t_lower or "consulting agreement" in t_lower:
        return "Service Agreement"
    elif "lease" in t_lower or "rental" in t_lower or "tenant" in t_lower:
        return "Rental / Lease Agreement"
    elif "sales" in t_lower or "purchase agreement" in t_lower or "buyer" in t_lower and "seller" in t_lower:
        return "Sales Agreement"
    elif "loan" in t_lower or "borrower" in t_lower and "lender" in t_lower:
        return "Loan Agreement"
    elif "privacy policy" in t_lower:
        return "Privacy Policy"
    elif "terms and conditions" in t_lower or "terms of service" in t_lower:
        return "Terms and Conditions"
    elif "notice" in t_lower:
        return "Legal Notice"
    return "Business Contract / Legal Agreement"

def identify_clauses(text: str) -> List[Dict[str, Any]]:
    """Identifies standard contract sections and clauses for chunking / navigation."""
    patterns = [
        (r'(?i)\b(1?\d\.\s*(?:PURPOSE|APPOINTMENT|PREMISES|SCOPE)[^\n]*)', "Purpose / Scope"),
        (r'(?i)\b(1?\d\.\s*(?:TERM|DURATION|COMMENCEMENT)[^\n]*)', "Duration & Term"),
        (r'(?i)\b(1?\d\.\s*(?:COMPENSATION|PAYMENT|RENT|PURCHASE PRICE|FEES)[^\n]*)', "Payment Terms"),
        (r'(?i)\b(1?\d\.\s*(?:DUTIES|OBLIGATIONS|RESTRICTIONS)[^\n]*)', "Obligations & Duties"),
        (r'(?i)\b(1?\d\.\s*(?:CONFIDENTIALITY|PROPRIETARY)[^\n]*)', "Confidentiality"),
        (r'(?i)\b(1?\d\.\s*(?:INTELLECTUAL PROPERTY|IP RIGHTS|OWNERSHIP)[^\n]*)', "Intellectual Property"),
        (r'(?i)\b(1?\d\.\s*(?:TERMINATION|DEFAULT|CANCELLATION)[^\n]*)', "Termination Conditions"),
        (r'(?i)\b(1?\d\.\s*(?:INDEMNIFICATION|LIABILITY|LIMITATION OF LIABILITY)[^\n]*)', "Liability & Indemnification"),
        (r'(?i)\b(1?\d\.\s*(?:GOVERNING LAW|JURISDICTION|DISPUTE RESOLUTION)[^\n]*)', "Governing Law & Disputes"),
    ]
    
    clauses = []
    for pat, label in patterns:
        for match in re.finditer(pat, text):
            clauses.append({
                "title": match.group(0).strip(),
                "label": label,
                "position": match.start()
            })
            
    clauses.sort(key=lambda x: x["position"])
    return clauses
