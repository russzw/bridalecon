
// app/api/recommendations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import bridePriceData from '../../data/bride-price-data.json';

// Initialize the Google Generative AI client with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const getAIRecommendations = async (
  priceFilter: string | null,
  regionFilter: string | null
): Promise<string[]> => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    You are an AI assistant for the Bridal Economics Explorer application.
    Your goal is to provide helpful and interesting recommendations to users who are exploring bride prices around the world.
    The user has provided the following filters:
    - Price: ${priceFilter || 'Any'}
    - Region: ${regionFilter || 'Any'}

    Based on these filters, and the provided bride price data, generate 2-3 engaging and informative recommendations.
    The recommendations should be in the style of interesting facts or helpful tips.
    The tone should be lighthearted and informative.
    Do not repeat the user's filters in your recommendations.
    The recommendations should be distinct from each other.
    The recommendations should be in a JSON array of strings.

    Here is the bride price data for context:
    ${JSON.stringify(bridePriceData)}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    // The model might return a string that looks like a JSON array.
    // We need to parse it carefully.
    // It might also return a markdown-formatted JSON array.
    // Let's remove the markdown formatting and then parse.
    const jsonString = text.replace(/```json\n/g, '').replace(/```/g, '');

    try {
        const recommendations = JSON.parse(jsonString);
        return recommendations;
    } catch (e) {
        // If parsing fails, it might be because the model returned a simple list of strings.
        // Let's try to parse it line by line.
        const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        // Clean up the lines to make them valid JSON strings
        const cleanedLines = lines.map(line => {
            // Remove leading/trailing characters like " - " or "* "
            let cleaned = line.replace(/^[\*\-\s]+/, '');
            // Remove trailing commas that might break JSON parsing
            if (cleaned.endsWith(',')) {
                cleaned = cleaned.slice(0, -1);
            }
            // The model sometimes returns strings with double quotes inside, but not properly escaped.
            // Let's just return the cleaned string as is.
            return cleaned;
        });
        return cleanedLines;
    }


  } catch (error) {
    console.error("Failed to generate recommendations from Gemini:", error);
    // Return some fallback recommendations in case of an error
    return [
      "The bride price is a tradition in many cultures, symbolizing a token of appreciation to the bride's family.",
      "In some cultures, the bride price is not a single payment but a series of gifts and ceremonies.",
      "The value of the bride price can vary significantly, even within the same country or region."
    ];
  }
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const priceFilter = searchParams.get('priceFilter');
  const regionFilter = searchParams.get('regionFilter');

  try {
    const recommendations = await getAIRecommendations(priceFilter, regionFilter);
    return NextResponse.json({ recommendations });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate recommendations' }, { status: 500 });
  }
}
