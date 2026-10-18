# FR-08 Checkout — Test Run 001

## Run Information
- Run ID: TR-FR08-001
- Test cases: `../../test-cases/FR-08/README.md`
- Environment: Chưa thiết lập / chưa chạy
- Build/commit: Chưa ghi nhận
- Tester: Chưa ghi nhận
- Date: Chưa chạy
- Run status: Not Started

## Safety / Setup Notes
- Không chạy backend với `backend/database.sqlite` có dữ liệu cần giữ: startup tự reset và seed database.
- Cần môi trường test được phép reset; dùng tài khoản, sản phẩm và cart riêng cho từng ca.
- Endpoint tham chiếu: `POST /api/checkout`; checkout UI ở storefront.

## Execution Log

| Test Case | Status | Actual Result | Evidence / Bug ID |
|---|---|---|---|
| TC-FR-08-CHECKOUT-001 | Not Run | — | — |
| TC-FR-08-CHECKOUT-002 | Not Run | — | — |
| TC-FR-08-CHECKOUT-003 | Not Run | — | — |
| TC-FR-08-CHECKOUT-004 | Not Run | — | — |
| TC-FR-08-CHECKOUT-005 | Not Run | — | — |
| TC-FR-08-CHECKOUT-006 | Not Run | — | — |
| TC-FR-08-CHECKOUT-007 | Not Run | — | — |
| TC-FR-08-CHECKOUT-008 | Not Run | — | — |

## Defect Recording Template
Với mỗi lỗi quan sát được, ghi: Test Case ID, bước tái hiện, dữ liệu, expected theo README, actual, bằng chứng, mức độ ảnh hưởng và Bug ID. Không đánh dấu Pass chỉ dựa trên việc API trả success; phải kiểm tra tổng đơn và cart state.
