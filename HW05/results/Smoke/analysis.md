# JMeter JTL Analysis

Valid samples: 5
Malformed rows excluded: 0

Throughput window: sample count / (max timestamp - min timestamp + 1 ms); observed timestamp span

## Overall

| Metric | Value |
|---|---:|
| Errors | 0 |
| Error rate (%) | 0.00 |
| Mean elapsed (ms) | 22.60 |
| p90 / p95 / p99 (ms) | 75.00 / 75.00 / 75.00 |
| Throughput (samples/s) | 0.41 |

## By label

| Label | Samples | Errors | Error rate (%) | p95 (ms) | Throughput (samples/s) |
|---|---:|---:|---:|---:|---:|
| 01 - Login | 1 | 0 | 0.00 | 75.00 | 1000.00 |
| 02 - Search products | 1 | 0 | 0.00 | 4.00 | 1000.00 |
| 03 - Product detail | 1 | 0 | 0.00 | 4.00 | 1000.00 |
| 04 - Add item to cart | 1 | 0 | 0.00 | 6.00 | 1000.00 |
| 05 - Checkout | 1 | 0 | 0.00 | 24.00 | 1000.00 |

## Warnings

- Insufficient data for stable tail percentiles: only 5 valid sample(s)

Metrics describe the supplied JTL only; they do not establish a pass/fail threshold.
