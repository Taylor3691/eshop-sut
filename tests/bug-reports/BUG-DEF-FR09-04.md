# [BUG][DEF-FR09-04] Lách luật giới hạn lượt dùng C5 bằng cách bỏ trống user_id

## Found by Test Case

[TC-GAP-COUPON-008](../test-cases/coupons/TC-GAP-COUPON-008.md).

## Related requirement

FR-09 (discount coupons); checkout behavior references FR-08.

## Status

- Verified in recorded execution report.
- Results below are transcribed from the linked execution report or AI-gap execution table. This report did not add or rerun tests.

## Expected and actual results

| Test case | Expected | Actual | Evidence |
|---|---|---|---|
| `TC-GAP-COUPON-008` | Từ chối vì đã hết lượt dùng quy định (C5) | HTTP 200; Áp dụng thành công mã lần thứ 2 mà không bị chặn | Recorded: Nhánh else dòng 416 trong server.js cho phép dùng mã vô hạn lần khi thiếu user_id. |

## Source reports

- [FR-09-ai-gap-analysis.md](../test-summary/FR-09-ai-gap-analysis.md)

## External issue status

GitHub issue publication and screenshot attachment were not performed in this local-branch task. Check the group Issues page for duplicates before publishing.
