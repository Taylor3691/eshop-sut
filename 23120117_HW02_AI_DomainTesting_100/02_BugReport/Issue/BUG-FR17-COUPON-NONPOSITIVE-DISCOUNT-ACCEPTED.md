# [BUG][FR-17] Hệ thống chấp nhận coupon có discount_value không dương

**Trạng thái:** Open  
**Testcase phát hiện:** `TC-BVA-FR17-001`, `TC-COUPON-008`

## Các bước tái hiện

1. Đăng nhập trang quản trị và mở chức năng **Mã Giảm Giá**.
2. Nhập coupon hợp lệ, riêng `discount_value = -10`.
3. Bấm **Tạo mã** và quan sát response.

## Kết quả thực tế

`POST /api/admin/coupons` trả HTTP `200` và coupon có `discount_value = -10` được tạo.

## Kết quả mong đợi

Hệ thống phải từ chối tạo coupon vì `discount_value` bắt buộc là số dương.

## Đề xuất sửa

- Chuyển `discount_value` sang số, kiểm tra hữu hạn và `> 0` tại backend; trả HTTP `400` nếu không đạt.
- Thêm giới hạn `min` phù hợp tại frontend để phản hồi sớm.
- Cân nhắc `NOT NULL` và `CHECK (discount_value > 0)` trong schema; bổ sung test API cho giá trị âm, `0`, rỗng và không phải số.
