
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `You are the Paw-some Pomskies AI Assistant. 
Your goal is to help potential owners learn about Pomskies (Pomeranian-Husky mix) and our breeding program.
Be friendly, professional, and knowledgeable. 
Key facts:
- We prioritize comprehensive DNA health testing.
- Pomskies are high-energy and need exercise.
- They are intelligent but can be stubborn.
- We ship nationwide within the US.
- Pricing starts at $2,500.
Always encourage users to fill out the contact form for specific adoption inquiries.`;

export async function getAiResponse(message: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });
    return response.text || "I'm sorry, I couldn't process that. Please try again or contact our team directly!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our AI is napping right now. Please use the contact form below!";
  }
}
