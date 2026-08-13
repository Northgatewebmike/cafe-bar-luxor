# Vercel Deployment Guide

The repository is configured for **Vercel** with a static React build in `dist/public` and a Node.js serverless function at `api/index.ts`. The public site, client routes, tRPC API, OAuth callback routes, database access, and owner-only file manager all retain the same code path used locally.

## GitHub integration

The Vercel project should be linked to:

```text
Northgatewebmike/cafe-bar-luxor
```

Every push to the repository’s production branch will then trigger a Vercel deployment.

## Required Vercel environment variables

Add the following variables in **Vercel → Project Settings → Environment Variables** for both **Production** and **Preview** environments. Use the values from the current working environment; do not place secret values in GitHub.

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | MySQL/TiDB connection used for users and uploaded-file metadata. |
| `JWT_SECRET` | Signs session cookies. |
| `VITE_APP_ID`, `OAUTH_SERVER_URL`, `VITE_OAUTH_PORTAL_URL` | Required for the existing Manus OAuth flow. |
| `OWNER_OPEN_ID`, `OWNER_NAME` | Identifies the site owner and grants the owner admin storage access. |
| `BUILT_IN_FORGE_API_URL`, `BUILT_IN_FORGE_API_KEY` | Required server-side for managed file storage. |
| `VITE_FRONTEND_FORGE_API_URL`, `VITE_FRONTEND_FORGE_API_KEY` | Required by the client-side Maps integration. |
| `VITE_ANALYTICS_ENDPOINT`, `VITE_ANALYTICS_WEBSITE_ID` | Retains the existing consent-gated analytics setup. |

> The public pages and managed image URLs work immediately after deployment. The protected file manager, OAuth sign-in, Google Maps, and analytics require the listed values to preserve their current behavior.

## Media routing

`vercel.json` forwards existing `/manus-storage/*` media requests to the current managed hosting location. This preserves the exact flipbook images, venue photos, audio, favicon assets, and storage URLs without copying large production files into the Vercel build.

## Domain migration

After the Vercel deployment is verified, add `cafebarluxor.com` and `www.cafebarluxor.com` in the Vercel project’s domain settings, then update DNS at the domain registrar using the values Vercel provides. Update the OAuth redirect URL before moving the primary domain, so owner login and the file manager continue to work.
