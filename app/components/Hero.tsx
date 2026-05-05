import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { Globe2, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--surface))] py-16 sm:py-24">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[hsl(var(--brand-500))] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[hsl(var(--brand-900))] rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Badge variant="default" className="mb-6 animate-fade-in">
          <Globe2 className="w-3 h-3 mr-1" />
          Global Ethnographic Data Explorer
        </Badge>
        
        <h1 className="text-display-lg sm:text-display-xl font-serif font-bold text-[hsl(var(--text-primary))] mb-6 tracking-tight animate-slide-up">
          The Economics of <br className="hidden sm:block" />
          <span className="text-gradient">Bridal Traditions</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-[hsl(var(--text-secondary))] mb-10 leading-relaxed animate-slide-up [animation-delay:100ms]">
          Explore the complex world of bride price, lobola, and marriage customs through data-driven visualization, in-depth cultural analysis, and AI-powered insights.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up [animation-delay:200ms]">
          <Link href="/countries">
            <Button size="lg" className="w-full sm:w-auto" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
              Explore Data
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto" icon={<BookOpen className="w-4 h-4" />}>
              Learn More
            </Button>
          </Link>
        </div>

        {/* Stats strip */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-[hsl(var(--border))] pt-12 animate-fade-in [animation-delay:400ms]">
          <div>
            <div className="text-3xl font-bold text-[hsl(var(--text-primary))]">80+</div>
            <div className="text-sm text-[hsl(var(--text-muted))]">Countries</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[hsl(var(--text-primary))]">500+</div>
            <div className="text-sm text-[hsl(var(--text-muted))]">Data Points</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[hsl(var(--text-primary))]">AI</div>
            <div className="text-sm text-[hsl(var(--text-muted))]">Insights</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[hsl(var(--text-primary))]">2025</div>
            <div className="text-sm text-[hsl(var(--text-muted))]">Updated</div>
          </div>
        </div>
      </div>
    </section>
  );
}
