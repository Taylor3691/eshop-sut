# Test Run — Pool C / Quản lý sản phẩm

## Phạm vi và môi trường

- Toàn bộ **24 cases hiện hành**, giữ ID gốc.
- Ngày/đợt chạy: [Điền].
- Phiên bản hệ thống/commit: [Điền].
- Máy tính/trình duyệt/phiên bản: [Điền].
- Tài khoản và dữ liệu thực tế: [Điền theo hướng dẫn pool].
- [Hướng dẫn chuẩn bị](../test-cases/product-crud/README.md) · [Phân tích](../test-summary/product-crud-analysis.md) · [Ma trận](../test-summary/traceability-matrix.md).

## Cách điền

1. Mở case qua liên kết, làm theo Preconditions và Test Steps.
2. Điền Tester và thông tin execution thực tế. Với Result = Pass, ghi Note là `None`; với Fail hoặc Blocked, ghi Actual Result hoặc lý do trong Note.
3. Result dùng `Not Run`, `Pass`, `Fail` hoặc `Blocked`. Chưa chạy giữ Not Run. Không chuẩn bị được dữ liệu/không đến được bước cần thử thì ghi Blocked kèm lý do.
4. Nếu Fail, liên kết bug report ở Related Bug; giữ ảnh màn hình và mô tả điều mong đợi/điều thực tế.
5. Cập nhật tổng hợp bằng tay sau mỗi đợt. Kết quả cũ không tự xác nhận phiên bản bước mới đã chạy.

## Kết quả execution

| Test Case ID                                                             | Module       | Tester  | Result | Related Bug | Note                                                                                 |
| ------------------------------------------------------------------------ | ------------ | ------- | ------ | ----------- | ------------------------------------------------------------------------------------ |
| [TC-PRODUCT-CRUD-001](../test-cases/product-crud/TC-PRODUCT-CRUD-001.md) | PRODUCT-CRUD | vt-toan | Pass   | None        | None                                                                                 |
| [TC-PRODUCT-CRUD-002](../test-cases/product-crud/TC-PRODUCT-CRUD-002.md) | PRODUCT-CRUD | vt-toan | Pass   | None        | None                                                                                 |
| [TC-PRODUCT-CRUD-003](../test-cases/product-crud/TC-PRODUCT-CRUD-003.md) | PRODUCT-CRUD | vt-toan | Pass   | None        | None                                                                                 |
| [TC-PRODUCT-CRUD-004](../test-cases/product-crud/TC-PRODUCT-CRUD-004.md) | PRODUCT-CRUD | vt-toan | Pass   | None        | None                                                                                 |
| [TC-PRODUCT-CRUD-005](../test-cases/product-crud/TC-PRODUCT-CRUD-005.md) | PRODUCT-CRUD | vt-toan | Pass   | None        | None                                                                                 |
| [TC-PRODUCT-CRUD-006](../test-cases/product-crud/TC-PRODUCT-CRUD-006.md) | PRODUCT-CRUD | vt-toan | Pass   | None        | None                                                                                 |
| [TC-PRODUCT-CRUD-013](../test-cases/product-crud/TC-PRODUCT-CRUD-013.md) | PRODUCT-CRUD | vt-toan | Pass   | None        | None                                                                                 |
| [TC-PRODUCT-CRUD-014](../test-cases/product-crud/TC-PRODUCT-CRUD-014.md) | PRODUCT-CRUD | vt-toan | Pass   | None        | None                                                                                 |
| [TC-PRODUCT-CRUD-017](../test-cases/product-crud/TC-PRODUCT-CRUD-017.md) | PRODUCT-CRUD | vt-toan | Pass   | None        | None                                                                                 |
| [TC-PRODUCT-CRUD-018](../test-cases/product-crud/TC-PRODUCT-CRUD-018.md) | PRODUCT-CRUD | vt-toan | Pass   | None        | None                                                                                 |
| [TC-PRODUCT-CRUD-025](../test-cases/product-crud/TC-PRODUCT-CRUD-025.md) | PRODUCT-CRUD | vt-toan | Fail   | None        | Cho phép thêm sản phẩm với giá tiền không hợp lệ                                     |
| [TC-PRODUCT-CRUD-026](../test-cases/product-crud/TC-PRODUCT-CRUD-026.md) | PRODUCT-CRUD | vt-toan | Fail   | None        | Cho phép thêm sản phẩm với giá tiền không hợp lệ                                     |
| [TC-PRODUCT-CRUD-027](../test-cases/product-crud/TC-PRODUCT-CRUD-027.md) | PRODUCT-CRUD | vt-toan | Pass   | None        | None                                                                                 |
| [TC-PRODUCT-CRUD-032](../test-cases/product-crud/TC-PRODUCT-CRUD-032.md) | PRODUCT-CRUD | vt-toan | Fail   | None        | Cho phép sửa sản phẩm với giá không hợp lệ                                           |
| [TC-PRODUCT-CRUD-033](../test-cases/product-crud/TC-PRODUCT-CRUD-033.md) | PRODUCT-CRUD | vt-toan | Pass   | None        | None                                                                                 |
| [TC-PRODUCT-CRUD-034](../test-cases/product-crud/TC-PRODUCT-CRUD-034.md) | PRODUCT-CRUD | vt-toan | Fail   | None        | Cho phép sửa sản phẩm với giá không hợp lệ                                           |
| [TC-PRODUCT-CRUD-037](../test-cases/product-crud/TC-PRODUCT-CRUD-037.md) | PRODUCT-CRUD | vt-toan | Pass   | None        | None                                                                                 |
| [TC-PRODUCT-CRUD-039](../test-cases/product-crud/TC-PRODUCT-CRUD-039.md) | PRODUCT-CRUD | vt-toan | Pass   | None        | None                                                                                 |
| [TC-PRODUCT-CRUD-041](../test-cases/product-crud/TC-PRODUCT-CRUD-041.md) | PRODUCT-CRUD | vt-toan | Pass   | None        | None                                                                                 |
| [TC-PRODUCT-CRUD-043](../test-cases/product-crud/TC-PRODUCT-CRUD-043.md) | PRODUCT-CRUD | vt-toan | Pass   | None        | None                                                                                 |
| [TC-PRODUCT-CRUD-051](../test-cases/product-crud/TC-PRODUCT-CRUD-051.md) | PRODUCT-CRUD | vt-toan | Pass   | None        | None                                                                                 |
| [TC-PRODUCT-CRUD-054](../test-cases/product-crud/TC-PRODUCT-CRUD-054.md) | PRODUCT-CRUD | vt-toan | Pass   | None        | None                                                                                 |
| [TC-PRODUCT-CRUD-073](../test-cases/product-crud/TC-PRODUCT-CRUD-073.md) | PRODUCT-CRUD | vt-toan | Pass   | None        | None                                                                                 |
| [TC-PRODUCT-CRUD-075](../test-cases/product-crud/TC-PRODUCT-CRUD-075.md) | PRODUCT-CRUD | vt-toan | Pass   | None        | None                                                                                 |

## Tổng hợp pool

- Tổng số test cases: 24; đã ghi Pass/Fail: 24; Pass: 20; Fail: 4; Blocked: 0; Not Run: 0.
- Ghi chú/ngày cập nhật: 2026-10-13 — cập nhật theo Result do tester cung cấp; tester xác nhận đã execute toàn bộ test cases.
