# EShop agent guide

## WHY: purpose and change boundaries

EShop is a deliberately flawed e-commerce system for learning software testing.
Students compare observed behavior with requirements, design test cases, and
report defects in business logic, validation, UI, and security.

- `README.md` defines expected business behavior (FR/SEC requirements); use it as
  the test oracle, even when the implementation behaves differently.
- `api_specification.md` documents the API; `setup_guide.md` describes local setup.
- Preserve intentional defects unless the task explicitly requests fixing them.
  Avoid unrelated cleanup or security hardening that removes learning exercises.
- Keep changes scoped and retain the Vietnamese UI and sample scenarios.

## WHAT: stack and structure

| Location | Technology and responsibility |
| --- | --- |
| `backend/` | Node.js, Express, SQLite, JWT. `server.js` implements authentication, catalog, carts, orders, coupons, and admin APIs on port 3000. |
| `backend/database.js` | Schema and demo seed data; `database.sqlite` stores persistent data. |
| `frontend-web/` | React 19, Vite 8, Tailwind CSS, React Router, Axios. Customer storefront on port 5173; `src/pages/` contains screens and `src/context/` manages auth/cart state. |
| `frontend-admin/` | React 19, Vite 8, Tailwind CSS, Axios. Admin dashboard and management screens, primarily in `src/App.jsx`, on port 5174. |
| `frontend-mobile/` | React Native 0.81, Expo 54, React 19. Mobile shopping flows in `App.js`, sharing the backend API. |

Each component has its own npm manifest and lockfile; there is no root build or
test command.

## HOW: run, build, and verify

Use Node.js compatible with Vite 8 (20.19+ or 22.12+). Run `npm ci` inside each
component you need, then start services in separate terminals:

| Component | Command inside its directory |
| --- | --- |
| Backend | `node server.js` |
| Storefront | `npm run dev -- --port 5173 --strictPort` |
| Admin | `npm run dev` |
| Mobile | `npm start` (Expo Go or emulator) |

**Backend startup resets and reseeds the database:** importing `database.js`
unconditionally runs its initialization. Back up `backend/database.sqlite`
before starting if existing data matters. Do not run a separate seed step.
Seed logins: `admin@eshop.com` / `Admin123!` and
`test@eshop.com` / `Test1234!`.

For a physical mobile device, set `API_URL` in `frontend-mobile/App.js` to the
backend computer's reachable LAN address. `run_servers.sh` contains machine-specific
macOS paths and kills all Node processes; use the commands above instead.

- For either web frontend changed, run `npm run build` and `npm run lint` in that
  directory. Report existing failures separately from regressions.
- No automated test suite is configured. Backend `npm test` is a failing
  placeholder; `test_profile.js` is an ad hoc probe requiring Axios, which is not
  declared in the backend dependencies.
- Smoke-check `GET http://localhost:3000/api/products` and the affected UI.
  Exercise changed flows against the relevant requirement, including normal,
  invalid, boundary, and role/access cases. Check mobile changes in Expo.
- Record reproduction steps, expected versus actual behavior, and checks run.
  Build success alone does not establish business correctness. Do not commit
  generated dependencies, build output, or incidental database changes.
