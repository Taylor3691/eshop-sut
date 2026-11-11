# Kế hoạch Đánh giá Usability

## 1. Mục tiêu Usability (Usability Objectives)

| Mục tiêu | Mô tả chi tiết | Định lượng (KPI) |
|---|---|---|
| **1. Điều hướng và Hoàn thành Nhiệm vụ** | Đánh giá khả năng người dùng di chuyển qua toàn bộ luồng **Login → Cart → Apply Coupon → Checkout → Verify Order → Logout** mà không gặp trở ngại nghiêm trọng. | % hoàn thành nhiệm vụ độc lập; thời gian trung bình (phút:giây). |
| **2. Độ rõ ràng & Hiểu được Giao diện** | Kiểm tra mức độ người dùng hiểu các nhãn, biểu mẫu, thông báo và cách áp dụng mã giảm giá. | Điểm SUS (câu 1, 3, 5, 7, 9) ≥ 4; phản hồi mở về “clarity”. |
| **3. Hiệu quả & Tính tiện lợi** | Đánh giá tốc độ thực hiện các thao tác và cảm nhận về số bước, phản hồi hệ thống. | Thời gian trung bình < 5 phút cho toàn bộ luồng; số lần “hesitation” ≤ 3 cho mỗi bước. |
| **4. Ngăn ngừa và Khôi phục lỗi** | Đánh giá khả năng hệ thống thông báo lỗi rõ ràng và người dùng tự khắc phục khi nhập coupon sai hoặc thao tác giỏ hàng. | Số lỗi được người dùng tự sửa ≥ 80 %; số lần yêu cầu hỗ trợ ≤ 1 mỗi phiên. |
| **5. Phản hồi & Trạng thái Hệ thống** | Kiểm tra việc hiển thị phản hồi (toast, badge, trạng thái đơn) có đủ thông tin và kịp thời. | Đánh giá “feedback” trong SUS (câu 2, 4, 6, 8) ≥ 4; ít nhất 1 phản hồi rõ ràng cho mỗi bước quan trọng. |
| **6. Niềm tin & Sự an tâm** | Đánh giá cảm giác người dùng tin tưởng vào quá trình thanh toán và bảo mật tài khoản. | Điểm SUS (câu 9, 10) ≥ 4; bình luận mở “trust”. |

## 2. Đối tượng Người tham gia (Target Participants)

- **Số lượng:** 07 người tham gia thực tế + 01 phiên Pilot (đã thực hiện trong Prompt 02).
- **Tiêu chí:**
  - Không phải sinh viên đang học HW03 (không thuộc lớp).
  - Không có nền tảng IT hoặc kinh nghiệm kiểm thử phần mềm.
  - Có thói quen mua sắm online (có tài khoản trên các trang thương mại điện tử).
  - Độ tuổi 20‑45, đa dạng giới tính.
- **Xác thực:** Thu thập số điện thoại hoặc Zalo với **4 chữ số giữa được ẩn** (ví dụ `0912***456`).
- **Tuyển dụng:** Thông qua mối quan hệ cá nhân, mạng xã hội hoặc nhóm cộng đồng mua sắm, ghi lại trong `participants/participant-roster-template.md`.

## 3. Đánh giá Thước đo (Evaluation Metrics)

| Thước đo | Cách đo | Mục đích |
|---|---|---|
| **Trạng thái Hoàn thành Nhiệm vụ** | `Success (Independent)`, `Success (With Struggle)`, `Failure/Abandonment` | Đánh giá khả năng thực hiện luồng.
| **Thời gian Hoàn thành** | Thời gian từ khi nhận nhiệm vụ tới khi đăng xuất thành công (phút:giây) | Hiệu suất.
| **Số lỗi** | Đếm lỗi UI/UX (như không hiển thị thông báo, nhầm nút) | Đánh giá chất lượng giao diện.
| **Số lần Yêu cầu Hỗ trợ** | Khi moderator phải can thiệp để giải quyết impasse | Đánh giá mức độ tự lực.
| **Hesitation & Khó khăn Điều hướng** | Ghi lại các lần dừng lâu, di chuyển ngược lại, di chuột/đưa con trỏ mà không thực hiện hành động | Đánh giá độ rõ ràng.
| **Frustration Observable** | Biểu hiện khuôn mặt, ngôn ngữ cơ thể, lời thốt “bối rối”, “khó chịu” | Đánh giá mức độ khó chịu.
| **Confidence (Self‑reported)** | Thang điểm 1‑5 trong câu hỏi hậu‑test “Tôi cảm thấy tự tin khi sử dụng …” | Đánh giá niềm tin.

## 4. Quy trình Phiên (Session Procedure)

1. **Giới thiệu & Cam kết** – Giải thích mục đích nghiên cứu, khẳng định không đánh giá người dùng, thu thập đồng ý ghi hình (informed consent).
2. **Hướng dẫn Think‑Aloud** – Yêu cầu người tham gia nói to mọi suy nghĩ, câu hỏi, dự đoán khi thực hiện.
3. **Thực thi Nhiệm vụ** – Đọc kịch bản (task‑scenario.md) cho người dùng, họ tự thực hiện luồng từ **Login → Cart → Apply Coupon → Checkout → Verify Order → Logout**.
4. **Ghi nhận** – Moderator ghi lại thời gian, các điểm nghẽn, lỗi, yêu cầu trợ giúp, cùng verbatim.
5. **Bảng câu hỏi SUS** – Ngay sau khi hoàn thành, người dùng điền phiếu SUS (`instruments/sus-questionnaire-template.md`).
6. **Phỏng vấn sâu** – Đặt các câu hỏi mở (định tính) dựa trên `instruments/post-test-probe-questions.md` (clarity, error recovery, speed, trust).
7. **Kết thúc** – Cảm ơn, nhắc nhở về quyền rút khỏi nghiên cứu, thu thập lại file questionnaire và ghi chú.

## 5. Phương pháp Quan sát (Observation Method)

- **Ghi chú thời gian**: Bắt đầu khi người dùng đọc kịch bản, dừng khi đăng xuất thành công hoặc bỏ cuộc.
- **Hành động**: Ghi lại mỗi click, nhập dữ liệu, mở màn hình, thay đổi số lượng.
- **Hesitation**: Đánh dấu thời gian dừng > 2 giây hoặc di chuyển con trỏ mà không thực hiện hành động.
- **Lỗi**: Ghi nhận lỗi hệ thống (message không xuất hiện, sai tính tiền) và lỗi người dùng (nhập sai coupon).
- **Hành vi không mong đợi**: Nhập dữ liệu ở trường không liên quan, sử dụng shortcut…
- **Bình luận**: Ghi nguyên văn lời người dùng (verbatim) và nhận xét cá nhân của moderator.
- **Khôi phục**: Đánh dấu cách người dùng tự khắc phục lỗi hoặc cần hướng dẫn.

## 6. Phạm vi Đánh giá (Evaluation Scope) – Liên kết Bước ↔ FR ↔ Mục tiêu

| Bước trong luồng | FR tương ứng | Mục tiêu Usability liên quan |
|---|---|---|
| **Login** | FR‑02 | Điều hướng, độ rõ ràng của form, feedback (đăng nhập thành công / lỗi), niềm tin (bảo mật). |
| **Cart** | FR‑07 | Điều hướng tới giỏ, tính năng tăng/giảm số lượng, dialog xác nhận xóa, feedback “Tổng cộng”. |
| **Apply Coupon** | FR‑09 | Độ rõ ràng ô nhập coupon, thông báo lỗi nếu không thỏa điều kiện, feedback giảm giá. |
| **Checkout** | FR‑08 | Tóm tắt đơn, tính tổng tự động, xác nhận thanh toán, feedback thành công, thời gian thực hiện. |
| **Verify Order** | FR‑10 & FR‑11 | Kiểm tra trạng thái đơn, hiển thị tiếng Việt, niềm tin vào quá trình xử lý. |
| **Logout** | FR‑02 (khóa phiên) | Phản hồi đăng xuất, cảm giác an toàn, kết thúc phiên. |

---

*Các tài liệu chi tiết (scenario, requirement‑mapping) được lưu riêng trong `planning/task-scenario.md` và `planning/requirement-mapping.md`.*
