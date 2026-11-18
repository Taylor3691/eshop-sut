# JMeter plan configuration

## Plan structure

Use a Thread Group or suitable arrival/concurrency model, HTTP Request Defaults only for verified shared values, HTTP Cookie Manager when session cookies are part of the flow, HTTP Header Manager, CSV Data Set Config, timers, assertions, and result writing. Keep setup/teardown separate from measured transactions where appropriate.

## Data and authentication

Use a CSV with explicit encoding, delimiter, variable names, sharing mode, and end-of-file behavior. Ensure concurrent users do not unintentionally reuse mutable account/cart data. Extract tokens from the actual login response with a JSON Extractor (or the matching extractor for the real format), assert extraction succeeded, and pass the value through the required header/cookie. Never store live secrets in a plan or repository.

## Assertions and listeners

Assert meaningful business outcomes and expected status/content, not just transport success. Make assertions specific to the verified API contract. Keep View Results Tree and other per-sample GUI listeners out of high-load execution; use raw JTL and lightweight summaries. Include the requested distinct report/listener for the assignment.

## Before execution

Check XML parsing, JMeter version compatibility, all placeholders, endpoint/method/body evidence, CSV resolution from the execution directory, variable names, extractor references, assertion behavior, timer placement, thread schedule, duration, stop conditions, and report output path. Run a low-volume smoke test in an authorized environment. Preserve application-specific configuration and avoid editing production targets by accident.

The supplied JMX templates are structural examples with unresolved placeholders and must be completed and reviewed before use.
