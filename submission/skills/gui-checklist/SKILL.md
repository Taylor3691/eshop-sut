---
name: gui-checklist
description: Thiết kế, thực thi và báo cáo GUI checklist cho một hoặc nhiều màn hình web (IA-01 chuẩn giao diện chung, IA-02 form, IA-03 điều hướng, IA-04 phản hồi/trạng thái). Dùng khi người dùng muốn kiểm thử giao diện một màn hình mới, lập checklist GUI, chạy checklist bằng Playwright, hoặc gom mục Failed thành bug và GitHub issue.
---

# GUI Checklist

Quy trình 6 bước, rút ra từ HW03 (EShop Web Admin, 70 mục, 33 bug). Mỗi bước có **điểm dừng cho người kiểm thử**: AI không tự giải đáp đặc tả, không tự chấm Pass/Fail, không tự tạo issue khi chưa được duyệt.

Đọc `references/checklist-method.md` trước khi bắt đầu (cách viết mục, tiêu chí lọc, các khía cạnh AI hay bỏ sót, quy tắc gộp bug). Prompt mẫu cho từng bước nằm trong `references/prompts.md`.

## Đầu vào cần hỏi người dùng (nếu chưa có)

1. **Phạm vi:** URL của SUT, danh sách màn hình (một màn chính + các màn phụ).
2. **Đặc tả:** file chứa yêu cầu chức năng / giao diện (mã FR) và định nghĩa IA.
3. **Mã nguồn giao diện** của các màn hình đó (ví dụ `src/App.jsx`, `index.html`).
4. **Tài khoản đăng nhập** và cách reset dữ liệu (script seed), nếu có.
5. **Thư mục đầu ra** (mặc định `submission/task1-checklist/`).

## Bước 1 — Bảng thành phần giao diện

- Đọc đặc tả, định nghĩa IA và mã nguồn. Với mỗi màn hình, lập một bảng: `# | Thành phần | Loại | Ghi chú từ code | FR | IA` (mẫu: `templates/ui-inventory-TEMPLATE.md`). Phần dùng chung (sidebar, header) tách thành bảng 0.
- Cột "Ghi chú từ code" chỉ ghi điều đọc được trong code, kèm số dòng; chưa kết luận lỗi.
- Liệt kê riêng **các điểm đặc tả không nói rõ** (ví dụ: `<h1>` trong SPA, thuật ngữ nào giữ tiếng Anh, màu nút, dạng thông báo lỗi, xóa có cần hỏi lại không, định dạng tiền).
- ⛔ **Dừng.** Đưa danh sách điểm không rõ cho người kiểm thử quyết định. Ghi nguyên văn các giải đáp vào cuối file thành mục "Giải đáp (oracle)", đánh số GĐ 1, GĐ 2… Không tự đoán thay.

## Bước 2 — AI sinh bản nháp checklist

- Sinh theo từng nhóm IA-01 → IA-04, mỗi nhóm một lượt, lưu chung vào `checklist-draft.md`.
- Mỗi mục: `ID | Màn hình | Tiêu chí cần đạt | Cách kiểm / điều kiện Pass | Căn cứ | Inv.`
  - ID dạng `GUI-<IA 2 số>-<số thứ tự>`, ví dụ `GUI-02-14`.
  - Viết thành **tiêu chí cần đạt**, không viết thành lỗi ("Ô Email dùng `type=email`", không phải "Ô Email sai type").
  - Cách kiểm phải làm lại được: dữ liệu thử cụ thể, thao tác cụ thể, điều kiện Pass đo được.
  - Căn cứ: mã FR, `GĐ n`, hoặc `BP (Nielsen #x / WCAG x.x.x)`.
- Nhóm nào không áp dụng (ví dụ Step Indicator khi không có form nhiều bước) thì ghi N/A kèm lý do, không bịa mục.

## Bước 3 — Người kiểm thử lọc và bổ sung

- ⛔ **Dừng.** Người kiểm thử review bản nháp. AI có thể đề xuất mục nên loại theo tiêu chí trong `references/checklist-method.md` (chức năng thay vì giao diện, trùng, giá trị thấp, N/A), nhưng quyết định là của người kiểm thử.
- Lưu bản đã lọc vào `checklist-filtered.md`, có cột **ID cũ** để truy vết và bảng "Các mục đã loại" kèm lý do.
- Bổ sung mục AI bỏ sót vào mục "Mục bổ sung sau review", có cột **Lý do AI bỏ sót**. Dùng danh sách gợi ý trong `references/checklist-method.md` mục 3. Lý do nên quy về một trong 3 nhóm: giới hạn đầu vào (prompt), giới hạn của AI, đặc điểm của giao diện.
- Chuyển toàn bộ mục vào sheet Checklist của `templates/checklist.xlsx`. Cột Nguồn ghi `AI` / `AI (đã sửa)` / `Human`. Sheet Test Summary tự đếm.

## Bước 4 — Chạy checklist bằng Playwright, chỉ ghi quan sát

- Reset dữ liệu trước khi chạy.
- Viết các hàm kiểm vào một file `checks.mjs` (xem `scripts/checks.example.mjs`), mỗi mục một hàm, rồi chạy bằng `scripts/run-checklist.mjs`:
  ```bash
  node scripts/run-checklist.mjs --config run.config.json        # chạy hết
  ONLY=GUI-02-11,GUI-04-02 node scripts/run-checklist.mjs --config run.config.json   # chạy lại vài mục
  ```
- Script ghi **quan sát** (số đo, nội dung hộp thoại, request) và chụp ảnh vào `screenshots/run/<ID>.png`. Ghi chú do script chèn vào ảnh có tiêu đề "Ghi chú của Playwright (không thuộc SUT)" để không nhầm với giao diện.
- Thứ tự chạy: mục chỉ xem → form → môi trường đặc biệt (locale, kích thước, zoom, dark mode, RTL, mạng chậm) → empty state và dừng backend (để cuối, rồi khôi phục).
- Kết quả xuất ra `execution-observations.md`: `ID | Pha | Quan sát | Ảnh | Gợi ý kết quả | Kết quả đã kiểm chứng`. Cột cuối để trống.
- Mục không tự động được (ví dụ trình đọc màn hình) ghi "Cần kiểm tay".

## Bước 5 — Người kiểm thử chấm, điền Excel

- ⛔ **Dừng.** Người kiểm thử xem ảnh và điền cột "Kết quả đã kiểm chứng" theo dạng `Passed`, `Failed — <lý do>`, hoặc `N/A — <lý do>`.
- Sau đó chạy:
  ```bash
  python3 scripts/fill_results.py --obs execution-observations.md --xlsx checklist.xlsx \
      --run-dir screenshots/run --failed-dir screenshots/failed
  ```
  Script điền cột Kết quả và Notes, chép ảnh của mục Failed sang `screenshots/failed/` và ghi tên ảnh vào cột Screenshot. Mục Passed không kèm ảnh.
- File ghi bằng openpyxl không có giá trị công thức đã tính. Mở bằng Excel (hoặc LibreOffice) và tính lại trước khi nộp.

## Bước 6 — Gom bug và tạo GitHub issue

- Gom các mục Failed thành bug **theo nguyên nhân**: một bug một nguyên nhân. Nhiều mục chung nguyên nhân thì gộp; một mục có hai nguyên nhân thì tách. Mọi mục Failed phải thuộc ít nhất một bug.
- Mỗi bug một file `bugs/BUG-xx.md` theo `templates/BUG-TEMPLATE.md`: nguồn (ID checklist), màn hình, môi trường, severity/priority kèm lý do, tham chiếu FR/GĐ/BP, bước tái hiện, kết quả mong đợi trích đặc tả, kết quả thực tế, ảnh. Cập nhật bảng `bugs/README.md`.
- Trước khi tạo issue: tìm issue trùng (`gh issue list --search`). Bug trùng thì ghi số issue cũ và bổ sung quan sát mới bằng comment, không tạo issue mới.
- ⛔ **Dừng.** Tạo thử 1 issue cho người kiểm thử duyệt, rồi mới tạo phần còn lại. Ảnh trong issue dùng link `blob/<branch>/<path>?raw=true`, nên phải push ảnh trước.
- Ghi số issue vào file bug, `bugs/README.md` và cột Bug ID trong `checklist.xlsx`.

## Nguyên tắc

- Không ghi kết quả Pass/Fail nào mà người kiểm thử chưa xác nhận.
- Mọi số liệu đưa vào báo cáo phải đọc lại từ file (xlsx, md), không nhớ lại.
- Sau mỗi bước, ghi một mục vào AI Audit Log nếu dự án yêu cầu (xem skill `ai-audit-log`).
