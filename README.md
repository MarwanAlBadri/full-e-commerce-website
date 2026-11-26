# Exclusive — E-Commerce Website

A responsive online store built with React for the Almdrasa Front-End Diploma graduation project,
following the "Exclusive" Figma design.

**Live site:** _add the Vercel URL here after deploying_

## Features

- Home page with flash sales, categories, best sellers and new arrivals
- Product search (press Enter in the header search field) and category listings
- Product page with photos, colours, sizes, quantity and **customer reviews**
- Wishlist and shopping cart with a live header counter and a demo coupon (`SAVE10`)
- Checkout with form validation and an order confirmation (no real payment)
- Sign up, log in, log out and an account area (profile, orders, reviews)
- About, Contact and 404 pages
- Works on mobile, tablet and desktop

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · React Router 7 · Playwright

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:5173>.

| Command            | What it does                     |
| ------------------ | -------------------------------- |
| `npm run dev`      | Start the development server     |
| `npm run build`    | Type-check and build for release |
| `npm run preview`  | Serve the production build       |
| `npm run lint`     | Run ESLint                       |
| `npm run format`   | Format the code with Prettier    |
| `npm run test:e2e` | Run the end-to-end tests         |

The first test run needs the browser: `npx playwright install chromium`.
To test a deployed copy, set `BASE_URL` to its address before running the tests.

## Data and limitations

There is no backend. Accounts, cart, wishlist, reviews and orders are stored in the browser's
`localStorage`, so they stay on one device. Passwords are saved as a SHA-256 hash, but this is a
demo and not a replacement for real server-side authentication. Google sign-up, password reset,
the contact form and payment are placeholders. The sale countdowns restart on every visit.

## Project structure

```
src/
  app/         providers and routes
  components/  UI, layout and page sections
  constants/   routes, test ids and storage keys
  context/     auth, cart and wishlist state
  data/        product catalogue
  hooks/       reusable React hooks
  pages/       one component per route
  services/    data access (products, auth, orders, reviews)
  utils/       pure helpers (prices, validation, formatting)
e2e/           Playwright tests
```

## Deployment (Vercel)

Import the repository in Vercel and keep the detected Vite settings. `vercel.json` rewrites every
path to `index.html`, so pages such as `/cart` open directly.
