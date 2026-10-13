# Pool C — Bộ test cases Product CRUD

Theo [Domain/BVA Analysis](../../test-summary/product-crud-analysis.md), module `PRODUCT-CRUD`, template `TC-[MODULE]-[NUMBER]`. **48 cases: 23 BVA + 25 EP; 21 UI + 27 API; tất cả Not Run / None**. Người dùng tự execute; chưa có test run hoặc evidence.

## Fixture tài khoản và danh mục

| Chủ thể | Email | Mật khẩu test | Role |
|---|---|---|---|
| M | admin@eshop.com | Admin123! | admin |
| A | products.a@example.com | ProductsA123! | user |

M là seed nếu chưa đổi; A do tester tạo. Ghi ID/token thật `M_ID`, `A_ID`, `TOKEN_M`, `TOKEN_A`; xác minh role và token hợp lệ trước từng case role. Không dùng ID/JWT giả hoặc token user hết hiệu lực để kiểm tra role.

| Ký hiệu category | Tên fixture | Điều kiện |
|---|---|---|
| CAT_A_ID | PC Danh mục A | Tồn tại |
| CAT_B_ID | PC Danh mục B | Tồn tại, ban đầu chưa được sản phẩm fixture tham chiếu |
| CAT_MISSING_ID | Không có | ID xác nhận không tồn tại, không phải boundary số |

Dùng GET `/api/categories` và nguồn fixture độc lập để xác nhận. ID category không được coi là hợp lệ chỉ vì là số dương.

## Fixture sản phẩm

| ID ký hiệu | name | price | description | imageUrl | category_id |
|---|---|---:|---|---|---|
| P_ID | PC-P Bàn phím | 100000 | Mô tả kiểm tra sản phẩm | http://localhost:5174/favicon.svg | CAT_A_ID |
| Q_ID | PC-Q Chuột | 200000 | Mô tả Q | http://localhost:5174/favicon.svg | CAT_A_ID |
| R_ID | PC-R Tai nghe | 300000 | Mô tả R | http://localhost:5174/favicon.svg | CAT_A_ID |

1. Tester chuẩn bị local SUT và fixture. Có thể dùng API admin nếu đã xác minh hoạt động, hoặc database fixture có kiểm soát để không phụ thuộc mutation đang kiểm thử; agent không thực hiện setup.
2. P/Q/R phải là ba ID khác nhau, không có tham chiếu cart/order. CAT_B tồn tại để đổi danh mục khi sửa ở case 039.
3. Ghi toàn bộ catalog/category snapshot theo ID trước mỗi case; ghi năm trường P/Q/R. Tên `PC sản phẩm mới` chưa xuất hiện trong baseline.
4. Mỗi case độc lập. Khôi phục baseline và loại bỏ các sản phẩm tạo ra trong case trước theo ID thực đã ghi; không thao tác sản phẩm người dùng không thuộc fixture.
5. Backend startup drop/reseed database; không restart giữa mutation/readback để kiểm tra persistence.
6. Nếu không chuẩn bị/đọc lại được fixture, ghi Blocked/giới hạn trong test run khi người dùng execute; không thay Expected Result theo code lỗi.

## Dữ liệu BVA và request

- API base `http://localhost:3000`, Admin `http://localhost:5174`, tab Sản phẩm. JSON gửi `Content-Type: application/json`.
- Các token/ID là runtime values. Trong body JSON, thay `CAT_A_ID`, `CAT_B_ID`, `CAT_MISSING_ID`, `Q_ID` bằng ID thật dạng số; chuỗi `A` dài trong Test Data giữ nguyên. Placeholder không phải JSON literal để gửi trực tiếp.
- Name BVA: empty, 1, 2, 254, 255, 256 ký tự ASCII `A`; từng file chứa chuỗi đầy đủ để copy. `"" (để trống ô)` ở UI nghĩa xóa giá trị, không nhập hai dấu nháy.
- Price BVA: -1, 0, 1, theo integer slice bước dữ liệu test 1 ₫. 1 là mẫu positive gần 0 trên lát cắt này, không phải business minimum; không tự reject 0.5 vì chưa có rule integer-only.
- Với UI, kiểm tra giá trị thực của input. Nếu name 256 bị chặn/truncated thành 255, ghi validation và phần backend chưa exercise; không submit 255 rồi coi là đã thử 256. Không dùng DevTools để bỏ validation UI.
- Mỗi negative case chỉ làm sai một field. Các POST/PUT đầy đủ năm trường trừ field cố ý bị bỏ trong cases missing-field.
- UI gửi price/category dưới dạng string có thể được chuyển đổi; không tự kết luận là lỗi kiểu nếu giá trị nghiệp vụ đúng. API cases dùng JSON number cho price hợp lệ.
- Readback: GET `/api/products` không search, GET `/api/products/<ID>`, GET `/api/categories`. So theo ID và giá trị số của price; response type schema chưa rõ. API đọc public không tự cần admin gate.
- Sau create, ghi ID mới và GET detail đúng ID đó; so diff catalog để chứng minh chỉ tạo một sản phẩm. Response message không đủ.
- Sau edit, kiểm tra Q/R cả UI ngay sau lưu lẫn sau reload và API. Nếu UI sai trước reload nhưng API đúng, vẫn ghi Actual Result sai UI; không bỏ qua checkpoint.
- Delete fixture không có liên kết order/cart; không thử cascade/missing-resource/idempotency với oracle chưa rõ.
- Case 076 cho phép reject/ignore extra body id nếu Q không bị sửa. Stale category 074 đã deferred, không thuộc active suite.
- Lưu execution/evidence riêng `tests/test-runs/` khi người dùng thực hiện; không tạo AI Audit Report, push hoặc GitHub Issues trong giai đoạn chỉ thiết kế.

## Phạm vi sau tinh gọn

Giảm **78 → 48**, loại 30 (13 BVA + 17 EP). Giữ ID/nội dung cases còn lại, nên danh sách có khoảng trống; file đã loại có trong Git history. Không ghép các request độc lập để giảm số case. Chi tiết IDs/lý do: [quyết định tinh gọn](../../test-summary/product-crud-analysis.md#quyết-định-tinh-gọn-theo-yêu-cầu-người-dùng).

- Giữ UI CRUD 037/039/041/043 và GET/snapshot/readback, edit isolation trước reload, target switch 075/body-ID 076, UI Admin access 073.
- UI-create có cả 9 BVA values; UI-edit name 0/1/255/256 và price 0/1. Direct API POST/PUT vẫn có name 0/256, price -1/0, missing fields, price abc và category ngoài tập.
- Missing JWT và user role giữ đủ POST/PUT/DELETE; malformed chỉ POST, tampered chỉ PUT.
- **26/30 partitions active; EP-PC-05/10/14/30 deferred** (null name/price/category, stale category). Giữ định nghĩa/mapping thay vì xóa domain để tuyên bố coverage đầy đủ.
- Direct API positive BVA/nominal CRUD/view/delete, UI-edit name 2/254/price -1, các auth method variations và UI price blank giảm ưu tiên. UI khác API; missing khác null/blank; API category ngoài tập khác stale UI. Đại diện giữ lại không chứng minh những đường đã loại.
- Nếu UI chặn trước request, server acceptance chưa được exercise. Không suy full server coverage từ UI case/GET readback.

## Generated Test Cases

| ID | Mục tiêu | Technique |
|---|---|---|
| [TC-PRODUCT-CRUD-001](TC-PRODUCT-CRUD-001.md) | UI thêm — từ chối name 0 ký tự | BVA |
| [TC-PRODUCT-CRUD-002](TC-PRODUCT-CRUD-002.md) | UI thêm — chấp nhận name 1 ký tự | BVA |
| [TC-PRODUCT-CRUD-003](TC-PRODUCT-CRUD-003.md) | UI thêm — chấp nhận name 2 ký tự | BVA |
| [TC-PRODUCT-CRUD-004](TC-PRODUCT-CRUD-004.md) | UI thêm — chấp nhận name 254 ký tự | BVA |
| [TC-PRODUCT-CRUD-005](TC-PRODUCT-CRUD-005.md) | UI thêm — chấp nhận name 255 ký tự | BVA |
| [TC-PRODUCT-CRUD-006](TC-PRODUCT-CRUD-006.md) | UI thêm — từ chối name 256 ký tự | BVA |
| [TC-PRODUCT-CRUD-007](TC-PRODUCT-CRUD-007.md) | API thêm — từ chối name 0 ký tự | BVA |
| [TC-PRODUCT-CRUD-012](TC-PRODUCT-CRUD-012.md) | API thêm — từ chối name 256 ký tự | BVA |
| [TC-PRODUCT-CRUD-013](TC-PRODUCT-CRUD-013.md) | UI sửa — từ chối name 0 ký tự | BVA |
| [TC-PRODUCT-CRUD-014](TC-PRODUCT-CRUD-014.md) | UI sửa — chấp nhận name 1 ký tự | BVA |
| [TC-PRODUCT-CRUD-017](TC-PRODUCT-CRUD-017.md) | UI sửa — chấp nhận name 255 ký tự | BVA |
| [TC-PRODUCT-CRUD-018](TC-PRODUCT-CRUD-018.md) | UI sửa — từ chối name 256 ký tự | BVA |
| [TC-PRODUCT-CRUD-019](TC-PRODUCT-CRUD-019.md) | API sửa — từ chối name 0 ký tự | BVA |
| [TC-PRODUCT-CRUD-024](TC-PRODUCT-CRUD-024.md) | API sửa — từ chối name 256 ký tự | BVA |
| [TC-PRODUCT-CRUD-025](TC-PRODUCT-CRUD-025.md) | UI thêm — từ chối price -1 | BVA |
| [TC-PRODUCT-CRUD-026](TC-PRODUCT-CRUD-026.md) | UI thêm — từ chối price 0 | BVA |
| [TC-PRODUCT-CRUD-027](TC-PRODUCT-CRUD-027.md) | UI thêm — chấp nhận price 1 | BVA |
| [TC-PRODUCT-CRUD-028](TC-PRODUCT-CRUD-028.md) | API thêm — từ chối price -1 | BVA |
| [TC-PRODUCT-CRUD-029](TC-PRODUCT-CRUD-029.md) | API thêm — từ chối price 0 | BVA |
| [TC-PRODUCT-CRUD-032](TC-PRODUCT-CRUD-032.md) | UI sửa — từ chối price 0 | BVA |
| [TC-PRODUCT-CRUD-033](TC-PRODUCT-CRUD-033.md) | UI sửa — chấp nhận price 1 | BVA |
| [TC-PRODUCT-CRUD-034](TC-PRODUCT-CRUD-034.md) | API sửa — từ chối price -1 | BVA |
| [TC-PRODUCT-CRUD-035](TC-PRODUCT-CRUD-035.md) | API sửa — từ chối price 0 | BVA |
| [TC-PRODUCT-CRUD-037](TC-PRODUCT-CRUD-037.md) | UI — thêm mới sản phẩm hợp lệ | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-039](TC-PRODUCT-CRUD-039.md) | UI — sửa đầy đủ các trường sản phẩm hợp lệ | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-041](TC-PRODUCT-CRUD-041.md) | UI — xem đúng dữ liệu sản phẩm và form Sửa không tự lưu | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-043](TC-PRODUCT-CRUD-043.md) | UI — xóa đúng sản phẩm không có liên kết order/cart | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-045](TC-PRODUCT-CRUD-045.md) | API thêm — từ chối name thiếu | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-047](TC-PRODUCT-CRUD-047.md) | API sửa — từ chối name thiếu | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-049](TC-PRODUCT-CRUD-049.md) | API thêm — từ chối price thiếu | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-051](TC-PRODUCT-CRUD-051.md) | API thêm — từ chối price không phải số | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-052](TC-PRODUCT-CRUD-052.md) | API sửa — từ chối price thiếu | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-054](TC-PRODUCT-CRUD-054.md) | API sửa — từ chối price không phải số | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-055](TC-PRODUCT-CRUD-055.md) | API thêm — từ chối category_id thiếu | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-057](TC-PRODUCT-CRUD-057.md) | API thêm — từ chối category_id không tồn tại | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-058](TC-PRODUCT-CRUD-058.md) | API sửa — từ chối category_id thiếu | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-060](TC-PRODUCT-CRUD-060.md) | API sửa — từ chối category_id không tồn tại | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-061](TC-PRODUCT-CRUD-061.md) | API POST — từ chối thiếu token | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-062](TC-PRODUCT-CRUD-062.md) | API PUT — từ chối thiếu token | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-063](TC-PRODUCT-CRUD-063.md) | API DELETE — từ chối thiếu token | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-064](TC-PRODUCT-CRUD-064.md) | API POST — từ chối token sai định dạng | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-067](TC-PRODUCT-CRUD-067.md) | API POST — từ chối token user thường | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-068](TC-PRODUCT-CRUD-068.md) | API PUT — từ chối token user thường | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-069](TC-PRODUCT-CRUD-069.md) | API DELETE — từ chối token user thường | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-071](TC-PRODUCT-CRUD-071.md) | API PUT — JWT user sửa role nhưng giữ chữ ký cũ bị từ chối | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-073](TC-PRODUCT-CRUD-073.md) | UI — user thường không được vào Product CRUD Admin | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-075](TC-PRODUCT-CRUD-075.md) | UI — đổi lựa chọn Sửa P sang Sửa Q chỉ làm Q thay đổi | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-076](TC-PRODUCT-CRUD-076.md) | API — body id Q không làm sửa nhầm Q khi URL chọn P | Equivalence Partitioning |
