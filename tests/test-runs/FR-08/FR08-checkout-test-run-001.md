# Test Run — FR-08 Thanh toán (Checkout)

## Phạm vi và môi trường

- Phạm vi: 9 test case FR-08 hiện hành, giữ nguyên ID.
- Ngày đánh giá: 2026-10-10.
- Hình thức: Chạy tay, manual step theo steps AI và rà soát mã nguồn frontend và backend theo yêu cầu FR-08.
- [Danh mục test case](../../test-cases/FR-08/README.md) · [Phân tích FR-08](../../test-cases/FR-08/FR08-checkout-test-cases.md) · [Báo cáo tổng hợp](../../test-summary/FR-08/FR08-checkout-test-summary-001.md).

## Cách ghi kết quả

1. Đối chiếu từng test case với yêu cầu FR-08 và luồng xử lý, chạy theo từng bước trên giao diện và kiểm tra lại dưới mã nguồn .
2. `Pass`/`Fail` dưới đây là kết quả khi thực hiện manual test.
3. `Chưa kết luận` dùng khi FR-08 chưa quy định expected result đủ rõ.


## Kết quả kiểm thử

| Test Case ID | Module | Result | Ghi nhận |
|---|---|---|---|
| [TC-FR-08-CHECKOUT-001](../../test-cases/FR-08/TC-FR-08-CHECKOUT-001.md) | FR-08 CHECKOUT | Fail | API nhận tổng tiền từ client; luồng checkout không gọi xóa giỏ hàng sau khi thành công. |
| [TC-FR-08-CHECKOUT-002](../../test-cases/FR-08/TC-FR-08-CHECKOUT-002.md) | FR-08 CHECKOUT | Pass | Trang giỏ hàng chuyển người chưa đăng nhập tới đăng nhập; API checkout có middleware xác thực. |
| [TC-FR-08-CHECKOUT-003](../../test-cases/FR-08/TC-FR-08-CHECKOUT-003.md) | FR-08 CHECKOUT | Fail | Handler checkout đưa `total_amount` trong request vào bản ghi đơn hàng, không tính lại từ giỏ. |
| [TC-FR-08-CHECKOUT-004](../../test-cases/FR-08/TC-FR-08-CHECKOUT-004.md) | FR-08 CHECKOUT | Fail | Cùng luồng xử lý: giá trị tổng tiền client gửi được lưu trực tiếp. |
| [TC-FR-08-CHECKOUT-005](../../test-cases/FR-08/TC-FR-08-CHECKOUT-005.md) | FR-08 CHECKOUT | Fail | Giao diện checkout hiển thị tổng tiền bằng trường nhập số có thể chỉnh sửa. |
| [TC-FR-08-CHECKOUT-006](../../test-cases/FR-08/TC-FR-08-CHECKOUT-006.md) | FR-08 CHECKOUT | Pass | Giao diện duyệt danh sách giỏ hàng và hiển thị các dòng sản phẩm cùng số lượng. |
| [TC-FR-08-CHECKOUT-007](../../test-cases/FR-08/TC-FR-08-CHECKOUT-007.md) | FR-08 CHECKOUT | Fail | Nhánh thành công cập nhật trạng thái giao diện; không gọi `clearCart()`. |
| [TC-FR-08-CHECKOUT-008](../../test-cases/FR-08/TC-FR-08-CHECKOUT-008.md) | FR-08 CHECKOUT | Chưa kết luận | FR-08 không quy định rõ kết quả checkout khi giỏ hàng rỗng. |
| [TC-FR-08-CHECKOUT-009](../../test-cases/FR-08/TC-FR-08-CHECKOUT-009.md) | FR-08 CHECKOUT | Fail | Handler không đọc/tính lại các mặt hàng hiện tại; sử dụng tổng tiền từ request gửi lên. |

## Tổng hợp

- Tổng số test case đã rà soát mã nguồn: 9.
- Pass: 2; Fail: 6; chưa kết luận: 1.
- Test runtime Pass/Fail: chưa có dữ liệu.
- Bằng chứng runtime/bug report: chưa ghi nhận trong đợt rà soát này.
- Ngày cập nhật: 2026-10-17.
