import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is not set.");
  throw new Error("AI configuration is missing. Check GEMINI_API_KEY env variable.");
}

export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });