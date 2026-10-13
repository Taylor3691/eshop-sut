# TC-ORDER-STATE-052: UI Admin cũ — confirmed đã bị user hủy không thể thành shipping

## Requirement ID

FR-10; FR-18; AS-OS-04

## Module / Test Type / Technique

ORDER-STATE / Functional / Equivalence Partitioning

## Preconditions

- Tester đã chuẩn bị fixture theo [README](README.md), với admin M, user A/B và đơn ở đúng trạng thái; ghi snapshot trước case.
- ID/JWT là runtime values: lấy TOKEN_M có role admin, TOKEN_A/TOKEN_B có role user và ID thật tương ứng; không dùng ID cố định.
- Mỗi case độc lập. Không restart backend giữa thao tác và readback; không dựa vào case trước để tạo trạng thái nguồn.
- Admin M đăng nhập `http://localhost:5174`, mở tab Đơn hàng. Có API client với token owner để readback độc lập.

## Test Data

| Field | Value |
|---|---|
| Order | `A_CONFIRMED_ID` |
| UI Admin đọc ban đầu | `confirmed` |
| User đổi trước | `canceled` |
| Admin thao tác sau | `shipping` |
| Actor | `M và A` |

## Test Steps

1. Đọc GET `/api/orders/my-orders` với token A, tìm đúng `A_CONFIRMED_ID`; đọc GET `/api/admin/orders` với TOKEN_M để đối chiếu trạng thái và các đơn đối chứng.
2. M mở tab Đơn hàng, tìm A_CONFIRMED_ID ở confirmed; giữ trang, chưa reload.
3. Dùng API client của A gửi PUT `/api/orders/A_CONFIRMED_ID/cancel`, Authorization Bearer TOKEN_A, body `{}`.
4. Đọc lại, xác nhận server đã canceled; nếu chuẩn bị không đạt, ghi phần stale chưa exercise.
5. Trên trang Admin còn confirmed, bấm Giao hàng nếu nút còn hoạt động; nếu trang tự cập nhật/disable nút, ghi rõ việc chặn trước request.
6. Đọc GET `/api/orders/my-orders` với token A, tìm đúng `A_CONFIRMED_ID`; đọc GET `/api/admin/orders` với TOKEN_M để đối chiếu trạng thái và các đơn đối chứng.
7. Tải lại trang Admin, đối chiếu state.

## Expected Result

- Đơn đã canceled không bị hồi sinh thành shipping từ trang Admin cũ.
- Nếu request shipping tới server sau khi canceled, API trả lỗi phù hợp và giữ canceled; nếu UI chặn trước đó thì phần backend stale chưa exercise.
- Reload cho thấy canceled; các đơn đối chứng không đổi. Không suy rộng sang race/locking đồng thời.

## Status / Related Bugs

Not Run / None
