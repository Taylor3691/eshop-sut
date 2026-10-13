# TC-PROFILE-MOBILE-027: API companion — sửa ID trong JWT nhưng giữ chữ ký cũ

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
| Authorization | Bearer TOKEN_A_TAMPERED |
| Biến đổi token | Giữ nguyên header/signature TOKEN_A; đổi duy nhất claim id thành B_ID rồi base64url payload JSON (không padding), không ký lại |
| Body JSON | `{"name":"Lê Thị Mai","phone":"0912345678","shipping_address":"35 Nguyễn Huệ, Phường Bến Nghé, TP.HCM"}` |

## Test Steps
1. Ghi snapshot A/B; từ token A thật, tách 3 segment JWT, decode payload và xác nhận claim id=A_ID.
2. Chỉ đổi id=B_ID; encode JSON base64url payload, ghép header cũ.payload mới.signature cũ. Dùng công cụ local, không gửi token lên dịch vụ ngoài.
3. Gửi PUT Test Data với token đã sửa; lưu response.
4. Dùng API client GET /api/users/me với Bearer TOKEN_A và TOKEN_B; so sánh theo ID với snapshot trước case.
5. Login lại B trên Mobile và đối chiếu profile B baseline.

## Expected Result
- JWT đã thay payload mà không ký lại không được xác thực; không cập nhật A/B.
- Mobile login thật vẫn tải đúng baseline B. Không dùng test này làm coverage token expiry hoặc mọi kiểu lỗi chữ ký.

## Status / Related Bugs
Not Run / None
