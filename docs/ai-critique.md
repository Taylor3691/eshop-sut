# 10. AI Critique

The model drafted partitions when a prompt named the domain, and it stopped at the edge of that prompt. On FR-05 web, the equivalence prompt listed `%`, `_`, `'`, and `<script>`. The model treated that list as complete and never added `&`, `#`, or `?`, although `Home.jsx` builds `search=${query}` with no encoding. The same construction was tested later on mobile, where `a&b` and `a#b` are searched as `a` (BUG-22). The web cases were never written.

The model also added requirements the README does not state. The boundary prompt asked for pagination and a page size. FR-05 has neither, yet five cases stayed blocked on a symbol `L`. TC-04 expected `iphone` not to return `iPhone 15 Pro Max`. The README does not require case-sensitive search, so that failure is not a defect. On the first mobile run the model copied the web oracle onto Expo web and failed cases for a missing `h1`, an empty `alt`, and a one-column layout. The React Native screen has no `h1`, the web runtime inserts `alt=""`, and the README gives no column count for mobile. TC-10 was marked as if the letter `a` did not occur inside `Max`.

For CSV import, the prompt covered a comma inside quotes. The model did not partition escaped quotes, a newline inside a quoted field, CRLF, or a leading byte-order mark, although the admin parser splits on newline and then on comma.

The model follows the latest list more closely than the specification sentence that list was meant to cover. A filled table is not coverage, and a failing script is not a bug. The human owns the oracle: every expected result has to match a sentence in the README, and every failure has to be read from one real execution before it is reported.
