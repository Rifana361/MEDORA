# MEDORA
### Your sources. Your lightbulb moment.

MEDORA is an AI-powered learning workspace created to help medical students turn difficult educational materials into explanations they can understand, connect and recall.

**Created by Rifana using ChatGPT.**

🔗 [Open MEDORA](https://medora-medical-learning.rifanariffu844.chatgpt.site)

## Why MEDORA?

Reading a chapter is different from being able to explain it. MEDORA brings explanations, visual learning and active recall into one workspace, while making source references and learning gaps visible.

The project draws on my background in medicine and cognitive and clinical neuroscience.

## Features

- **Upload educational materials:** PDFs, documents, lecture slides, notes, spreadsheets and supported images.
- **Personalised explanations:** Choose your level, describe what confuses you and build a deeper lesson from your selected sources.
- **Interactive mind maps:** Expand branches to explore ideas, relationships, examples and limitations.
- **Infographics:** Six readable teaching sections per concept, with colour-coded explanations and downloadable pages.
- **Flashcards:** Specific recall questions, hints, answer explanations and common mistakes.
- **Timed quizzes:** Server-managed deadlines, scoring and explanations for every answer option.
- **Explain it back:** Write or dictate your explanation, review the transcript and request feedback.
- **Reasoning practice:** Work through fictional scenarios, supporting clues, alternatives and uncertainties.
- **Revision notebook:** Revisit quiz mistakes with concept references and learner-rated review schedules.
- **Optional web research:** Explore online sources with links, kept separate from uploaded material.
- **Portable study tools:** Export flashcards as CSV or Anki-compatible text, and download lessons and printable revision sheets.

## How to use it

1. Upload educational material or paste your notes.
2. Choose your learning level, language and goal.
3. Generate a study kit and inspect its coverage.
4. Open **Visual studio**, select a concept and choose **Build deeper lesson**.
5. Explore the infographic, mind map and flashcards.
6. Test yourself, explain the concept back and revisit gaps.

Saved tutor lessons are reused when the inputs and teaching settings match. Reviewing saved content and switching visual views do not make another AI request.

## Technology

- React 19 and TypeScript
- Vinext and Vite
- Cloudflare Workers
- Cloudflare D1 and R2
- OpenAI Responses API
- Zod and JSON Schema validation
- Browser-supported voice recognition

## Running the project

This repository contains a server-backed application. Uploading the code to GitHub does not automatically deploy a working copy.

See [Setup instructions](docs/SETUP.md) for dependencies, local database setup, API configuration and deployment considerations.

**Never commit API keys, private notebooks, uploaded documents or local databases.**

## Project status

MEDORA is an educational pilot. AI explanations and references can be inaccurate or incomplete. Source-excerpt matching checks whether words appear in indexed material; it does not establish medical correctness.

Use educational materials you have permission to process. Do not upload patient records or confidential information. MEDORA is not intended for patient-care decisions or as a validated assessment of examination readiness.

## Creator

**Rifana**  
MBBS | MSc Cognitive and Clinical Neuroscience

Developed using ChatGPT, with a focus on clearer explanations, thoughtful visual learning and active recall.

## Rights

See [LICENSE.md](LICENSE.md) for project rights. Third-party dependencies retain their respective licences.
