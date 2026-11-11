# Requirements Mapping

Assignment định nghĩa IA-01–IA-04 là interface aspect, không phải functional requirement ID. FR-01–FR-03 dưới đây được hỗ trợ bởi repository [`README.md`](../../README.md). Định nghĩa IA và GUI requirement được hỗ trợ bởi [`docs/2026.HW03.md`](../../docs/2026.HW03.md) và các phần GUI trong README.

## Functional requirements

| Requirement ID | Requirement description | Screen | Relevant IA | Source |
|---|---|---|---|---|
| FR-01 | Registration requires name, unique valid email, strong password, password confirmation, and redirects to login after success. | Register | IA-02, IA-03, IA-04 | `README.md` §2 FR-01 |
| FR-02 | Login accepts email and password; consecutive failures increment by one; three or more consecutive failures temporarily lock the account for 30 seconds with an appropriate non-revealing error; successful login returns a token. | Login | IA-02, IA-04 | `README.md` §2 FR-02 |
| FR-03 | Forgot-password step 1 accepts a registered email and displays a six-digit OTP in demo mode with a step indicator and return-to-login control. Step 2 accepts OTP, new password, and confirmation; password rules and email binding apply. | Forgot Password | IA-02, IA-03, IA-04 | `README.md` §2 FR-03 |

## Interface aspects

| Requirement ID | Requirement description | Screen | Relevant IA | Source |
|---|---|---|---|---|
| IA-01 | General UI standards: consistent Vietnamese language, action colors, currency where applicable, one descriptive H1 per page, and logical tab order. | Login; Register; Forgot Password | IA-01 | `README.md` §8 FR-21; `docs/2026.HW03.md` §4 |
| IA-02 | Forms: required fields marked, email/password input types, errors above submit, and step indicator for multi-step forms. | Login; Register; Forgot Password | IA-02 | `README.md` §8 FR-22 |
| IA-03 | Navigation: current-page highlight, cart badge, exact logout label, and breadcrumbs on specified child pages. For this scope, test applicable links and return-to-login navigation. | Login; Register; Forgot Password | IA-03 | `README.md` §8 FR-23; `docs/2026.HW03.md` §4 |
| IA-04 | Feedback/state: visible add-to-cart feedback, delete confirmation, friendly empty state, and descriptive image alt text. For this scope, test applicable error, success, loading, and step-state feedback without inventing unsupported controls. | Login; Register; Forgot Password | IA-04 | `README.md` §8 FR-24; `docs/2026.HW03.md` §4 |

## Khuyến nghị usability/accessibility bổ sung

Không có recommendation bổ sung nào được xem là application requirement trong mapping này. Mọi human-added checklist item nằm ngoài source requirement phải được đánh dấu là recommendation và giải thích trong AI Gap Analysis.
