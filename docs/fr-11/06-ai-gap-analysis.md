# FR-11 — AI gap analysis

Mục 6 của đề: ghi test case hoặc bug mà AI bỏ sót, và lý do. Bộ 27 test case đã phủ đơn của mình, năm trạng thái, biên số đơn, biên mã đơn, biên tiền, ngày null, tiền null, khách chưa đăng nhập, và query `user_id`. Bốn lệch đã chạy được lập thành BUG-10 đến BUG-13.

Các case dưới đây chưa được thêm vào `04-test-cases.md` và chưa chạy, nên chưa có mã BUG mới.

## Test case bị bỏ sót

| ID | Chỗ bỏ sót | Bằng chứng | Lý do |
| --- | --- | --- | --- |
| GAP-11-01 | Ngày đặt sát mốc đổi ngày theo múi giờ máy | `Profile.jsx` hiện ngày bằng `new Date(o.created_at).toLocaleDateString()`. Mức chuẩn đã chạy là `2026-10-15 10:00:00`, cách nửa đêm đủ xa nên không chạm mốc này. Không có case `00:00:00` và không có case giờ khiến ngày local lùi một ngày. | Độ phức tạp của chức năng. Spec chỉ nói "Ngày đặt", không nói múi giờ. Công cụ lấy một ngày giữa ngày làm đại diện cho cả lớp "có ngày". |
| GAP-11-02 | Thứ tự focus bằng phím Tab trên `/profile` | FR-21 bắt Tab đi từ trên xuống, trái sang phải. Bước phân hoạch FR-11 không có biến này. | Chất lượng prompt. Prompt khóa miền vào phiên, quyền, đơn, trạng thái, ngày và tiền. Điều kiện giao diện dùng chung không được nhắc nên không thành lớp. |

Nút hủy trên cùng bảng thuộc FR-10. Bước xác định biến đã để nó ngoài FR-11. Không tính là case bỏ sót của chức năng này.

## Kết quả AI tạo ra nhưng không phải bug

TC-23 (`status=returned` hiện `RETURNED`) được chấm PASS và không lập bug. FR-11 không chốt nhãn cho trạng thái ngoài năm trạng thái của FR-10. Expected không bịa thêm một nhãn tiếng Việt.
