# FR-11 — Test cases

Nguồn: miền ở `docs/fr-11/02-equivalence-partitioning.md` và biên ở `docs/fr-11/03-boundary-value-analysis.md`.

## Oracle

Expected result bám README, không bám code.

- Người xem chỉ thấy đơn có `user_id` trùng mình.
- Mỗi đơn hiện mã, ngày đặt, tổng tiền, trạng thái hiện tại.
- Trạng thái thuộc FR-10 thì nhãn là tiếng Việt, không phải mã tiếng Anh, và màu khác bốn trạng thái kia. README không chốt câu chữ.
- Tổng tiền dùng `₫` và phân cách hàng nghìn (FR-21).
- Không có đơn của mình: empty state có icon và message thân thiện (FR-24).
- Chưa đăng nhập hoặc JWT không hợp lệ: không nhận được danh sách đơn (SEC-02).
- `user_id` trên query không thuộc FR-11. Gửi nó không được đổi tập đơn so với cùng người gọi khi không gửi, và không được trả lỗi.
- `NULL` không phải số `0` và không phải một ngày. Ô tương ứng không được bịa `0 ₫` hoặc một ngày. Trang không đổ lỗi.

## Cách rút số test case

**Hợp lệ — base choice.** Mức chuẩn là một đơn của user id 2:

| Trường | Mức chuẩn |
| --- | --- |
| Người gọi | `test@eshop.com` / `Test1234!`, id 2 |
| `id` | 1 |
| `user_id` | 2 |
| `status` | `pending` |
| `created_at` | `2026-10-15 10:00:00` |
| `total_amount` | 30000000 |

Mỗi lớp hoặc biên hợp lệ khác được phủ bằng một test, chỉ đổi yếu tố đó. `N = 1` là CNT-B-02, nằm trong CNT-VEC-02. `N = 2` mới là CNT-B-03.

**Không hợp lệ — một lỗi một test.** Chỉ một dữ liệu sai. Trường còn lại ở mức chuẩn.

Seed không có đơn. Dòng trong bảng là dữ liệu phải tạo trước khi mở lịch sử. `id` ghi trong bảng là id chèn tường minh.

## Quy trình

**UI.** Tạo dòng `orders` của test. Đăng nhập `test@eshop.com`. Mở `http://localhost:5173/profile`. TC-24 không đăng nhập.

**API.** `GET http://localhost:3000/api/orders/my-orders`. Dùng khi test đụng header hoặc query mà trang không có ô nhập.

## Test case hợp lệ

| TC ID | Miền/Biên được phủ | Precondition | Test Data | Steps | Expected Result |
| --- | --- | --- | --- | --- | --- |
| TC-01 | SES-VEC-01, AUTH-VEC-01, OWN-VEC-01, OWN-B-02, CNT-B-02, ST-VEC-01, ID-VEC-01, ID-B-02, DT-VEC-01, AMT-VEC-01 | User id 2 | Một đơn mức chuẩn | UI | Đúng một đơn. Mã `1`. Ngày là 15/10/2026. Tiền `30.000.000 ₫`. Nhãn `pending` là tiếng Việt, có màu. Trang một `h1`. |
| TC-02 | CNT-VEC-01, CNT-B-01 | User id 2 có 0 đơn | Không có dòng `orders` | UI | Empty state có icon và message thân thiện. Không có bảng đơn. |
| TC-03 | CNT-B-03 | User id 2 | Hai đơn mức chuẩn, `id` 1 và 2 | UI | Đúng hai dòng. Cả hai mã, ngày 15/10/2026, tiền `30.000.000 ₫`, nhãn tiếng Việt của `pending`. |
| TC-04 | OWN-VEC-02, OWN-B-01 | User id 2 | Đơn chuẩn `id=1` và một đơn `id=2`, `user_id=1`, trường khác chuẩn | UI | Chỉ thấy đơn `id=1`. Đơn của admin không xuất hiện. |
| TC-05 | OWN-B-03 | User id 2 | Đơn chuẩn `id=1` và một đơn `id=2`, `user_id=3`, trường khác chuẩn | UI | Chỉ thấy đơn `id=1`. Đơn `user_id=3` không xuất hiện. |
| TC-06 | ID-B-01 | User id 2 | Một đơn chuẩn nhưng `id=0` | UI | Thấy mã `0`, ngày 15/10/2026, tiền `30.000.000 ₫`. |
| TC-07 | ID-B-03 | User id 2 | Một đơn chuẩn nhưng `id=2` | UI | Thấy đúng một đơn, mã `2`. |
| TC-08 | ST-VEC-02 | User id 2 | Một đơn chuẩn nhưng `status=confirmed` | UI | Nhãn tiếng Việt của `confirmed`, màu khác `pending`, `shipping`, `delivered`, `canceled`. Vẫn hiện mã, ngày, tiền chuẩn. |
| TC-09 | ST-VEC-03 | User id 2 | Một đơn chuẩn nhưng `status=shipping` | UI | Nhãn tiếng Việt của `shipping`, màu khác bốn trạng thái kia. |
| TC-10 | ST-VEC-04 | User id 2 | Một đơn chuẩn nhưng `status=delivered` | UI | Đơn vẫn trong lịch sử. Nhãn tiếng Việt của `delivered`, màu khác bốn trạng thái kia. |
| TC-11 | ST-VEC-05 | User id 2 | Một đơn chuẩn nhưng `status=canceled` | UI | Đơn vẫn trong lịch sử. Nhãn tiếng Việt của `canceled`, màu khác bốn trạng thái kia. |
| TC-12 | AMT-B-01 | User id 2 | Một đơn chuẩn nhưng `total_amount=-1` | UI | Tiền hiện `-1 ₫`. |
| TC-13 | AMT-B-02 | User id 2 | Một đơn chuẩn nhưng `total_amount=0` | UI | Tiền hiện `0 ₫`. |
| TC-14 | AMT-B-03 | User id 2 | Một đơn chuẩn nhưng `total_amount=1` | UI | Tiền hiện `1 ₫`. |
| TC-15 | AMT-B-04 | User id 2 | Một đơn chuẩn nhưng `total_amount=999` | UI | Tiền hiện `999 ₫`. |
| TC-16 | AMT-B-05 | User id 2 | Một đơn chuẩn nhưng `total_amount=1000` | UI | Tiền hiện `1.000 ₫`. |
| TC-17 | AMT-B-06 | User id 2 | Một đơn chuẩn nhưng `total_amount=1001` | UI | Tiền hiện `1.001 ₫`. |
| TC-18 | AMT-B-07 | User id 2 | Một đơn chuẩn nhưng `total_amount=999999` | UI | Tiền hiện `999.999 ₫`. |
| TC-19 | AMT-B-08 | User id 2 | Một đơn chuẩn nhưng `total_amount=1000000` | UI | Tiền hiện `1.000.000 ₫`. |
| TC-20 | AMT-B-09 | User id 2 | Một đơn chuẩn nhưng `total_amount=1000001` | UI | Tiền hiện `1.000.001 ₫`. |

## Test case không hợp lệ

| TC ID | Miền/Biên được phủ | Precondition | Test Data | Steps | Expected Result |
| --- | --- | --- | --- | --- | --- |
| TC-21 | DT-IEC-01 | User id 2 | Một đơn chuẩn nhưng `created_at` là `NULL` | UI | Đơn vẫn hiện mã, tiền `30.000.000 ₫`, nhãn `pending`. Ô ngày không bịa một ngày. Trang không lỗi. |
| TC-22 | AMT-IEC-01 | User id 2 | Một đơn chuẩn nhưng `total_amount` là `NULL` | UI | Đơn vẫn hiện mã, ngày 15/10/2026, nhãn `pending`. Ô tiền không hiện `0 ₫`. Trang không lỗi. |
| TC-23 | ST-IEC-01 | User id 2 | Một đơn chuẩn nhưng `status=returned` | UI | Đơn vẫn hiện mã, ngày, tiền chuẩn. Nhãn không phải nhãn của năm trạng thái FR-10. Trang không lỗi. |
| TC-24 | SES-IEC-01 | Đơn chuẩn của user id 2 đang có. Chưa đăng nhập | Mở `/profile` | UI | Không thấy mã `1` và không thấy `30.000.000 ₫`. |
| TC-25 | AUTH-IEC-01 | Đơn chuẩn của user id 2 đang có | `GET /api/orders/my-orders` không có header `Authorization` | API | Bị từ chối. Thân response không phải danh sách chứa đơn `id=1`. |
| TC-26 | AUTH-IEC-02 | Đơn chuẩn của user id 2 đang có | Header `Authorization: Bearer not-a-jwt` | API | Bị từ chối. Thân response không phải danh sách chứa đơn `id=1`. |
| TC-27 | Q-IEC-01 | Đơn chuẩn của user id 2 đang có | Token hợp lệ của id 2. Query `user_id=1` | API | HTTP không phải lỗi. JSON chỉ có đơn `id=1` của user 2, giống lúc không gửi query. |

## Kiểm tra giao diện bổ sung từ AI gap analysis

| TC ID | Miền/Biên được phủ | Precondition | Test Data | Steps | Expected Result |
| --- | --- | --- | --- | --- | --- |
| TC-28 | UI-TAB (GAP-11-02, FR-21) | User id 2 đăng nhập | Hai đơn chuẩn `id` 1 và 2 (có nút Hủy đơn để nhận focus) | UI: mở `/profile`, nhấn Tab liên tục từ đầu trang | Mỗi phần tử nhận focus tiếp theo không nằm phía trên phần tử trước; cùng hàng thì nằm bên phải. Oracle đọc FR-21 theo thứ tự dòng (row-major). |

Trang `/profile` có hai cột. Nếu FR-21 được hiểu theo cột (hết cột trái rồi sang cột phải) thì oracle khác. Kết quả TC-28 vì vậy là phát hiện cần làm rõ, không tự động là bug.

## Phủ

| Mã | Test |
| --- | --- |
| SES-VEC-01, AUTH-VEC-01, OWN-VEC-01, OWN-B-02, CNT-B-02, ST-VEC-01, ID-VEC-01, ID-B-02, DT-VEC-01, AMT-VEC-01 | TC-01 |
| CNT-VEC-01, CNT-B-01 | TC-02 |
| CNT-VEC-02 | TC-01 |
| CNT-B-03 | TC-03 |
| OWN-VEC-02, OWN-B-01 | TC-04 |
| OWN-B-03 | TC-05 |
| ID-B-01 | TC-06 |
| ID-B-03 | TC-07 |
| ST-VEC-02 | TC-08 |
| ST-VEC-03 | TC-09 |
| ST-VEC-04 | TC-10 |
| ST-VEC-05 | TC-11 |
| AMT-B-01 … AMT-B-09 | TC-12 … TC-20 |
| DT-IEC-01 | TC-21 |
| AMT-IEC-01 | TC-22 |
| ST-IEC-01 | TC-23 |
| SES-IEC-01 | TC-24 |
| AUTH-IEC-01 | TC-25 |
| AUTH-IEC-02 | TC-26 |
| Q-IEC-01 | TC-27 |

Phủ điểm on/off/in/out (bước 3, phần A):

| Biên | On | Off | In | Out |
| --- | --- | --- | --- | --- |
| A.1 `N ≥ 1` | TC-01 | TC-02 | TC-03 | TC-02 |
| A.2 `amount ≥ 1000` | TC-16 | TC-15 | TC-01 | TC-14 |
| A.3 `amount ≥ 1000000` | TC-19 | TC-18 | TC-01 | TC-16 |

## Phạm vi oracle cần xác nhận

TC-21/TC-22 chèn NULL trực tiếp vào DB là kiểm thử độ bền với dữ liệu thiếu. Expected không bịa ngày/tiền là tiêu chí đề xuất của người kiểm thử; README chưa quy định cách hiển thị NULL. FAIL ở hai case này là lệch tiêu chí đề xuất, chưa đủ xác nhận vi phạm đặc tả. Không tính hai phát hiện tương ứng là bug đã xác nhận.
