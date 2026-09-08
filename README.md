# Security+ practice app

Target: September 28, 2026 (year inferred from current project date). Course: Dion Training SY0-701.

Status: working pilot with 20 Fundamentals questions, course progress, cumulative selection, saved attempts, answer review, and backup import/export.

## Try the app

[Open the practice room](https://cpthowdy11.github.io/ComptiaSecPlusExam/)

Choose **Start Fundamentals**, answer all 20 questions, then select **Submit all answers**. Feedback and source pages appear only after submission. Answers save in this browser; export a backup for another device. The pilot reuses the same 20 questions in shuffled order. Other section banks and full exams are not yet available.

For local development, run `python -m http.server 8000 --directory app` from the project folder, then open `http://localhost:8000`. Do not open the HTML directly. Run `npm test` with Node.js installed. No dependency installation or API key is needed.

GitHub Actions tests and publishes only `app/` to Pages on each main-branch push. Course source files are never included in the deployed artifact.

## Start here

- [Project charter](docs/PROJECT_CHARTER.md): user requirements, proposed behavior, decisions and acceptance checks.
- [Research reference catalog](docs/RESEARCH.md): sources and how to use them.
- [Course map](docs/COURSE_MAP.md): 26 exam-content sections and page ranges.
- [Handoff and work log](docs/HANDOFF.md): current state, limitations and next steps.
- `research/materials.json`: three original PDFs with SHA-256 hashes and page counts.
- `research/course-sections.json`: machine-readable content map.
- `research/sources.json`: dated external source registry with verification status.
- `research/local-extracted/`: private, page-indexed source text; not intended for public repository distribution.

The original course PDFs are unchanged. Project saved to [CptHowdy11/ComptiaSecPlusExam](https://github.com/CptHowdy11/ComptiaSecPlusExam) on the main branch. The user approved public project documentation; licensed source PDFs and full extracted text remain local. Keep licensed materials and full extracted text out of public Git history; the app can use original questions, short supporting excerpts where appropriate, and local source locators.
