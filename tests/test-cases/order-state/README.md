# Pool B — Bộ test cases trạng thái đơn hàng

Thiết kế theo [Domain/BVA Analysis](../../test-summary/order-state-analysis.md), template `TC-[MODULE]-[NUMBER]`. Module `ORDER-STATE` chỉ xét storefront/Admin/API; Mobile ngoài scope. **32 cases EP sau tinh gọn 52 → 32, tất cả Not Run / None; 0 BVA cases** vì FR-10 không có ordered domain/threshold.

## Fixture tài khoản

| Chủ thể | Email | Mật khẩu test | Role |
|---|---|---|---|
| A | orders.a@example.com | OrdersA123! | user |
| B | orders.b@example.com | OrdersB123! | user |
| M | admin@eshop.com | Admin123! | admin |

A/B là tài khoản test do tester tạo; M là admin seed nếu môi trường còn dùng seed gốc. Tester xác minh credential/role thực tế, ghi `A_ID`, `B_ID`, `M_ID` và `TOKEN_A`, `TOKEN_B`, `TOKEN_M` qua đăng nhập. Không dùng token user bị nâng role để giả làm admin fixture.

## Fixture đơn hàng

| ID ký hiệu (thay bằng ID thật) | Owner | status baseline | total_amount | shipping_address |
|---|---|---|---|---|
| A_PENDING_ID | A | pending | 200000 | 12 Lê Lợi, Phường Bến Nghé, TP.HCM |
| B_PENDING_ID | B | pending | 200000 | 20 Hai Bà Trưng, Phường Bến Nghé, TP.HCM |
| A_CONFIRMED_ID | A | confirmed | 200000 | 12 Lê Lợi, Phường Bến Nghé, TP.HCM |
| B_CONFIRMED_ID | B | confirmed | 200000 | 20 Hai Bà Trưng, Phường Bến Nghé, TP.HCM |
| A_SHIPPING_ID | A | shipping | 200000 | 12 Lê Lợi, Phường Bến Nghé, TP.HCM |
| B_SHIPPING_ID | B | shipping | 200000 | 20 Hai Bà Trưng, Phường Bến Nghé, TP.HCM |
| A_DELIVERED_ID | A | delivered | 200000 | 12 Lê Lợi, Phường Bến Nghé, TP.HCM |
| B_DELIVERED_ID | B | delivered | 200000 | 20 Hai Bà Trưng, Phường Bến Nghé, TP.HCM |
| A_CANCELED_ID | A | canceled | 200000 | 12 Lê Lợi, Phường Bến Nghé, TP.HCM |
| B_CANCELED_ID | B | canceled | 200000 | 20 Hai Bà Trưng, Phường Bến Nghé, TP.HCM |
| A_CONTROL_ID | A | pending | 300000 | 30 Lê Lợi, Phường Bến Nghé, TP.HCM |
| B_CONTROL_ID | B | pending | 400000 | 40 Hai Bà Trưng, Phường Bến Nghé, TP.HCM |
| MISSING_ORDER_ID | Không có | Không tồn tại | Không áp dụng | Không áp dụng |

Các số tiền chỉ là dữ liệu fixture; không phải boundary hoặc bài kiểm thử checkout.

1. Tester chuẩn bị local SUT và A/B, ví dụ đăng ký qua `POST /api/register` rồi đăng nhập. Không đăng ký trùng email đã có; xác minh role/ID bằng nguồn độc lập phù hợp.
2. Có thể tạo các đơn ban đầu bằng `POST /api/checkout`, token owner, body ví dụ `{"total_amount":200000,"shipping_address":"12 Lê Lợi, Phường Bến Nghé, TP.HCM"}`. Đây là setup của tester, không phải agent execute FR-08.
3. Chuẩn bị trạng thái nguồn độc lập bằng fixture database có kiểm soát nếu API chuyển trạng thái đang lỗi. Chỉ điều chỉnh đúng đơn test sau khi xác nhận ID/owner; ghi nguồn tạo dữ liệu. Không ép terminal→nonterminal bằng endpoint đang kiểm thử để làm setup, cũng không coi việc sửa fixture là transition được phép của SUT.
4. Ghi ID thực cho mỗi ký hiệu. Các ID phải khác nhau; MISSING_ORDER_ID là ID xác nhận không tồn tại, không giả định max+1/min−1.
5. Ghi snapshot owner/status/total_amount/address/created_at từng đơn và hai control orders. Nếu tái dùng fixture sau case, khôi phục đúng baseline bằng cách đã kiểm soát và xác minh lại. Mỗi case bắt đầu độc lập.
6. Backend startup drop/reseed database; không restart giữa request và readback. Đơn seed không có sẵn ở mọi trạng thái nên việc chuẩn bị fixture không được bỏ qua.

## Readback và thao tác

- API base `http://localhost:3000`; Admin `http://localhost:5174`; user `http://localhost:5173/profile`.
- GET `/api/orders/my-orders` dùng token owner A/B; GET `/api/admin/orders` dùng TOKEN_M. Đối chiếu đúng ID, không suy trạng thái từ thứ tự hàng hoặc chỉ message.
- Chỉ dùng GET lists có auth để readback; không dựa vào GET order detail không được kiểm tra quyền. Nếu đường đọc phụ thuộc lỗi, ghi hạn chế/Blocked rõ ràng hoặc bổ sung evidence đọc database độc lập do tester thực hiện; không tự kết luận mutation đúng.
- API status: PUT `/api/admin/orders/<ID>/status`, body JSON `{"status":"<target>"}`. API cancel: PUT `/api/orders/<ID>/cancel`, body `{}`, target ngầm định canceled.
- Với request thiếu token, xóa Authorization và tắt auth/cookie kế thừa. Với case role, JWT user phải hợp lệ để cô lập role gate.
- State trên storefront có thể có nhãn Việt: pending = Chờ xác nhận; confirmed = Đã xác nhận; shipping = Đang giao; delivered = Đã giao; canceled = Đã hủy. Luôn đối chiếu giá trị API và ID.
- Cases negative UI chấp nhận ẩn/disable nút hoặc request bị từ chối; không tự áp requirement mọi nút cấm phải ẩn.
- Case 027 phụ thuộc AS-OS-03 về user không được hủy đơn người khác. Cần review oracle này trước khi coi khác biệt là bug đã xác nhận.
- 024/050 đã loại, canceled retry còn AM-OS-02 và EP-OS-15 deferred; không ấn định response. Cases 051–052 chỉ exercise backend stale nếu request tới server sau khi trạng thái đã đổi.
- Không có case gán kết quả cho admin shipping→canceled hoặc 5 same-state response policies. Những phần này đang mở tại AM-OS-01/02.
- Không gọi `pending=1…canceled=5` là BVA; không viết Pass/Fail khi chưa execute. Actual Result, evidence và bug links thuộc test run do người dùng thực hiện sau này.

## Generated Test Cases

| ID | Mục tiêu | Technique |
|---|---|---|
| [TC-ORDER-STATE-001](TC-ORDER-STATE-001.md) | API Admin — cho phép pending → confirmed | Equivalence Partitioning |
| [TC-ORDER-STATE-002](TC-ORDER-STATE-002.md) | API Admin — cho phép confirmed → shipping | Equivalence Partitioning |
| [TC-ORDER-STATE-003](TC-ORDER-STATE-003.md) | API Admin — cho phép shipping → delivered | Equivalence Partitioning |
| [TC-ORDER-STATE-004](TC-ORDER-STATE-004.md) | API Admin — cho phép pending → canceled | Equivalence Partitioning |
| [TC-ORDER-STATE-005](TC-ORDER-STATE-005.md) | API Admin — cho phép confirmed → canceled | Equivalence Partitioning |
| [TC-ORDER-STATE-006](TC-ORDER-STATE-006.md) | API Admin — từ chối pending → shipping | Equivalence Partitioning |
| [TC-ORDER-STATE-008](TC-ORDER-STATE-008.md) | API Admin — từ chối confirmed → pending | Equivalence Partitioning |
| [TC-ORDER-STATE-009](TC-ORDER-STATE-009.md) | API Admin — từ chối confirmed → delivered | Equivalence Partitioning |
| [TC-ORDER-STATE-011](TC-ORDER-STATE-011.md) | API Admin — từ chối shipping → confirmed | Equivalence Partitioning |
| [TC-ORDER-STATE-012](TC-ORDER-STATE-012.md) | API Admin — từ chối delivered → pending | Equivalence Partitioning |
| [TC-ORDER-STATE-015](TC-ORDER-STATE-015.md) | API Admin — từ chối delivered → canceled | Equivalence Partitioning |
| [TC-ORDER-STATE-016](TC-ORDER-STATE-016.md) | API Admin — từ chối canceled → pending | Equivalence Partitioning |
| [TC-ORDER-STATE-019](TC-ORDER-STATE-019.md) | API Admin — từ chối canceled → delivered | Equivalence Partitioning |
| [TC-ORDER-STATE-020](TC-ORDER-STATE-020.md) | API User — hủy đơn pending | Equivalence Partitioning |
| [TC-ORDER-STATE-021](TC-ORDER-STATE-021.md) | API User — hủy đơn confirmed | Equivalence Partitioning |
| [TC-ORDER-STATE-022](TC-ORDER-STATE-022.md) | API User — không được hủy đơn shipping | Equivalence Partitioning |
| [TC-ORDER-STATE-023](TC-ORDER-STATE-023.md) | API User — không được hủy đơn delivered | Equivalence Partitioning |
| [TC-ORDER-STATE-025](TC-ORDER-STATE-025.md) | API — user thường không có quyền xác nhận đơn A qua endpoint Admin | Equivalence Partitioning |
| [TC-ORDER-STATE-027](TC-ORDER-STATE-027.md) | API — A không được hủy đơn pending của B (AS-OS-03) | Equivalence Partitioning |
| [TC-ORDER-STATE-029](TC-ORDER-STATE-029.md) | API User — không có token bị từ chối | Equivalence Partitioning |
| [TC-ORDER-STATE-030](TC-ORDER-STATE-030.md) | API Admin — không có token bị từ chối | Equivalence Partitioning |
| [TC-ORDER-STATE-032](TC-ORDER-STATE-032.md) | API Admin — token sai định dạng bị từ chối | Equivalence Partitioning |
| [TC-ORDER-STATE-033](TC-ORDER-STATE-033.md) | API Admin — JWT user sửa role nhưng giữ chữ ký cũ bị từ chối | Equivalence Partitioning |
| [TC-ORDER-STATE-034](TC-ORDER-STATE-034.md) | API Admin — từ chối chuỗi target ngoài enum | Equivalence Partitioning |
| [TC-ORDER-STATE-035](TC-ORDER-STATE-035.md) | API Admin — từ chối thiếu trường status | Equivalence Partitioning |
| [TC-ORDER-STATE-038](TC-ORDER-STATE-038.md) | API Admin — từ chối status sai kiểu number | Equivalence Partitioning |
| [TC-ORDER-STATE-039](TC-ORDER-STATE-039.md) | API Admin — không chuyển được đơn không tồn tại | Equivalence Partitioning |
| [TC-ORDER-STATE-040](TC-ORDER-STATE-040.md) | API User — không chuyển được đơn không tồn tại | Equivalence Partitioning |
| [TC-ORDER-STATE-041](TC-ORDER-STATE-041.md) | UI Admin — chuỗi xác nhận, giao và hoàn thành đơn của B | Equivalence Partitioning |
| [TC-ORDER-STATE-046](TC-ORDER-STATE-046.md) | UI User — hủy đơn pending | Equivalence Partitioning |
| [TC-ORDER-STATE-051](TC-ORDER-STATE-051.md) | UI User cũ — confirmed đã thành shipping không còn được hủy | Equivalence Partitioning |
| [TC-ORDER-STATE-052](TC-ORDER-STATE-052.md) | UI Admin cũ — confirmed đã bị user hủy không thể thành shipping | Equivalence Partitioning |

## Phạm vi sau tinh gọn

- 32 active cases (28 API + 4 UI/sequence/stale), giữ ID gốc và nội dung cases còn lại. Loại 007/010/013/014/017/018/024/026/028/031/036/037/042/043/044/045/047/048/049/050; file cũ có trong Git history.
- Admin: giữ đủ 5 allowed + 8 forbidden pairs đại diện; không còn exhaustive 19/19 known-pair coverage. Trong 6 pairs không có standalone case, canceled→shipping còn stale 052 có điều kiện; 5 pairs hoàn toàn deferred.
- User: giữ API cancel pending/confirmed, từ chối shipping/delivered; canceled retry deferred. UI giữ Admin normal chain, User pending cancel và hai stale sequences.
- 30 partitions giữ trong analysis; 27 active, EP-OS-15/28/29 deferred. Giảm null/empty, foreign-confirmed ownership, malformed cancel JWT, Admin cancel/fresh final UI và User confirmed/delivered/fresh shipping UI variations.
- Không coi API results thay native/UI path hoặc deferred variation covered bởi case khác. UI tự refresh/chặn request stale thì chưa exercise backend stale.
- Lý do/tradeoffs: [quyết định tinh gọn](../../test-summary/order-state-analysis.md#quyết-định-tinh-gọn-theo-yêu-cầu-người-dùng). Review trước execution; không tạo BVA cho enum.
