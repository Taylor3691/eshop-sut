# TC-PRODUCT-CRUD-039: Sửa đầy đủ các trường của một sản phẩm

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
| Tên sản phẩm | `PC-P Cập nhật` |
| Giá tiền | `150000` |
| Mô tả | `Mô tả mới của sản phẩm P` |
| URL Ảnh | `http://localhost:5174/favicon.svg?case=update` |
| Danh mục | `Điện thoại` |

## Test Steps

1. Ghi tên/giá của P/Q/R đang hiển thị. Khi cần đối chiếu đủ năm ô, bấm Sửa từng sản phẩm để đọc, rồi bấm Hủy sửa mà không lưu.
2. Bấm Sửa ở dòng P; kiểm tra tên cũ đúng P.
3. Điền đủ năm ô theo Test Data, chọn Điện thoại trong danh sách và bấm Lưu sản phẩm.
4. Quan sát danh sách ngay sau thao tác; ghi lại tên/giá của sản phẩm thử và P/Q/R trước khi tải lại.
5. Tải lại trang, mở lại mục Sản phẩm; bấm Sửa đúng sản phẩm cần kiểm tra để đọc đủ Tên, Giá, Mô tả, URL Ảnh và Danh mục. Không bấm Lưu trong bước đọc.
6. Đối chiếu P/Q/R với ghi chép trước khi thử; chỉ thao tác với dữ liệu thử của mình.

## Expected Result

- Chỉ P đổi đúng cả năm giá trị, gồm Danh mục; vẫn đúng sau tải lại.
- Q/R không bị đổi tên hoặc giá ngay sau lưu và sau tải lại.

## Status / Related Bugs

Not Run / None
