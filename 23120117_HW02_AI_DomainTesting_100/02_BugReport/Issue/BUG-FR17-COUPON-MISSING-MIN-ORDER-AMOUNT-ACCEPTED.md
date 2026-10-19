# [BUG][FR-17] Hệ thống chấp nhận coupon thiếu min_order_amount

**Trạng thái:** Open  
**Testcase phát hiện:** `TC-COUPON-010`

## Các bước tái hiện

1. Đăng nhập trang quản trị và mở chức năng **Mã Giảm Giá**.
2. Nhập các trường coupon hợp lệ nhưng để trống `Đơn tối thiểu (₫)`.
3. Bấm **Tạo mã** và quan sát response.

## Kết quả thực tế

API trả HTTP `200` và tạo coupon khi `min_order_amount` bị thiếu.

## Kết quả mong đợi

`min_order_amount` là trường bắt buộc; dữ liệu thiếu phải bị từ chối.

## Đề xuất sửa

- Kiểm tra trường được cung cấp, là số hữu hạn và `>= 0` tại backend; trả HTTP `400` khi sai.
- Thêm `required` và `min="0"` cho input frontend.
- Bổ sung `NOT NULL` và `CHECK (min_order_amount >= 0)` trong schema cùng test API cho giá trị thiếu, rỗng và `null`.
