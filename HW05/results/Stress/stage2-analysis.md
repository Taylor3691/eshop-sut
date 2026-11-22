# JMeter JTL Analysis

Valid samples: 10
Malformed rows excluded: 0

Throughput window: sample count / (max timestamp - min timestamp + 1 ms); observed timestamp span

## Overall

| Metric | Value |
|---|---:|
| Errors | 0 |
| Error rate (%) | 0.00 |
| Mean elapsed (ms) | 19.20 |
| p90 / p95 / p99 (ms) | 26.00 / 116.00 / 116.00 |
| Throughput (samples/s) | 0.78 |

## By label

| Label | Samples | Errors | Error rate (%) | p95 (ms) | Throughput (samples/s) |
|---|---:|---:|---:|---:|---:|
| Stage 2 - 01 - Login | 2 | 0 | 0.00 | 116.00 | 2.71 |
| Stage 2 - 02 - Search products | 2 | 0 | 0.00 | 3.00 | 3.58 |
| Stage 2 - 03 - Product detail | 2 | 0 | 0.00 | 7.00 | 3.56 |
| Stage 2 - 04 - Add item to cart | 2 | 0 | 0.00 | 4.00 | 3.58 |
| Stage 2 - 05 - Checkout | 2 | 0 | 0.00 | 26.00 | 3.58 |

## Warnings

- Insufficient data for stable tail percentiles: only 10 valid sample(s)

Metrics describe the supplied JTL only; they do not establish a pass/fail threshold.
