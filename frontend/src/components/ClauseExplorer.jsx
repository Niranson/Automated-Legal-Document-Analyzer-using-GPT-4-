import React, { useState } from 'react';
import { 
  Shield, CreditCard, AlertOctagon, Scale, 
  Lightbulb, FileQuestion, BookOpen, AlertCircle, 
  CheckCircle2, Search, Filter 
} from 'lucide-react';

const CLAUSE_ICONS = {
  'Confidentiality': Shield,
  'Payment': CreditCard,
  'Termination': AlertOctagon,
  'Liability': AlertCircle,
  'Liability & Indemnification': AlertCircle,
  'Intellectual Property': Lightbulb,
  'Dispute Resolution': Scale,
};

const COMMON_LEGAL_JARGON = [
  { term: 'Indemnification', explanation: 'An agreement where one party promises to pay for the legal costs, damages, or losses suffered by the other party.' },
  { term: 'Work Made for Hire', explanation: 'A doctrine where the employer/client, not the employee/creator, legally owns all copyrights to creations made on the job.' },
  { term: 'Severability', explanation: 'If one clause of the contract is ruled invalid by a court, all remaining provisions stay enforceable.' },
  { term: 'Force Majeure', explanation: 'Excuses performance of contractual obligations due to unforeseeable catastrophic events (e.g. natural disasters, war).' },
  { term: 'Liquidated Damages', explanation: 'A predetermined sum that must be paid as compensation if one party breaches the contract.' },
  { term: 'Injunctive Relief', explanation: 'A court order commanding a party to stop doing a specific act (e.g. stop leaking confidential trade secrets), rather than just paying money.' },
];

export default function ClauseExplorer({ analysis }) {
  const [filterRisk, setFilterRisk] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  if (!analysis) return null;

  const clauses = Array.isArray(analysis.clauses) ? analysis.clauses : [];

  const filteredClauses = clauses.filter((c) => {
    const name = c.clause_name || '';
    const summary = c.summary || '';
    const matchesRisk = filterRisk === 'ALL' || c.risk_level === filterRisk;
    const matchesSearch = 
      name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRisk && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Search/Filter Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Scale className="w-4 h-4 text-cyan-400" />
              <span>Key Clause Identification & Risk Analysis (Section 7)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Identifies Confidentiality, Payment, Termination, Liability, IP, and Dispute Resolution clauses.
            </p>
          </div>

          {/* Risk Filters */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">Filter Risk:</span>
            {['ALL', 'High', 'Moderate', 'Low'].map((level) => (
              <button
                key={level}
                onClick={() => setFilterRisk(level)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition ${
                  filterRisk === level
                    ? 'bg-indigo-600 text-white border-indigo-500'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clause names or summaries (e.g., liability, termination, payment)..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Clause Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClauses.map((clause, idx) => {
          const name = clause.clause_name || 'Legal Clause';
          const IconComponent = CLAUSE_ICONS[name] || Shield;
          const risk = clause.risk_level || 'Moderate';
          
          const riskBadge = 
            risk === 'High' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
            risk === 'Moderate' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
            'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';

          return (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-slate-700 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-white">{name}</h4>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${riskBadge}`}>
                    {risk} Risk
                  </span>
                </div>

                <div className="mt-2 space-y-2">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-500 block">Plain English Meaning:</span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {clause.summary || 'Summary not available'}
                    </p>
                  </div>

                  {clause.verbatim_quote && (
                    <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 text-[11px] text-slate-400 italic">
                      <span className="text-[9px] uppercase font-bold text-slate-600 block not-italic mb-1">Contract Excerpt:</span>
                      "{clause.verbatim_quote}"
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legal Jargon Plain English Explainer (Addresses Section 3: Why Legal Analysis is Difficult) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-4 h-4 text-indigo-400" />
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Legal Terminology & Complexity Explainer (Section 3)
          </h4>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Legal documents use complex phrasing, archaic terminology, and cross-references. Here are key legal terms decoded into plain English:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {COMMON_LEGAL_JARGON.map((item, idx) => (
            <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs">
              <span className="font-semibold text-cyan-300 block mb-1">{item.term}</span>
              <p className="text-slate-400 text-[11px] leading-relaxed">{item.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
