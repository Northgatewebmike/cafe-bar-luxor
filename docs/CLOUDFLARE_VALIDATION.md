# Cloudflare Pages Public Build Validation

Validated on 2026-08-13 against the Cloudflare-ready frontend configuration.

| Route | Result |
|---|---|
| `/` | Homepage renders with navigation, hero imagery, correct Sunday hours, legal footer links, cookie banner, and external media URLs. |
| `/speisekarte` | dFlip menu loads with the cover, 11-page counter, navigation controls, allergen notice, and externally hosted runtime assets. |
| `/allergene` | Direct route renders the required LMIV allergen and additive information, disclaimer, and 14-item legend. |
| `/oeffnungszeiten` | Direct route renders the schedule with Sunday correctly separate at 10:00–21:00. |

The `pnpm build:pages` build completed successfully. The generated `dist/public` output contains the SPA fallback (`_redirects`), cache policy (`_headers`), icons, verification file, manifest, and compiled frontend assets required by Cloudflare Pages.

## Connected-account preparation

The Cloudflare account was connected through the user's browser. The Cloudflare Workers and Pages GitHub app was installed with **restricted access to `Northgatewebmike/cafe-bar-luxor` only**; no other repositories were selected. Cloudflare now presents this repository in its Pages creation workflow, ready for build configuration and deployment.

The Pages project is configured to use the production branch `main` and is provisionally named `cafe-bar-luxor`, which will create the temporary host `cafe-bar-luxor.pages.dev`. The custom domain has not been changed.

Cloudflare Pages was configured with the verified values `pnpm build:pages` and `dist/public`. The initial deployment is running from commit `b535670b70eaf543a4502ac625a7847d118c3273`; no custom-domain DNS records have been modified during this deployment.

At the last dashboard check, Cloudflare had cloned the repository and was completing dependency installation in the build environment. The deployment had not yet reported success or failure.

The build remained in the initialization/dependency-installation stage after approximately three minutes. The dashboard exposes a downloadable deployment log, which will be used if the status does not progress.

After approximately four minutes, the dashboard still showed initialization without an explicit failure and no additional log lines beyond package download progress. The project was created, but the deployment result remains pending.

The project overview is available while the build runs. At approximately five and a half minutes, Cloudflare still had not reported a build failure or completion, so the deployment was left active rather than cancelled.

At approximately six and a half minutes, the deployment still displayed dependency initialization without an explicit error. The deployment remains active and has not affected the current `cafebarluxor.com` DNS configuration.

## Current Cloudflare deployment record

| Field | Value |
|---|---|
| Cloudflare project | `cafe-bar-luxor` |
| Project temporary host | `https://cafe-bar-luxor.pages.dev` |
| Deployment ID | `8529b938-4897-4434-a20d-6c458bc74cd0` |
| Deployment URL | `https://8529b938.cafe-bar-luxor.pages.dev` |
| Source | `Northgatewebmike/cafe-bar-luxor`, branch `main`, commit `b535670` |
| Status at inspection | `active`, initialization stage for approximately 10 minutes, with no explicit error and no completed deployment |

No production deployment was available at the time of inspection; `cafebarluxor.com` and `www.cafebarluxor.com` remain unchanged.

## Deployment outcome

Cloudflare reported deployment `8529b938-4897-4434-a20d-6c458bc74cd0` as **failed** after a 27-second build. The visible log confirms that cloning and dependency installation completed, so the next action is to inspect the remaining error lines and correct the public-build configuration before retrying. No production Pages deployment is available, and no DNS changes were made.
