import React, { useState } from 'react';
import { MessageSquareCode, Copy, Check, ShieldCheck, Terminal, BookOpen, Layers } from 'lucide-react';

export default function PromptInspector({ analysis, documentText }) {
  const [copied, setCopied] = useState(false);

  const promptText = analysis?.generated_prompt || (
    `Role:\nYou are a legal document analysis assistant.\n\nTask:\nAnalyze and summarize the provided document.\n\nInformation to Extract:\nIdentify:\n- Parties\n- Purpose\n- Obligations\n- Payment terms\n- Duration\n- Termination\n- Important dates\n\nConstraint:\nUse only information present in the document.\nDo not invent facts.\n\nOutput Format:\nPresent the result using headings and bullet points.\n\nDocument Content:\n"""\n${documentText ? documentText.slice(0, 300) + '...' : '[Document Text]'}\n"""`
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const PROMPT_COMPONENTS = [
    {
      title: '1. Role',
      desc: 'Sets system identity and domain expertise.',
      example: 'You are a legal document analysis assistant.',
      color: 'border-blue-500/30 bg-blue-950/20 text-blue-300'
    },
    {
      title: '2. Task',
      desc: 'Defines the primary analytical objective.',
      example: 'Analyze and summarize the provided document.',
      color: 'border-indigo-500/30 bg-indigo-950/20 text-indigo-300'
    },
    {
      title: '3. Information to Extract',
      desc: 'Explicit list of target legal entities & clauses.',
      example: 'Parties, Purpose, Obligations, Payment terms, Duration, Termination, Important dates.',
      color: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-300'
    },
    {
      title: '4. Constraint',
      desc: 'Prevents AI hallucinations and fabrications.',
      example: 'Use only information present in the document. Do not invent facts.',
      color: 'border-rose-500/30 bg-rose-950/20 text-rose-300'
    },
    {
      title: '5. Output Format',
      desc: 'Standardizes presentation and layout for human reading or JSON schema.',
      example: 'Present the result using headings and bullet points.',
      color: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <MessageSquareCode className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Prompt Engineering Architecture (Section 5)
            </h3>
          </div>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Prompt' : 'Copy Full Prompt'}</span>
          </button>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          The lab manual specifies 5 essential components for prompting GPT-4 in legal analysis to guarantee factual accuracy and standardized extraction without hallucination.
        </p>

        {/* 5 Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
          {PROMPT_COMPONENTS.map((item, idx) => (
            <div key={idx} className={`p-3 rounded-lg border text-xs space-y-1 ${item.color}`}>
              <div className="font-bold text-white flex items-center justify-between">
                <span>{item.title}</span>
              </div>
              <p className="text-[11px] text-slate-400">{item.desc}</p>
              <div className="bg-slate-950/70 p-2 rounded text-[11px] font-mono text-slate-200 border border-slate-800">
                "{item.example}"
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Raw Prompt Terminal View */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-inner">
        <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-mono text-slate-300">Generated GPT-4 System Prompt Payload</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">Temperature: 0.1 • Mode: Strict Extraction</span>
        </div>
        <pre className="p-4 text-xs font-mono text-cyan-200/90 whitespace-pre-wrap leading-relaxed select-all max-h-96 overflow-y-auto">
          {promptText}
        </pre>
      </div>
    </div>
  );
}
