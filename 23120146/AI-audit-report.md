# AI Audit Report — Phụ lục Kiểm toán Sử dụng AI (HW03)

- **Sinh viên thực hiện:** `Hoàng Ngọc` — **MSSV:** `23120146`
- **Học phần:** Kiểm thử Phần mềm (`HW03-AI` — GUI & Usability Testing)
- **Hệ thống kiểm thử (SUT):** EShop Web Customer (`http://localhost:5173`, Backend API `http://localhost:3000`)

**Khai báo bắt buộc (Mandatory Declaration):**
> I use AI tools for the following tasks, including reviewing the HW03 specification and Agent Skills, structuring Task 2 usability analysis from real participant survey data, executing cross-browser verification via Chrome DevTools and Sauce Labs Live for Task 3, synchronizing bug reports with GitHub Issues, and formatting the final technical reports and AI Critique.

---

## 1. Tổng hợp Công cụ & Phạm vi Sử dụng AI

| Hạng mục | Thông tin chi tiết |
| :--- | :--- |
| **Công cụ AI sử dụng** | Google Antigravity IDE Assistant (Gemini) |
| **Công cụ kiểm thử kết hợp** | Chrome DevTools MCP (`Google Chrome 136` / `Windows 11 Pro`), Sauce Labs Live (`eu-central-1`) + Sauce Connect Proxy v5.5.5 (`Firefox 160` & `Safari 26` / `macOS Tahoe 26`) |
| **Mức độ Bloom-AI áp dụng** | **G9.3 (Analyse)** — Phân tích đối chiếu đặc tả và phản biện điểm mù của AI<br>**G9.4 (Collaborate)** — Cộng tác có kiểm soát với AI trong kiểm thử thăm dò và đa nền tảng |
| **Nguyên tắc kiểm soát** | Mọi kết quả AI tạo ra đều được sinh viên rà soát trên SUT thật, chỉnh sửa thủ công và ghi dấu vết qua lịch sử Git (`HW03/Ngoc`). Dữ liệu khảo sát Task 2 được thu thập từ người tham gia thật ngoài lớp. |

---

## 2. Nhật ký Các Phiên Làm việc Trước Đó (Truy xuất từ Lịch sử Git)

*(Các bước khởi tạo Agent Skills, thiết kế và thực thi Task 1 được thực hiện trong các phiên trước `04:13` ngày `2026-11-16` và được lưu vết đầy đủ bằng các Git commit độc lập dưới đây).*

| Commit SHA | Thời gian (`+07:00`) | Tác vụ đã thực hiện | Sản phẩm đầu ra & Rà soát của sinh viên |
| :---: | :--- | :--- | :--- |
| `e37c040`, `58a7190`, `9680403` | `2026-11-16 01:19` | Xây dựng 3 Agent Skills (`gui-checklist-eshop`, `usability-evaluation-eshop`, `ai-audit-logger`) | Chuẩn hóa quy trình đối chiếu `README.md`, 4 khía cạnh `IA-01`–`IA-04` và ràng buộc chống giả mạo dữ liệu trong `.agents/skills/`. |
| `bd23a01`, `e1de7a4`, `8c68bec` | `2026-11-16 02:29` – `03:09` | Thiết kế & thực thi 52 mục GUI Checklist Task 1 (`/profile`, `/register`, `/forgot-password`) | Sinh 44 mục AI (`GUI-01`–`GUI-44`), sinh viên rà soát bổ sung 8 mục điểm mù (`GUI-45`–`GUI-52`), chụp 40 ảnh lỗi (`screenshots/GUI-*.png`) và xuất Excel `task1-gui-checklist.xlsx`. |

---

## 3. Nhật ký Tương tác Chi tiết (Interaction Log — Phiên `2026-11-16`)

### Tương tác #1 — Phân tích Yêu cầu & Ràng buộc Kỹ thuật cho Task 3 (Cross-Platform Testing)
- **Name of the AI tool:** Google Antigravity (Gemini)
- **Date and time:** `2026-11-16 04:13` – `04:16` (`+07:00`)
- **Prompt (Chuẩn hóa nội dung yêu cầu từ sinh viên):**
  > Tổng hợp ngắn gọn yêu cầu, các ràng buộc chống giả mạo và danh mục tài liệu cần nộp cho Task 3 dựa trên tài liệu đặc tả trong thư mục `docs/`; đề xuất quy trình thực hiện cụ thể trên phạm vi màn hình đã chọn (`/profile`, `/register`, `/forgot-password`).
- **The AI output:**
  > Trích xuất quy định từ `2026.HW03.GUI Usability_En.pdf` và `HW03-yeu-cau-va-cong-viec.md`: cần thực thi lại 52 mục checklist trên tối thiểu 3 nền tảng (`Chrome`, `Firefox`, `Safari` hoặc thiết bị di động qua Expo Go). Ảnh minh chứng bắt buộc hiển thị tên trình duyệt/OS/thiết bị + URL `localhost`, overlay email sinh viên (`§6 Task 3`), và MSSV + Họ tên đầy đủ trong form SUT (`§11 Anti-AI-Cheat`).
- **Human review & refinements:** Sinh viên kiểm tra điều kiện thiết bị thực tế (tránh các nền tảng thu phí hoặc thiết bị iOS không tương thích Expo Go) và chốt phương án kiểm thử chéo hai trình duyệt Firefox và Safari trên hệ điều hành macOS thông qua Sauce Labs Live kết hợp Chrome cục bộ.

---

### Tương tác #2 — Cấu hình Sauce Connect Tunnel & Xử lý Sự cố Định tuyến Proxy Đa Trình duyệt
- **Name of the AI tool:** Google Antigravity (Gemini)
- **Date and time:** `2026-11-16 04:55` – `06:19` (`+07:00`)
- **Prompt (Chuẩn hóa nội dung yêu cầu từ sinh viên):**
  > Hướng dẫn thiết lập đường hầm Sauce Connect Proxy trên PowerShell để đưa ứng dụng cục bộ (`http://localhost:5173`) lên môi trường kiểm thử đám mây Sauce Labs Live và khắc phục lỗi không thể kết nối trên Firefox/Safari.
- **The AI output:**
  > Cung cấp câu lệnh `sauce-connect.exe run` kết nối tới vùng `eu-central`. Khi kiểm thử thực tế phát hiện Firefox 160 chặn chuyển tiếp proxy cho `localhost` (`network.proxy.allow_hijacking_localhost = false`) và Safari 26 tự động nâng cấp HTTP sang HTTPS (`CONNECT`), AI cấu hình bộ phân giải DNS cục bộ (`127.0.0.1:15353`), proxy `/api` trên Vite (`--host 0.0.0.0`) và bộ điều phối HTTP/HTTPS song song với tên miền định tuyến `localhost.lvh.me:5173` mà không chỉnh sửa mã nguồn SUT.
- **Human review & refinements:** Sinh viên tải và giải nén `sauce-connect.exe` v5.5.5, xác thực tài khoản Sauce Labs, kiểm tra trạng thái kết nối tunnel và cấp quyền chạy chứng chỉ cục bộ phục vụ phiên kiểm thử Safari.

---

### Tương tác #3 — Thực thi Kiểm thử Đối chiếu 52 Mục Trên 3 Nền tảng & Thu thập Bằng chứng Task 3
- **Name of the AI tool:** Google Antigravity (Gemini + Browser Subagent)
- **Date and time:** `2026-11-16 05:05` – `06:29` (`+07:00`)
- **Prompt (Chuẩn hóa nội dung yêu cầu từ sinh viên):**
  > Thực hiện kiểm thử đối chiếu 52 mục GUI Checklist trên 3 nền tảng độc lập (Google Chrome trên Windows cục bộ, cùng Mozilla Firefox và Apple Safari thông qua đường hầm Sauce Labs Live đang hoạt động), chụp ảnh minh chứng tuân thủ đầy đủ quy định xác thực và tổng hợp báo cáo so sánh đa nền tảng.
- **The AI output:**
  > Thực thi kiểm tra trên **Chrome 136 (Windows 11 — Blink)**, **Firefox 160 (macOS Tahoe 26 — Gecko)** và **Safari 26 (macOS Tahoe 26 — WebKit)**; lưu 9 ảnh chụp minh chứng tại `23120146/screenshots/task3/` và lập báo cáo [`task3-cross-platform.md`](./task3-cross-platform.md). Kết quả ghi nhận `12 Passed / 40 Failed` đồng nhất trên cả 3 trình duyệt cùng 6 khác biệt kỹ thuật (chính sách proxy loopback, tự nâng cấp HTTPS-First, cơ chế ẩn path trên thanh địa chỉ Safari, điều hướng `Tab`/`Option+Tab`, kích thước ký tự che mật khẩu và cách hiển thị hộp thoại `window.alert()`).
- **Human review & refinements:** Sinh viên rà soát từng ảnh chụp trong `screenshots/task3/` để xác nhận đủ 3 yếu tố bắt buộc (tên trình duyệt/OS + URL `localhost`, banner email `23120146@student.hcmus.edu.vn`, và `23120146 - Hoàng Ngọc` trong ô nhập của SUT), đồng thời kiểm soát đóng phiên Sauce Labs ngay sau khi hoàn thành để tiết kiệm thời lượng dùng thử.

---

### Tương tác #4 — Đồng bộ Bằng chứng Đa Nền tảng Lên 31 GitHub Issues (`#191`–`#221`)
- **Name of the AI tool:** Google Antigravity (Gemini)
- **Date and time:** `2026-11-16 06:34` – `08:08` (`+07:00`)
- **Prompt (Chuẩn hóa nội dung yêu cầu từ sinh viên):**
  > Cập nhật toàn bộ 31 GitHub Issues của Task 1 (`#191`–`#221`) với kết quả kiểm thử đa nền tảng và ảnh chụp minh chứng từ 3 trình duyệt, đồng thời chụp lại ảnh toàn trang của các Issue đã cập nhật đưa vào kho lưu trữ và cập nhật [`task1-bug-report.md`](./task1-bug-report.md).
- **The AI output:**
  > Đẩy bộ ảnh Task 3 lên GitHub (commit `b88bc8d`), cập nhật nội dung 31 Issues (`#191`–`#221`) qua GitHub REST API kèm bảng ma trận 3 nền tảng và 3 ảnh minh chứng, chụp lại 31 ảnh toàn trang các Issue vào `23120146/screenshots/github-issues/issue-191.png`–`issue-221.png` (commit `5bd8399`).
- **Human review & refinements:** Sau khi kiểm tra ảnh `issue-191.png` và `issue-212.png`, phát hiện 8 Issue có nhiều ảnh bị cắt ở chiều cao giới hạn `4200px`; tiến hành chụp lại toàn chiều cao (`captureBeyondViewport: true`) để đảm bảo hiển thị trọn vẹn phần bằng chứng cuối trang.

---

### Tương tác #5 — Tiếp nhận Dữ liệu Khảo sát Thực tế Task 2, Phân tích Định lượng/Định tính & Đóng gói Báo cáo
- **Name of the AI tool:** Google Antigravity (Gemini)
- **Date and time:** `2026-11-16 08:44` – `09:05` (`+07:00`)
- **Prompt (Chuẩn hóa nội dung yêu cầu từ sinh viên):**
  > Dựa trên dữ liệu phiếu khảo sát thực tế từ 7 người tham gia (`P1`–`P7`) đã ghi nhận trong [`task2-participant-results.md`](./task2-participant-results.md), thực hiện phân tích Phase 2 & 3 cho Task 2 (tính điểm SUS, tổng hợp nhận xét mở theo 4 trụ cột, phân tách Isolated Bugs và Systemic Design Issues, lập bảng mức độ nghiêm trọng, tạo GitHub Issues kèm ảnh minh chứng), sau đó tổng hợp các tài liệu báo cáo nộp bài chuẩn học thuật (Main Report, AI Audit Report, AI Critique, README và bản xuất PDF).
- **The AI output:**
  > Tính toán thống kê SUS (`Mean = 85.00 / 100`, `Median = 82.50`, `Min = 80.00`, `Max = 92.50`, `SD = 5.00`), tổng hợp 4 nhóm vấn đề hệ thống (`USAB-SYS-01`–`04`) xuất hiện ở `7/7` người tham gia trong [`task2-usability-report.md`](./task2-usability-report.md); chụp 4 ảnh minh chứng tại `screenshots/task2/` và tạo 3 GitHub Issues Task 2 ([`#222`](https://github.com/Taylor3691/eshop-sut/issues/222), [`#223`](https://github.com/Taylor3691/eshop-sut/issues/223), [`#224`](https://github.com/Taylor3691/eshop-sut/issues/224)). Tiếp theo, tổng hợp [`main-report.md`](./main-report.md), [`AI-audit-report.md`](./AI-audit-report.md), [`AI-critique.md`](./AI-critique.md) (`265` từ), [`README.md`](./README.md) và xuất đầy đủ các bản `.pdf`.
- **Human review & refinements:** Sinh viên kiểm tra định dạng học thuật của các báo cáo (chuẩn hóa ngôn ngữ văn bản kỹ thuật trong `AI-audit-report.md`), tự bổ sung thông tin liên hệ xác minh đã che 4 số giữa của `P1`–`P7` (và phiên Pilot) vào Bảng 1.1 của [`task2-usability-report.md`](./task2-usability-report.md) và đính kèm liên kết video demo Agent Skill trên YouTube trước khi đóng gói nộp Moodle.
