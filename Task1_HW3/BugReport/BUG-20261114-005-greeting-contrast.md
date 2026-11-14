# Bug Report

## 1. Bug Identification

- **Bug ID:** `BUG-20261114-005`
- **Title:** `[BUG][Header] Chữ chào người dùng có độ tương phản thấp`
- **Related Checklist Item ID:** `GUI-12`
- **Function Name:** `Hiển thị thông tin người dùng`
- **Affected Screen / Module:** `Header / Navbar`
- **Reported By:** `Puppeteer GUI TestScript`
- **Report Date:** `2026-11-14`
- **Assigned To:** `Unassigned`

## 2. Problem Summary

**What was tested:** Độ tương phản chữ trên nền Navbar.

**What happened:** Chữ `Chào, Test User` có tỷ lệ tương phản 3.92:1.

**Why this is incorrect:** Chữ thường cần đạt ít nhất 4.5:1 để dễ đọc.

## 3. Environment

- **Application URL:** `http://localhost:5173/`
- **Backend API URL:** `http://localhost:3000`
- **Browser and version:** `Google Chrome 157.0.8103.78`
- **Operating System:** `Windows 11 Pro 64-bit (Microsoft Windows NT 10.0.26200.0)`
- **Viewport / Screen Resolution:** `1440 × 900`
- **Application version or Git commit:** `ef8da40`
- **Test account** `test@eshop.com`

## 4. Preconditions

Đăng nhập bằng tài khoản người dùng.

## 5. Steps to Reproduce

1. Mở trang Danh sách sản phẩm.
2. Quan sát chữ chào người dùng trên Navbar màu xanh.

## 6. Expected Result

Chữ chào có độ tương phản tối thiểu 4.5:1 với nền.

## 7. Actual Result

Độ tương phản đo được là 3.92:1.

## 8. Evidence

![GUI-12](../TestScript/reports/screenshots/GUI-12.png)
