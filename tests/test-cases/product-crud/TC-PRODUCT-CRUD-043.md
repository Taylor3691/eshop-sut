# TC-PRODUCT-CRUD-043: Xóa đúng sản phẩm thử

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
| Sản phẩm cần xóa | `P — chưa từng thêm vào giỏ hoặc đơn hàng` |

## Test Steps

1. Ghi tên/giá của P/Q/R đang hiển thị. Khi cần đối chiếu đủ năm ô, bấm Sửa từng sản phẩm để đọc, rồi bấm Hủy sửa mà không lưu.
2. Bấm Xóa trên đúng dòng P. Nếu có hộp xác nhận, kiểm tra đúng sản phẩm rồi đồng ý.
3. Ghi phản hồi; kiểm tra P biến mất và Q/R vẫn còn.
4. Tải lại trang, mở mục Sản phẩm và kiểm tra lại danh sách.

## Expected Result

- P được xóa và không xuất hiện lại sau tải lại; Q/R cùng các sản phẩm khác giữ nguyên.

## Status / Related Bugs

Not Run / None
