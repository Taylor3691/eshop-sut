# TC-PRODUCT-CRUD-033: Sửa sản phẩm với giá 1

## Requirement ID

FR-15; FR-12

## Module / Test Type / Technique

PRODUCT-CRUD / Functional / BVA

## Preconditions

- Chuẩn bị tài khoản và dữ liệu theo [hướng dẫn của pool](README.md).
- Ghi lại hoặc chụp màn hình dữ liệu trước khi thử. Mỗi case bắt đầu từ dữ liệu đã kiểm tra; không khởi động lại hệ thống giữa lúc thử và kiểm tra kết quả.
- Đăng nhập M tại `http://localhost:5174`, mở mục Sản phẩm; có ba sản phẩm thử P/Q/R theo README.

## Test Data

| Field | Value |
|---|---|
| Tên sản phẩm | `PC sản phẩm mới` |
| Giá tiền | `1` |
| Mô tả | `Mô tả kiểm tra sản phẩm` |
| URL Ảnh | `http://localhost:5174/favicon.svg` |
| Danh mục | `Phụ kiện` |

## Test Steps

1. Ghi tên/giá của P/Q/R đang hiển thị. Khi cần đối chiếu đủ năm ô, bấm Sửa từng sản phẩm để đọc, rồi bấm Hủy sửa mà không lưu.
2. Bấm Sửa đúng dòng sản phẩm P.
3. Điền các ô theo Test Data. Xóa ô Giá tiền và nhập `1`.
4. Ghi nhận giá trị thực tế trong ô. Nếu chữ bị chặn hoặc ô trở thành rỗng, ghi điều đó; không thay bằng một giá trị hợp lệ rồi coi là đã thử dữ liệu sai.
5. Bấm Lưu sản phẩm nếu có thể và ghi phản hồi.
6. Quan sát danh sách ngay sau thao tác; ghi lại tên/giá của sản phẩm thử và P/Q/R trước khi tải lại.
7. Tải lại trang, mở lại mục Sản phẩm; bấm Sửa đúng sản phẩm cần kiểm tra để đọc đủ Tên, Giá, Mô tả, URL Ảnh và Danh mục. Không bấm Lưu trong bước đọc.
8. Đối chiếu P/Q/R với ghi chép trước khi thử; chỉ thao tác với dữ liệu thử của mình.

## Expected Result

- Chỉ P được sửa với giá 1 và các ô đúng Test Data.
- Các sản phẩm khác giữ nguyên trước và sau tải lại.

## Status / Related Bugs

Not Run / None
