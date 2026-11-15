# Prompt mẫu cho từng bước

Thay các phần trong `<...>`. Đây là các prompt đã dùng ở HW03 (AI Audit Log #02–#20), đã rút gọn và tổng quát hóa.

## Bước 1 — Bảng thành phần giao diện

```
Bạn là QA tester. Tôi đang kiểm thử GUI của <tên SUT> (<URL>).
Phạm vi gồm <n> màn hình: <danh sách màn hình>.
Tài liệu:
- Đặc tả: <file>, mục <FR-xx → FR-yy>
- Các nhóm kiểm thử giao diện IA-01 → IA-04: <file>, mục <...>
- Code giao diện: <file(s)>
Liệt kê các thành phần giao diện của từng màn hình (form, trường nhập, nút, bảng, menu, thông báo)
và yêu cầu liên quan (ghi mã FR, nhóm IA). Trả về mỗi màn hình một bảng.
Chỉ dựa vào tài liệu và code tôi cung cấp. Ghi riêng những điểm đặc tả không nói rõ.
Chưa viết checklist.
```

Sau khi có giải đáp: `đây là phần giải đáp cho <n> điều mơ hồ: <giải đáp>` → ghi nguyên văn vào cuối `ui-inventory.md`.

## Bước 2 — Sinh checklist theo từng nhóm IA

```
Dựa trên <đường dẫn>/ui-inventory.md, viết các mục checklist GUI cho nhóm <IA-0x: tên nhóm>.
Mỗi mục có tiêu chí Pass rõ ràng, ghi FR liên quan (hoặc BP nếu là best practice). Trả về dạng bảng.
Viết mục dưới dạng tiêu chí cần đạt, không viết thành lỗi.
```
Lặp lại cho từng nhóm, rồi: `hãy lưu vào file draft để review trước`.

## Bước 3 — Chuyển vào Excel

```
Chuyển <n> mục trong <đường dẫn>/checklist-filtered.md vào sheet Checklist của checklist.xlsx.
Cột Nguồn: AI cho các mục từ bản nháp, Human cho các mục bổ sung, kèm cột Lý do AI bỏ sót.
Để trống cột Kết quả, Notes, Screenshot.
```

## Bước 4 — Chạy bằng Playwright

```
Dùng Playwright (Chrome) chạy checklist <đường dẫn>/checklist-filtered.md trên <URL> (<tài khoản>).
Với mỗi mục: thực hiện đúng "Cách kiểm", chụp ảnh bằng chứng vào screenshots/run/<ID>.png,
ghi lại quan sát thực tế (không kết luận Pass/Fail). Kết quả xuất ra execution-observations.md
dạng bảng: ID | Quan sát | Ảnh | Gợi ý kết quả. Tôi sẽ tự review ảnh và quyết định Pass/Fail.
Chạy theo thứ tự: mục chỉ xem → form → môi trường đặc biệt → empty state và dừng backend cuối cùng.
Trước khi chạy: <lệnh reset dữ liệu>.
```

## Bước 5 — Điền kết quả

```
Từ execution-observations.md (cột "Kết quả đã kiểm chứng"):
1. Điền Kết quả (Passed/Failed/N/A) và Notes vào sheet Checklist của checklist.xlsx.
2. Copy ảnh của các mục Failed từ screenshots/run/ sang screenshots/failed/, điền tên ảnh vào cột Screenshot.
```

## Bước 6 — Bug và issue

```
Gộp các mục Failed trong execution-observations.md thành danh sách bug (mỗi bug một nguyên nhân),
viết mỗi bug thành bugs/BUG-xx.md theo BUG-TEMPLATE.md, kèm ảnh từ screenshots/failed/,
và cập nhật bảng bugs/README.md.
```

```
Tạo GitHub Issue cho các bug trong bugs/ trên repo <owner/repo>, theo quy ước issue hiện có của repo:
- Tiêu đề: [<Dự án>][BUG][<Phân hệ> - <màn hình>] <mô tả ngắn>
- Label: <nhãn dự án>, type: bug, status: new, severity: <theo bug>, priority: <theo bug>, <nhãn phân hệ>
- Nội dung: mô tả, môi trường, bước tái hiện, kết quả mong đợi (trích FR), kết quả thực tế, mục checklist liên quan,
  ảnh chèn bằng link ảnh trên branch <branch> (push ảnh trước).
Trước khi tạo, kiểm tra trùng với issue đã có và hỏi tôi nếu nghi trùng.
Tạo thử 1 issue trước để tôi xem, tôi đồng ý mới tạo các issue còn lại.
Sau khi tạo, ghi số issue và link vào từng BUG-xx.md, bảng bugs/README.md và cột Bug ID trong checklist.xlsx.
```
