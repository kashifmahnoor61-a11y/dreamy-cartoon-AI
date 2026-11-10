import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const messages = req.body.messages || [];

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      instructions:
        "You are Dreamy Cartoon AI, a friendly assistant. Answer in Urdu, Roman Urdu, or English according to the user's language. Keep responses safe and age-appropriate.",
      input: messages
    });

    return res.status(200).json({
      reply: response.output_text
    });
  } catch (error) {
    return res.status(500).json({
      error: "AI service is not configured yet."
    });
  }
}
