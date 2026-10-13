# TC-PROFILE-MOBILE-030: API → Native — phiên login mới tải dữ liệu server đã cập nhật

## Requirement ID
FR-04; FR-20; SEC-02

## Module / Test Type / Technique
PROFILE-MOBILE / Functional / Equivalence Partitioning

## Preconditions
- Fixture A/B và snapshot API theo [README bộ cases](README.md) đã xác minh; API client và Mobile dùng cùng backend/database.
- Mỗi case độc lập, baseline được khôi phục; không restart backend giữa thao tác và readback.
- Mobile đã login A (mobile.a@example.com / MobileA123!); chạm lời chào trên header để mở “Hồ sơ của bạn”.

## Test Data
| Field | Value |
|---|---|
| Method / endpoint | PUT /api/users/me |
| Authorization | Bearer TOKEN_A |
| Body JSON | `{"name":"Đặng Thị Lan","phone":"09412345678","shipping_address":"60 Đồng Khởi, Phường Bến Nghé, TP.HCM"}` |

## Test Steps
1. Mobile đang login A và hiển thị baseline; ghi snapshot A/B.
2. Bằng API client, gửi PUT token A với body chính thức Test Data; không chỉnh state/code Mobile.
3. Dùng API client GET /api/users/me với Bearer TOKEN_A và TOKEN_B; so sánh theo ID với snapshot trước case.
4. Nếu GET A không lưu đúng body, ghi lỗi API update và điểm dừng; không dùng dữ liệu local giả làm server snapshot.
5. Sau khi server đã có giá trị mới, logout/login lại A trên Mobile; mở hồ sơ và so name/phone/address/email với GET A hiện tại.

## Expected Result
- API hợp lệ cập nhật đúng A với field shipping_address; B và email/role A giữ nguyên.
- Phiên Mobile sau login mới tải Đặng Thị Lan / 09412345678 / 60 Đồng Khởi, Phường Bến Nghé, TP.HCM; lời chào name cũng phản ánh user mới tải.
- Không yêu cầu phiên đang mở tự refresh realtime trước logout; case này kiểm server → Mobile loading, không thay coverage native save ở 011–013.

## Status / Related Bugs
Not Run / None
