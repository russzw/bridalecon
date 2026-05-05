// app/components/Contributions.tsx
"use client";
import React from "react";
import { Mail, Github, Users, Plus } from "lucide-react";
import { Button } from "./ui/Button";
import { Card, CardContent } from "./ui/Card";

const Contributions = () => {
  return (
    <Card className="bg-[hsl(var(--brand-900)/0.03)] border-dashed border-2 overflow-hidden">
      <CardContent className="p-8 sm:p-12">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <div className="w-12 h-12 rounded-2xl bg-[hsl(var(--brand-500))] flex items-center justify-center text-white mb-6 shadow-glow-sm">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-[hsl(var(--text-primary))] mb-4">
              Contribute to the Archive
            </h2>
            <p className="text-[hsl(var(--text-secondary))] leading-relaxed mb-8 max-w-xl">
              BridalEcon is an open-source project dedicated to documenting marriage customs accurately. 
              Have data for a missing country or corrections to existing profiles? Join our effort to build the most comprehensive database of bridal economics.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="mailto:russellmutamba@protonmail.com">
                <Button size="lg" icon={<Mail className="w-4 h-4" />}>
                  Contribute via Email
                </Button>
              </a>
              <a href="https://github.com/russzw/bridalecon" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="lg" icon={<Github className="w-4 h-4" />}>
                  View on GitHub
                </Button>
              </a>
            </div>
          </div>
          
          <div className="hidden lg:block w-64 h-64 shrink-0">
             <div className="relative w-full h-full border border-[hsl(var(--border))] rounded-3xl bg-[hsl(var(--surface-overlay))] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-brand opacity-5" />
                <Plus className="w-16 h-16 text-[hsl(var(--brand-500))] opacity-20" />
                <div className="absolute bottom-4 left-4 right-4 h-2 bg-[hsl(var(--brand-500)/0.1)] rounded-full overflow-hidden">
                   <div className="h-full w-2/3 bg-[hsl(var(--brand-500))] animate-pulse" />
                </div>
             </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Contributions;
