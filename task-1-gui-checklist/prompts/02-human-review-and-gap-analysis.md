# Prompt 02 ? Human Review and Gap Analysis

Act as an independent Senior QA Reviewer. Review `checklist/ai-generated-checklist.md` against the actual EShop `README.md`, `docs/2026.HW03.md`, `task-1-gui-checklist/docs/requirements-mapping.md`, and the actual Login, Register, and Forgot Password React interfaces.

Preserve the original AI-generated checklist as immutable evidence. Evaluate every item for correctness, relevance, independent testability, duplication, requirement traceability, and actual UI applicability. Identify missing coverage across IA-01, IA-02, IA-03, and IA-04, including accessibility, keyboard navigation, visible focus, responsive layout, zoom, contrast, error recovery, and other relevant characteristics. Do not add dark mode, RTL, or other criteria as mandatory requirements unless applicable to the actual product; label recommendations clearly.

Add only valid, independently testable human-reviewed items. For every human-added item, record a specific explanation of why the initial checklist missed it, supported by the actual comparison. Do not invent AI omissions or claim that an item was missed if it already exists in the initial checklist. Preserve existing IDs where possible, assign stable unique `HR-*` IDs to additions, and ensure the final checklist covers all three screens and all four IA aspects with more than 40 meaningful items.

Do not execute tests or fabricate execution results. Update `checklist/human-reviewed-checklist.md`, `docs/ai-gap-analysis.md`, the primary Markdown checklist `checklist/gui-checklist.md` when its source records are populated, and the AI Review sheet in the backup `checklist/gui-checklist.xlsx`. Record this AI interaction in `docs/ai-audit-log.md`.
