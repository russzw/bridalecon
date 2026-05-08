// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import bridePriceData from '../../data/bride-price-data.json';
import chatFallbacks from '../../data/chat-fallbacks.json';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req: NextRequest) {
  if (!genAI) {
     const fallback = chatFallbacks[Math.floor(Math.random() * chatFallbacks.length)];
     return NextResponse.json({ reply: `[Offline Mode] ${fallback}` });
  }

  try {
    const { message, history } = await req.json();
    
    const systemInstruction = `
      You are the BridalEcon Assistant. You are an expert in global marriage customs, bride prices, and cultural traditions.
      Your tone is informative, respectful, and objective.
      You have access to the following dataset summary: ${JSON.stringify(bridePriceData.slice(0, 10))}...
      Always mention that data is estimated and varies by specific community and family status.
      If asked about something outside of marriage customs, politely redirect the conversation back to Bridal Economics.
    `;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction
    });

    // Clean and validate history for Gemini (must alternate user/model, must start with user)
    let cleanedHistory = (history || [])
      .map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }))
      .filter((msg: any) => msg.parts[0].text); // Filter out empty messages

    // Ensure it starts with user
    while (cleanedHistory.length > 0 && cleanedHistory[0].role !== 'user') {
      cleanedHistory.shift();
    }

    const chat = model.startChat({
      history: cleanedHistory,
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Chat API error:", error);
    const fallback = chatFallbacks[Math.floor(Math.random() * chatFallbacks.length)];
    return NextResponse.json({ 
      reply: `I'm having trouble connecting to my live brain right now, but here's a cultural insight: ${fallback}`,
      isFallback: true 
    });
  }
}
