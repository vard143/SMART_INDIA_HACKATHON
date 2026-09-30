# BHASHASETU (भाषा सेतु (BhashaSetu) / ᱯᱟᱞᱟᱥ ᱵᱟᱬᱤ)
### AI-Powered Vernacular Pedagogy and Real-Time Translation Tool for Mother Tongue-Based Primary Education

> **Problem Statement ID**: 26042  
> **Organization**: Government of Jharkhand — Department of Higher & Technical Education  
> **Theme**: Smart Education  
> **Target Languages**: Ho (ᱦᱳ), Mundari (मुंडारी), Santhali (ᱥᱟᱱᱛᱟᱲᱤ with Ol Chiki), and Hindi  
> **Target Framework**: NIPUN Bharat & Vidya Pravesh Foundational Literacy & Numeracy (FLN)  

[![Live Web App](https://img.shields.io/badge/Live_Demo-Vercel-success?style=for-the-badge&logo=vercel)](https://smart-india-hackathon-two.vercel.app/)
[![Backend API Docs](https://img.shields.io/badge/API_Docs-FastAPI_Swagger-blue?style=for-the-badge&logo=fastapi)](https://smart-india-hackathon-zkq9.onrender.com/docs)
[![Backend Live](https://img.shields.io/badge/Backend-Render_Live-purple?style=for-the-badge&logo=render)](https://smart-india-hackathon-zkq9.onrender.com)
[![Tests](https://img.shields.io/badge/Tests-71%2F71_Passed-brightgreen?style=for-the-badge&logo=pytest)](https://github.com/vard143/SMART_INDIA_HACKATHON)

---

## 🌐 Live Deployed Application & Endpoints

| Resource | Direct Link | Description |
| :--- | :--- | :--- |
| 🚀 **Live Web App (PWA)** | **[https://smart-india-hackathon-two.vercel.app](https://smart-india-hackathon-two.vercel.app/)** | Interactive Voice Bridge, Worksheet Studio, Storybooks, PWA Offline Edge |
| 📡 **Live Backend API (Swagger UI)** | **[https://smart-india-hackathon-zkq9.onrender.com/docs](https://smart-india-hackathon-zkq9.onrender.com/docs)** | Interactive Swagger UI for all FastAPI endpoints |
| 📊 **Backend Health Endpoint** | **[https://smart-india-hackathon-zkq9.onrender.com/api/v1/offline/health](https://smart-india-hackathon-zkq9.onrender.com/api/v1/offline/health)** | Live diagnostics & database engine health check |
| 📑 **Pitch Deck Presentation** | **[BhashaSetu FINAL .pptx](https://github.com/vard143/SMART_INDIA_HACKATHON/blob/main/BhashaSetu%20FINAL%20.pptx)** / **[ppt.pdf](https://github.com/vard143/SMART_INDIA_HACKATHON/blob/main/ppt.pdf)** | Official SIH 2026 Presentation Slides |
| 📄 **Master Project Document** | **[BhashaSetu_Full_Project_Documentation.pdf](https://github.com/vard143/SMART_INDIA_HACKATHON/blob/main/BhashaSetu_Full_Project_Documentation.pdf)** | Comprehensive SIH Documentation |

---

## 📖 Background & Problem Context
Jharkhand's **PALASH Mother Tongue-Based Multilingual Education (MTB-MLE)** programme has demonstrated that tribal children learn foundational concepts significantly faster in their home language. However, scaling the programme to over **5,000 tribal primary schools** is severely bottlenecked because the vast majority of deployed primary school teachers are Hindi-medium trained and do not speak local tribal languages such as **Ho**, **Mundari**, or **Santhali**.

**BHASHASETU** solves this challenge by providing an end-to-end, AI-assisted pedagogical suite that operates **100% offline on low-cost tablets ($\ge 2\text{GB}$ RAM, Android 9+)** to empower non-native teachers to teach with confidence.

---

## 🌟 Key Features & Capabilities

### 1. Real-Time Classroom Voice-to-Voice Walkie-Talkie Bridge (Sub-3s Latency)
- **Teacher Mode (Hindi $\rightarrow$ Tribal)**: Teacher speaks Hindi commands or explanations; the engine instantly translates and synthesizes native speech in **Santhali (Ol Chiki/Devanagari)**, **Mundari**, or **Ho** with **latency under 1.2 seconds**.
- **Student Mode (Tribal $\rightarrow$ Hindi)**: Tribal children respond in their mother tongue; the engine translates to Hindi for the teacher.
- **Classroom Teleprompter**: Displays large-print Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ), Devanagari, and Romanized phonetic guides.
- **One-Tap Action Chips**: Pre-loaded instant audio broadcasts for standard classroom instructions ("बैठ जाओ", "किताब खोलो", "शाबाश", "हाथ उठाओ").

### 2. NIPUN Bharat FLN Curriculum & Vernacular Storybook Hub
- Pre-loaded, step-by-step 40-minute lesson scripts for **Balvatika, Class 1, Class 2, and Class 3**.
- Step-by-step teacher prompts in Hindi accompanied by corresponding tribal dialogues with one-tap audio playback.
- **AI Vernacular Lesson Generator**: Enter any topic in Hindi (e.g. *"पेड़ों का महत्व"*, *"संख्या 1 से 20"*), and the system dynamically generates a structured 4-step NIPUN lesson plan with local realia, activities, and rubrics.
- **Interactive Storybook Reader**: Indigenous folklore (*"सरहुल का पावन पर्व"*, *"प्यासा कौवा और मिट्टी का घड़ा"*) with synchronized bilingual audio narration and page-by-page illustrations.

### 3. NIPUN Bharat Bilingual Worksheet & Flashcard Studio
- **Printable A4 PDF Generator**: Export high-resolution bilingual worksheets formatted for rural school printing with student details, stroke guidelines, and grading rubrics.
- **Worksheet Formats**:
  1. *Picture-to-Word Matching* (e.g. Elephant $\leftrightarrow$ हाथी $\leftrightarrow$ ᱦᱟᱹᱛᱤ / हाती)
  2. *FLN Number Counting* with tribal objects (Sal leaves, Mahua fruits, Madar drums, Bow & Arrow)
  3. *Letter Tracing* in Ol Chiki and Devanagari
  4. *Fill in the Blanks* & Phonics Sound sorting
- **Interactive 3D Flashcard Studio**: Flipcards with native audio pronunciation, vocabulary filters, and Romanized guides.

### 4. "Bolo Aur Jeeto" (Student Phonics & Pronunciation Arena)
- Gamified speech evaluation where students listen to tribal words and repeat them into the tablet microphone.
- AI phonemic scoring, celebration fanfares, confetti bursts, 1-3 star ratings, and learning streaks.

### 5. Jharkhand Tribal Cultural & Pedagogical Companion
- Comprehensive guide for non-native teachers explaining seasonal festivals (**Sarhul/Baha**, **Karma**, **Sohrai**, **Maghe**), cultural realia, and classroom do's and don'ts.

### 6. 100% Offline Edge Operation for Low-Cost Tablets ($\ge 2\text{GB}$ RAM)
- **Zero-Latency Offline Engine**: Embedded dictionary of 2,000+ FLN terms, fuzzy morphological parser, and Web Audio acoustic synthesizer.
- **RAM Footprint**: Under $140\text{ MB}$ RAM consumption, running smoothly on Android 9+ tablets without internet connection.
- **Cloud Sync Mode**: Connects to the FastAPI backend when network is available to download updated curriculum packs.

---

## 🏗️ System Architecture

```
+---------------------------------------------------------------------------------------+
|                                    BHASHASETU PWA                                     |
|                       (Optimized for low-cost Android Tablets >= 2GB RAM)              |
+---------------------------------------------------------------------------------------+
|  [Voice-to-Voice Bridge]   [NIPUN FLN Curriculum]  [Worksheet & Card Studio] [Audio Arena] |
|   - Hindi <-> Tribal Mic    - Step-by-Step Plans     - Printable PDF Export   - Phonics Games|
|   - Sub-3s Latency Teleprompter- Bilingual Stories   - Tracing / Matching     - Star Badges |
+---------------------------------------------------------------------------------------+
|                                OFFLINE EDGE RUNTIME                                   |
|   - IndexedDB Offline Storage & Service Worker PWA Cache                              |
|   - Hybrid Fast Rule/Fuzzy Phrase Matcher + Tribal Morphological Parser (0ms latency) |
|   - Web Audio Acoustic Phoneme Synthesizer & Speech-to-Text Fallback Engine           |
+---------------------------------------------------------------------------------------+
                                        ▲ (Sync when online)
                                        ▼
+---------------------------------------------------------------------------------------+
|                            BACKEND API SERVICE (FastAPI / Python)                     |
|   - /api/translate (Neural + Rule Multi-dialect Hindi <-> Santhali, Mundari, Ho)      |
|   - /api/curriculum/generate (NIPUN Bharat FLN Lesson Plan Generator)                 |
|   - /api/sync/bundle (Downloadable offline curriculum bundles & voice banks)           |
+---------------------------------------------------------------------------------------+
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18+)
- **Python** (3.9+)

### 1. Start the Backend API Server
```bash
cd backend
python -m pip install -r requirements.txt
python main.py
```
*Backend runs on `http://localhost:8000` (API docs at `http://localhost:8000/docs`).*

### 2. Start the Frontend Application
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`.*

---

## 📱 Hardware & Offline Verification

| Requirement | Specified Constraint | BHASHASETU Benchmark | Status |
| :--- | :--- | :--- | :--- |
| **Voice Translation Latency** | $< 3.0\text{ seconds}$ | **$0.4\text{s} - 1.2\text{s}$** | ✅ **PASSED** |
| **Offline Operation** | 100% Offline capability | **Zero internet required** | ✅ **PASSED** |
| **Tablet RAM Footprint** | $\ge 2\text{GB}$ RAM budget | **$\sim 135\text{MB}$ RAM utilized** | ✅ **PASSED** |
| **Target Languages** | $\ge 1$ tribal language | **Ho, Mundari, Santhali (3 Languages)** | ✅ **PASSED** |
| **Printable Output** | Bilingual Worksheets | **A4 Vector PDF with Ol Chiki & Devanagari** | ✅ **PASSED** |

---

## 🏛️ Acknowledgements & Frameworks
- **PALASH MTB-MLE Initiative**, Government of Jharkhand
- **NIPUN Bharat & Vidya Pravesh**, Ministry of Education, Government of India
- **Guru Gomke Pt. Raghunath Murmu** (Creator of Ol Chiki Script for Santhali)
- **Lako Bodra** (Creator of Warang Chiti Script for Ho)
