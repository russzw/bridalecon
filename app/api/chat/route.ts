// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import bridePriceData from '../../data/bride-price-data.json';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req: NextRequest) {
  if (!genAI) {
     return NextResponse.json({ reply: "I'm sorry, my AI engine is currently offline (Missing API Key). Please contact the administrator." });
  }

  try {
    const { message, history } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: history.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      })),
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const systemInstruction = `
      You are the BridalEcon Assistant. You are an expert in global marriage customs, bride prices, and cultural traditions.
      Your tone is informative, respectful, and objective.
      You have access to the following dataset summary: ${JSON.stringify(bridePriceData.slice(0, 20))}... (and many more).
      Always mention that data is estimated and varies by specific community and family status.
      If asked about something outside of marriage customs, politely redirect the conversation back to Bridal Economics.
    `;

    const fullMessage = `${systemInstruction}\n\nUser Question: ${message}`;
    const result = await chat.sendMessage(fullMessage);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: 'Failed to generate chat response' }, { status: 500 });
  }
}
