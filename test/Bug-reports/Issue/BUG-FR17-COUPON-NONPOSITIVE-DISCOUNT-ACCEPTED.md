---
name: Bug Report
title: "[BUG]: Hệ thống chấp nhận discount_value âm"
labels: ["type: bug", "status: Open"]
---

## Mô tả lỗi
Hệ thống chấp nhận discount_value âm

Testcase phát hiện:
- TC-COUPON-008

## Môi trường
- Browser: Electron 146 (headless)
- OS: Windows 11 Home Single Language (10.0.26200)
- URL: http://localhost:5174 (API: http://localhost:3000)
- Build/commit: 755359b (dirty worktree)

## Steps to reproduce
1. Đăng nhập trang quản trị và mở Mã Giảm Giá.
2. Nhập coupon hợp lệ với discount_value = -10.
3. Bấm Tạo mã và quan sát response.

## Actual result
POST tạo coupon với discount_value = -10 trả HTTP 200.

## Expected result
discount_value phải là số dương; giá trị âm phải bị từ chối.

## Evidence
![Evidence TC-COUPON-008](../Screenshot/TC-COUPON-008.png)
