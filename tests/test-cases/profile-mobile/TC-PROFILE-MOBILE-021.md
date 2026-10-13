# TC-PROFILE-MOBILE-021: API companion — PUT hồ sơ không token

## Requirement ID
SEC-02; FR-04

## Module / Test Type / Technique
PROFILE-MOBILE / Functional / Equivalence Partitioning

## Preconditions
- Fixture A/B và snapshot API theo [README bộ cases](README.md) đã xác minh; API client và Mobile dùng cùng backend/database.
- Mỗi case độc lập, baseline được khôi phục; không restart backend giữa thao tác và readback.
- Tester có API client; TOKEN_A/TOKEN_B và A_ID/B_ID runtime đúng tài khoản. Đây là API companion, không phải native UI update.

## Test Data
| Field | Value |
|---|---|
| Method / endpoint | PUT /api/users/me |
| Authorization | Không gửi header; tắt auth kế thừa/cookie |
| Content-Type | application/json |
| Body JSON | `{"name":"Lê Thị Mai","phone":"0912345678","shipping_address":"35 Nguyễn Huệ, Phường Bến Nghé, TP.HCM"}` |

## Test Steps
1. Ghi snapshot A/B bằng GET có token hợp lệ; chuẩn bị request riêng với đúng header ở Test Data.
2. Gửi PUT /api/users/me; ghi response/status và dữ liệu trả về. Không tự bổ sung token hợp lệ vào request negative.
3. Dùng API client GET /api/users/me với Bearer TOKEN_A và TOKEN_B; so sánh theo ID với snapshot trước case.
4. Login lại A trên Mobile, mở profile đối chiếu với baseline; API negative không được làm native hiển thị profile đã bị đổi.

## Expected Result
- Request không được cập nhật hồ sơ khi JWT không hợp lệ/thiếu; profile A/B giữ snapshot.
- Không chốt 401/403 hoặc nguyên văn lỗi. Mobile login hợp lệ vẫn tải baseline; đây là API security coverage, không phải native network-error handling.

## Status / Related Bugs
Not Run / None
