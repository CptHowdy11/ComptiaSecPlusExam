# Acronym flashcards

The app contains 345 cards covering acronyms and abbreviations identified across all 405 pages of the local Dion Training Security+ (SY0-701) Study Notes. Every card has at least one guide page reference.

Coverage was checked against a full-text candidate inventory, with a second pass for numeric, mixed-case, and punctuation-bearing forms (including 2FA, 3DES, IaC, POA&M, and TACACS+). The machine-readable review record is `acronym-audit.json`. It records the source PDF checksum, included candidate-to-card mappings, and reasons for excluding ordinary uppercase words, code keywords, example identifiers, and names that are not acronyms. It contains no reproduced guide passages.

Repeated and plural forms share a card. Compound references such as AAA/RADIUS point to the corresponding individual cards; the printed form is searchable. CRYSTALS-Kyber and CRYSTALS-Dilithium share the CRYSTALS expansion. Numbered SHA and RC variants have separate cards. Multiple meanings found in the guide (MAC, CD, CI/CD, TOE) appear together with context. Abbreviations in examples and peripheral material are included so coverage is not limited to exam objectives.

The deck preserves the guide's context while explaining known expansion errors: FLACON/FALCON, GPO, SMS, SAN, SCAP, SAST, DAST, and PII. Shortened RADIUS and protocol expansions are completed. Selected correction references are linked on their cards. Product or algorithm names without a reliable formal letter-by-letter expansion are identified as such instead of inventing one.

## Interaction

Select **Study acronym flashcards** on the home screen. Cards begin with the acronym only. Click the card, use the reveal button, or focus the card and press Enter/Space. Each card has a **Show hint** button with a short conceptual clue. Hints avoid the substantive words in the expansion and never flip the card. **Hide hint** conceals the clue again. Hints reset on navigation, search, shuffle, reset, and flip. Previous/Next conceal the answer on the newly selected card. Search matches acronym text and aliases, not the answer. Shuffle operates on the current filtered deck. **All cards · A–Z** clears the filter and restores alphabetical order. No matches produces a recoverable empty state.

Deck browsing is session-only and does not alter saved exams, answers, history, study progress, or backup format.

## Validation

`npm test` validates source coverage, unique cards, guide page references, answer visibility, navigation boundaries, alias search, empty results, HTML escaping, shuffle coverage, ambiguous expansions, hint coverage, answer-word leakage, and hint visibility/reset behavior, plus the existing quiz and port-flashcard tests. A local browser check verified entry from the home page, card click-to-flip, filtering, navigation, and long answer layout.
