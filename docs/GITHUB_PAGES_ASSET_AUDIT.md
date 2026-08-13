# GitHub Pages Public Asset Audit

Audit date: 2026-08-13

The generated public artifact is located at `/home/ubuntu/cafe-bar-luxor-pages-build` and is intentionally separate from both the private source repository and the tracked public Pages repository.

| Category | Verified status |
|---|---|
| Compiled Vite application | Included in the artifact root and `assets/` directory. |
| Client-side route fallback | `404.html` is copied from `index.html` so GitHub Pages serves the application for direct page visits. |
| Venue/galleries/menu images | Included under `media/`, including all 11 flipbook pages and the menu cover. |
| Page-turn audio | Included under `media/turn_d5b169b6.mp3`. |
| Hero, logo, and coffee images | Included under `media/`. |
| Browser, Apple, Android, and web-app icons | Included at the artifact root. |
| Custom-domain marker | `CNAME` contains `cafebarluxor.com`. |
| Jekyll bypass | `.nojekyll` is included. |

The final artifact contains **39 bundled media files** plus the public icons. A recursive audit found no remaining references to `/manus-storage/`, the former CloudFront storage origin, or the external Unsplash image URL in compiled HTML, JavaScript, CSS, JSON, or manifest files.

Final command verification confirmed that the artifact contains `index.html`, an identical `404.html` client-route fallback, `CNAME`, `.nojekyll`, `site.webmanifest`, `favicon.ico`, all 11 flipbook pages, the turn-sound file, the hero, the social-preview logo, the coffee image, and 13 public icon/manifest files.

The public artifact deliberately excludes backend source code, database schema and credentials, OAuth logic, file-management UI, storage secrets, and internal documentation.

## Static route test results

The generated static artifact was served locally with GitHub Pages-equivalent fallback handling. The homepage rendered correctly with the visual design, hero image, navigation, legal/footer elements, menu link, and Sunday hours. The `/speisekarte` route rendered through the fallback and displayed its hero and allergen information, but the dFlip book remained in its loading state after initial testing. The local dFlip runtime and its asset references must be corrected before publication.

### Closed-loop correction baseline

The failed menu initialization was traced to four runtime files referenced in `index.html` but absent from the first artifact: the dFlip stylesheet, Three.js, PDF.js, and the dFlip script. The success state requires all four files under `/media/`, no unresolved external media URLs, a visible flipbook cover on `/speisekarte`, and direct navigation working for every public route through `404.html`.

The corrected artifact now bundles all four runtime files. A second browser check confirmed that `/speisekarte` initializes the book, reports `1/11`, and renders the Luxor cover rather than remaining in the error state.

## Publication state

The separate public repository `Northgatewebmike/cafe-bar-luxor-pages` now contains the complete static artifact and GitHub Pages has been enabled from its `master` branch at the repository root. The custom domain is deliberately deferred until the GitHub Pages default URL has been fully validated. This avoids redirecting preview traffic to the still-live domain before its DNS records are changed.
