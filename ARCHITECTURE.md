# Architecture

The React/Vinext UI calls same-origin API routes running in a Cloudflare Worker. D1 stores owner-scoped notebooks, quiz attempts, guest-session hashes, revision entries, usage limits and support tickets. R2 stores original uploaded files. SQL migrations are included under `drizzle/`.

The learning API sends selected original material to the OpenAI Responses API with bounded output and `store:false`. Larger supported files use temporary provider file objects, cleaned up after the request. The tutor API creates a selected-concept pack with six named teaching sections, a small visual, vocabulary, analogy limits, coverage gaps and specific recall cards. Its schema constrains section structure and allowed source names. Successful packs are cached; invalid replacements preserve the prior pack.

Infographics, mind maps and flashcards render the saved pack. Page exports grow with wrapped teaching points rather than dropping lines. CSV, Anki text, Markdown and printable HTML exports are generated without another AI request.

The source index is a separate, bounded text extraction path. Matching a quotation locates words, not semantic correctness. Optional web research is stored separately with links.

Timed quizzes retain hidden answers until marking, enforce server deadlines, and snapshot concept/evidence metadata for later review. Revision schedules use learner self-ratings rather than a validated estimate of mastery. Voice input uses supported browser recognition and an editable transcript; no microphone recording is bundled in this export.

The `/mcp` route exposes authenticated tools, including cached reads and explicitly charged generation operations. It relies on trusted hosting identity. Read SETUP.md and SECURITY.md before deploying outside Sites.
