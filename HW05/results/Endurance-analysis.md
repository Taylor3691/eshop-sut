# JMeter JTL Analysis

Valid samples: 309
Malformed rows excluded: 1

Throughput window: sample count / (max timestamp - min timestamp + 1 ms); observed timestamp span

## Overall

| Metric | Value |
|---|---:|
| Errors | 0 |
| Error rate (%) | 0.00 |
| Mean elapsed (ms) | 21.04 |
| p90 / p95 / p99 (ms) | 41.00 / 98.00 / 281.00 |
| Throughput (samples/s) | 0.66 |

## By label

| Label | Samples | Errors | Error rate (%) | p95 (ms) | Throughput (samples/s) |
|---|---:|---:|---:|---:|---:|
| 01 - Login | 62 | 0 | 0.00 | 120.00 | 0.14 |
| 02 - Search products | 62 | 0 | 0.00 | 98.00 | 0.14 |
| 03 - Product detail | 62 | 0 | 0.00 | 11.00 | 0.14 |
| 04 - Add item to cart | 62 | 0 | 0.00 | 13.00 | 0.14 |
| 05 - Checkout | 61 | 0 | 0.00 | 88.00 | 0.13 |

## Warnings

- Excluded 1 malformed row(s); see malformed_rows

Metrics describe the supplied JTL only; they do not establish a pass/fail threshold.
