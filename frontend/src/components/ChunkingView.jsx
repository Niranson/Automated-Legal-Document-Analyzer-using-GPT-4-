import React, { useState } from 'react';
import { Split, Layers, Sparkles, ArrowDown, ArrowRight, CheckCircle2, Sliders, RefreshCw } from 'lucide-react';
import { chunkAnalyze } from '../api';

export default function ChunkingView({ documentText, apiKey, modelName }) {
  const [chunkSize, setChunkSize] = useState(250);
  const [overlap, setOverlap] = useState(30);
  const [chunkData, setChunkData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeChunkTab, setActiveChunkTab] = useState(0);

  const handleRunChunking = async () => {
    if (!documentText.trim()) return;
    setLoading(true);
    try {
      const res = await chunkAnalyze(documentText, chunkSize, overlap, apiKey, modelName);
      setChunkData(res);
      setActiveChunkTab(0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Educational Header (Section 9) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Split className="w-4 h-4 text-cyan-400" />
              <span>Section 9: Chunking Long Legal Documents</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Long agreements exceed context limits or lose detail. The system divides text into chunks, performs localized GPT-4 analysis, and combines results.
            </p>
          </div>

          <button
            onClick={handleRunChunking}
            disabled={loading || !documentText.trim()}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
              loading || !documentText.trim()
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md active:scale-95'
            }`}
          >
            {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-cyan-300" />}
            <span>{loading ? 'Processing Chunks...' : 'Run Chunking Pipeline'}</span>
          </button>
        </div>

        {/* Chunking Parameters Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-800">
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Target Chunk Size:</span>
              <span className="font-mono text-cyan-400 font-bold">{chunkSize} words / chunk</span>
            </div>
            <input
              type="range"
              min="150"
              max="600"
              step="50"
              value={chunkSize}
              onChange={(e) => setChunkSize(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Chunk Boundary Overlap:</span>
              <span className="font-mono text-indigo-400 font-bold">{overlap} words overlap</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              step="10"
              value={overlap}
              onChange={(e) => setOverlap(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Visual Chunk Architecture Diagram (Matching Page 5 Diagram) */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 text-center">
        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-3">
          Lab Flow Diagram Representation
        </span>
        <div className="inline-flex flex-col items-center max-w-sm w-full mx-auto text-xs">
          <div className="px-4 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 font-medium w-full">
            Legal Document
          </div>
          <ArrowDown className="w-4 h-4 text-slate-600 my-1" />
          
          <div className="border border-cyan-500/30 rounded-lg bg-cyan-950/20 p-2 w-full space-y-1">
            <div className="text-[10px] text-cyan-400 font-semibold mb-1">
              Divided into Smaller Sections ({chunkData ? chunkData.chunk_count : 'N'} Chunks)
            </div>
            <div className="grid grid-cols-4 gap-1 text-[10px] font-mono">
              <span className="bg-slate-900 p-1 rounded border border-slate-800 text-slate-300">Chunk 1</span>
              <span className="bg-slate-900 p-1 rounded border border-slate-800 text-slate-300">Chunk 2</span>
              <span className="bg-slate-900 p-1 rounded border border-slate-800 text-slate-300">Chunk 3</span>
              <span className="bg-slate-900 p-1 rounded border border-slate-800 text-slate-300">Chunk 4...</span>
            </div>
          </div>

          <ArrowDown className="w-4 h-4 text-slate-600 my-1" />
          <div className="px-4 py-1.5 bg-indigo-950/50 border border-indigo-700/50 rounded-lg text-indigo-300 font-medium w-full flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>GPT-4 Parallel Chunk Analysis</span>
          </div>

          <ArrowDown className="w-4 h-4 text-slate-600 my-1" />
          <div className="px-4 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 font-medium w-full">
            Combine Results
          </div>

          <ArrowDown className="w-4 h-4 text-slate-600 my-1" />
          <div className="px-4 py-2 bg-gradient-to-r from-blue-900/60 to-cyan-900/60 border border-cyan-500/40 rounded-lg text-cyan-200 font-bold w-full shadow-lg">
            Final Structured Summary
          </div>
        </div>
      </div>

      {/* Chunk Results Explorer */}
      {chunkData ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Discovered {chunkData.chunk_count} Chunks
            </h4>
            <span className="text-[11px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Map-Reduce Aggregation Complete</span>
            </span>
          </div>

          {/* Chunk Selector Tabs */}
          <div className="flex overflow-x-auto gap-2 pb-2">
            {chunkData.chunks.map((c, idx) => (
              <button
                key={c.chunk_id}
                onClick={() => setActiveChunkTab(idx)}
                className={`text-xs px-3.5 py-2 rounded-lg font-mono font-medium whitespace-nowrap transition border ${
                  activeChunkTab === idx
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                Chunk {c.chunk_id} ({c.word_count}w)
              </button>
            ))}
          </div>

          {/* Active Chunk Details */}
          {chunkData.chunks[activeChunkTab] && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-white text-sm">
                    {chunkData.chunks[activeChunkTab].title} Details
                  </h5>
                  <p className="text-[11px] text-slate-400">
                    {chunkData.chunks[activeChunkTab].word_count} words • ~{chunkData.chunks[activeChunkTab].estimated_tokens} tokens
                  </p>
                </div>
                <div className="flex gap-1.5">
                  {chunkData.chunks[activeChunkTab].detected_clauses.map((clause, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                      {clause}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-1">Local Chunk Summary:</span>
                <p className="text-xs text-slate-200 bg-slate-950 p-3 rounded-lg border border-slate-800 leading-relaxed">
                  {chunkData.chunks[activeChunkTab].chunk_summary}
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-1">Extracted Obligations in this Section:</span>
                <div className="space-y-1.5">
                  {chunkData.chunks[activeChunkTab].detected_obligations.length > 0 ? (
                    chunkData.chunks[activeChunkTab].detected_obligations.map((ob, i) => (
                      <div key={i} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-950/60 p-2 rounded border border-slate-800/80">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{ob}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500 italic">No specific obligations in this chunk.</p>
                  )}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-1">Original Text Excerpt:</span>
                <pre className="text-[11px] font-mono text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800 whitespace-pre-wrap max-h-36 overflow-y-auto">
                  {chunkData.chunks[activeChunkTab].text_preview}
                </pre>
              </div>
            </div>
          )}

          {/* Final Combined Results */}
          <div className="bg-gradient-to-r from-blue-950/40 to-slate-900 border border-blue-800/40 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h5 className="font-bold text-white text-sm">Combined Final Synthesis (Map-Reduce Result)</h5>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/70 p-3.5 rounded-lg border border-blue-900/30">
              {chunkData.final_analysis?.summary}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 bg-slate-900/40 border border-slate-800 rounded-xl">
          <Split className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <p className="text-xs text-slate-400">
            Click <strong>"Run Chunking Pipeline"</strong> to test how long legal agreements are divided into sections and analyzed per Section 9.
          </p>
        </div>
      )}
    </div>
  );
}
