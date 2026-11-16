# Task 3 — Tổng hợp kiểm thử đa trình duyệt

## 1. Tổng quan

| Metric | Chromium | Firefox | WebKit |
|---|---:|---:|---:|
| Total tests | 14 | 14 | 14 |
| Passed | 12 | 0 | 12 |
| Failed | 2 | 0 | 2 |
| Blocked | 0 | 14 | 0 |
| Skipped | 0 | 0 | 0 |

Firefox bị block do `Target crashed` khi tạo page. Không quy lỗi này cho
application và không chuyển thành Passed.

## 2. IA coverage

- IA-01: heading và responsive smoke checks đã chạy trên Chromium/WebKit.
- IA-02: required controls và input types đã chạy; hai kiểm tra input type
  thất bại trên cả Chromium/WebKit.
- IA-03: ba route/link checks đã chạy trên Chromium/WebKit.
- IA-04: login failure feedback và OTP action đã chạy trên Chromium/WebKit.

Mapping còn các mục `-PENDING` và các mục cần review thủ công; 14 test hiện tại
không đại diện cho toàn bộ 92 checklist item.

## 3. Khác biệt giữa browser

Không ghi nhận khác biệt UI đã xác minh giữa Chromium và WebKit trong 12 test
đạt. Hai lỗi input type tái hiện giống nhau trên cả hai engine, cho thấy đây là
lỗi ứng dụng chứ không phải browser-specific.

Firefox chưa có dữ liệu so sánh vì toàn bộ run bị block ở browser context.

## 4. Evidence và overlay

Các screenshot do helper `captureEvidence` tạo cho Chromium và WebKit đều thêm
overlay:

`Nguyễn Hữu Phúc - 23120157 | 23120157@student.hcmus.edu.vn`

Ảnh gốc không bị ghi đè. Firefox không có screenshot hợp lệ vì không tạo được
page.

## 5. Bug references

Hai failure GUI-010/GUI-011 và GUI-030/GUI-031/GUI-032 trùng các lỗi đã được
ghi nhận trong Task 1; không tạo GitHub Issue trùng. Xem:

- `task-1-gui-checklist/bug-reports/`
- `task-1-gui-checklist/evidence/failed-items/`

## 6. Limitations và kết luận

- WebKit không phải Safari native trên macOS.
- Firefox execution bị block bởi browser crash trên môi trường hiện tại.
- Chỉ 14 test smoke/representative được thực thi; 72 mapping item còn pending.
- Các mục về thẩm mỹ, khả năng đọc và đánh giá chủ quan cần manual review.

Kết luận: ứng dụng vượt qua 12/14 test trên Chromium và WebKit, nhưng chưa thể
kết luận tương thích đầy đủ đa trình duyệt hoặc hoàn thành toàn bộ checklist.
