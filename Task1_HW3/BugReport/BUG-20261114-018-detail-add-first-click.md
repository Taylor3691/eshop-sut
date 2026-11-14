# Bug Report

## 1. Bug Identification

- **Bug ID:** `BUG-20261114-018`
- **Title:** `[BUG][Product Detail] Lần nhấn Thêm vào giỏ đầu tiên không có phản hồi`
- **Related Checklist Item ID:** `GUI-35`
- **Function Name:** `Thêm vào giỏ hàng`
- **Affected Screen / Module:** `Chi tiết sản phẩm`
- **Reported By:** `Puppeteer GUI TestScript`
- **Report Date:** `2026-11-14`
- **Assigned To:** `Unassigned`

## 2. Problem Summary

**What was tested:** Phản hồi khi thêm sản phẩm từ trang Chi tiết.

**What happened:** Lần nhấn đầu tiên không thêm sản phẩm và không hiển thị toast/badge.

**Why this is incorrect:** FR-06 và FR-24 yêu cầu thao tác thêm giỏ hợp lệ phải có phản hồi trực quan ngay.

## 3. Environment

- **Application URL:** `http://localhost:5173/product/1`
- **Backend API URL:** `http://localhost:3000`
- **Browser and version:** `Google Chrome 157.0.8103.78`
- **Operating System:** `Windows 11 Pro 64-bit (Microsoft Windows NT 10.0.26200.0)`
- **Viewport / Screen Resolution:** `1440 × 900`
- **Application version or Git commit:** `ef8da40`
- **Test account** `test@eshop.com`

## 4. Preconditions

Mở trang Chi tiết sản phẩm, ô số lượng có giá trị `1`.

## 5. Steps to Reproduce

1. Mở Chi tiết sản phẩm.
2. Nhấn `Thêm vào giỏ hàng` một lần.

## 6. Expected Result

Sản phẩm được thêm và có toast hoặc badge xác nhận ngay ở lần nhấn đầu.

## 7. Actual Result

Không có thay đổi hoặc phản hồi ở lần nhấn đầu.

## 8. Evidence

![GUI-35](../TestScript/reports/screenshots/GUI-35.png)
