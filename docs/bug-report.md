# Bug report — FR-05

Các bug dưới đây đã chạy trên Web `http://localhost:5173` và API `http://localhost:3000` ngày 2026-10-15. Ảnh lỗi nằm trong `docs/bugs/`.

TC-04 (`iphone` vẫn trả `iPhone 15 Pro Max`) không lập bug. FR-05 không cấm tìm không phân biệt hoa thường với chữ ASCII.

Repo GitHub `Taylor3691/eshop-sut` đang private. Ảnh lỗi đã được chèn vào issue #44–#52 bằng liên kết file trên nhánh `hw02/toanhuynh-fr05/11/16/19`. Ảnh hiện với tài khoản đã đăng nhập và có quyền đọc repo. Trang issue chưa chụp được vì trình duyệt tự động không đăng nhập GitHub.

## BUG-01 — Giá hiển thị VND thay vì ₫

- **Feature:** FR-05
- **Test case:** TC-01, TC-06, TC-08
- **Severity:** Minor
- **Environment:** Web `http://localhost:5173`, Chrome, seed mặc định
- **Spec:** README FR-05 và FR-21 — giá dùng ký hiệu `₫`, có phân cách hàng nghìn.
- **Steps:**
  1. Mở trang chủ.
  2. Tìm `iPhone`.
- **Expected:** Giá hiện `30.000.000 ₫`.
- **Actual:** Giá hiện `30.000.000 VND`.
- **Screenshot:** `docs/bugs/BUG-01-actual.png`
- **GitHub issue:** https://github.com/Taylor3691/eshop-sut/issues/44
- **Issue page screenshot:** chưa chụp được vì repo private

## BUG-02 — Ảnh sản phẩm có alt rỗng

- **Feature:** FR-05
- **Test case:** TC-01
- **Severity:** Major
- **Environment:** Web `http://localhost:5173`, Chrome, seed mặc định
- **Spec:** README FR-05 và FR-24 — ảnh sản phẩm phải có `alt` mô tả, không để rỗng.
- **Steps:**
  1. Mở trang chủ.
  2. Tìm `iPhone`.
  3. Đọc thuộc tính `alt` của `img` trong thẻ sản phẩm.
- **Expected:** `alt` mô tả sản phẩm.
- **Actual:** `alt=""`.
- **Screenshot:** `docs/bugs/BUG-02-actual.png`
- **GitHub issue:** https://github.com/Taylor3691/eshop-sut/issues/45
- **Issue page screenshot:** chưa chụp được vì repo private

## BUG-03 — Trang danh sách có hai thẻ h1

- **Feature:** FR-05
- **Test case:** TC-01
- **Severity:** Major
- **Environment:** Web `http://localhost:5173`, Chrome, seed mặc định
- **Spec:** README FR-05 và FR-21 — mỗi trang chỉ có đúng một thẻ `h1`.
- **Steps:**
  1. Mở trang chủ.
  2. Tìm `iPhone`.
  3. Đếm thẻ `h1`.
- **Expected:** Đúng một `h1`.
- **Actual:** Hai `h1`: `Danh sách sản phẩm` và `Hiển thị 1 sản phẩm`.
- **Screenshot:** `docs/bugs/BUG-03-actual.png`
- **GitHub issue:** https://github.com/Taylor3691/eshop-sut/issues/46
- **Issue page screenshot:** chưa chụp được vì repo private

## BUG-04 — Không có trạng thái loading khi tải sản phẩm

- **Feature:** FR-05
- **Test case:** TC-01
- **Severity:** Major
- **Environment:** Web `http://localhost:5173`, Chrome. Ảnh chụp khi `GET /api/products` bị giữ 1,2 giây.
- **Spec:** README FR-05 — khi đang tải dữ liệu phải hiển thị trạng thái loading.
- **Steps:**
  1. Mở trang chủ trong lúc API chưa trả về.
  2. Tìm chữ đang tải, loading, hoặc `aria-busy`.
- **Expected:** Có trạng thái loading.
- **Actual:** Trang trống, không có thông báo loading.
- **Screenshot:** `docs/bugs/BUG-04-actual.png`
- **GitHub issue:** https://github.com/Taylor3691/eshop-sut/issues/47
- **Issue page screenshot:** chưa chụp được vì repo private

## BUG-05 — Không có empty state khi tìm không ra kết quả

- **Feature:** FR-05
- **Test case:** TC-03, TC-05, TC-07, TC-11, TC-12, TC-13, TC-31
- **Severity:** Major
- **Environment:** Web `http://localhost:5173`, Chrome, seed mặc định
- **Spec:** README FR-05 và FR-24 — không có kết quả thì phải có thông báo empty state.
- **Steps:**
  1. Mở trang chủ.
  2. Tìm `zzzz-khong-co`.
- **Expected:** Có thông báo empty state.
- **Actual:** Không có sản phẩm và không có thông báo. Chỉ còn dòng "Kết quả tìm kiếm cho: zzzz-khong-co".
- **Screenshot:** `docs/bugs/BUG-05-actual.png`
- **GitHub issue:** https://github.com/Taylor3691/eshop-sut/issues/48
- **Issue page screenshot:** chưa chụp được vì repo private

## BUG-06 — Từ khóa HTML không được hiện dạng chữ

- **Feature:** FR-05
- **Test case:** TC-09
- **Severity:** Major
- **Environment:** Web `http://localhost:5173`, Chrome, seed mặc định
- **Spec:** README FR-05 và SEC-04 — từ khóa phải hiển thị an toàn, không render HTML, không dùng `innerHTML` trực tiếp.
- **Steps:**
  1. Mở trang chủ.
  2. Tìm `<script>`.
- **Expected:** Trang hiện đúng các ký tự `<script>` dạng chữ, không chạy script.
- **Actual:** Dòng kết quả chỉ còn "Kết quả tìm kiếm cho:" rồi trống. Thẻ script bị đưa vào HTML nên chữ biến mất. Script không chạy.
- **Screenshot:** `docs/bugs/BUG-06-actual.png`
- **GitHub issue:** https://github.com/Taylor3691/eshop-sut/issues/49
- **Issue page screenshot:** chưa chụp được vì repo private

## BUG-07 — Từ khóa chỉ gồm dấu cách vẫn trả cả danh sách

- **Feature:** FR-05
- **Test case:** TC-27
- **Severity:** Major
- **Environment:** Web `http://localhost:5173`, Chrome, seed 5 sản phẩm
- **Spec:** README FR-05 — tìm theo tên sản phẩm. Việc hiện mọi sản phẩm gắn với trang chủ khi không có từ khóa.
- **Steps:**
  1. Mở trang chủ.
  2. Nhập 3 dấu cách.
  3. Bấm Tìm.
- **Expected:** Không hiện đủ 5 sản phẩm.
- **Actual:** Trang vẫn hiện đủ 5 sản phẩm.
- **Screenshot:** `docs/bugs/BUG-07-actual.png`
- **GitHub issue:** https://github.com/Taylor3691/eshop-sut/issues/50
- **Issue page screenshot:** chưa chụp được vì repo private

## BUG-08 — Ký tự % và _ được coi là ký tự đại diện khi tìm

- **Feature:** FR-05
- **Test case:** TC-28, TC-29
- **Severity:** Major
- **Environment:** Web `http://localhost:5173`, API `http://localhost:3000`, Chrome, seed 5 sản phẩm
- **Spec:** README FR-05 — tìm theo tên sản phẩm. `%` và `_` không được định nghĩa là ký tự đại diện.
- **Steps:**
  1. Mở trang chủ.
  2. Tìm `%`.
  3. Tìm `_`.
- **Expected:** Không trả về mọi sản phẩm.
- **Actual:** Cả hai từ khóa đều trả đủ 5 sản phẩm.
- **Screenshot:** `docs/bugs/BUG-08-actual.png`
- **GitHub issue:** https://github.com/Taylor3691/eshop-sut/issues/51
- **Issue page screenshot:** chưa chụp được vì repo private

## BUG-09 — Dấu nháy đơn trong từ khóa gây lỗi SQL

- **Feature:** FR-05
- **Test case:** TC-30
- **Severity:** Major
- **Environment:** Web `http://localhost:5173`, API `http://localhost:3000`, Chrome, seed mặc định
- **Spec:** README FR-05, SEC-04 và SEC-05 — từ khóa hiển thị an toàn; truy vấn CSDL phải tham số hóa, không nối chuỗi.
- **Steps:**
  1. Mở trang chủ.
  2. Tìm `'`.
- **Expected:** Không có trang lỗi SQL. Dấu nháy hiện dạng chữ.
- **Actual:** Khối đỏ `Database Error` và `SQLITE_ERROR: unrecognized token: "'"`. Lỗi được render thành HTML. Dòng "Hiển thị 5 sản phẩm" vẫn còn.
- **Screenshot:** `docs/bugs/BUG-09-actual.png`
- **GitHub issue:** https://github.com/Taylor3691/eshop-sut/issues/52
- **Issue page screenshot:** chưa chụp được vì repo private
