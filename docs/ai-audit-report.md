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

## Interaction 11

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 00:51 (UTC+7)
- **Your prompt:**

> tại sao trong issue không hiển thị ảnh
>
> Ảnh đính kèm: nội dung issue BUG-09, dòng "Ảnh: docs/bugs/BUG-09-actual.png" hiện thành chữ, không có hình.

- **The AI output:**

> Issue chỉ ghi đường dẫn chữ `docs/bugs/BUG-09-actual.png`. GitHub không lấy file từ máy local và không render đường dẫn tương đối trong issue thành ảnh. File PNG đang nằm trong commit local, chưa được đẩy lên GitHub và chưa được chèn bằng cú pháp ảnh.

## Interaction 12

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 00:55 (UTC+7)
- **Your prompt:**

> có

- **The AI output:**

> Đã push nhánh `hw02/toanhuynh-fr05/11/16/19`. Issue #44 đến #52 đã đổi dòng đường dẫn chữ thành ảnh Markdown trỏ tới `docs/bugs/BUG-0N-actual.png` trên nhánh đó. Mở lại issue khi đang đăng nhập GitHub thì ảnh hiện. Repo private nên khách chưa đăng nhập không thấy. Chưa chụp trang issue vì trình duyệt tự động không có phiên GitHub.

## Interaction 13

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 09:57 (UTC+7)
- **Your prompt:**

> tạo file gitignore

- **The AI output:**

> Đã tạo `.gitignore` ở thư mục gốc. File bỏ qua `node_modules/`, file `.env`, log, thư mục build, `.cursor/`, file PDF, và `backend/database.sqlite` mới. `backend/database.sqlite` vẫn đang được Git theo dõi từ trước, nên `.gitignore` chưa gỡ nó khỏi repo.

## Interaction 14

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 10:02 (UTC+7)
- **Your prompt:**

> hãy tóm tắt lại quy trình mà tôi đã làm để test một fr

- **The AI output:**

> Với FR-05, quy trình đã đi theo Domain Testing. Kết quả mong đợi lấy từ README, rồi đối chiếu với hệ thống đang chạy. Các bước: đọc spec và code; xác định biến đầu vào (`01-input-space-partitioning.md`); phân hoạch tương đương VEC/IEC (`02-equivalence-partitioning.md`); BVA 3 giá trị (`03-boundary-value-analysis.md`); viết 46 test case bằng Base Choice, mỗi case sai chỉ một dữ liệu sai (`04-test-cases.md`); chạy `scripts/fr05-execute.mjs` trên local (`05-execution-results.md`: 25 PASS, 16 FAIL, 5 BLOCKED); báo 9 bug trong `docs/bug-report.md`, ảnh `docs/bugs/`, issue #44–#52. Mỗi bước một commit trên nhánh `hw02/toanhuynh-fr05/11/16/19`, kèm audit log. AI gap analysis chưa làm.

## Interaction 15

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 10:04 (UTC+7)
- **Your prompt:**

> hãy tạo agent skill về quy trình đó

- **The AI output:**

> Đã tạo skill `fr-domain-testing` tại `.cursor/skills/fr-domain-testing/SKILL.md`. Skill chạy Domain Testing cho một FR: biến đầu vào, VEC/IEC, BVA 3 giá trị, test case base choice, chạy thật, bug report. Mỗi lần chỉ làm bước được yêu cầu. Oracle là README. Đã sửa `.gitignore` để Git thấy skill, vẫn bỏ qua rule trong `.cursor/rules/`. Chưa commit.

## Interaction 16

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 10:18 (UTC+7)
- **Your prompt:**

> hãy sử dụng skill test vừa tạo với fr11

- **The AI output:**

> Đã làm bước 1 của FR-11, file `docs/fr-11/01-input-space-partitioning.md`. Trang `/profile` không có ô lọc và không có query. API `GET /api/orders/my-orders` chỉ lọc theo `user_id` trong JWT. Biến trạng thái là chủ đơn, số đơn, và `status`. Form hồ sơ thuộc FR-04, nút hủy thuộc FR-10. Chưa chia miền hay viết test case.

## Interaction 17

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 10:23 (UTC+7)
- **Your prompt:**

> tiếp tục

- **The AI output:**

> Đã làm bước 2 của FR-11, file `docs/fr-11/02-equivalence-partitioning.md`. VEC/IEC cho phiên đăng nhập, JWT, chủ đơn, số đơn, năm trạng thái FR-10, mã đơn, ngày, tổng tiền, và query thừa. Seed không có đơn. Chưa viết test case.

## Interaction 18

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 10:26 (UTC+7)
- **Your prompt:**

> tiếp tục

- **The AI output:**

> Đã làm bước 3 của FR-11, file `docs/fr-11/03-boundary-value-analysis.md`. Biên số đơn 0, 1, 2. Chủ đơn quanh id 2 là 1, 2, 3. Mã đơn 0, 1, 2. Tổng tiền quanh 0, 1000 và 1000000. Không bịa Max số đơn, Max mã đơn, hay Limit phân trang. Chưa viết test case.

## Interaction 19

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 10:29 (UTC+7)
- **Your prompt:**

> tiếp tục

- **The AI output:**

> Đã viết 27 test case FR-11 trong `docs/fr-11/04-test-cases.md`. Mức chuẩn là một đơn của user id 2: mã 1, pending, ngày 2026-10-15, tổng 30000000. Case hợp lệ chỉ đổi một yếu tố. Case sai chỉ một dữ liệu sai. Chưa chạy.

## Interaction 20

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 10:35 (UTC+7)
- **Your prompt:**

> tiếp tục

- **The AI output:**

> Đã chạy 27 test case FR-11 bằng `scripts/fr11-execute.mjs`. Kết quả trong `docs/fr-11/05-execution-results.md`: 23 PASS, 4 FAIL. Lệch: trang không có h1, empty state không có icon, ngày null thành 1/1/1970, tiền null thành 0 ₫. Chưa lập bug report.

## Interaction 21

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 10:39 (UTC+7)
- **Your prompt:**

> tiếp tục

- **The AI output:**

> Đã lập 4 bug FR-11 trong `docs/bug-report.md`: BUG-10 đến BUG-13, ảnh trong `docs/bugs/`. Issue trên `Taylor3691/eshop-sut`: #53 đến #56. TC-23 không lập bug. Ảnh trong issue trỏ tới file trên nhánh; cần push thì ảnh mới hiện. Chưa push.

## Interaction 22

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 10:43 (UTC+7)
- **Your prompt:**

> đổi tên bug trên issue theo format là frxx: bug gì

- **The AI output:**

> Chưa đổi hết. Người dùng nói tiếp chỉ đổi 4 issue mới.

## Interaction 23

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 10:43 (UTC+7)
- **Your prompt:**

> chỉ đổi tên 4 issue mới vừa tọa

- **The AI output:**

> Đã đổi tiêu đề 4 issue FR-11: #53 FR-11: trang hồ sơ không có thẻ h1, #54 FR-11: lịch sử trống không có icon, #55 FR-11: ngày đặt null hiện thành 1/1/1970, #56 FR-11: tổng tiền null hiện thành 0 ₫. Các issue khác giữ nguyên.

## Interaction 24

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 10:49 (UTC+7)
- **Your prompt:**

> tiếp tục quy trình đó với fr16

- **The AI output:**

> Đã làm bước 1 của FR-16, file `docs/fr-16/01-input-space-partitioning.md`. Input là file trên tab Sản phẩm của admin, được tách thành JSON rồi POST `/api/admin/import-products`. Spec yêu cầu đuôi `.csv`, header đúng, RFC 4180, tên không rỗng, giá dương, và rollback cả file. Code không lọc đuôi, không xử lý nháy kép, không kiểm tra giá, không có transaction. Chưa chia miền.

## Interaction 25

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 10:51 (UTC+7)
- **Your prompt:**

> tiếp tục

- **The AI output:**

> Đã làm bước 2 của FR-16, file `docs/fr-16/02-equivalence-partitioning.md`. VEC/IEC cho phiên admin, JWT và role, đuôi file, header, dấu phẩy trong nháy kép, tên, giá, mô tả, ảnh, danh mục, số dòng và rollback. Chưa viết test case.

## Interaction 26

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 10:53 (UTC+7)
- **Your prompt:**

> tiếp tục

- **The AI output:**

> Đã làm bước 3 của FR-16, file `docs/fr-16/03-boundary-value-analysis.md`. Tên dài 0, 1, 2, 254, 255, 256 ký tự, mốc 255 lấy từ FR-15. Giá -1, 0, 1. Số dòng 0, 1, 2. Không bịa giá tối đa hay số dòng tối đa. Chưa viết test case.

## Interaction 27

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 10:55 (UTC+7)
- **Your prompt:**

> tiếp tục

- **The AI output:**

> Đã viết 24 test case FR-16 trong `docs/fr-16/04-test-cases.md`. Mức chuẩn là file `hang.csv` một dòng `SP Import`, giá 100000. Case hợp lệ chỉ đổi một yếu tố. Case sai chỉ một dữ liệu sai. Chưa chạy.

## Interaction 28

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 11:00 (UTC+7)
- **Your prompt:**

> tiếp tục 

- **The AI output:**

> Đã chạy 24 test case FR-16 trên Admin `http://localhost:5174` và API `http://localhost:3000`. Kết quả ghi ở `docs/fr-16/05-execution-results.md`, script `scripts/fr16-execute.mjs`.
>
> Tổng: 24. PASS: 13. FAIL: 11. BLOCKED: 0.
>
> Các lệch: TC-03 mô tả trong ngoặc kép bị cắt thành `"Mo ta`. TC-12 token user thường import được. TC-13 file `.txt` vẫn import. TC-14 header alias vẫn import. TC-15 dấu phẩy không ngoặc kép cắt mô tả thành `Mo ta`. TC-17 đến TC-20 giá `-1`, `0`, `abc`, `100@` đều được thêm. TC-21 tên 256 ký tự được thêm. TC-23 không rollback, dòng đúng vẫn còn, báo `1/2`.
>
> Chưa lập bug report.

## Interaction 29

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 11:01 (UTC+7)
- **Your prompt:**

> Briefly inform the user about the task result. Task "Start the admin app on port 5174" finished with exit code 127.

- **The AI output:**

> Lần khởi động admin đầu tiên thất bại vì chưa có Vite (`vite: command not found`). Sau khi cài dependency, admin đã chạy ở `http://127.0.0.1:5174` và bộ test FR-16 đã dùng server đó.

## Interaction 30

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 11:08 (UTC+7)
- **Your prompt:**

> lập bug report

- **The AI output:**

> Đã lập 7 bug FR-16 trong `docs/bug-report.md` và trên GitHub `Taylor3691/eshop-sut`.
>
> - BUG-14, issue #57: CSV không đọc trường bọc nháy kép.
> - BUG-15, issue #58: API import không kiểm tra role admin.
> - BUG-16, issue #59: file `.txt` vẫn được import.
> - BUG-17, issue #60: header alias vẫn được import.
> - BUG-18, issue #61: giá `-1`, `0`, `abc`, `100@` được thêm.
> - BUG-19, issue #62: tên 256 ký tự được thêm.
> - BUG-20, issue #63: dòng lỗi không rollback cả file.
>
> Ảnh ở `docs/bugs/BUG-14-actual.png` đến `BUG-20-actual.png`. Ảnh trên issue chưa hiện vì file chưa có trên remote. TC-16 không lập bug vì tên trống đã bị từ chối đúng đặc tả.

## Interaction 31

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 11:12 (UTC+7)
- **Your prompt:**

> tôi cần làm quy trình như thế với fr19 nhưng trên mobile thì sao

- **The AI output:**

> FR-19 không có màn trên app mobile. Đặc tả là admin xem danh sách người dùng, không lộ mật khẩu, và xóa được người dùng trừ chính tài khoản đang đăng nhập. Màn hình đó nằm ở Admin, tab Người dùng. App Expo không gọi API này.
>
> Sáu bước giữ nguyên. Chỗ chạy là Admin `http://localhost:5174` và API `http://localhost:3000`, giống FR-16. Không cần điện thoại.
>
> Nếu FR nằm trên mobile, tài liệu vẫn viết như cũ. Bước chạy đổi sang app Expo: mở simulator, thao tác trên màn đó, đối chiếu README. Playwright trên trình duyệt không mở được màn React Native.

## Interaction 32

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 11:15 (UTC+7)
- **Your prompt:**

> không mở đc simulator thì làm sao

- **The AI output:**

> FR-19 không cần simulator. Chạy trên Admin `http://localhost:5174`.
>
> Nếu FR nằm trên mobile mà simulator không mở, chạy `npm run web` trong `frontend-mobile`. Expo có script web và `app.json` đã có mục web, nên màn React Native mở trong trình duyệt và Playwright bắn được.
>
> Nếu web cũng không chạy, test cần nhìn màn hình ghi BLOCKED. Không chấm PASS/FAIL bằng cách đọc code. Test chỉ gọi API mà màn đó dùng vẫn chạy trên `http://localhost:3000`, và kết quả đó chỉ là API.

## Interaction 33

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 11:16 (UTC+7)
- **Your prompt:**

> vậy react native vẫn mơ đc trên web để test đúng không

- **The AI output:**

> Đúng khi `npm run web` mở được trang. Repo này chưa cài `react-native-web` và `react-dom`, nên hiện chưa mở trên trình duyệt. Lệnh đó trong `frontend-mobile` là bước để Expo cài hai gói rồi mở cùng các màn React Native. Khi trang lên, Playwright test được như web. App đang gọi API ở `http://192.168.10.13:3000/api`, nên máy phải tới được địa chỉ đó.

## Interaction 34

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 11:18 (UTC+7)
- **Your prompt:**

> vậy hãy tiếp tục quy trình test đó với fr19 nhưng trên mobile

- **The AI output:**

> Đã làm bước 1 của FR-19 trên app mobile, file `docs/fr-19/01-input-space-partitioning.md`.
>
> App mobile không có ô nhập, không có query, và không gọi API quản lý người dùng. Các màn hiện có là trang chủ, chi tiết sản phẩm, giỏ, thanh toán, đăng nhập, đăng ký, quên mật khẩu và hồ sơ. Những màn đó không thuộc FR-19.
>
> Chưa chia miền.

## Interaction 35

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 11:21 (UTC+7)
- **Your prompt:**

> tiếp tục bước 2

- **The AI output:**

> Đã làm bước 2 của FR-19 trên app mobile, file `docs/fr-19/02-equivalence-partitioning.md`.
>
> Bước 1 không có biến đầu vào, nên không có đặc tính để chia VEC hay IEC. Không có mã lớp và không có giá trị đại diện. Chưa chọn biên, chưa viết test case.

## Interaction 36

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 11:23 (UTC+7)
- **Your prompt:**

> tiếp tục

- **The AI output:**

> Đã làm bước 3 của FR-19 trên app mobile, file `docs/fr-19/03-boundary-value-analysis.md`.
>
> Bước 2 không có lớp và không có khoảng `[Min, Max]`, nên không có biên. Không bịa số người dùng tối đa, độ dài mật khẩu, id tài khoản, hay `Limit`. Chưa viết test case.

## Interaction 37

- **Name of the AI tool:** Cursor (Grok 4.7)
- **Date and time:** 2026-10-15 11:24 (UTC+7)
- **Your prompt:**

> tiếp tục

- **The AI output:**

> Đã viết bước 4 của FR-19 trên app mobile, file `docs/fr-19/04-test-cases.md`.
>
> Không có lớp và không có biên, nên không có test case. Không bịa case cho id, mật khẩu, hay role. Chưa chạy.







