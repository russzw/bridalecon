// app/about/page.tsx
"use client";

import GoBackButton from "../components/GoBackButton";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { 
  BookOpen, 
  Target, 
  ShieldCheck, 
  Database, 
  Info, 
  Users,
  Lightbulb,
  Scale
} from "lucide-react";

const AboutPage = () => {
  return (
    <div className="section min-h-screen max-w-4xl mx-auto">
      <GoBackButton />
      
      <div className="mb-16">
        <Badge variant="default" className="mb-4">
          <BookOpen className="w-3 h-3 mr-1" />
          Project Documentation
        </Badge>
        <h1 className="text-display-md font-serif font-bold text-[hsl(var(--text-primary))] mb-6">
          Understanding Bridal Economics
        </h1>
        <p className="text-xl text-[hsl(var(--text-secondary))] leading-relaxed">
          BridalEcon is a research-driven platform dedicated to exploring the complex intersection of tradition, 
          economics, and human rights through the lens of bride price customs.
        </p>
      </div>

      <div className="space-y-12">
        {/* Mission Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-[hsl(var(--brand-500))]" />
            <h2 className="text-2xl font-serif font-bold">Our Mission</h2>
          </div>
          <Card>
            <CardContent className="p-8 text-[hsl(var(--text-secondary))] leading-relaxed space-y-4">
              <p>
                The concept of bride price—be it lobola, caili, or mahr—is often misunderstood through purely 
                mercantile or purely traditionalist lenses. Our mission is to provide a nuanced, data-driven 
                overview that respects cultural heritage while highlighting modern socio-economic implications.
              </p>
              <p>
                We aim to foster a global dialogue that recognizes the value of these traditions in community 
                building while remaining vigilant about the ethical challenges posed by commodification.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Methodology Section */}
        <section id="data">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-6 h-6 text-[hsl(var(--brand-500))]" />
            <h2 className="text-2xl font-serif font-bold">Methodology & Data Sourcing</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Data Aggregation</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-[hsl(var(--text-secondary))]">
                Our database is compiled from a variety of sources, including national ethnographic surveys, 
                academic research papers, and reported market averages from regional cultural archives.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Valuation Logic</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-[hsl(var(--text-secondary))]">
                Where payments are made in livestock or goods, we apply current market conversion rates to 
                provide a standardized USD estimate, while noting the inherent symbolic value that cash cannot capture.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Ethical Framework */}
        <section id="ethics">
          <div className="flex items-center gap-3 mb-6">
            <Scale className="w-6 h-6 text-[hsl(var(--brand-500))]" />
            <h2 className="text-2xl font-serif font-bold">Ethical Framework</h2>
          </div>
          <Card className="border-[hsl(var(--brand-500)/0.2)] bg-[hsl(var(--brand-500)/0.03)]">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Cultural Sensitivity</h3>
                    <p className="text-sm text-[hsl(var(--text-secondary))]">
                      We treat all traditions with the utmost respect, acknowledging that for many, these practices 
                      are not &quot;purchases&quot; but sacred commitments between families.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Lightbulb className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Human Rights Lens</h3>
                    <p className="text-sm text-[hsl(var(--text-secondary))]">
                      We provide a platform for critical analysis of practices that may infringe upon individual 
                      autonomy or exacerbate gender inequality.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Community Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-[hsl(var(--brand-500))]" />
            <h2 className="text-2xl font-serif font-bold">The Team</h2>
          </div>
          <p className="text-[hsl(var(--text-secondary))] leading-relaxed mb-8">
            BridalEcon is an open-source initiative maintained by a global collective of developers, 
            sociologists, and cultural enthusiasts. We are constantly looking for data contributors 
            and peer reviewers to ensure the accuracy of our archive.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-[hsl(var(--surface-overlay))] border border-[hsl(var(--border))]">
               <div className="text-xs font-bold uppercase tracking-widest text-[hsl(var(--brand-500))] mb-1">Lead</div>
               <div className="font-medium">dev🔥russ</div>
            </div>
            <div className="p-4 rounded-2xl bg-[hsl(var(--surface-overlay))] border border-[hsl(var(--border))]">
               <div className="text-xs font-bold uppercase tracking-widest text-[hsl(var(--brand-500))] mb-1">UI/UX</div>
               <div className="font-medium">AI Agent</div>
            </div>
            <div className="p-4 rounded-2xl bg-[hsl(var(--surface-overlay))] border border-[hsl(var(--border))]">
               <div className="text-xs font-bold uppercase tracking-widest text-[hsl(var(--brand-500))] mb-1">Research</div>
               <div className="font-medium">Community</div>
            </div>
            <div className="p-4 rounded-2xl bg-[hsl(var(--surface-overlay))] border border-[hsl(var(--border))]">
               <div className="text-xs font-bold uppercase tracking-widest text-[hsl(var(--brand-500))] mb-1">Data</div>
               <div className="font-medium">Open-Source</div>
            </div>
          </div>
        </section>
      </div>
      
      <div className="mt-24 pt-12 border-t border-[hsl(var(--border))] text-center">
        <p className="text-sm text-[hsl(var(--text-muted))]">
          Last Updated: May 2025 • Version 1.0.0
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
