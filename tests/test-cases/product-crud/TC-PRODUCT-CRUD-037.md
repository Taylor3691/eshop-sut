# TC-PRODUCT-CRUD-037: Thêm mới sản phẩm hợp lệ

## Requirement ID

FR-15; FR-12

## Module / Test Type / Technique

PRODUCT-CRUD / Functional / Equivalence Partitioning

## Preconditions

- Chuẩn bị tài khoản và dữ liệu theo [hướng dẫn của pool](README.md).
- Ghi lại hoặc chụp màn hình dữ liệu trước khi thử. Mỗi case bắt đầu từ dữ liệu đã kiểm tra; không khởi động lại hệ thống giữa lúc thử và kiểm tra kết quả.
- Đăng nhập M tại `http://localhost:5174`, mở mục Sản phẩm; có ba sản phẩm thử P/Q/R theo README.

## Test Data

| Field | Value |
|---|---|
| Tên sản phẩm | `PC sản phẩm mới` |
| Giá tiền | `100000` |
| Mô tả | `Mô tả kiểm tra sản phẩm` |
| URL Ảnh | `http://localhost:5174/favicon.svg` |
| Danh mục | `Phụ kiện` |

## Test Steps

1. Ghi tên/giá của P/Q/R đang hiển thị. Khi cần đối chiếu đủ năm ô, bấm Sửa từng sản phẩm để đọc, rồi bấm Hủy sửa mà không lưu.
2. Bấm Hủy sửa nếu cần để thấy Thêm sản phẩm mới. Điền đủ năm ô theo Test Data.
3. Bấm Lưu sản phẩm; ghi thông báo và tìm sản phẩm vừa thêm.
4. Quan sát danh sách ngay sau thao tác; ghi lại tên/giá của sản phẩm thử và P/Q/R trước khi tải lại.
5. Tải lại trang, mở lại mục Sản phẩm; bấm Sửa đúng sản phẩm cần kiểm tra để đọc đủ Tên, Giá, Mô tả, URL Ảnh và Danh mục. Không bấm Lưu trong bước đọc.
6. Đối chiếu P/Q/R với ghi chép trước khi thử; chỉ thao tác với dữ liệu thử của mình.

## Expected Result

- Thêm đúng một sản phẩm có đủ năm giá trị Test Data; vẫn đúng sau tải lại.
- P/Q/R không đổi, kể cả trước tải lại.

## Status / Related Bugs

Not Run / None
