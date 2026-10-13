# TC-PRODUCT-CRUD-075: Chuyển lựa chọn từ sản phẩm P sang Q rồi chỉ lưu Q

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
| Tên sản phẩm | `PC-Q Cập nhật` |
| Giá tiền | `210000` |
| Mô tả | `Mô tả Q` |
| URL Ảnh | `http://localhost:5174/favicon.svg` |
| Danh mục | `Phụ kiện` |

## Test Steps

1. Ghi tên/giá của P/Q/R đang hiển thị. Khi cần đối chiếu đủ năm ô, bấm Sửa từng sản phẩm để đọc, rồi bấm Hủy sửa mà không lưu.
2. Bấm Sửa P nhưng chưa nhập hoặc lưu.
3. Bấm Sửa Q, kiểm tra form đã hiện dữ liệu Q.
4. Nhập đủ năm ô theo Test Data và bấm Lưu sản phẩm.
5. Quan sát danh sách ngay sau thao tác; ghi lại tên/giá của sản phẩm thử và P/Q/R trước khi tải lại.
6. Tải lại trang, mở lại mục Sản phẩm; bấm Sửa đúng sản phẩm cần kiểm tra để đọc đủ Tên, Giá, Mô tả, URL Ảnh và Danh mục. Không bấm Lưu trong bước đọc.
7. Đối chiếu P/Q/R với ghi chép trước khi thử; chỉ thao tác với dữ liệu thử của mình.

## Expected Result

- Chỉ Q có dữ liệu mới. P/R và các sản phẩm khác giữ nguyên ngay sau lưu và sau tải lại.

## Status / Related Bugs

Not Run / None
