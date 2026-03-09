import { GROQ_PROXY_URL } from "../config";

export async function sendToGroq(prompt: string): Promise<string> {
  if (!GROQ_PROXY_URL) {
    return "Groq proxy URL is not configured.";
  }

  const response = await fetch(GROQ_PROXY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    return `Groq request failed (${response.status}).`;
  }

  const data = await response.json();
  return data.reply || "No reply returned.";
}
