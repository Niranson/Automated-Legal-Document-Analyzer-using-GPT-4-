"""
End-to-End API and Web Integration Tests for Legal Document Analyzer.
"""

import requests
import json

BASE_URL = "http://127.0.0.1:8000"

def test_web_ui():
    res = requests.get(f"{BASE_URL}/")
    assert res.status_code == 200, f"Frontend returned status {res.status_code}"
    assert "LexiPulse" in res.text or "<div id=\"root\">" in res.text
    print("PASS: Web UI served at / with code 200")

def test_api_health():
    res = requests.get(f"{BASE_URL}/api/health")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "healthy"
    assert "24CS2506" in data["course"]
    print("PASS: /api/health returned healthy status")

def test_api_samples():
    res = requests.get(f"{BASE_URL}/api/samples")
    assert res.status_code == 200
    samples = res.json()
    assert "employment" in samples
    assert "nda" in samples
    assert "service" in samples
    assert "rental" in samples
    assert "sales" in samples
    print(f"PASS: /api/samples returned {len(samples)} pre-loaded legal contracts")
    return samples

def test_api_analyze(sample_text):
    payload = {
        "document_text": sample_text,
        "model_name": "gpt-4o"
    }
    res = requests.post(f"{BASE_URL}/api/analyze", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert "document_type" in data
    assert "parties" in data
    assert "purpose" in data
    assert "key_obligations" in data
    assert "clauses" in data
    assert "summary" in data
    assert "recommended_format_text" in data
    assert "LEGAL DOCUMENT ANALYSIS" in data["recommended_format_text"]
    print("PASS: /api/analyze produced complete legal extraction and formatted output")
    print(f"       -> Document Type: {data['document_type']}")
    print(f"       -> Parties: {data['parties']}")
    print(f"       -> Clauses Found: {len(data['clauses'])}")

def test_api_chunk_analyze(sample_text):
    payload = {
        "document_text": sample_text,
        "chunk_size_words": 200,
        "overlap_words": 30
    }
    res = requests.post(f"{BASE_URL}/api/chunk-analyze", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["chunk_count"] > 1
    assert len(data["chunks"]) == data["chunk_count"]
    assert "final_analysis" in data
    print(f"PASS: /api/chunk-analyze sliced document into {data['chunk_count']} chunks and combined results")

def test_api_chat(sample_text):
    payload = {
        "document_text": sample_text,
        "question": "What is the notice period required for termination?"
    }
    res = requests.post(f"{BASE_URL}/api/chat", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert "answer" in data
    assert len(data["answer"]) > 10
    print(f"PASS: /api/chat answered question: '{data['answer'][:80]}...'")

if __name__ == "__main__":
    print("Testing End-to-End System...")
    test_web_ui()
    test_api_health()
    samples = test_api_samples()
    emp_text = samples["employment"]["content"]
    test_api_analyze(emp_text)
    test_api_chunk_analyze(emp_text)
    test_api_chat(emp_text)
    print("\nALL END-TO-END TESTS PASSED WITH 100% SUCCESS!")
