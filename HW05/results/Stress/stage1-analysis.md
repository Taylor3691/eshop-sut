# JMeter JTL Analysis

Valid samples: 5
Malformed rows excluded: 0

Throughput window: sample count / (max timestamp - min timestamp + 1 ms); observed timestamp span

## Overall

| Metric | Value |
|---|---:|
| Errors | 0 |
| Error rate (%) | 0.00 |
| Mean elapsed (ms) | 33.80 |
| p90 / p95 / p99 (ms) | 141.00 / 141.00 / 141.00 |
| Throughput (samples/s) | 0.41 |

## By label

| Label | Samples | Errors | Error rate (%) | p95 (ms) | Throughput (samples/s) |
|---|---:|---:|---:|---:|---:|
| Stage 1 - 01 - Login | 1 | 0 | 0.00 | 141.00 | 1000.00 |
| Stage 1 - 02 - Search products | 1 | 0 | 0.00 | 4.00 | 1000.00 |
| Stage 1 - 03 - Product detail | 1 | 0 | 0.00 | 3.00 | 1000.00 |
| Stage 1 - 04 - Add item to cart | 1 | 0 | 0.00 | 4.00 | 1000.00 |
| Stage 1 - 05 - Checkout | 1 | 0 | 0.00 | 17.00 | 1000.00 |

## Warnings

- Insufficient data for stable tail percentiles: only 5 valid sample(s)

Metrics describe the supplied JTL only; they do not establish a pass/fail threshold.
