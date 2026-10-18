# FR-08 Checkout — Test Summary 001

## Summary
- Run ID: TR-FR08-001
- Scope: FR-08 checkout; FR-09 coupon excluded.
- Execution status: Chưa chạy (Not Started).
- Total test cases: 8.
- Passed: 0 | Failed: 0 | Blocked: 0 | Not Run: 8.
- Defects confirmed: 0 (chưa thực thi, không đồng nghĩa không có defect).

## Requirement Coverage

| Requirement | Coverage | Test Cases |
|---|---|---|
| FR-08.1 Chỉ user đăng nhập checkout | Planned | TC-FR-08-CHECKOUT-001, TC-FR-08-CHECKOUT-002 |
| FR-08.2 Tổng tự tính, không chỉnh trực tiếp | Planned | TC-FR-08-CHECKOUT-001, TC-FR-08-CHECKOUT-005 |
| FR-08.3 Hiển thị đủ sản phẩm | Planned | TC-FR-08-CHECKOUT-006 |
| FR-08.4 Backend tự tính, bỏ qua client total | Planned | TC-FR-08-CHECKOUT-001, TC-FR-08-CHECKOUT-003, TC-FR-08-CHECKOUT-004 |
| FR-08.5 Xóa cart sau thành công | Planned | TC-FR-08-CHECKOUT-001, TC-FR-08-CHECKOUT-007 |

## Findings / Risks
- Chưa có kết quả chạy thực tế.
- README là oracle. API specification minh họa client gửi `total_amount`; code hiện tại lưu trực tiếp giá trị đó và checkout handler không xóa cart. Đây là dấu hiệu rủi ro/ứng viên defect cần xác nhận bằng run, không phải kết quả test đã xác nhận.
- FR-08 chưa định nghĩa checkout với cart rỗng và dữ liệu địa chỉ.

## Reproduction and Expected-versus-Actual Record
Chưa có reproduction vì chưa chạy. Khi chạy, ghi từng bước và so expected theo README với actual; cập nhật trạng thái, bằng chứng và Bug ID tại test run này.

## Human Review Required
1. Review phân tích requirement, partitions và expected results trong test cases.
2. Bổ sung quyết định cho các ambiguity trước khi xem coverage là hoàn tất.
3. Sau khi thực thi, cập nhật số liệu pass/fail/blocked và defect đã xác nhận.
