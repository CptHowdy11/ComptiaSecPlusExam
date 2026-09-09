# Agent handoff and work log

## Current state

2026-09-08: initial research pass finished. No app, question bank, git repository, deployment or automated monitor created. No tests of app behavior possible yet. Read README, charter, source registry and course map first.

## Work completed and rationale

- Captured initial user requirements and correction: 28 total course sections, 26 exam-content sections. Introduction and Conclusion are excluded.
- Inventoried all three supplied PDFs with SHA-256 and page count; originals preserved.
- Extracted all 439 pages into page-indexed private JSON. Console encoding interrupted first inventory attempt; corrected to UTF-8 and completed successfully.
- Inspected opening guide material, section opening summaries, study plan schedules, and local exam objectives baseline. Identified 26 content section boundaries. Extracted text is not a visual/layout audit of every page.
- Researched 24 external references, recorded status and use. Several CompTIA and CISA fetches failed; no claims based on inaccessible page contents. A Japanese objectives search URL redirected to a home page, so local objectives remain the reliable blueprint copy.
- Proposed static app, curated bank, exact source provenance, delayed feedback, local persistence, section eligibility and weighted full forms. These are reasoned implementation proposals, not already implemented features.
- Created public/private material separation through .gitignore before any git initialization; do not commit private source text by force.

## Environment lessons

The shell started at C:\ despite the advertised working directory, and sandbox access to the project parent was denied. Initial relative file enumeration unintentionally searched C:\; no unrelated content is used in this project. All later operations used explicit absolute project paths with approved escalation. Use absolute paths and fail-fast commands in future.

Python runtime: C:\Users\benmo\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe; pypdf available. Source extraction uses pypdf. No PDF artifacts were modified or created.

## Next agent actions

1. Inspect source pages visually at boundaries/for question citations, paying attention to missing Data Protection heading on page 70. Verify platform section numbering if needed; content IDs avoid that dependency.
2. Confirm booked SY0-701 exam and inferred year 2026 when convenient. Do not block pilot development on this; all supplied sources explicitly target SY0-701.
3. Read complete relevant passages and build a small reviewed Fundamentals bank with source locators and distractor rationales.
4. Implement charter's end-to-end flow and acceptance checks before scaling the bank.
5. Audit topic-level coverage, author remaining content, add full forms and PBQ-style tasks.
6. Obtain repository destination details when publishing is concrete. User has not specified GitHub owner/name or public/private choice.

## Open decisions / limitations

Current completed course sections and daily available study time unknown. Question counts, full-form count, framework and visual design remain proposals. A bank size is not committed; evidence quality and sufficient nonrepeated practice drive sizing. No source-level content audit of all 405 guide pages yet. External records are discovery/landing-page references, not already ingested fact chunks. Recheck current official exam availability before final release. No assertion of exact live-exam resemblance or passing-score prediction.

## Ongoing logging rule

After each meaningful work session append date, user decisions, files changed, reasons, checks/results, limitations and precise next steps. Keep technical records in English Markdown plus JSON for efficient human and agent handoff. Do not overwrite the user requirements with inferred defaults.

## Initial artifact validation

Passed: three source inventories total 439 pages; 26 content ranges are contiguous from page 4 through 402; opening summaries collectively reference all 28 objective IDs; all 24 external source IDs are unique. This validates the index structure, not complete teaching coverage or question quality.

## GitHub save preparation

2026-09-08: User authorized saving the project to GitHub. Initialized local main branch and staged nine documentation/index files; licensed PDFs and full extraction remain ignored. Connected account is CptHowdy11, but connector lists no accessible repositories and has no repository creation operation. GitHub browser fallback requires user sign-in. No remote repository or push completed yet. Proposed repository name: security-plus-practice, private by default. Existing Git author configuration retained. Next action: create or select accessible repository, push this commit, verify remote files, and update this status.

## GitHub save and public documentation approval

2026-09-08: User supplied https://github.com/CptHowdy11/ComptiaSecPlusExam.git. Confirmed empty remote and push permission; repository visibility is public. Added origin and pushed initial commit 3a5f6bb to main with upstream tracking. Verified remote and local commit match. Nine documentation and research-index files uploaded; original PDFs and full extracted text excluded. A subsequent status-update push was blocked by automatic approval review pending explicit public-exposure approval. User then explicitly approved keeping project documentation public and publishing this final status update. Earlier pending-access notes above are historical and resolved. Existing Git authentication worked without additional setup. No app deployment enabled.

## Working pilot implementation

2026-09-08: Built dependency-free static app in app/ for the user-requested GitHub hosting. Includes 20 original Fundamentals questions (19 single-choice, one two-answer item), shuffled complete attempt snapshots, delayed feedback, strict all-answered submission, 26-section progress, cumulative eligibility, history, and validated JSON backup import/export. Source explanations cite guide pages 7-17; supporting source passages were read as extracted text. Visual source-page review remains outstanding; bank explicitly labeled pilot-text-checked rather than fully reviewed. Other banks, PBQs, full exams, timer and domain-balanced forms remain future work. No claim of complete exam coverage.

Five Node tests pass: source/option invariants, unanswered submission rejection, exact multi-select grading, unstudied-section isolation, and repeat-submission rejection. App JS syntax check passed. Added Pages workflow uploading only app/, and configured GitHub Pages to use Actions. Public hosting follows user's approved repository and requested runnable app. Source PDFs remain ignored. Current question schema is a smaller pilot schema; migrate to charter's complete editorial metadata before scaling.
Browser validation: completed a 20-question test attempt through visible controls; verified unanswered submission disabled, refresh/resume retains answer, feedback appears only after submit, and score/review includes correct answers and source pages. GitHub Actions run 34291811602 completed successfully. Live app loaded at https://cpthowdy11.github.io/ComptiaSecPlusExam/ with clean initial progress. Backup import/export and mobile layout have not yet had end-to-end browser QA.

## Expanded coverage and randomized retakes

2026-09-08: User approved expanding remaining sections/full exams and explicitly requested same-question randomized retakes after review. Added 150 original questions for 170 total across 26 sections, each with page references; six starter questions per new section. Correct responses and distractor explanations checked against extracted source passages. Complete visual/source editorial review remains outstanding.

Implemented selectable section sets, cumulative coverage (up to 40 questions), three deterministic-membership full forms (90 questions with 11/20/16/25/18 domain quotas), all-section completion gating, 90-minute wall-clock timer with overtime, and repeated-question disclosure. Exact-snapshot retakes reset answers and timing, guarantee different question/option order, keep source/version data, and append separate results. Existing version-1 saved attempts remain usable. Saved navigation position is restored when resuming. Added QUESTION_BANK.md with limits; this release does not include PBQs or exhaustive topic coverage.

Validation: eight Node tests passed for section-page/objective mappings, duplicate checks, exact multi-select scoring, submission gating, cumulative eligibility and representation, all full-form quotas, immutable version-preserving retakes, old-snapshot compatibility and overtime. Browser test completed an old Fundamentals retake, verified blank answers/new order/hidden feedback, submitted it and confirmed both original and retake results in history. Marked all sections complete in LOCAL test browser only; verified full-form unlock, 90 questions, and 90-minute timer. Inspected full-exam desktop screenshot. Fixed a dashboard encoding issue found in browser QA. Live user progress was not altered by tests.

Next priorities: expand each section beyond six concepts, implement PBQ-style interactions, strengthen content review and topic-level coverage, complete backup/mobile accessibility QA. Fixed membership full forms can change when the bank changes; use Retake to preserve an earlier form exactly. Commit/deploy this release and verify the hosted dashboard shows 170 questions.
Deployment verified: code commit 5a1c129, GitHub Actions run 34293976306 completed successfully; hosted questions.json contains 170 items. Additional local browser check confirmed full-exam question 5 and remaining time survive refresh/resume. No live user progress was changed. Release is available at https://cpthowdy11.github.io/ComptiaSecPlusExam/.

## Local-only reference resources

2026-09-08: User requested reference resources remain local and be excluded from Git. Removed research/materials.json, research/course-sections.json, research/sources.json, docs/RESEARCH.md and docs/COURSE_MAP.md from tracking using git rm --cached, preserving files on disk. Ignore all research/ and references/ content and both reference documents, alongside existing PDF exclusions. README now distinguishes public project documentation from local reference resources. Runtime app/sections.json and app/questions.json remain tracked because they support quiz selection, scoring and requested post-submit citations. Existing Git history was not rewritten; earlier commits can still contain formerly tracked references. Future agents must not force-add local reference files.


## Study dashboard and rolling domain accuracy

2026-09-08: Added top dashboard with local-calendar countdown to September 28, 2026 (exam time not specified), remaining modules derived from the 26 recognized studied IDs, and submitted-answer accuracy. User refined domain scoring to the latest 20 questions per domain. Domains maintain independent windows sorted by exam submission time, with saved question order breaking ties within each exam because per-answer timestamps do not exist in legacy backups. Retakes count as new observations; unfinished exams are excluded. Fewer than 20 observations show the available denominator; untouched domains say Not attempted. Overall and course-module scores remain explicitly labeled lifetime accuracy. Snapshot metadata is used, with objective fallback and uncategorized buckets for legacy missing metadata. No storage migration; updates automatically after submission, import and module changes. Countdown handles exam day and past date, refreshing without reloading. Reference resources remain local-only.

Validation: 12 Node tests pass, including independent rolling windows, submission ordering, empty/legacy history, weighted lifetime scores, module ID deduplication, countdown date boundaries, and existing exam regression checks. JavaScript syntax checked. Local browser confirmed dashboard renders with 20 days, 26 modules remaining, and empty-history state.


## Twenty questions per chapter and focused exam layout

2026-09-08: User requested 20 questions per section and removal of the dashboard/header while testing. Added 350 source-text-checked original items (25 scenarios and 325 definition/recognition questions), yielding exactly 20 per section and 520 total. Answer and distractor pages were checked against local extracted guide passages; source PDFs, authoring concept notes and helper remain local-only under ignored research/. Original 170 question objects verified equal to HEAD's prior bank. All IDs/stems unique; domain counts 65/112/66/174/103. Existing snapshots/retakes remain fixed; newly generated full forms can change membership with the larger bank. See QUESTION_BANK.md for coverage and review limits.

During view=quiz, render omits the dashboard and CSS hides the site header/footer. Launch, resume, Next, Previous and question navigation reset scroll and focus the question heading with preventScroll. Selection still saves an answer without immediate grading; Next remains explicit to permit editing and multi-select answers. Dashboard/header return on home and results. No storage migration.

Validation: all 12 Node tests pass, including exactly 20 items per section, citation boundaries/objective mappings, 90-question domain quotas, grading/retake/timer and rolling-domain regression checks. JS syntax verified. Browser QA completed a fresh 20-question Threat Actors exam, confirmed results/citations and dashboard return, launched its exact 20-question retake and tested exit/resume. Screenshot showed the next question at top without dashboard. DOM measurements on resume: scrollY=0, header display=none, dashboard absent, question heading visible at y=299. Local QA origin only; live user progress untouched.
