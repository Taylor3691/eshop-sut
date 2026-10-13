# TC-PROFILE-MOBILE-026: API companion — token A không chọn B qua query

## Requirement ID
FR-04; SEC-02

## Module / Test Type / Technique
PROFILE-MOBILE / Functional / Equivalence Partitioning

## Preconditions
- Fixture A/B và snapshot API theo [README bộ cases](README.md) đã xác minh; API client và Mobile dùng cùng backend/database.
- Mỗi case độc lập, baseline được khôi phục; không restart backend giữa thao tác và readback.
- Tester có API client; TOKEN_A/TOKEN_B và A_ID/B_ID runtime đúng tài khoản. Đây là API companion, không phải native UI update.

## Test Data
| Field | Value |
|---|---|
| Method / endpoint | PUT /api/users/me?user_id=B_ID |
| Authorization | Bearer TOKEN_A |
| Body JSON template | `{"name":"Lê Thị Mai","phone":"0912345678","shipping_address":"35 Nguyễn Huệ, Phường Bến Nghé, TP.HCM"}` |
| Runtime substitution | Thay B_ID trong query bằng ID thật của B |

## Test Steps
1. Xác nhận A_ID khác B_ID, token A thuộc A; lưu snapshot A/B.
2. Gửi request Test Data: selector query user_id trỏ B, token vẫn của A.
3. Dùng API client GET /api/users/me với Bearer TOKEN_A và TOKEN_B; so sánh theo ID với snapshot trước case.
4. Login lại B trên Mobile; kiểm tra profile B vẫn baseline. Có thể login A để đối chiếu trường của A nếu request được chấp nhận.

## Expected Result
- Không có trường nào của B bị thay bằng dữ liệu do A gửi. Reject toàn request hoặc ignore selector và chỉ cập nhật A đều bảo vệ ownership.
- Nếu A được cập nhật, chỉ ba field đúng body có thể đổi; email/role A giữ nguyên. Không yêu cầu mọi extra field phải bị reject.
- Mobile B sau login mới vẫn baseline; case không chứng minh mọi selector hoặc native session isolation.

## Status / Related Bugs
Not Run / None
