Title: [BLOCKED][Giỏ hàng] Hiển thị đầy đủ giỏ hàng có sản phẩm

## Found by Test Case
TC-CART-001

## Requirement liên quan
FR-07

## Severity / Priority
N/A / N/A

## Environment
- Browser: Electron 146.0.7680.216 (headless)
- OS: Windows NT 10.0.26200
- URL: http://127.0.0.1:5173
- Build/commit: 9677c31
- Run window (UTC): 2026-10-14T03:45:46.864Z to 2026-10-14T03:53:28.206Z

## Steps to reproduce
1. Quan sát danh sách.
2. Kiểm tra cột, nút điều chỉnh và nhãn tổng tiền.

## Expected result
Có đủ năm cột bắt buộc, có cả `+`/`-`, nhãn tổng tiền chính xác `Tổng cộng`.

## Actual result
Cypress ghi nhận testcase pending do it.skip(); precondition hoặc fixture được định danh chưa đủ để thực thi an toàn.

## Evidence
Không có screenshot vì testcase chưa được thực thi.
