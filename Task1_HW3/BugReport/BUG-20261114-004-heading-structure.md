# Bug Report

## 1. Bug Identification

- **Bug ID:** `BUG-20261114-004`
- **Title:** `[BUG][Product List] Cấu trúc tiêu đề h1 không đúng`
- **Related Checklist Item ID:** `GUI-05`, `GUI-51`
- **Function Name:** `Hiển thị tiêu đề trang`
- **Affected Screen / Module:** `Danh sách sản phẩm; Giỏ hàng`
- **Reported By:** `Puppeteer GUI TestScript`
- **Report Date:** `2026-11-14`
- **Assigned To:** `Unassigned`

## 2. Problem Summary

**What was tested:** Số lượng và cấu trúc heading chính của từng trang.

**What happened:** Trang Danh sách sản phẩm có hai thẻ `h1`; trang Giỏ hàng dùng `h2` thay vì một `h1` chính.

**Why this is incorrect:** FR-05 và FR-21 yêu cầu mỗi trang có đúng một `h1` mô tả nội dung trang; cấu trúc heading còn ảnh hưởng đến trình đọc màn hình.

## 3. Environment

- **Application URL:** `http://localhost:5173/`, `http://localhost:5173/cart`
- **Backend API URL:** `http://localhost:3000`
- **Browser and version:** `Google Chrome 157.0.8103.78`
- **Operating System:** `Windows 11 Pro 64-bit (Microsoft Windows NT 10.0.26200.0)`
- **Viewport / Screen Resolution:** `1440 × 900`
- **Application version or Git commit:** `ef8da40`
- **Test account** `test@eshop.com`

## 4. Preconditions

Danh sách sản phẩm có dữ liệu; giỏ hàng có thể mở.

## 5. Steps to Reproduce

1. Mở trang Danh sách sản phẩm và kiểm tra các thẻ `h1`.
2. Mở trang Giỏ hàng và kiểm tra heading chính.

## 6. Expected Result

Mỗi trang có đúng một `h1` mô tả đúng nội dung trang.

## 7. Actual Result

Trang Danh sách có hai `h1`; trang Giỏ hàng không có `h1`.

## 8. Evidence

![GUI-05](../TestScript/reports/screenshots/GUI-05.png)

![GUI-51](../TestScript/reports/screenshots/GUI-51.png)
