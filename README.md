# LinguaAI Translator

LinguaAI Translator is a full-stack web application designed for fast, accurate, and distraction-free text translation across multiple languages. Built with a Python FastAPI backend and a clean, responsive HTML/CSS/JavaScript frontend, the project focuses on low-latency API communication and a straightforward user experience.

## Key Features

- **Multi-Language Support:** Translate text seamlessly between dozens of global languages.
- **FastAPI Backend:** Asynchronous request handling for quick response times.
- **Clean Interface:** Minimalist, responsive UI built without heavy frontend frameworks.
- **Serverless Ready:** Pre-configured for deployment on Vercel.

## Tech Stack

- **Backend:** Python, FastAPI, Uvicorn
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Translation Integration:** Python translation libraries (`deep-translator`)
- **Deployment:** Vercel

## Project Structure

```text
LinguaAI-Translator/
│
├── backend/
│   └── main.py           # FastAPI application and translation API routes
│
├── frontend/
│   ├── index.html        # Main application interface
│   ├── style.css         # Styling and responsive layout
│   └── script.js         # Client-side logic and fetch requests
│
├── requirements.txt      # Python dependencies
├── vercel.json           # Vercel routing and build configuration
└── README.md             # Project documentation
```

## API Overview

The backend exposes a primary translation endpoint that accepts source text and target language parameters:

- **Endpoint:** `POST /api/translate` (or `/translate` locally)
- **Payload:** JSON object containing the text to translate, source language, and target language.
- **Response:** JSON object returning the translated text and status.

## Local Setup and Installation

Follow these steps to run the project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/eshajameeltech/LinguaAI-Translator.git](https://github.com/eshajameeltech/LinguaAI-Translator.git)
   cd LinguaAI-Translator
   ```

2. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the backend server:**
   ```bash
   uvicorn backend.main:app --reload
   ```

5. **Launch the frontend:**
   Open `frontend/index.html` directly in your browser or serve it using a local live server.