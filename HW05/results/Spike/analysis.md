# JMeter JTL Analysis

Valid samples: 30
Malformed rows excluded: 0

Throughput window: sample count / (max timestamp - min timestamp + 1 ms); observed timestamp span

## Overall

| Metric | Value |
|---|---:|
| Errors | 0 |
| Error rate (%) | 0.00 |
| Mean elapsed (ms) | 53.50 |
| p90 / p95 / p99 (ms) | 120.00 / 354.00 / 595.00 |
| Throughput (samples/s) | 0.42 |

## By label

| Label | Samples | Errors | Error rate (%) | p95 (ms) | Throughput (samples/s) |
|---|---:|---:|---:|---:|---:|
| Baseline - 1 VU - 01 - Login | 1 | 0 | 0.00 | 120.00 | 1000.00 |
| Baseline - 1 VU - 02 - Search products | 1 | 0 | 0.00 | 5.00 | 1000.00 |
| Baseline - 1 VU - 03 - Product detail | 1 | 0 | 0.00 | 4.00 | 1000.00 |
| Baseline - 1 VU - 04 - Add item to cart | 1 | 0 | 0.00 | 4.00 | 1000.00 |
| Baseline - 1 VU - 05 - Checkout | 1 | 0 | 0.00 | 19.00 | 1000.00 |
| Recovery - 1 VU - 01 - Login | 1 | 0 | 0.00 | 10.00 | 1000.00 |
| Recovery - 1 VU - 02 - Search products | 1 | 0 | 0.00 | 3.00 | 1000.00 |
| Recovery - 1 VU - 03 - Product detail | 1 | 0 | 0.00 | 5.00 | 1000.00 |
| Recovery - 1 VU - 04 - Add item to cart | 1 | 0 | 0.00 | 10.00 | 1000.00 |
| Recovery - 1 VU - 05 - Checkout | 1 | 0 | 0.00 | 27.00 | 1000.00 |
| Spike Peak - 4 VU - 01 - Login | 4 | 0 | 0.00 | 13.00 | 2.64 |
| Spike Peak - 4 VU - 02 - Search products | 4 | 0 | 0.00 | 14.00 | 2.62 |
| Spike Peak - 4 VU - 03 - Product detail | 4 | 0 | 0.00 | 6.00 | 2.65 |
| Spike Peak - 4 VU - 04 - Add item to cart | 4 | 0 | 0.00 | 7.00 | 2.62 |
| Spike Peak - 4 VU - 05 - Checkout | 4 | 0 | 0.00 | 595.00 | 2.62 |

## Warnings

- None

Metrics describe the supplied JTL only; they do not establish a pass/fail threshold.
