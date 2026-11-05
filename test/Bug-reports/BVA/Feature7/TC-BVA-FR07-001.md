Title: [BUG][Giỏ hàng] Hiển thị giỏ hàng trống tại biên 0 dòng

## Found by Test Case
TC-BVA-FR07-001

## Requirement liên quan
FR-07

## Severity / Priority
TBD / TBD

## Environment
- Browser: Electron 146.0.7680.216 (headless)
- OS: Windows NT 10.0.26200
- URL: http://127.0.0.1:5173
- Build/commit: 9677c31
- Run window (UTC): 2026-10-14T03:45:46.864Z to 2026-10-14T03:53:28.206Z

## Steps to reproduce
1. Thiết lập giỏ hàng có 0 dòng sản phẩm.
2. Mở trang Giỏ hàng.
3. Quan sát nội dung hiển thị.

## Expected result
Giỏ hàng hiển thị hình minh họa và thông báo rõ ràng cho trạng thái trống.

## Actual result
AssertionError: Timed out retrying after 8000ms: Expected to find element: `main img`, but never found it.

## Evidence
![Evidence TC-BVA-FR07-001](../../Screenshot/TC-BVA-FR07-001.png)
