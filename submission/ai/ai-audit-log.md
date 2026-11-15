# AI Audit Report — HW03

**I use AI tools for the following tasks.**

---

## #01 — Setup môi trường

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** 2026-11-12 22:00
- **Prompt:**
  ```
  Dựa vào yêu cầu trong "2026.HW03.GUI Usability_En.md" và phạm vi của tôi (Web Admin: Task 1 màn hình chính
  Quản lý Sản phẩm, màn phụ Login/Dashboard/Danh mục/Mã giảm giá; Task 2 flow Đăng nhập Admin → Tạo danh mục
  → Thêm sản phẩm → Tạo mã giảm giá → Cập nhật trạng thái đơn → Đăng xuất), hãy setup:
  1. Script chạy/dừng SUT (backend, web, admin) và script tạo đơn hàng pending mẫu.
  2. Thư mục submission/ theo đúng các mục nộp bài ở mục 14 của đề.
  3. Template: checklist Excel (có cột Notes, kết quả Passed/Failed, sheet tổng hợp), bảng SUS tự tính điểm,
     ghi chú phiên P1–P7, danh sách người tham gia, bug report.
  4. File CSV thử cho Import sản phẩm theo FR-16.
  ```
- **AI output:**
  - Tạo `scripts/start-sut.sh`, `scripts/stop-sut.sh` (chạy/dừng backend :3000, web :5173, admin :5174) và `scripts/seed-hw03.sh` (tạo đơn hàng `pending` mẫu).
  - Tạo khung thư mục `submission/` và các template: README, checklist.xlsx, sus-and-metrics.xlsx, ghi chú phiên P1–P7, bug template, khung report.
  - Tạo 8 file CSV thử cho Import sản phẩm (`submission/test-data/csv/`).
  - Lưu ý: backend reset database mỗi lần khởi động; `setup_guide.md` ghi mật khẩu admin `admin123` khác dữ liệu thật `Admin123!`.

---

## #02 — Liệt kê thành phần giao diện 5 màn hình Web Admin

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** 2026-11-12 22:37
- **Prompt:**
  ```
  Bạn là QA tester. Tôi đang kiểm thử GUI trang Web Admin của EShop (http://localhost:5174).
  Phạm vi gồm 5 màn hình: Admin Login, Dashboard, Quản lý Danh mục, Quản lý Sản phẩm (gồm Import CSV), Quản lý Mã giảm giá.

  Tài liệu:
  - Đặc tả: README.md, mục FR-12 → FR-17 và FR-21 → FR-24
  - Các nhóm kiểm thử giao diện IA-01 → IA-04: mục 4 trong "2026.HW03.GUI Usability_En.md"
  - Code giao diện: frontend-admin/src/App.jsx

  Liệt kê các thành phần giao diện của từng màn hình (form, trường nhập, nút, bảng, menu, thông báo)
  và yêu cầu liên quan (ghi mã FR, nhóm IA). Trả về mỗi màn hình một bảng.
  Chỉ dựa vào tài liệu và code tôi cung cấp. Ghi riêng những điểm đặc tả không nói rõ.
  Chưa viết checklist.
  ```
- **AI output:**
  - Lập 6 bảng thành phần giao diện (khung chung sidebar + 5 màn hình) kèm dòng code, mã FR và nhóm IA; liệt kê riêng 15 điểm đặc tả không nói rõ.
  - Ghi nhận từ code: form admin chỉ có placeholder, không nhãn/`*`; ô Email login không `type="email"`; thông báo lỗi dùng `alert()`; nút Xóa không có dialog xác nhận; giá sản phẩm không phân cách hàng nghìn; menu sidebar là `<li>` nên không Tab tới được; Dashboard nhân doanh thu ×2 (dòng 218); sửa 1 sản phẩm đổi tên toàn bộ danh sách trên UI (dòng 110–114); preview CSV tách bằng dấu phẩy, không theo RFC 4180; ô file không giới hạn `.csv`.
  - Không tạo/sửa file nào ngoài log (kết quả trả trong chat).

---

## #03 — Lưu bảng thành phần giao diện

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** 2026-11-12 22:43
- **Prompt:** hãy lưu lại phần kết quả này
- **AI output:**
  - Lưu nguyên kết quả mục #02 (6 bảng thành phần giao diện + 15 điểm đặc tả không rõ) thành file markdown, thêm phần đầu ghi nguồn và chú giải IA.
  - `submission/task1-checklist/ui-inventory.md`

---

## #04 — Ghi giải đáp 15 điểm đặc tả không rõ

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** 2026-11-12 22:51
- **Prompt:**
  ```
  đây là phần giải đáp cho 15 điều mơ hồ

  1. <h1> trong SPA (FR-21): Mỗi tab tính là một trang. Mỗi màn hình, kể cả Login, phải có đúng một <h1> mô tả nội dung của màn đó. Nếu mọi tab dùng chung <h1> "EShop Admin" thì Fail.
  2. Thuật ngữ kỹ thuật (FR-21):
     - Được giữ tiếng Anh: Dashboard, Admin, CSV, Import, URL, ID, Email.
     - Phải dịch: Login → Đăng nhập, Password → Mật khẩu, Delivered → Đã giao, và các thông báo lỗi kỹ thuật.
  3. Màu nút (FR-21, nới lỏng):
     - Bắt buộc: nút nguy hiểm (Xóa, Đăng xuất) có màu đỏ, nút hành động chính không có màu đỏ.
     - Khuyến nghị: nút hành động chính nên màu xanh dương. Nút màu khác (ví dụ "Lưu sản phẩm" màu xanh lá, "Tạo mã" màu cam) vẫn Pass, chỉ ghi chú vào Notes.
  4. Dạng thông báo (FR-22, nới lỏng; BP: Nielsen #9):
     - Bắt buộc: khi có lỗi phải hiện thông báo bằng tiếng Việt, nêu được lý do và người dùng hiểu được. Dùng alert() vẫn chấp nhận. Thông báo kỹ thuật như "Request failed with status code 400" thì Fail.
     - Khuyến nghị: thông báo lỗi nằm ngay trong form, phía trên nút submit.
     - Sau khi thêm, sửa hoặc xóa, chỉ cần người dùng thấy được kết quả (bảng cập nhật ngay) là Pass.
  5. Nhãn và dấu * (FR-22; BP: WCAG 3.3.2): Mỗi trường phải có nhãn hiển thị, trường bắt buộc có * bên cạnh nhãn. Nếu chỉ có placeholder thì Fail.
  6. Dialog xác nhận (BP: Nielsen #5, mở rộng từ FR-24): Mọi thao tác xóa ở admin (danh mục, sản phẩm, coupon) phải có dialog xác nhận. Đăng xuất thì không cần.
  7. Empty state (FR-24, mở rộng): Áp dụng cho các bảng ở admin. Khi bảng rỗng phải hiện thông báo thân thiện, không để bảng trống trơn.
  8. Loading (BP: Nielsen #1):
     - Dashboard và các bảng phải có trạng thái loading khi đang tải dữ liệu.
     - Nút submit phải bị khóa trong lúc đang gửi, để tránh bấm hai lần.
  9. Sidebar và breadcrumb (FR-23): Sidebar được tính là navbar, nên phải highlight mục đang chọn. Breadcrumb không bắt buộc ở admin (N/A).
  10. Đăng nhập admin (FR-02, FR-12; BP):
      - Khóa tài khoản sau 3 lần nhập sai giống FR-02, vì dùng chung API đăng nhập.
      - Thông báo lỗi viết chung chung, không để lộ lý do.
      - Tài khoản không phải admin phải thấy thông báo rõ ràng.
      - Khi hết phiên thì quay về màn Login, kèm thông báo.
  11. Dashboard (FR-13, FR-21):
      - "Tổng số đơn hàng" đếm đơn ở mọi trạng thái.
      - Doanh thu chỉ tính các đơn đã giao (delivered).
      - Tiền hiển thị theo định dạng vi-VN 1.234.567 ₫ (dấu chấm phân cách, ký hiệu ₫ đứng sau) và thống nhất giữa các màn hình.
  12. Danh mục (FR-14; BP):
      - Tên chỉ gồm khoảng trắng được tính là rỗng và bị từ chối. Tên tối đa 255 ký tự, không được trùng.
      - Xóa danh mục đang có sản phẩm phải bị chặn hoặc có cảnh báo.
      - Mọi trường hợp lỗi đều phải có thông báo hiện trên giao diện.
  13. Sản phẩm (FR-15; BP):
      - Mô tả và URL ảnh không bắt buộc.
      - Giá là số nguyên lớn hơn 0, không nhận số lẻ (VND không có đơn vị lẻ).
      - Ở chế độ sửa, form phải thể hiện rõ đang sửa (đổi tiêu đề, có nút Hủy) và tự cuộn lên form.
  14. Import CSV (FR-16; BP):
      - Chỉ cho chọn file .csv, chọn file khác phải báo lỗi. File rỗng cũng phải báo lỗi.
      - Header phải đúng tên cột, không phân biệt hoa thường.
      - Dòng có category_id không tồn tại được tính là dòng lỗi.
      - Bảng xem trước phải khớp với dữ liệu sẽ import, kể cả trường có dấu phẩy nằm trong nháy kép.
      - Báo cáo kết quả phải có số dòng thành công, số dòng lỗi và lý do lỗi của từng dòng.
      - Giới hạn kích thước file không kiểm thử (N/A).
  15. Mã giảm giá (FR-17; BP):
      - Loại phần trăm phải không quá 100.
      - Mã chỉ gồm chữ hoa và số, không có khoảng trắng.
      - Ngày hết hạn phải là ngày trong tương lai. Mã đã hết hạn hiện nhãn "Hết hạn" là chấp nhận được.
      - Giá trị mặc định (0 và 1) được tính là đã nhập, nhưng các trường vẫn phải có nhãn và dấu *.
  ```
- **AI output:**
  - Ghi nguyên văn 15 giải đáp thành mục "Giải đáp các điểm không rõ (dùng làm oracle cho checklist)" ở cuối file; giữ nguyên phần câu hỏi gốc.
  - `submission/task1-checklist/ui-inventory.md`

---

## #05 — Commit bảng thành phần giao diện

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** 2026-11-12 22:58
- **Prompt:** hãy commit lại phần này
- **AI output:**
  - Commit bảng thành phần giao diện kèm giải đáp và audit log lên nhánh `hw03/toanhuynh`; không commit `backend/database.sqlite`.
  - `submission/task1-checklist/ui-inventory.md`, `submission/ai/ai-audit-log.md`

---

## #06 — Viết checklist IA-01 (General UI standards)

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** 2026-11-12 22:59
- **Prompt:**
  ```
  Dựa trên submission/task1-checklist/01-ui-inventory.md,
  viết các mục checklist GUI cho nhóm IA-01: General UI standards.
  Mỗi mục có tiêu chí Pass rõ ràng, ghi FR liên quan (hoặc BP nếu là best practice). Trả về dạng bảng.
  Viết mục dưới dạng tiêu chí cần đạt, không viết thành lỗi.
  ```
- **AI output:**
  - File `01-ui-inventory.md` không tồn tại; dùng `submission/task1-checklist/ui-inventory.md` (cùng nội dung đã commit).
  - Viết 26 mục checklist IA-01 (GUI-01-01 → GUI-01-26), chia 6 nhóm: tiêu đề trang, ngôn ngữ & thuật ngữ, màu sắc, định dạng tiền/ngày, Tab order & focus, bố cục & hiển thị. Mỗi mục có tiêu chí cần đạt, cách kiểm/điều kiện Pass, căn cứ FR hoặc BP (Nielsen, WCAG) và tham chiếu mục inventory.
  - Không tạo/sửa file nào ngoài log (kết quả trả trong chat).

---

## #07 — Viết checklist IA-02 (Forms)

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** 2026-11-12 23:04
- **Prompt:** tiếp tục với IA-02: Forms
- **AI output:**
  - Viết 41 mục checklist IA-02 (GUI-02-01 → GUI-02-41), chia theo form: chung cho mọi form, Login, Danh mục, Sản phẩm (thêm/sửa), Import CSV, Mã giảm giá. Mỗi mục có tiêu chí cần đạt, dữ liệu thử và điều kiện Pass, căn cứ FR/GĐ hoặc BP, tham chiếu inventory.
  - Ghi chú: Step Indicator (FR-22) N/A vì không có form nhiều bước; chống bấm submit hai lần và bảng xem trước CSV để sang IA-04.
  - Không tạo/sửa file nào ngoài log (kết quả trả trong chat).

---

## #08 — Viết checklist IA-03 (Navigation) và IA-04 (Feedback / State)

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** 2026-11-12 23:06
- **Prompt:**
  ```
  tiếp tục phần 
  - IA-03: Navigation
  - IA-04: Feedback / State
  ```
- **AI output:**
  - Viết 15 mục IA-03 (GUI-03-01 → GUI-03-15): highlight sidebar, ngữ nghĩa menu, bố cục sidebar, điều hướng sau đăng nhập/đăng xuất, chặn truy cập khi chưa đăng nhập, URL/F5/Back theo tab, breadcrumb (N/A).
  - Viết 27 mục IA-04 (GUI-04-01 → GUI-04-27): loading và khóa nút submit, kết quả hiện ngay sau thêm/sửa/xóa, dialog xác nhận xóa, empty state, thông báo lỗi hệ thống/không phải admin/hết phiên, xem trước và báo cáo Import CSV, ảnh và alt, trạng thái mã hết hạn, số liệu Dashboard.
  - Tổng 4 nhóm: 109 mục. Không tạo/sửa file nào ngoài log (kết quả trả trong chat).

---

## #09 — Lưu checklist nháp và commit

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** 2026-11-12 23:08
- **Prompt:** hãy lưu vào file draft để review trước, và hãy commit
- **AI output:**
  - Lưu 109 mục checklist của 4 nhóm IA-01 → IA-04 (từ mục #06–#08) vào một file nháp markdown, thêm phần đầu (nguồn, trạng thái nháp, bảng số mục) và mục ghi chú cho người review.
  - Commit file nháp và audit log lên nhánh `hw03/toanhuynh`; không commit `backend/database.sqlite`.
  - `submission/task1-checklist/checklist-draft.md`, `submission/ai/ai-audit-log.md`

---

## #10 — Chuyển 70 mục checklist vào Excel

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** 2026-11-12 23:20
- **Prompt:**
  ```
  Chuyển 70 mục trong submission/task1-checklist/checklist-filtered.md vào sheet Checklist của
  submission/task1-checklist/checklist.xlsx. Cột Nguồn: AI cho 58 mục đầu, <tùy bạn> cho 12 mục bổ sung,
  kèm cột Lý do AI bỏ sót. Để trống cột Kết quả, Notes, Screenshot.
  ```
- **AI output:**
  - Ghi 70 mục vào sheet Checklist (dòng 2–71) theo thứ tự trong file md: 58 mục Nguồn = "AI", 12 mục bổ sung Nguồn = "Human" (giá trị có sẵn trong dropdown và được sheet Test Summary đếm), kèm cột "Lý do AI bỏ sót".
  - Cột IA và Màn hình dùng đúng giá trị dropdown của template; mục áp dụng cho sidebar hoặc từ 2 màn trở lên ghi "Nhiều màn hình", 5 mục Import ghi "Import CSV". Bỏ dấu markdown (backtick, in đậm) khỏi nội dung.
  - Để trống Kết quả, Notes, Screenshot, Bug ID. Số mục theo nhóm: IA-01 21, IA-02 25, IA-03 8, IA-04 16.
  - `submission/task1-checklist/checklist.xlsx`

---

## #11 — Chạy checklist bằng Playwright, ghi quan sát

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** 2026-11-12 23:39
- **Prompt:**
  ```
  Dùng Playwright (scripts/node_modules/playwright-core, Chrome) chạy checklist
  submission/task1-checklist/checklist-filtered.md trên http://localhost:5174 (admin@eshop.com / Admin123!).
  Với mỗi mục: thực hiện đúng "Cách kiểm", chụp ảnh bằng chứng vào submission/task1-checklist/screenshots/run/<ID>.png,
  ghi lại quan sát thực tế (không kết luận Pass/Fail). Kết quả xuất ra submission/task1-checklist/execution-observations.md
  dạng bảng: ID | Quan sát | Ảnh | Gợi ý kết quả. Tôi sẽ tự review ảnh và quyết định Pass/Fail.
  Chạy theo thứ tự: mục chỉ xem → form → môi trường đặc biệt → empty state và dừng backend cuối cùng.
  Trước khi chạy: scripts/start-sut.sh và scripts/seed-hw03.sh 3.
  ```
- **AI output:**
  - Viết script Playwright (Chrome 157 headless, 1366×768, vi-VN) chạy 70 mục theo 4 pha; chuyển đơn #1 sang delivered qua API để Dashboard có doanh thu; hộp thoại alert/confirm được ghi lại và hiện trong khung ghi chú chèn vào ảnh; mạng chậm giả lập qua CDP; dừng backend ở pha cuối rồi khởi động lại + seed để khôi phục dữ liệu.
  - Lần chạy đầu lỗi 1 mục (GUI-02-11, selector) và 4 mục cần sửa cách đo (GUI-01-03 tách từ tiếng Anh, GUI-01-10 thêm đối chiếu doanh thu, GUI-01-12 Tab qua ô ngày, GUI-04-02 đếm bản ghi qua API); đã sửa script và chạy lại riêng 5 mục.
  - Kết quả: 70/70 mục có quan sát, 115 ảnh; gợi ý của script: 42 "Có thể Failed", 18 "Có thể Passed", 10 cần xem ảnh/kiểm tay (GUI-04-16 cần tự kiểm bằng VoiceOver). Quan sát nổi bật: doanh thu Dashboard gấp đôi giá trị thực; sửa 1 sản phẩm làm cả bảng đổi tên; không có hộp thoại xác nhận khi xóa; bấm đôi tạo 2 bản ghi; thông báo lỗi "SQLITE_CONSTRAINT…" và "Network Error".
  - `scripts/hw03-run-checklist.mjs`, `submission/task1-checklist/execution-observations.md`, `submission/task1-checklist/screenshots/run/` (115 ảnh)

---

## #12 — Thêm cột kết quả đã kiểm chứng

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** 2026-11-12 23:46
- **Prompt:** thêm cột kết quả đã kiểm chứng để tôi điền pass hay fail
- **AI output:**
  - Thêm cột trống "Kết quả đã kiểm chứng" vào cuối bảng 70 mục và một dòng hướng dẫn điền `Passed` / `Failed` / `N/A`; cập nhật hàm xuất báo cáo trong script để lần chạy sau vẫn có cột này.
  - `submission/task1-checklist/execution-observations.md`, `scripts/hw03-run-checklist.mjs`

---

## #13 — Hiển thị thẻ HTML dạng raw trong bảng quan sát

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** 2026-11-12 23:49
- **Prompt:** chỉnh lại các thẻ <h1> hiện raw text vì nó detech và render ra trong md, tôi muốn xem raw
- **AI output:**
  - Bọc 18 thẻ HTML trong bảng (`<h1>`, `<h2>`, `<label>`, `<b>`, `<img …>`, `<html dir="rtl">`…) bằng backtick để markdown hiển thị nguyên văn; giữ nguyên `<br>` dùng xuống dòng trong ô. Bọc thêm các chuỗi `&lt;…&gt;` (innerHTML ở GUI-02-23) để không bị trình xem markdown đổi thành dấu `<`/`>`.
  - Cập nhật hàm `esc` trong script để báo cáo sinh lại cũng được bọc như vậy. Cột "Kết quả đã kiểm chứng" giữ nguyên.
  - `submission/task1-checklist/execution-observations.md`, `scripts/hw03-run-checklist.mjs`

---

## #14 — Commit kết quả chạy checklist

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** 2026-11-12 23:57
- **Prompt:** commit
- **AI output:**
  - Commit checklist Excel (70 mục), script Playwright, bảng quan sát và 115 ảnh bằng chứng lên nhánh `hw03/toanhuynh`; không commit `backend/database.sqlite`.
  - `submission/task1-checklist/checklist.xlsx`, `scripts/hw03-run-checklist.mjs`, `submission/task1-checklist/execution-observations.md`, `submission/task1-checklist/screenshots/run/`, `submission/ai/ai-audit-log.md`

---

## #15 — Điền kết quả kiểm chứng vào Excel, tách ảnh Failed

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** 2026-11-13 00:08
- **Prompt:**
  ```
  Từ submission/task1-checklist/execution-observations.md (cột "Kết quả đã kiểm chứng"):
  1. Điền Kết quả (Passed/Failed/N/A) và Notes vào sheet Checklist của checklist.xlsx cho 70 mục.
  2. Copy ảnh của các mục Failed từ screenshots/run/ sang screenshots/failed/, điền tên ảnh vào cột Screenshot.
  ```
- **AI output:**
  - Điền cột Kết quả cho 70 mục theo cột "Kết quả đã kiểm chứng" do tester điền: 44 Failed, 26 Passed, 0 N/A (IA-01 13/8, IA-02 19/6, IA-03 1/7, IA-04 11/5 Failed/Passed). Cột Notes lấy phần ghi chú sau dấu "—" (bỏ ký hiệu markdown); 4 mục Passed không có ghi chú để trống.
  - Copy 77 ảnh của 44 mục Failed sang `screenshots/failed/` (GUI-02-03.png dùng chung cho GUI-01-04 và GUI-02-03); cột Screenshot ghi tên ảnh, cách nhau bằng dấu phẩy; mục Passed để trống.
  - `submission/task1-checklist/checklist.xlsx`, `submission/task1-checklist/screenshots/failed/` (77 ảnh)

---

## #16 — Tính lại công thức trong checklist.xlsx

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** 2026-11-13 00:11
- **Prompt:** tôi thấy phần cong thức trong file excel vẫn chưa cập nhật
- **AI output:**
  - Nguyên nhân: file được ghi bằng openpyxl nên chỉ có công thức, không có giá trị đã tính; trình xem không tự tính lại sẽ hiện ô trống.
  - Mở file bằng Microsoft Excel qua AppleScript, chạy "calculate full" rồi lưu (bản sao lưu trước khi sửa để trong scratchpad). Sheet Test Summary hiện đúng: tổng 70 mục, 70 đã chạy, 26 Passed, 44 Failed, 0 N/A, pass rate 37,1%, 58 mục từ AI, 12 mục Human; Cross-Platform lấy đúng ID và mục kiểm tra. Công thức, dropdown và dữ liệu cột Kết quả/Notes/Screenshot giữ nguyên.
  - `submission/task1-checklist/checklist.xlsx`

---

## #17 — Commit kết quả kiểm chứng và ảnh Failed

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** 2026-11-13 00:11
- **Prompt:** commit
- **AI output:**
  - Commit checklist.xlsx (đã điền Kết quả/Notes/Screenshot, đã tính lại công thức), 77 ảnh trong `screenshots/failed/` (kèm việc xóa `.gitkeep` vì thư mục đã có file) và audit log lên nhánh `hw03/toanhuynh`; không commit `backend/database.sqlite`.
  - `submission/task1-checklist/checklist.xlsx`, `submission/task1-checklist/screenshots/failed/`, `submission/ai/ai-audit-log.md`

---

## #18 — Gộp mục Failed thành danh sách bug

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** 2026-11-13 00:15
- **Prompt:**
  ```
  Gộp các mục Failed trong execution-observations.md thành danh sách bug (mỗi bug một nguyên nhân),
  viết mỗi bug thành submission/bugs/BUG-xx.md theo BUG-TEMPLATE.md, kèm ảnh từ screenshots/failed/,
  và cập nhật bảng submission/bugs/README.md.
  ```
- **AI output:**
  - Gộp 44 mục Failed thành 33 bug theo nguyên nhân (15 Major, 14 Minor, 4 Trivial), xếp theo mức độ nghiêm trọng; mỗi bug có nguồn (ID checklist), màn hình, môi trường, severity/priority kèm lý do, tham chiếu FR hoặc giải đáp/BP, bước tái hiện thủ công, kết quả mong đợi trích spec, kết quả thực tế và ảnh từ `screenshots/failed/`. Đã kiểm: mọi mục Failed đều thuộc ít nhất một bug, mọi ảnh được tham chiếu đều tồn tại.
  - Một số mục được tách hoặc gộp theo nguyên nhân: GUI-01-10 tách thành 2 bug (doanh thu gấp đôi; định dạng tiền theo ngôn ngữ trình duyệt); GUI-02-18 tách thành 2 bug (sai header vẫn import; file rỗng không báo); GUI-02-03 gộp vào các bug thiếu kiểm tra dữ liệu và bug thông báo kỹ thuật.
  - Kiểm lại riêng giá `1000.5` (ghi chú ⚠ của tester ở GUI-02-13) bằng Playwright: form vẫn gửi và backend lưu 1000.5; ghi vào BUG-07. Sau đó khởi động lại SUT và seed lại dữ liệu.
  - Trường GitHub Issue ghi "Chưa tạo".
  - `submission/bugs/BUG-01.md` → `submission/bugs/BUG-33.md`, `submission/bugs/README.md`

---

## #19 — Commit danh sách bug

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** 2026-11-13 00:16
- **Prompt:** commit
- **AI output:**
  - Commit 33 file bug, bảng `README.md` và audit log lên nhánh `hw03/toanhuynh`; không commit `backend/database.sqlite`.
  - `submission/bugs/`, `submission/ai/ai-audit-log.md`

---

## #20 — Tạo GitHub Issue cho danh sách bug

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** 2026-11-13 00:18
- **Prompt:**
  ```
  Tạo GitHub Issue cho các bug trong submission/bugs/ (BUG-xx.md) trên repo Taylor3691/eshop-sut, theo quy ước issue hiện có của repo:
  - Tiêu đề: [HW03][BUG][Admin - <màn hình>] <mô tả ngắn>
  - Label: hw03, type: bug, status: new, severity: <theo bug>, priority: <theo bug>, module: admin (tạo label hw03 và module: admin nếu chưa có)
  - Nội dung: mô tả, môi trường, bước tái hiện, kết quả mong đợi (trích FR), kết quả thực tế, mục checklist liên quan,
    ảnh chụp chèn bằng link ảnh trên branch hw03/toanhuynh (push ảnh trước).
  Trước khi tạo, kiểm tra trùng với issue đã có (nhất là issue phía web user) và hỏi tôi nếu nghi trùng.
  Tạo thử 1 issue trước để tôi xem, tôi đồng ý mới tạo các issue còn lại.
  Sau khi tạo, ghi số issue và link vào từng BUG-xx.md, bảng bugs/README.md và cột Bug ID trong checklist.xlsx.
  ```
- **AI output:**
  - Push nhánh `hw03/toanhuynh` lên origin (12 commit, gồm ảnh) để có link ảnh; kiểm tra link ảnh dạng `blob/...?raw=true` trả HTTP 200.
  - Rà 111 issue hiện có (#1–#125): nghi trùng với 8 bug admin (BUG-01 ↔ #71; BUG-02 ↔ #61, #63; BUG-07 ↔ #29–#32, #72–#75; BUG-08 ↔ #23; BUG-09 ↔ #84, #89; BUG-10 ↔ #57; BUG-11 ↔ #60; BUG-12 ↔ #59). Các issue phía web user (#93, #94, #103, #110, #122, #123…) cùng loại lỗi nhưng khác màn hình/mã nguồn, không coi là trùng.
  - Tạo label `hw03` và `module: admin`; tạo issue thử #126 cho BUG-03 (Major/P1). Quy ước priority: High → P1, Medium → P2, Low → P3; repo chưa có label `severity: trivial`.
  - Người dùng duyệt #126, chọn không tạo issue mới cho 8 bug trùng (ghi số issue cũ) và tạo label `severity: trivial`. Đã tạo label này và 24 issue còn lại (#127–#150); tổng 25 issue mới mang nhãn `hw03` + `module: admin`.
  - Bổ sung phần quan sát mới bằng comment trên issue cũ: #29 (BUG-07: giá trống, giá lẻ 1000.5, tên 256 ký tự), #89 (BUG-09: giá trị 0, % > 100, mã sai định dạng, ngày đã qua), #59 (BUG-12: file rỗng không báo lỗi).
  - Ghi số issue và link vào trường GitHub Issue của 33 file BUG-xx.md và bảng `bugs/README.md` (bug trùng ghi "trùng" kèm link issue cũ); điền cột Bug ID cho 44 mục Failed trong `checklist.xlsx` dạng `BUG-xx (#nnn)`, rồi tính lại công thức bằng Excel.
  - `submission/bugs/BUG-01.md` → `submission/bugs/BUG-33.md`, `submission/bugs/README.md`, `submission/task1-checklist/checklist.xlsx`

---

## #21 — Commit số issue vào bug và checklist

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** 2026-11-13 00:24
- **Prompt:** commit
- **AI output:**
  - Commit 33 file BUG-xx.md, `bugs/README.md`, `checklist.xlsx` (cột Bug ID) và audit log lên nhánh `hw03/toanhuynh`; không commit `backend/database.sqlite`.
  - `submission/bugs/`, `submission/task1-checklist/checklist.xlsx`, `submission/ai/ai-audit-log.md`

---

## #22 — Viết kế hoạch đánh giá khả dụng (Task 2)

- **AI tool:** Claude Code (Claude Opus 5.5)
- **Date & time:** 2026-11-15 01:00
- **Prompt:** Dựa trên yêu cầu Task 2 trong file HW03 và flow tôi đã chọn trong submission/README.md, hãy viết nội dung cho submission/task2-usability/plan.md: mục tiêu, tiêu chí hoàn thành từng bước, hồ sơ người tham gia, task scenario (dạng mục tiêu, không hướng dẫn từng bước, không dùng đúng tên nút trên giao diện), lý do chọn SUS, câu hỏi probe về clarity, error recovery, speed, trust, và moderator script.
- **AI output:**
  - Điền đủ 9 mục của `plan.md` theo khung có sẵn: 6 mục tiêu (O1–O6) gắn với cách đo; bảng tiêu chí hoàn thành, thời gian mục tiêu/tối đa cho 6 bước và quy tắc chấm Y / Assisted / N (gồm trường hợp lưu dữ liệu sai và lỗi do SUT); hồ sơ người tham gia (persona chủ shop, tiêu chí chọn, loại trừ sinh viên HW03); task scenario dạng mục tiêu theo vai chủ shop thời trang kèm thẻ thông tin, tránh mọi nhãn nút/mục trên giao diện; lý do chọn SUS (so với UEQ-S), 10 câu SUS tiếng Việt và chỉ số theo bước; 15 câu probe chia theo clarity, error recovery, speed, trust; moderator script (lời giới thiệu, tập nói to, câu nhắc trung lập, 3 mức can thiệp, SUS, probe, kết thúc, việc sau phiên); chuẩn bị môi trường; mục pilot để trống bảng chỉnh sửa (điền sau khi chạy pilot).
  - Kiểm dữ liệu SUT sau reset để scenario khớp: 3 danh mục mặc định, 3 đơn pending của seed (đơn cần duyệt: 45 Lê Lợi, Q.1, TP.HCM); danh mục "Đồ mùa đông", sản phẩm "Áo khoác lông vũ", mã "WINTER15" chưa tồn tại.
  - `submission/task2-usability/plan.md`

## #23 — Chép phiếu phiên Pilot vào notes và bảng SUS

- **AI tool:** Claude Code (Opus 5.5)
- **Date & time:** 2026-11-15 13:16
- **Prompt:** Đây là phiếu ghi phiên {Pilot}. Hãy chép đúng từng phần vào
{pilot/notes.md | sessions/Px/notes.md} theo session-notes-TEMPLATE.md
và sus-and-metrics.xlsx (sheet SUS + Task metrics), báo lại điểm SUS.
Chỉ chép, không thêm, không sửa lời nguyên văn. Ô nào trong phiếu
để trống thì để trống (kèm phiếu ghi phiên Pilot)
- **AI output:**
  - Chép phiếu Pilot vào `pilot/notes.md` theo template: thông tin phiên, 16 dòng quan sát (giữ mã loại H/E/F và mức độ như phiếu), bảng kết quả 6 bước, SUS, 15 câu probe (cột Chủ đề lấy theo mã C/E/S/T/W ở plan.md mục 6); để trống "Hoàn thành task" và "Nhận xét của người điều phối" vì phiếu không có
  - `sus-and-metrics.xlsx`: thêm dòng Pilot ở sheet SUS (dòng 16, ngoài vùng Mean/SD/Min/Max của P1–P7) và 6 dòng Pilot ở sheet Task metrics (dòng 44–49); tính lại bằng Excel: điểm SUS Pilot = 45
  - Ghi nhận: giờ kết thúc trong phiếu (13:15:50) muộn hơn thời điểm nhận phiếu (13:12), đã báo người dùng kiểm tra lại
  - File: `submission/task2-usability/pilot/notes.md`, `submission/task2-usability/sus-and-metrics.xlsx`

---

## #24 — Commit phiên Pilot

- **AI tool:** Claude Code (Opus 5.5)
- **Date & time:** 2026-11-15 13:17
- **Prompt:** không cần sửa đâu, nó đúng rồi, phần thời gian này ko quan trọng
- **AI output:**
  - Giữ nguyên dữ liệu Pilot theo xác nhận của người dùng, commit phiên Pilot
  - File: `submission/task2-usability/pilot/notes.md`, `submission/task2-usability/sus-and-metrics.xlsx`, `submission/ai/ai-audit-log.md`

---

## #25 — Điền kết quả pilot vào plan.md mục 9.2

- **AI tool:** Claude Code (Opus 5.5)
- **Date & time:** 2026-11-15 13:18
- **Prompt:** ok
- **AI output:**
  - Điền bảng 9.2 (7 dòng) từ dữ liệu `pilot/notes.md`: thời gian so với mục tiêu/tối đa, thiếu video, mã loại F bị trùng nghĩa, flow chạy trọn trên dữ liệu reset, cách hiểu scenario, ô ảnh/CSV, độ phủ probe
  - Sửa kế hoạch theo kết quả pilot: thêm cách bấm giờ khi không quay video (mục 2, 5.3), mã ghi tắt Fr / E / H / Fu (mục 7.4)
  - File: `submission/task2-usability/plan.md`

---

## #26 — Chép phiếu phiên P1 vào notes và bảng SUS

- **AI tool:** Claude Code (Opus 5.5)
- **Date & time:** 2026-11-15 15:02
- **Prompt:** (dán phiếu ghi phiên P1, cùng yêu cầu chép như phiên Pilot)
- **AI output:**
  - Chép phiếu P1 vào `sessions/P1/notes.md` theo template: 12 dòng quan sát, bảng 6 bước, SUS, 12 câu probe; để trống "Hoàn thành task" và "Nhận xét của người điều phối"
  - `sus-and-metrics.xlsx`: điền dòng P1 ở sheet SUS và 6 dòng P1 ở sheet Task metrics; điểm SUS P1 = 62.5
  - Phát hiện: sheet SUS và Task metrics đã có sẵn dữ liệu P2–P7 (không do AI nhập, chưa có trong commit e51fa16), trong khi theo `participants.md` các phiên P2–P7 hẹn từ 15:30 đến 20:30 cùng ngày, tức là chưa diễn ra; đã báo người dùng, không commit
  - File: `submission/task2-usability/sessions/P1/notes.md`, `submission/task2-usability/sus-and-metrics.xlsx`

---

## #27 — Ghi bug cross-browser và cập nhật README

- **AI tool:** Claude Code (Opus 5.5)
- **Date & time:** 2026-11-15 22:13
- **Prompt:** bạn hãy làm và ghi log lại
1. Ghi bug cross-browser: BUG-34 cho lỗi định dạng tiền theo ngôn ngữ trình duyệt (01-10), BUG-35 cho lỗi cuộn chuột làm đổi giá trị ô số trên Chrome (02-24). Mỗi bug kèm GitHub issue có nhãn hw03.
2. Cập nhật README: số nền tảng và số bug cross-platform.
- **AI output:**
  - Phát hiện hai lỗi này đã có từ Task 1 (BUG-19 #136 định dạng tiền, BUG-31 #148 cuộn chuột trên ô số) nên không tạo BUG-34/35 trùng; bổ sung mục "Kết quả cross-browser" với bảng Chrome / Firefox / Safari và ảnh Task 3 vào hai bug này
  - Comment kết quả cross-browser kèm ảnh vào issue #136 và #148
  - Cập nhật cột Nguồn trong `bugs/README.md`, cột Bug ID trong sheet Cross-Platform
  - README: Task 3 chạy trên Chrome, Firefox, Safari (macOS) do BrowserStack Free Trial chỉ 1 phút/thiết bị; bug cross-platform: 0 mới (2 khác biệt bổ sung vào BUG-19, BUG-31)
  - File: `submission/bugs/BUG-19.md`, `submission/bugs/BUG-31.md`, `submission/bugs/README.md`, `submission/README.md`, `submission/task1-checklist/checklist.xlsx`

---

## #28 — Viết phần Task 3 trong báo cáo chính

- **AI tool:** Claude Code (Opus 5.5)
- **Date & time:** 2026-11-15 22:27
- **Prompt:** hãy Viết phần Task 3 trong báo cáo chính: cách làm, lý do dùng trình duyệt thật thay cho BrowserStack, bảng tổng hợp, 2 khác biệt giữa các trình duyệt
- **AI output:**
  - Viết mục 4 của báo cáo chính: 4.1 nền tảng (Chrome 157.0.8103.51, Firefox 153.0.4, Safari 27.2 trên macOS 27.2, lấy từ ảnh About), 4.2 lý do dùng trình duyệt thật (giới hạn 1 phút/thiết bị của BrowserStack Free Trial + câu cho phép thay thế của đề), 4.3 cách làm (chọn 22 mục nhóm A, reset dữ liệu, thiết lập Safari, thực thi có trợ giúp AI điều khiển máy tính, ghi sheet, lý do N/A), 4.4 bảng tổng hợp 22 mục Task 1/CH/FF/SF kèm ghi chú, 4.5 hai khác biệt (định dạng tiền theo ngôn ngữ trình duyệt — BUG-19 #136; cuộn chuột đổi giá trị ô số chỉ trên Chrome — BUG-31 #148) kèm nguyên nhân và đề xuất sửa
  - Đối chiếu với `frontend-admin/src/App.jsx` (`toLocaleString()` không truyền locale) và ghi chú Task 1 của GUI-01-16, GUI-02-11 trước khi chốt nội dung
  - File: `submission/report/main-report.md`

---

## #29 — Chép phiếu phiên P2–P7 vào notes và bảng SUS

- **AI tool:** Claude Code (Opus 5.5)
- **Date & time:** 2026-11-15 22:36
- **Prompt:** Đây là phiếu ghi phiên từ P1 tới P7. Hãy chép đúng từng phần vào {pilot/notes.md | sessions/Px/notes.md} theo session-notes-TEMPLATE.md và sus-and-metrics.xlsx (sheet SUS + Task metrics), báo lại điểm SUS. Chỉ chép, không thêm. Ô nào trong phiếu để trống thì để trống (kèm phiếu ghi phiên P2–P7 dán nguyên văn)
- **AI output:**
  - Chép phiếu P2–P7 vào `sessions/P2…P7/notes.md` theo template và cùng bố cục với P1: thông tin phiên, bảng quan sát, bảng kết quả 6 bước, SUS, probe (cột Chủ đề theo mã câu hỏi ở plan.md mục 6); để trống "Hoàn thành task" và "Nhận xét của người điều phối"; giữ nguyên giá trị A (P3 B6) ở cột Hoàn thành
  - `sus-and-metrics.xlsx`: điền 10 câu SUS cho P1–P7 và 42 dòng Task metrics; dòng P1 lấy từ `sessions/P1/notes.md` vì sheet chưa có dữ liệu P1; công thức giữ nguyên
  - Điểm SUS: P1 62.5, P2 57.5, P3 37.5, P4 80, P5 52.5, P6 60, P7 42.5; Mean 56.07, SD 13.98, Min 37.5, Max 80
  - Phát hiện trong phiếu (chép nguyên, không sửa): P5 điều khiển qua Zalo nhưng quan sát 00:20 ghi "Chờ con trỏ trên Meet"
  - File: `submission/task2-usability/sessions/P2/notes.md` … `sessions/P7/notes.md`, `submission/task2-usability/sus-and-metrics.xlsx`

---

## #30 — Kiểm tra mức hoàn thành Task 2

- **AI tool:** Claude Code (Opus 5.5)
- **Date & time:** 2026-11-15 22:44
- **Prompt:** kiểm tra task 2 hoàn thành chưa
- **AI output:**
  - Đối chiếu yêu cầu Task 2 trong đề với thư mục `task2-usability/`, báo cáo chính, README, bugs và git log
  - Đã xong: Phase 1 (`plan.md`: mục tiêu, scenario, SUS, probe, pilot mục 9.2; `participants.md` 7 người + pilot), Phase 2 (notes Pilot, P1–P7; SUS và Task metrics trong xlsx)
  - Kiểm tra dữ liệu notes: tổng thời gian 6 bước bằng đúng thời lượng phiên ở cả 8 phiên, mọi mốc quan sát nằm trong khoảng của bước tương ứng
  - Chưa xong: `analysis.md` mới có tiêu đề; mục 3 báo cáo chính trống; chưa ghi bug usability và GitHub issue (README còn "_"); P2–P7 chưa commit, đề yêu cầu commit theo từng phiên
  - Mâu thuẫn: `plan.md` và `participants.md` nói không quay màn hình, nhưng notes P1, P4, P5 ghi video `.mp4` và đồng ý ghi hình "Có", trong khi repo không có file video; `plan.md` mục 7.4 và 9.2 quy định mã Fr/E/H/Fu sau pilot nhưng notes P1–P7 vẫn dùng F; P5 qua Zalo nhưng quan sát ghi "Meet"
  - Không sửa file nào

---

## #31 — Sửa mâu thuẫn video, mã quan sát, nền tảng P5

- **AI tool:** Claude Code (Opus 5.5)
- **Date & time:** 2026-11-15 22:46
- **Prompt:** bạn hãy fix phần này trước
> Chuyện quay video bị mâu thuẫn. plan.md và participants.md hiện ghi "không quay màn hình", nhưng notes P1, P4, P5 ghi p1_truc.mp4, p4_bao.mp4, p5_ngan.mp4 và "Đồng ý ghi hình: Có". Trong repo không có file video nào, và recordings/.gitkeep đã bị xóa. Đề yêu cầu quay màn hình nếu người tham gia đồng ý, nên báo cáo cần nói rõ là có quay hay không. Nếu không quay thì phải giải thích lý do.
> Mã loại quan sát chưa thống nhất. Theo mục 7.4 và 9.2 của plan.md, sau pilot đã đổi sang mã Fr/E/H/Fu. Nhưng notes P1–P7 vẫn dùng F, nên không biết đó là friction hay frustration. Cách sửa: hoặc ghi rõ trong phân tích F nghĩa là gì, hoặc sửa lại mục 9.2.
> P5 có thể ghi nhầm. Phiên P5 chạy qua Zalo nhưng quan sát lúc 00:20 ghi "Chờ con trỏ trên Meet".
- **AI output:**
  - Chưa sửa file: cả ba điểm cần sự thật chỉ người điều phối biết (video P1/P4/P5 có tồn tại không, F trong phiếu nghĩa là friction hay frustration, P5 chạy trên Zalo hay Meet); sửa theo hướng nào khi chưa biết sẽ là tự đặt dữ liệu phiên
  - Đã hỏi lại người dùng ba câu trên và nêu cách sửa tương ứng cho từng câu trả lời

---

## #32 — Bỏ phần ghi hình, thống nhất mã F, sửa P5 sang Google Meet

- **AI tool:** Claude Code (Opus 5.5)
- **Date & time:** 2026-11-15 22:48
- **Prompt:** 1. xóa phần record
2.F luôn là friction
3. meet
- **AI output:**
  - Bỏ trường "Video" và "Đồng ý ghi hình" ở dòng thông tin phiên của Pilot và P1–P7 cho khớp `session-notes-TEMPLATE.md` (template đã bỏ hai trường này)
  - `plan.md` mục 7.4: mã ghi tắt là F (friction), E (error), H (hesitation), F không dùng cho frustration; mục 9.2 dòng 3: chỉnh sửa sau pilot là quy định F chỉ dùng cho friction, P1–P7 ghi theo quy định này
  - P5: đổi thiết bị thành "điều khiển từ xa qua Google Meet" trong notes và hình thức "Online (Google Meet)" trong `participants.md`; quan sát 00:20 ("trên Meet") nay đã khớp, giữ nguyên
  - File: `submission/task2-usability/pilot/notes.md`, `submission/task2-usability/sessions/P1/notes.md` … `sessions/P7/notes.md`, `submission/task2-usability/plan.md`, `submission/task2-usability/participants.md`

---

## #33 — Viết phân tích kết quả usability

- **AI tool:** Claude Code (Opus 5.5)
- **Date & time:** 2026-11-15 22:55
- **Prompt:** bạn hãy viết analysis.md
- **AI output:**
  - Viết đủ 6 mục của `analysis.md` từ notes P1–P7 và `sus-and-metrics.xlsx` (không tính Pilot): SUS từng người và thống kê (TB 56.07, SD 13.98, trung vị 57.5, CI 95% 43.1–69.0, vùng Marginal), đóng góp từng câu SUS (thấp nhất Q6, Q2), so sánh theo kinh nghiệm quản trị; task metrics theo bước và theo người (6/7 hoàn thành không trợ giúp, B3 và B4 tắc nhất); 10 nhóm vấn đề I1–I10 kèm trích dẫn theo mốc thời gian; tách bug riêng lẻ (đối chiếu BUG-07, BUG-17, BUG-21, BUG-23) và 5 vấn đề thiết kế D1–D5; xếp hạng Nielsen 0–4 (I1 = 4; I2, I3, I4, I7 = 3); 10 đề xuất cải tiến gắn với W1
  - Phát hiện: B2 của P7 mất 200 giây, vượt thời gian tối đa 180 giây nhưng phiếu ghi Y; giữ nguyên số liệu, ghi chú để người điều phối xác nhận
  - File: `submission/task2-usability/analysis.md`

---

## #34 — Commit phân tích usability

- **AI tool:** Claude Code (Opus 5.5)
- **Date & time:** 2026-11-15 22:56
- **Prompt:** commit
- **AI output:**
  - Commit `analysis.md` và audit log với message `test(hw03): usability analysis`; không commit `backend/database.sqlite`
  - File: `submission/task2-usability/analysis.md`, `submission/ai/ai-audit-log.md`

---

## #35 — Ghi bug usability và bổ sung bằng chứng vào bug Task 1

- **AI tool:** Claude Code (Opus 5.5)
- **Date & time:** 2026-11-15 23:03
- **Prompt:** hãy làm phần ghi bug usability. I3 (bảng sản phẩm không có cột danh mục) chắc chắn là bug mới. I6 (nút Hủy sát nút Xác nhận) và I7 (đóng tab không đăng xuất) có ghi thành bug hay không là do bạn quyết. I8 (ô ngày) cần kiểm lại xem có phải hành vi mặc định của Chrome không. Với các bug đã có từ Task 1, chỉ cần thêm bằng chứng từ phiên usability vào.
- **AI output:**
  - Chạy lại SUT bằng Playwright (Chrome 157.0.8103.79, headless, 1366×768, vi-VN) để kiểm I3, I6, I8 và chụp ảnh; sau đó reset dữ liệu bằng `start-sut.sh` + `seed-hw03.sh 3`
  - I3 → BUG-34 (Major, P2), issue #188: bảng sản phẩm chỉ có cột Ảnh / Tên SP / Giá / Hành động, API lưu đúng `category_id = 4` nhưng giao diện không hiện danh mục
  - I6 → BUG-35 (Major, P2), issue #189: nút Hủy màu xám `rgb(156, 163, 175)` (trái FR-21), cách nút Xác nhận 4 px, bấm một lần là đơn sang "Đã hủy" (trạng thái kết thúc FR-10), không có hộp thoại xác nhận
  - I7: không ghi bug — không có yêu cầu bắt phiên kết thúc khi đóng tab, nút "Đăng xuất" đúng FR-23; giữ là đề xuất
  - I8: không ghi bug — gõ "31/12/2026", "31122026", "31-12-2026", "31.12.2026" vào ô ngày trống trên Chrome 157 đều nhận 2026-12-31; không tái hiện được lỗi của P6
  - Bổ sung mục "Bằng chứng từ đánh giá khả dụng" vào BUG-07 (I4), BUG-17 (I1), BUG-21 (I9), BUG-23 (I2) và comment vào issue #29, #134, #138, #140
  - Cập nhật `bugs/README.md` (35 bug: Major 17, Minor 14, Trivial 4), README (số bug usability = 2), `analysis.md` mục 4.1, 4.2 và bảng quyết định bug ở mục 6
  - Phát hiện ngoài phạm vi: đơn "Đã hủy" vẫn có nút "Đánh dấu Đã giao", trái FR-10 (`canceled` là trạng thái kết thúc); chưa có trong danh sách bug, chưa ghi
  - File: `submission/bugs/BUG-34.md`, `submission/bugs/BUG-35.md`, `submission/bugs/BUG-07.md`, `submission/bugs/BUG-17.md`, `submission/bugs/BUG-21.md`, `submission/bugs/BUG-23.md`, `submission/bugs/README.md`, `submission/README.md`, `submission/task2-usability/analysis.md`, `submission/task2-usability/screenshots/UX-I3-product-table-no-category.png`, `submission/task2-usability/screenshots/UX-I6-cancel-next-to-confirm.png`, `submission/task2-usability/screenshots/UX-I6-cancel-no-confirm.png`

---

## #36 — Viết phần Task 2 trong báo cáo chính

- **AI tool:** Claude Code (Opus 5.5)
- **Date & time:** 2026-11-15 23:08
- **Prompt:** xử lý Mục 3 trong report/main-report.md còn trống. Đây là phần quan trọng nhất còn lại, vì đề yêu cầu ghi lại cách làm trong báo cáo chính. Nội dung cần có: cách làm, scenario, người tham gia, SUS, chỉ số theo bước, các vấn đề và mức độ nghiêm trọng, bug.
- **AI output:**
  - Viết mục 3 của báo cáo chính gồm 9 phần: 3.1 mục tiêu và flow, 3.2 task scenario (lời dẫn, thẻ thông tin, nguyên tắc viết), 3.3 công cụ đo (SUS và lý do chọn, chỉ số theo bước, 15 câu probe, bảng quan sát), 3.4 người tham gia (bảng P1–P7 chỉ dùng mã, không ghi tên và số điện thoại), 3.5 cách tiến hành (chuẩn bị, pilot, trong phiên, ghi nhận, SUS và probe, commit), 3.6 kết quả SUS, 3.7 chỉ số theo bước, 3.8 vấn đề và severity (bảng I1–I10, D1–D5, điểm làm tốt, đề xuất ưu tiên), 3.9 bug (BUG-34 #188, BUG-35 #189, bug Task 1 được bổ sung, nhóm không ghi bug)
  - Số liệu lấy từ `analysis.md`, `plan.md`, `participants.md`; ghi chú lại dữ liệu B2 của P7 vượt thời gian tối đa
  - Để chỗ trống "<người điều phối bổ sung>" cho lý do không quay màn hình ở mục 3.5 vì chưa có thông tin
  - File: `submission/report/main-report.md`

---

## #37 — Bổ sung lý do không quay màn hình

- **AI tool:** Claude Code (Opus 5.5)
- **Date & time:** 2026-11-15 23:08
- **Prompt:** lý do không quay màn hình là người dùng không muốn chia sẻ
- **AI output:**
  - Điền lý do "người tham gia không muốn chia sẻ bản ghi màn hình" vào chỗ trống ở mục 3.5 của báo cáo chính, dòng "Ghi nhận" ở đầu `plan.md` và ghi chú đầu `participants.md`
  - File: `submission/report/main-report.md`, `submission/task2-usability/plan.md`, `submission/task2-usability/participants.md`

---

<!-- Mẫu cho mục tiếp theo:

## #NN — <Tên bước>

- **AI tool:**
- **Date & time:**
- **Prompt:**
- **AI output:** (nguyên văn, hoặc tóm tắt + đường dẫn file output)
-->