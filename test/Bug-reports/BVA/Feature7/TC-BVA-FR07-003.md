Title: [BLOCKED][Giỏ hàng] Hiển thị giỏ hàng ngay trên biên với 2 dòng

## Found by Test Case
TC-BVA-FR07-003

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
1. Thiết lập giỏ hàng có đúng 2 dòng sản phẩm phân biệt.
2. Mở trang Giỏ hàng.
3. Quan sát danh sách và các cột.

## Expected result
Danh sách hiển thị 2 dòng sản phẩm và có các cột Sản phẩm, Đơn giá, Số lượng (có nút `+/-`), Thành tiền, Thao tác.

## Actual result
Cypress ghi nhận testcase pending do it.skip(); precondition hoặc fixture được định danh chưa đủ để thực thi an toàn.

## Evidence
Không có screenshot vì testcase chưa được thực thi.
