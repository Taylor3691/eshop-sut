# Kế hoạch Đánh giá Usability (Usability Test Plan)

## 1. Thông tin chung

- **Dự án:** EShop — Nền tảng Thương mại Điện tử Demo dành cho Kiểm thử Phần mềm
- **Bài tập:** HW03 — GUI & Usability Testing (Task 2)
- **Phương pháp:** Kiểm thử Usability có người điều phối (Moderated In-Person / Synchronous Usability Testing)
- **Giao thức quan sát:** Suy nghĩ thành tiếng đồng thời (Concurrent Think-Aloud Protocol)
- **Quy mô mẫu:** 07 người tham gia chính thức (07 phiên độc lập) + 01 người tham gia phiên thử nghiệm (Pilot Session)

---

## 2. Mục tiêu đánh giá (Objectives)

Cuộc đánh giá nhằm mục đích kiểm chứng mức độ dễ dùng, hiệu quả và sự hài lòng của người dùng thực tế trên luồng trải nghiệm mua sắm khép kín (End-to-End Shopping Flow), bao gồm:
1. **Khả năng điều hướng và nhận diện thông tin:** Người dùng có dễ dàng đăng nhập, định hướng từ giỏ hàng sang bước thanh toán mà không bị gián đoạn hay không?
2. **Trải nghiệm thao tác giỏ hàng & tính toán chi phí (FR-07, FR-08):** Đánh giá tính trực quan khi điều chỉnh số lượng, phản hồi của dialog xác nhận xóa sản phẩm, và sự minh bạch của nhãn "Tổng cộng".
3. **Hiệu quả áp dụng khuyến mãi (FR-09):** Khảo sát mức độ hiểu biết và phản hồi của người dùng khi nhập mã giảm giá (hợp lệ, hết hạn, chưa đủ giá trị tối thiểu), cũng như tính rõ ràng của thông báo lỗi.
4. **Mức độ minh bạch trạng thái đơn hàng (FR-10, FR-11):** Đánh giá khả năng kiểm tra đơn hàng, tính rõ ràng của màu sắc/nhãn trạng thái tiếng Việt trong mục Lịch sử đơn hàng.
5. **Mức độ tin cậy và sự hài lòng tổng thể:** Đo lường chỉ số chuẩn hóa System Usability Scale (SUS) và đánh giá các khía cạnh định tính (Clarity, Error Recovery, Speed, Trust).

---

## 3. Phạm vi đánh giá (Scope & Functional Traceability)

### 3.1. Luồng kiểm thử End-to-End được chọn
```text
Đăng nhập (Login) 
   ──► Giỏ hàng (Shopping Cart) 
   ──► Áp dụng mã giảm giá (Apply Coupon) 
   ──► Thanh toán (Checkout) 
   ──► Xác minh đơn hàng (Verify Order History) 
   ──► Đăng xuất (Logout)
```

### 3.2. Ma trận yêu cầu chức năng liên quan (Traceability Matrix)

| Mã yêu cầu | Tên yêu cầu | Trọng tâm kiểm thử Usability | Màn hình liên quan |
|---|---|---|---|
| **FR-02** | Đăng nhập & Khóa tài khoản | Độ rõ ràng của thông báo đăng nhập sai, tính tiện dụng của form, ghi nhớ trạng thái sau đăng nhập. | Trang Đăng nhập (`/login`) |
| **FR-07** | Giỏ hàng (Shopping Cart) | Tăng/giảm số lượng, dialog xác nhận khi xóa, nhãn "Tổng cộng", chuyển sang thanh toán. | Trang Giỏ hàng (`/cart`) |
| **FR-08** | Thanh toán (Checkout) | Yêu cầu đăng nhập, tính toán tự động tổng tiền, danh sách tóm tắt sản phẩm trước khi chốt đơn. | Trang Thanh toán (`/checkout`) |
| **FR-09** | Mã giảm giá (Discount Coupon) | Trải nghiệm nhập mã, thông báo lỗi khi không thỏa 5 điều kiện, hiển thị số tiền giảm trừ. | Trang Thanh toán (`/checkout`) |
| **FR-10** | Trạng thái Đơn hàng | Hiển thị trạng thái khởi tạo `pending`, khả năng hiểu trạng thái của người dùng. | Trang Đơn hàng / Admin |
| **FR-11** | Lịch sử Đơn hàng (User) | Danh sách đơn hàng cá nhân, nhãn tiếng Việt chuẩn, phân biệt màu sắc trạng thái. | Trang Lịch sử đơn (`/orders`) |

---

## 4. Hồ sơ Người tham gia (Participant Profile & Demographics)

Theo quy định HW03 Section 6 & 11:
- **Số lượng:** 07 người tham gia chính thức (Sessions 01 đến 07) + 01 người chạy thử nghiệm (Pilot Session).
- **Tiêu chí đối tượng:**
  - Người dùng bên ngoài lớp học (nghiêm cấm sinh viên cùng khóa đang học HW03).
  - Ưu tiên người dùng phổ thông (Non-IT, người tiêu dùng thường xuyên mua sắm online trên Shopee, Lazada, Tiki) để đảm bảo tính khách quan và tính xác thực cao nhất.
  - Có khả năng sử dụng máy tính và trình duyệt web cơ bản.
- **Bảo mật & Xác thực danh tính:**
  - Thu thập thông tin liên lạc xác thực (Số điện thoại / Zalo).
  - **Che 4 chữ số ở giữa** (ví dụ: `0912***456`) trong toàn bộ báo cáo để tuân thủ quyền riêng tư nhưng vẫn phục vụ giảng viên/TA gọi ngẫu nhiên kiểm tra xác thực.

---

## 5. Phương pháp & Môi trường Kiểm thử

### 5.1. Môi trường kiểm thử
- **URL Frontend Storefront:** `http://localhost:5173` (React 19 + Vite 8 + Tailwind CSS).
- **URL Backend API:** `http://localhost:3000` (Node.js + Express + SQLite).
- **Thiết bị:** Laptop/PC người điều phối hoặc máy trạm thử nghiệm.
- **Trình duyệt chuẩn:** Google Chrome (phiên bản mới nhất).
- **Công cụ ghi hình & âm thanh:** OBS Studio / Loom / Phần mềm quay màn hình hệ thống kèm thu âm micro (được sự đồng thuận bằng văn bản của người tham gia).

### 5.2. Nguyên tắc của người điều phối (Moderator Guidelines)
- **Tạo tâm lý thoải mái:** Nhắc nhở người tham gia rằng "Chúng tôi đang kiểm tra giao diện ứng dụng, hoàn toàn không kiểm tra năng lực của bạn".
- **Giao thức Think-Aloud:** Động viên người tham gia liên tục nói ra suy nghĩ, kỳ vọng, thắc mắc hoặc cảm giác bối rối khi bấm từng nút.
- **Giữ tính trung lập tuyệt đối:** Không gợi ý, không giải thích thay giao diện, không hướng dẫn người tham gia phải bấm vào đâu.
- **Can thiệp tối thiểu:** Chỉ can thiệp khi người tham gia hoàn toàn bế tắc hoặc gặp sự cố kỹ thuật hạ tầng (treo máy, rớt mạng).

---

## 6. Chỉ số Đo lường (Metrics)

### 6.1. Chỉ số định lượng (Quantitative Metrics)
- **Tỷ lệ hoàn thành nhiệm vụ (Task Completion Rate):**
  - Thành công độc lập (Success without assistance).
  - Thành công có trở ngại/hỗ trợ nhẹ (Success with struggle).
  - Thất bại / Bỏ cuộc (Task Failure / Abandonment).
- **Thời gian hoàn thành (Time on Task):** Đo bằng phút:giây từ lúc bắt đầu đọc kịch bản đến khi hoàn tất đăng xuất.
- **Điểm System Usability Scale (SUS):** 10 câu hỏi chuẩn theo thang đo 5 mức Likert (1: Hoàn toàn không đồng ý đến 5: Hoàn toàn đồng ý), quy đổi ra thang điểm 0–100.
- **Tần suất lỗi / Khó khăn (Error & Friction Frequency):** Số lần thao tác sai hoặc ngập ngừng do giao diện thiếu rõ ràng.

### 6.2. Chỉ số định tính (Qualitative Metrics)
- **Friction Points (Điểm nghẽn trải nghiệm):** Các vị trí người dùng khựng lại, bấm nhầm hoặc bày tỏ sự ngạc nhiên.
- **Verbatim Quotes (Phát biểu nguyên văn):** Những câu nói trực tiếp thể hiện cảm xúc, sự thất vọng hoặc khen ngợi của người dùng.
- **Bộ câu hỏi phỏng vấn sâu (Probe Questions):**
  - *Clarity (Độ rõ ràng):* Mức độ dễ hiểu của giá cả, mã giảm giá, nhãn trạng thái.
  - *Error Recovery (Khả năng khắc phục lỗi):* Mức độ dễ dàng nhận ra và sửa lỗi (nhập sai coupon, chỉnh giỏ hàng).
  - *Speed (Tốc độ & Tính mượt mà):* Cảm nhận về thời gian phản hồi và số bước thực hiện.
  - *Trust (Độ tin cậy):* Cảm giác an tâm khi thanh toán, tính minh bạch về bảo mật tài khoản.

---

## 7. Kế hoạch triển khai chi tiết

| Giai đoạn | Nhiệm vụ cụ thể | Đầu ra dự kiến |
|---|---|---|
| **Phase 1: Lập kế hoạch & Công cụ** | Soạn thảo Test Plan, Task Scenarios, mẫu SUS, câu hỏi phỏng vấn, form cam kết; tuyển chọn người tham gia; chạy Pilot Session. | `test-plan.md`, `task-scenarios.md`, các instruments, `pilot-session-notes.md`. |
| **Phase 2: Tiến hành kiểm thử** | Điều phối 07 phiên kiểm thử thực tế độc lập; ghi hình màn hình, ghi chú chi tiết friction points và trích dẫn phát biểu; cho người dùng điền phiếu SUS và trả lời phỏng vấn. | Video recording, `session-notes-*.md`, bảng điểm SUS từng phiên. |
| **Phase 3: Phân tích & Báo cáo** | Tính điểm SUS chuẩn, phân tích biểu đồ; tổng hợp định tính theo chủ đề; xác định các lỗi Usability; lập Bug Reports và tạo GitHub Issues. | `sus-scoring.md`, `qualitative-synthesis.md`, `usability-summary-report.md`, bug reports. |

