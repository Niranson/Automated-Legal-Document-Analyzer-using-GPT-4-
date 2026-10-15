import React, { useState, useEffect } from 'react';
import { 
  FileCheck2, Layers, BookOpen, MessageSquare, 
  Split, Sparkles, Scale, AlertCircle, FileText, CheckCircle 
} from 'lucide-react';

import Header from './components/Header';
import WorkflowPipeline from './components/WorkflowPipeline';
import DocumentInput from './components/DocumentInput';
import StructuredOutput from './components/StructuredOutput';
import SummarizationView from './components/SummarizationView';
import ClauseExplorer from './components/ClauseExplorer';
import ChunkingView from './components/ChunkingView';
import PromptInspector from './components/PromptInspector';
import ContractChat from './components/ContractChat';

import { fetchHealth, fetchSamples, analyzeDocument, preprocessText } from './api';

export default function App() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('openai_api_key') || '');
  const [modelName, setModelName] = useState('gpt-4o');
  const [backendStatus, setBackendStatus] = useState(false);
  const [samples, setSamples] = useState(null);
  
  const [documentText, setDocumentText] = useState('');
  const [metrics, setMetrics] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [activeTab, setActiveTab] = useState('structured');
  const [errorMessage, setErrorMessage] = useState(null);

  // Initialize on mount: check backend health and fetch samples
  useEffect(() => {
    async function init() {
      try {
        await fetchHealth();
        setBackendStatus(true);
      } catch (e) {
        setBackendStatus(false);
      }

      try {
        const loadedSamples = await fetchSamples();
        setSamples(loadedSamples);
        // Preload Employment Agreement sample by default
        if (loadedSamples && loadedSamples.employment) {
          setDocumentText(loadedSamples.employment.content);
        }
      } catch (e) {
        console.error('Samples loading error:', e);
      }
    }
    init();
  }, []);

  // Update metrics whenever document text changes
  useEffect(() => {
    if (!documentText.trim()) {
      setMetrics(null);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const m = await preprocessText(documentText);
        setMetrics(m);
      } catch (e) {
        // silent fallback
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [documentText]);

  const handleSelectSample = (sampleKey) => {
    if (samples && samples[sampleKey]) {
      setDocumentText(samples[sampleKey].content);
      setAnalysis(null);
      setActiveStep(1);
    }
  };

  const handleAnalyze = async () => {
    if (!documentText.trim()) return;
    setIsAnalyzing(true);
    setErrorMessage(null);

    // Simulate animated pipeline step updates (matching Page 6 workflow)
    setActiveStep(2); // Text extraction
    await new Promise((r) => setTimeout(r, 250));
    setActiveStep(3); // Preprocessing
    await new Promise((r) => setTimeout(r, 250));
    setActiveStep(4); // Section Identification
    await new Promise((r) => setTimeout(r, 250));
    setActiveStep(5); // Prompt Generation
    await new Promise((r) => setTimeout(r, 200));
    setActiveStep(6); // GPT-4 Inference

    try {
      const result = await analyzeDocument(documentText, apiKey, modelName);
      setActiveStep(7); // Structured Analysis
      await new Promise((r) => setTimeout(r, 200));
      setActiveStep(8); // Save & Export
      setAnalysis(result);
    } catch (err) {
      setErrorMessage(err.message || 'Error occurred during legal document analysis.');
      setActiveStep(1);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const TABS = [
    { id: 'structured', label: 'Structured Analysis', icon: FileCheck2, badge: 'Recommended' },
    { id: 'summarization', label: 'Extractive vs Abstractive', icon: Layers, badge: 'Section 8' },
    { id: 'clauses', label: 'Clause Deep-Dive & Risk', icon: Scale, badge: 'Section 7' },
    { id: 'chunking', label: 'Chunking Visualizer', icon: Split, badge: 'Section 9' },
    { id: 'prompt', label: 'Prompt Inspector', icon: BookOpen, badge: 'Section 5' },
    { id: 'chat', label: 'Ask GPT-4', icon: MessageSquare, badge: 'Q&A' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Navbar */}
      <Header
        apiKey={apiKey}
        setApiKey={setApiKey}
        modelName={modelName}
        setModelName={setModelName}
        backendStatus={backendStatus}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Workflow Diagram Banner (Section 6, Page 6) */}
        <WorkflowPipeline activeStep={activeStep} isAnalyzing={isAnalyzing} />

        {/* Error Alert if any */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Input & Upload Workspace */}
        <DocumentInput
          documentText={documentText}
          setDocumentText={setDocumentText}
          samples={samples}
          metrics={metrics}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
          onSelectSample={handleSelectSample}
        />

        {/* Results Workspace: Navigation Tabs */}
        {analysis && (
          <div className="space-y-4 pt-2">
            
            {/* Tabs List */}
            <div className="flex overflow-x-auto gap-2 border-b border-slate-800 pb-2">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-500 shadow-md shadow-blue-500/20'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850 hover:text-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-500'
                    }`}>
                      {tab.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Tab Panel */}
            <div className="pt-2">
              {activeTab === 'structured' && (
                <StructuredOutput analysis={analysis} onSwitchTab={setActiveTab} />
              )}
              {activeTab === 'summarization' && (
                <SummarizationView analysis={analysis} originalText={documentText} />
              )}
              {activeTab === 'clauses' && (
                <ClauseExplorer analysis={analysis} />
              )}
              {activeTab === 'chunking' && (
                <ChunkingView documentText={documentText} apiKey={apiKey} modelName={modelName} />
              )}
              {activeTab === 'prompt' && (
                <PromptInspector analysis={analysis} documentText={documentText} />
              )}
              {activeTab === 'chat' && (
                <ContractChat documentText={documentText} apiKey={apiKey} modelName={modelName} />
              )}
            </div>

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
          <div>
            <span className="font-semibold text-slate-400">24CS2506 – Building Applications using GPT-4</span> • Experiment 5: Automated Legal Document Analyzer
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>FastAPI + Vite React</span>
            <span>•</span>
            <span>Extractive & Abstractive Summarization</span>
            <span>•</span>
            <span>Chunking Pipeline</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
