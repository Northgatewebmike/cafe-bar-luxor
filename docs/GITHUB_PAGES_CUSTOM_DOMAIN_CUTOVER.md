# GitHub Pages custom-domain cutover: cafebarluxor.com

## Current verified state

The public website is currently served from **https://northgatewebmike.github.io/cafe-bar-luxor-pages/**. GitHub Pages is public, uses the `master` branch and repository root, and has HTTPS enabled. No custom domain is configured yet. Keep this default URL active until the DNS change window.

> Configure `cafebarluxor.com` in GitHub Pages **before** changing DNS. GitHub recommends this order to prevent a third party from claiming the domain for another Pages site.[1]

## Cutover procedure

| Order | Action | Required setting or value |
|---|---|---|
| 1 | Verify domain ownership in GitHub, if prompted. | `cafebarluxor.com` |
| 2 | In `Northgatewebmike/cafe-bar-luxor-pages` open **Settings → Pages** and enter the custom domain. | `cafebarluxor.com` |
| 3 | Wait for GitHub to accept the domain setting. For branch-based publishing, GitHub creates a root `CNAME` file. | Do not manually create a second or conflicting `CNAME` file. |
| 4 | At the DNS provider, replace the existing apex records with all four GitHub Pages IPv4 records. | See DNS table below. |
| 5 | Add the `www` alias. | `www` CNAME → `northgatewebmike.github.io` |
| 6 | Wait for DNS propagation, then return to **Settings → Pages** and enable HTTPS when GitHub makes the option available. | Do not force HTTPS before the certificate is issued. |
| 7 | Confirm both `https://cafebarluxor.com` and `https://www.cafebarluxor.com` work, with one redirecting to the selected canonical domain. | Prefer the apex domain as configured above. |

## DNS records

| Host / name | Type | Target / value |
|---|---|---|
| `@` | `A` | `185.199.108.153` |
| `@` | `A` | `185.199.109.153` |
| `@` | `A` | `185.199.110.153` |
| `@` | `A` | `185.199.111.153` |
| `www` | `CNAME` | `northgatewebmike.github.io` |

The optional IPv6 `AAAA` records, verification commands, and GitHub’s DNS-record guidance are documented in the official GitHub Pages instructions.[1]

## Validation after DNS changes

Use the following checks after the provider saves the records. DNS propagation and GitHub’s certificate issuance can take up to 24 hours.[1]

```shell
dig cafebarluxor.com +short A
dig www.cafebarluxor.com +short CNAME
curl -I https://cafebarluxor.com
curl -I https://www.cafebarluxor.com
```

Do not use a wildcard DNS record such as `*.cafebarluxor.com` for this configuration because GitHub cautions that it can create a domain-takeover risk.[1]

## References

[1]: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site "GitHub Docs — Managing a custom domain for your GitHub Pages site"
