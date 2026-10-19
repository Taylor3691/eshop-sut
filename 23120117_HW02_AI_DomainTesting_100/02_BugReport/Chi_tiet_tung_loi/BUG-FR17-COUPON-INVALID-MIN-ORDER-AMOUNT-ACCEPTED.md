---
name: Bug Report
title: "[BUG]: Coupon có min_order_amount âm vẫn được chấp nhận"
labels: ["type: bug", "status: Open"]
---

## Mô tả lỗi
Hệ thống chấp nhận tạo coupon với `min_order_amount` âm.

Testcase phát hiện: `TC-COUPON-011`.

## Môi trường
- Browser: Electron 146.0.7680.216 (headless)
- OS: Windows NT 10.0.26200
- URL: http://127.0.0.1:5174
- Build/commit: 9677c31
- Run window (UTC): 2026-10-14T03:45:46.864Z to 2026-10-14T03:53:28.206Z

## Steps to reproduce
1. Nhập `-1000` vào `Đơn tối thiểu (₫)` và nhập đúng các field còn lại theo Test data.
2. Bấm `Tạo mã`.

## Actual result
Request tạo coupon trả HTTP 200 thay vì mã lỗi 4xx.

## Expected result
Từ chối tạo vì `min_order_amount < 0`.

## Evidence
![Evidence TC-COUPON-011](../Screenshot/TC-COUPON-011.png)
