/**
 * API client communicating with FastAPI backend.
 */

const API_BASE = '/api';

export async function fetchHealth() {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) throw new Error('Backend health check failed');
  return res.json();
}

export async function fetchSamples() {
  const res = await fetch(`${API_BASE}/samples`);
  if (!res.ok) throw new Error('Failed to load sample legal documents');
  return res.json();
}

export async function uploadDocument(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Upload failed' }));
    throw new Error(err.detail || 'Upload failed');
  }
  return res.json();
}

export async function preprocessText(text) {
  const res = await fetch(`${API_BASE}/preprocess`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error('Text preprocessing failed');
  return res.json();
}

export async function analyzeDocument(documentText, apiKey = '', modelName = 'gpt-4o', customInstructions = '') {
  const res = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      document_text: documentText,
      api_key: apiKey || null,
      model_name: modelName,
      custom_instructions: customInstructions || null,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Analysis failed' }));
    throw new Error(err.detail || 'Analysis request failed');
  }
  return res.json();
}

export async function chunkAnalyze(documentText, chunkSizeWords = 300, overlapWords = 40, apiKey = '', modelName = 'gpt-4o') {
  const res = await fetch(`${API_BASE}/chunk-analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      document_text: documentText,
      chunk_size_words: chunkSizeWords,
      overlap_words: overlapWords,
      api_key: apiKey || null,
      model_name: modelName,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Chunk analysis failed' }));
    throw new Error(err.detail || 'Chunk analysis request failed');
  }
  return res.json();
}

export async function askQuestion(documentText, question, apiKey = '', modelName = 'gpt-4o') {
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      document_text: documentText,
      question,
      api_key: apiKey || null,
      model_name: modelName,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Question failed' }));
    throw new Error(err.detail || 'Question processing failed');
  }
  return res.json();
}
