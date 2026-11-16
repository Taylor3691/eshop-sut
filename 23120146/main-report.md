# HW03 Main Report — GUI & Usability Testing (EShop)

- **Sinh viên thực hiện:** `Hoàng Ngọc` — MSSV: `23120146`
- **Nhánh Git:** `HW03/Ngoc` (`Taylor3691/eshop-sut`)
- **System Under Test (SUT):** EShop Web Customer (`http://localhost:5173`, Backend API `http://localhost:3000`, Web Admin hỗ trợ tạo trạng thái đơn `http://localhost:5174`)
- **Đặc tả đối chiếu (Oracle):** [`README.md`](../README.md) (`FR-01`, `FR-03`, `FR-04`, `FR-05`, `FR-10`, `FR-11`, `FR-21`–`FR-24`, `SEC-04`, `SEC-06`, `SEC-07`)

---

## Tóm tắt Điều hành (Executive Summary)

| Hạng mục | Phạm vi & Phương pháp | Kết quả chính | Tài liệu chi tiết |
| :--- | :--- | :--- | :--- |
| **Task 1 — GUI Checklist** | 1 màn hình chính (`/profile`) + 2 màn hình phụ (`/register`, `/forgot-password`) + Shared Header/`index.html` | **52 mục** (`44` AI + `8` Human); Thực thi **52/52**: **12 Passed**, **40 Failed** (`23.1%` Pass); Tổng hợp thành **31 Bugs** (`#191`–`#221`) | [`task1-gui-checklist.md`](./task1-gui-checklist.md)<br>[`task1-gui-checklist.xlsx`](./task1-gui-checklist.xlsx)<br>[`task1-bug-report.md`](./task1-bug-report.md) |
| **Task 2 — Usability Evaluation** | Luồng E2E: `Đăng ký → Đăng nhập → Cập nhật hồ sơ → Đăng xuất` (`7` người dùng `P1`–`P7`, thang đo **SUS** + Phỏng vấn mở 4 trụ cột) | **SUS Mean = 85.00 / 100** (`Min = 80.0`, `Max = 92.5`, Grade A); phát hiện **4 vấn đề hệ thống** (`7/7` phản ánh điểm vào Hồ sơ & tốc độ nhập địa chỉ) + log **3 Issues** (`#222`–`#224`) | [`task2-usability-plan.md`](./task2-usability-plan.md)<br>[`task2-participant-form.md`](./task2-participant-form.md)<br>[`task2-participant-results.md`](./task2-participant-results.md)<br>[`task2-usability-report.md`](./task2-usability-report.md) |
| **Task 3 — Cross-Platform** | Chạy lại 52 mục trên **3 trình duyệt / 3 engine / 2 OS**: Chrome 136 (Win 11), Firefox 160 & Safari 26 (macOS 26 qua Sauce Labs Live) | Cả 3 nền tảng đồng nhất **12 Pass / 40 Fail**; phát hiện **6 khác biệt kỹ thuật** (loopback proxy, HTTPS-First, URL bar Safari, `Option+Tab`, font rendering, `window.alert()`); cập nhật đủ 31 GitHub Issues | [`task3-cross-platform.md`](./task3-cross-platform.md)<br>[`screenshots/task3/`](./screenshots/task3) |
| **Agent Skills** | 3 Agent Skills tái sử dụng cho GUI Checklist, Usability Evaluation & AI Audit | Tích hợp quy trình chuẩn hóa + **Anti-Fabrication** & **Blind-Spot Review** | [`../.agents/skills/`](../.agents/skills) |

---

## Phần 1 — Task 1: Phân tích & Thực thi GUI Checklist (30/100 điểm)

### 1.1. Thiết kế Checklist bao phủ `IA-01` → `IA-04` và Rà soát Điểm mù AI
- Bộ checklist gồm **52 mục** không trùng lặp:
  - **44 mục do AI khởi tạo (`GUI-01` → `GUI-44`):** Phủ đầy đủ 4 khía cạnh **IA-01 (General UI)**, **IA-02 (Forms)**, **IA-03 (Navigation)** và **IA-04 (Feedback / State)** đối chiếu trực tiếp với `FR-01`, `FR-03`, `FR-04`, `FR-10`, `FR-11`, `FR-21`–`FR-24` và `SEC-04`/`06`/`07`.
  - **8 mục do con người bổ sung (`GUI-45` → `GUI-52`, `Origin = Human`):** Bắt nguồn từ 4 nhóm điểm mù khi AI đọc tĩnh mã JSX:
    1. *Accessibility mức DOM & WCAG (`GUI-45`, `GUI-46`):* Thiếu liên kết `htmlFor`/`id`; tương phản `text-gray-400` trên nền trắng (`2.54:1`) và `text-yellow-300` trên `bg-blue-600` (`3.92:1`) không đạt WCAG AA `4.5:1`.
    2. *Tràn bố cục & Modal chặn UI (`GUI-47`, `GUI-49`):* Bảng 5 cột `Lịch sử đơn hàng` thiếu `overflow-x-auto` gây tràn ngang trên mobile (`397px > 375px`); `window.alert()` khóa luồng bàn phím.
    3. *Bản địa hóa & Metadata gốc (`GUI-48`, `GUI-50`, `GUI-51`):* `toLocaleDateString()` không truyền `'vi-VN'` ra ngày `MM/DD/YYYY` trên trình duyệt `en-US`; `index.html` giữ `<html lang="en">` và `<title>frontend-web</title>`; thiếu `autocomplete`/`name`/`id`.
    4. *Đồng bộ phiên đa tab (`GUI-52`):* Đăng xuất ở tab khác không đồng bộ khiến tab `/profile` vẫn gửi JWT cũ cập nhật DB.

### 1.2. Kết quả Thực thi & Tổng hợp 31 Bug Reports
- **Thực thi trên SUT (`http://localhost:5173`):** `52/52` mục đã chạy thực tế (**12 Passed**, **40 Failed**, **0 Pending**), kèm **40 ảnh PNG** chụp đúng các mục `Failed` trong [`screenshots/`](./screenshots) và bảng Excel [`task1-gui-checklist.xlsx`](./task1-gui-checklist.xlsx).
- **Tổng hợp & Log GitHub Issues:** Gom nhóm 40 mục lỗi theo nguyên nhân gốc thành **31 Bugs duy nhất (`23120146-BUG-01` → `23120146-BUG-31`)** — gồm **8 Critical**, **11 Major**, **11 Minor**, **1 Trivial** — đã log đầy đủ lên GitHub Issues ([`#191`](https://github.com/Taylor3691/eshop-sut/issues/191) – [`#221`](https://github.com/Taylor3691/eshop-sut/issues/221)) và báo cáo trong [`task1-bug-report.md`](./task1-bug-report.md).

---

## Phần 2 — Task 2: Đánh giá Khả năng Sử dụng (Usability Evaluation — 40/100 điểm)

### 2.1. Thiết kế Nghiên cứu & Dữ liệu Tham gia (`P1` – `P7`)
- **Kịch bản hướng mục tiêu (*Goal-Oriented Scenario*):** Đánh giá luồng E2E quản lý tài khoản & thông tin nhận hàng trên máy tính dùng chung (*Đăng ký → Đăng nhập → Cập nhật Họ tên, SĐT Việt Nam, Địa chỉ giao hàng → Kiểm chứng đã lưu → Đăng xuất*), hoàn toàn không gợi ý bước bấm hay tên nút.
- **Kết quả định lượng SUS (`n = 7`):**
  - Điểm từng phiên: `P1 = 80.0`, `P2 = 92.5`, `P3 = 82.5`, `P4 = 82.5`, `P5 = 90.0`, `P6 = 80.0`, `P7 = 87.5`.
  - **Trung bình (Mean): `85.00 / 100`** (`Median = 82.5`, `Min = 80.0`, `Max = 92.5`, `SD = 5.00` — xếp hạng **Excellent / Grade A**).

### 2.2. Tổng hợp Định tính & Phân tách Root Cause
Dù điểm SUS tổng thể cao nhờ bố cục ít trường nhập, **100% người tham gia (`7/7`)** phản hồi các điểm vướng lặp lại trên 4 trụ cột (*Clarity, Error recovery, Speed, Trust*), được phân tách rõ trong [`task2-usability-report.md`](./task2-usability-report.md):
- **4 Vấn đề Thiết kế Hệ thống (*Systemic Design Issues*):**
  1. `USAB-SYS-01` (*Clarity — 7/7*): Điểm vào Hồ sơ cá nhân ẩn dưới câu chào `Chào, <Tên>`, cộng với trang `/login` hiển thị nhầm tiêu đề `"Đăng Ký"`, nút `"Sign In"` và ô mật khẩu dạng chữ rõ `type="text"`.
  2. `USAB-SYS-02` (*Speed — 7/7*): Nhập `Địa chỉ giao hàng` vào `<textarea>` thô là bước mất thời gian nhất; tất cả người dùng đề xuất thêm chọn Tỉnh/Huyện/Xã hoặc gợi ý địa chỉ (`autoComplete="street-address"`).
  3. `USAB-SYS-03` (*Error recovery — 7/7*): Thiếu hướng dẫn định dạng SĐT dưới ô nhập, thiếu đánh dấu lỗi inline tại từng ô sai và lạm dụng `window.alert()`.
  4. `USAB-SYS-04` (*Trust — 7/7*): Phải tự tải lại/kiểm chứng dữ liệu sau khi lưu; bấm `"Thoát"` từ `/profile` không tự chuyển về `/login` và thiếu xác nhận đã đăng xuất an toàn trên máy dùng chung.
- **Log GitHub Issues chuyên biệt cho Task 2:** Đã tạo 3 Issues mới kèm ảnh chụp thực tế: [`#222`](https://github.com/Taylor3691/eshop-sut/issues/222), [`#223`](https://github.com/Taylor3691/eshop-sut/issues/223), [`#224`](https://github.com/Taylor3691/eshop-sut/issues/224).

---

## Phần 3 — Task 3: Kiểm thử Đa Trình duyệt / Đa Nền tảng (20/100 điểm)

### 3.1. Ma trận 3 Nền tảng Kiểm thử & Bằng chứng Chuẩn Quy định
Toàn bộ **52 mục checklist Task 1** được kiểm chứng lại trên **3 engine độc lập**:
1. **Google Chrome 136** trên **Windows 11 Pro (`1440×900`)** — Engine **Blink** (Local Desktop): **12 Passed / 40 Failed**.
2. **Mozilla Firefox 160** trên **macOS Tahoe 26 (`1440×900`)** — Engine **Gecko** (Sauce Labs Live `eu-central-1`, Tunnel `oauth-hoangngoc3691-78411_tunnel_name`): **12 Passed / 40 Failed**.
3. **Apple Safari 26** trên **macOS Tahoe 26 (`1440×900`)** — Engine **WebKit** (Sauce Labs Live `eu-central-1`, Tunnel `oauth-hoangngoc3691-78411_tunnel_name`): **12 Passed / 40 Failed**.

Tất cả **9 ảnh minh chứng** tại [`screenshots/task3/`](./screenshots/task3) đều hiển thị đầy đủ: tên trình duyệt + OS + URL `localhost`, banner overlay email sinh viên (`23120146@student.hcmus.edu.vn`), và MSSV + Họ tên (`23120146 - Hoàng Ngọc`) nhập trực tiếp trong form SUT.

### 3.2. Khác biệt Kỹ thuật Đa Nền tảng Phát hiện
1. **Bảo mật Loopback & HTTPS-First:** Firefox 160 chặn proxy `localhost` thuần (`network.proxy.allow_hijacking_localhost = false`), còn Safari 26 tự động nâng cấp `http://` sang `https://` (`CONNECT`), đòi hỏi cấu hình tên miền định tuyến + TLS proxy khi kiểm thử trên cloud.
2. **Thanh địa chỉ tối giản trên Safari 26:** Ẩn hoàn toàn cổng và đường dẫn con (`/profile`, `/register`, `/forgot-password`), làm nặng hơn tác động của lỗi thiếu Breadcrumb (`#199`) và thiếu Highlight Navbar (`#193`).
3. **Điều hướng phím `Tab` trên Safari macOS:** Mặc định chỉ `Tab` qua ô nhập văn bản mà bỏ qua nút/link nếu không dùng `Option + Tab`.
4. **Dựng font & Ký tự mật khẩu:** WebKit (Safari 26) vẽ dấu chấm che mật khẩu (`•`) to và sát hơn Blink/Gecko; CoreText trên macOS 26 làm chữ đậm dày hơn ClearType trên Windows 11 nhưng lỗi tương phản `GUI-46` vẫn tồn tại trên cả 3.
5. **Định dạng ngày `toLocaleDateString()` (`#209`) & `window.alert()` (`#206`):** Cả 3 trình duyệt ở locale `en-US` hiển thị `11/15/2026` (`MM/DD/YYYY`) và bật modal `alert()` khác nhau theo từng hệ điều hành.
- **Đồng bộ GitHub Issues:** Toàn bộ **31 GitHub Issues (`#191`–`#221`)** đã được cập nhật bảng kết quả 3 nền tảng + 3 ảnh minh chứng đa trình duyệt và chụp lại ảnh trạng thái mới nhất vào [`screenshots/github-issues/`](./screenshots/github-issues).
