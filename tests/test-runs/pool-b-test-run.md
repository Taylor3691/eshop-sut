# Test Run — Pool B / Trạng thái đơn hàng

## Phạm vi và môi trường

- Toàn bộ **18 cases hiện hành**, giữ ID gốc.
- Ngày/đợt chạy: [Điền].
- Phiên bản hệ thống/commit: [Điền].
- Máy tính/trình duyệt/phiên bản: [Điền].
- Tài khoản và dữ liệu thực tế: [Điền theo hướng dẫn pool].
- [Hướng dẫn chuẩn bị](../test-cases/order-state/README.md) · [Phân tích](../test-summary/order-state-analysis.md) · [Ma trận](../test-summary/traceability-matrix.md).

## Cách điền

1. Mở case qua liên kết, làm theo Preconditions và Test Steps.
2. Điền Tester, ngày/giờ, dữ liệu thử thực tế và Actual Result trong Note.
3. Result dùng `Not Run`, `Pass`, `Fail` hoặc `Blocked`. Chưa chạy giữ Not Run. Không chuẩn bị được dữ liệu/không đến được bước cần thử thì ghi Blocked kèm lý do.
4. Nếu Fail, liên kết bug report ở Related Bug; giữ ảnh màn hình và mô tả điều mong đợi/điều thực tế.
5. Cập nhật tổng hợp bằng tay sau mỗi đợt. Kết quả cũ không tự xác nhận phiên bản bước mới đã chạy.

## Kết quả execution

| Test Case ID | Module | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| [TC-ORDER-STATE-004](../test-cases/order-state/TC-ORDER-STATE-004.md) | ORDER-STATE | vt-toan | Not Run | None | Quản trị viên hủy đơn Chờ xác nhận; Actual Result/ngày chạy: ... |
| [TC-ORDER-STATE-005](../test-cases/order-state/TC-ORDER-STATE-005.md) | ORDER-STATE | vt-toan | Not Run | None | Quản trị viên hủy đơn Đã xác nhận; Actual Result/ngày chạy: ... |
| [TC-ORDER-STATE-006](../test-cases/order-state/TC-ORDER-STATE-006.md) | ORDER-STATE | vt-toan | Not Run | None | Không cho chuyển đơn Chờ xác nhận sang Đang giao; Actual Result/ngày chạy: ... |
| [TC-ORDER-STATE-008](../test-cases/order-state/TC-ORDER-STATE-008.md) | ORDER-STATE | vt-toan | Not Run | None | Không cho chuyển đơn Đã xác nhận sang Chờ xác nhận; Actual Result/ngày chạy: ... |
| [TC-ORDER-STATE-009](../test-cases/order-state/TC-ORDER-STATE-009.md) | ORDER-STATE | vt-toan | Not Run | None | Không cho chuyển đơn Đã xác nhận sang Đã giao; Actual Result/ngày chạy: ... |
| [TC-ORDER-STATE-011](../test-cases/order-state/TC-ORDER-STATE-011.md) | ORDER-STATE | vt-toan | Not Run | None | Không cho chuyển đơn Đang giao sang Đã xác nhận; Actual Result/ngày chạy: ... |
| [TC-ORDER-STATE-012](../test-cases/order-state/TC-ORDER-STATE-012.md) | ORDER-STATE | vt-toan | Not Run | None | Không cho chuyển đơn Đã giao sang Chờ xác nhận; Actual Result/ngày chạy: ... |
| [TC-ORDER-STATE-015](../test-cases/order-state/TC-ORDER-STATE-015.md) | ORDER-STATE | vt-toan | Not Run | None | Không cho chuyển đơn Đã giao sang Đã hủy; Actual Result/ngày chạy: ... |
| [TC-ORDER-STATE-016](../test-cases/order-state/TC-ORDER-STATE-016.md) | ORDER-STATE | vt-toan | Not Run | None | Không cho chuyển đơn Đã hủy sang Chờ xác nhận; Actual Result/ngày chạy: ... |
| [TC-ORDER-STATE-019](../test-cases/order-state/TC-ORDER-STATE-019.md) | ORDER-STATE | vt-toan | Not Run | None | Không cho chuyển đơn Đã hủy sang Đã giao; Actual Result/ngày chạy: ... |
| [TC-ORDER-STATE-021](../test-cases/order-state/TC-ORDER-STATE-021.md) | ORDER-STATE | vt-toan | Not Run | None | Khách hàng hủy đơn Đã xác nhận; Actual Result/ngày chạy: ... |
| [TC-ORDER-STATE-022](../test-cases/order-state/TC-ORDER-STATE-022.md) | ORDER-STATE | vt-toan | Not Run | None | Khách hàng không được hủy đơn Đang giao; Actual Result/ngày chạy: ... |
| [TC-ORDER-STATE-023](../test-cases/order-state/TC-ORDER-STATE-023.md) | ORDER-STATE | vt-toan | Not Run | None | Khách hàng không được hủy đơn Đã giao; Actual Result/ngày chạy: ... |
| [TC-ORDER-STATE-025](../test-cases/order-state/TC-ORDER-STATE-025.md) | ORDER-STATE | vt-toan | Not Run | None | Khách hàng không được quản lý trạng thái đơn hàng; Actual Result/ngày chạy: ... |
| [TC-ORDER-STATE-041](../test-cases/order-state/TC-ORDER-STATE-041.md) | ORDER-STATE | vt-toan | Not Run | None | Xác nhận, giao hàng và hoàn thành một đơn; Actual Result/ngày chạy: ... |
| [TC-ORDER-STATE-046](../test-cases/order-state/TC-ORDER-STATE-046.md) | ORDER-STATE | vt-toan | Not Run | None | Khách hàng hủy đơn Chờ xác nhận; Actual Result/ngày chạy: ... |
| [TC-ORDER-STATE-051](../test-cases/order-state/TC-ORDER-STATE-051.md) | ORDER-STATE | vt-toan | Not Run | None | Không hủy được đơn đã giao đi từ trang chưa tải lại; Actual Result/ngày chạy: ... |
| [TC-ORDER-STATE-052](../test-cases/order-state/TC-ORDER-STATE-052.md) | ORDER-STATE | vt-toan | Not Run | None | Không chuyển đơn đã hủy sang Đang giao từ trang chưa tải lại; Actual Result/ngày chạy: ... |

## Tổng hợp pool

- Tổng số test cases: 18; đã ghi Pass/Fail: 0; Pass: 0; Fail: 0; Blocked: 0; Not Run: 18.
- Ghi chú/ngày cập nhật: [Điền].
