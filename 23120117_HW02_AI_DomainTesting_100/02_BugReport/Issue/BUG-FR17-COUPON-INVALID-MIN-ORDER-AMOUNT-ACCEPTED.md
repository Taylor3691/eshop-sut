# [BUG][FR-17] Hệ thống chấp nhận coupon có min_order_amount âm

**Trạng thái:** Open  
**Testcase phát hiện:** `TC-COUPON-011`

## Các bước tái hiện

1. Đăng nhập trang quản trị và mở chức năng **Mã Giảm Giá**.
2. Nhập các trường coupon hợp lệ, riêng `Đơn tối thiểu (₫) = -1000`.
3. Bấm **Tạo mã** và quan sát response.

## Kết quả thực tế

API trả HTTP `200` và coupon được tạo với `min_order_amount = -1000`.

## Kết quả mong đợi

`min_order_amount` phải là số lớn hơn hoặc bằng `0`; giá trị âm phải bị từ chối.

## Đề xuất sửa

- Chuyển giá trị sang số và kiểm tra `>= 0` tại backend trước khi tạo coupon.
- Thêm `min="0"` cho input frontend để phản hồi sớm.
- Bổ sung `CHECK (min_order_amount >= 0)` trong schema và test API cho `-1`, `0` và giá trị không phải số.
