# Test Run — Pool A / Hồ sơ cá nhân

## Phạm vi và môi trường

- Toàn bộ **11 cases hiện hành**, giữ ID gốc.
- Ngày/đợt chạy: [Điền].
- Phiên bản hệ thống/commit: [Điền].
- Máy tính/trình duyệt/phiên bản: [Điền].
- Tài khoản và dữ liệu thực tế: [Điền theo hướng dẫn pool].
- [Hướng dẫn chuẩn bị](../test-cases/profile-web/README.md) · [Phân tích](../test-summary/profile-web-analysis.md) · [Ma trận](../test-summary/traceability-matrix.md).

Tester xác nhận đã execute toàn bộ 11 test cases hiện hành; bảng bên dưới ghi Result do tester cung cấp. [Lịch sử trước lần sửa bước](pool-a-history-before-manual-steps.md) được giữ riêng để đối chiếu.

## Cách điền

1. Mở case qua liên kết, làm theo Preconditions và Test Steps.
2. Điền Tester và thông tin execution thực tế. Với Result = Pass, ghi Note là `None`; với Fail hoặc Blocked, ghi Actual Result hoặc lý do trong Note.
3. Result dùng `Not Run`, `Pass`, `Fail` hoặc `Blocked`. Chưa chạy giữ Not Run. Không chuẩn bị được dữ liệu/không đến được bước cần thử thì ghi Blocked kèm lý do.
4. Nếu Fail, liên kết bug report ở Related Bug; giữ ảnh màn hình và mô tả điều mong đợi/điều thực tế.
5. Cập nhật tổng hợp bằng tay sau mỗi đợt. Kết quả cũ không tự xác nhận phiên bản bước mới đã chạy.

## Kết quả execution

| Test Case ID                                                          | Module      | Tester  | Result | Related Bug                                                                  | Note                                                                              |
| --------------------------------------------------------------------- | ----------- | ------- | ------ | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| [TC-PROFILE-WEB-001](../test-cases/profile-web/TC-PROFILE-WEB-001.md) | PROFILE-WEB | vt-toan | Fail   | [BUG-PROFILE-WEB-001](../bug-reports/BUG-PROFILE-WEB-001.md) — Issue pending | Hiển thị alert không cho phép số điện thoại 10 chứ số                             |
| [TC-PROFILE-WEB-002](../test-cases/profile-web/TC-PROFILE-WEB-002.md) | PROFILE-WEB | vt-toan | Fail   | [BUG-PROFILE-WEB-001](../bug-reports/BUG-PROFILE-WEB-001.md) — Issue pending | Hiển thị alert không cho phép số điện thoại 11 chữ số                             |
| [TC-PROFILE-WEB-003](../test-cases/profile-web/TC-PROFILE-WEB-003.md) | PROFILE-WEB | vt-toan | Pass   | None                                                                         | None                                                                              |
| [TC-PROFILE-WEB-004](../test-cases/profile-web/TC-PROFILE-WEB-004.md) | PROFILE-WEB | vt-toan | Pass   | None                                                                         | None                                                                              |
| [TC-PROFILE-WEB-010](../test-cases/profile-web/TC-PROFILE-WEB-010.md) | PROFILE-WEB | vt-toan | Fail   | None                                                                         | Hiển thị alert chấp nhận số điện thoại không bắt đầu từ 0                         |
| [TC-PROFILE-WEB-012](../test-cases/profile-web/TC-PROFILE-WEB-012.md) | PROFILE-WEB | vt-toan | Pass   | None                                                                         | None                                                                              |
| [TC-PROFILE-WEB-015](../test-cases/profile-web/TC-PROFILE-WEB-015.md) | PROFILE-WEB | vt-toan | Pass   | None                                                                         | None                                                                              |
| [TC-PROFILE-WEB-016](../test-cases/profile-web/TC-PROFILE-WEB-016.md) | PROFILE-WEB | vt-toan | Pass   | None                                                                         | None                                                                              |
| [TC-PROFILE-WEB-025](../test-cases/profile-web/TC-PROFILE-WEB-025.md) | PROFILE-WEB | vt-toan | Fail   | None                                                                         | Cho phép cập nhật tên có định dạng (nhúng html)                                   |
| [TC-PROFILE-WEB-026](../test-cases/profile-web/TC-PROFILE-WEB-026.md) | PROFILE-WEB | vt-toan | Fail   | None                                                                         | Cho phép cập nhật địa chỉ có định dạng (nhúng html)                               |
| [TC-PROFILE-WEB-028](../test-cases/profile-web/TC-PROFILE-WEB-028.md) | PROFILE-WEB | vt-toan | Pass   | None                                                                         | None                                                                              |

## Tổng hợp pool

- Tổng số test cases: 11; đã ghi Pass/Fail: 11; Pass: 6; Fail: 5; Blocked: 0; Not Run: 0.
- Ghi chú/ngày cập nhật: 2026-10-13 — cập nhật theo Result do tester cung cấp; tester xác nhận đã execute toàn bộ test cases.
