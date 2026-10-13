Title: [BUG][Giỏ hàng] Hiển thị giỏ hàng trống tại biên 0 dòng

## Found by Test Case
TC-BVA-FR07-001

## Requirement liên quan
FR-07

## Severity / Priority
Low / Medium

## Environment
- Browser: Electron 146 (headless)
- OS: Windows 11 Home Single Language (10.0.26200)
- URL: http://localhost:5173
- Build/commit: 755359b (dirty worktree)

## Steps to reproduce
1. Thiết lập giỏ hàng có 0 dòng sản phẩm.
2. Mở trang Giỏ hàng.
3. Quan sát nội dung hiển thị.

## Expected result
Giỏ hàng hiển thị hình minh họa và thông báo rõ ràng cho trạng thái trống.

## Actual result
Trang giỏ hàng trống hiển thị thông báo nhưng Cypress không tìm thấy phần tử ảnh trong main.

## Evidence
![Evidence TC-BVA-FR07-001](../../Screenshot/TC-BVA-FR07-001.png)
