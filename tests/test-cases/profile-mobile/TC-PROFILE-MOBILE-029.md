# TC-PROFILE-MOBILE-029: Fixture → Native — địa chỉ giống markup hiển thị an toàn

## Requirement ID
SEC-04; FR-20

## Module / Test Type / Technique
PROFILE-MOBILE / Functional / Equivalence Partitioning

## Preconditions
- Fixture A/B và snapshot API theo [README bộ cases](README.md) đã xác minh; API client và Mobile dùng cùng backend/database.
- Mỗi case độc lập, baseline được khôi phục; không restart backend giữa thao tác và readback.
- Tester chuẩn bị fixture A có shipping_address=<b>Địa chỉ thử</b> bằng database local có kiểm soát hoặc API nếu được chấp nhận; phone vẫn 0987654321. GET xác minh chuỗi đã đến server.
- Không dùng native update có thể bị chặn làm điều kiện duy nhất. Nếu fixture không tới điểm hiển thị, ghi hạn chế/Blocked trong test run; không đánh Pass safe-render.

## Test Data
| Field | Value |
|---|---|
| Tài khoản / quyền | A / user |
| name | Nguyễn Văn An |
| phone | 0987654321 |
| shipping_address / ô Địa chỉ | <b>Địa chỉ thử</b> |
| Display target | Địa chỉ giao hàng native |
| Markup | Chuỗi probe vô hại; <b> không được diễn giải thành markup |

## Test Steps
1. GET A bằng token hợp lệ, xác nhận chuỗi probe thực tế trong field; lưu snapshot B.
2. Login A trên Mobile, mở hồ sơ; quan sát đúng field có probe.
3. Chạm ô địa chỉ và đọc chuỗi trong TextInput; không gửi Cập nhật.
4. Ghi bằng chứng hiển thị; GET A/B đối chiếu không có mutation do chỉ xem; khôi phục fixture khi kết thúc.

## Expected Result
- Chuỗi probe, khi đã đến renderer, được hiển thị như văn bản user an toàn; không diễn giải tag <b> thành nội dung markup. Không có thực thi/điều hướng hoặc nội dung hoạt động từ dữ liệu user.
- Không mất dữ liệu chữ tiếng Việt do render; form/header tương ứng đúng tài khoản A. B không đổi.
- Đây là smoke case safe-display với markup vô hại, không chứng minh mọi XSS payload/platform hoặc acceptance mọi name/address. Fixture bị từ chối trước renderer không đồng nghĩa Pass SEC-04.

## Status / Related Bugs
Not Run / None
