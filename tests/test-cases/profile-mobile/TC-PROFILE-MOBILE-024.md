# TC-PROFILE-MOBILE-024: API companion — không thể tự nâng role thành admin

## Requirement ID
FR-04; SEC-06; SEC-02

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
| Authorization | Bearer TOKEN_A |
| Body JSON | `{"name":"Nguyễn Văn An","phone":"0987654321","shipping_address":"12 Lê Lợi, Phường Bến Nghé, TP.HCM","role":"admin"}` |

## Test Steps
1. Xác nhận role A/B đều user; lưu snapshot server trước mutation.
2. Gửi PUT có token A và body đủ ba field baseline cùng role=admin.
3. Dùng API client GET /api/users/me với Bearer TOKEN_A và TOKEN_B; so sánh theo ID với snapshot trước case.
4. Login lại A bằng POST /api/login hoặc Mobile để có dữ liệu user/token mới; kiểm tra role user trả về và claim role nếu có. Mở Mobile profile với phiên A mới.

## Expected Result
- Role A vẫn user; không được nâng thành admin qua client. Server có thể reject hoặc bỏ qua field role, không ấn định exact response.
- GET, dữ liệu login mới/claim role nếu có đều không phản ánh quyền admin tự cấp; role/profile B giữ baseline.
- Không chỉ dùng JWT cũ làm bằng chứng role server, vì claim cũ có thể không đổi ngay cả khi database sai.

## Status / Related Bugs
Not Run / None
