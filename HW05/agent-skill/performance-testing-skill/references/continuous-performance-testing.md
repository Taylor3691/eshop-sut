# Continuous performance testing

Use change detection to map modified components to affected endpoint groups. Run fast, selective checks on relevant changes and broader tests on a schedule or release candidate. Execute in a controlled environment with stable data, known resource allocation, and low contention.

Store raw results and metadata; compare against a versioned baseline using configurable thresholds and sample-quality gates. Example: flag if current p95 exceeds baseline p95 by 20%; this is an example, not a universal limit. Combine relative and absolute criteria where appropriate, require enough samples, and consider repeated confirmation to reduce false alarms. Track error-rate changes independently.

Document execution cost, baseline update ownership, environment drift, resource contention, flaky runs, notification paths, and how false positives/negatives are reviewed. A proposal is not a deployed pipeline; state implementation status honestly.
