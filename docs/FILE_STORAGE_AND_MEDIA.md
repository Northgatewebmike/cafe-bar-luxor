# File Storage & Media Archive

Cafe&Bar Luxor is now a **full-stack** application with an Express/tRPC backend, MySQL metadata persistence, Manus OAuth, and managed object storage.

## Secure file workflow

The owner-only route `/dateiverwaltung` accepts JPG, PNG, WebP, PDF, TXT, DOCX, and XLSX files up to 8 MB. After an owner signs in, each accepted file is validated server-side, written to managed object storage, and recorded in the `uploaded_files` database table. The database stores only metadata such as the object key, delivery URL, original filename, MIME type, size, owner, and timestamp; file bytes never enter the database.

Only users with the `admin` role can list or upload files. The owner identity is promoted by the existing OAuth workflow. Files are delivered through `/manus-storage/` URLs, which keeps the storage implementation compatible with deployment.

## Verification

The storage feature is covered by unit tests for filename sanitization, type/size validation, authentication/role enforcement, and oversized payload rejection. Type checking also passes. A signed-in owner can perform the final live upload test through `/dateiverwaltung` whenever needed.

## Website source and media repositories

| Repository | Purpose |
|---|---|
| [Website source](https://github.com/Northgatewebmike/cafe-bar-luxor) | Deployable React application, backend, database schema, migrations, tests, legal pages, and site configuration. |
| [Private media archive](https://github.com/Northgatewebmike/cafe-bar-luxor-assets) | Every externally stored venue photo, flipbook page, page-turn audio file, shared hero image, favicon, Apple icon, and Android icon. |

The media archive is separate by design. The production project references managed storage URLs directly, avoiding large binary assets inside the deployable source repository while still preserving the complete image and media collection in GitHub.
