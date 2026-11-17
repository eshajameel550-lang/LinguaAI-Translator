from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from deep_translator import GoogleTranslator, MyMemoryTranslator

# 1. FastAPI App Initialize
app = FastAPI(title="AI Language Translation API", version="1.0.0")

# 2. CORS Configuration (Frontend ko Backend se baat karne ki ijazat dena)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Language Mapping (Google + MyMemory regional codes)
LANGUAGES = {
    "English": {"google": "en", "mymemory": "en-GB"},
    "Urdu": {"google": "ur", "mymemory": "ur-PK"},
    "Arabic": {"google": "ar", "mymemory": "ar-SA"},
    "French": {"google": "fr", "mymemory": "fr-FR"},
    "Spanish": {"google": "es", "mymemory": "es-ES"},
    "German": {"google": "de", "mymemory": "de-DE"},
    "Hindi": {"google": "hi", "mymemory": "hi-IN"},
    "Turkish": {"google": "tr", "mymemory": "tr-TR"},
}

# 4. Request Body Schema (Input Validation)
class TranslationRequest(BaseModel):
    text: str
    source_lang: str
    target_lang: str

# 5. Core Translation Logic (With Smart Fallback)
def perform_translation(text: str, src_name: str, tgt_name: str) -> str:
    if src_name not in LANGUAGES or tgt_name not in LANGUAGES:
        raise HTTPException(status_code=400, detail="Unsupported language selected.")

    if src_name == tgt_name:
        return text

    src_codes = LANGUAGES[src_name]
    tgt_codes = LANGUAGES[tgt_name]

    try:
        return GoogleTranslator(
            source=src_codes["google"], target=tgt_codes["google"]
        ).translate(text)
    except Exception:
        try:
            return MyMemoryTranslator(
                source=src_codes["mymemory"], target=tgt_codes["mymemory"]
            ).translate(text)
        except Exception as e:
            raise HTTPException(status_code=502, detail=f"Translation engine failed: {str(e)}")

# 6. API Endpoints
@app.get("/api/languages")
def get_languages():
    return {"languages": list(LANGUAGES.keys())}

@app.post("/api/translate")
def translate_endpoint(payload: TranslationRequest):
    if not payload.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty.")

    translated_text = perform_translation(
        payload.text.strip(), payload.source_lang, payload.target_lang
    )
    return {
        "original_text": payload.text,
        "translated_text": translated_text,
        "source_lang": payload.source_lang,
        "target_lang": payload.target_lang,
    }

# 7. Frontend Files Serve Karna
FRONTEND_DIR = Path(__file__).resolve().parent.parent / "frontend"
app.mount("/static", StaticFiles(directory=FRONTEND_DIR), name="static")

@app.get("/")
def serve_frontend():
    return FileResponse(FRONTEND_DIR / "index.html")