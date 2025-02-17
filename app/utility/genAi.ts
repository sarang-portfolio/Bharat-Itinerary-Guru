import { GoogleGenerativeAI } from "@google/generative-ai";
import { itinerarySchema, tourSchema } from "../common/schema/prompt.schema";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const pdfParserModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: tourSchema,
  },
  systemInstruction:
    "You are an AI that extracts structured data from travel guides.",
});

export const itineraryModel = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: itinerarySchema,
  },
  systemInstruction: "You are an expert travel planner.",
});
