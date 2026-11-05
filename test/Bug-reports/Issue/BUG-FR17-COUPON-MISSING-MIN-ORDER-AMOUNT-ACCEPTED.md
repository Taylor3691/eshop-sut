---
name: Bug Report
title: "[BUG]: Coupon thiếu min_order_amount vẫn được chấp nhận"
labels: ["type: bug", "status: Open"]
---

## Mô tả lỗi
Hệ thống chấp nhận tạo coupon khi thiếu `min_order_amount`.

Testcase phát hiện: `TC-COUPON-010`.

## Môi trường
- Browser: Electron 146.0.7680.216 (headless)
- OS: Windows NT 10.0.26200
- URL: http://127.0.0.1:5174
- Build/commit: 9677c31
- Run window (UTC): 2026-10-14T03:45:46.864Z to 2026-10-14T03:53:28.206Z

## Steps to reproduce
1. Nhập các field theo Test data, để trống `Đơn tối thiểu (₫)`.
2. Bấm `Tạo mã`.

## Actual result
Request tạo coupon trả HTTP 200 thay vì mã lỗi 4xx.

## Expected result
Từ chối tạo vì thiếu `min_order_amount`.

## Evidence
![Evidence TC-COUPON-010](../Screenshot/TC-COUPON-010.png)
