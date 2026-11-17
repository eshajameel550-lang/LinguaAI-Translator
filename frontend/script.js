const inputText = document.getElementById("input-text");
const outputText = document.getElementById("output-text");
const sourceLang = document.getElementById("source-lang");
const targetLang = document.getElementById("target-lang");
const translateBtn = document.getElementById("translate-btn");
const swapBtn = document.getElementById("swap-btn");
const clearBtn = document.getElementById("clear-btn");
const copyBtn = document.getElementById("copy-btn");
const speakBtn = document.getElementById("speak-btn");
const charCount = document.getElementById("char-count");
const statusText = document.getElementById("status-text");
const loader = document.getElementById("loader");

const RTL_LANGUAGES = ["Urdu", "Arabic"];

// 1. Live Character Counter
inputText.addEventListener("input", () => {
    charCount.textContent = `${inputText.value.length} / 2000`;
});

// 2. Swap Languages & Text
swapBtn.addEventListener("click", () => {
    const tempLang = sourceLang.value;
    sourceLang.value = targetLang.value;
    targetLang.value = tempLang;

    if (!outputText.classList.contains("placeholder")) {
        const currentOutput = outputText.textContent;
        outputText.textContent = inputText.value || "Translation will appear here...";
        if (!inputText.value) outputText.classList.add("placeholder");
        inputText.value = currentOutput;
        charCount.textContent = `${inputText.value.length} / 2000`;
    }
});

// 3. Clear Input
clearBtn.addEventListener("click", () => {
    inputText.value = "";
    charCount.textContent = "0 / 2000";
    outputText.textContent = "Translation will appear here...";
    outputText.classList.add("placeholder");
    outputText.classList.remove("rtl-text");
    statusText.textContent = "Ready";
});

// 4. Call Python FastAPI Backend
async function handleTranslate() {
    const text = inputText.value.trim();
    if (!text) {
        statusText.textContent = "Please enter text first";
        return;
    }

    // Loading State ON
    translateBtn.disabled = true;
    loader.classList.remove("hidden");
    statusText.textContent = "Translating...";

    try {
        const response = await fetch("/api/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: text,
                source_lang: sourceLang.value,
                target_lang: targetLang.value,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.detail || "Translation failed");
        }

        outputText.textContent = data.translated_text;
        outputText.classList.remove("placeholder");

        // Apply Right-to-Left formatting for Urdu / Arabic
        if (RTL_LANGUAGES.includes(targetLang.value)) {
            outputText.classList.add("rtl-text");
        } else {
            outputText.classList.remove("rtl-text");
        }

        statusText.textContent = `Translated (${sourceLang.value} → ${targetLang.value})`;
    } catch (error) {
        outputText.textContent = `Error: ${error.message}`;
        outputText.classList.remove("placeholder", "rtl-text");
        statusText.textContent = "Failed";
    } finally {
        translateBtn.disabled = false;
        loader.classList.add("hidden");
    }
}

translateBtn.addEventListener("click", handleTranslate);

// Ctrl + Enter shortcut to translate
inputText.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "Enter") {
        handleTranslate();
    }
});

// 5. Copy Translated Text
copyBtn.addEventListener("click", async () => {
    if (outputText.classList.contains("placeholder")) return;
    await navigator.clipboard.writeText(outputText.textContent);
    const originalLabel = copyBtn.textContent;
    copyBtn.textContent = "✓ Copied!";
    setTimeout(() => (copyBtn.textContent = originalLabel), 1800);
});

// 6. Text-to-Speech (Listen)
speakBtn.addEventListener("click", () => {
    if (outputText.classList.contains("placeholder")) return;
    const utterance = new SpeechSynthesisUtterance(outputText.textContent);
    window.speechSynthesis.speak(utterance);
});