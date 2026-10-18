# Test Run — FR-15 Quản lý sản phẩm / Mobile

## Phạm vi và môi trường

- Run ID: TR-FR15M-001.
- Phạm vi: 10 test case trong [danh mục FR-15 Mobile](../../test-cases/FR-15-mobile/README.md).
- Requirement oracle: README hệ thống, FR-15; quyền thao tác Admin tham chiếu FR-12.
- Hình thức đánh giá:đánh giá manual và sử dụng AI tóm tắt, rà soát mã nguồn Admin UI, backend product API, schema và luồng đọc catalog mobile.
- Ngày đánh giá mã nguồn: 2026-10-19.

## Kết quả

| Test Case ID | Module | Result | Ghi nhận |
|---|---|---|---|
| [TC-FR-15-PRODUCT-MOBILE-001](../../test-cases/FR-15-mobile/TC-FR-15-PRODUCT-MOBILE-001.md) | FR-15 MOBILE | Pass | API tạo sản phẩm ghi dữ liệu; mobile tải danh sách sản phẩm từ API và có thể hiển thị sản phẩm mới sau khi tải lại. |
| [TC-FR-15-PRODUCT-MOBILE-002](../../test-cases/FR-15-mobile/TC-FR-15-PRODUCT-MOBILE-002.md) | FR-15 MOBILE | Pass | API cập nhật theo ID sản phẩm; mobile tải lại dữ liệu từ backend. |
| [TC-FR-15-PRODUCT-MOBILE-003](../../test-cases/FR-15-mobile/TC-FR-15-PRODUCT-MOBILE-003.md) | FR-15 MOBILE | Pass | Câu lệnh SQL update giới hạn theo `WHERE id = ?`, nên chỉ cập nhật bản ghi mục tiêu trong DB. |
| [TC-FR-15-PRODUCT-MOBILE-004](../../test-cases/FR-15-mobile/TC-FR-15-PRODUCT-MOBILE-004.md) | FR-15 MOBILE | Pass | API xóa theo ID; mobile tải lại catalog từ danh sách sản phẩm hiện có. |
| [TC-FR-15-PRODUCT-MOBILE-005](../../test-cases/FR-15-mobile/TC-FR-15-PRODUCT-MOBILE-005.md) | FR-15 MOBILE | Pass | Backend/schema không cắt hoặc từ chối tên 254/255 ký tự; dữ liệu được lưu dưới kiểu TEXT. Runtime cần xác nhận trên môi trường thực. |
| [TC-FR-15-PRODUCT-MOBILE-006](../../test-cases/FR-15-mobile/TC-FR-15-PRODUCT-MOBILE-006.md) | FR-15 MOBILE | Fail | API tạo sản phẩm không kiểm tra giới hạn độ dài tên; schema SQLite dùng TEXT và không đặt giới hạn 255 ký tự. |
| [TC-FR-15-PRODUCT-MOBILE-007](../../test-cases/FR-15-mobile/TC-FR-15-PRODUCT-MOBILE-007.md) | FR-15 MOBILE | Fail | API không kiểm tra tên rỗng; schema cho phép `name` null và chuỗi rỗng. |
| [TC-FR-15-PRODUCT-MOBILE-008](../../test-cases/FR-15-mobile/TC-FR-15-PRODUCT-MOBILE-008.md) | FR-15 MOBILE | Pass | Giá trị 1 là dương và không có kiểm tra backend/schema từ chối giá trị dương. |
| [TC-FR-15-PRODUCT-MOBILE-009](../../test-cases/FR-15-mobile/TC-FR-15-PRODUCT-MOBILE-009.md) | FR-15 MOBILE | Fail | API không xác thực `price > 0`; cột giá kiểu INTEGER không có ràng buộc CHECK, nên 0 và -1 không bị chặn bởi schema. |
| [TC-FR-15-PRODUCT-MOBILE-010](../../test-cases/FR-15-mobile/TC-FR-15-PRODUCT-MOBILE-010.md) | FR-15 MOBILE | Fail | API không xác thực category bắt buộc; cột `category_id` cho phép NULL và không khai báo foreign key. |

## Tổng hợp

- Tổng số test case: 10.
- Pass: 6; Fail: 4

## Giới hạn

