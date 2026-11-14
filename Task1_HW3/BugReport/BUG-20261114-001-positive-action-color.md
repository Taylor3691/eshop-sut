# Bug Report

## 1. Bug Identification

- **Bug ID:** `BUG-20261114-001`
- **Title:** `[BUG][Product Detail] Nút Thêm vào giỏ hàng dùng màu xanh lá thay vì xanh dương`
- **Related Checklist Item ID:** `GUI-02`
- **Function Name:** `Thêm vào giỏ hàng`
- **Affected Screen / Module:** `Chi tiết sản phẩm`
- **Reported By:** `Puppeteer GUI TestScript`
- **Report Date:** `2026-11-14`
- **Assigned To:** `Unassigned`

## 2. Problem Summary

**What was tested:** Màu của các nút hành động tích cực.

**What happened:** Nút `Thêm vào giỏ hàng` ở trang Chi tiết sản phẩm có màu xanh lá.

**Why this is incorrect:** FR-21 yêu cầu nút hành động tích cực dùng màu xanh dương.

## 3. Environment

- **Application URL:** `http://localhost:5173/product/1`
- **Backend API URL:** `http://localhost:3000`
- **Browser and version:** `Google Chrome 157.0.8103.78`
- **Operating System:** `Windows 11 Pro 64-bit (Microsoft Windows NT 10.0.26200.0)`
- **Viewport / Screen Resolution:** `1440 × 900`
- **Application version or Git commit:** `ef8da40`
- **Test account** `test@eshop.com`

## 4. Preconditions

Ứng dụng web đang chạy; sản phẩm `iPhone 15 Pro Max` có thể mở tại trang Chi tiết sản phẩm.

## 5. Steps to Reproduce

1. Mở trang Chi tiết sản phẩm.
2. Quan sát nút `Thêm vào giỏ hàng`.

## 6. Expected Result

Nút `Thêm vào giỏ hàng` có màu xanh dương.

## 7. Actual Result

Nút hiển thị màu xanh lá.

## 8. Evidence

![GUI-02](../TestScript/reports/screenshots/GUI-02.png)
