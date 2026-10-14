# 9. AI Audit Report (Mandatory Appendix)

I use AI tools for the following tasks,

## Interaction 1

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-14 23:08 (UTC+7)
- **Your prompt:**

> hãy tạo file rule hãy mỗi lần prompt là sẽ ghi log lại như yêu cầu trong ảnh
>
> Ảnh đính kèm: mục 9. AI Audit Report (Mandatory Appendix). Nếu có dùng AI thì khai báo "I use AI tools for the following tasks," và với mỗi lần tương tác ghi tên công cụ AI, ngày giờ, prompt, và output của AI.

- **The AI output:**

> Đã tạo rule luôn áp dụng tại `.cursor/rules/ai-audit-log.mdc`. Từ prompt sau, mỗi lượt sẽ được nối vào `docs/ai-audit-report.md` với bốn mục: tên công cụ AI, ngày giờ, prompt, và output. Prompt này là Interaction 1 trong file đó.

## Interaction 2

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-14 23:28 (UTC+7)
- **Your prompt:**

> tạo thêm rule về tạo commit trong mỗi bước

- **The AI output:**

> Đã thêm rule luôn áp dụng tại `.cursor/rules/step-commit.mdc`. Mỗi bước kiểm thử của từng chức năng (từng bước domain testing, từng bước boundary value analysis, AI gap analysis, bug report) sẽ được commit riêng, rồi ghi đè `docs/git-commit-log.txt`. Prompt này chỉ tạo rule, không phải một bước kiểm thử, nên chưa có commit mới.

## Interaction 3

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-14 23:42 (UTC+7)
- **Your prompt:**

> thêm rule cho việc tạo bug report như trong yêu cầu @2026.HW02.Domain Testing_En.pdf

- **The AI output:**

> Đã thêm rule luôn áp dụng tại `.cursor/rules/bug-report.mdc`. Mỗi bug đã thấy lệch đặc tả trong README được ghi vào `docs/bug-report.md` và một GitHub Issue trên repo nhóm `Taylor3691/eshop-sut`, kèm ảnh lỗi và ảnh trang issue. Prompt này chỉ tạo rule, chưa phát hiện bug, nên chưa có báo cáo bug hay commit mới.

## Interaction 4

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-14 23:50 (UTC+7)
- **Your prompt:**

> Với vai trò là kỹ sư kiểm thử. Chúng ta đang làm bước 1 (Input Space Partitioning) của Domain Testing cho FR-05 (Product listing and search).
> 1. Hãy liệt kê tất cả các biến đầu vào tường minh trên UI VÀ các query parameters trên URL/API .
> 2. Bổ sung các biến trạng thái dữ liệu (Data State Variables) ảnh hưởng đến kết quả trả về (ví dụ: sản phẩm đang bị ẩn/inactive, sản phẩm có tồn kho = 0, sản phẩm có tên chứa dấu tiếng Việt).
> 3. Lập bảng gồm: Tên biến, Kiểu dữ liệu, Ràng buộc theo spec, và Ràng buộc thực tế trong code. Chưa sinh test case ở bước này.

- **The AI output:**

> Bước 1 chỉ lập danh sách biến cho FR-05, ghi tại `docs/fr-05/01-input-space-partitioning.md`. Chưa chia miền và chưa viết test case.
>
> UI trang chủ (`/`) chỉ có biến `search` (ô text, gửi khi bấm Tìm; lần mở trang gửi chuỗi rỗng). URL trang không có query. API `GET /api/products` chỉ đọc query `search`.
>
> Biến trạng thái: `products.name` (kể cả dấu tiếng Việt) và số dòng trong bảng có làm đổi kết quả. `description`, `category_id`, giá và ảnh không được dùng để lọc. `is_active` và tồn kho không có trong spec FR-05 và không có cột trong `products`, nên không thể ảnh hưởng kết quả.
>
> Bảng ràng buộc spec so với code nằm trong file trên. Điểm code chính: `LIKE '%từ khóa%'` nối thẳng vào SQL; `LIKE` không bỏ dấu tiếng Việt; chuỗi rỗng trả mọi sản phẩm.

## Interaction 5

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 00:00 (UTC+7)
- **Your prompt:**

> Từ bảng biến bước 1 đã được review, hãy thực hiện bước 2: Phân hoạch tương đương (Equivalence Partitioning) cho FR-05.
> Yêu cầu phân chia rõ Valid (VEC) và Invalid (IEC) cho từng nhóm:
> - Từ khóa (Keyword): Khớp toàn phần, khớp một phần, không phân biệt hoa thường, có dấu/không dấu tiếng Việt, chỉ chứa khoảng trắng, chứa ký tự đặc biệt/SQL/HTML (`%`, `_`, `'`, `<script>`), chuỗi rỗng.
> - Khoảng giá (Price Range): Miền hợp lệ, miền âm, chữ cái/ký tự đặc biệt, và miền quan hệ giữa 2 biến (`min_price < max_price`, `min_price == max_price`, `min_price > max_price`).
> - Danh mục & Sắp xếp (Category & Sort): ID hợp lệ, ID không tồn tại, chọn nhiều danh mục (nếu có), giá trị enum sort hợp lệ và sai lệch qua query string.
> Xuất bảng phân hoạch kèm Mã phân hoạch (ID) và Giá trị đại diện.

- **The AI output:**

> Bước 2 ghi tại `docs/fr-05/02-equivalence-partitioning.md`. VEC là giá trị spec mô tả cách xử lý; IEC là giá trị ngoài miền đó. Chưa viết test case.
>
> Từ khóa: KW-VEC-01 `iPhone 15 Pro Max` (khớp toàn phần), KW-VEC-02 `iPhone` (khớp một phần), KW-VEC-03 `zzzz-khong-co` (không khớp), KW-VEC-04 `iPhone` (cùng hoa thường), KW-VEC-05 `iphone` (khác hoa thường ASCII), KW-VEC-06 `CƠ` (khác hoa thường chữ có dấu), KW-VEC-07 `Bàn phím` (đúng dấu), KW-VEC-08 `Ban phim` (bỏ dấu), KW-VEC-09 `""` (chuỗi rỗng, liệt kê tất cả), KW-VEC-10 `<script>` (hiển thị an toàn nên là VEC). IEC: KW-IEC-01 ba dấu cách, KW-IEC-02 `%`, KW-IEC-03 `_`, KW-IEC-04 `'`.
>
> Khoảng giá không có trong FR-05. Miền một biến theo FR-15 (giá > 0): PR-VEC-01 `100000`, PR-IEC-01 `-100`, PR-IEC-02 `0`, PR-IEC-03 `abc`, PR-IEC-04 `100@`. Quan hệ: PR-VEC-02 `100000 < 500000`, PR-VEC-03 `6000000 == 6000000`, PR-IEC-05 `500000 > 100000`.
>
> Danh mục: CAT-VEC-01 `1`, CAT-IEC-01 `999`, CAT-IEC-02 `category=1&category=2`. Sort không có enum trong spec nên không có VEC; SORT-IEC-01 đại diện `price_asc`, mọi chuỗi sort khác cùng lớp.

## Interaction 6

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 00:11 (UTC+7)
- **Your prompt:**

> Áp dụng kỹ thuật 3-value BVA (Min-1, Min, Min+1, Max-1, Max, Max+1) cho FR-05 dựa trên các miền ở bước 2.
> Hãy tính toán giá trị biên cụ thể cho:
> 1. Độ dài chuỗi tìm kiếm (0, 1, 2 ký tự và MaxLength-1, MaxLength, MaxLength+1).
> 2. Giá sản phẩm (`min_price`, `max_price` tại mốc 0 VNĐ, -1 VNĐ, 1 VNĐ, giá sản phẩm thấp nhất/cao nhất đang có trong DB, và biên đảo ngược khi `min_price = max_price + 1`).
> 3. Phân trang (Pagination): Tổng số sản phẩm khớp điều kiện là `0`, `1`, `Limit - 1`, `Limit`, `Limit + 1` (trang 2 có đúng 1 sản phẩm), và truy cập `page = 0`, `page = -1`, `page = MaxPage + 1`.

- **The AI output:**

> Bước BVA ghi tại `docs/fr-05/03-boundary-value-analysis.md`. Chưa viết test case.
>
> Độ dài: Min = 1, MaxLength = 255 lấy từ FR-15 vì FR-05 và ô tìm không có maxLength. Các mốc: 0 (`""`), 1 (`a`), 2 (`aa`), 254, 255, 256 (chữ `a` lặp lại).
>
> Giá: -1, 0, 1 cho cả min_price và max_price. DB thấp nhất 4000000 (Bàn phím cơ Keychron Q1) nên 3999999, 4000000, 4000001. DB cao nhất 45000000 (MacBook Pro M3) nên 44999999, 45000000, 45000001. Biên đảo: max_price = 45000000, min_price = 45000001.
>
> Phân trang: spec và API không có Limit. N = 0, 1, L-1, L, L+1. Khi N = L+1 thì MaxPage = 2, trang 2 có 1 sản phẩm, MaxPage+1 = 3. page = -1 và page = 0 là số cụ thể. Không gán Limit giả.

## Interaction 7

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 00:29 (UTC+7)
- **Your prompt:**

> Dựa vào các miền ở Bước 2 và điểm biên ở Bước 3, hãy lập bảng Test Cases hoàn chỉnh (gồm TC ID, Miền/Biên được phủ, Precondition, Test Data, Steps, Expected Result). Lưu ý:
>
> Với các miền/biên Hợp lệ: hãy kết hợp khéo léo (dùng Base Choice hoặc Pairwise) để giảm số lượng test case nhưng vẫn phủ hết các miền.
>
> Với các miền/biên Không hợp lệ: mỗi test case chỉ kiểm tra đúng 1 dữ liệu sai, các trường còn lại giữ hợp lệ chuẩn để không bị che khuất lỗi (fault masking).

- **The AI output:**

> Bảng 46 test case ghi tại `docs/fr-05/04-test-cases.md`: 26 hợp lệ, 20 không hợp lệ. Expected result bám FR-05 trong README.
>
> Hợp lệ dùng base choice. Mức chuẩn từ khóa là `iPhone`. Khi test đụng giá thì mức chuẩn là `min_price=4000000`, `max_price=45000000`. Mỗi lớp hợp lệ khác chỉ đổi một yếu tố. `15 Pro` và `Max` không có test riêng vì cùng lớp với `iPhone`.
>
> Không hợp lệ: một trường sai mỗi test. Khi `max_price` là -1 hoặc 0 thì không gửi `min_price`, để không thêm lỗi đảo khoảng. Biên đảo `min_price=45000001`, `max_price=45000000` là TC-40.
>
> `min_price`, `category`, `sort`, `page` không thuộc FR-05, nên expected là tập sản phẩm không đổi so với cùng từ khóa và không lỗi. `L` giữ ký hiệu, không gán số giả.

## Interaction 8

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 00:40 (UTC+7)
- **Your prompt:**

> hãy chạy thực tế bộ Test Cases này trên local của eshop-sut. Hãy viết script để tự động bắn bộ Test Data ở Bước 4 vào API/UI và in ra kết quả thực tế (Actual Result) so với Expected Result nhé.

- **The AI output:**

> Đã viết `scripts/fr05-execute.mjs` và chạy trên API `localhost:3000` cùng UI `localhost:5173`. Kết quả ghi ở `docs/fr-05/05-execution-results.md`.
>
> 46 test: PASS 25, FAIL 16, BLOCKED 5. Năm test phân trang không chạy vì `L` chưa có số.
>
> Lệch chính: giá hiện `VND` thay vì `₫`; `alt` rỗng; hai `h1`; không có loading; không có empty state; `iphone` vẫn ra iPhone; `<script>` bị nuốt; 3 dấu cách, `%` và `_` trả đủ 5 sản phẩm; dấu `'` gây `Database Error SQLITE_ERROR: unrecognized token: "'"`.
>
> TC-14 đến TC-22 và TC-32 đến TC-45 PASS: tham số giá, category, sort, page không đổi tập iPhone và không lỗi.

## Interaction 9

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 00:41 (UTC+7)
- **Your prompt:**

> Briefly inform the user about the task result and perform any follow-up actions (if needed).

- **The AI output:**

> Cài thư viện frontend-web đã xong (226 gói). Bộ test FR-05 đã dùng bản cài này để mở UI tại localhost:5173.

## Interaction 10

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 00:47 (UTC+7)
- **Your prompt:**

> tạo bug report chưa

- **The AI output:**

> Trước câu này chưa có bug report. Đã tạo `docs/bug-report.md` với 9 bug FR-05 và ảnh trong `docs/bugs/`. Issue trên `Taylor3691/eshop-sut`: #44 đến #52. TC-04 không lập bug vì spec không cấm tìm không phân biệt hoa thường ASCII. Ảnh chưa gắn lên issue và chưa chụp trang issue vì repo private.
