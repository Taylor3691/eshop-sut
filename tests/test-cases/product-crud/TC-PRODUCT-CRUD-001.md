# TC-PRODUCT-CRUD-001: Thêm sản phẩm với tên 0 ký tự

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
| Tên sản phẩm | `(để trống, không nhập dấu ngoặc)` |
| Giá tiền | `100000` |
| Mô tả | `Mô tả kiểm tra sản phẩm` |
| URL Ảnh | `http://localhost:5174/favicon.svg` |
| Danh mục | `Phụ kiện` |

## Test Steps

1. Ghi tên/giá của P/Q/R đang hiển thị. Khi cần đối chiếu đủ năm ô, bấm Sửa từng sản phẩm để đọc, rồi bấm Hủy sửa mà không lưu.
2. Đưa form về Thêm sản phẩm mới; nếu đang sửa, bấm Hủy sửa.
3. Điền các ô theo Test Data. Với tên dài, sao chép toàn bộ chuỗi chữ A trong bảng và dán vào ô Tên sản phẩm; không gõ thêm dấu nháy.
4. Bấm Lưu sản phẩm và ghi thông báo. Nếu ô nhập ngăn dán đủ chuỗi hoặc tự cắt bớt, ghi rõ việc đó; không coi chuỗi đã bị cắt là giá trị ban đầu.
5. Quan sát danh sách ngay sau thao tác; ghi lại tên/giá của sản phẩm thử và P/Q/R trước khi tải lại.
6. Tải lại trang, mở lại mục Sản phẩm; bấm Sửa đúng sản phẩm cần kiểm tra để đọc đủ Tên, Giá, Mô tả, URL Ảnh và Danh mục. Không bấm Lưu trong bước đọc.
7. Đối chiếu P/Q/R với ghi chép trước khi thử; chỉ thao tác với dữ liệu thử của mình.

## Expected Result

- Tên không hợp lệ bị chặn; không lưu sản phẩm với tên rỗng hoặc dài quá 255 ký tự.
- Không thêm bản ghi mới; danh sách giữ nguyên.
- Các sản phẩm khác không đổi trước và sau tải lại.

## Status / Related Bugs

Not Run / None
