# NewsLLM landing page

This is the local NewsLLM landing page preview. Run the local server to view it with its external fonts, map outline, and images.

## Files

- `index.html` and `zh.html` — English and Traditional Chinese page structure and copy
- `assets/site-en.css` and `assets/site-zh.css` — page styles, including locale-specific layout adjustments
- `src/site-content.ts` — typed, shared source for locale-specific dialog and topic copy
- `assets/site-interactions.js` — shared navigation, dialog, tabs, topics, and scroll behavior
- `assets/report-screenshots.js` — reusable product screenshot renderer
- `assets/fonts/` — subset WOFF2 fonts used by the page
- `assets/taiwan-outline.svg` — Taiwan main-island geometry
- `assets/taiwan-outer-islands.svg` — simplified Kinmen, Penghu, and Matsu outlines from [NLSC county boundaries](https://data.gov.tw/dataset/7442), transformed from EPSG:4326; Kinmen and Matsu are inset in the hero composition
- `assets/taiwan-east-islands.svg` — Green Island, Orchid Island, and Little Orchid Island from the same NLSC county boundaries, shown at their projected positions southeast of the main island
- `assets/newsllm-social.png` — social share preview

## Optional local preview

```bash
npm run dev
```

Open `http://127.0.0.1:4173/`. Run `npm run build` to create the static `dist/` output.

The development server and build compile `src/site-content.ts` into `assets/site-content.js` using Node's built-in TypeScript stripping (tested with Node 26.12.0). Edit the TypeScript source rather than the generated JavaScript file.

The September 2026 source inventory lists 6,828,820 records across seven media archives. The page does not offer account creation or research submission until those services are connected. Per-outlet counts, date ranges, and publisher-specific excerpt permissions still need verified source material. Building locally does not update the public Vercel site.
