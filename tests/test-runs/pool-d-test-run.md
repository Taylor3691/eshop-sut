# Test Run — Pool D / Hồ sơ trên thiết bị di động

## Phạm vi và môi trường

- Toàn bộ **14 cases hiện hành**, giữ ID gốc.
- Ngày/đợt chạy: [Điền].
- Phiên bản hệ thống/commit: [Điền].
- Thiết bị/hệ điều hành/phiên bản ứng dụng: [Điền].
- Tài khoản và dữ liệu thực tế: [Điền theo hướng dẫn pool].
- [Hướng dẫn chuẩn bị](../test-cases/profile-mobile/README.md) · [Phân tích](../test-summary/profile-mobile-analysis.md) · [Ma trận](../test-summary/traceability-matrix.md).

## Cách điền

1. Mở case qua liên kết, làm theo Preconditions và Test Steps.
2. Điền Tester và thông tin execution thực tế. Với Result = Pass, ghi Note là `None`; với Fail hoặc Blocked, ghi Actual Result hoặc lý do trong Note.
3. Result dùng `Not Run`, `Pass`, `Fail` hoặc `Blocked`. Chưa chạy giữ Not Run. Không chuẩn bị được dữ liệu/không đến được bước cần thử thì ghi Blocked kèm lý do.
4. Nếu Fail, liên kết bug report ở Related Bug; giữ ảnh màn hình và mô tả điều mong đợi/điều thực tế.
5. Cập nhật tổng hợp bằng tay sau mỗi đợt. Kết quả cũ không tự xác nhận phiên bản bước mới đã chạy.

## Kết quả execution

| Test Case ID                                                                   | Module         | Tester  | Result | Related Bug | Note                                                                                                |
| ------------------------------------------------------------------------------ | -------------- | ------- | ------ | ----------- | --------------------------------------------------------------------------------------------------- |
| [TC-PROFILE-MOBILE-001](../test-cases/profile-mobile/TC-PROFILE-MOBILE-001.md) | PROFILE-MOBILE | vt-toan | Pass   | None        | None                                                                                                |
| [TC-PROFILE-MOBILE-002](../test-cases/profile-mobile/TC-PROFILE-MOBILE-002.md) | PROFILE-MOBILE | vt-toan | Fail   | None        | Hiện thông báo từ chối sô điện thoại 10 chữ số                                                      |
| [TC-PROFILE-MOBILE-003](../test-cases/profile-mobile/TC-PROFILE-MOBILE-003.md) | PROFILE-MOBILE | vt-toan | Fail   | None        | Hiện thông báo không cho phép số điện thoại 11 chữ số                                               |
| [TC-PROFILE-MOBILE-004](../test-cases/profile-mobile/TC-PROFILE-MOBILE-004.md) | PROFILE-MOBILE | vt-toan | Pass   | None        | None                                                                                                |
| [TC-PROFILE-MOBILE-005](../test-cases/profile-mobile/TC-PROFILE-MOBILE-005.md) | PROFILE-MOBILE | vt-toan | Fail   | None        | Cho phép số điện thoại bắt đầu bằng 0                                                               |
| [TC-PROFILE-MOBILE-006](../test-cases/profile-mobile/TC-PROFILE-MOBILE-006.md) | PROFILE-MOBILE | vt-toan | Pass   | None        | None                                                                                                |
| [TC-PROFILE-MOBILE-013](../test-cases/profile-mobile/TC-PROFILE-MOBILE-013.md) | PROFILE-MOBILE | vt-toan | Pass   | None        | None                                                                                                |
| [TC-PROFILE-MOBILE-014](../test-cases/profile-mobile/TC-PROFILE-MOBILE-014.md) | PROFILE-MOBILE | vt-toan | Pass   | None        | None                                                                                                |
| [TC-PROFILE-MOBILE-016](../test-cases/profile-mobile/TC-PROFILE-MOBILE-016.md) | PROFILE-MOBILE | vt-toan | Pass   | None        | None                                                                                                |
| [TC-PROFILE-MOBILE-017](../test-cases/profile-mobile/TC-PROFILE-MOBILE-017.md) | PROFILE-MOBILE | vt-toan | Pass   | None        | None                                                                                                |
| [TC-PROFILE-MOBILE-018](../test-cases/profile-mobile/TC-PROFILE-MOBILE-018.md) | PROFILE-MOBILE | vt-toan | Pass   | None        | None                                                                                                |
| [TC-PROFILE-MOBILE-028](../test-cases/profile-mobile/TC-PROFILE-MOBILE-028.md) | PROFILE-MOBILE | vt-toan | Pass   | None        | None                                                                                                |
| [TC-PROFILE-MOBILE-029](../test-cases/profile-mobile/TC-PROFILE-MOBILE-029.md) | PROFILE-MOBILE | vt-toan | Pass   | None        | None                                                                                                |
| [TC-PROFILE-MOBILE-030](../test-cases/profile-mobile/TC-PROFILE-MOBILE-030.md) | PROFILE-MOBILE | vt-toan | Pass   | None        | None                                                                                                |

## Tổng hợp pool

- Tổng số test cases: 14; đã ghi Pass/Fail: 14; Pass: 11; Fail: 3; Blocked: 0; Not Run: 0.
- Ghi chú/ngày cập nhật: 2026-10-13 — cập nhật theo Result do tester cung cấp; tester xác nhận đã execute toàn bộ test cases.
