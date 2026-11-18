# API discovery and workflow analysis

## Evidence hierarchy and provenance

Prefer executable source and route definitions, authoritative API specifications, then observed responses from an authorized environment. Record source file/section or request evidence for each endpoint and mark whether each detail is source-derived, documentation-derived, or live-observed. A frontend call can reveal usage but does not by itself establish all server-side validation or authorization behavior. When specification and implementation conflict, preserve the requirement as the expected oracle and document implementation as observed behavior.

## Inventory fields

For each operation record: stable name, method, path, path/query parameters, headers, authentication and role enforcement, request body/content type, success/error response shape/status, side effects, rate limits if known, data dependencies, and evidence. Mark unknowns explicitly; never infer a response contract from a route name. Check status codes in each branch, auth middleware and role checks separately, plus database/session state effects. Identify destructive startup/reset behavior before starting services or touching persistent data.

## Workflow modeling

1. Identify business journeys and endpoint groups from requirements and application behavior.
2. Draw request dependencies, including IDs, tokens, cookies, cart/order state, and cleanup.
3. Decide whether virtual users need isolated identities or records. Avoid shared mutable state unless contention is the intended subject.
4. Specify normal and negative validations separately. Avoid invalid-login loops that trigger account lockout during a main performance scenario.
5. Document data provisioning, uniqueness, reset strategy, and side effects before choosing transactional traffic.
6. Validate a single journey manually or with a low-load plan before scaling.
7. Separate source-based contract analysis from live HTTP verification. Do not start a service if startup may erase or mutate user data until state is safely isolated/backed up.
8. Check workflow overlap with collaborators when the assignment requires uniqueness. If roster/peer workflow evidence is unavailable, report uniqueness as unverified rather than confirmed.

## Output

Produce an endpoint inventory and a workflow diagram/list with verified values, dependencies, evidence, and unresolved questions. Do not create test data or credentials that are not authorized and available.
