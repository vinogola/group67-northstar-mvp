# Go-Live Note — Northstar Support Deflection MVP
## What works
- Order status lookup: type an order ID, get status, delivery estimate, and carrier info. Handles IDs that don't match anything.
- Stock availability lookup: type an item name, get in-stock, low-stock, or out-of-stock. Includes example buttons so you don't have to guess valid input.
- Both are live at https://group67-northstar-mvp.vercel.app, deployed on Vercel, redeploys automatically when `main` updates. - ## What's known but not fixed.
- The two lookups sit on the same page right now instead of a proper landing page with links to each. That's in progress.
- Both use hardcoded mock data — nothing persists, a page reload resets everything.
- ## What Northstar's team needs to do to take this over
- Swap the mock data in `orderService.ts` and `stockService.ts` for real API calls
— the lookup functions are already isolated, so this shouldn't touch the UI. - Hosting is on Vercel, connected straight to this GitHub repo's `main` branch.
