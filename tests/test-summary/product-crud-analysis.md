# Pool C — FR-15: Quản lý sản phẩm (Product CRUD)

Trạng thái: đã tinh gọn bản thiết kế **78 → 48 cases** để người dùng review; chưa phê duyệt, chưa execute. Áp dụng skill `domain-testing-bva`, cùng 9 bước/template đã dùng ở Pool A/B. Người dùng đã yêu cầu bắt đầu Pool C; không tự xác nhận review/phê duyệt các pool trước.

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
- AS-PC-05: Category “có sẵn” được kiểm tra tại server khi submit; stale category cần reviewer xác nhận timing này, không tự chứng minh transaction isolation. Case 074 đã giảm ưu tiên khi tinh gọn; assumption vẫn mở.
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
| AM-PC-07 | Category rỗng toàn hệ thống, xóa category đồng thời, cache/transaction timing | Stale category theo AS-PC-05; case 074 deferred sau tinh gọn, không đồng nhất với concurrency |
| AM-PC-08 | Thông báo/mã lỗi/UI state và giới hạn ID/token expiry | Không tạo boundary ID/TTL, dialog bắt buộc, vị trí lỗi hay toàn bộ FR-21/22 chưa nằm scope |

### Dependencies và quan sát tĩnh

- Admin `App.jsx` có form sản phẩm, danh sách, nút Sửa/Xóa; create và edit dùng POST/PUT riêng, category lấy GET categories.
- Backend `server.js`: GET list/detail, POST/PUT/DELETE products. GET readback đối chiếu theo ID; frontend không chứng minh backend validation.
- Code giúp định vị thao tác và điểm kiểm tra UI trước/sau reload. Không có Actual Result, evidence hoặc confirmed bug từ đọc code.

## Domain Analysis

| Variable | Data Type | Valid Domain | Invalid Domain(s) | Constraints / Notes |
|---|---|---|---|---|
| name | Chuỗi | ASCII không rỗng dài 1–255; tên Việt nominal | Rỗng, ASCII >=256, thiếu field, null | D-PC-NAME; whitespace/Unicode counting còn AM-PC-01 |
| price | Số theo giá trị nghiệp vụ | >0 | <=0, thiếu, null, chuỗi không phải số `abc` | D-PC-PRICE; JSON numeric string chuẩn hóa chưa rõ; không đặt max/integer-only |
| category_id / category list | Quan hệ ID với tập category | ID thuộc tập tồn tại | Thiếu/null hoặc ID xác nhận không có trong tập | D-PC-CATEGORY; ID có giá trị số không biến thành BVA |
| Authorization / role | Header và claim | JWT hợp lệ có role admin cho mutation | Thiếu token, malformed, tampered signature, token user thường | D-PC-ACCESS; read API công khai không bị áp gate mutation |
| product ID / selected target | ID tài nguyên | P/Q tồn tại; thao tác đúng ID chọn | Sửa một sản phẩm khác với ID chọn | D-PC-TARGET; missing-resource/cascade chưa có oracle đầy đủ |
| operation/mode | Categorical | Create/View/Edit/Delete với đúng mode | Edit vô tình tác động hàng khác | D-PC-MODE; không áp BVA |
| description | Chuỗi | Mô tả tiếng Việt thông thường | Chưa có validation domain INVALID rõ | D-PC-DESC; không tự đặt required/length/HTML rule |
| imageUrl | Chuỗi | URL fixture local | Chưa có validation domain INVALID rõ | D-PC-IMAGE; không tự reject empty hoặc URL chưa kiểm định |
| category snapshot và current list | Cặp tập ID | Category còn tồn tại khi submit | Đã bị bỏ khỏi tập hiện tại (AS-PC-05) | D-PC-FRESHNESS; test tuần tự, không chứng minh concurrency |

### Quan hệ và cách cô lập

1. Name/price/category đồng thời phải thỏa điều kiện để lưu. Mỗi negative case chỉ thay một field; không dùng nhiều lỗi che nhau.
2. POST và PUT là hai đường mutation, đều áp FR-15; validation UI và server là hai lớp. BVA được xét trên 4 đường: UI-create, API-create, UI-edit, API-edit; sau tinh gọn không còn đủ mọi giá trị trên từng đường.
3. Với boundary name, giữ price=100000 và CAT_A_ID tồn tại. Với boundary price, giữ name nominal, category tồn tại.
4. Với auth/role, dùng payload hoàn toàn hợp lệ và ID P tồn tại. Giữ thiếu JWT và token user trên đủ POST/PUT/DELETE; malformed chỉ POST, tampered chỉ PUT. Không suy một gate đại diện mọi token/method.
5. Sửa P phải giữ Q/R cả trong UI ngay sau lưu và API; reload chỉ là một checkpoint khác, không che lỗi state UI tạm thời.
6. Category membership được xét bằng danh sách thực, không suy `category_id>=1` là hợp lệ. Negative ID là ID không tồn tại đã được xác minh, không phải boundary max+1.
7. Chuyển form edit P sang Q kiểm tra selected target mới; PUT body ID lạ kiểm tra URL-selected product không làm Q bị đổi ngoài ý muốn, reject/ignore trường lạ đều có thể phù hợp AM-PC-05.

## Equivalence Partitions

IDs `EP-PC-*` ổn định. INVALID của target/auth là thao tác bị cấm, không tuyên bố body extra field luôn phải reject. Domain chưa đủ oracle được ghi trong Ambiguities, không phân loại tùy ý.

| Partition ID | Variable | Class | Condition | Representative Value | Requirement |
|---|---|---|---|---|---|
| EP-PC-01 | `name` | `VALID` | `ASCII length 1–255; tên nominal thông thường` | `A; tên dài 255; Bàn phím kiểm tra` | `FR-15 R-PC-02` |
| EP-PC-02 | `name` | `INVALID` | `Chuỗi rỗng` | `""` | `FR-15 R-PC-02` |
| EP-PC-03 | `name` | `INVALID` | `ASCII length >=256` | `A lặp 256 lần` | `FR-15 R-PC-02` |
| EP-PC-04 | `name` | `INVALID` | `Không có field name` | `Body bỏ name` | `FR-15 R-PC-02` |
| EP-PC-05 | `name` | `INVALID` | `name=null` | `null` | `FR-15 R-PC-02` |
| EP-PC-06 | `price` | `VALID` | `>0` | `1; 100000` | `FR-15 R-PC-03` |
| EP-PC-07 | `price` | `INVALID` | `=0` | `0` | `FR-15 R-PC-03` |
| EP-PC-08 | `price` | `INVALID` | `<0` | `-1` | `FR-15 R-PC-03` |
| EP-PC-09 | `price` | `INVALID` | `Không có field price` | `Body bỏ price` | `FR-15 R-PC-03` |
| EP-PC-10 | `price` | `INVALID` | `price=null` | `null` | `FR-15 R-PC-03` |
| EP-PC-11 | `price` | `INVALID` | `Không có giá trị số hợp lệ` | `"abc"; UI blank` | `FR-15 R-PC-03` |
| EP-PC-12 | `category_id` | `VALID` | `ID thuộc danh sách có sẵn` | `CAT_A_ID / CAT_B_ID` | `FR-15 R-PC-04` |
| EP-PC-13 | `category_id` | `INVALID` | `Không có field category_id` | `Body bỏ category_id` | `FR-15 R-PC-04` |
| EP-PC-14 | `category_id` | `INVALID` | `category_id=null` | `null` | `FR-15 R-PC-04` |
| EP-PC-15 | `category_id` | `INVALID` | `ID không nằm trong tập category tồn tại` | `CAT_MISSING_ID` | `FR-15 R-PC-04` |
| EP-PC-16 | `auth/role mutation` | `VALID` | `JWT hợp lệ, role admin` | `TOKEN_M` | `FR-12; SEC-02/03` |
| EP-PC-17 | `auth/role mutation hoặc UI Admin` | `INVALID` | `User thường không có quyền admin` | `TOKEN_A / đăng nhập A` | `FR-12; SEC-03` |
| EP-PC-18 | `Authorization mutation` | `INVALID` | `Thiếu token` | `Không gửi Authorization` | `FR-12; SEC-02` |
| EP-PC-19 | `Authorization mutation` | `INVALID` | `Malformed token` | `Bearer not-a-jwt` | `FR-12; SEC-02` |
| EP-PC-20 | `Authorization mutation` | `INVALID` | `JWT role sửa nhưng chữ ký cũ` | `TOKEN_A_TAMPERED` | `FR-12; SEC-02/03` |
| EP-PC-21 | `product resource` | `VALID` | `Sản phẩm mục tiêu tồn tại` | `P_ID / Q_ID` | `FR-15 R-PC-01/05` |
| EP-PC-22 | `operation/mode` | `VALID` | `Create đúng mode` | `Thêm mới` | `FR-15 R-PC-01` |
| EP-PC-23 | `operation/mode` | `VALID` | `Edit đúng selected ID` | `Sửa P` | `FR-15 R-PC-01/05` |
| EP-PC-24 | `operation/mode` | `VALID` | `View sản phẩm tồn tại` | `Danh sách và GET P_ID` | `FR-15 R-PC-01` |
| EP-PC-25 | `operation/mode` | `VALID` | `Delete sản phẩm không có liên kết order/cart` | `Xóa P_ID` | `FR-15 R-PC-01; AM-PC-06` |
| EP-PC-26 | `description` | `VALID` | `Mô tả nominal` | `Mô tả kiểm tra sản phẩm` | `FR-15 R-PC-01; AS-PC-07` |
| EP-PC-27 | `imageUrl` | `VALID` | `URL fixture nominal` | `http://localhost:5174/favicon.svg` | `FR-15 R-PC-01; AS-PC-07` |
| EP-PC-28 | `target selection` | `INVALID (hành động)` | `Body id=Q nhưng URL chọn P; không được sửa Q` | `PUT /products/P_ID, body id=Q_ID` | `FR-15 R-PC-05; AM-PC-05` |
| EP-PC-29 | `target selection` | `VALID` | `Đổi edit P sang Q trước khi lưu; Q là target cuối` | `Sửa P → Sửa Q → Lưu Q` | `FR-15 R-PC-05` |
| EP-PC-30 | `category current membership` | `INVALID (theo AS-PC-05)` | `UI đã chọn category nhưng category bị xóa trước submit` | `CAT_B_ID không còn tồn tại` | `FR-15 R-PC-04; AS-PC-05` |

EP-PC-30 phụ thuộc timing AS-PC-05; chưa chứng minh concurrency. Sau tinh gọn, **EP-PC-05/10/14/30 deferred**, không còn case active; vẫn giữ định nghĩa để ghi đúng coverage gap. UI blank price khác API bỏ field hoặc gửi abc; 077/078 đã giảm ưu tiên, EP-PC-11 chỉ có đại diện API abc. Price numeric string hợp lệ không thuộc EP-PC-11 chỉ vì là string.

## Boundary Analysis

| Variable | Lower Boundary | Upper Boundary | Inclusiveness | Requirement | Notes |
|---|---|---|---|---|---|
| name.length (ASCII) | 1 | 255 | Inclusive cả hai đầu | FR-15 R-PC-02 | B-PC-NL / B-PC-NU; min 1 từ required không rỗng, AS-PC-01 |
| price | 0 | Không quy định | 0 exclusive; >0 valid | FR-15 R-PC-03 | B-PC-P0; dùng integer slice bước test 1 theo AS-PC-03 |
| category/product ID, operation, role | Không áp dụng | Không áp dụng | Không áp dụng | FR-15, FR-12 | Identity/set membership/categorical, không ép BVA |
| description/image length, price max/precision, TTL | Chưa quy định | Chưa quy định | Chưa rõ | Không có giới hạn trong FR-15 | AM-PC-02/04/08; không tự đặt bound |

3 boundary đã xác định: name lower/upper và price threshold 0. Chọn 0/1/2 và 254/255/256 ký tự cho name; -1/0/1 cho price trong lát cắt số nguyên. Không gọi giá 1 là min price toàn miền; không coi đây là đầy đủ BVA cho precision nhỏ hơn 1 ₫.

AMBIGUITY: Đặc tả chưa có đơn vị precision/delta nhỏ nhất của giá, upper price hoặc length limits cho description/image. Chưa thể sinh “nearest” fractional boundary hoặc max values đáng tin cậy cho những phần đó. Không lấy SQLite INTEGER/HTML step làm requirement nghiệp vụ.

## BVA Values

| Variable | Boundary | Test Value | Classification | Reason |
|---|---|---|---|---|
| name.length | B-PC-NL min−1 | 0: chuỗi rỗng | INVALID, EP-PC-02 | Required, không rỗng |
| name.length | B-PC-NL min | 1: `A` | VALID, EP-PC-01 | Tại biên dưới |
| name.length | B-PC-NL min+1 | 2: `AA` | VALID, EP-PC-01 | Ngay trên biên dưới |
| name.length | B-PC-NU max−1 | 254: `A` lặp 254 lần | VALID, EP-PC-01 | Ngay dưới biên trên |
| name.length | B-PC-NU max | 255: `A` lặp 255 lần | VALID, EP-PC-01 | Tại biên trên |
| name.length | B-PC-NU max+1 | 256: `A` lặp 256 lần | INVALID, EP-PC-03 | Ngay trên biên trên |
| price | B-PC-P0 threshold−1 | -1 | INVALID, EP-PC-08 | Dưới 0, integer slice |
| price | B-PC-P0 threshold | 0 | INVALID, EP-PC-07 | 0 exclusive |
| price | B-PC-P0 threshold+1 | 1 | VALID, EP-PC-06 | Trên 0, integer slice; không phải business min price |

Nominal name `PC sản phẩm mới`, nominal price 100000 được dùng khi thử trường còn lại. Tổng 9 giá trị BVA theo biến; thiết kế ban đầu lặp ở 4 đường = 36 case. Sau tinh gọn giữ **23 BVA**, coverage theo đường như bảng dưới; không cross-product name/price hoặc ghép các request độc lập thành một case.

| Đường vào | Name lengths giữ lại | Price values giữ lại | BVA cases |
|---|---|---|---:|
| UI-create | 0/1/2/254/255/256 | -1/0/1 | 9 |
| API-create | 0/256 | -1/0 | 4 |
| UI-edit | 0/1/255/256 | 0/1 | 6 |
| API-edit | 0/256 | -1/0 | 4 |

Cả 3 boundaries/9 giá trị có đại diện toàn suite; không coi direct API positive, UI-edit name 2/254 hoặc price -1 đã được covered. UI positive bị chặn trước request thì acceptance tại server chưa được exercise. Test Data trong từng file chứa chuỗi ASCII đầy đủ; không chỉ dùng nhãn “max+1” để tester phải đoán dữ liệu.

## Generated Test Cases

- [Danh mục và fixture](../test-cases/product-crud/README.md): **48 file**, ID gốc có khoảng trống, tất cả Not Run / None.
- Name BVA: UI-create 001–006; API-create 007/012; UI-edit 013/014/017/018; API-edit 019/024.
- Price BVA: UI-create 025–027; API-create 028/029; UI-edit 032/033; API-edit 034/035. Integer slice, không kết luận fractional precision.
- CRUD nominal UI 037/039/041/043 với GET/snapshot/readback; không còn standalone positive API CRUD/view/delete 038/040/042/044.
- API required fields: name missing 045/047; price missing/abc 049/051/052/054; category missing/non-existing 055/057/058/060. POST/PUT đều có đại diện; null đã deferred.
- API access: missing JWT 061–063; malformed POST 064; user role 067–069; tampered PUT 071. UI Admin user access 073.
- Target isolation 075 (đổi edit P→Q) và 076 (URL P/body id Q) giữ riêng; edit 039 kiểm tra UI Q/R trước/sau reload và API.
- **23 BVA + 25 EP; 21 UI + 27 API**. Description/image chỉ nominal; create/edit độc lập, negative chỉ một field sai. Nội dung case giữ lại không đổi; không renumber/ghép requests.

## Coverage Summary

- Requirements analyzed: FR-15 chính, FR-12 và SEC-02/03 cho access mutation/UI Admin.
- Variables identified: 9 nhóm domain D-PC-NAME, PRICE, CATEGORY, ACCESS, TARGET, MODE, DESC, IMAGE, FRESHNESS.
- Equivalence partitions: 30 giữ nguyên; **26 active / 4 deferred (EP-PC-05/10/14/30)**. Active là có case thiết kế, không phải Pass.
- Boundaries identified: 3 (name lower/upper, price 0 exclusive); cả 3 có mapping dưới/tại/trên. Name ASCII; price integer slice, không bao phủ toàn bộ precision chưa rõ.
- Test cases retained: **48 = 23 BVA + 25 EP; 21 UI + 27 API**; giảm 30 từ 78. Tất cả Not Run / None.
- [Traceability Matrix chung](traceability-matrix.md) giữ mapping A/B và bổ sung C; sau tinh gọn Pool A/B/C, tổng A/B/C là 99 cases, không phải số đã execute.

### Kiểm tra coverage của thiết kế

- [x] Các input được nêu trong hợp đồng product và access/selected target đã phân tích.
- [x] Giữ đủ 30 partition definitions và mapping ngược; 26 có đại diện active, 4 deferred ghi rõ.
- [ ] Mọi valid/invalid partition có case active: chưa đạt vì EP-PC-05/10/14/30 deferred.
- [x] Name min/max và price threshold có cả 9 giá trị toàn suite; bảng theo đường ghi đúng 23 BVA, không tuyên bố đủ bốn đường.
- [x] Required fields missing và category ngoài tập giữ trên POST/PUT; null khác missing và được ghi deferred.
- [x] Thiếu JWT/user role giữ POST/PUT/DELETE; malformed POST và tampered PUT còn, những methods khác ghi giảm ưu tiên. GET catalog vẫn public.
- [x] Edit isolation kiểm tra Q/R ở API, UI ngay sau lưu và sau reload; target switch/body extra ID có case riêng.
- [x] Negative cases chỉ một field sai; payload/token khác giữ hợp lệ để tránh masking.
- [x] Tất cả cases có requirement, technique, data, steps, Expected Result, status.
- [ ] Human review assumption/ambiguity và thiết kế, chưa phê duyệt.
- [ ] Execute/evidence/test run thuộc người dùng, chưa có kết quả.

Kiểm tra tài liệu sau tinh gọn đã Passed: 48 ID/tên file giữ nguyên, đúng 7 headings/template và steps liên tục, trạng thái Not Run / None; 23 BVA + 25 EP, 21 UI + 27 API; 25 JSON bodies parse sau thay runtime ID, missing fields thật sự bị bỏ. Đối chiếu nội dung 48 cases giữ lại với Git trước tinh gọn (`54361b9`) không có thay đổi. Ma trận có 30 inverse partition mappings (26 active/4 deferred), 23 BVA cells/literals và đủ 9 giá trị; 1162 liên kết file/anchor local toàn tests hợp lệ. Tổng A/B/C=99, A/B/C/D=129 (96 EP + 33 BVA); cases/mapping A/B/D không đổi. `git diff --check` sạch. Đây là kiểm tra cấu trúc thiết kế, không phải execute SUT hay xác nhận business correctness.

### Quyết định tinh gọn theo yêu cầu người dùng

Kết quả: **78 → 48 cases**, loại 30 (13 BVA + 17 EP), giữ **23 BVA + 25 EP; 21 UI + 27 API**. Giữ ID/nội dung cases còn lại, không renumber hoặc ghép các request độc lập để giảm số file. Tập domain/30 partitions và 3 boundaries vẫn giữ để thấy phần chưa được bao phủ. Các ID dưới đây là lịch sử lựa chọn, không phải case active sau khi xóa.

| Nhóm giảm ưu tiên | IDs đã loại (TC-PRODUCT-CRUD-) | Đại diện giữ lại / tradeoff |
|---|---|---|
| Positive BVA lặp giữa UI/API | 008/009/010/011/020/021/022/023/030/036 | UI-create giữ cả 9 giá trị; UI-edit giữ name 1/255 và price 1. Direct API positive quanh biên không còn case riêng; UI phải tới server mới exercise acceptance |
| UI-edit BVA ít ưu tiên | 015/016/031 | UI-edit name 0/1/255/256 và price 0/1; API-edit giữ negative name 0/256, price -1/0. UI-edit name 2/254, price -1 không được gọi covered |
| Nominal API CRUD lặp mục tiêu nghiệp vụ | 038/040/042/044 | Giữ UI 037/039/041/043 với GET/snapshot/readback; UI và API là đường vào khác nhau, direct API positive CRUD/view/delete giảm ưu tiên |
| Null của required fields | 046/048/050/053/056/059 | Giữ missing name/price/category trên cả POST/PUT; null khác missing, EP-PC-05/10/14 deferred, không coi là covered |
| Auth variations theo method | 065/066/070/072 | Missing JWT và token user đủ POST/PUT/DELETE; malformed chỉ POST 064, tampered chỉ PUT 071. Không còn matrix 4 loại × 3 methods |
| Category stale theo timing assumption | 074 | Existing/missing/non-existing category còn cả create/edit; EP-PC-30 deferred. AS-PC-05/AM-PC-07 vẫn cần làm rõ, không suy coverage stale từ ID không tồn tại |
| UI price blank | 077/078 | API missing/abc và UI price 0 còn; UI blank là đường riêng bị giảm ưu tiên, EP-PC-11 chỉ còn đại diện API abc |

Giữ các case có rủi ro riêng: UI edit 039 kiểm tra Q/R trước reload và API; switch target 075; URL/body ID 076; UI Admin access 073. Không bỏ POST/PUT negative validation hoặc missing-field checks chỉ vì frontend chặn input: hai endpoint có thể xử lý khác nhau. Sau tinh gọn **26/30 partitions active**, 4 deferred (05/10/14/30); cả 3 boundaries/9 giá trị có đại diện toàn suite, không còn 9 giá trị trên từng đường.

### Potential Coverage Gaps

- Fractional price/precision/delta nhỏ hơn 1, max price, Unicode grapheme length, whitespace-only/trim chưa đủ oracle để nhận xét đầy đủ (AM-PC-01/02).
- API coercion/numeric string, malformed JSON/name object/array và duplicate name không được tự phân loại qua ví dụ request; chưa phải fuzzing schema.
- Description/image chỉ nominal; chưa có quy tắc length/format/HTML để thiết kế validation hoặc toàn bộ security payloads.
- GET missing resource, update missing ID, delete retry và cascade khi sản phẩm có order/cart chưa có oracle chi tiết; fixture delete cố ý không có liên kết.
- UI không thể gửi name 256 nếu có maxlength/truncation; cần ghi backend chưa exercise ở UI case, API case độc lập vẫn có giá trị 256.
- Null name/price/category và stale category không còn active case (EP-PC-05/10/14/30). Category empty toàn hệ thống/concurrency vẫn chưa có oracle; không suy coverage stale từ non-existing category ID.
- Direct API positive BVA/nominal CRUD/view/delete; UI-edit name 2/254, price -1; malformed PUT/DELETE, tampered POST/DELETE; UI price blank create/edit đã giảm ưu tiên. Các đường này khác đại diện giữ lại, không được gọi covered.
- Nếu dependency setup/readback lỗi, ghi Blocked/giới hạn khi người dùng execute, không đổi Expected Result theo implementation.
- Không đánh giá toàn bộ FR-21/22/24 hoặc storefront/search/import/mobile ngoài scope Product CRUD này.

### Assumptions

AS-PC-01–07 cần reviewer xem lại; đặc biệt name required suy min 1 trên ASCII, BVA price theo integer slice, coercion response, category timing và extra-body-ID policy.

### Ambiguities Requiring Clarification

AM-PC-01/02/03 ưu tiên: length counting/trim, price precision/max và JSON coercion. AM-PC-04–08: description/image, uniqueness/partial PUT, delete/cascade, category timing/concurrency và response/UI semantics chưa rõ.

## Human Review Required

Trạng thái: **chờ người dùng review**. Skill yêu cầu “Require human review before treating the analysis as final.” Yêu cầu tiếp tục Pool C không tự xác nhận các pool trước đã được phê duyệt.

1. Xác nhận R-PC-01–06 diễn giải đúng FR-15/FR-12: required name/price/category, max name 255, giá >0, edit isolation và đủ role/token cho từng mutation.
2. Xác nhận AS-PC-01/02: name required không rỗng suy min length 1, BVA dùng ASCII để tránh Unicode counting. Có quy tắc trim/whitespace/grapheme khác cần trích nguồn không?
3. Xác nhận price boundary 0 exclusive; -1/0/1 là integer slice bước dữ liệu test 1 ₫. Không nhận min price=1 hoặc integer-only từ bộ case này. Làm rõ AM-PC-02 trước khi thêm fractional “nearest”/max BVA.
4. Kiểm tra 30 partitions giữ nguyên: 26 active, null name/price/category và stale category (05/10/14/30) deferred. Missing/null/nonnumeric là điều kiện khác nhau, không gộp thành một request nhiều lỗi.
5. Kiểm tra 23 BVA còn lại: cả 9 giá trị 0/1/2/254/255/256 và -1/0/1 có đại diện, coverage từng đường khác nhau. Chấp nhận bỏ positive API quanh biên và UI-edit neighbors 2/254/-1, hay có rủi ro cần khôi phục?
6. Xác nhận AS-PC-04/06 về request đủ field và so giá trị số readback; numeric string UI hoặc GET response chưa được schema mô tả không tự thành bug kiểu dữ liệu.
7. Kiểm tra CRUD nominal UI 037/039/041/043 và edit isolation 039/075/076: Q/R giữ nguyên tại UI ngay sau lưu, sau reload và API. Chỉ đọc sau reload có thể bỏ sót lỗi UI state.
8. Xác nhận fixture độc lập: M/A roles, 2 categories, P/Q/R khác ID, không order/cart link, CAT_B dùng cho đổi danh mục ở 039. Category IDs không có BVA số học.
9. Xác nhận AS-PC-05 về timing category và chấp nhận deferred EP-PC-30/case 074. Non-existing ID 057/060 không chứng minh stale UI/category concurrency; chỉ khôi phục khi có ưu tiên/oracle.
10. Kiểm tra case 076 có thể reject/ignore body id lạ, nhưng không được sửa Q khi URL chọn P. Không tự áp partial PUT/extra-field schema chưa có nguồn.
11. Kiểm tra missing JWT/user role trên cả POST/PUT/DELETE, malformed chỉ POST 064, tampered chỉ PUT 071. Chấp nhận những token/method variations còn thiếu; API đọc public không thành private admin read.
12. Review Expected Result, khả năng tái lập, assumptions/ambiguities và rủi ro còn thiếu; xác định phần nào cần giảng viên/nguồn yêu cầu làm rõ trước execution. Không coi generated output mặc nhiên đúng.
13. Review quyết định 78→48: giữ core CRUD, selected-target isolation, required-field/negative API validation, boundaries và role/missing JWT. Chấp nhận 4 partitions deferred và các đường vào giảm ưu tiên trong bảng quyết định, hoặc chỉ rõ rủi ro cần khôi phục trước execution; không coi việc tiếp tục pool khác là human approval.

Sau review, cập nhật domain/partition/boundary/case theo quy tắc có nguồn và commit riêng. Người dùng execute, ghi Actual Result/evidence trong test run. Pool D đã thiết kế, chưa tinh gọn; chỉ tiếp tục khi người dùng yêu cầu.

## AI Gap Candidates

Các ứng viên này dựa trên ambiguity/coverage hiện có, chưa phải gap AI được người dùng xác nhận. Không phải AI Audit Report hoặc nhật ký tương tác.

### Candidate 1 — Unicode/trim và độ dài tên

- Possible missed case: Emoji, combining marks, whitespace-only hoặc server trim làm độ dài khác dữ liệu UI.
- Why it may have been missed: FR-15 nói “255 ký tự” nhưng chưa định nghĩa cách đếm/chuẩn hóa; BVA hiện cố ý dùng ASCII, không đại diện mọi Unicode (AM-PC-01).
- Human action required: xác nhận length metric/normalization; thêm domain và BVA có căn cứ nếu được cung cấp, không suy từ HTML maxlength/SQL storage.

### Candidate 2 — Fractional price và coercion

- Possible missed case: Giá positive nhỏ hơn 1 ₫, rounding/precision, numeric string, very large price hoặc field sai kiểu khác.
- Why it may have been missed: Requirement chỉ nói >0, chưa định nghĩa tiền có phải integer hay delta/minor unit/max/schema. BVA -1/0/1 chỉ là integer slice.
- Human action required: làm rõ precision/coercion và nguồn; không reject 0.5 vì integer-only tự đặt, không coi kiểm tra price 1 là đầy đủ fractional boundary coverage.

### Candidate 3 — Category stale và các dependencies

- Possible missed case: Toàn bộ category list rỗng, category mất đồng thời với update, hoặc UI tự cập nhật trước submit nên server stale path chưa được thử.
- Why it may have been missed: Timing/isolation/cache behavior không được quy định; case 074 theo AS-PC-05 đã deferred khi tinh gọn. Chưa có active stale case, không phải concurrency coverage.
- Human action required: ghi điểm đã exercise khi execution; nếu cần thêm scenario, xác nhận semantics rồi bổ sung partition/case. Không dùng kết quả một stale case để kết luận concurrency safety.

### Candidate 4 — Edit isolation chỉ kiểm tra sau reload

- Possible missed case: Danh sách UI tạm thời đổi các sản phẩm khác dù API/database đúng; switch edit target có thể giữ ID cũ.
- Why it may have been missed: Chỉ readback API hoặc reload ngay sau thao tác sẽ bỏ mất state UI trước reload; multi-product interactions dễ bị che.
- Human action required: review checkpoints trong 039/075 và BVA edit, ghi UI trước reload riêng với API. Các checkpoints đã được thêm vào thiết kế; chỉ coi là actual AI gap nếu reviewer xác nhận trước đó còn bỏ sót.

### Candidate 5 — Contracts ngoài fields bắt buộc

- Possible missed case: Image/description validation, duplicate names, partial PUT, missing product, delete liên quan order/cart hoặc retry.
- Why it may have been missed: FR-15/API mẫu chưa quy định đủ các chính sách này; nếu tự tạo Expected Result có thể biến hành vi hợp lệ thành bug giả.
- Human action required: lấy nguồn yêu cầu bổ sung hoặc ghi exploratory scope riêng theo chỉ dẫn người dùng; không tự mở rộng sang cleanup/security hardening hoặc confirmed bug report.
