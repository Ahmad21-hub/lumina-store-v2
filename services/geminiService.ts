import { GoogleGenAI } from "@google/genai";
import { Product } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStylingAdvice = async (query: string, products: Product[]): Promise<string> => {
  try {
    const productContext = products.map(p => `${p.name} (${p.price} AED): ${p.description}`).join('\n');

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a luxury jewelry stylist for 'Lumina Jewelry'. 
      User Query: "${query}"
      
      Available Inventory:
      ${productContext}
      
      Task: Recommend 1 or 2 specific items from the inventory that match the user's request. 
      Explain briefly why they are a good match. Be elegant, helpful, and encouraging.
      Format the response as a short paragraph. Do not use markdown formatting.`,
    });

    return response.text || "I'm sorry, I couldn't generate a recommendation at this moment. Please try again.";
  } catch (error) {
    console.error("Stylist error:", error);
    return "Our stylist is currently unavailable. Please browse our collection below.";
  }
};