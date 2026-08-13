# Free Hosting Options for Cafe&Bar Luxor

Research date: 2026-08-13

| Option | Free custom domain | Can host the current public site | Can preserve the current full-stack features for free | Main limitation |
|---|---|---|---|---|
| Cloudflare Pages | Yes | Yes | Not directly; the current Express/tRPC backend must be rewritten for Workers and the existing Manus-backed database/storage/OAuth must be replaced or proxied. | Best free static host, but not a drop-in host for the current backend. |
| Netlify | Yes | Yes | Partially; functions and storage are available, but the current Express app and environment integrations need migration. | Free plan is credit-limited rather than unlimited. |
| Render | Yes | Yes | Closest drop-in option for the current Node/Express app. | Free web services spin down after 15 minutes; free PostgreSQL expires after 30 days. |
| GitHub Pages | Yes | Yes | No. It hosts static files only; database, OAuth, API, and file-management features would be unavailable. | Suitable only for the public, static version of the site. |

## Recommendation

Use **Cloudflare Pages** if the goal is a fully free public brochure/menu website at `cafebarluxor.com`. It can deploy the current Vite frontend from GitHub, provide HTTPS, and serve the existing managed images through the currently configured URLs. The owner-only file manager, database persistence, OAuth login, and APIs would remain on Manus or require a future migration to Cloudflare Workers, D1, and R2.

Use **Render** only if the full Express backend must move as a single application and an initial cold-start delay is acceptable. It is not a suitable permanent no-cost production solution because the free service spins down and Render's free Postgres database expires.

## Exact no-cost domain setup: Cloudflare Pages

The following steps move **only the public frontend** to Cloudflare Pages. They preserve the current Manus site until the final DNS switch and do not move the protected database, OAuth, or file manager.

1. Create a Cloudflare account, add `cafebarluxor.com` as a zone, and replace the domain’s nameservers at the registrar with the two Cloudflare nameservers shown in the Cloudflare dashboard. This is required for Cloudflare Pages to serve the apex domain.
2. Create a Cloudflare Pages project from `Northgatewebmike/cafe-bar-luxor`. Set the build command to `pnpm build` and the output directory to `dist/public`.
3. In **Workers & Pages → project → Custom domains**, add `cafebarluxor.com` first, then add `www.cafebarluxor.com`. Choose `cafebarluxor.com` as the primary domain and configure a redirect from `www` to the primary domain.
4. Do not delete the existing Manus DNS records until the Pages preview has been checked. Cloudflare creates the necessary Pages record for a zone it manages; replace the existing root and `www` destination only after the preview is confirmed.
5. Keep `/manus-storage/*` assets routed to the existing managed-storage origin. The current frontend already references these URLs, so the flipbook, venue photographs, favicon, and audio can remain unchanged.
6. Keep the current Manus deployment active for `/dateiverwaltung`, OAuth, database persistence, and file upload until those backend functions are migrated separately. A free Pages deployment alone is not a safe drop-in replacement for the Express/tRPC backend.

> Cloudflare Pages can serve the public Cafe&Bar Luxor website free of charge with HTTPS and the custom domain. The full owner-only backend needs a separate migration to Cloudflare Workers/D1/R2 or a paid always-on Node host before the Manus backend can be retired.

## Repository settings for Cloudflare Pages

Use these settings in the Cloudflare Pages project creation screen:

| Field | Value |
|---|---|
| Production branch | `main` |
| Build command | `pnpm build:pages` |
| Build output directory | `dist/public` |
| Node.js version | `22` |

The repository includes `client/public/_redirects` so direct visits to pages such as `/speisekarte`, `/allergene`, and `/oeffnungszeiten` return the React application rather than a 404. The dFlip runtime files are now loaded from the existing managed-storage origin, allowing the public menu to work unchanged after the Pages domain cutover.

## GitHub Pages visibility requirement

The `Northgatewebmike/cafe-bar-luxor` repository is private. GitHub Pages on GitHub Free is available only from public repositories, so publishing directly from this repository would require GitHub Pro or making the repository public. [8]

The safer no-cost option is a separate **public static-site repository**. It would contain only the compiled public website, public menu pages, imagery, icons, and a `CNAME` file. The existing private source repository would remain private, so it would retain the backend code, database migration files, storage implementation, and implementation notes without exposing them through the public website repository.

## Sources

1. Cloudflare Pages: [Free plan and custom-domain limits](https://pages.cloudflare.com/)
2. Cloudflare Pages: [Custom domain configuration](https://developers.cloudflare.com/pages/configuration/custom-domains/)
3. Render: [Free web service and database limitations](https://render.com/docs/free)
4. Render: [Custom domains](https://render.com/docs/custom-domains)
5. Netlify: [Free plan](https://www.netlify.com/pricing/)
6. Netlify: [Assign a custom domain](https://docs.netlify.com/manage/domains/manage-domains/assign-a-domain-to-your-site-app/)
7. GitHub Pages: [Custom-domain configuration](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
8. GitHub Pages: [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
