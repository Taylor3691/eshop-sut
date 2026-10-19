# [BUG][FR-17] Hệ thống chấp nhận coupon thiếu max_uses_per_user

**Trạng thái:** Open  
**Testcase phát hiện:** `TC-COUPON-012`

## Các bước tái hiện

1. Đăng nhập trang quản trị và mở chức năng **Mã Giảm Giá**.
2. Nhập các trường coupon hợp lệ nhưng để trống `Số lần dùng tối đa/người`.
3. Bấm **Tạo mã** và quan sát response.

## Kết quả thực tế

`POST /api/admin/coupons` trả HTTP `200`; backend tự thay giá trị bị thiếu bằng `1` và tạo coupon.

## Kết quả mong đợi

`max_uses_per_user` là trường bắt buộc và phải là số nguyên lớn hơn hoặc bằng `1`; request thiếu trường phải bị từ chối.

## Đề xuất sửa

- Không dùng fallback `max_uses_per_user || 1` cho trường bắt buộc.
- Kiểm tra trường có mặt, là số nguyên và `>= 1`; trả HTTP `400` nếu sai.
- Thêm `required`, `step="1"`, `min="1"` tại frontend; bổ sung `NOT NULL`, `CHECK (max_uses_per_user >= 1)` và test cho giá trị thiếu, `0`, âm, thập phân.
