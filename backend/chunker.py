"""
Chunking Pipeline for Long Legal Documents.
Directly implements Section 9 of Experiment 5:
Legal Document -> [Chunk 1, Chunk 2, Chunk 3, Chunk 4] -> GPT-4 Analysis -> Combine Results -> Final Summary.
"""

import re
from typing import List, Dict, Any

def chunk_document(text: str, chunk_size_words: int = 350, overlap_words: int = 50) -> List[Dict[str, Any]]:
    """
    Splits long legal document text into manageable, overlapping text chunks.
    Preserves paragraph or sentence boundaries where possible.
    """
    paragraphs = text.split("\n\n")
    chunks = []
    current_chunk_words: List[str] = []
    chunk_index = 1
    
    for para in paragraphs:
        p_words = para.split()
        if not p_words:
            continue
            
        if len(current_chunk_words) + len(p_words) <= chunk_size_words:
            current_chunk_words.extend(p_words)
        else:
            # If current chunk has words, finalize it
            if current_chunk_words:
                chunk_text = " ".join(current_chunk_words)
                chunks.append({
                    "chunk_id": chunk_index,
                    "title": f"Chunk {chunk_index}",
                    "text": chunk_text,
                    "word_count": len(current_chunk_words),
                    "estimated_tokens": int(len(current_chunk_words) * 1.33)
                })
                chunk_index += 1
                
                # Keep overlap words from the end of the current chunk
                if overlap_words > 0 and len(current_chunk_words) > overlap_words:
                    current_chunk_words = current_chunk_words[-overlap_words:] + p_words
                else:
                    current_chunk_words = p_words
            else:
                # A single paragraph is larger than chunk_size_words, split it by words
                for i in range(0, len(p_words), chunk_size_words - overlap_words):
                    sub_words = p_words[i:i + chunk_size_words]
                    chunk_text = " ".join(sub_words)
                    chunks.append({
                        "chunk_id": chunk_index,
                        "title": f"Chunk {chunk_index}",
                        "text": chunk_text,
                        "word_count": len(sub_words),
                        "estimated_tokens": int(len(sub_words) * 1.33)
                    })
                    chunk_index += 1
                current_chunk_words = []
                
    if current_chunk_words:
        chunk_text = " ".join(current_chunk_words)
        chunks.append({
            "chunk_id": chunk_index,
            "title": f"Chunk {chunk_index}",
            "text": chunk_text,
            "word_count": len(current_chunk_words),
            "estimated_tokens": int(len(current_chunk_words) * 1.33)
        })

    return chunks
