# Automated Legal Document Analyzer using GPT-4
### Course: 24CS2506 – Building Applications using GPT-4 • Experiment 5

A full-featured, professional web application and AI engine designed for legal document analysis, extraction, summarization, clause risk classification, chunking, and grounded question answering using GPT-4.

---

## 🌟 Key Features & Lab Experiment Alignment

| Lab Section | Feature & Description | Implementation |
|---|---|---|
| **Section 1: Legal Documents** | Supports Employment Agreements, NDAs, Service Agreements, Rental/Lease Agreements, Sales Contracts, and custom file uploads (`.pdf`, `.docx`, `.txt`). | `samples.py`, `extractor.py` |
| **Section 2 & 6: Document Analysis** | Automatically extracts: Parties involved, Purpose, Key Obligations, Payment terms, Duration, Termination conditions, Important dates, Governing law, and Critical clauses. | `analyzer.py`, `StructuredOutput.jsx` |
| **Section 3: Legal Complexity** | Decodes complex formal terminology, archaic legalese, and long sentences into plain English with a dedicated Jargon Glossary. | `ClauseExplorer.jsx` |
| **Section 4 & 8: Summarization** | **Abstractive Summarization** (GPT-4 synthesizes concise meaning) vs. **Extractive Summarization** (direct verbatim pivotal sentences with source highlighting). Displays compression ratios and reading time saved. | `SummarizationView.jsx` |
| **Section 5: Prompt Engineering** | Implements the standardized prompt formula: **Role**, **Task**, **Information to Extract**, **Constraint** (*"Use only information present in the document. Do not invent facts."*), and **Output Format**. | `PromptInspector.jsx` |
| **Section 7: Key Clauses** | Deep-dive identification for **Confidentiality**, **Payment**, **Termination**, **Liability**, **Intellectual Property**, and **Dispute Resolution** with risk badges (Low / Moderate / High). | `ClauseExplorer.jsx` |
| **Section 9: Chunking** | Visualizes slicing long contracts into smaller sections (**Chunk 1, Chunk 2, Chunk 3, Chunk 4**), performing local GPT-4 analysis, and synthesizing final results via map-reduce. | `chunker.py`, `ChunkingView.jsx` |
| **Page 5 & 6: Recommended Format** | Standardized plain-text and structured card view strictly following the lab manual layout with one-click copy and TXT/JSON/PDF export. | `StructuredOutput.jsx` |
| **Page 6: Workflow Architecture** | Interactive 8-step pipeline visualizer tracking each phase from text extraction to structured output. | `WorkflowPipeline.jsx` |

---

## 🚀 Quick Start (Running the Application)

### 1. Requirements
- Python 3.10+
- Dependencies installed via:
  ```bash
  pip install -r requirements.txt
  ```

### 2. Launch Application
Run the unified server with a single command:
```bash
python run.py
```

Open your browser at:
**[http://localhost:8000](http://localhost:8000)**

*(The FastAPI server serves both the REST API backend and the built React web application)*

---

## 🧠 AI Engine Modes

1. **Intelligent Offline Simulation Mode (Default)**:
   - Works immediately out of the box with zero setup or API keys required.
   - Built-in rule-based NLP accurately extracts all parties, dates, payments, durations, obligations, and clauses.
   - Ideal for classroom evaluation, offline grading, and demonstrations.

2. **Live GPT-4 Mode**:
   - Click **"Configure AI"** in the top navbar.
   - Enter your OpenAI API Key (`sk-...`) and choose your desired model (`gpt-4o`, `gpt-4`, `gpt-4o-mini`, etc.).
   - Alternatively, set `OPENAI_API_KEY=sk-...` in an optional `.env` file.

---

## 📁 Project Structure

```
Automated Legal Document Analyzer using GPT-4/
├── backend/
│   ├── app.py                # FastAPI main application & API routes
│   ├── analyzer.py           # Core legal analysis logic & GPT-4 integration
│   ├── extractor.py          # PDF, DOCX, TXT parser & preprocessor
│   ├── chunker.py            # Long document chunking & map-reduce analyzer
│   ├── samples.py            # Preloaded legal contract catalog
│   └── requirements.txt      # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main executive legal dashboard
│   │   ├── components/
│   │   │   ├── Header.jsx           # Navbar with Model & API Key config
│   │   │   ├── WorkflowPipeline.jsx # Page 6 pipeline tracker
│   │   │   ├── DocumentInput.jsx    # Upload, Samples, & Text metrics
│   │   │   ├── StructuredOutput.jsx # Recommended output format view
│   │   │   ├── SummarizationView.jsx# Extractive vs Abstractive comparison
│   │   │   ├── ClauseExplorer.jsx   # Key clause identification & risk cards
│   │   │   ├── ChunkingView.jsx     # Chunking pipeline visualizer
│   │   │   ├── PromptInspector.jsx  # Prompt builder & preview
│   │   │   └── ContractChat.jsx     # Interactive Q&A with GPT-4
│   │   ├── api.js            # API communication layer
│   │   └── index.css         # Tailwind & custom styling
│   ├── index.html            # Vite entry HTML
│   ├── vite.config.js        # Vite + Tailwind configuration
│   └── package.json          # Node dependencies
├── run.py                    # Root single-command runner script
├── test_backend.py           # Backend unit tests
├── test_e2e.py               # End-to-end integration tests
└── README.md                 # Complete documentation
```

---

## 🧪 Running Tests

To verify all components:
```bash
# Test backend core modules
python test_backend.py

# Test end-to-end API and Web endpoints
python test_e2e.py
```
