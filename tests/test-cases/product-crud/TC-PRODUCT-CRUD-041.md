# TC-PRODUCT-CRUD-041: Xem sản phẩm và mở form sửa không làm thay đổi dữ liệu

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
| Sản phẩm | `P — PC-P Bàn phím` |

## Test Steps

1. Ghi tên/giá của P/Q/R đang hiển thị. Khi cần đối chiếu đủ năm ô, bấm Sửa từng sản phẩm để đọc, rồi bấm Hủy sửa mà không lưu.
2. Bấm Sửa ở dòng P; đối chiếu đủ năm ô với bảng dữ liệu P trong README.
3. Không nhập hoặc lưu; bấm Hủy sửa rồi tải lại trang.
4. Mở lại Sửa P để đọc; đối chiếu P/Q/R với ghi chép ban đầu.

## Expected Result

- Danh sách và form hiển thị đúng dữ liệu P.
- Chỉ xem/mở/hủy form không làm P/Q/R thay đổi.

## Status / Related Bugs

Not Run / None
