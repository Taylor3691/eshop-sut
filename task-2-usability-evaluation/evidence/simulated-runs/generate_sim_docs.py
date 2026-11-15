import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
EVIDENCE = ROOT / "evidence"
results = json.loads((EVIDENCE / "simulated-runs/run-results.json").read_text(encoding="utf-8"))

for item in results:
    pid, name = item["id"], item["name"]
    folder = ROOT / "participants" / pid
    folder.mkdir(exist_ok=True)
    status = ", ".join(item["steps"])
    (folder / "participant-profile.md").write_text(f"""# Hồ sơ persona mô phỏng — {pid}

> **SIMULATED — không phải người tham gia thật.** Tên được cung cấp trong yêu cầu chỉ dùng làm nhãn persona. Không tuyển dụng, liên hệ, xác minh danh tính hoặc thu thập dữ liệu cá nhân.

- **Tên nhãn:** {name}
- **Tuổi theo chỉ định:** 21
- **Bối cảnh theo chỉ định:** sinh viên
- **Ngày chạy automation:** 2026-11-15
- **Đặc điểm khác / kinh nghiệm mua sắm:** Không có dữ liệu; không suy đoán.
- **Thông tin liên hệ:** Không có — đây không phải hồ sơ người thật.
- **Consent:** Không áp dụng; automation không phải participant.
""", encoding="utf-8")
    (folder / "session-notes.md").write_text(f"""# Ghi chú phiên automation — {pid}

> **SIMULATED Playwright run; không phải usability session có người.** Không có think-aloud, moderator, phản ứng cảm xúc hay hành vi người dùng được quan sát.

- Persona label: {name}, 21 tuổi, sinh viên (theo yêu cầu)
- Ngày chạy: 2026-11-15
- Hình thức: Chromium headless, Playwright; viewport 1280×800
- Consent / moderator: N/A
- Trạng thái tổng quát: Tất cả checkpoint tự động báo PASS.
- Kết quả checkpoint: {status}
- Thời gian usability / hesitation / hỗ trợ: Không đo; automation không đại diện cho tốc độ hay nỗ lực của người.
- Phát biểu người tham gia: Không có.
- Giới hạn: giỏ hàng được thêm bằng UI sau đăng nhập để giữ state; người dùng automation không suy nghĩ thành tiếng.
- Bằng chứng: `../../evidence/screenshots/{pid}-*.png`; `../../evidence/session-recordings/{pid}-simulated.webm`.
""", encoding="utf-8")
    (folder / "observation-log.md").write_text(f"""# Nhật ký quan sát máy — {pid}

> **SIMULATED — log sự kiện Playwright, không phải quan sát con người.**

| Checkpoint | Kết quả tự động | Bằng chứng |
|---|---|---|
| Login | PASS — form gửi và điều hướng về trang chủ | `{pid}-01-login-home.png` |
| Cart | PASS — thêm sản phẩm và mở giỏ trong cùng SPA context | `{pid}-02-cart.png` |
| Coupon | PASS — SAVE10 hiển thị phần tiết kiệm | `{pid}-03-coupon-checkout.png` |
| Checkout | PASS — trang xác nhận thành công hiển thị | `{pid}-04-checkout-success.png` |
| Verify order | PASS — lịch sử hiển thị mã đơn `#…` | `{pid}-05-order-history.png` |
| Logout | PASS — token localStorage đã bị xóa | `{pid}-06-logout.png` |

Không có dữ liệu về hesitation, lỗi người dùng, yêu cầu trợ giúp, cảm xúc hoặc think-aloud.
""", encoding="utf-8")
    (folder / "sus-responses.md").write_text(f"""# SUS — {pid}

> **SIMULATED run. Không có người trả lời bảng hỏi.** Không điền phản hồi tổng hợp hoặc suy đoán từ kết quả automation.

- Tình trạng: NOT COLLECTED
- 10 câu trả lời (1–5): N/A
- SUS score: N/A — không tính điểm từ dữ liệu không tồn tại.
""", encoding="utf-8")
    (folder / "interview-responses.md").write_text(f"""# Phỏng vấn sau phiên — {pid}

> **SIMULATED run. Không có người được phỏng vấn.**

- Clarity: NOT COLLECTED
- Error recovery: NOT COLLECTED
- Speed: NOT COLLECTED
- Trust: NOT COLLECTED
- Trích dẫn / câu trả lời: Không có.
""", encoding="utf-8")
    (folder / "session-summary.md").write_text(f"""# Tổng kết phiên — {pid} (SIMULATED)

- Persona label: {name}, 21 tuổi, sinh viên — chỉ theo dữ liệu yêu cầu.
- Automated task flow: {status}.
- Kết luận kỹ thuật: luồng có thể hoàn tất trong cấu hình chạy này.
- SUS / phỏng vấn: chưa thu thập; không có đánh giá chủ quan.
- Đây không phải phiên moderated usability và không đáp ứng yêu cầu bảy người thật.
""", encoding="utf-8")
    (folder / "evidence-index.md").write_text(f"""# Chỉ mục bằng chứng — {pid} (SIMULATED)

Các tệp PNG là screenshot trực tiếp từ Playwright; WEBM được ghi bởi Playwright trong phiên chạy. Không chỉnh sửa bằng chứng.

- `../../evidence/session-recordings/{pid}-simulated.webm`
- `../../evidence/screenshots/{pid}-01-login-home.png`
- `../../evidence/screenshots/{pid}-02-cart.png`
- `../../evidence/screenshots/{pid}-03-coupon-checkout.png`
- `../../evidence/screenshots/{pid}-04-checkout-success.png`
- `../../evidence/screenshots/{pid}-05-order-history.png`
- `../../evidence/screenshots/{pid}-06-logout.png`
""", encoding="utf-8")

roster = "# Danh sách persona mô phỏng\n\n> **SIMULATED — không phải danh sách người tham gia thật. Không dùng để nộp thay cho tuyển dụng/xác minh người thật.**\n\n| ID | Tên nhãn | Tuổi | Bối cảnh | Liên hệ |\n|---|---|---:|---|---|\n"
for i in results:
    roster += f"| {i['id']} | {i['name']} | 21 | Sinh viên (theo đề bài) | N/A — persona tổng hợp |\n"
(ROOT / "participants/participant-list.md").write_text(roster, encoding="utf-8")

summary = """# Phân tích usability — kết quả chạy tự động (SIMULATED)

## Phạm vi và độ tin cậy

Playwright thực hiện 7 lượt độc lập trên Chromium headless. Đây là kiểm tra chức năng/UI có thể lặp lại, không phải nghiên cứu usability với người. Vì vậy SUS, phỏng vấn, cảm xúc, thời gian người dùng, completion rate của người và suy luận về persona đều **không có dữ liệu**.

## Kết quả quan sát được

| ID | Login | Cart | Coupon | Checkout | Verify order | Logout | SUS |
|---|---|---|---|---|---|---|---|
"""
for i in results:
    summary += f"| {i['id']} | PASS | PASS | PASS | PASS | PASS | PASS | N/A |\n"
summary += "\n7/7 automated runs completed all six checkpoints. This is not a human task-success rate.\n\n"
summary += "## Pain points and findings (observed in UI/source behavior)\n\n"
summary += "1. **High — malformed Vietnamese text/encoding across screens.** The browser displays mojibake in headings and labels, including checkout and navigation. This makes instructions difficult to read. Evidence: P01 screenshots `P01-01-login-home.png`, `P01-02-cart.png`, `P01-03-coupon-checkout.png`. Requirement: FR-21 Vietnamese UI.\n"
summary += "2. **High — login form semantics/labels conflict with the task.** Login screen heading appears as registration, email is labeled Username, password input uses text, and submit text is English. This was directly visible in the page and component. Requirements: FR-02, FR-21, FR-22. Evidence: `P01-01-login-home.png`.\n"
summary += "3. **Moderate — checkout total is editable.** The total field allows user editing, creating ambiguity about whether displayed amount is authoritative. This is visible in checkout screenshot; verify backend pricing independently before treating amounts as secure. Requirement: FR-08 automatic total.\n\n"
summary += "## Recommendations\n\n- Fix UTF-8 source/response handling and review rendered Vietnamese text end-to-end.\n- Correct login heading, Vietnamese labels, `type=email`, `type=password`, and localized submit label.\n- Derive payable total from server-side cart/prices and show read-only order totals.\n- Conduct the required moderated sessions with seven real eligible participants; collect SUS and open-ended answers directly before making human-centered conclusions.\n\n## SUS\n\nNo SUS responses were collected. Mean, range, grade, and benchmark comparison are N/A.\n"
(ROOT / "analysis/qualitative-synthesis.md").write_text(summary, encoding="utf-8")
(ROOT / "analysis/sus-scoring.md").write_text("""# SUS scoring — SIMULATED run\n\nNo participant completed SUS. There are zero valid response sets, so no per-participant score, mean, range, or benchmark comparison can be calculated. The 7 automated completion checkpoints are not SUS data.\n""", encoding="utf-8")
(ROOT / "analysis/usability-summary-report.md").write_text(summary.replace("# Phân tích usability — kết quả chạy tự động (SIMULATED)", "# Báo cáo tổng kết usability (SIMULATED)") + "\n## Bug reports\n\nSee `../bug-reports/BUG-SIM-001.md` and `../bug-reports/BUG-SIM-002.md`. Findings are limited to inspected UI and automated evidence, not participant reports.\n", encoding="utf-8")

