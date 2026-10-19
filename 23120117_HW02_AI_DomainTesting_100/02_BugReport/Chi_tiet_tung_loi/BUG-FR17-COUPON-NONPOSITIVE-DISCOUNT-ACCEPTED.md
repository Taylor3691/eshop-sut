---
name: Bug Report
title: "[BUG]: Coupon có discount_value không dương vẫn được chấp nhận"
labels: ["type: bug", "status: Open"]
---

## Mô tả lỗi
Hệ thống chấp nhận tạo coupon với `discount_value` không dương.

Testcase phát hiện: `TC-BVA-FR17-001`, `TC-COUPON-008`.

## Môi trường
- Browser: Electron 146.0.7680.216 (headless)
- OS: Windows NT 10.0.26200
- URL: http://127.0.0.1:5174
- Build/commit: 9677c31
- Run window (UTC): 2026-10-14T03:45:46.864Z to 2026-10-14T03:53:28.206Z

## Steps to reproduce
1. Trong form tạo coupon, nhập code vào `Mã coupon (VD: SAVE10)`, chọn `Số tiền cố định (₫)`, rồi nhập các giá trị Test data vào đúng field theo placeholder UI.
2. Bấm `Tạo mã`.

## Actual result
Request tạo coupon trả HTTP 200 thay vì mã lỗi 4xx.

## Expected result
Hệ thống từ chối tạo mã giảm giá vì `discount_value` không phải giá trị dương.

## Evidence
![Evidence TC-BVA-FR17-001](../Screenshot/TC-BVA-FR17-001.png)

![Evidence TC-COUPON-008](../Screenshot/TC-COUPON-008.png)
