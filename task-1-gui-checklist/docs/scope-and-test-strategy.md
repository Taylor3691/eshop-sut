# Scope and Test Strategy

## Objective

Prepare a traceable GUI checklist for the EShop web storefront login, registration, and forgot-password screens. The later execution must evaluate the four documented interface aspects against FR-01, FR-02, and FR-03 without changing application code.

## In scope

- Login screen and successful, invalid, and repeated-failure interactions relevant to FR-02.
- Register screen and validation/navigation relevant to FR-01.
- Forgot Password step 1 (request OTP) and step 2 (reset password) relevant to FR-03.
- IA-01 General UI standards, IA-02 Forms, IA-03 Navigation, and IA-04 Feedback / state.

## Out of scope

- Product, cart, checkout, profile, admin, and mobile screens.
- Backend/API-only testing except where a UI interaction requires an observable response.
- Security testing beyond observable UI requirements.
- GUI execution, screenshots, bug filing, and test results during this preparation phase.

## Selected screens and flows

| Screen | Route | Flow focus |
|---|---|---|
| Login | `/login` | Enter email/password, submit, recover via forgot password, navigate to registration |
| Register | `/register` | Enter name/email/password, submit, navigate to login |
| Forgot Password | `/forgot-password` | Request OTP (step 1), enter reset information (step 2), return to login |

Routes are defined in `frontend-web/src/App.jsx`.

## Test environment

The repository documents a Node.js backend at `http://localhost:3000` and a Vite web frontend normally served at `http://localhost:5173`. Follow the repository setup instructions and record the actual URL and configuration used during execution; do not assume a running environment in this preparation document.

## Browser and viewport assumptions

The execution record must name the browser, version, operating system, viewport, and device/cloud platform. No browser or viewport result is assumed here. The assignment requires coverage across at least three platforms for the later task.

## Test data requirements

- Use the documented demo user only when needed: `test@eshop.com` with its documented password. Do not copy passwords or tokens into evidence or reports.
- Use a new, non-sensitive email address for registration if the environment permits.
- Use an existing registered email for the forgot-password flow.
- Generate invalid, boundary, mismatched, and repeated-failure inputs during execution without storing secrets.

## Testing approach

1. Trace every checklist item to an FR or IA source.
2. Review AI-generated items against the source and add human items for omissions.
3. Execute normal, invalid, boundary, navigation, and state/feedback scenarios.
4. Record only observed results. Mark pre-execution items `Not Executed`; final statuses are `Passed` or `Failed`.
5. Capture evidence only for failed items and report only verified bugs.
