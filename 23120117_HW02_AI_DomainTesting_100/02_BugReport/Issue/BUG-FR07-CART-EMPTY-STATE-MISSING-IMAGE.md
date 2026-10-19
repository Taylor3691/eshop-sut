# [BUG][FR-07] Trạng thái giỏ hàng trống thiếu hình minh họa

**Trạng thái:** Open  
**Testcase phát hiện:** `TC-BVA-FR07-001`, `TC-CART-002`

## Các bước tái hiện

1. Đảm bảo giỏ hàng không có sản phẩm.
2. Mở trang Giỏ hàng tại `http://localhost:5173/cart`.
3. Quan sát empty state trong vùng nội dung chính.

## Kết quả thực tế

Trang hiển thị dòng “Giỏ hàng của bạn đang trống” và liên kết “Tiếp tục mua sắm”, nhưng không có hình minh họa. Cypress không tìm thấy phần tử `img` trong `main`.

## Kết quả mong đợi

Giỏ hàng trống phải hiển thị đồng thời hình minh họa và thông báo rõ ràng theo FR-07.

## Đề xuất sửa

- Bổ sung hình minh họa empty-cart vào nhánh giỏ hàng trống, đặt trong vùng nội dung chính và có `alt` phù hợp.
- Dùng asset cục bộ hoặc component icon ổn định, không phụ thuộc URL ảnh ngoài.
- Bổ sung kiểm thử UI và accessibility cho hình minh họa.
