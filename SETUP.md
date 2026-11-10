# Local setup and deployment boundaries

This is the actual server-backed MEDORA source export. It is not a static HTML demo or a GitHub Pages application. Uploaded files, sessions, quizzes and AI actions require a backend.

## Requirements

- Node.js 22.13 or newer; use Node 24 for the bundled `node:sqlite` test runner.
- pnpm matching the version in `package.json` (11.25.0 at export).
- Your own API key and available credits for live AI operations. A paid ChatGPT subscription is separate from the app's API configuration.
- D1/R2 bindings when deploying the full application.

## Start a local development workspace

1. Extract this archive and open a terminal in the directory containing `package.json`.
2. Run `pnpm install --frozen-lockfile`. Do not use the managed-Linux `install:ci` script as a general Mac/Windows installation guide; it expects additional host tooling.
3. Copy `.dev.vars.example` to `.dev.vars` and set `OPENAI_API_KEY` in that local file. The template contains no real credentials. Do not commit `.dev.vars`.
4. Run `pnpm db:local`. The helper applies migrations to local emulated D1, never to production. Repeat runs skip already-applied migrations.
5. Run `pnpm dev` and use the local address printed by the framework.
6. Open the prepared sample. AI generation and web research require API configuration; saved sample content does not.

`.dev.vars` is read by Cloudflare local tooling. Some external deployment environments instead supply environment variables at runtime. Keep production secrets in the hosting platform's secret settings.

## Tests and build

```bash
pnpm check
pnpm test
pnpm build
```

The tests bundle application routes and mock provider responses; they do not need a real API key and must not be mistaken for a clinical accuracy evaluation. Some PDF tests can emit font warnings. `pnpm start` uses the generated Worker configuration after a successful build.

Local data is stored beneath `.wrangler/state`. Do not commit or upload that folder. The export contains neither the existing production database nor uploaded study files.

## Identity and hosting

The published app runs on ChatGPT Sites, which provides trusted authenticated-user headers. The portable development profile supplies a localhost-only development sign-in simulator. It is not real ChatGPT authentication.

**Do not deploy this code behind a public server that accepts arbitrary `oai-authenticated-user-*` headers from clients.** The backend trusts those headers in its original Sites environment. A separate deployment must strip untrusted identity headers and replace them only after server-side authentication, or deliberately restrict the deployment to properly isolated guest access. It also needs an authentication strategy for the MCP endpoint and support-owner inbox.

The exported `.openai/hosting.json` keeps D1/R2 binding declarations but removes the original live site's project ID. Do not substitute Rifana's existing project identity when deploying a copy. Hosting a new copy requires its own registration, database, bucket, secrets and access controls. The export does not include a one-click external deployment configuration.

For a separate Cloudflare deployment, create your own D1/R2 resources, configure bindings, apply the tracked migrations and verify authentication/ownership before inviting users. The local placeholder database ID is for emulation only.

## Optional support email

Support messages can be stored without sending email. Email delivery requires both `RESEND_API_KEY` and `MEDORA_SUPPORT_FROM` for a sender/domain you control and have verified. The recipient/owner identity is configured in the support route; review it before deploying your own copy. Email notification delivery is not enabled merely by downloading this source.

## Limits to understand

- 100 MB storage total per notebook across up to three files.
- Less than 50 MB of selected documents per AI analysis; images up to 20 MB.
- A bounded PDF/text excerpt index, with smaller limits than the file-analysis path.
- Per-owner and shared guest AI quotas; generation can fail when API credits are exhausted.
- A focused lesson and its six sections do not cover every page, figure, pathology or exam objective.
