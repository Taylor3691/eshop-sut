# Pool C — FR-15: Quản lý sản phẩm (Product CRUD)

Trạng thái: đang xây dựng thiết kế; chưa execute. Áp dụng skill `domain-testing-bva`, cùng 9 bước/template đã dùng ở Pool A/B. Người dùng đã yêu cầu bắt đầu Pool C; không tự xác nhận review/phê duyệt các pool trước.

## Requirement Analysis

### Requirement

- ID: FR-15; liên quan FR-12, SEC-02, SEC-03.
- Feature: Product CRUD trên Web Admin/API.
- Module: PRODUCT-CRUD; Add/View/Edit/Delete và validation/quyền liên quan trực tiếp.
- Oracle: [README FR-15](../../README.md#fr-15-quản-lý-sản-phẩm-product-crud), FR-12 và security requirements trong README. [API mục 3](../../api_specification.md) cung cấp endpoint/body.
- Template: `ref/03 - github_testcase_management.pptx.pdf`, trang 5–7; HW02 yêu cầu giải thích Domain/BVA và commit từng bước.
- Ngoài phạm vi: Category CRUD, CSV import FR-16, Mobile, search/chi tiết storefront đầy đủ, coupon/order/dashboard, toàn bộ GUI/security và sửa lỗi SUT.

### Functional Rules

R-PC-* chỉ là nhãn truy vết nội bộ, không phải requirement mới.

| Nhãn | Quy tắc | Nguồn |
|---|---|---|
| R-PC-01 | Admin có thể thêm, xem, sửa, xóa sản phẩm | FR-15 |
| R-PC-02 | Tên bắt buộc, tối đa 255 ký tự | FR-15 |
| R-PC-03 | Giá bắt buộc, là số dương (>0) | FR-15 |
| R-PC-04 | Danh mục bắt buộc, chọn trong danh sách có sẵn | FR-15 |
| R-PC-05 | Khi sửa, chỉ sản phẩm được chọn thay đổi; sản phẩm khác giữ nguyên | FR-15 |
| R-PC-06 | POST/PUT/DELETE products yêu cầu JWT hợp lệ và role admin; UI Admin chỉ dành cho admin | FR-12, SEC-02, SEC-03 |

### Preconditions

- Tester chuẩn bị backend/Admin local, admin M và user A; agent chỉ thiết kế, không execute.
- Có 2 danh mục tồn tại CAT_A_ID/CAT_B_ID, một ID danh mục đã xác nhận không tồn tại CAT_MISSING_ID.
- Có sản phẩm P để sửa/xóa và Q/R làm đối chứng, ID thật và snapshot đầy đủ. Không dùng sản phẩm đã tham chiếu bởi cart/order để tránh quy tắc cascade chưa được định nghĩa.
- Baseline/khôi phục dữ liệu độc lập với endpoint đang kiểm thử khi cần; mỗi case không phụ thuộc case trước Pass.
- Không restart backend giữa thao tác/readback vì startup reset/reseed database.

### Inputs

| Variable | Type | Description | Constraint |
|---|---|---|---|
| name | Chuỗi | Tên sản phẩm | Bắt buộc, tối đa 255 ký tự; định nghĩa Unicode/trim chưa rõ |
| price | Giá trị số ở API; giá trị nhập ở UI | Giá bán | Bắt buộc, >0; chưa quy định precision/integer-only hoặc max |
| category_id | Định danh | Danh mục được chọn | Bắt buộc, phải có trong danh sách có sẵn |
| description | Chuỗi trong JSON mẫu | Mô tả | FR-15 không quy định required/length/format |
| imageUrl | Chuỗi trong JSON mẫu | URL ảnh | FR-15 không quy định required/length/URL-validation |
| product_id URL / lựa chọn UI | Định danh tài nguyên | Sản phẩm bị sửa/xóa/xem | ID thật; PUT phải đúng sản phẩm được chọn |
| Authorization / actor_role | Header/claim | Người thực hiện | Mutation: JWT hợp lệ, role admin |
| mode / selected_product | Trạng thái form | Thêm hoặc sửa P/Q | Phân biệt create và edit; không sửa nhầm sản phẩm |
| category list snapshot | Tập ID tại server/UI | Danh sách được chọn | Category phải còn tồn tại lúc gửi; AS-PC-05 về thời điểm validation cần review |

### Expected Outputs / Behaviors

- Thêm hợp lệ tạo sản phẩm với dữ liệu đã gửi, đọc lại được; xem Admin/API phản ánh fixture đúng ID.
- Sửa hợp lệ lưu đúng trường của P; Q/R và các hàng còn lại giữ nguyên trong API **và UI ngay sau thao tác**, cũng như sau reload. Không coi UI đổi nhầm tên mọi hàng là đúng chỉ vì server không đổi.
- Xóa P làm P không còn trong danh sách; sản phẩm khác giữ nguyên. Fixture không có liên kết order/cart để không áp đặt cascade policy.
- Name rỗng/quá 255; price thiếu/không phải số/<=0; category thiếu/không tồn tại không được lưu thành sản phẩm hợp lệ. Mỗi negative case chỉ làm sai một input để cô lập oracle.
- Unauthorized mutations không thay catalog. GET catalog/detail không bị tự áp role admin vì là API dùng cho storefront; không tạo negative-read auth rule ngoài specification.
- Không ấn định mã HTTP, wording lỗi, toast, dialog xóa bắt buộc, sắp xếp hàng hoặc schema type response chưa được yêu cầu.

### Assumptions

- AS-PC-01: “Bắt buộc” của name nghĩa không rỗng, nên chuỗi ASCII có 1–255 ký tự là miền đã xác định; không tự diễn giải whitespace-only hoặc trim.
- AS-PC-02: BVA dùng ASCII `A` lặp để code units/code points/bytes đều trùng độ dài. Tên tiếng Việt thông thường là dữ liệu nominal; emoji/combining marks cần oracle đếm riêng.
- AS-PC-03: Price boundary tại 0 là exclusive; chọn -1/0/1 theo lát cắt số nguyên với bước dữ liệu test 1 ₫. Đây không phải requirement min price = 1 hoặc price chỉ là integer. Precision/delta nhỏ nhất chưa có, nên không tuyên bố BVA toàn miền số thực.
- AS-PC-04: Request POST/PUT đầy đủ name/price/description/imageUrl/category_id. UI gửi numeric string không tự bị coi sai: testcase UI kiểm tra giá trị nghiệp vụ, API testcase dùng JSON number; coercion schema chưa rõ.
- AS-PC-05: Category “có sẵn” được kiểm tra tại server khi submit; stale category case cần reviewer xác nhận timing này, không tự chứng minh transaction isolation.
- AS-PC-06: Snapshot theo ID, so giá trị price theo giá trị số; không đánh bug chỉ do GET detail trả price string thay number nếu chưa có schema rõ. Không thay đổi category table trong mutation product.
- AS-PC-07: Mutation một sản phẩm chỉ tác động đúng ID; dữ liệu mô tả/ảnh thông thường được giữ theo JSON mẫu. Không suy ra mọi image/description string đều được chấp nhận.

### Ambiguities

| ID | Nội dung chưa rõ | Xử lý |
|---|---|---|
| AM-PC-01 | Unicode length: code units/code points/graphemes; trim và whitespace-only | BVA ASCII; không tự gán whitespace/emoji là valid hoặc invalid |
| AM-PC-02 | Giá thập phân, precision/rounding, đơn vị nhỏ nhất, max | Chỉ BVA integer slice -1/0/1; không đặt max hay reject 0.5 vì không phải integer |
| AM-PC-03 | Kiểu JSON, numeric-string coercion, null và missing response schema | Required fields thiếu/null phải không tạo/lưu dữ liệu invalid; không chốt mã HTTP hoặc mọi coercion |
| AM-PC-04 | Description/image required, URL format, length, HTML handling | Nominal values; không invent URL validator/limit hoặc XSS audit cho toàn bộ CRUD |
| AM-PC-05 | Duplicate name, partial PUT, extra fields và body ID so với URL ID | Không tự đặt uniqueness/partial semantics; body-ID case chỉ kiểm tra không sửa Q khi URL chọn P |
| AM-PC-06 | Xóa sản phẩm có order/cart; delete retry/missing product | Dùng fixture không được tham chiếu; chưa chốt cascade/idempotency/missing-resource response |
| AM-PC-07 | Category rỗng toàn hệ thống, xóa category đồng thời, cache/transaction timing | Stale category theo AS-PC-05, thao tác tuần tự có xác minh; không đồng nhất với concurrency |
| AM-PC-08 | Thông báo/mã lỗi/UI state và giới hạn ID/token expiry | Không tạo boundary ID/TTL, dialog bắt buộc, vị trí lỗi hay toàn bộ FR-21/22 chưa nằm scope |

### Dependencies và quan sát tĩnh

- Admin `App.jsx` có form sản phẩm, danh sách, nút Sửa/Xóa; create và edit dùng POST/PUT riêng, category lấy GET categories.
- Backend `server.js`: GET list/detail, POST/PUT/DELETE products. GET readback đối chiếu theo ID; frontend không chứng minh backend validation.
- Code giúp định vị thao tác và điểm kiểm tra UI trước/sau reload. Không có Actual Result, evidence hoặc confirmed bug từ đọc code.
