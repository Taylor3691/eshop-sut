# AI Critique

The first AI drafts followed the prompt more closely than the specification. For FR-05, a prompt mentioning price ranges and pagination produced partitions for features that did not exist. Five tests then remained blocked on an undefined page size. The revision removed those pagination cases and separated unsupported-query checks from functional coverage.

The AI also turned silence into requirements. It expected case-sensitive search because the README did not explicitly require case-insensitive matching. That conclusion was unsupported. The corrected oracle accepts either matching policy while still checking relevant results, error handling, and empty states. Similarly, a product-name limit from FR-15 was incorrectly presented as a search-length boundary and an import validation rule. These cases are now recorded as observations, not confirmed defects.

CSV testing exposed another limitation: example-driven prompts can hide missing classes. The original suite tested commas inside quotes but missed escaped quotes, embedded newlines, and CRLF. Added executions confirmed failures for escaped quotes and embedded newlines, while CRLF passed. Positive decimal prices also passed, showing why “positive” must not silently become “positive integer.”

Evidence also needs verification. Five FR-16 screenshots were byte-identical and showed only the success banner, yet the AI cited them as proof of different defects. It also treated three-value BVA as a substitute for selecting on, off, in and out points. Confident output is not checked output.

The practical principle is to keep requirements, assumptions, observations, and confirmed defects distinct. AI can organize evidence and expand test ideas, but execution results must be read against a justified oracle. An Expo web run left the space-only searches blocked, because Chrome removed the trailing space. The Android emulator run then showed an empty request and the full catalog, so those cases fail.
