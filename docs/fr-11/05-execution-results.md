# FR-11 — Kết quả chạy test case

Chạy trên API `http://localhost:3000` và UI `http://localhost:5173`. Script: `scripts/fr11-execute.mjs`.

Tổng: 27. PASS: 23. FAIL: 4. BLOCKED: 0.

## Các lệch đã thấy

- TC-01: đơn, ngày, tiền `30.000.000 ₫` và nhãn `Chờ xác nhận` đúng. Trang không có `h1`.
- TC-02: có câu "Bạn chưa có đơn hàng nào." Không có icon.
- TC-21: `created_at` null hiện thành `1/1/1970`.
- TC-22: `total_amount` null hiện thành `0 ₫`.
- TC-03 đến TC-20 và TC-23 đến TC-27: PASS. Đơn của người khác không hiện. Năm trạng thái có nhãn tiếng Việt và màu khác nhau. Mốc tiền đúng dấu `₫`. Khách chưa đăng nhập không thấy đơn. API thiếu token trả 401, token sai trả 403. Query `user_id=1` không đổi tập đơn.

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
