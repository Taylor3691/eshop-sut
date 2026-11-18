# JTL validation and interpretation

JMeter CSV JTL files commonly contain `timeStamp`, `elapsed`, `label`, `responseCode`, `success`, and optional latency/connect/thread fields. Check actual header and JMeter save-service settings; do not assume every file has every field.

Run `python scripts/validate-jtl.py input.jtl` before interpretation, then `python scripts/analyze-jtl.py input.jtl --json-out summary.json --md-out summary.md`. The analyzer requires timestamp, elapsed, label, and success. It reports malformed rows, missing required data, sample counts, latency percentiles, error rate, and throughput from the observed timestamp span. Read its output's warnings and window definition.

Compare claims to raw rows and independently verify: label filtering, success denominator, timestamp units, timezone, test boundaries, percentile method, and whether setup/teardown samples are included. Do not pool unlike endpoints without also reporting endpoint-level summaries. State when data is too sparse, incomplete, or lacks resources needed for a conclusion. Synthetic fixtures are for utility verification only and must never be presented as execution evidence.
