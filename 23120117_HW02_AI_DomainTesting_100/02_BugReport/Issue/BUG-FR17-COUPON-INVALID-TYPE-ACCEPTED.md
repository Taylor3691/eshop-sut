# [BUG][FR-17] API tạo coupon chấp nhận type ngoài tập hợp

**Trạng thái:** Open  
**Testcase phát hiện:** `TC-COUPON-006`

## Các bước tái hiện

1. Đăng nhập bằng tài khoản admin hợp lệ.
2. Gửi `POST /api/admin/coupons` với dữ liệu coupon hợp lệ nhưng đặt `type = "other"`.
3. Quan sát HTTP status và dữ liệu được tạo.

## Kết quả thực tế

API trả HTTP `200` và tạo coupon với `type = "other"`.

## Kết quả mong đợi

API phải từ chối bằng HTTP `400` khi `type` không thuộc tập `percent`, `fixed`.

## Đề xuất sửa

- Chỉ chấp nhận `percent` hoặc `fixed` tại endpoint tạo coupon.
- Thêm `CHECK (type IN ('percent', 'fixed'))` và `NOT NULL` trong database.
- Dùng chung validator cho API và các luồng tạo coupon, đồng thời bổ sung test API cho giá trị ngoài tập.
