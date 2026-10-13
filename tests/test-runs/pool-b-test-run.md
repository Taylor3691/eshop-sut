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
2. Điền Tester và thông tin execution thực tế. Với Result = Pass, ghi Note là `None`; với Fail hoặc Blocked, ghi Actual Result hoặc lý do trong Note.
3. Result dùng `Not Run`, `Pass`, `Fail` hoặc `Blocked`. Chưa chạy giữ Not Run. Không chuẩn bị được dữ liệu/không đến được bước cần thử thì ghi Blocked kèm lý do.
4. Nếu Fail, liên kết bug report ở Related Bug; giữ ảnh màn hình và mô tả điều mong đợi/điều thực tế.
5. Cập nhật tổng hợp bằng tay sau mỗi đợt. Kết quả cũ không tự xác nhận phiên bản bước mới đã chạy.

## Kết quả execution


| Test Case ID                                                          | Module      | Tester  | Result | Related Bug | Note                                                                                       |
| --------------------------------------------------------------------- | ----------- | ------- | ------ | ----------- | ------------------------------------------------------------------------------------------ |
| [TC-ORDER-STATE-004](../test-cases/order-state/TC-ORDER-STATE-004.md) | ORDER-STATE | vt-toan | Pass   | None        | None                                                                                       |
| [TC-ORDER-STATE-005](../test-cases/order-state/TC-ORDER-STATE-005.md) | ORDER-STATE | vt-toan | Pass   | None        | None                                                                                       |
| [TC-ORDER-STATE-006](../test-cases/order-state/TC-ORDER-STATE-006.md) | ORDER-STATE | vt-toan | Pass   | None        | None                                                                                       |
| [TC-ORDER-STATE-008](../test-cases/order-state/TC-ORDER-STATE-008.md) | ORDER-STATE | vt-toan | Pass   | None        | None                                                                                       |
| [TC-ORDER-STATE-009](../test-cases/order-state/TC-ORDER-STATE-009.md) | ORDER-STATE | vt-toan | Pass   | None        | None                                                                                       |
| [TC-ORDER-STATE-011](../test-cases/order-state/TC-ORDER-STATE-011.md) | ORDER-STATE | vt-toan | Pass   | None        | None                                                                                       |
| [TC-ORDER-STATE-012](../test-cases/order-state/TC-ORDER-STATE-012.md) | ORDER-STATE | vt-toan | Pass   | None        | None                                                                                       |
| [TC-ORDER-STATE-015](../test-cases/order-state/TC-ORDER-STATE-015.md) | ORDER-STATE | vt-toan | Pass   | None        | None                                                                                       |
| [TC-ORDER-STATE-016](../test-cases/order-state/TC-ORDER-STATE-016.md) | ORDER-STATE | vt-toan | Pass   | None        | None                                                                                       |
| [TC-ORDER-STATE-019](../test-cases/order-state/TC-ORDER-STATE-019.md) | ORDER-STATE | vt-toan | Fail   | [#17](https://github.com/Taylor3691/eshop-sut/issues/17) | Có nút chuyển từ Đã hủy sang Đã giao                                                       |
| [TC-ORDER-STATE-021](../test-cases/order-state/TC-ORDER-STATE-021.md) | ORDER-STATE | vt-toan | Pass   | None        | None                                                                                       |
| [TC-ORDER-STATE-022](../test-cases/order-state/TC-ORDER-STATE-022.md) | ORDER-STATE | vt-toan | Fail   | [#18](https://github.com/Taylor3691/eshop-sut/issues/18) | Khách hàng vẫn hủy được đơn hàng Đang giao                                                 |
| [TC-ORDER-STATE-023](../test-cases/order-state/TC-ORDER-STATE-023.md) | ORDER-STATE | vt-toan | Pass   | None        | None                                                                                       |
| [TC-ORDER-STATE-025](../test-cases/order-state/TC-ORDER-STATE-025.md) | ORDER-STATE | vt-toan | Pass   | None        | None                                                                                       |
| [TC-ORDER-STATE-041](../test-cases/order-state/TC-ORDER-STATE-041.md) | ORDER-STATE | vt-toan | Pass   | None        | None                                                                                       |
| [TC-ORDER-STATE-046](../test-cases/order-state/TC-ORDER-STATE-046.md) | ORDER-STATE | vt-toan | Pass   | None        | None                                                                                       |
| [TC-ORDER-STATE-051](../test-cases/order-state/TC-ORDER-STATE-051.md) | ORDER-STATE | vt-toan | Fail   | [#19](https://github.com/Taylor3691/eshop-sut/issues/19) | Khách hàng hủy được đơn đang giao từ trang profile chưa tải lại                            |
| [TC-ORDER-STATE-052](../test-cases/order-state/TC-ORDER-STATE-052.md) | ORDER-STATE | vt-toan | Pass   | None        | None                                                                                       |


## Tổng hợp pool

- Tổng số test cases: 18; đã ghi Pass/Fail: 18; Pass: 15; Fail: 3; Blocked: 0; Not Run: 0.
- Ghi chú/ngày cập nhật: 2026-10-13 — cập nhật theo Result do tester cung cấp; tester xác nhận đã execute toàn bộ test cases.
