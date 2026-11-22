# JMeter JTL Analysis

Valid samples: 20
Malformed rows excluded: 0

Throughput window: sample count / (max timestamp - min timestamp + 1 ms); observed timestamp span

## Overall

| Metric | Value |
|---|---:|
| Errors | 0 |
| Error rate (%) | 0.00 |
| Mean elapsed (ms) | 10.15 |
| p90 / p95 / p99 (ms) | 20.00 / 26.00 / 51.00 |
| Throughput (samples/s) | 1.34 |

## By label

| Label | Samples | Errors | Error rate (%) | p95 (ms) | Throughput (samples/s) |
|---|---:|---:|---:|---:|---:|
| Stage 3 - 01 - Login | 4 | 0 | 0.00 | 51.00 | 1.40 |
| Stage 3 - 02 - Search products | 4 | 0 | 0.00 | 5.00 | 1.45 |
| Stage 3 - 03 - Product detail | 4 | 0 | 0.00 | 5.00 | 1.45 |
| Stage 3 - 04 - Add item to cart | 4 | 0 | 0.00 | 5.00 | 1.44 |
| Stage 3 - 05 - Checkout | 4 | 0 | 0.00 | 26.00 | 1.45 |

## Warnings

- None

Metrics describe the supplied JTL only; they do not establish a pass/fail threshold.
