# Webste-App integration architecture

## Product boundary

`Webste-App` is the public experience layer. It is not a second backend, customer database, billing system, security control plane, or AI authority.

```text
Visitor
  -> Webste-App (public UX)
  -> NusaSec-AI (public intelligence)
  -> NusaSec-Core (system of record)
  -> App-Customer / App-Internal after authentication
```

## Canonical production services

- Website: `https://nusasec.com`
- Core API: `https://api.nusasec.com`
- AI API: `https://ai.nusasec.com`
- Customer App: `https://app.nusasec.com`
- Internal App: `https://internal.nusasec.com`

These are deployment contracts documented by NusaSec-Core. DNS/TLS/hosting remain deployment concerns.

## Public AI boundary

The website sends public questions directly to NusaSec-AI `/v1/chat` using:

- `mode=public`
- `access_tier=public_general`
- no tenant id
- no delegated private credential

NusaSec-AI remains responsible for validation, public context routing, evidence handling, model routing, and response policy. Customer/internal delegated context must never originate from this public web bundle.

## Authentication boundary

The website does not implement its own authentication database. Login uses NusaSec-Core:

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/mfa/verify`

The Core session and CSRF cookies are authoritative. After successful authentication the returned `user_type` determines the destination:

- customer -> `https://app.nusasec.com`
- internal -> `https://internal.nusasec.com`

Customer signup is owned by the customer control plane/Core and is not simulated in the public bundle.

## Content boundary

Public CMS content should consume the Core public publishing contract rather than the local `mockCmsData` module. Local mock data may remain for design-time previews but must not be treated as production truth.

Expected public contracts are documented by NusaSec-Core under `/api/v1/public/*`, covering published pages, news, navigation, brand, and public status.

## Deployment

- GitHub Pages preview path: `/Webste-App/`.
- Production custom domain: `/`.
- `VITE_BASE_PATH` controls the Vite base path.
- Never store Core or AI private credentials in `VITE_*` variables.
