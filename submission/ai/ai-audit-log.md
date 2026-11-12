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

<!-- Mẫu cho mục tiếp theo:

## #NN — <Tên bước>

- **AI tool:**
- **Date & time:**
- **Prompt:**
- **AI output:** (nguyên văn, hoặc tóm tắt + đường dẫn file output)
-->