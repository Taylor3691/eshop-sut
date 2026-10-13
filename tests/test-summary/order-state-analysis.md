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
