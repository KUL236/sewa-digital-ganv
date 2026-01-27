const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SEWA AI Backend is running");
});

/* ===============================
   AI ENDPOINT
================================ */
app.post("/api/ai", async (req, res) => {
  try {
    const { message, provider } = req.body;

    if (!message) {
      return res.json({ error: "No message provided" });
    }

    /* ---------- GEMINI ---------- */
    if (provider === "gemini") {
      const geminiRes = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
        process.env.GEMINI_API_KEY,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: message }] }]
          })
        }
      );

      const geminiData = await geminiRes.json();
      const geminiReply =
        geminiData.candidates &&
        geminiData.candidates[0] &&
        geminiData.candidates[0].content &&
        geminiData.candidates[0].content.parts &&
        geminiData.candidates[0].content.parts[0].text;

      return res.json({
        answer: geminiReply || "Gemini did not return text"
      });
    }

    /* ---------- OPENAI ---------- */
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }]
      })
    });

    const openaiData = await openaiRes.json();
    const openaiReply =
      openaiData.choices &&
      openaiData.choices[0] &&
      openaiData.choices[0].message &&
      openaiData.choices[0].message.content;

    res.json({
      answer: openaiReply || "OpenAI did not return text"
    });
  } catch (err) {
    console.error(err);
    res.json({ error: "AI server error" });
  }
});

/* ===============================
   START SERVER
================================ */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("SEWA AI running on port " + PORT);
});