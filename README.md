# LinguaAI — Full-Stack Language Translation App

LinguaAI is a full-stack web application built for real-time, multi-language text translation. Developed as Task 1 of my Artificial Intelligence Internship at CodeAlpha, this project moves beyond basic script interfaces by pairing a decoupled Python FastAPI backend with a custom-designed HTML, CSS, and JavaScript frontend.

## Why I Built It This Way
Instead of relying on a single translation endpoint or a pre-built UI wrapper, I structured this project using a standard client-server architecture:
- **Reliability:** Translation APIs can occasionally hit rate limits. To prevent the app from breaking for the user, the backend uses `GoogleTranslator` as the primary engine and automatically falls back to `MyMemoryTranslator` if an error occurs.
- **Custom User Experience:** The frontend is built from scratch with a dark editorial theme, live character tracking, one-click language swapping, Right-to-Left (RTL) text alignment for Urdu and Arabic, and browser-based Text-to-Speech.

## Project Structure
- `backend/main.py` — FastAPI server, Pydantic validation, and translation logic
- `frontend/index.html` — Semantic UI layout
- `frontend/style.css` — Custom styling and responsive layout
- `frontend/script.js` — Fetch API integration, RTL handling, copy & audio controls
- `frontend/logo.png` — Custom brand logo
- `requirements.txt` — Python dependencies

## Tech Stack
- **Backend:** Python 3, FastAPI, Uvicorn, Pydantic, `deep-translator`
- **Frontend:** HTML5, CSS3, Vanilla JavaScript (Fetch API, Web Speech API)

## Running the Project Locally
1. Clone the repository: `git clone https://github.com/eshajameeltech/CodeAlpha_LanguageTranslator.git`
2. Create & activate virtual environment: `python -m venv venv` then `.\venv\Scripts\activate`
3. Install dependencies: `python -m pip install -r requirements.txt`
4. Start server: `python -m uvicorn backend.main:app --reload`
5. Open `http://127.0.0.1:8000` in your browser.

---

Built by **Esha Jameel**