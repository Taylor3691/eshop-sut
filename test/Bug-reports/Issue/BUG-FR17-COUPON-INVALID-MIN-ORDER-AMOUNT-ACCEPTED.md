---
name: Bug Report
title: "[BUG]: Hệ thống chấp nhận min_order_amount thiếu hoặc âm"
labels: ["type: bug", "status: Open"]
---

## Mô tả lỗi
Hệ thống chấp nhận min_order_amount thiếu hoặc âm

Testcase phát hiện:
- TC-COUPON-010
- TC-COUPON-011

## Môi trường
- Browser: Electron 146 (headless)
- OS: Windows 11 Home Single Language (10.0.26200)
- URL: http://localhost:5174 (API: http://localhost:3000)
- Build/commit: 755359b (dirty worktree)

## Steps to reproduce
1. Đăng nhập trang quản trị và mở Mã Giảm Giá.
2. Nhập coupon hợp lệ ngoại trừ min_order_amount bị bỏ trống hoặc là số âm.
3. Bấm Tạo mã và quan sát response.

## Actual result
POST tạo coupon trả HTTP 200 khi min_order_amount bị bỏ trống hoặc bằng -1000.

## Expected result
min_order_amount là bắt buộc và phải lớn hơn hoặc bằng 0.

## Evidence
![Evidence TC-COUPON-010](../Screenshot/TC-COUPON-010.png)

![Evidence TC-COUPON-011](../Screenshot/TC-COUPON-011.png)
