# Upload MEDORA to your GitHub repository

## Through the GitHub website

1. Download and extract `MEDORA_GitHub_Ready.zip`.
2. Open the extracted `MEDORA` folder. You should see `README.md`, `package.json`, `app`, `components`, `lib` and other project files.
3. Create an empty repository in your own GitHub account, or open the repository where you intend to add MEDORA. Choose public or private according to your preference.
4. Use the repository's **Add file → Upload files** option and upload the extracted contents. If the browser limits a batch, upload smaller groups, preserving folder paths.
5. Put `README.md` at the repository root. Upload the source files and folders, not the ZIP itself. On a Mac, Command + Shift + . shows dotfiles such as `.gitignore` and `.dev.vars.example` in Finder.
6. Review the changes and commit them. Your README should appear on the repository's main page.

Do not upload `.dev.vars`, real API keys, `node_modules`, build output, `.wrangler`, local databases, private notes or Git credentials. Only the credential-free `.dev.vars.example` template belongs in the repository.

## With Git in a terminal

Run these commands from the extracted `MEDORA` folder. Replace the final placeholder URL with the URL displayed by your own empty repository. Do not paste a token into that URL.

```bash
git init
git add .
git status
# Review the staged filenames before committing.
git commit -m "Add MEDORA learning workspace"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Use GitHub's normal authentication flow if prompted. Never send your account password or access token to another person.

## Suggested repository description

MEDORA is an AI-powered learning workspace for medical students, with source-based explanations, mind maps, flashcards, infographics, timed quizzes and voice-enabled teach-back.

Suggested topics: `medical-education`, `active-recall`, `typescript`, `react`, `learning`, `openai`, `cloudflare-workers`.

Uploading code does not publish a running app, transfer private notebooks, or configure API billing. GitHub Pages does not run this application's server features. Use the existing live app link in your repository's About section, or configure your own backend deployment separately.

No open-source license has been selected automatically. Public visibility and permission to reuse code are different decisions; review `LICENSE.md` before offering a broader license.
