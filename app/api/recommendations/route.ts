
// app/api/recommendations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bridePriceData from '../../data/bride-price-data.json';

// A simple AI-like function to generate recommendations.
// In a real-world scenario, this would be a call to a machine learning model.
const getAIRecommendations = (
  priceFilter: string | null,
  regionFilter: string | null
): string[] => {
  const recommendations: string[] = [];

  // Price-based recommendations
  if (priceFilter === 'low') {
    recommendations.push(
      'For a budget-friendly option, countries in Southeast Asia and parts of Africa often have lower bride prices.'
    );
  } else if (priceFilter === 'medium') {
    recommendations.push(
      'In the medium price range, you can find beautiful cultures in South America and Eastern Europe.'
    );
  } else if (priceFilter === 'high') {
    recommendations.push(
      'For a higher budget, consider countries in the Middle East or developed nations in Europe and Asia, where traditions can involve significant expense.'
    );
  } else {
    recommendations.push(
        'Explore a variety of cultures and bride price ranges around the world. Use the filters to narrow down your search.'
    )
  }

  // Region-based recommendations
  if (regionFilter) {
    const regionData = bridePriceData.filter((d) => d.region === regionFilter);
    if (regionData.length > 0) {
      const avgPrice =
        regionData.reduce((acc, cur) => acc + cur.bride_price_usd, 0) /
        regionData.length;
      recommendations.push(
        `In ${regionFilter}, the average bride price is around $${avgPrice.toFixed(
          2
        )}. You can find a mix of traditions and prices here.`
      );
    }
  }

  // Generic recommendation
  if (recommendations.length < 2) {
    recommendations.push(
      'Did you know? Bride prices can vary dramatically based on local customs, family status, and individual negotiations.'
    );
  }

  return recommendations;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const priceFilter = searchParams.get('priceFilter');
  const regionFilter = searchParams.get('regionFilter');

  try {
    const recommendations = getAIRecommendations(priceFilter, regionFilter);
    return NextResponse.json({ recommendations });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate recommendations' }, { status: 500 });
  }
}
