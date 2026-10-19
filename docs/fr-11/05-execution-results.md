# FR-11 — Kết quả chạy test case

Chạy trên API `http://localhost:3000` và UI `http://localhost:5173`. Script: `scripts/fr11-execute.mjs`.

Tổng: 28. PASS: 23. FAIL: 5. BLOCKED: 0.

| TC | Kết quả | Expected Result | Actual Result |
| --- | --- | --- | --- |
| TC-01 | FAIL | Đúng một đơn. Mã 1. Ngày 15/10/2026. Tiền 30.000.000 ₫. Nhãn pending là tiếng Việt, có màu. Trang một h1. | #1 \| 15/10/2026 \| 30.000.000 ₫ \| Chờ xác nhận. h1 (0): (không có). Lệch: h1 (0): (không có). |
| TC-02 | FAIL | Empty state có icon và message thân thiện. Không có bảng đơn. | (không có đơn). icon: không. message: "Lịch sử đơn hàng Bạn chưa có đơn hàng nào.". Lệch: không có icon. |
| TC-03 | PASS | Đúng hai dòng. Cả hai mã, ngày 15/10/2026, tiền 30.000.000 ₫, nhãn tiếng Việt của pending. | #2 \| 15/10/2026 \| 30.000.000 ₫ \| Chờ xác nhận ; #1 \| 15/10/2026 \| 30.000.000 ₫ \| Chờ xác nhận |
| TC-04 | PASS | Chỉ thấy đơn id=1. Đơn của admin không xuất hiện. | #1 \| 15/10/2026 \| 30.000.000 ₫ \| Chờ xác nhận |
| TC-05 | PASS | Chỉ thấy đơn id=1. Đơn user_id=3 không xuất hiện. | #1 \| 15/10/2026 \| 30.000.000 ₫ \| Chờ xác nhận |
| TC-06 | PASS | Thấy mã 0, ngày 15/10/2026, tiền 30.000.000 ₫. | #0 \| 15/10/2026 \| 30.000.000 ₫ \| Chờ xác nhận |
| TC-07 | PASS | Thấy đúng một đơn, mã 2. | #2 \| 15/10/2026 \| 30.000.000 ₫ \| Chờ xác nhận |
| TC-08 | PASS | Nhãn tiếng Việt của confirmed, màu khác bốn trạng thái kia. Vẫn hiện mã, ngày, tiền chuẩn. | #1 \| 15/10/2026 \| 30.000.000 ₫ \| Đã xác nhận |
| TC-09 | PASS | Nhãn tiếng Việt của shipping, màu khác bốn trạng thái kia. | #1 \| 15/10/2026 \| 30.000.000 ₫ \| Đang giao |
| TC-10 | PASS | Đơn vẫn trong lịch sử. Nhãn tiếng Việt của delivered, màu khác bốn trạng thái kia. | #1 \| 15/10/2026 \| 30.000.000 ₫ \| Đã giao |
| TC-11 | PASS | Đơn vẫn trong lịch sử. Nhãn tiếng Việt của canceled, màu khác bốn trạng thái kia. | #1 \| 15/10/2026 \| 30.000.000 ₫ \| Đã hủy |
| TC-12 | PASS | Tiền hiện -1 ₫. | #1 \| 15/10/2026 \| -1 ₫ \| Chờ xác nhận |
| TC-13 | PASS | Tiền hiện 0 ₫. | #1 \| 15/10/2026 \| 0 ₫ \| Chờ xác nhận |
| TC-14 | PASS | Tiền hiện 1 ₫. | #1 \| 15/10/2026 \| 1 ₫ \| Chờ xác nhận |
| TC-15 | PASS | Tiền hiện 999 ₫. | #1 \| 15/10/2026 \| 999 ₫ \| Chờ xác nhận |
| TC-16 | PASS | Tiền hiện 1.000 ₫. | #1 \| 15/10/2026 \| 1.000 ₫ \| Chờ xác nhận |
| TC-17 | PASS | Tiền hiện 1.001 ₫. | #1 \| 15/10/2026 \| 1.001 ₫ \| Chờ xác nhận |
| TC-18 | PASS | Tiền hiện 999.999 ₫. | #1 \| 15/10/2026 \| 999.999 ₫ \| Chờ xác nhận |
| TC-19 | PASS | Tiền hiện 1.000.000 ₫. | #1 \| 15/10/2026 \| 1.000.000 ₫ \| Chờ xác nhận |
| TC-20 | PASS | Tiền hiện 1.000.001 ₫. | #1 \| 15/10/2026 \| 1.000.001 ₫ \| Chờ xác nhận |
| TC-21 | FAIL | Đơn vẫn hiện mã, tiền 30.000.000 ₫, nhãn pending. Ô ngày không bịa một ngày. Trang không lỗi. | #1 \| 1/1/1970 \| 30.000.000 ₫ \| Chờ xác nhận. Lệch: ô ngày bịa "1/1/1970". |
| TC-22 | FAIL | Đơn vẫn hiện mã, ngày 15/10/2026, nhãn pending. Ô tiền không hiện 0 ₫. Trang không lỗi. | #1 \| 15/10/2026 \| 0 ₫ \| Chờ xác nhận. Lệch: tiền bịa 0 ₫. |
| TC-23 | PASS | Đơn vẫn hiện mã, ngày, tiền chuẩn. Nhãn không phải nhãn của năm trạng thái FR-10. Trang không lỗi. | #1 \| 15/10/2026 \| 30.000.000 ₫ \| RETURNED |
| TC-24 | PASS | Không thấy mã 1 và không thấy 30.000.000 ₫. | Trang yêu cầu đăng nhập. Không có bảng đơn. |
| TC-25 | PASS | Bị từ chối. Thân response không phải danh sách chứa đơn id=1. | HTTP 401. {"error":"Unauthorized"} |
| TC-26 | PASS | Bị từ chối. Thân response không phải danh sách chứa đơn id=1. | HTTP 403. {"error":"Forbidden"} |
| TC-27 | PASS | HTTP không phải lỗi. JSON chỉ có đơn id=1 của user 2, giống lúc không gửi query. | HTTP 200. Đơn: #1 user 2. |
| TC-28 | FAIL | Nhấn Tab từ đầu trang: mỗi phần tử nhận focus tiếp theo không nằm phía trên phần tử trước; cùng hàng thì nằm bên phải (FR-21). | Thứ tự focus: EShop(16,16) → Giỏ hàng(986,20) → Chào, Test User(1067,20) → Thoát(1198,16) → Test User(169,267) → INPUT(169,353) → TEXTAREA(169,439) → Cập nhật(169,557) → Hủy đơn(1015,204) → Hủy đơn(1015,247). Lệch: "Cập nhật"(169,557) → "Hủy đơn"(1015,204). |
## Tóm tắt lệch

- TC-01: đơn, ngày, tiền `30.000.000 ₫` và nhãn `Chờ xác nhận` đúng. Trang không có `h1` (BUG-10).
- TC-02: có câu "Bạn chưa có đơn hàng nào." nhưng không có icon (BUG-11).
- TC-21 và TC-22: NULL hiện thành `1/1/1970` và `0 ₫`. FR-11 không quy định dữ liệu NULL. BUG-12 và BUG-13 đã kết luận không phải bug.
- TC-28: từ "Cập nhật" (y=557) focus nhảy lên "Hủy đơn" (y=204). FR-21 yêu cầu Tab đi từ trên xuống dưới, trái sang phải. Đây là BUG-24.
- Các test còn lại PASS: đơn của người khác không hiện, năm trạng thái có nhãn tiếng Việt và màu khác nhau, mốc tiền đúng `₫`, khách chưa đăng nhập không thấy đơn, API thiếu token trả 401, token sai trả 403, query `user_id=1` không đổi tập đơn.

Lượt chạy ngày 18/10/2026 (UTC+7). Ảnh thứ tự Tab: `docs/bugs/fr11-TC-28.png`.
