# TC-MOB-BVA-FORGOT-019: Độ lệch so khớp Xác nhận mật khẩu tại biên khớp hoàn toàn (distance = 0)

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / BVA

## Preconditions

- Người dùng đang ở màn hình Bước 2 trên Mobile App.

## Test Data

| Trường / Tham số  | Giá trị                                                      |
| ----------------- | ------------------------------------------------------------ |
| `newPassword`     | `"Pass123@"`                                                 |
| `confirmPassword` | `"Pass123@"` (độ lệch chuỗi Levenshtein = 0, khớp hoàn toàn) |

## Test Steps

1. Quan sát giao diện Bước 2 xem có trường "Xác nhận mật khẩu mới" hay không.
2. Nếu có trường xác nhận, nhập cùng giá trị `"Pass123@"` vào cả hai trường.
3. Nhấn "Đặt lại mật khẩu".

## Expected Result

- Theo đặc tả FR-03/FR-01: Hệ thống chấp nhận khi hai trường mật khẩu khớp nhau hoàn toàn (`distance = 0`).
- Ghi nhận hiện trạng triển khai trên Mobile: Giao diện chỉ có trường `newPassword`, thiếu trường `confirmPassword`.

## Actual Result

Không có trường confirm-password nên không nhập được trường hợp khớp.

## Evidence

- [Screenshot evidence](screenshots/TC-MOB-FORGOT-011.png)

## Boundary Rationale

Kiểm tra tại điểm biên so khớp chính xác hoàn toàn (`match_distance = 0`), là trạng thái hợp lệ duy nhất của quy tắc xác nhận mật khẩu.

## Status / Related Bugs

FAIL / D-FR03-MOB-004 — see [execution report](../../../reports/test-results/FR-03-mobile/domain_testing_report.md).
