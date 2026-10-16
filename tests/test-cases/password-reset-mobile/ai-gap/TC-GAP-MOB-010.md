# TC-GAP-MOB-010: Thông báo lỗi mạng sai lệch ở Bước 2 trên Mobile

## Requirement ID

FR-03; FR-01

## Module / Test Type / Technique

PASSWORD-RESET-MOBILE / Functional / AI Gap Analysis

## Preconditions

- Người dùng đã điền mã OTP và mật khẩu mới hợp lệ tại Bước 2.
- Ứng dụng bị mất kết nối mạng hoặc server ngừng hoạt động.

## Test Data

| Trường / Điều kiện | Giá trị |
|---|---|
| Trạng thái mạng | Mất kết nối (Offline / Network Error) |
| Thao tác | Nhấn nút "Đặt lại mật khẩu" |

## Test Steps

1. Nhập mã OTP và mật khẩu mới.
2. Ngắt kết nối mạng của thiết bị hoặc dừng backend server.
3. Nhấn nút "Đặt lại mật khẩu".
4. Quan sát nội dung thông báo hiển thị trên hộp thoại Alert.

## Expected Result

- Ứng dụng phải bắt lỗi mạng và hiển thị thông báo rõ ràng về sự cố kết nối: "Lỗi kết nối mạng" hoặc "Không thể kết nối đến máy chủ".
- Không được quy chụp lỗi mất mạng thành lỗi do người dùng nhập sai mã OTP.

## Actual Result

Khối catch hiển thị cố định: "Mã OTP không đúng hoặc có lỗi xảy ra."

## Missing Scenario

Kiểm tra thông báo lỗi hiển thị cho người dùng khi xảy ra sự cố mất kết nối mạng (network timeout / offline) lúc thực hiện đặt lại mật khẩu tại Bước 2.

## Gap Rationale

Trong `frontend-mobile/App.js:281-283`, khối `catch (error)` của `handleResetPassword` hiển thị cố định: `Alert.alert("Lỗi", "Mã OTP không đúng hoặc có lỗi xảy ra.")`. Điều này đánh lừa người dùng rằng mã OTP của họ bị sai khi gặp sự cố mạng, gây hoang mang và cản trở trải nghiệm người dùng.

## Status / Related Bugs

FAIL / DEF-FR03-11 — see [execution report](../../../test-summary/FR-03-mobile-ai-gap-analysis.md).
