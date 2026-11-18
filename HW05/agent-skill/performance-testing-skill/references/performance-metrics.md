# Performance metrics

- **Elapsed/response time:** JMeter `elapsed` is sample duration in milliseconds; state whether connect/latency measures are also reported.
- **Percentiles:** p90/p95/p99 describe the selected sample population and percentile convention. State the calculation method and sample count; do not average percentiles across groups.
- **Throughput:** define whether reported as samples/transactions per second and the exact observation window. For timestamped JTL, derive the window from timestamps (including documented boundary convention), not a guessed test duration.
- **Error rate:** failed samples divided by all valid samples in the stated population. Explain malformed rows or excluded samples.
- **Concurrency and arrival rate:** report separately; they are not interchangeable.
- **Resource use:** align CPU, memory, disk, network, and dependency observations with the test interval and identify the monitored host/process.

Report counts, units, window, scope, and missing data alongside each metric. Small samples make tail percentiles unstable. A percentile is not a maximum or an SLA by itself.
