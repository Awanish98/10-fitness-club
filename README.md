# PULSE SOCIAL CLUB — community fitness & wellness demo

A complete, standalone front-end demo for an invented neighbourhood fitness club. It is a **concept showcase only**: every price, time, availability figure, event, coach identity and contact detail is sample content, and no booking, payment or data transmission takes place.

## Brand & design system

- **Brand story:** a warm, sociable alternative to the hardcore gym — small group classes, mindful movement and time to talk afterwards.
- **Palette:** warm neutral paper `#f7f4ee`, ink navy `#172438`, coral `#bb4332` (primary actions), cobalt blue `#2f5d8c` (secondary), soft peach and sky tints. Text colours meet AA contrast on their surfaces.
- **Typography:** Fraunces for editorial display headings, Outfit for UI and body copy. Both are loaded from the Google Fonts links in `index.html`.
- **Shape & depth:** rounded cards (`16–30px`), pill buttons/chips, an arched photo in the hero, gentle shadows and an overlapping photo collage.
- **Motion:** restrained `transform`/`opacity` transitions of 120–350ms; all animation is removed under `prefers-reduced-motion: reduce`.
- **Image direction:** local photography only, with rounded crops, gradient fallbacks and explicit intrinsic dimensions to prevent layout shift.

## Sections & features

Single-page anchors, each built as a complete content area:

1. **Home** — editorial split hero, arch-cropped feature photo, overlapping community photo, floating demo schedule card and circular "move / meet / repeat" seal.
2. **Classes** — four illustrated class formats with type chips that set the timetable filter and scroll to it.
3. **Why** — club-values cards and clearly labelled illustrative sample figures.
4. **Coaches** — three fictional sample profiles with an accessible detail dialog (Escape, backdrop close, Tab trap, focus restoration).
5. **Membership** — three sample plans, monthly/annual view, feature comparison table and a cost estimator that displays its formula (`sample monthly rate × months`).
6. **Timetable** — 20 sample sessions with day tabs (arrow-key support), class-format chips, empty state, and a choice of card or compact-table views. Each row can prefill the trial form.
7. **Trial request** — controlled form with inline blur/submit validation, `aria-invalid`/`aria-describedby`, first-invalid-field focus, and a demo-only success panel with a "send another" reset. Nothing is sent or stored.
8. **Community** — three sample events that prefill the trial form, plus a photo mosaic with a keyboard-accessible lightbox (arrow keys, Escape, labelled controls, visible backdrop).
9. **FAQs** — accessible accordion with real open/closed state.
10. **Contact & footer** — placeholder address, hours, email and demo WhatsApp link, plus footer navigation and a back-to-top control.

Global behaviour: sticky responsive header, mobile menu with `aria-expanded`/`aria-controls` that closes on Escape/outside click/link selection and moves focus sensibly, skip link, semantic landmarks, single `h1`, visible focus rings, and layouts checked in CSS at phone/tablet/desktop breakpoints down to 320px.

## Commands

Run these from `P:\Demo_websites\10-fitness-club`:

```bash
npm install
npm run dev       # local Vite dev server
npm run typecheck # tsc --noEmit (also used as lint)
npm run build     # typecheck + production build into dist/
npm run preview   # preview the production build
```

**Environment note:** the build machine blocks native `.node` binaries via Application Control, so the Vite scripts load `scripts/rollup-wasm-shim.cjs`, a tiny resolver hook that points Rollup's native loader at the official `@rollup/wasm-node` package. It is a no-op on machines where native Rollup works, and the shim file can be removed from the npm scripts if you do not need it.

## Deployment

Static site — no server, API keys or environment variables required. Run `npm run build` and upload the contents of `dist/` to any static host (Netlify, Vercel, GitHub Pages, S3/CloudFront, etc.). For GitHub Pages under a sub-path, set Vite's `base` option accordingly. All image URLs are root-relative (`/images/...`), which assumes deployment at the domain root.

## Sample-data disclosure

This is a demo concept, not a real business. There are no real reviews, ratings, awards, credentials, availability figures or business facts. The site visibly labels sample rates, demo schedules, fictional coach profiles, illustrative event dates and demo contact links. The trial form explicitly states: "Demo enquiry received — no real booking/payment is made. Replace this demo flow with your client's confirmed process before launch." No form data is transmitted, persisted or emailed.

## Placeholders a real client must replace

- Studio name/address and geographic location (currently "Sample studio address").
- Phone / WhatsApp number — the link is `https://wa.me/000000000000` and is labelled "Demo WhatsApp link — replace with client number".
- Email address (`hello@example.com`) and any enquiry routing.
- All membership prices, the estimator rate and any fees or terms.
- Every timetable time, room, format, coach assignment and available-places figure.
- All class descriptions, coached session names and sample capacity bars.
- Coach names, portraits, biographies and session specialisms (fictional identities).
- Event titles, sample dates, times and descriptions.
- Opening hours, FAQ answers and club-values copy.
- The demo success message and form flow must be connected to the client's confirmed booking/CRM process.
- Replace local demo photography with client-approved photography; update `index.html` SEO/OG metadata and the favicon for the real brand.

## Assets

Only the local files in `public/images/` are used: `hero.jpg`, `community.jpg`, `studio.jpg`, `class-yoga.jpg`, `class-cycle.jpg`, `class-mindful.jpg`, `coach-1.jpg`, `coach-2.jpg`, `coach-3.jpg`. No remote or generated images are used. `assets/website-design-preview.png` is a preserved reference and is not used as site content.
