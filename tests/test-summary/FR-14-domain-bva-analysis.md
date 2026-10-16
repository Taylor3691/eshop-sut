# FR-14 — Domain Testing and Boundary Value Analysis

## 1. Requirement analysis

- **Requirement:** FR-14, category management; permission behavior also references FR-12.
- **Module:** Admin category CRUD and category listing.
- **Rules used as the oracle:** category names are required; category management actions are restricted to an Admin; valid categories can be listed, created, updated, and deleted.
- **Preconditions:** Admin and regular-user tokens, category records, and product/category associations for relevant cases.
- **Observable results:** response/status, persisted category name and identifier, list contents, permission outcome, and product references after deletion.
- **Ambiguities:** the requirements do not clearly define name uniqueness, minimum name length beyond nonempty, behavior for unknown IDs, or whether a category referenced by products must be undeletable. Those expectations require review before related observations are confirmed as requirement violations.

## 2. Domain analysis and equivalence partitions

| Input/state | Valid partitions | Invalid partitions | Existing cases |
|---|---|---|---|
| Category name | Nonempty name, including Unicode and punctuation | Empty, whitespace-only, missing, or null | `TC-CAT-001`–`009`, `TC-CAT-015`–`016`; `TC-BVA-CAT-001`–`008` |
| Name content | Plain text rendered safely | Markup/script input; duplicate name (uniqueness rule needs confirmation) | `TC-CAT-002`, `009`–`010` |
| User/role | Admin for create/update/delete; public read where allowed | No token or regular-user token for protected mutations | `TC-CAT-011`–`012`, `018`, `022`–`023` |
| Category ID | Existing identifier | Zero, negative, or identifier not present (response oracle needs confirmation) | `TC-CAT-017`, `019`–`021`; `TC-BVA-CAT-009`–`012` |
| Product association | No products linked | One or more linked products (deletion policy needs confirmation) | `TC-BVA-CAT-015`–`016`, `TC-CAT-020` |
| Collection size | Empty and populated list | N/A | `TC-CAT-013`–`014`; `TC-BVA-CAT-013`–`014` |

## 3. Boundary analysis and values

| Variable | Boundary used in existing design | Existing values | Coverage note |
|---|---|---|---|
| Name length | Required/nonempty; no explicit maximum | 0, 1, and 2 characters; create and update | Length 0 is directly tied to nonempty. The assumption that whitespace must be trimmed is separately flagged. |
| Category ID | Positive existing IDs in recorded fixtures | -1, 0, an existing ID, and max-existing-ID + 1 | Unknown-ID error status is not expressly specified. |
| Linked product count | Whether any product is linked | 0 and 1; a domain case also records a category with 2 linked products | Expected delete behavior needs requirement review. |
| Category count | Empty vs. populated | 0 and 1 | Collection cardinality is tested; no maximum is specified. |

## 4. Design and coverage review

The suite separates create, read, update, and delete; distinguishes Admin, regular-user, and unauthenticated states; and varies names, IDs, list size, and product association. BVA is applied to ordered name lengths, identifiers, counts, and the binary presence of linked products. It is not applied to unordered role or text-content classes.

- **Core Domain/BVA cases:** 41 (25 Domain, 16 BVA).
- **Recorded AI-gap cases:** 12 additional `TC-GAP-CAT-*` IDs, in [FR-14 AI-gap analysis](FR-14-ai-gap-analysis.md).
- **Coverage gaps:** no maximum name length or exact upper valid ID is specified. Concurrency and recovery after a partial CRUD failure are not in the current case set.
- **Human review required:** confirm the expected behavior for duplicate names, whitespace-only names, unknown IDs, deletion with linked products, and client-side validation before final bug classification.

## 5. AI-gap candidates

The gap analysis adds API-level empty/null-name, role, unknown-ID, linked-product, duplicate-name, and empty-form scenarios. The stale FR-14 defect references in that table were aligned to the detailed report catalog while preserving every `TC-GAP-CAT-*` ID and recorded outcome.
