import express from "express";

const app = express();
app.use(express.json());

app.post("/groq", async (req, res) => {
  const apiKey = process.env.GROQ_API_KEY;
  const prompt = req.body?.prompt;

  if (!apiKey) {
    return res.status(400).json({ reply: "GROQ_API_KEY not set on server." });
  }
  if (!prompt) {
    return res.status(400).json({ reply: "Missing prompt." });
  }

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "You are a routing assistant for the app." },
          { role: "user", content: prompt }
        ],
        temperature: 0.2
      }),
    });

    const data = await groqRes.json();
    const reply = data?.choices?.[0]?.message?.content || "No reply returned.";
    return res.json({ reply });
  } catch (err) {
    return res.status(500).json({ reply: "Groq request failed." });
  }
});

app.listen(8787, () => {
  console.log("Groq proxy listening on http://localhost:8787");
});
