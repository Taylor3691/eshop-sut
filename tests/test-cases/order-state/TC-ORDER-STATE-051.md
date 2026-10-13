# TC-ORDER-STATE-051: UI User cũ — confirmed đã thành shipping không còn được hủy

## Requirement ID

FR-10; FR-18; AS-OS-04

## Module / Test Type / Technique

ORDER-STATE / Functional / Equivalence Partitioning

## Preconditions

- Tester đã chuẩn bị fixture theo [README](README.md), với admin M, user A/B và đơn ở đúng trạng thái; ghi snapshot trước case.
- ID/JWT là runtime values: lấy TOKEN_M có role admin, TOKEN_A/TOKEN_B có role user và ID thật tương ứng; không dùng ID cố định.
- Mỗi case độc lập. Không restart backend giữa thao tác và readback; không dựa vào case trước để tạo trạng thái nguồn.
- User A đăng nhập `http://localhost:5173`, mở `/profile`. Có API client với token A/M để readback độc lập.

## Test Data

| Field | Value |
|---|---|
| Order | `A_CONFIRMED_ID` |
| UI đọc ban đầu | `confirmed` |
| Admin đổi trước | `shipping` |
| User thao tác sau | `cancel` |
| Actor | `A và M` |

## Test Steps

1. Đọc GET `/api/orders/my-orders` với token A, tìm đúng `A_CONFIRMED_ID`; đọc GET `/api/admin/orders` với TOKEN_M để đối chiếu trạng thái và các đơn đối chứng.
2. A mở `/profile`, tìm A_CONFIRMED_ID ở confirmed; giữ trang này, chưa reload.
3. Dùng API client của M gửi PUT `/api/admin/orders/A_CONFIRMED_ID/status`, Authorization Bearer TOKEN_M, body `{"status":"shipping"}`.
4. Đọc lại bằng token owner và admin, xác nhận server đã shipping; nếu bước chuẩn bị không đạt, không coi phần stale đã exercise.
5. Trên trang A còn dữ liệu confirmed, bấm Hủy đơn nếu nút còn hoạt động; nếu trang tự cập nhật/disable nút, ghi nhận việc chặn trước request.
6. Đọc GET `/api/orders/my-orders` với token A, tìm đúng `A_CONFIRMED_ID`; đọc GET `/api/admin/orders` với TOKEN_M để đối chiếu trạng thái và các đơn đối chứng.
7. Tải lại `/profile` để đối chiếu trạng thái.

## Expected Result

- User không hủy được đơn đã shipping, dù UI trước đó đọc confirmed.
- Nếu cancel request được gửi sau khi server là shipping, API báo lỗi phù hợp và giữ shipping; nếu UI cập nhật/chặn trước request thì ghi rõ phần backend stale chưa exercise.
- Reload cho thấy shipping; các đơn đối chứng không đổi. Đây là trình tự tuần tự, không chứng minh atomicity của request đồng thời.

## Status / Related Bugs

Not Run / None
