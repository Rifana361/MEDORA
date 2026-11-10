<div align="center">
  <img src="public/medora-logo-v2.png" alt="MEDORA logo" width="100" />
  <h1>MEDORA</h1>
  <p>Your sources. Your lightbulb moment.</p>
  <p>An AI-powered learning workspace created by Rifana using ChatGPT.</p>
</div>

[Try the live app](https://medora-medical-learning.rifanariffu844.chatgpt.site) · [Setup](docs/SETUP.md) · [GitHub upload guide](UPLOAD_TO_GITHUB.md) · [Security](SECURITY.md)

## Why I built MEDORA

Reading a difficult chapter is different from being able to explain it. I built MEDORA to help students move between understanding, visual connections and active recall in one workspace. My background in medicine and cognitive and clinical neuroscience shaped the idea: explanations should make the reasoning clearer, and learners should be able to inspect what supports them.

MEDORA focuses on medical students while supporting educational material from other subjects. It is an early learning pilot, developed iteratively with ChatGPT and learner feedback. It is not an independently validated medical resource or an official examination preparation product.

## What learners can do

- **Bring their materials:** upload PDF, DOCX, PPTX, TXT, Markdown, CSV, XLSX or supported images, or paste educational notes.
- **Choose a study batch:** store up to 100 MB total across three files. AI document analysis requires a selected batch below 50 MB; images support up to 20 MB. Unselected files remain stored and are labelled as outside the lesson's analysis scope.
- **Build a study kit:** generate plain-language explanations, deeper theory, analogies, examples and original practice questions.
- **Ask for a deeper lesson:** choose a concept, describe what feels confusing, and select a teaching level. The tutor rereads selected original sources, separates added teaching context and reports gaps.
- **Read complete infographic pages:** explore six teaching sections without clipping the explanation to fit a poster. Export the current page as SVG/PNG or the whole lesson as Markdown or a printable HTML revision sheet.
- **Explore mind maps:** open branches on a navy star background to read explanations, examples, distinctions and limits.
- **Practise with flashcards:** attempt a question before revealing its answer, use hints, compare explanations and review tempting mistakes. Export CSV or Anki-compatible text; Anki exports do not include review scheduling.
- **Take timed tests:** server-managed deadlines, saved answers, confidence ratings and explanations for every option after submission.
- **Revisit mistakes:** new attempts retain concept and evidence snapshots. Review notes and learner-rated recall help plan another attempt.
- **Explain it back:** write or use browser dictation where available, edit the transcript, then request feedback. Browser support and recognition services vary.
- **Research separately:** optionally search online sources with links while keeping research distinct from uploaded material.
- **Inspect evidence:** compare short quotations with supported indexed source text and view coverage limits. A text match does not prove that an interpretation is correct.

The website supports isolated guest workspaces. The authenticated ChatGPT plugin exposes notebook, tutor, flashcard, research, reasoning and quiz operations through an MCP endpoint.

## Learning flow

1. Upload or paste a small educational topic and choose your level and language.
2. Read the first study kit and inspect its scope.
3. Open **Visual studio**, choose a concept and select **Build deeper lesson**.
4. Explore the connected infographic, mind map and flashcards.
5. Explain the concept without looking, practise questions, and revisit gaps.

Saved tutor packs are reused when inputs and teaching settings match. Changing views or reviewing saved cards makes no new AI request. Generation, feedback and web research use the configured API account and its quotas.

## Technology

| Area | Implementation |
| --- | --- |
| UI | React 19, TypeScript, Vinext, Vite, CSS, Lucide icons |
| Runtime | Cloudflare Workers |
| Durable data | Cloudflare D1 and Drizzle SQL migrations |
| Uploaded files | Cloudflare R2 |
| AI | OpenAI Responses API; model configured in `lib/server-learning.ts` |
| Output validation | JSON Schema and Zod |
| PDF text index | unpdf; bounded extraction |
| Voice input | Browser Web Speech recognition where supported |
| ChatGPT integration | Authenticated MCP route at `/mcp` |

## Run locally

See [SETUP.md](docs/SETUP.md) for the complete instructions and authentication limits. Use Node.js 22.13+ (Node 24 recommended for the bundled SQLite-based tests) and the pnpm version pinned in `package.json`.

```bash
pnpm install --frozen-lockfile
cp .dev.vars.example .dev.vars
# Add your own API key to .dev.vars locally. Never commit that file.
pnpm db:local
pnpm dev
```

The prepared sample works without AI credits. AI features need a valid key and available API credits. Never paste a real key into a GitHub issue, README, screenshot or commit.

## Validation

```bash
pnpm check
pnpm test
pnpm build
```

The integration tests use in-memory SQLite, an emulated R2 binding and mocked AI responses. They cover ownership, guest isolation, source selection, upload limits, hidden quiz answers, deadlines, tutor cache reuse, malformed-output preservation and export safety. Source-index tests include a synthetic PDF. These checks do not evaluate clinical correctness or prove improved learning outcomes.

The published version was also checked in a browser, including a live tutor generation and a second cached read. The portable source export requires its own environment setup; a fresh third-party deployment has not been verified.

## Repository map

```text
app/           Website, styles, API routes and MCP endpoint
components/    Tutor studio, mind map, flashcards, voice and revision UI
lib/           Learning types, prompts, validation, exports and server helpers
db/            Database schema
drizzle/       SQL migrations
public/        Logo and other public assets
scripts/       Local tooling and automated checks
worker/        Worker entrypoint
docs/          Setup, architecture and implementation notes
```

## Boundaries and responsible use

Use educational materials you are allowed to process. Do not upload patient records, identifiable case material, passwords or confidential documents. AI may omit information, misunderstand figures or invent details. Source quotations and medical interpretations need human checking. Generated cases are fictional; scores and self-ratings are not validated measures of mastery or readiness for an exam.

PDF source matching is bounded to supported files up to 8 MB each, the first 80 PDF pages per file and 180,000 indexed characters per notebook. Scanned images, diagrams and unsupported formats may not be indexed. This text index is separate from AI file processing, and neither implies full-document coverage.

Guest access belongs to a browser session for up to 30 days. Clearing cookies or changing browsers can lose access. Expiration is not a promise of automatic file deletion. Browser dictation may use the browser provider's online recognition service. `store:false` is used for Responses requests; it is not a claim of zero retention across all providers or storage systems.

## Authorship and rights

Created by **Rifana**, MBBS and MSc Cognitive and Clinical Neuroscience, using **ChatGPT** for development assistance. Third-party frameworks and bundled components retain their own licenses. No broad open-source license has been selected for MEDORA-specific code; see [LICENSE.md](LICENSE.md).

## Project status

Active educational pilot. Useful next evaluations include independent review of medical explanations, accessibility testing with learners, and real user feedback about voice input and learning outcomes. Superiority over NotebookLM has not been established.
