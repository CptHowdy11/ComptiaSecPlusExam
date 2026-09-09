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

## Project documentation

- [Project charter](docs/PROJECT_CHARTER.md): requirements and implementation decisions.
- [Handoff and work log](docs/HANDOFF.md): progress, limitations and next steps.
- [Question bank coverage](docs/QUESTION_BANK.md): implemented coverage and review status.

Reference resources are local-only and excluded from Git tracking: original PDFs, the research directory, reference downloads, research catalog and source course map. These files remain in the original local project folder and are not supplied by a fresh clone. The app retains its runtime section list, original questions and answer citations so quizzes and source-based review work.

Project repository: [CptHowdy11/ComptiaSecPlusExam](https://github.com/CptHowdy11/ComptiaSecPlusExam). Reference files committed before this change may still exist in older Git commits; this change removes them from the current branch without rewriting history.
