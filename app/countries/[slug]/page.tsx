import bridePriceData from "../../data/bride-price-data.json";
import GoBackButton from "../../components/GoBackButton";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { 
  Globe2, 
  TrendingUp, 
  History, 
  Scale, 
  DollarSign, 
  MapPin,
  Clock,
  ExternalLink
} from "lucide-react";
import { notFound } from "next/navigation";

export default function CountryProfile({ params }: { params: { slug: string } }) {
  const country = bridePriceData.find(
    (c) => c.country.toLowerCase().replace(/\s+/g, '-') === params.slug
  );

  if (!country) {
    notFound();
  }

  return (
    <div className="section min-h-screen">
      <GoBackButton />
      
      {/* Hero Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="default" className="py-1 px-3">
            <Globe2 className="w-3 h-3 mr-1" />
            {country.region}
          </Badge>
        </div>
        <h1 className="text-display-lg font-serif font-bold text-[hsl(var(--text-primary))] mb-6 tracking-tight">
          {country.country}
        </h1>
        <p className="text-xl text-[hsl(var(--text-secondary))] max-w-3xl leading-relaxed">
          {country.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5 text-[hsl(var(--brand-500))]" />
                Cultural & Historical Context
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-[hsl(var(--text-secondary))] leading-relaxed">
              <p>
                In {country.country}, the tradition of bride price (or related customs) has evolved over centuries. 
                Rooted in the acknowledgement of the bride&apos;s family&apos;s contribution to her upbringing, the custom 
                often serves as a legal or symbolic validation of the union.
              </p>
              <p>
                Historically, these payments were made in livestock, agricultural produce, or precious metals. 
                In modern times, cash has become the primary medium, though symbolic traditional items remain crucial 
                to the ceremony&apos;s legitimacy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[hsl(var(--brand-500))]" />
                Modern Trends & Economic Shifts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-[hsl(var(--text-secondary))] leading-relaxed">
              <p>
                The average price of ${country.bride_price_usd.toLocaleString()} reflects a complex intersection 
                of inflation, urban migration, and changing social expectations. In urban centers like those in {country.country}, 
                prices tend to be higher, often including demands for modern amenities or housing contributions.
              </p>
              <p>
                Conversely, there is a growing movement among the youth and human rights advocates to cap or 
                abolish high bride prices, arguing they can lead to late marriages or commodification of women.
              </p>
            </CardContent>
          </Card>

          <Card className="border-[hsl(var(--brand-500)/0.2)] bg-[hsl(var(--brand-500)/0.03)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[hsl(var(--brand-600))] dark:text-[hsl(var(--brand-400))]">
                <Scale className="w-5 h-5" />
                Ethical Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="text-[hsl(var(--text-secondary))] italic leading-relaxed">
              &quot;The practice in {country.country} represents a delicate balance between preserving cultural identity 
              and adapting to individual rights in a globalized economy. Analysis shows that while it fosters 
              familial bonds, extreme financial pressure can exacerbate socio-economic inequalities.&quot;
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-widest text-[hsl(var(--text-muted))]">Key Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[hsl(var(--surface-overlay))] flex items-center justify-center shrink-0">
                  <DollarSign className="w-5 h-5 text-[hsl(var(--brand-500))]" />
                </div>
                <div>
                  <div className="text-sm text-[hsl(var(--text-muted))]">Average Price</div>
                  <div className="text-2xl font-bold text-[hsl(var(--text-primary))]">${country.bride_price_usd.toLocaleString()}</div>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[hsl(var(--surface-overlay))] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[hsl(var(--brand-500))]" />
                </div>
                <div>
                  <div className="text-sm text-[hsl(var(--text-muted))]">Dominant Region</div>
                  <div className="text-lg font-semibold text-[hsl(var(--text-primary))]">{country.region}</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[hsl(var(--surface-overlay))] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[hsl(var(--brand-500))]" />
                </div>
                <div>
                  <div className="text-sm text-[hsl(var(--text-muted))]">Data Freshness</div>
                  <div className="text-lg font-semibold text-[hsl(var(--text-primary))]">2025 Estimates</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-widest text-[hsl(var(--text-muted))]">Data Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between text-sm group cursor-pointer">
                  <span className="text-[hsl(var(--text-secondary))] group-hover:text-[hsl(var(--brand-500))]">Ethnographic Atlas</span>
                  <ExternalLink className="w-3 h-3 text-[hsl(var(--text-muted))]" />
                </li>
                <li className="flex items-center justify-between text-sm group cursor-pointer">
                  <span className="text-[hsl(var(--text-secondary))] group-hover:text-[hsl(var(--brand-500))]">World Bank Socio-data</span>
                  <ExternalLink className="w-3 h-3 text-[hsl(var(--text-muted))]" />
                </li>
                <li className="flex items-center justify-between text-sm group cursor-pointer">
                  <span className="text-[hsl(var(--text-secondary))] group-hover:text-[hsl(var(--brand-500))]">Local Cultural Reports</span>
                  <ExternalLink className="w-3 h-3 text-[hsl(var(--text-muted))]" />
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return bridePriceData.map((country) => ({
    slug: country.country.toLowerCase().replace(/\s+/g, '-'),
  }));
}
