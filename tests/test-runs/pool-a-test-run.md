# Test Run — Pool A / Hồ sơ cá nhân

## Phạm vi và môi trường

- Toàn bộ **11 cases hiện hành**, giữ ID gốc.
- Ngày/đợt chạy: [Điền].
- Phiên bản hệ thống/commit: [Điền].
- Máy tính/trình duyệt/phiên bản: [Điền].
- Tài khoản và dữ liệu thực tế: [Điền theo hướng dẫn pool].
- [Hướng dẫn chuẩn bị](../test-cases/profile-web/README.md) · [Phân tích](../test-summary/profile-web-analysis.md) · [Ma trận](../test-summary/traceability-matrix.md).

Bốn kết quả đã ghi được giữ nguyên từ [lịch sử trước lần sửa bước](pool-a-history-before-manual-steps.md); chưa phải lần chạy mới. Khi thử lại theo hướng dẫn mới, bổ sung ngày và kết quả, giữ ghi chú cũ để đối chiếu.

## Cách điền

1. Mở case qua liên kết, làm theo Preconditions và Test Steps.
2. Điền Tester, ngày/giờ, dữ liệu thử thực tế và Actual Result trong Note.
3. Result dùng `Not Run`, `Pass`, `Fail` hoặc `Blocked`. Chưa chạy giữ Not Run. Không chuẩn bị được dữ liệu/không đến được bước cần thử thì ghi Blocked kèm lý do.
4. Nếu Fail, liên kết bug report ở Related Bug; giữ ảnh màn hình và mô tả điều mong đợi/điều thực tế.
5. Cập nhật tổng hợp bằng tay sau mỗi đợt. Kết quả cũ không tự xác nhận phiên bản bước mới đã chạy.

## Kết quả execution

| Test Case ID | Module | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| [TC-PROFILE-WEB-001](../test-cases/profile-web/TC-PROFILE-WEB-001.md) | PROFILE-WEB | vt-toan | Fail    | [BUG-PROFILE-WEB-001](../bug-reports/BUG-PROFILE-WEB-001.md) — Issue pending | Hiển thị alert không cho phép số điện thoại 10 chứ số                                |
| [TC-PROFILE-WEB-002](../test-cases/profile-web/TC-PROFILE-WEB-002.md) | PROFILE-WEB | vt-toan | Fail    | [BUG-PROFILE-WEB-001](../bug-reports/BUG-PROFILE-WEB-001.md) — Issue pending | Hiển thị alert không cho phép số điện thoại 11 chữ số                                |
| [TC-PROFILE-WEB-003](../test-cases/profile-web/TC-PROFILE-WEB-003.md) | PROFILE-WEB | vt-toan | Pass    | None                                                                         | None                                                                                 |
| [TC-PROFILE-WEB-004](../test-cases/profile-web/TC-PROFILE-WEB-004.md) | PROFILE-WEB | vt-toan | Pass    | None                                                                         | None                                                                                 |
| [TC-PROFILE-WEB-010](../test-cases/profile-web/TC-PROFILE-WEB-010.md) | PROFILE-WEB | vt-toan | Not Run | None                                                                         | Từ chối số điện thoại không bắt đầu bằng 0; Actual Result/ngày chạy: ... |
| [TC-PROFILE-WEB-012](../test-cases/profile-web/TC-PROFILE-WEB-012.md) | PROFILE-WEB | vt-toan | Not Run | None                                                                         | Từ chối số điện thoại chứa chữ cái; Actual Result/ngày chạy: ... |
| [TC-PROFILE-WEB-015](../test-cases/profile-web/TC-PROFILE-WEB-015.md) | PROFILE-WEB | vt-toan | Not Run | None                                                                         | Email không được phép thay đổi; Actual Result/ngày chạy: ... |
| [TC-PROFILE-WEB-016](../test-cases/profile-web/TC-PROFILE-WEB-016.md) | PROFILE-WEB | vt-toan | Not Run | None                                                                         | Chưa đăng nhập không thể sửa hồ sơ; Actual Result/ngày chạy: ... |
| [TC-PROFILE-WEB-025](../test-cases/profile-web/TC-PROFILE-WEB-025.md) | PROFILE-WEB | vt-toan | Not Run | None                                                                         | Hiển thị an toàn nội dung giống thẻ định dạng trong Họ Tên; Actual Result/ngày chạy: ... |
| [TC-PROFILE-WEB-026](../test-cases/profile-web/TC-PROFILE-WEB-026.md) | PROFILE-WEB | vt-toan | Not Run | None                                                                         | Hiển thị an toàn nội dung giống thẻ định dạng trong Địa chỉ giao hàng; Actual Result/ngày chạy: ... |
| [TC-PROFILE-WEB-028](../test-cases/profile-web/TC-PROFILE-WEB-028.md) | PROFILE-WEB | vt-toan | Not Run | None                                                                         | Cập nhật đồng thời Họ Tên, Số điện thoại và Địa chỉ; Actual Result/ngày chạy: ... |

## Tổng hợp pool

- Tổng số test cases: 11; đã ghi Pass/Fail: 4; Pass: 2; Fail: 2; Blocked: 0; Not Run: 7.
- Ghi chú/ngày cập nhật: [Điền].
