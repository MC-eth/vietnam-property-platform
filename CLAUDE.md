@AGENTS.md

# VietInvest Property

Read and follow `AGENTS.md` before making any code changes.

## Product

VietInvest Property is a bilingual Vietnam property investment and ownership-management platform for global overseas investors.

Core brand message:

“Find it. Own it. Manage it all.”

The long-term platform journey covers:

1. Discover districts and residences
2. Compare projects
3. Understand overseas-buyer eligibility
4. Receive expert guidance
5. Purchase
6. Manage documents, rental, maintenance and ownership through a future app

This is a proptech and ownership-management platform, not a traditional estate-agent website.

## Design direction

* Premium, modern and technology-led
* Warm ivory, deep navy and champagne gold
* Bright and easy to browse
* Dark backgrounds should be used selectively, not across the entire website
* Luxury without looking like a hotel, jewellery brand, cryptocurrency platform or trading terminal
* Strong visual hierarchy
* Concise copy
* More visual storytelling and less unnecessary text
* Consistent desktop, tablet and mobile behaviour

## Languages

* Support English and natural Hong Kong Traditional Chinese
* Never introduce Simplified Chinese
* Every new visible label must support both languages
* Use the existing translation system and `T` / `TD` components
* Do not hard-code bilingual UI copy directly inside components unless the existing architecture requires it

## Important live routes

* Homepage: `/`
* Residences listing: `/properties`
* Residence detail: `/properties/[slug]`
* Unit detail: `/properties/[slug]/units/[unitSlug]`
* District insights: `/districts/[slug]`
* Learn: `/learn`
* Universal search: `/search`

The legacy `/markets/[district]` route is currently still used by `lib/universal-search.ts`.

Do not delete or change `/markets/[district]` without also reviewing:

* `lib/universal-search.ts`
* search-result links
* redirects
* static generation
* internal navigation

## Important data sources

User-facing residences:

* `data/projects.ts`

Rich district insight content:

* `data/district-insights.ts`

District summary / map data:

* `data/districts.ts`

Learn page:

* `data/learn-hub.ts`

Translations:

* `constants/translations.ts`

Do not edit `data/mock/properties.json` for normal user-facing residence changes unless the task specifically concerns the admin or legacy markets experience.

`data/learn.ts` is currently unused. Do not build new Learn features on it.

## Factual safety

Do not invent:

* residence prices
* unit availability
* rental yields
* infrastructure dates
* overseas-buyer quotas
* project statuses
* developer claims
* economic statistics

For future developments, use cautious statuses such as:

* Existing
* Operational
* Planned
* Targeted
* Under Construction
* Under Review
* Approved Policy
* Subject to Delivery
* Planning Horizon

Do not imply guaranteed capital growth, rental demand or investment returns.

## Coding approach

Before changing code:

1. Run `git status`
2. Inspect the relevant route, shared component and data source
3. Check whether an existing reusable component already exists
4. Present a concise implementation plan for broad or risky changes
5. Make the smallest coherent change

Avoid:

* duplicate components
* duplicate routes
* duplicate data structures
* unnecessary dependencies
* unrelated cleanup during a feature task
* large refactors unless explicitly requested

Keep TypeScript strict and preserve the existing Next.js App Router conventions.

Consult the bundled Next.js documentation under `node_modules/next/dist/docs/` before making routing or server-component changes.

## Git safety

The working branch may be `publish`, but its upstream configuration must be checked before any push.

Never assume which branch Vercel production uses.

Never:

* commit
* push
* merge
* rebase
* change branch tracking
* deploy
* delete branches

unless explicitly requested.

For feature work, first ensure local `main` is aligned with `origin/main`, then create a feature branch from `main`:

`git switch main`
`git pull --ff-only origin main`
`git switch -c feat/<short-task-name>`

### Deployment

* Vercel Production Branch is `main`.
* Any merge or push to `main` may trigger a production deployment.
* Never push directly to `main` without explicit permission.
* Use feature branches and Pull Requests targeting `main`.
* Treat the local `publish` branch as legacy until it is deliberately reviewed or removed.
* Do not create new feature branches from `publish`.

Before any requested push:

* show `git status`
* show the changed files
* confirm the destination branch explicitly

## Validation

Before reporting a code task as complete, run:

`npm run lint`

and:

`npm run build -- --webpack`

Report the exact results.

Do not claim success if either command fails.

Also test the affected route in local preview where practical.

## Completion summary

At the end of every implementation task, report:

1. Files changed
2. What was implemented
3. What was deliberately left unchanged
4. Lint result
5. Build result
6. Any remaining risks
7. Whether anything was committed, pushed or deployed
