const API_URL = "https://sewa-smart-villages.onrender.com/api/ai";

/* ===============================
   THEME TOGGLE
================================ */
function toggleTheme() {
    document.body.classList.toggle("dark");
}

/* ===============================
   AI ASK FUNCTION
================================ */
async function ask() {
    const q = document.getElementById("q").value.trim();
    const ansDiv = document.getElementById("ans");
    const provider = document.getElementById("aiProvider")
        ? document.getElementById("aiProvider").value
        : "openai";

    if (!q) {
        alert("Please enter a question");
        return;
    }

    ansDiv.innerHTML = "⏳ AI is thinking...";

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: q,
                provider: provider
            })
        });

        const data = await res.json();

        if (data.error) {
            ansDiv.innerHTML = "❌ " + data.error;
            return;
        }

        const reply =
            data.answer || data.text || data.output || "No response from AI";

        ansDiv.innerHTML = reply;
    } catch (err) {
        ansDiv.innerHTML = "❌ AI server not responding";
    }
}

/* ===============================
   WHATSAPP QUICK ALERT
================================ */
function openWhatsApp() {
    const link = document.getElementById("waLink").value.trim();
    const status = document.getElementById("waStatus");

    if (!link.startsWith("https://chat.whatsapp.com")) {
        status.innerText = "❌ Please paste a valid WhatsApp Group link";