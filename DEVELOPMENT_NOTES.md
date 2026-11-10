# Medora Learning Studio

A private, source-led learning workspace for any subject. The earlier medical starter collection remains available at `/practice`.

## Included

- Account-owned notebooks and original uploads in D1 / R2.
- PDF, DOCX, PPTX, TXT, Markdown, CSV, XLSX, PNG, JPG and WebP uploads (3 files, 100 MB each, 100 MB total; decimal MB).
- Configurable explanation level, goal and teaching language.
- Grounded study kits with intuition, theory, analogy, example, misconception and source references.
- Interactive concept maps and SVG / PNG infographic export.
- Server-timed practice tests with saved selections, resume, auto-expiry, server marking, confidence tracking, full option explanations and history.
- Explain-it-back feedback and source-only follow-up questions.
- Opt-in live web research with API-returned citation links, separated from uploaded sources.
- A clearly labelled built-in sample with a pre-generated illustration, requiring no new AI calls to view.
- Comfortable 20 px reading text with persistent 23 px and 26 px preferences, larger interface controls, and generous line spacing.
- Source-grounded illustrated walkthroughs, memory cues, check questions, and original concept illustrations generated via the Images API. Generated images are stored privately and removed with their notebook.

## Runtime

Vinext / React on Cloudflare Workers. Keep `.openai/hosting.json`, the Sites build integration and the project identity. Hosted authentication is provided by Sites. API routes require the authenticated visitor header and check ownership for every notebook, file and attempt. Local development only uses a local preview identity.

`OPENAI_API_KEY` is a server-only Sites secret. Local `.env.local` / `.dev.vars` are ignored. Do not put secrets in source, the manifest, or the browser bundle. The default generation model is `gpt-6.1-terra` using the Responses API with `store: false`. The provider's retention policies still apply. Files are passed inline rather than uploaded into a persistent provider vector store.

AI features require available OpenAI API credits. The original setup had no API credits. A later live check succeeded, and source-grounded visual walkthrough and image-generation routes have now been verified using synthetic demonstration notes. The UI handles billing errors without inventing lesson output. Requests have bounded sizes, a 180-second upstream timeout, output caps and a per-user limit of 20 AI requests per hour.

## Local checks

- `node scripts/test-learning.mjs` runs backend integration tests using an in-memory SQLite database and an emulated R2 binding. Provider responses are explicitly mocked; this does not evaluate AI quality.
- `./node_modules/.bin/tsc --noEmit` checks types.
- Build and publish through the Sites helpers.
- `sites-preview start /workspace/sites/medora` starts the managed preview. The unused starter connector auxiliary Worker was removed; this app has no connected-app integration.

The preview uses `.wrangler/state`. Apply each generated migration once after building a configuration with D1 enabled:

```
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_hesitant_jubilee.sql
```

Sites applies tracked migrations to hosted storage during publication.

## Verification and limits

Backend tests cover ownership, anonymous access, cross-origin writes, upload/retrieval/deletion, hidden answer keys, answer saving, resumption, marking, confidence mismatches, unanswered questions, server deadlines, repeat submission, request construction, quota handling and structured response handling. Browser checks confirmed sample navigation, a timed assessment with accurate marking, all-option feedback, PDF upload retention, and PNG infographic export.

AI summaries, quotations, page locations and generated questions can be wrong; original-source verification is essential. Source locations are labelled as AI-located. Web research is not a systematic review. Large files get focused coverage, not guaranteed exhaustive analysis. Office-file embedded diagrams should be converted to PDF. Audio/video are not supported. Images are teaching representations, not original paper figures or anatomical references. The current visual studio uses saved lesson text and native diagrams; no image generation is offered. Medical content is education, not a clinical decision or patient-record tool. No accreditation, independent clinical review or exam-readiness guarantee is claimed.

## Student-first teaching update

Visual learning now uses native teaching slides and colour-coded SVG infographics. No raster image generation is offered. Old image-generation requests receive HTTP 410 without a provider call. Historical stored image files remain private and are deleted with their notebook.

Instant slides are created locally from saved lesson excerpts; their full explanation remains in speaker notes. Optional refinement sends only that concept and short evidence excerpts in one bounded text request (maximum 3,100 output tokens). The result is cached in the notebook and returned on repeat requests without provider calls or resending the full files. This is transformation of the existing lesson, not a fresh independent source check. Infographic previews, full-size viewing and PNG/SVG exports use deterministic rendering without AI requests.

Explain it back includes browser Web Speech dictation, language selection, start/stop, an editable final transcript, permission/network error handling and a two-minute session cap. No OpenAI transcription request is used. Browser recognition may send audio to its own online service and is not supported everywhere. The agent did not access a live microphone in browser QA. Students review their transcript and explicitly request text feedback.

`node scripts/test-study-tools.mjs` covers dictation transcript handling, length limits, speech permission messages, instant slide structure, diagram-arrow semantics, SVG escaping, colour semantics and compact infographic output. Backend tests cover cached refinement and disabled image-generation calls. A live test with synthetic study notes produced four slides with one text request; a second read used the cached deck and made no provider request. No image-generation call was made.

## 100 MB uploads
New uploads reserve a notebook, then send each file as a raw known-length stream to R2 via `/api/upload`; metadata is owner-scoped and declared before the stream. No 100 MB form-data/arrayBuffer buffering. Incomplete uploads cannot enter AI analysis. Legacy multipart clients remain bounded to their old small-file limit. Original files remain private to their owner even when the site is public.

The UI distinguishes storage (100,000,000 bytes per file and notebook) from analysis (under 50,000,000 bytes combined; images max 20,000,000). Oversized sources remain saved but need splitting/compression before analysis. Sources above 4 MB are streamed into temporary OpenAI Files API objects instead of base64 buffering; temporary provider files are deleted after the response or on preparation failure. Hosting owns sign-in: email-only/passwordless login is not supported by current Sites controls and has not been substituted with a fake login.

## Medora ChatGPT plugin
The stateless `/mcp` endpoint exposes authenticated notebook, saved lesson/slide, text notebook creation, source tutor, feedback, research and timed quiz tools. Discovery and tool schemas are public; every tool call requires the Sites-provided user identity. Ownership stays enforced by the same application handlers. Original file storage keys and active quiz answers are excluded. No delete, arbitrary URL fetch, arbitrary SQL or credential tools are exposed. Tool mutation/AI-cost descriptions and annotations distinguish saved reads from charged generation. Files are uploaded through the existing website; the plugin does not claim file upload, voice recording or an interactive in-chat visual view. Sites provisions the canonical private plugin when publishing with the MCP capability.

## Guest website access
Public visitors automatically create an isolated guest session via same-origin POST `/api/session`. A cryptographically random 256-bit HttpOnly, SameSite=Lax, Secure-on-HTTPS cookie is stored for 30 days. Only its SHA-256 hash and an opaque guest owner ID are stored in D1. Guest identity is looked up server-side for every notebook, upload, download, learning and quiz action. Existing authenticated users retain their account ownership. Guest and account data are not merged. Guest access expires after 30 days; clearing browser cookies loses access. Expiry invalidates access, not a promise of automatic file deletion. Users should export important work.

All website features remain available to guests under the existing per-owner 20 AI requests/hour limit and an additional shared guest capacity of 100/hour. New guest sessions are capped at 100/hour globally and 10/hour per hashed trusted connecting IP when supplied. MCP plugin tools continue to require platform account identity. No shared anonymous owner, local-preview auth fallback or API-key exposure.

## Medical learning pilot upgrade
- Source trust: exact normalised excerpt matching against saved pasted notes and indexed PDF/TXT/Markdown/CSV text. PDF locations use actual PDF page order. Index limits: 8 MB/file, first 80 PDF pages/file, 180,000 total characters/notebook. Scans, figures, unavailable fonts and unsupported formats remain unverified. Text matching is not medical correctness or semantic entailment, and index coverage is not lesson coverage. Cached index creation makes no AI request.
- New lesson schema adds baseline → mechanism → observable findings → distinguishing clues → missing evidence, at most 30 words/field. Absent source facts must be stated as absent. Study focus (MBBS/USMLE/PLAB etc.) is a learner preference, not certified curriculum alignment. Existing notebooks remain compatible.
- Revision notebook imports wrong/unanswered questions from up to 50 submitted attempts (up to 200 visible items/notebook), preserving the original question and correct explanation. Editable possible error reason, correction note, recall-before-reveal and self-rated scheduling. Again=10 minutes, Needs practice=1 day, Remembered steps through 1/3/7/14/30 days. No claim of validated mastery. Repeated ratings have optimistic concurrency protection; reason notes patch only their JSON leaves. No AI calls for review. Notebook deletion removes review items.
- Reasoning lab saves one generated fictional scenario per source concept (max 6), with hidden rubric excluded from every public notebook response. Five learner fields precede AI feedback. Exact learner excerpts are checked before display; ungrounded statement quotes are discarded. Case feedback reuses saved lesson data, not original file uploads, and is saved with a bounded history. Scenarios and feedback are not independently medically reviewed. No real-patient care, protocol or dosing claims. Browser dictation supports individual fields without assessing accent or fluency.
- Mind maps use a native navy/white-star SVG background, accessible keyboard nodes and optional label-recall mode. No image-generation credits.
- Pilot feedback form downloads a report for voluntary sharing; it sends no message automatically.
Validation: `node scripts/test-learning.mjs`, `node scripts/test-study-tools.mjs`, `node scripts/test-source-trust.mjs`, TypeScript, production build and browser flows. Source test includes a real synthetic two-page PDF with a deliberately wrong AI page reference. Human medical/curriculum validation remains outstanding.

### Plugin feature parity

The existing MEDORA plugin now exposes 19 tools, including bounded source-excerpt checks, the revision queue, learner annotations and self-rated recall scheduling, and saved/generated fictional reasoning cases with feedback. Notebook creation accepts a study-focus preference. The MCP guide describes the website’s text-size controls and navy mind maps. Guest website sessions remain separate from connected ChatGPT account notebooks; visual styling and browser voice controls stay on the website. Case generation and feedback use existing AI quotas, while cached cases, source indexing and revision scheduling make no new AI request. Source matching is not medical validation.

## Flashcards and support update

Visual studio now offers Flashcards, Mind map and Infographic. Five recall angles per concept reuse saved lesson text: idea, mechanism, example, trap and analogy. Reveal before self-rating; local browser ratings support a retry filter without claiming mastery. CSV export quotes complete explanations and guards spreadsheet formulas. The plugin adds get_flashcards (20 tools); get_teaching_slides remains a compatibility endpoint. The navy Mind map keeps its recall mode.

Ask MEDORA answers feature FAQs locally without AI credits. Visitors can explicitly consent to send Rifana support messages; guest/account ownership separates their receipts and replies. The owner-only /support/inbox requires the verified Rifana account email and supports in-app replies. Support records are stored separately from study notebooks. No patient information should be submitted. Email alerts send only a ticket reference and private inbox link, never the visitor's message or contact details.

To enable notification email, configure RESEND_API_KEY as a server secret and MEDORA_SUPPORT_FROM as a sender verified with Resend, then publish. Destination is the existing support contact rifanariffu844@gmail.com. Without these settings, messages still save and the owner inbox explicitly reports alerts need setup; no mail delivery is claimed. Accepted means provider acceptance, not recipient inbox delivery. An owner can retry failed/pending alerts after setup; Resend Idempotency-Key prevents duplicates. No real email was sent by the automated tests.

## Welcome and creator introduction

The first-visit introduction combines the existing blue/white identity with a navy animated source-to-recall preview, an interactive prepared flashcard example, four usage steps, and Rifana’s MBBS/neuroscience creator note. It creates no AI request. Enter workspace and sample-notebook shortcuts use the existing app workflows. The skip-next-time preference is browser-local and the Welcome & creator sidebar button reopens the introduction. Text-size preferences are shared with the workspace; animations can be paused and respect prefers-reduced-motion. No testimonials, accreditation or medical validation claims are added.


## Connected tutor studio (November 2026)

The current Visual studio connects a saved selected-concept lesson to four views: six full infographic pages, an expandable navy mind map, specific recall cards and the full lesson. Legacy slide tools remain compatible; the old compact poster is no longer the website infographic renderer.

`POST /api/tutor` rereads original source inputs with medium reasoning effort, bounded structured output and per-owner quotas. Learners choose level, state a difficulty and optionally allow separately labelled general teaching context. The schema requires six unique sections, 5–8 distinct cards, a small relationship diagram, vocabulary, analogy limits and coverage gaps. Source evidence uses exact allowed filenames and excerpts of at most 12 words. The app checks structure and filenames, and matches excerpts against the bounded source text index; these checks do not verify semantic accuracy. Original quiz keys are never sent to this tutor request. The provider retains no response via `store:false`; temporary provider files follow the existing cleanup path.

One tutor pack per concept is cached by source metadata/pasted text, selected source indices, original concept, level, language, context and stated difficulty. Identical settings return the saved pack before quota accounting. Changed settings replace that concept’s pack only after successful validation. Regenerating the original kit invalidates its tutor packs. Switching views, reviewing saved cards and exporting incur no new AI call. Prepared demonstration content is explicitly identified and incurs no AI call.

Infographic text is rendered in accessible HTML without line clamps. Each current-page SVG/PNG export grows with all wrapped teaching points. Markdown exports contain all six sections, vocabulary, visual text, analogy and coverage gaps. A printable HTML revision sheet supports browser print/Save as PDF. Anki-compatible UTF-8 text includes tab, HTML, tags-column and named-column headers, front/back explanations and source references. It does not contain MEDORA browser ratings or an Anki scheduling history; it is not an `.apkg` archive. Users preview the Basic note type import in Anki.

Initial uploads now allow selecting source files for AI analysis. All sources still share the 100 MB storage total; only the selected batch (under 50 MB; images up to 20 MB) and pasted notes enter generation. A learner can leave an oversized file stored and study a pasted excerpt. Nonselected sources are explicitly labelled stored-only and excluded from AI source-location extracts. This is focused analysis, not automatic full-textbook processing. The original analysis limit is unchanged.

New timed attempts snapshot concept titles and evidence separately from active questions. On marking, revision entries inherit these references, so later kit changes do not relabel new historical mistakes. Legacy items can fall back to the current kit where no snapshot exists. Tutor section references are included in the source inspection panel.

Validation: TypeScript, source matching/PDF tests, backend integration tests (mocked provider), and export/renderer tests cover source selection, no clipped teaching points, cache/settings, ownership, original-file request inputs, hidden quiz answers, malformed-output preservation, Anki headers and HTML escaping. These do not measure clinical correctness or establish superiority over another learning product. Human evaluation with real student materials remains needed.

The provider tutor schema now supplies six named section objects, permitted source filename enums, short-excerpt patterns, and array bounds at generation time. The storage parser converts these named objects into the six ordered teaching sections and still accepts the earlier array shape. Source-based sections require evidence in the provider schema. Safe field-path diagnostics identify formatting failures without logging source content.
