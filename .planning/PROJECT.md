# BridalEcon — Project Context

## What This Is

BridalEcon is a data-driven, interactive web application exploring **bride price (lobola/bride wealth)** practices around the world. It combines a 3D globe visualization, deep country profiles, historical timelines, ethical analysis, and AI-powered insights to educate users on the economic, cultural, and social dimensions of bride price customs globally.

## Core Value

A visually stunning, intellectually rigorous reference — the definitive web resource on bride price economics, combining interactive data visualization with AI-powered exploration.

## Current State (Brownfield)

- **Framework**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Existing features**: 3D globe (react-globe.gl), static bride-price-data.json, basic filtering, country detail panel.
- **AI integration**: `@google/generative-ai` installed.
- **Deployment**: Vercel

## Requirements

### Validated (Existing)

- ✓ 3D interactive globe showing bride price by country
- ✓ Country filtering by region and price range
- ✓ Static bride price dataset (JSON)
- ✓ Next.js App Router structure

### Active

- [ ] **UI Overhaul** — mobile-first redesign with stunning desktop experience.
- [ ] **Dark / Light mode** — system-preference default + user toggle.
- [ ] **AI Recommendations** — AI-powered "similar countries" and cultural context cards.
- [ ] **AI Chat** — conversational interface for questions about bride price.
- [ ] **Country Profiles** — dedicated `/countries/[slug]` pages with rich data.
- [ ] **Timeline & Trends** — interactive timeline showing evolution.
- [ ] **Ethical Analysis Section** — scholarly breakdown of debates.
- [ ] **Real API Data Sourcing** — integrate live data from World Bank/UN Women.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + CSS custom properties
- **UI Primitives**: shadcn/ui
- **Theming**: next-themes
- **3D Globe**: react-globe.gl
- **AI**: Google Gemini API
- **Deployment**: Vercel

---
*Last updated: 2026-05-05 after initialization (Milestone 1)*
