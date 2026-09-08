# Project charter

## User requirements (authoritative)

Create a browser app runnable from a GitHub repository for Security+ study before September 28. User corrected the course scope to 26 exam-content sections; 28 total includes preparation sections. Preserve terminology and definitions as closely as possible to supplied sources. Questions should approximate legitimate exam style, with original scenarios and plausible distractors; no claim of actual exam questions or exact predictive equivalence.

Three levels:
1. Exam over the selected recently studied content section(s).
2. Cumulative exam over all content sections marked studied.
3. Multiple full practice exams after all 26 content sections are complete.

Do not reveal correctness, explanations, scores or source hints during an attempt. Require all questions answered before manual submission. After submission, show missed questions, user's answer, correct answer, explanation, source title, section and page. Maintain decisions, reasons, materials and work log for another agent.

## Verified local exam baseline

Local CompTIA objectives, version 5.0, PDF page 3: SY0-701; maximum 90 questions; 90 minutes; multiple-choice and performance-based questions. Domain weights: General Security Concepts 12%; Threats, Vulnerabilities, and Mitigations 22%; Security Architecture 18%; Security Operations 28%; Security Program Management and Oversight 20%.

The local Dion guide page 2 describes a passing score of 750 on a 100-900 scale. Do not convert raw practice percentage to a purported CompTIA score. Current official website availability/retirement was not verified because relevant CompTIA web fetches failed. Confirm booked exam code before final release; materials consistently target SY0-701.

## Proposed decisions and reasons

- Static browser application and versioned reviewed JSON question bank: works on GitHub Pages, keeps exams reproducible, avoids runtime AI costs and unsupported claims in unreviewed questions. No framework selected yet.
- Generate/select complete immutable attempt at start; shuffle with stored seed and stable option IDs. Persist answers, question versions, timestamps, mode and selected sections. Results must not change when the bank changes.
- Store progress locally, with JSON export/import and schema versioning. Cross-device sync is out of initial scope unless requested. Browser data can be cleared; export is necessary for portability.
- Separate course section IDs from objective IDs. A course section can cover several objectives. Merely studying one section tagged 1.2 must not unlock questions from every other section tagged 1.2. Filter on required content sections.
- Default proposals: section exam 20 items; cumulative 40; full exam 90 items/90 minutes. Shortage must be visible; never silently duplicate or pull in unstudied content.
- A 90-item domain allocation using largest remainders is 11/20/16/25/18. Use one primary domain per scored item for allocation and retain all secondary objectives. This is our practice design, not a claim of exact live exam composition.
- PBQ-style tasks should include accessible matching, ordering, firewall-rule selection and log-analysis activities with explicit grading rubrics. Number of PBQs and partial-credit rules are product choices, not verified CompTIA scoring.
- Countdown reaching zero should mark overtime and continue until all answers are submitted, satisfying the explicit user requirement. A strict auto-submit mode would need a later user choice because it changes that rule.
- Full mode unlock depends on 26 content sections, excluding Introduction and Conclusion. Offer several distinct saved forms; count is not yet chosen. Avoid overlap when inventory permits; disclose reuse.
- Close source wording means preserve technical meaning, not preserve errors. Flag contradictions and source errata. Keep newer real-world standards as labeled supplemental context when they differ from course terminology.
- Client-side hidden answers are available to someone inspecting application data. Delayed feedback is a UI learning behavior, not proctored exam security.

## Question record contract

Required fields: id, version, exam_code, status (draft/reviewed/retired), type, stem, options with stable IDs, correct_option_ids or PBQ rubric, required_course_section_ids, primary_domain, objective_ids, difficulty, explanation, distractor_rationales, source_refs, scenario_family_id, review_record.

Each source reference: source_id, source_version/hash, course_section_id, heading, PDF page and printed page where different, short supporting excerpt or paraphrase, URL if public, verification status. Question-level evidence must support the correct answer and rejection of plausible alternatives; a generic homepage link is insufficient. Citations are post-submit only.

## Question authoring and acceptance

Use supplied guide first, official objectives for coverage, primary external publications for checks and gaps. Parse sources by page; inspect original page before approving each citation. Identify multi-select count explicitly. Scenario questions must supply enough context for one defensible best answer. Avoid accidental answer-length clues, double negatives, invented source pages and unsupported distractors. Keep unseen exam forms separate from repeated drills; track repeats so memorization is not mistaken for readiness.

Checks required before release: no answer feedback before submission; unanswered items prevent submission; submission freezes attempt; scoring deterministic for single/multiple/PBQ types; refresh resumes attempt; local exports round-trip; malformed imports rejected; section filtering never leaks unstudied required sections; full forms honor quotas and eligibility; every reviewed item has valid page/section/objective evidence; keyboard access for all interactions; repository-subpath hosting works; original PDFs/extracted text/secrets absent from deployed files.

## Delivery sequence (proposed, not scheduled automation)

1. Validate section map and objective coverage; create small reviewed pilot bank for Fundamentals of Security.
2. Build section selection, attempt flow, saved progress and post-submit review end to end.
3. Expand across 26 sections with quality review and cumulative mode.
4. Create full forms, PBQs, coverage reports and readiness history.
5. Validate browser flows, then prepare GitHub repository/deployment with the user-selected destination.

Prioritize an early usable section exam while expanding content. September 28, 2026 is 20 days after the research date; the guide's 30/60-day schedules are references, not the user's required schedule.
