# API discovery and workflow analysis

## Evidence hierarchy

Prefer executable source and route definitions, authoritative API specifications, then observed responses from an authorized environment. Record source file/section or request evidence for each endpoint. A frontend call can reveal usage but does not by itself establish all server-side validation or authorization behavior.

## Inventory fields

For each operation record: stable name, method, path, path/query parameters, headers, authentication/role, request body and content type, success/error response shape and status, side effects, rate limits if known, dependencies, and evidence. Mark unknowns explicitly; never infer a response contract from a route name.

## Workflow modeling

1. Identify business journeys and endpoint groups from requirements and application behavior.
2. Draw request dependencies, including IDs, tokens, cookies, cart/order state, and cleanup.
3. Decide whether virtual users need isolated identities or records. Avoid shared mutable state unless contention is the intended subject.
4. Specify normal and negative validations separately. Avoid invalid-login loops that trigger account lockout during a main performance scenario.
5. Document data provisioning, uniqueness, reset strategy, and side effects before choosing transactional traffic.
6. Validate a single journey manually or with a low-load plan before scaling.

## Output

Produce an endpoint inventory and a workflow diagram/list with verified values, dependencies, evidence, and unresolved questions. Do not create test data or credentials that are not authorized and available.
