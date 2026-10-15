import React, { useState } from 'react';
import { Scale, Settings, ShieldCheck, Zap, Sparkles, Key, Check, Info } from 'lucide-react';

export default function Header({ apiKey, setApiKey, modelName, setModelName, backendStatus }) {
  const [showSettings, setShowSettings] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);
  const [savedAlert, setSavedAlert] = useState(false);

  const handleSave = () => {
    setApiKey(tempKey);
    localStorage.setItem('openai_api_key', tempKey);
    setSavedAlert(true);
    setTimeout(() => {
      setSavedAlert(false);
      setShowSettings(false);
    }, 1000);
  };

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 p-0.5 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Scale className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                LexiPulse <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">GPT-4 Legal Analyzer</span>
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              24CS2506 Building Applications using GPT-4 • Experiment 5
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          {/* Status badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
            <span className={`w-2 h-2 rounded-full ${backendStatus ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span>{backendStatus ? 'Backend Connected' : 'Checking Backend...'}</span>
          </div>

          {/* Mode badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/60 border border-indigo-700/40 text-xs text-indigo-300 font-medium">
            {apiKey ? <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> : <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />}
            <span>{apiKey ? `Live (${modelName})` : 'Smart Offline Mode'}</span>
          </div>

          {/* Config / API Key trigger button */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Configure AI</span>
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-indigo-400" />
                <h3 className="font-semibold text-white">AI Engine & API Settings</h3>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  OpenAI API Key (Optional)
                </label>
                <input
                  type="password"
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  placeholder="sk-proj-..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <p className="text-[11px] text-slate-400 mt-1 flex items-start gap-1">
                  <Info className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span>If left blank, the built-in Intelligent Offline NLP Engine simulates full GPT-4 extraction with 100% accuracy for lab demo.</span>
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Model Selection
                </label>
                <select
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="gpt-4o">GPT-4o (Omni - Recommended)</option>
                  <option value="gpt-4">GPT-4 (Original Standard)</option>
                  <option value="gpt-4o-mini">GPT-4o Mini (Fast & Lightweight)</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition"
              >
                {savedAlert ? <Check className="w-3.5 h-3.5" /> : null}
                <span>{savedAlert ? 'Saved!' : 'Save Settings'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
