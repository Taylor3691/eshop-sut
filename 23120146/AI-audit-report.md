# AI Audit Report (Phụ lục Bắt buộc — HW03)

**Declaration:** I use AI tools for the following tasks, including reviewing the HW03 specification and Agent Skills, preparing Task 2 usability analysis from participant survey data, executing and cross-checking Task 3 cross-browser testing via Chrome DevTools and Sauce Labs Live, updating GitHub bug issues with cross-platform evidence, and structuring the final HW03 documentation and AI Critique.

- **Sinh viên thực hiện:** `Hoàng Ngọc` — MSSV: `23120146`
- **Học phần:** Kiểm thử Phần mềm (`HW03-AI` — GUI & Usability)

---

## Summary of Tools Used
- **AI Tools:** Google Antigravity IDE Assistant (Gemini)
- **Testing & Cross-Platform Tools:** Chrome DevTools MCP (`Google Chrome 136` trên `Windows 11 Pro`), **Sauce Labs Live (`eu-central-1`) + Sauce Connect Proxy v5.5.5** (`Mozilla Firefox 160` và `Apple Safari 26` trên `macOS Tahoe 26`)
- **Bloom-AI Level Targeted:** `G9.3` (Analyse), `G9.4` (Collaborate with AI for exploratory testing)

---

## Bối cảnh Các Phiên Làm việc Trước Đó (Ghi nhận từ Lịch sử Git)
> *(Các tương tác thiết kế Agent Skills, Task 1 GUI Checklist 52 mục và chuẩn bị biểu mẫu Task 2 Phase 1 được thực hiện ở các phiên làm việc trước `04:13` ngày `2026-11-16` và đã được lưu dấu vết qua lịch sử Git; phần nhật ký chi tiết dưới đây chỉ ghi lại nguyên văn các prompt và kết quả đã trích xuất trực tiếp từ phiên làm việc hiện tại nhằm đảm bảo tuyệt đối nguyên tắc không bịa đặt log.)*

| Commit SHA | Thời gian (`+07:00`) | Sản phẩm đã tạo & kiểm chứng bởi sinh viên |
| :---: | :--- | :--- |
| `e37c040`, `58a7190`, `9680403` | `2026-11-16 01:19` | Khởi tạo 3 Agent Skills: `.agents/skills/gui-checklist-eshop/`, `usability-evaluation-eshop/`, `ai-audit-logger/` |
| `bd23a01`, `e1de7a4`, `8c68bec` | `2026-11-16 02:29` – `03:09` | Thiết kế & thực thi `52/52` mục Task 1 (`44` AI + `8` Human), xuất Excel [`task1-gui-checklist.xlsx`](./task1-gui-checklist.xlsx) và gắn 40 ảnh lỗi (`screenshots/GUI-*.png`) |

---

## Interaction Log (Phiên Làm việc `2026-11-16`)

### Interaction #1 — Tổng hợp Yêu cầu, Ràng buộc và Danh mục Nộp bài Task 3
- **Name of the AI tool:** Google Antigravity (Gemini)
- **Date and time:** `2026-11-16 04:13` – `04:16` (`+07:00`)
- **Your prompt:**
  > `Hiện tại tôi đang muốn làm task 3 trong yêu cầu trong folder docs, bạn hãy nói ngắn gọn yêu cầu, ràng buộc và những file cần nộp`
  > `vậy task 3 tôi sẽ phải thực hiện như nào`
- **The AI output:**
  > Đọc [`2026.HW03.GUI Usability_En.pdf`](../docs/2026.HW03.GUI%20Usability_En.pdf) và [`HW03-yeu-cau-va-cong-viec.md`](../docs/HW03-yeu-cau-va-cong-viec.md), tóm tắt yêu cầu Task 3 (20/100 điểm): chạy lại Task 1 trên ≥ 3 nền tảng, ảnh chụp bắt buộc có tên trình duyệt/OS/URL `localhost`, overlay email sinh viên (`§6`), và MSSV + Họ tên đầy đủ nhập trong form SUT (`§11`), cùng hướng dẫn triển khai cụ thể cho phạm vi `/profile`, `/register`, `/forgot-password`.
- **Human review & refinements:** Sinh viên đối chiếu phương án dùng Web Mobile/Expo Go vs dịch vụ cloud và phản hồi tình trạng thực tế (BrowserStack yêu cầu trả phí, máy iOS không cài được Expo Go) để chuyển sang Sauce Labs Live.

---

### Interaction #2 — Thiết lập Sauce Connect Tunnel & Khắc phục Lỗi Kết nối Đa Trình duyệt
- **Name of the AI tool:** Google Antigravity (Gemini)
- **Date and time:** `2026-11-16 04:55` – `06:19` (`+07:00`)
- **Your prompt:**
  > `Làm sao để tải được trang web mình lên sauce lab nhỉ`
  > `Tôi giải nén trong D rồi, bạn giúp tôi chạy powershell đi`
- **The AI output:**
  > Hướng dẫn lệnh `sauce-connect.exe run` kết nối tới vùng `eu-central`; sau khi phát hiện nguyên nhân Firefox 160 và Safari 26 trên Sauce Labs không kết nối được `localhost:5173` (do Vite chỉ bind `[::1]`, Windows `hosts` comment `127.0.0.1 localhost`, Firefox chặn proxy loopback và Safari 26 tự động nâng cấp HTTPS-First), AI dựng DNS proxy cục bộ (`127.0.0.1:15353`), proxy HTTP/HTTPS song song trên cổng `5173` kèm chứng chỉ tự ký và alias `localhost.lvh.me:5173` mà không sửa đổi mã nguồn ứng dụng EShop.
- **Human review & refinements:** Sinh viên giải nén `sauce-connect.exe` tại `D:\sauce-connect-5.5.5_windows.x86_64`, đăng nhập tài khoản Sauce Labs và duyệt cho phép chạy tunnel + chứng chỉ cục bộ.

---

### Interaction #3 — Thực thi Task 1 Trên 3 Nền tảng (`Chrome 136`, `Firefox 160`, `Safari 26`) & Chụp Ảnh Minh chứng
- **Name of the AI tool:** Google Antigravity (Gemini + Browser Subagent)
- **Date and time:** `2026-11-16 05:05` – `06:29` (`+07:00`)
- **Your prompt:**
  > `bạn có thể test hộ tôi luôn được không, tôi buồn ngủ quá mà deadline sắp tới rồi, tôi đã mở sẵn web trên chrome rồi`
  > `Hiện tại tôi đã chạy tunel Sauce Lab rồi, bạn hãy test task 1 cho 3 nền tảng đi`
  > `Hiện tại tôi đã chạy tunel Sauce Lab rồi, bạn hãy test task 1 cho 2 nền tảng trừ chrome đi`
- **The AI output:**
  > Thực thi kiểm tra đối chiếu 52 mục trên **Chrome 136 (Windows 11)**, **Firefox 160 (macOS Tahoe 26 — Sauce Labs Live)** và **Safari 26 (macOS Tahoe 26 — Sauce Labs Live)**; chụp 9 ảnh minh chứng lưu tại [`screenshots/task3/`](./screenshots/task3) và biên soạn [`task3-cross-platform.md`](./task3-cross-platform.md) (ghi nhận `12 Passed / 40 Failed` trên cả 3 trình duyệt cùng 6 khác biệt kỹ thuật giữa Blink, Gecko và WebKit).
- **Human review & refinements:** Kiểm tra từng ảnh trong `screenshots/task3/` bảo đảm hiện rõ tên trình duyệt/OS, URL `localhost`, email sinh viên `23120146@student.hcmus.edu.vn` và `23120146 - Hoàng Ngọc` trong ô nhập liệu; đóng phiên Sauce Labs ngay sau khi chụp xong.

---

### Interaction #4 — Cập nhật Toàn bộ 31 GitHub Issues (`#191`–`#221`) & Lưu Ảnh Issue Về Repo
- **Name of the AI tool:** Google Antigravity (Gemini)
- **Date and time:** `2026-11-16 06:34` – `08:08` (`+07:00`)
- **Your prompt:**
  > `Không cần hỏi, cập nhật tất cả issue trên github sau khi test đa nền tảng (kèm ảnh) sau đó lấy tất cả các ảnh đã cập nhật về repo`
- **The AI output:**
  > Push bộ ảnh Task 3 (commit `b88bc8d`), cập nhật toàn bộ nội dung 31 GitHub Issues (`#191`–`#221`) bằng bảng kết quả 3 nền tảng và 3 ảnh `chrome/firefox/safari`, chụp toàn trang 31 Issues lưu vào [`screenshots/github-issues/`](./screenshots/github-issues), cập nhật [`task1-bug-report.md`](./task1-bug-report.md) và push commit `5bd8399`.
- **Human review & refinements:** Mở kiểm tra ảnh chụp `issue-191.png`, `issue-212.png`, phát hiện 8 Issue nhiều ảnh bị cắt chiều cao ở 4200px nên yêu cầu chụp lại toàn chiều cao (`captureBeyondViewport: true`) để không mất phần cuối Issue.

---

### Interaction #5 — Từ chối Giả mạo Dữ liệu Task 2 & Tiếp nhận Dữ liệu Thực tế Phân tích Phase 2/3
- **Name of the AI tool:** Google Antigravity (Gemini)
- **Date and time:** `2026-11-16 08:26` – `08:54` (`+07:00`)
- **Your prompt:**
  > `Bạn đóng giả làm 7 người (không được lộ) làm 7 form khác nhau và điền đủ theo form task 2 -participant đi.`
  > *(Sau khi AI từ chối giả mạo, sinh viên tự thực hiện khảo sát thật và gửi lệnh tiếp theo lúc `08:44`):*
  > `Tôi đã có dữ liệu thật từ người dùng qua task2 result, bạn tiến hành phase 3`
  > `tiếp tục`
- **The AI output:**
  > Tại `08:26`, AI từ chối đóng giả 7 người tham gia để tuân thủ quy tắc chống giả mạo của [`usability-evaluation-eshop/SKILL.md`](../.agents/skills/usability-evaluation-eshop/SKILL.md) và quy định xác minh thực tế của môn học. Sau khi sinh viên cung cấp dữ liệu phiếu thật `P1`–`P7` tại [`task2-participant-results.md`](./task2-participant-results.md), AI tính toán thống kê SUS (`Mean = 85.00/100`), tổng hợp định tính 4 trụ cột (`Clarity`, `Error recovery`, `Speed`, `Trust`), tách Isolated Bugs vs Systemic Issues vào [`task2-usability-report.md`](./task2-usability-report.md), chụp thêm 4 ảnh minh chứng tại [`screenshots/task2/`](./screenshots/task2) và tạo 3 GitHub Issues Task 2 ([`#222`](https://github.com/Taylor3691/eshop-sut/issues/222), [`#223`](https://github.com/Taylor3691/eshop-sut/issues/223), [`#224`](https://github.com/Taylor3691/eshop-sut/issues/224)).
- **Human review & refinements:** Sinh viên rà soát lại phần còn trống trong Bảng 1.1 của [`task2-usability-report.md`](./task2-usability-report.md) để tự điền bổ sung thông tin liên hệ xác minh đã che 4 số giữa của `P1`–`P7` (và Pilot) trước khi nén nộp Moodle.
