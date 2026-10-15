import React from 'react';
import { FileText, Cpu, Split, MessageSquareCode, Sparkles, Layers, CheckCircle2, BookmarkCheck, ArrowRight } from 'lucide-react';

const WORKFLOW_STEPS = [
  { id: 1, label: 'Legal Document', icon: FileText, desc: 'Input PDF / DOCX / Text' },
  { id: 2, label: 'Text Extraction', icon: Cpu, desc: 'OCR & Text stream' },
  { id: 3, label: 'Preprocessing', icon: Layers, desc: 'Clean & Tokenize' },
  { id: 4, label: 'Chunk / Section', icon: Split, desc: 'Section Identification' },
  { id: 5, label: 'Prompt Generation', icon: MessageSquareCode, desc: 'Role, Task & Format' },
  { id: 6, label: 'GPT-4 Inference', icon: Sparkles, desc: 'Legal extraction' },
  { id: 7, label: 'Structured Analysis', icon: CheckCircle2, desc: 'Clauses, Dates, Terms' },
  { id: 8, label: 'Save & Export', icon: BookmarkCheck, desc: 'Report generation' },
];

export default function WorkflowPipeline({ activeStep = 0, isAnalyzing = false }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            System Workflow Architecture (Experiment 5 • Page 6)
          </h2>
        </div>
        {isAnalyzing && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-500/10 text-cyan-400 border border-cyan-500/20 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            Pipeline Active
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {WORKFLOW_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isDone = activeStep >= step.id;
          const isCurrent = isAnalyzing && activeStep === step.id - 1;

          return (
            <div
              key={step.id}
              className={`relative flex flex-col p-2.5 rounded-lg border transition-all ${
                isDone
                  ? 'bg-slate-800/80 border-cyan-500/50 shadow-sm shadow-cyan-500/10'
                  : isCurrent
                  ? 'bg-indigo-950/40 border-indigo-500 animate-pulse'
                  : 'bg-slate-950/40 border-slate-800/70 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  isDone ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  0{step.id}
                </span>
                <Icon className={`w-3.5 h-3.5 ${
                  isDone ? 'text-cyan-400' : isCurrent ? 'text-indigo-400 animate-spin' : 'text-slate-500'
                }`} />
              </div>
              <p className={`text-xs font-semibold leading-tight mb-0.5 ${
                isDone ? 'text-slate-100' : 'text-slate-400'
              }`}>
                {step.label}
              </p>
              <p className="text-[10px] text-slate-500 leading-tight">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
