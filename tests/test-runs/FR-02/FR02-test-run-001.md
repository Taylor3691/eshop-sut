# Test Run — FR-02 Đăng nhập và khóa tài khoản

## Phạm vi và môi trường

- Run ID: TR-FR02-001.
- Phạm vi: 39 test case sau khi loại 6 ID trùng theo báo cáo hiện có.
- Nguồn kết quả: [FR02 test report](../../test-summary/FR-02/FR02-test-report.md), trong đó có Result, Response và mô tả actual result.
- Test case: [Danh mục FR-02](../../test-cases/FR-02/README.md).
- Môi trường ghi trong báo cáo nguồn: Backend API, web login và SQLite; phiên bản build/trình duyệt không được ghi lại.
- Tài khoản thử được nêu trong báo cáo nguồn: `test@eshop.com`; dữ liệu chi tiết theo từng case trong báo cáo.
- Ngày chạy: Ngày đánh giá: 2026-10-10.

## Kết quả execution

| Test Case ID | Module | Result | Related Bug / ghi chú |
|---|---|---|---|
| TC-FR-02-LOGIN-001–006 | FR-02 LOGIN | Pass | Kết quả từng case tại [báo cáo FR-02](../../test-summary/FR-02/FR02-test-report.md). |
| TC-FR-02-LOGIN-007 | FR-02 LOGIN | Fail | Bộ đếm tăng sai; thuộc nhóm counter/threshold. |
| TC-FR-02-LOGIN-009 | FR-02 LOGIN | Fail | Bộ đếm không tăng đúng 1. |
| TC-FR-02-LOGIN-010 | FR-02 LOGIN | Pass | Bộ đếm có tăng, dù giá trị ghi nhận không đúng kỳ vọng ở case khác. |
| TC-FR-02-LOGIN-011–013 | FR-02 LOGIN | Fail | Sai bộ đếm/ngưỡng khóa. |
| TC-FR-02-LOGIN-014–015 | FR-02 LOGIN | Pass | Khóa vẫn được duy trì ở các điều kiện đã ghi nhận. |
| TC-FR-02-LOGIN-016 | FR-02 LOGIN | Pass | Kết quả tại mốc 30 giây được ghi Pass trong báo cáo; expected cần xác nhận tính bao gồm của mốc. |
| TC-FR-02-LOGIN-017 | FR-02 LOGIN | Fail | Tài khoản vẫn bị khóa sau thời gian đã nêu. |
| TC-FR-02-LOGIN-021–023, 025–028 | FR-02 LOGIN | Pass | Các kết quả đăng nhập khóa/JWT/header được ghi trong báo cáo nguồn; TC-024 đã loại trùng. |
| TC-FR-02-LOGIN-029 | FR-02 LOGIN | Fail | Trường email không dùng `type="email"`. |
| TC-FR-02-LOGIN-030 | FR-02 LOGIN | Pass | Email rỗng bị chặn theo kết quả ghi nhận. |
| TC-FR-02-LOGIN-031 | FR-02 LOGIN | Fail | Form không chặn chuỗi sai định dạng bằng HTML5. |
| TC-FR-02-LOGIN-032 | FR-02 LOGIN | Pass | Email hợp lệ được chấp nhận theo kết quả ghi nhận. |
| TC-FR-02-LOGIN-034–036 | FR-02 LOGIN | Fail | Thiếu/để rỗng JWT hoặc response chứa plaintext password. |
| TC-FR-02-LOGIN-037 | FR-02 LOGIN | Pass | Thông báo lỗi chung. |
| TC-FR-02-LOGIN-038 | FR-02 LOGIN | Fail | Không hiển thị thông báo tài khoản đang bị khóa. |
| TC-FR-02-LOGIN-039–045 | FR-02 LOGIN | Pass | Các kết quả thông báo lỗi và xử lý token được ghi trong báo cáo nguồn. |



## Tổng hợp

- Tổng số case được tính: 39.
- Pass: 27; Fail: 12; Not Run/Blocked: 0 theo báo cáo nguồn.
- Các nhóm lỗi: bộ đếm/ngưỡng khóa; thời gian khóa; validate email HTML5; xử lý JWT ở client; plaintext password trong response; thông báo tài khoản bị khóa.
- Chi tiết actual result và lịch sử kết quả: [FR02 test report](../../test-summary/FR-02/FR02-test-report.md).

## Giới hạn thông tin

