# Pool B — FR-10: Trạng thái đơn hàng

Trạng thái: đang xây dựng thiết kế; chưa execute. Áp dụng skill `domain-testing-bva`, cùng quy trình và template đã dùng cho Pool A. Người dùng yêu cầu bắt đầu Pool B; việc này không tự xác nhận Pool A đã được review/phê duyệt.

## Requirement Analysis

### Requirement

- ID: FR-10; liên quan FR-11, FR-12, FR-18, SEC-02, SEC-03.
- Feature: Order State Machine.
- Module: ORDER-STATE; API chuyển trạng thái, thao tác Admin và hủy đơn trên storefront.
- Oracle: [README](../../README.md#fr-10-trạng-thái-đơn-hàng-order-state-machine). [API specification](../../api_specification.md) cung cấp endpoint/body, không thay thế quy tắc nghiệp vụ.
- Template/thư mục: `ref/03 - github_testcase_management.pptx.pdf`, trang 5–7; đề bài HW02 trang 3–5 yêu cầu giải thích Domain/BVA và commit từng bước.
- Ngoài phạm vi: Mobile, checkout/tính tiền, coupon, dashboard, toàn bộ GUI/CRUD admin, lịch sử đơn hàng đầy đủ và sửa code SUT.

### Functional Rules

R-OS-* là nhãn nội bộ để truy vết, không phải requirement mới.

| Nhãn | Quy tắc | Nguồn |
|---|---|---|
| R-OS-01 | Miền trạng thái gồm `pending`, `confirmed`, `shipping`, `delivered`, `canceled` | FR-10 |
| R-OS-02 | Admin: `pending → confirmed`, `confirmed → shipping`, `shipping → delivered` | FR-10, FR-18 |
| R-OS-03 | User/Admin: `pending → canceled`, `confirmed → canceled` | FR-10 |
| R-OS-04 | User không được tự hủy khi `shipping` | FR-10 |
| R-OS-05 | `delivered` và `canceled` là final states; không chuyển sang trạng thái khác | FR-10 |
| R-OS-06 | Chuyển đổi không hợp lệ phải trả lỗi với thông báo phù hợp và không thực hiện chuyển đổi | FR-10 |
| R-OS-07 | API admin yêu cầu JWT hợp lệ và role `admin`; admin thao tác đơn của mọi user | FR-12, FR-18, SEC-02, SEC-03 |
| R-OS-08 | API hủy đơn có xác thực; User xem đơn của chính mình | API mục 4; SEC-02, FR-11 |

### Preconditions

- Tester chuẩn bị local SUT, admin M và hai user thường A/B; agent chỉ thiết kế, không gọi API hoặc thao tác UI.
- Có các đơn thuộc A/B ở từng trạng thái và đơn đối chứng; ghi ID thật, owner, trạng thái và snapshot trước case.
- Đơn ở `confirmed/shipping/delivered/canceled` phải được chuẩn bị độc lập với endpoint đang kiểm thử nếu không thể đi qua chuỗi chuyển hợp lệ.
- Mỗi case độc lập; không phụ thuộc case trước Pass. Không restart backend giữa request/readback vì startup reset/reseed.
- Đọc lại qua GET `/api/orders/my-orders` với token của chủ đơn và GET `/api/admin/orders` với token admin; không dùng lỗi public GET order detail làm đường vượt quyền.

### Inputs

| Variable | Type | Description | Constraint |
|---|---|---|---|
| current_status | Trạng thái lưu ở server | Trạng thái trước thao tác | Một trong 5 giá trị; không tin trạng thái cache/client |
| target_status | Chuỗi JSON hoặc đích ngầm định | Admin gửi `status`; cancel endpoint có đích `canceled` | Phải có chuyển đổi được phép từ current_status |
| actor_role | Claim của JWT hợp lệ | Admin hoặc user | Chuyển qua API admin cần role admin |
| Authorization | Header | JWT người thực hiện | Hợp lệ; thiếu/sai token không đủ quyền |
| order_id | Định danh tài nguyên ở URL | Đơn bị tác động | ID thật đã tồn tại hoặc ID xác nhận không tồn tại; không có boundary số học trong requirement |
| ownership | Quan hệ user với đơn | A sở hữu hay B sở hữu | Admin thao tác mọi user; giới hạn user hủy đơn người khác cần AS-OS-03 được review |
| request/UI snapshot | Trạng thái quan sát trước thao tác | Trang có thể cũ hơn server | Quyết định theo current_status tại server; thử tuần tự, không giả định race đồng thời |

### Expected Outputs / Behaviors

- Chuyển hợp lệ lưu đúng target_status của đúng order_id; readback phản ánh trạng thái mới.
- Chuyển không hợp lệ trả lỗi phù hợp, giữ trạng thái hiện tại. Không nhận thông báo thành công làm bằng chứng đã lưu đúng.
- Final states không bị hồi sinh về trạng thái khác; stale UI không được vượt quy tắc tại server.
- API admin từ chối token user dù cặp trạng thái hợp lệ; token thiếu/sai bị từ chối ở cả hai endpoint chuyển trạng thái.
- Đơn đối chứng không đổi. Không ấn định mã HTTP, wording lỗi, toast, màu nút hoặc timeout chưa được requirement quy định.

### Assumptions

- AS-OS-01: Bộ test dùng chuỗi trạng thái lowercase đúng tên trong API; không giả định tự chuẩn hóa chữ hoa/whitespace.
- AS-OS-02: Đúng order_id cần được cập nhật độc lập, không đổi owner/tổng tiền/địa chỉ; dùng snapshot để phát hiện tác động ngoài thao tác status. Đây là bất biến chức năng thay trạng thái, không phải quy tắc về payment.
- AS-OS-03: User chỉ được hủy đơn của mình. FR-11 nêu chỉ xem đơn của mình, nhưng FR-10/API chưa ghi riêng quy tắc ownership cho mutation. Cases ownership là thiết kế đề xuất theo giả định này, cần người dùng xác nhận; không tự coi FR-11 là câu cấm cập nhật đơn khác.
- AS-OS-04: Trạng thái tại server ngay trước request quyết định quyền chuyển, không phải trạng thái UI đã đọc trước đó; stale cases thực hiện tuần tự với readback xác nhận, không kiểm thử race/atomicity đồng thời.
- AS-OS-05: Các tài khoản/đơn test được chuẩn bị độc lập và ID/JWT là runtime values. Fixture không phải seed có sẵn.

### Ambiguities

| ID | Nội dung chưa rõ | Xử lý |
|---|---|---|
| AM-OS-01 | Diagram chỉ có `shipping → delivered`; prose nói user không hủy khi shipping và “chỉ Admin mới có thể thao tác” | Không kết luận admin `shipping → canceled` được phép hay cấm; đánh dấu `?` và chưa tạo case Pass/Fail cho cặp này |
| AM-OS-02 | Self-transition và request lặp lại cùng trạng thái có bị lỗi hay no-op/idempotent? Final states cấm chuyển sang trạng thái khác | Đánh dấu cả 5 đường chéo `?`; không coi request `canceled → canceled` chắc chắn phải lỗi |
| AM-OS-03 | Ownership của user mutation chưa nói trực tiếp | Giữ AS-OS-03 và cases ownership chờ review |
| AM-OS-04 | Mô tả API “chưa giao” có thể bao gồm shipping; FR-10 cấm user hủy shipping | FR-10 là oracle chính đã được AGENTS/context chỉ định; ghi khác biệt tài liệu, không lấy API prose để nới quyền user |
| AM-OS-05 | Status thiếu/null/sai kiểu, error response và resource không tồn tại thiếu schema/mã lỗi chi tiết | Kiểm tra không có chuyển hợp lệ và không làm đổi đơn; không ấn định status code/wording |
| AM-OS-06 | Không có số lần chuyển, SLA/timestamp/timeout hoặc JWT TTL trong FR-10 | Không tạo biên thời gian, attempt counter hoặc biên order_id |
| AM-OS-07 | Điều khiển UI cho thao tác cấm: ẩn, disable hay báo lỗi? | Cho phép những cách UI khác nhau miễn thao tác cấm không xảy ra; nếu request được gửi phải bị từ chối đúng quy tắc |
| AM-OS-08 | Thay trạng thái đồng thời, versioning, retry tự động, toàn vẹn payment/coupon chưa quy định | Ngoài coverage hiện tại; stale cases tuần tự không chứng minh concurrency safety |

### Dependencies và quan sát tĩnh

- Backend `server.js`: PUT `/api/orders/:id/cancel`; PUT `/api/admin/orders/:id/status`; GET lists để readback.
- Storefront `Profile.jsx`: hủy đơn và hiển thị trạng thái. Admin `App.jsx`: các nút chuyển trạng thái trong tab đơn hàng.
- Code chỉ dùng xác định đường thao tác/điểm hiển thị. Chưa có Actual Result, evidence hoặc confirmed bug.

## Domain Analysis

| Variable | Data Type | Valid Domain | Invalid Domain(s) | Constraints / Notes |
|---|---|---|---|---|
| current_status × target_status | Cặp categorical | Các cặp V trong ma trận admin bên dưới | Các cặp I; trạng thái đích ngoài 5 giá trị | D-OS-STATE; 6 cặp `?` chưa có oracle cuối cùng |
| thao tác user cancel | Action + categorical state | Pending/confirmed của đơn được phép thao tác | Shipping/delivered; request phục hồi đơn canceled sang trạng thái khác | D-OS-CANCEL; lặp cancel trên canceled giữ final state nhưng response còn AM-OS-02 |
| actor_role | Claim categorical | Admin trên status endpoint; user trên own cancel | User thường trên endpoint admin | D-OS-ROLE; có token hợp lệ chưa đủ quyền admin |
| Authorization | Header/token | JWT hợp lệ do môi trường cấp | Không token, chuỗi không phải JWT, payload bị sửa nhưng chữ ký cũ | D-OS-AUTH; không có BVA thời hạn |
| order_id/existence | Định danh tài nguyên | ID của đơn test đã xác nhận tồn tại | ID xác nhận không tồn tại | D-OS-RESOURCE; không phân loại theo lớn/nhỏ, không giả định max ID |
| ownership | Quan hệ categorical | Own order với user; mọi owner với admin | User hủy đơn B theo AS-OS-03 | D-OS-OWNER; partition có điều kiện giả định |
| target_status payload | Chuỗi/giá trị JSON/vắng mặt | Một trong 5 chuỗi và cặp chuyển được phép | Chuỗi `returned`, thiếu trường, null, rỗng, kiểu number | D-OS-PAYLOAD; chỉ đại diện sai kiểu, không tạo range số |
| snapshot UI/server | Cặp giá trị trạng thái quan sát | Server hiện tại cho phép thao tác | UI còn confirmed nhưng server đã shipping/canceled khiến thao tác trở thành cấm | D-OS-FRESHNESS; hiện tại server có ưu tiên theo AS-OS-04 |

### Miền phụ thuộc trạng thái — Admin API

V = chuyển được phép; I = chuyển sang trạng thái khác bị cấm theo diagram/final states; `?` = chưa có oracle đủ rõ, không tự gán VALID/INVALID. Ma trận áp dụng khi JWT/role admin hợp lệ và đơn tồn tại.

| Current \ Target | pending | confirmed | shipping | delivered | canceled |
|---|---|---|---|---|---|
| pending | ? | V | I | I | V |
| confirmed | I | ? | V | I | V |
| shipping | I | I | ? | V | ? |
| delivered | I | I | I | ? | I |
| canceled | I | I | I | I | ? |

25 cặp: 5 V, 14 I, 6 `?` (5 self-transition + shipping→canceled). Canceled→delivered là I vì phá final state, dù UI/code có thể cho làm. Chưa dùng hành vi code để giải quyết các `?`.

### Miền phụ thuộc trạng thái — User cancel API

| Current | Target ngầm định | Phân loại | Expected Result |
|---|---|---|---|
| pending | canceled | VALID | Chuyển thành canceled |
| confirmed | canceled | VALID | Chuyển thành canceled |
| shipping | canceled | INVALID | Lỗi, giữ shipping |
| delivered | canceled | INVALID | Lỗi, giữ delivered |
| canceled | canceled | Chưa phân loại response | Giữ canceled; chưa xác định lỗi hoặc no-op |

Case cho user canceled kiểm tra bất biến final state và ghi response thực tế khi tester execute; không đặt Expected Result “phải báo lỗi” cho same-state retry. Do đó case này kiểm tra partition final-state preservation, không được đếm là đã giải quyết self-transition.

### Quan hệ và cách cô lập domain

1. Cùng target `canceled` có thể hợp lệ hay cấm tùy current_status và role; không partition target riêng rồi tuyên bố mọi state giống nhau.
2. Khi kiểm tra invalid pair, dùng token admin hợp lệ và order tồn tại để lỗi role/resource không che lỗi chuyển trạng thái.
3. Khi kiểm tra auth/role, dùng cặp hợp lệ `pending → confirmed` hoặc own `pending → canceled` để lỗi transition không che lỗi quyền.
4. Ownership: dùng pending/confirmed, là trạng thái cho hủy, để tập trung vào AS-OS-03. Admin chuyển đơn B trong positive sequence để xác minh quyền toàn hệ thống FR-18.
5. Bad payload và missing resource dùng admin/token hợp lệ, tách case theo lớp điều kiện. Không suy ra code lỗi HTTP chính xác từ implementation.
6. Stale cases: một tác nhân đọc confirmed, tác nhân khác đổi state thành shipping/canceled và xác minh xong; sau đó mới gửi thao tác cũ. Không có sleep/timeout giả định.

## Equivalence Partitions

ID `EP-OS-*` ổn định. VALID/INVALID gắn với điều kiện đầy đủ về state/role/auth/resource; không phải mọi input cùng target đều tương đương. Với nhóm nhiều cặp invalid, vẫn viết case riêng cho từng cặp để không bỏ sót nhánh state machine.

| Partition ID | Variable | Class | Condition | Representative Value | Requirement |
|---|---|---|---|---|---|
| EP-OS-01 | `Admin: state pair` | `VALID` | `pending → confirmed` | `pending / confirmed` | `FR-10 R-OS-02` |
| EP-OS-02 | `Admin: state pair` | `VALID` | `confirmed → shipping` | `confirmed / shipping` | `FR-10 R-OS-02` |
| EP-OS-03 | `Admin: state pair` | `VALID` | `shipping → delivered` | `shipping / delivered` | `FR-10 R-OS-02` |
| EP-OS-04 | `Admin: state pair` | `VALID` | `pending → canceled` | `pending / canceled` | `FR-10 R-OS-03` |
| EP-OS-05 | `Admin: state pair` | `VALID` | `confirmed → canceled` | `confirmed / canceled` | `FR-10 R-OS-03` |
| EP-OS-06 | `Admin: state pair` | `INVALID` | `pending → shipping hoặc delivered` | `pending / shipping` | `FR-10 R-OS-06` |
| EP-OS-07 | `Admin: state pair` | `INVALID` | `confirmed → pending hoặc delivered` | `confirmed / pending` | `FR-10 R-OS-06` |
| EP-OS-08 | `Admin: state pair` | `INVALID` | `shipping → pending hoặc confirmed` | `shipping / pending` | `FR-10 R-OS-06` |
| EP-OS-09 | `Admin: final state` | `INVALID` | `delivered → một trong 4 trạng thái khác` | `delivered / canceled` | `FR-10 R-OS-05` |
| EP-OS-10 | `Admin: final state` | `INVALID` | `canceled → một trong 4 trạng thái khác` | `canceled / delivered` | `FR-10 R-OS-05` |
| EP-OS-11 | `User cancel` | `VALID` | `Own pending → canceled` | `A hủy own pending` | `FR-10 R-OS-03` |
| EP-OS-12 | `User cancel` | `VALID` | `Own confirmed → canceled` | `A hủy own confirmed` | `FR-10 R-OS-03` |
| EP-OS-13 | `User cancel` | `INVALID` | `Own shipping → canceled` | `A hủy own shipping` | `FR-10 R-OS-04` |
| EP-OS-14 | `User cancel` | `INVALID` | `Own delivered → canceled` | `A hủy own delivered` | `FR-10 R-OS-05` |
| EP-OS-15 | `Final-state preservation` | `VALID` | `Own canceled giữ canceled khi retry; response chưa phân loại` | `A gửi lại cancel own canceled` | `FR-10 R-OS-05; AM-OS-02` |
| EP-OS-16 | `Role trên admin API` | `VALID` | `Admin thao tác status của user A/B` | `TOKEN_M với role admin` | `FR-12; FR-18; SEC-03` |
| EP-OS-17 | `Role trên admin API` | `INVALID` | `User thường dùng endpoint admin` | `TOKEN_A, pending → confirmed` | `FR-12; SEC-03` |
| EP-OS-18 | `Authorization` | `VALID` | `JWT hợp lệ` | `TOKEN_A / TOKEN_M` | `SEC-02` |
| EP-OS-19 | `Authorization` | `INVALID` | `Không có token` | `Bỏ Authorization` | `SEC-02` |
| EP-OS-20 | `Authorization` | `INVALID` | `Token sai định dạng` | `Bearer not-a-jwt` | `SEC-02` |
| EP-OS-21 | `Authorization` | `INVALID` | `Payload sửa role thành admin, chữ ký không tương ứng` | `TOKEN_A_TAMPERED` | `SEC-02; SEC-03` |
| EP-OS-22 | `User ownership` | `VALID` | `User A thao tác đơn A` | `A / A_PENDING_ID` | `FR-10; AS-OS-03` |
| EP-OS-23 | `User ownership` | `INVALID (theo AS-OS-03)` | `User A cố hủy đơn B đang pending/confirmed` | `TOKEN_A / B_PENDING_ID` | `FR-10; FR-11 liên quan; AM-OS-03` |
| EP-OS-24 | `Resource existence` | `VALID` | `Đơn đã được xác minh tồn tại` | `A_PENDING_ID` | `FR-10; API mục 4/6` |
| EP-OS-25 | `Resource existence` | `INVALID` | `ID đã xác nhận không có đơn` | `MISSING_ORDER_ID` | `FR-10; AM-OS-05` |
| EP-OS-26 | `Target string` | `INVALID` | `Chuỗi trạng thái không thuộc 5 giá trị` | `returned` | `FR-10 R-OS-01/06` |
| EP-OS-27 | `Target field` | `INVALID` | `Body không có trường status` | `{}` | `FR-10 R-OS-01/06; AM-OS-05` |
| EP-OS-28 | `Target value` | `INVALID` | `status là null` | `{"status":null}` | `FR-10 R-OS-01/06; AM-OS-05` |
| EP-OS-29 | `Target string` | `INVALID` | `status chuỗi rỗng` | `{"status":""}` | `FR-10 R-OS-01/06; AM-OS-05` |
| EP-OS-30 | `Target type` | `INVALID` | `status không phải chuỗi trạng thái` | `{"status":3}` | `FR-10 R-OS-01/06; AM-OS-05` |

EP-OS-15 phân loại **bất biến đầu ra**, không quyết định retry canceled phải thành công hay báo lỗi. EP-OS-23 phụ thuộc assumption và chưa là kết luận nghiệp vụ đã xác nhận. 6 ô `?` của ma trận admin không bị giấu trong INVALID partitions; chúng được lưu riêng dưới AM-OS-01/02.

## Boundary Analysis

| Variable | Lower Boundary | Upper Boundary | Inclusiveness | Requirement | Notes |
|---|---|---|---|---|---|
| current_status / target_status | Không áp dụng | Không áp dụng | Không áp dụng | FR-10 | Categorical graph, không phải khoảng số; pending=1…canceled=5 là phép gán tùy tiện |
| actor_role / ownership / existence | Không áp dụng | Không áp dụng | Không áp dụng | FR-10/12/18, SEC-03 | Quan hệ/category; dùng EP |
| order_id | Chưa có | Chưa có | Chưa xác định | API dùng `:id` | Không lấy SQLite AUTOINCREMENT làm boundary nghiệp vụ |
| thời gian chờ, số lần đổi status, TTL | Chưa có | Chưa có | Chưa xác định | FR-10 không quy định | AM-OS-06; không tự đặt threshold |

**Kết luận BVA:** Không có ordered domain/threshold được requirement cung cấp trong scope FR-10. Có 0 numeric/time boundary và không tạo test case gắn Technique BVA. Các final states là ràng buộc của graph; thao tác ngay trước/sau một chuyển đổi có thể kiểm tra state-transition nhưng không phải BVA số học.

AMBIGUITY: Đặc tả không định nghĩa boundary chính xác cho order_id, thời gian hoặc số lần chuyển trạng thái. BVA cho các biến này chưa thể thiết kế đáng tin cậy nếu không có nguồn requirement bổ sung. BVA không áp dụng cho enum state không phải do thiếu giá trị min/max, mà do bản chất categorical của domain.

