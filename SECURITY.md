# Security and data handling

Do not submit credentials, private educational documents, patient records or identifying health information in public issues or pull requests. Report security concerns privately through the contact on the published application's Support page. Include a general description and reproducible steps with synthetic data; do not post exploitable details publicly before the maintainer has had a chance to respond.

Keep secrets server-side. The `.dev.vars.example` file is a template; `.dev.vars`, environment files, local databases and `.wrangler/state` are excluded from version control. Do not commit real keys. If a key is exposed, remove access by revoking/rotating it; deleting a file in a later commit alone does not erase earlier history.

The application enforces notebook/attempt ownership and same-origin writes, bounds uploads and AI usage, and separates guest sessions from authenticated accounts. These measures are not a security audit or a guarantee of privacy.

Outside ChatGPT Sites, production identity verification and trusted-header handling must be implemented before exposing the app. Local mock sign-in must stay local. See `docs/SETUP.md`.

AI output and source content are untrusted data. Do not treat source matches as medical validation, and do not deploy the app for patient-care decisions.
