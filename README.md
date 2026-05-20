# Vietnam Property Investment Platform

A premium proptech MVP for international buyers exploring residential property investment opportunities in Vietnam, with an initial focus on Ho Chi Minh City and Hanoi.

The platform is designed for Hong Kong and overseas investors who need curated property discovery, foreign buyer guidance, investment context, and future post-sale rental management support.

Live site: [https://vietnam-property-platform.vercel.app](https://vietnam-property-platform.vercel.app)

## Overview

Vietnam Property Investment Platform is an investment-focused front-end web platform, not a traditional real estate listing site. The MVP presents properties through an investor lens, including rental yield, risk rating, foreign ownership eligibility, project verification status, buyer journey support, and rental management previews.

The current version uses mock property data only and does not include a production backend, CRM, authentication, payment processing, or live property database.

## Main Features

- Premium homepage for international Vietnam property investors
- Property listing page with investment-focused property cards
- Property detail pages with investment highlights and foreign buyer notes
- ROI calculator section for modelling rental income and estimated yield
- Verified Project badge system
- Buyer deal progress tracker mockup
- Buyer enquiry form
- Services page covering sourcing, legal coordination, FX/payment support, local agent matching, and rental management
- Rental management owner dashboard mockup
- Admin dashboard mockup for internal enquiry and deal tracking
- Education / Learn section for foreign investors
- WhatsApp floating contact button
- EN / Traditional Chinese language toggle UI
- USD / HKD currency toggle UI
- Responsive layout for desktop, tablet, and mobile

## Tech Stack

- [Next.js](https://nextjs.org/) App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- React
- Vercel deployment

## Folder Structure

```text
app/
  page.tsx                 Homepage
  properties/              Property listing and detail pages
  services/                Services page
  enquiry/                 Buyer enquiry page
  owner-portal/            Rental owner dashboard mockup
  admin/                   Internal admin dashboard mockup
  learn/                   Education section for investors

components/
  header.tsx               Site navigation and toggles
  footer.tsx               Responsive footer
  property-card.tsx        Reusable property card
  property-filter.tsx      Listing filter UI
  enquiry-form.tsx         Buyer enquiry form
  service-card.tsx         Reusable service card
  dashboard-card.tsx       Reusable dashboard metric card
  roi-calculator.tsx       Front-end ROI calculator UI
  deal-progress-tracker.tsx Buyer journey progress mockup
  verified-project-badge.tsx Project verification badge
  whatsapp-button.tsx      Floating WhatsApp CTA

data/
  properties.ts            JSON-backed property export with computed score
  mock/                    JSON mock collections for MVP database simulation
  home.ts                  Homepage mock content
  learn.ts                 Education article mock content

types/
  property.ts              Property data types
  buyer.ts                 Buyer profile types
  user.ts                  User profile and role types
  enquiry.ts               Buyer enquiry types
  agent.ts                 Local agent types
  rental.ts                Rental management summary types
  currency.ts              Currency code types

constants/
  cities.ts                City and district options
  buyers.ts                Buyer types, goals, timelines, and budgets
  currencies.ts            Currency options and MVP FX assumptions
  property.ts              Risk ratings, statuses, and verification levels

lib/
  db/mongodb.ts            Commented MongoDB connection placeholder
  repositories/            JSON-backed mock repository layer
  investment-score.ts      Property investment scoring model
  property-metrics.ts      Listing sorting and filtering metrics
  roi.ts                   ROI and yield calculations
  formatters.ts            Currency and percent formatting helpers

services/
  propertyService.ts       Server-side property data access layer
  enquiryService.ts        Server-side enquiry data access layer
  agentService.ts          Server-side agent matching data access layer
  userService.ts           Server-side user profile data access layer

hooks/
  use-roi-calculator.ts    Reusable ROI calculator state and derived values

utils/
  collections.ts           Small shared utility helpers

styles/
  globals.css              Tailwind import and global styling
```

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local site:

```text
http://localhost:3000
```

Run linting:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

## Live Deployment

Production deployment:

[https://vietnam-property-platform.vercel.app](https://vietnam-property-platform.vercel.app)

## Current MVP Scope

This MVP focuses on the front-end platform framework and investor-facing user experience.

Included in the current scope:

- Public marketing and discovery pages
- Mock property inventory
- JSON-backed user profile, agent, enquiry, and property mock collections
- Mock investment metrics
- Mock buyer progress tracker
- Mock owner portal dashboard
- Mock admin dashboard
- Static enquiry form UI
- Static language and currency toggle UI
- Front-end ROI calculator
- Responsive premium UI

Not included yet:

- Real backend or API
- Active MongoDB connection
- User authentication
- CRM integration
- Live property database
- Agent portal
- Payment processing
- Legal document workflow
- Real currency conversion
- Real multilingual content switching
- Production rental management system

## Future Roadmap

- Connect property listings to a structured property database
- Add CRM integration for buyer enquiries and advisor follow-up
- Build agent assignment and internal deal pipeline workflows
- Add authenticated buyer accounts
- Add authenticated owner portal with real rental reports
- Add document upload, reservation tracking, and legal coordination workflows
- Add live currency conversion and multi-currency pricing
- Add full English and Traditional Chinese localisation
- Add analytics for investor behaviour and enquiry conversion
- Integrate WhatsApp, email, and calendar booking flows
- Expand property markets beyond Ho Chi Minh City and Hanoi

## Disclaimer

This project is currently an MVP using mock property data for demonstration and product development purposes. Property prices, rental yields, risk ratings, ownership eligibility, payment plans, and project verification labels are sample data only and should not be treated as investment advice or verified market information.
