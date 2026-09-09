# Security+ practice app

Target: September 28, 2026 (year inferred from current project date). Course: Dion Training SY0-701.

Status: working app with 170 questions across all 26 course sections, cumulative practice, three domain-balanced full forms, saved attempts, randomized retakes, answer review, and backup import/export.

## Try the app

[Open the practice room](https://cpthowdy11.github.io/ComptiaSecPlusExam/)

Choose one or more sections under **Choose sections**, then **Start section exam**. Answer every question and select **Submit all answers**. Feedback and source pages appear only afterward.

After reviewing a result, select **Retake this exam** to use its exact saved questions and versions with shuffled question and answer order. Your original result remains saved; the retake starts with blank answers. You can also open an older result from **Recent attempts** and retake it.

Mark sections studied to include them in **Cumulative practice** (up to 40 questions). After all 26 are marked studied, select full form A, B or C (90 questions, 90-minute target). Timers continue while away and allow overtime until every answer is submitted.

Coverage is a starting bank: 20 Fundamentals questions and six per other section. Full forms overlap and the app reports previously seen questions. The forms currently contain multiple-choice questions, not hands-on PBQs. This is not yet exhaustive course-topic coverage. Export a backup before clearing browser data or moving devices.

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
