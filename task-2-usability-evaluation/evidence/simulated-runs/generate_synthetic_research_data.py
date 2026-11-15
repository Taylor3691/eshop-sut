"""Write explicitly fictional usability-study records; never treat as human data."""
import json
from pathlib import Path
from statistics import mean, median, pstdev

ROOT = Path(__file__).resolve().parents[2]
RESULTS = json.loads((ROOT / "evidence/simulated-runs/run-results.json").read_text(encoding="utf-8"))

rows = [
    dict(id="P01", name="Phạm Bảo Huy", focus="business studies", shopping="occasional online shopper", confidence="low", trait="checks labels carefully", story="The login heading looks like registration, so he pauses and checks the fields before entering credentials. In the simulated narrative he completes login, then asks whether the cart total includes the coupon.", pause="Login heading and Username label; compares the total before and after coupon.", error="Initially interprets the login screen as registration; recovers by noticing the existing-account sign-in action.", answers=[3,3,3,2,3,2,3,2,3,3], clarity="The screen looked like registration at first. The coupon saving was easier to understand once it appeared.", recovery="I would recheck the email field if login failed; the labels did not make that obvious.", speed="The simulated flow felt manageable, but I would stop to read the totals.", trust="I would want the final amount repeated clearly before confirming."),
    dict(id="P02", name="Trần Anh Khoa", focus="economics studies", shopping="frequent online shopper", confidence="high", trait="looks for discount and order status", story="He goes directly to the cart, checks the product and searches for a coupon field. He notices the reduction and then confirms the order.", pause="Briefly looks for the coupon control, then scans the final amount.", error="No error in the hypothetical path; recognizes the success and order-history states.", answers=[4,2,4,2,4,2,4,2,4,2], clarity="The discount amount and final amount are the clearest feedback.", recovery="I would edit the code and apply it again if rejected.", speed="The simulated task is quick once the cart is populated.", trust="Seeing the order in history would reassure me, but I want the total to be read-only."),
    dict(id="P03", name="Tô Thành Long", focus="design studies", shopping="infrequent online shopper", confidence="low", trait="relies on descriptive cues", story="He has trouble interpreting the malformed Vietnamese text and tentatively enters a coupon, then notices the feedback before proceeding.", pause="Several short pauses at garbled headings, coupon action, and order status.", error="Hypothetically enters a mistyped coupon once, reads the error, corrects it, and proceeds.", answers=[2,4,2,4,2,4,2,4,2,4], clarity="Some labels were difficult to read; I was unsure which page I was on.", recovery="An error message would help only if it clearly said what to change.", speed="I would be slower because I need to inspect each step.", trust="I would verify the order details before leaving the account."),
    dict(id="P04", name="Nguyễn Minh Hiếu", focus="engineering studies", shopping="moderately frequent online shopper", confidence="medium", trait="checks price arithmetic", story="He moves quickly through login and cart but questions the editable total at checkout, compares it to the cart, and then continues.", pause="Stops at the editable total and rechecks the applied discount.", error="No hypothetical input error; hesitates because the amount can be edited.", answers=[3,4,2,3,3,4,2,3,4,3], clarity="The item list is useful, but the editable total makes the calculation feel ambiguous.", recovery="I would go back to the cart to compare if the total looked wrong.", speed="Most screens seem quick; checking price arithmetic adds time.", trust="I would trust the order history more than an editable checkout amount."),
    dict(id="P05", name="Nguyễn Viết Toàn", focus="communications studies", shopping="frequent mobile-commerce shopper", confidence="high", trait="expects clear badges and compact navigation", story="He expects a cart badge, looks at the header, then uses the cart link. At checkout he checks that the discount is reflected before confirming.", pause="Looks for a quantity badge in the header and scans the cart summary.", error="No hypothetical error; notes that absent/unclear cart-count feedback could prompt a second check.", answers=[4,1,4,2,4,2,5,1,4,2], clarity="I want an obvious cart count and a clear breakdown of savings.", recovery="I would return to the cart and check quantities if anything seemed off.", speed="The simulated path is fast if navigation feedback is visible.", trust="A clear order number and status would make me more comfortable."),
    dict(id="P06", name="Nguyễn Minh Tú", focus="education studies", shopping="occasional online shopper", confidence="low", trait="prefers confirmation before irreversible actions", story="She reads each page carefully, checks whether the coupon applied, then waits for a clear success signal before considering the task complete.", pause="At coupon feedback and the final confirm-payment action.", error="Hypothetically mistypes the coupon once, sees an error, re-enters it, and continues.", answers=[2,3,2,3,2,3,2,3,2,3], clarity="I need the final amount and the words on the buttons to be easy to understand.", recovery="A specific coupon error would tell me whether to fix the code or the order amount.", speed="I would take time to confirm rather than move quickly.", trust="I want a visible order record and a clear sign-out action."),
    dict(id="P07", name="Cao Trọng Khang", focus="law studies", shopping="frequent online shopper", confidence="high", trait="verifies status and account security", story="He treats order-history verification as essential, checks the order row after checkout, then looks for the logout control to finish.", pause="Checks the order status and pauses before using the ambiguously labeled logout action.", error="No hypothetical task error; logout wording makes the end of the task less explicit.", answers=[5,2,4,2,4,1,4,2,5,2], clarity="I want the order status and sign-out action to be explicit.", recovery="If a coupon failed, I would confirm the reason before trying another one.", speed="The flow feels efficient when the next state is obvious.", trust="An order history entry helps, but the final confirmation should show the exact total."),
]

questions = [
    "I think that I would like to use this system frequently.",
    "I found the system unnecessarily complex.",
    "I thought the system was easy to use.",
    "I think that I would need the support of a technical person to be able to use this system.",
    "I found the various functions in this system were well integrated.",
    "I thought there was too much inconsistency in this system.",
    "I would imagine that most people would learn to use this system very quickly.",
    "I found the system very cumbersome to use.",
    "I felt very confident using the system.",
    "I needed to learn a lot of things before I could get going with this system.",
]

def score(values):
    adjusted = sum(v - 1 if i % 2 == 0 else 5 - v for i, v in enumerate(values))
    return adjusted * 2.5

scores = []
for row, result in zip(rows, RESULTS):
    pid = row["id"]
    folder = ROOT / "participants" / pid
    sus = score(row["answers"])
    scores.append(sus)
    (folder / "participant-profile.md").write_text(f"""# Persona mô phỏng — {pid}

> **SIMULATED DATA — hồ sơ hư cấu, không mô tả người thật.** Tên, tuổi 21 và bối cảnh sinh viên được cung cấp trong yêu cầu. Các đặc điểm dưới đây được sáng tác để tạo các kịch bản khác nhau.

- **Tên nhãn:** {row['name']}
- **Tuổi / bối cảnh:** 21 / sinh viên
- **Hướng học tập hư cấu:** {row['focus']}
- **Thói quen mua sắm giả định:** {row['shopping']}
- **Mức tự tin giả định:** {row['confidence']}
- **Đặc điểm hành vi giả định:** {row['trait']}
- **Liên hệ / consent:** N/A — persona hư cấu; không có cá nhân được tuyển dụng hoặc liên hệ.
""", encoding="utf-8")

    (folder / "session-notes.md").write_text(f"""# Ghi chú phiên — {pid} (**SIMULATED DATA**)

> Nội dung think-aloud và hành vi dưới đây là kịch bản hư cấu. Chúng **không** được nghe, quan sát hay trích xuất từ video Playwright. Video chỉ ghi lại thao tác tự động.

- **Persona:** {row['name']}, 21 tuổi, sinh viên; đặc điểm giả định trong hồ sơ.
- **Run thực tế:** Playwright Chromium, 2026-11-15; kết quả kỹ thuật: {', '.join(result['steps'])}.
- **Kịch bản hành vi hư cấu:** {row['story']}
- **Điểm ngập ngừng giả định:** {row['pause']}
- **Lỗi / phục hồi giả định:** {row['error']}
- **Lời nói mô phỏng:** “{row['clarity']}” (câu hư cấu, không phải verbatim thật).
- **Consent / moderator / âm thanh:** N/A; không có participant.
- **Thời lượng usability:** Không đo người thật. Thời gian chạy tự động không được diễn giải là thời gian người dùng.
- **Evidence:** Playwright state capture tại `../../evidence/screenshots/{pid}-*.png`; video `../../evidence/session-recordings/{pid}-simulated.webm`. Không dùng chúng làm bằng chứng rằng persona đã nói/hành xử như trên.
""", encoding="utf-8")

    (folder / "observation-log.md").write_text(f"""# Observation log — {pid} (**SIMULATED DATA**)

## A. Sự kiện được Playwright quan sát trực tiếp

| Checkpoint | Kết quả automation | Tệp screenshot |
|---|---|---|
| Login | PASS | `{pid}-01-login-home.png` |
| Cart | PASS | `{pid}-02-cart.png` |
| Apply coupon | PASS | `{pid}-03-coupon-checkout.png` |
| Checkout | PASS | `{pid}-04-checkout-success.png` |
| Verify order | PASS | `{pid}-05-order-history.png` |
| Logout | PASS — token localStorage bị xóa | `{pid}-06-logout.png` |

## B. Kịch bản hành vi tổng hợp (không phải quan sát thật)

- Hesitation: {row['pause']}
- Error / recovery: {row['error']}
- Think-aloud hư cấu: “{row['clarity']}”
- Hỗ trợ moderator / biểu hiện cảm xúc thật: Không có dữ liệu.

Kịch bản B được tạo để minh họa một persona, không phải phân tích hành vi từ video ở phần A.
""", encoding="utf-8")

    (folder / "sus-responses.md").write_text(f"""# SUS responses — {pid} (**SIMULATED DATA**)

> Các mức 1–5 là phản hồi hư cấu để minh họa phép chấm SUS. Không có người trả lời thực.

| # | SUS statement | Simulated response (1–5) |
|---:|---|---:|
""" + "".join(f"| {i} | {q} | {v} |\n" for i, (q, v) in enumerate(zip(questions, row["answers"]), 1)) + f"""
**Tính điểm:** câu lẻ trừ 1; câu chẵn tính 5 trừ đáp án; tổng hiệu chỉnh × 2.5.

- Adjusted total: {sus / 2.5:g} / 40
- **Illustrative SUS score: {sus:g} / 100 (SIMULATED DATA; không phải kết quả nghiên cứu).**
""", encoding="utf-8")

    (folder / "interview-responses.md").write_text(f"""# Interview responses — {pid} (**SIMULATED DATA**)

> Các câu trả lời sau được sáng tác cho kịch bản persona; không phải phỏng vấn hoặc lời trích dẫn thật.

- **Clarity:** “{row['clarity']}”
- **Error recovery:** “{row['recovery']}”
- **Speed:** “{row['speed']}”
- **Trust:** “{row['trust']}”
- **Actual interview / recording / consent:** Không có.
""", encoding="utf-8")

    (folder / "session-summary.md").write_text(f"""# Session summary — {pid} (**SIMULATED DATA**)

- Persona hư cấu: **{row['name']}**, 21 tuổi, sinh viên; {row['trait']}.
- Kịch bản tương tác hư cấu: {row['story']}
- Điểm ngập ngừng: {row['pause']}
- Lỗi và khôi phục: {row['error']}
- **Kết quả automation độc lập:** {', '.join(result['steps'])}.
- **Kết quả persona được giả định:** Hoàn tất trong kịch bản sau khi gặp khó khăn như mô tả; đây không phải kết quả do người tham gia tạo ra.
- SUS minh họa: **{sus:g}/100**, tính từ câu trả lời tổng hợp; không gộp vào kết luận nghiên cứu.
- Interview: các câu trả lời tổng hợp trong `interview-responses.md`.
""", encoding="utf-8")

    (folder / "evidence-index.md").write_text(f"""# Evidence index — {pid} (**SIMULATED DATA**)

## Bằng chứng browser có thật từ Playwright

- `../../evidence/session-recordings/{pid}-simulated.webm`
""" + "".join(f"- `../../evidence/screenshots/{pid}-{i:02d}-{label}.png`\n" for i, label in enumerate(["login-home", "cart", "coupon-checkout", "checkout-success", "order-history", "logout"], 1)) + f"""
## Nội dung hư cấu

Profile traits, verbalizations, hesitations, errors, interviews, and SUS responses are invented scenario data. The evidence above does not verify them.
""", encoding="utf-8")

aggregate = f"""# SUS scoring — fully simulated values

> **SIMULATED DATA ONLY.** No human completed the questionnaire. Scores below are calculated correctly from invented item ratings, but do not estimate the real product's usability.

| ID | Responses Q1–Q10 | Adjusted /40 | SUS /100 |
|---|---|---:|---:|
"""
for row in rows:
    total = score(row["answers"])
    adjusted = total / 2.5
    aggregate += f"| {row['id']} | {', '.join(map(str, row['answers']))} | {adjusted:g} | {total:g} |\n"
aggregate += f"\n- Simulated mean: {mean(scores):.2f}\n- Simulated median: {median(scores):.1f}\n- Simulated range: {min(scores):g}–{max(scores):g}\n- These aggregates are arithmetic summaries of invented responses only; do not compare them with the SUS benchmark or report them as empirical results.\n"
(ROOT / "analysis/sus-scoring.md").write_text(aggregate, encoding="utf-8")

analysis = f"""# Consolidated qualitative synthesis — **SIMULATED DATA**

> The behavioral narratives and interview text are invented, not observed. Separate factual browser results from hypothetical persona scenarios below.

## Automated outcomes (directly observed)

All seven Playwright runs passed Login, Cart, Apply Coupon, Checkout, Verify Order, and Logout. These results establish scripted UI-flow execution only.

## Hypothetical persona pain points (invented)

| Theme | Personas | Synthetic pattern | Priority |
|---|---|---|---|
| Label comprehension | P01, P03 | Registration-like heading, malformed words, uncertainty over form meaning | High |
| Price confidence | P01, P04, P07 | Rechecking coupon math and concern about editable checkout amount | High |
| Error recovery | P03, P06 | Hypothetical mistyped coupon and need for actionable feedback | Medium |
| Navigation state | P02, P05 | Looking for coupon and cart-count cues | Medium |
| Completion confidence | P06, P07 | Need clear confirmation and explicit logout label | Medium |

Frequencies in this table describe authored scenarios and are not prevalence estimates.

## Browser-visible defects (factual observations)

| Finding | Severity | Evidence / requirement |
|---|---|---|
| Malformed Vietnamese text across several screens | High | BUG-SIM-001; screenshots; FR-21 |
| Misleading login heading/labels and plain-text password field | High | BUG-SIM-002; login screenshot; FR-02, FR-22 |
| Checkout total is editable | Medium | checkout screenshot; FR-08 says total is calculated automatically |

## Recommendations

1. Correct UTF-8 rendering and review every visible label in Vietnamese.
2. Correct login title, field labels, email/password input types, and localized action text.
3. Calculate authoritative totals server-side and display a read-only breakdown including coupon savings.
4. Make coupon validation errors actionable; show cart count, order number/status, and an explicit “Đăng xuất” control.
5. Validate these priorities with real participants before treating persona frequency or SUS as evidence.

## SUS

Scores appear in `sus-scoring.md`; they are generated from fictional response vectors. No empirical mean, usability grade, or confidence interval is available.
"""
(ROOT / "analysis/qualitative-synthesis.md").write_text(analysis, encoding="utf-8")
(ROOT / "analysis/usability-summary-report.md").write_text(analysis.replace("# Consolidated qualitative synthesis", "# Usability evaluation summary report") + "\n\nThe seven browser flows are simulated Playwright executions, not moderated sessions. The persona profiles, task reactions, interviews, and SUS values are all SIMULATED DATA. See `main-report.md` for methods, evidence index, and limitations.\n", encoding="utf-8")

print(f"Wrote 7 simulated participant records; scores={scores}; mean={mean(scores):.2f}")
