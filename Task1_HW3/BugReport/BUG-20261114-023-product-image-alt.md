# Bug Report

## 1. Bug Identification

- **Bug ID:** `BUG-20261114-023`
- **Title:** `[BUG][Product List] Ảnh sản phẩm thiếu alt text`
- **Related Checklist Item ID:** `GUI-41`
- **Function Name:** `Hiển thị ảnh sản phẩm`
- **Affected Screen / Module:** `Danh sách sản phẩm`
- **Reported By:** `Puppeteer GUI TestScript`
- **Report Date:** `2026-11-14`
- **Assigned To:** `Unassigned`

## 2. Problem Summary

**What was tested:** Văn bản thay thế của ảnh sản phẩm.

**What happened:** Ảnh trong product card có thuộc tính `alt` rỗng.

**Why this is incorrect:** FR-24 yêu cầu tất cả ảnh sản phẩm có `alt` mô tả, không để rỗng.

## 3. Environment

- **Application URL:** `http://localhost:5173/`
- **Backend API URL:** `http://localhost:3000`
- **Browser and version:** `Google Chrome 157.0.8103.78`
- **Operating System:** `Windows 11 Pro 64-bit (Microsoft Windows NT 10.0.26200.0)`
- **Viewport / Screen Resolution:** `1440 × 900`
- **Application version or Git commit:** `ef8da40`
- **Test account** `test@eshop.com`

## 4. Preconditions

Danh sách sản phẩm hiển thị ít nhất một product card.

## 5. Steps to Reproduce

1. Mở Danh sách sản phẩm.
2. Kiểm tra thuộc tính `alt` của ảnh trong product card.

## 6. Expected Result

Mỗi ảnh có `alt` mô tả đúng tên hoặc nội dung sản phẩm.

## 7. Actual Result

Thuộc tính `alt` rỗng.

## 8. Evidence

![GUI-41](../TestScript/reports/screenshots/GUI-41.png)
