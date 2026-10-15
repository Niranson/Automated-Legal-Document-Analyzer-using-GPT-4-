import React, { useState } from 'react';
import { 
  FileText, Users, Target, Clock, ShieldAlert, CreditCard, 
  AlertTriangle, Calendar, Award, Copy, Check, Download, 
  Printer, Cpu, ChevronDown, ChevronUp 
} from 'lucide-react';

export default function StructuredOutput({ analysis, onSwitchTab }) {
  const [copied, setCopied] = useState(false);
  const [showRawText, setShowRawText] = useState(false);

  if (!analysis) return null;

  const rawFormatted = analysis.recommended_format_text || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(rawFormatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([rawFormatted], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Legal_Analysis_${analysis.document_type || 'Contract'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([JSON.stringify(analysis, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Legal_Analysis_${analysis.document_type || 'Contract'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const partiesList = Array.isArray(analysis.parties) ? analysis.parties : [analysis.parties];
  const obligationsList = Array.isArray(analysis.key_obligations) ? analysis.key_obligations : [analysis.key_obligations];
  const datesList = Array.isArray(analysis.important_dates) ? analysis.important_dates : [analysis.important_dates];
  const clausesList = Array.isArray(analysis.clauses) ? analysis.clauses : [];

  return (
    <div className="space-y-4">
      {/* Header bar with Document Type and Action Buttons */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-cyan-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase font-bold tracking-wider text-cyan-400">
                Recommended Lab Format (Page 5-6)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                {analysis.engine || 'GPT-4 Engine'}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white">
              {analysis.document_type || 'Legal Document Analysis'}
            </h2>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRawText(!showRawText)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
          >
            {showRawText ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            <span>{showRawText ? 'Card View' : 'Raw Text View'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleDownloadTxt}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>TXT</span>
          </button>

          <button
            onClick={handleDownloadJson}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>JSON</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Raw Lab Manual Text View Toggle */}
      {showRawText ? (
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-cyan-400">Plaintext Output Format (Exact Lab Spec)</span>
            <span className="text-[11px] text-slate-500 font-mono">Standardized Headings & Bullets</span>
          </div>
          <pre className="text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed select-all">
            {rawFormatted}
          </pre>
        </div>
      ) : (
        /* Visual Card Presentation */
        <div className="space-y-4">
          
          {/* Executive Summary Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Executive Summary</span>
              </h3>
              <button 
                onClick={() => onSwitchTab('summarization')}
                className="text-[11px] text-cyan-400 hover:underline"
              >
                Compare Extractive vs Abstractive &rarr;
              </button>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/80">
              {analysis.summary || 'Summary unavailable.'}
            </p>
          </div>

          {/* 2-Column Grid for Parties, Purpose, Duration, Governing Law */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Parties */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2.5">
                <Users className="w-3.5 h-3.5 text-blue-400" />
                <span>Parties Involved</span>
              </h4>
              <div className="space-y-2">
                {partiesList.map((party, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="font-medium">{party}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Purpose */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2.5">
                <Target className="w-3.5 h-3.5 text-emerald-400" />
                <span>Purpose of Agreement</span>
              </h4>
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-200 leading-relaxed">
                {analysis.purpose || 'Not explicitly stated'}
              </div>
            </div>

            {/* Duration & Dates */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Duration & Important Dates</span>
              </h4>
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase">Duration:</span>
                  <span className="text-amber-300 font-medium">{analysis.duration || 'Not specified'}</span>
                </div>
                {datesList.map((d, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 px-2 py-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment & Governing Law */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2.5">
                <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
                <span>Payment Terms & Governing Law</span>
              </h4>
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase">Payment:</span>
                  <span className="text-cyan-300 font-medium">{analysis.payment || 'None specified'}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase">Governing Law:</span>
                  <span className="text-slate-200">{analysis.governing_law || 'Applicable jurisdiction'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Obligations */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-3">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Key Obligations</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {obligationsList.map((ob, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-200">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                    ✓
                  </span>
                  <span>{ob}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Termination & Potentially Important Clauses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>Termination Conditions</span>
              </h4>
              <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-200 leading-relaxed">
                {analysis.termination || 'Standard notice or mutual consent'}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Potentially Important Clauses</span>
                </h4>
                <button
                  onClick={() => onSwitchTab('clauses')}
                  className="text-[11px] text-cyan-400 hover:underline"
                >
                  Deep Dive &rarr;
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {clausesList.map((clause, idx) => {
                  const name = typeof clause === 'string' ? clause : clause.clause_name;
                  const risk = typeof clause === 'object' ? clause.risk_level : 'Moderate';
                  const riskColor = 
                    risk === 'High' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                    risk === 'Moderate' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';

                  return (
                    <span
                      key={idx}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1.5 ${riskColor}`}
                    >
                      <span>•</span>
                      <span>{name}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
