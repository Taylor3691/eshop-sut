# TC-PROFILE-MOBILE-019: Native — tải đúng hồ sơ server khi login

## Requirement ID
FR-04; FR-20

## Module / Test Type / Technique
PROFILE-MOBILE / Functional / Equivalence Partitioning

## Preconditions
- Fixture A/B và snapshot API theo [README bộ cases](README.md) đã xác minh; API client và Mobile dùng cùng backend/database.
- Mỗi case độc lập, baseline được khôi phục; không restart backend giữa thao tác và readback.
- App chưa login; baseline A đã được chuẩn bị độc lập với native update form.

## Test Data
| Field | Value |
|---|---|
| Tài khoản / quyền | A / user |
| name | Nguyễn Văn An |
| phone | 0987654321 |
| shipping_address / ô Địa chỉ | 12 Lê Lợi, Phường Bến Nghé, TP.HCM |
| Email | mobile.a@example.com |

## Test Steps
1. GET A/B bằng token hợp lệ; lưu snapshot chính xác theo ID.
2. Login A trên Mobile; chạm lời chào để mở hồ sơ.
3. Đối chiếu name/phone/address/email form và tên trên lời chào với server snapshot; không bấm Cập nhật.

## Expected Result
- Form tải đúng name/phone/shipping_address/email A và lời chào phản ánh tên A; phone giữ 0 đầu.
- Không trộn dữ liệu B; chỉ xem/login không đổi hồ sơ A/B. Case này kiểm loading, không chứng minh native update đã lưu.

## Status / Related Bugs
Not Run / None
