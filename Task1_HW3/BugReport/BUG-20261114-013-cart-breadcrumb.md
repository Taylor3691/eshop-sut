# Bug Report

## 1. Bug Identification

- **Bug ID:** `BUG-20261114-013`
- **Title:** `[BUG][Cart] Thiếu breadcrumb`
- **Related Checklist Item ID:** `GUI-29`
- **Function Name:** `Điều hướng breadcrumb`
- **Affected Screen / Module:** `Giỏ hàng`
- **Reported By:** `Puppeteer GUI TestScript`
- **Report Date:** `2026-11-14`
- **Assigned To:** `Unassigned`

## 2. Problem Summary

**What was tested:** Breadcrumb trên trang Giỏ hàng.

**What happened:** Trang không hiển thị breadcrumb.

**Why this is incorrect:** FR-23 yêu cầu breadcrumb ở trang Giỏ hàng.

## 3. Environment

- **Application URL:** `http://localhost:5173/cart`
- **Backend API URL:** `http://localhost:3000`
- **Browser and version:** `Google Chrome 157.0.8103.78`
- **Operating System:** `Windows 11 Pro 64-bit (Microsoft Windows NT 10.0.26200.0)`
- **Viewport / Screen Resolution:** `1440 × 900`
- **Application version or Git commit:** `ef8da40`
- **Test account** `test@eshop.com`

## 4. Preconditions

Giỏ hàng có ít nhất một sản phẩm.

## 5. Steps to Reproduce

1. Thêm một sản phẩm vào giỏ.
2. Mở trang Giỏ hàng.
3. Quan sát phía trên nội dung chính.

## 6. Expected Result

Hiển thị breadcrumb về trang gốc và đánh dấu Giỏ hàng là trang hiện tại.

## 7. Actual Result

Không có breadcrumb.

## 8. Evidence

![GUI-29](../TestScript/reports/screenshots/GUI-29.png)
