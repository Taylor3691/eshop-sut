# Test Run — Pool A / Hồ sơ Web/API

## Phạm vi và thông tin execution

- Tester: `vt-toan`.
- Ngày chuẩn bị: 2026-10-13 (Asia/Saigon).
- Batch được người dùng chỉ định: sáu cases đầu trong danh mục hiện hành, `TC-PROFILE-WEB-001`, `002`, `003`, `004`, `007`, `008`. IDs `005` và `006` đã bị loại khi tinh gọn; không execute lại.
- Module: `PROFILE-WEB`; requirements `FR-04`, `FR-22` khi case yêu cầu.
- Test oracle: [README.md](../../README.md); Test Data, steps và Expected Result theo từng [test case](../test-cases/profile-web/README.md).
- Code ứng dụng được kiểm thử: commit `01d2a68` trên branch `feat/TToan-HW2`; không sửa code ứng dụng.
- Môi trường: Windows 11; Chrome `154.0.8037.98`; Node.js `24.10.0`; npm `11.6.1`; Vite `8.0.12`.
- Backend: `http://localhost:3000`; storefront: `http://localhost:5173`.
- Backend/storefront dependencies được cài bằng `npm ci` theo lockfiles; SQLite driver load thành công. Backend và storefront đã khởi động.
- Browser automation: browser-harness/CDP; screenshot của browser alert bằng computer-use khi cần.
- GitHub bug Issues: `Taylor3691/eshop-sut`. Markdown bug reports và screenshots thuộc `tests/bug-reports/`. Người dùng không yêu cầu bundle evidence riêng cho test run.
- Clarification của người dùng trước khi tiếp tục: vị trí thông báo lỗi **ở bất kỳ đâu đều chấp nhận**, bao gồm native browser alert. Với case 003, không đánh Fail chỉ vì lỗi không nằm inline phía trên nút submit; giữ các kiểm tra từ chối dữ liệu sai và persistence/isolation.
- Database gốc được backup trước startup vì backend drop/reseed: SHA256 `C63F00544180BA1FBB1427A9B9DD3F1784842698809972F33CE90482E7420BA6`. Backup local không đưa vào commit; database gốc sẽ được khôi phục sau batch.

## Fixture đã xác minh

Hai tài khoản được tạo qua `POST /api/register`; ID/token thực lấy từ `POST /api/login`. Baseline được thiết lập bằng parameterized SQL trên đúng ID/email trong database local, độc lập với UI/API mutation đang kiểm thử. `GET /api/users/me` của từng tài khoản xác nhận các trường bên dưới; A/B khác ID và cùng role `user`. Token không đưa vào tài liệu.

| Tài khoản | ID thực | Email | Role | name | phone | shipping_address |
|---|---:|---|---|---|---|---|
| A | 3 | profile.a@example.com | user | Nguyễn Văn An | 0987654321 | 12 Lê Lợi, Phường Bến Nghé, TP.HCM |
| B | 4 | profile.b@example.com | user | Trần Thị Bình | 0976543210 | 20 Hai Bà Trưng, Phường Bến Nghé, TP.HCM |

Storefront đã login A và hiển thị baseline. Mỗi case bắt đầu với snapshot A/B đã xác minh; chỉ thay phone theo Test Data. Không restart backend giữa thao tác và readback. Sau case có mutation, khôi phục fixture độc lập và xác minh lại.

## Kết quả execution

| Test Case ID | Module | Tester | Result | Related Bug | Note |
|---|---|---|---|---|---|
| [TC-PROFILE-WEB-001](../test-cases/profile-web/TC-PROFILE-WEB-001.md) | PROFILE-WEB | vt-toan | Fail | [BUG-PROFILE-WEB-001](../bug-reports/BUG-PROFILE-WEB-001.md) — Issue pending | 15:39 UTC+07; 0912345678 bị alert từ chối, không có PUT; GET/reload vẫn 0987654321; các trường khác A và B giữ snapshot |
| [TC-PROFILE-WEB-002](../test-cases/profile-web/TC-PROFILE-WEB-002.md) | PROFILE-WEB | vt-toan | Fail | [BUG-PROFILE-WEB-001](../bug-reports/BUG-PROFILE-WEB-001.md) — Issue pending | 15:48 UTC+07; input 09123456789 bị alert từ chối; GET/reload vẫn 0987654321; các trường khác A và B giữ snapshot |
| [TC-PROFILE-WEB-003](../test-cases/profile-web/TC-PROFILE-WEB-003.md) | PROFILE-WEB | vt-toan | Pass | None | 15:53 UTC+07; 091234567 bị alert từ chối; không PUT; GET/reload giữ baseline A và B; vị trí alert được người dùng chấp nhận |
| [TC-PROFILE-WEB-004](../test-cases/profile-web/TC-PROFILE-WEB-004.md) | PROFILE-WEB | vt-toan | Not Run | None | UI, phone 12 chữ số: 091234567890 |
| [TC-PROFILE-WEB-007](../test-cases/profile-web/TC-PROFILE-WEB-007.md) | PROFILE-WEB | vt-toan | Not Run | None | API PUT, phone 9 chữ số: 091234567 |
| [TC-PROFILE-WEB-008](../test-cases/profile-web/TC-PROFILE-WEB-008.md) | PROFILE-WEB | vt-toan | Not Run | None | API PUT, phone 12 chữ số: 091234567890 |

## Tổng hợp batch

- Được chỉ định: 6; executed: 3; Pass: 1; Fail: 2; Blocked: 0; Not Run: 3.
- Bugs được xác nhận: 1 UI; chưa publish Issue.
