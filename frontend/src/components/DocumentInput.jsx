import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, Sparkles, Trash2, BookOpen, Clock, FileCheck, Layers } from 'lucide-react';
import { uploadDocument } from '../api';

export default function DocumentInput({
  documentText,
  setDocumentText,
  samples,
  metrics,
  onAnalyze,
  isAnalyzing,
  onSelectSample,
}) {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleFileUpload = async (file) => {
    if (!file) return;
    setIsUploading(true);
    setUploadError(null);
    try {
      const data = await uploadDocument(file);
      setDocumentText(data.text);
    } catch (err) {
      setUploadError(err.message || 'Error parsing document');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const wordCount = documentText.trim() ? documentText.trim().split(/\s+/).length : 0;
  const tokenEstimate = Math.round(wordCount * 1.33);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Top Bar: Sample Contracts Quick Selector */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>Load Sample Contract (Experiment 5 Catalog)</span>
          </label>
          <span className="text-[11px] text-slate-400">Click to autofill document</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {samples && Object.entries(samples).map(([key, item]) => (
            <button
              key={key}
              onClick={() => onSelectSample(key)}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 hover:border-indigo-500/50 text-slate-200 border border-slate-700/60 transition flex items-center gap-1.5 active:scale-95"
            >
              <FileCheck className="w-3 h-3 text-cyan-400" />
              <span>{item.type}</span>
            </button>
          ))}
        </div>
      </div>

      {/* File Drag and Drop or File Picker */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition ${
          dragActive
            ? 'border-indigo-500 bg-indigo-950/20'
            : 'border-slate-800 hover:border-slate-700 bg-slate-950/40'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.doc,.txt"
          onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
          className="hidden"
        />
        <div className="flex items-center justify-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="text-xs font-medium text-slate-200">
              {isUploading ? 'Extracting text from legal document...' : 'Upload Legal Document (PDF, DOCX, or TXT)'}
            </p>
            <p className="text-[11px] text-slate-500">
              Drag & drop files or click to browse. Text extraction runs automatically.
            </p>
          </div>
        </div>
        {uploadError && (
          <p className="text-xs text-rose-400 mt-2">{uploadError}</p>
        )}
      </div>

      {/* Text Area Input */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Legal Document Text</span>
            {metrics?.detected_doc_type && (
              <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-normal">
                Detected: {metrics.detected_doc_type}
              </span>
            )}
          </label>
          {documentText && (
            <button
              onClick={() => setDocumentText('')}
              className="text-[11px] text-slate-400 hover:text-rose-400 flex items-center gap-1 transition"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear Text</span>
            </button>
          )}
        </div>

        <textarea
          rows={11}
          value={documentText}
          onChange={(e) => setDocumentText(e.target.value)}
          placeholder="Paste agreement text here, upload a contract PDF/DOCX, or select one of the pre-loaded legal contracts above..."
          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 leading-relaxed resize-y"
        />

        {/* Live Counters & Metrics */}
        <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 mt-2 px-1 gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="text-slate-200 font-semibold">{wordCount}</span> words
            </span>
            <span className="flex items-center gap-1">
              ~<span className="text-slate-200 font-semibold">{tokenEstimate}</span> tokens
            </span>
            <span className="flex items-center gap-1">
              <span className="text-slate-200 font-semibold">{documentText.length}</span> characters
            </span>
            {metrics?.detected_clause_count > 0 && (
              <span className="flex items-center gap-1 text-cyan-400">
                <Layers className="w-3 h-3" />
                <span>{metrics.detected_clause_count} clauses found</span>
              </span>
            )}
          </div>

          <div className="text-slate-500 text-[10px]">
            {wordCount > 400 ? 'Chunking recommended for full coverage' : 'Single-pass prompt optimal'}
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <button
        onClick={onAnalyze}
        disabled={isAnalyzing || !documentText.trim()}
        className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2.5 transition shadow-lg ${
          isAnalyzing || !documentText.trim()
            ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/40'
            : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-blue-500/25 active:scale-[0.99]'
        }`}
      >
        {isAnalyzing ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Analyzing Document with GPT-4 Engine...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 text-cyan-200" />
            <span>Analyze Legal Document (Run Experiment 5)</span>
          </>
        )}
      </button>
    </div>
  );
}
