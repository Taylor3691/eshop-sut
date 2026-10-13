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
2. Điền Tester, ngày/giờ, dữ liệu thử thực tế và Actual Result trong Note.
3. Result dùng `Not Run`, `Pass`, `Fail` hoặc `Blocked`. Chưa chạy giữ Not Run. Không chuẩn bị được dữ liệu/không đến được bước cần thử thì ghi Blocked kèm lý do.
4. Nếu Fail, liên kết bug report ở Related Bug; giữ ảnh màn hình và mô tả điều mong đợi/điều thực tế.
5. Cập nhật tổng hợp bằng tay sau mỗi đợt. Kết quả cũ không tự xác nhận phiên bản bước mới đã chạy.

## Kết quả execution

| Test Case ID | Module | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| [TC-PROFILE-MOBILE-001](../test-cases/profile-mobile/TC-PROFILE-MOBILE-001.md) | PROFILE-MOBILE | vt-toan | Not Run | None | Từ chối số điện thoại 9 chữ số; Actual Result/ngày chạy: ... |
| [TC-PROFILE-MOBILE-002](../test-cases/profile-mobile/TC-PROFILE-MOBILE-002.md) | PROFILE-MOBILE | vt-toan | Not Run | None | Chấp nhận số điện thoại 10 chữ số; Actual Result/ngày chạy: ... |
| [TC-PROFILE-MOBILE-003](../test-cases/profile-mobile/TC-PROFILE-MOBILE-003.md) | PROFILE-MOBILE | vt-toan | Not Run | None | Chấp nhận số điện thoại 11 chữ số; Actual Result/ngày chạy: ... |
| [TC-PROFILE-MOBILE-004](../test-cases/profile-mobile/TC-PROFILE-MOBILE-004.md) | PROFILE-MOBILE | vt-toan | Not Run | None | Từ chối số điện thoại 12 chữ số; Actual Result/ngày chạy: ... |
| [TC-PROFILE-MOBILE-005](../test-cases/profile-mobile/TC-PROFILE-MOBILE-005.md) | PROFILE-MOBILE | vt-toan | Not Run | None | Từ chối số điện thoại không bắt đầu bằng 0; Actual Result/ngày chạy: ... |
| [TC-PROFILE-MOBILE-006](../test-cases/profile-mobile/TC-PROFILE-MOBILE-006.md) | PROFILE-MOBILE | vt-toan | Not Run | None | Từ chối số điện thoại chứa chữ cái khi dán; Actual Result/ngày chạy: ... |
| [TC-PROFILE-MOBILE-013](../test-cases/profile-mobile/TC-PROFILE-MOBILE-013.md) | PROFILE-MOBILE | vt-toan | Not Run | None | Lưu đồng thời Họ Tên, Số điện thoại và Địa chỉ; Actual Result/ngày chạy: ... |
| [TC-PROFILE-MOBILE-014](../test-cases/profile-mobile/TC-PROFILE-MOBILE-014.md) | PROFILE-MOBILE | vt-toan | Not Run | None | Email không sửa được bằng gõ hoặc dán; Actual Result/ngày chạy: ... |
| [TC-PROFILE-MOBILE-016](../test-cases/profile-mobile/TC-PROFILE-MOBILE-016.md) | PROFILE-MOBILE | vt-toan | Not Run | None | Chưa đăng nhập không thể sửa hồ sơ; Actual Result/ngày chạy: ... |
| [TC-PROFILE-MOBILE-017](../test-cases/profile-mobile/TC-PROFILE-MOBILE-017.md) | PROFILE-MOBILE | vt-toan | Not Run | None | Đăng xuất không giữ quyền sửa hồ sơ trước đó; Actual Result/ngày chạy: ... |
| [TC-PROFILE-MOBILE-018](../test-cases/profile-mobile/TC-PROFILE-MOBILE-018.md) | PROFILE-MOBILE | vt-toan | Not Run | None | Đổi tài khoản rồi lưu đúng hồ sơ của người vừa đăng nhập; Actual Result/ngày chạy: ... |
| [TC-PROFILE-MOBILE-028](../test-cases/profile-mobile/TC-PROFILE-MOBILE-028.md) | PROFILE-MOBILE | vt-toan | Not Run | None | Hiển thị an toàn nội dung giống thẻ định dạng trong Họ Tên; Actual Result/ngày chạy: ... |
| [TC-PROFILE-MOBILE-029](../test-cases/profile-mobile/TC-PROFILE-MOBILE-029.md) | PROFILE-MOBILE | vt-toan | Not Run | None | Hiển thị an toàn nội dung giống thẻ định dạng trong Địa chỉ giao hàng; Actual Result/ngày chạy: ... |
| [TC-PROFILE-MOBILE-030](../test-cases/profile-mobile/TC-PROFILE-MOBILE-030.md) | PROFILE-MOBILE | vt-toan | Not Run | None | Đăng nhập lại trên điện thoại tải hồ sơ vừa đổi trên trang web; Actual Result/ngày chạy: ... |

## Tổng hợp pool

- Tổng số test cases: 14; đã ghi Pass/Fail: 0; Pass: 0; Fail: 0; Blocked: 0; Not Run: 14.
- Ghi chú/ngày cập nhật: [Điền].
