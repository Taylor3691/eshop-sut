# [BUG][FR-17] Hệ thống chấp nhận coupon thiếu type

**Trạng thái:** Open  
**Testcase phát hiện:** `TC-COUPON-005`

## Các bước tái hiện

1. Đăng nhập bằng tài khoản admin hợp lệ.
2. Gửi `POST /api/admin/coupons` với dữ liệu coupon hợp lệ nhưng đặt `type` là chuỗi rỗng.
3. Quan sát HTTP status và dữ liệu được tạo.

## Kết quả thực tế

API trả HTTP `200` và tạo coupon khi `type = ""`.

## Kết quả mong đợi

API phải từ chối bằng HTTP `400` khi thiếu `type`; không khẳng định nội dung message. Đây là API-level test vì select UI không có lựa chọn rỗng.

## Đề xuất sửa

- Kiểm tra `type` là trường bắt buộc tại endpoint tạo coupon; trả HTTP `400` trước khi ghi dữ liệu.
- Bổ sung `NOT NULL` cho trường `type` trong database.
- Thêm test API cho trường thiếu, chuỗi rỗng và `null`.
