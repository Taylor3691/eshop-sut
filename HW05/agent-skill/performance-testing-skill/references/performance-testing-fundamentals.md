# Performance testing fundamentals

## Choose the question first

State what decision the test should inform: behavior under expected demand, the degradation boundary, abrupt demand recovery, or sustained resource behavior. Define the system boundary and what is outside measurement (client, network, dependencies).

## Workload model

Describe user/arrival model, transaction mix, pacing, think time, ramp-up, steady period, and test data. Distinguish concurrent users from arrival rate. Keep compared scenarios equivalent in journey and environment unless deliberately varying one factor.

## Load, stress, and spike

- Load tests evaluate a defined target or expected workload over a sustained interval.
- Stress tests raise load in controlled stages to expose degradation and a safe operating boundary. Record each stage and stop before uncontrolled harm.
- Spike tests introduce a sharp, bounded change, then observe recovery toward baseline.

These labels do not imply a universal duration, user count, or pass threshold. Derive those from requirements, capacity, hardware, and authorization.

## Validity controls

Use a representative, isolated environment; keep builds and data stable; warm up when appropriate; monitor generators and SUT; repeat runs when variability matters; and document deviations. A saturated load generator invalidates conclusions about server capacity.
