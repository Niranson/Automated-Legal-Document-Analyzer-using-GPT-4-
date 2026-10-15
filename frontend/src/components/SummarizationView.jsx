import React from 'react';
import { Layers, Sparkles, Quote, ArrowRight, BookOpen, CheckCircle, BarChart3, Clock } from 'lucide-react';

export default function SummarizationView({ analysis, originalText }) {
  if (!analysis) return null;

  const originalWords = originalText.trim() ? originalText.trim().split(/\s+/).length : 0;
  const abstractiveWords = (analysis.summary || '').trim().split(/\s+/).length;
  const compressionRatio = originalWords > 0 
    ? Math.round(((originalWords - abstractiveWords) / originalWords) * 100)
    : 0;
  const readingTimeOriginal = Math.ceil(originalWords / 200);
  const readingTimeSummary = Math.max(1, Math.ceil(abstractiveWords / 200));

  const extractiveSentences = Array.isArray(analysis.extractive_highlights) 
    ? analysis.extractive_highlights 
    : [];

  return (
    <div className="space-y-5">
      {/* Educational Concept Header matching Page 4 of the manual */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Experiment Concept: Extractive vs. Abstractive Summarization (Section 8)
          </h3>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Legal documents contain lengthy clauses and complex phrasing. While <span className="text-amber-300 font-semibold">Extractive Summarization</span> extracts verbatim key sentences directly from the source text, <span className="text-cyan-300 font-semibold">Abstractive Summarization</span> uses GPT-4's contextual intelligence to generate new, concise, plain-English text preserving vital legal rights and obligations.
        </p>

        {/* Compression & Reading Time Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-800">
          <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80">
            <span className="text-[10px] text-slate-500 uppercase block">Original Length</span>
            <span className="text-sm font-bold text-slate-200">{originalWords} words</span>
          </div>
          <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80">
            <span className="text-[10px] text-slate-500 uppercase block">Abstractive Length</span>
            <span className="text-sm font-bold text-cyan-400">{abstractiveWords} words</span>
          </div>
          <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80">
            <span className="text-[10px] text-slate-500 uppercase block">Compression Ratio</span>
            <span className="text-sm font-bold text-emerald-400">{compressionRatio}% shorter</span>
          </div>
          <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80">
            <span className="text-[10px] text-slate-500 uppercase block">Reading Time Saved</span>
            <span className="text-sm font-bold text-indigo-400">~{readingTimeOriginal - readingTimeSummary} min saved</span>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Abstractive Summarization Column */}
        <div className="bg-slate-900 border border-indigo-500/30 rounded-xl p-5 shadow-lg relative flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Abstractive Summarization</h4>
                  <p className="text-[10px] text-indigo-300">Generated using GPT-4 contextual synthesis</p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                AI Rewritten
              </span>
            </div>

            {/* Architecture diagram pill */}
            <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800 text-[11px] text-slate-400 font-mono mb-4 flex items-center justify-center gap-2">
              <span>Original Document</span>
              <ArrowRight className="w-3 h-3 text-indigo-400" />
              <span className="text-indigo-300">Understand Meaning</span>
              <ArrowRight className="w-3 h-3 text-indigo-400" />
              <span className="text-cyan-300">Generate New Text</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-sm text-slate-200 leading-relaxed">
              <p>{analysis.summary || 'Summary unavailable'}</p>
            </div>

            {/* Example snippet from Page 2 & 4 */}
            <div className="mt-4 p-3 bg-indigo-950/30 border border-indigo-800/40 rounded-lg text-xs space-y-1">
              <span className="text-[10px] font-semibold text-indigo-300 uppercase block">Lab Example Clarification:</span>
              <p className="text-slate-400 italic">
                "The employee shall maintain strict confidentiality regarding all proprietary information... &rarr; <span className="text-indigo-200 not-italic font-medium">The employee must keep company confidential information private and cannot disclose it without authorization."</span>
              </p>
            </div>
          </div>
        </div>

        {/* Extractive Summarization Column */}
        <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-5 shadow-lg relative flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Quote className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Extractive Summarization</h4>
                  <p className="text-[10px] text-amber-300">Key verbatim sentences selected directly from text</p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                Exact Source Quotes
              </span>
            </div>

            {/* Architecture diagram pill */}
            <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800 text-[11px] text-slate-400 font-mono mb-4 flex items-center justify-center gap-2">
              <span>Original Document</span>
              <ArrowRight className="w-3 h-3 text-amber-400" />
              <span className="text-amber-300">Important Sentences</span>
              <ArrowRight className="w-3 h-3 text-amber-400" />
              <span className="text-slate-200">Verbatim Summary</span>
            </div>

            <div className="space-y-2.5">
              {extractiveSentences.length > 0 ? (
                extractiveSentences.map((sent, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <blockquote className="italic border-l-2 border-amber-500/40 pl-2">
                      "{sent}"
                    </blockquote>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 italic p-3">No direct extractive highlights extracted yet.</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
