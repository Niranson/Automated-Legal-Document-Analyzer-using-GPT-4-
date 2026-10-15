import React, { useState } from 'react';
import { MessageSquare, Send, Sparkles, HelpCircle, Bot, User, CornerDownRight } from 'lucide-react';
import { askQuestion } from '../api';

const SAMPLE_QUESTIONS = [
  "What is the required notice period for termination?",
  "Who owns the intellectual property and inventions?",
  "What are the payment terms and schedule?",
  "Which state's governing law applies to disputes?",
  "What are the employee's / receiving party's key obligations?"
];

export default function ContractChat({ documentText, apiKey, modelName }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I am your GPT-4 Legal Assistant. You can ask me any specific question about the uploaded document, and I will extract the exact clauses and explain them in plain English.'
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);

  const handleSend = async (qToSend) => {
    const question = qToSend || inputQuestion;
    if (!question.trim() || !documentText.trim()) return;

    const userMessage = { role: 'user', content: question };
    setMessages((prev) => [...prev, userMessage]);
    setInputQuestion('');
    setIsAsking(true);

    try {
      const res = await askQuestion(documentText, question, apiKey, modelName);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: res.answer,
          source: res.source_clause || null
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Error retrieving answer: ${err.message}`
        }
      ]);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Interactive Contract Q&A (Ask GPT-4)
            </h3>
            <p className="text-xs text-slate-400">
              Query specific legal clauses, liability terms, or deadlines with fact-grounded responses.
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Quick Questions */}
      <div>
        <span className="text-[10px] uppercase font-semibold text-slate-500 block mb-1.5 flex items-center gap-1">
          <HelpCircle className="w-3 h-3 text-cyan-400" />
          <span>Quick Inquiries:</span>
        </span>
        <div className="flex flex-wrap gap-1.5">
          {SAMPLE_QUESTIONS.map((sq, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(sq)}
              disabled={isAsking || !documentText.trim()}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition active:scale-95 text-left disabled:opacity-50"
            >
              {sq}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="space-y-3 min-h-[220px] max-h-[360px] overflow-y-auto bg-slate-950 p-4 rounded-xl border border-slate-800/80">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-6 h-6 rounded-md bg-indigo-600/30 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}
            
            <div
              className={`max-w-[85%] rounded-xl p-3 text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
              {msg.source && (
                <div className="mt-2 pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-start gap-1">
                  <CornerDownRight className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="italic font-mono">"{msg.source}"</span>
                </div>
              )}
            </div>

            {msg.role === 'user' && (
              <div className="w-6 h-6 rounded-md bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}

        {isAsking && (
          <div className="flex items-center gap-2 text-xs text-indigo-300 bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-900/50 w-fit">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>GPT-4 is analyzing the document for an answer...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          placeholder={documentText.trim() ? "Ask any question about this contract..." : "Enter or upload a legal document first..."}
          disabled={!documentText.trim() || isAsking}
          className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!documentText.trim() || !inputQuestion.trim() || isAsking}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Ask</span>
        </button>
      </form>
    </div>
  );
}
