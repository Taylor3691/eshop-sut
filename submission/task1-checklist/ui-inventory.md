# Thành phần giao diện Web Admin — 5 màn hình (Task 1)

- **SUT:** Web Admin EShop — http://localhost:5174
- **Phạm vi:** Admin Login, Dashboard, Quản lý Danh mục, Quản lý Sản phẩm (gồm Import CSV), Quản lý Mã giảm giá
- **Nguồn:** `README.md` (FR-12 → FR-17, FR-21 → FR-24); `2026.HW03.GUI Usability_En.md` mục 4 (IA-01 → IA-04); `frontend-admin/src/App.jsx`
- **Ngày lập:** 2026-11-12 (AI hỗ trợ, xem `submission/ai/ai-audit-log.md` mục #02)

**Nhóm IA** (đề chỉ nêu tên): IA-01 Chuẩn giao diện chung · IA-02 Form · IA-03 Điều hướng · IA-04 Phản hồi / trạng thái.

Cột "Ghi chú từ code" chỉ ghi những gì đọc được trong code, chưa chạy thử trên giao diện. Toàn bộ admin là một file, một URL. Sau khi đăng nhập có sidebar cố định và màn hình đổi theo `activeTab`, nên phần dùng chung được tách thành bảng 0.

---

## 0. Khung chung sau khi đăng nhập (sidebar), `App.jsx:222-273`

| # | Thành phần | Loại | Ghi chú từ code | FR | IA |
|---|---|---|---|---|---|
| 0.1 | Tiêu đề "EShop Admin" | `<h1>` | Là `<h1>` duy nhất và giống nhau ở mọi tab; tên màn hình nằm ở `<h2>` (L225) | FR-21 (1 h1 mô tả trang) | IA-01 |
| 0.2 | Menu: Dashboard / Danh mục / Sản phẩm / Mã Giảm Giá / Đơn hàng / Người dùng | `<li onClick>` | Không phải link hay button nên không Tab tới được và không bấm được bằng Enter. Tab đang chọn tô `text-blue-400` (L227-262). Cách viết hoa không đồng nhất ("Mã Giảm Giá" so với "Danh mục") | FR-21 (Tab order, ngôn ngữ), FR-23 (highlight) | IA-01, IA-03 |
| 0.3 | "Đăng xuất" | `<li>` màu đỏ | Nhãn đúng chữ "Đăng xuất". Bấm là xóa token ngay, không hỏi xác nhận (L263-271) | FR-23, FR-21 (màu đỏ) | IA-03 |
| 0.4 | Tải dữ liệu / hết phiên | logic | `fetchData` tải tuần tự 5 API. Không có trạng thái loading. Lỗi 401/403 thì quay về Login mà không báo gì; các lỗi khác bị nuốt im lặng (L41-59) | FR-12 | IA-04 |
| 0.5 | Breadcrumb | không có | Không có ở màn nào | FR-23 | IA-03 |

## 1. Admin Login, `App.jsx:188-215`

| # | Thành phần | Loại | Ghi chú từ code | FR | IA |
|---|---|---|---|---|---|
| 1.1 | Form đăng nhập | `<form>` | Submit thì gọi `handleLogin` | FR-12 | IA-02 |
| 1.2 | Tiêu đề "Admin Login" | `<h2>` | Màn này không có `<h1>`; tiêu đề bằng tiếng Anh (L195) | FR-21 | IA-01 |
| 1.3 | Ô Email | `<input>` | Không có `type` (thành `text`), không label, không `*`, không `required`; placeholder "Email" (L196-201) | FR-22 (`type="email"`, `*`) | IA-02 |
| 1.4 | Ô Mật khẩu | `<input type="password">` | Placeholder "Password" bằng tiếng Anh; không label, không `*` (L202-208) | FR-22, FR-21 | IA-01, IA-02 |
| 1.5 | Nút "Login" | button submit, xanh dương | Nhãn tiếng Anh. Không disable và không loading khi đang gửi (L209) | FR-21 (màu, ngôn ngữ) | IA-01, IA-02, IA-04 |
| 1.6 | "Bạn không phải là admin!" | `alert()` | Hiện khi tài khoản có role khác admin (L66) | FR-12 | IA-04 |
| 1.7 | "Đăng nhập thất bại" | `alert()` | Hiện thành popup của trình duyệt, không nằm trên nút submit, không nêu lý do hay tình trạng khóa (L72) | FR-22 (vị trí lỗi) | IA-04 |

## 2. Dashboard, `App.jsx:276-291`

| # | Thành phần | Loại | Ghi chú từ code | FR | IA |
|---|---|---|---|---|---|
| 2.1 | Tiêu đề "Dashboard" | `<h2>` | Tiếng Anh | FR-21 | IA-01 |
| 2.2 | Thẻ "Tổng doanh thu (Delivered)" | card: `<h3>` + số | Nhãn trộn Anh–Việt. Code tính `total_amount * 2` cho đơn delivered (L218). Hiển thị bằng `toLocaleString()` không truyền locale, nên dấu phân cách đổi theo trình duyệt; ký hiệu ₫ đặt sau số (L281-284) | FR-13, FR-21 (₫, phân cách) | IA-01 |
| 2.3 | Thẻ "Tổng số đơn hàng" | card | `orders.length`, đếm mọi trạng thái (L287-288) | FR-13 | IA-01 |
| 2.4 | Trạng thái tải/lỗi | không có | Khi đang tải hoặc tải lỗi đều hiện "0 ₫" và "0" | FR-13 | IA-04 |

## 3. Quản lý Danh mục, `App.jsx:294-335`

| # | Thành phần | Loại | Ghi chú từ code | FR | IA |
|---|---|---|---|---|---|
| 3.1 | Tiêu đề "Quản lý Danh mục" | `<h2>` | — | FR-21 | IA-01 |
| 3.2 | Ô "Tên danh mục mới" | `<input type="text">` | Chỉ có placeholder; không label, không `*`, không `required`, không giới hạn độ dài (L298-304) | FR-14 (bắt buộc), FR-22 | IA-02 |
| 3.3 | Nút "Thêm mới" | submit, xanh dương | (L305) | FR-14, FR-21 | IA-01, IA-02 |
| 3.4 | Thông báo khi thêm | `alert()` / không có | Thêm thành công thì không báo, chỉ xóa ô nhập và tải lại bảng. Lỗi hiện "Lỗi thêm DM: " + `err.message`, tức thông điệp tiếng Anh của axios và viết tắt "DM" (L149) | FR-22, FR-21 | IA-04, IA-01 |
| 3.5 | Bảng danh mục | `<table>`: ID / Tên Danh Mục / Hành động | ID hiển thị dạng `#id`. Không có empty state khi bảng trống (L309-333) | FR-14 (Xem), FR-24 | IA-01, IA-04 |
| 3.6 | Nút "Xóa" | button đỏ | Không có dialog xác nhận. Lỗi hiện "Lỗi xóa DM: …" (L323-328, L158) | FR-14, FR-21 (đỏ), FR-24 | IA-04 |

## 4. Quản lý Sản phẩm + Import CSV, `App.jsx:337-610`

| # | Thành phần | Loại | Ghi chú từ code | FR | IA |
|---|---|---|---|---|---|
| 4.1 | Tiêu đề "Quản lý Sản phẩm" | `<h2>` | — | FR-21 | IA-01 |
| **Import CSV** | | | | | |
| 4.2 | Tiêu đề "📂 Import sản phẩm từ CSV" | `<h3>` | — | FR-16 | IA-01 |
| 4.3 | Link "Tải file mẫu (template.csv)" | `<a download>` | File tải về tên `template_import.csv`, khác với nhãn. Header trong file mẫu đúng như FR-16 (L347-353) | FR-16 | IA-01, IA-04 |
| 4.4 | Chọn file | `<input type="file">` | Không có `accept=".csv"` nên chọn được mọi loại file; không label (L356-384) | FR-16 (đuôi .csv) | IA-02 |
| 4.5 | Bảng xem trước "Xem trước (n dòng)" | `<table>` | Tách cột bằng `split(",")`, nên trường có dấu phẩy bọc trong nháy kép bị tách sai. Header lấy luôn từ file (L367-377, L427-457) | FR-16 (RFC 4180) | IA-04 |
| 4.6 | Nút "Import N sản phẩm" | button xanh dương | Bị disable khi chưa có file, lúc đó nhãn là "Import 0 sản phẩm". Khi đang chạy đổi nhãn thành "Đang import...". Thiếu giá thì code tự điền 0, thiếu `category_id` tự điền 1; ngoài ra chấp nhận cả header khác tên (`ten`, `gia`…) (L385-424) | FR-16 | IA-02, IA-04 |
| 4.7 | Khung kết quả import | `<div>` đỏ hoặc xanh | Lỗi: "❌ {error}". Thành công: "✅ {message}" kèm danh sách lỗi. Số dòng thành công/lỗi phụ thuộc chuỗi backend trả về (L459-480) | FR-16 (báo cáo) | IA-04 |
| **Form Thêm/Sửa** | | | | | |
| 4.8 | Tiêu đề form "Thêm sản phẩm mới" / "Sửa sản phẩm" | `<h3>` động | Cho biết đang ở chế độ thêm hay sửa (L487-489) | FR-15 | IA-02, IA-04 |
| 4.9 | Ô "Tên sản phẩm" | `<input required>` | Không có `maxLength=255`, không label, không `*` (L491-499) | FR-15, FR-22 | IA-02 |
| 4.10 | Ô "Giá tiền" | `<input type="number">` | Không `required`, không `min` (L500-508) | FR-15 (bắt buộc, > 0), FR-22 | IA-02 |
| 4.11 | Ô "URL Ảnh" | `<input>` | (L509-516) | FR-15 | IA-02 |
| 4.12 | Ô "Mô tả" | `<textarea>` | (L517-527) | FR-15 | IA-02 |
| 4.13 | Chọn danh mục | `<select>` | Không label, không có lựa chọn "-- Chọn --". Mặc định `category_id: 1`, kể cả khi danh mục 1 không tồn tại (L528-543) | FR-15 (chọn từ danh sách) | IA-02 |
| 4.14 | Nút "Lưu sản phẩm" | submit, **xanh lá** | (L545) | FR-21 (màu) | IA-01 |
| 4.15 | Nút "Hủy sửa" | button xám dạng chữ | Chỉ hiện khi đang sửa (L548-565) | FR-21 | IA-02 |
| 4.16 | Thông báo lưu | `alert()` | Sửa thành công báo "Cập nhật thành công!"; thêm mới không báo gì. Lỗi hiện "Lỗi lưu sản phẩm: " + `err.message`. Sau khi sửa, code gán tên mới cho **mọi** sản phẩm trong state (L110-115, L129) | FR-15, FR-22 | IA-04 |
| **Bảng sản phẩm** | | | | | |
| 4.17 | Bảng: Ảnh / Tên SP / Giá / Hành động | `<table>` | Ảnh có `alt={p.name}` và ảnh dự phòng khi lỗi. Giá in thô `{p.price} ₫`, không phân cách hàng nghìn. Không có empty state (L567-608) | FR-15, FR-21 (₫), FR-24 (alt, empty) | IA-01, IA-04 |
| 4.18 | Nút "Sửa" | button vàng | Đổ dữ liệu lên form ở đầu trang nhưng không tự cuộn lên (L592-597) | FR-15 | IA-04 |
| 4.19 | Nút "Xóa" | button đỏ | Không có dialog xác nhận, không báo khi xóa xong (L598-603) | FR-15, FR-24 | IA-04 |

## 5. Quản lý Mã giảm giá, `App.jsx:612-775`

| # | Thành phần | Loại | Ghi chú từ code | FR | IA |
|---|---|---|---|---|---|
| 5.1 | Tiêu đề "Quản lý Mã Giảm Giá" + `<h3>` "Tạo mã giảm giá mới" | heading | — | FR-21 | IA-01 |
| 5.2 | Ô "Mã coupon (VD: SAVE10)" | `<input required>` | Tự chuyển sang chữ hoa khi gõ (L637-648) | FR-17 (code) | IA-02 |
| 5.3 | Chọn loại | `<select>` | Hai lựa chọn "Phần trăm (%)" và "Số tiền cố định (₫)" (L649-658) | FR-17 (type) | IA-02 |
| 5.4 | Ô giá trị giảm | `<input type="number" required>` | Placeholder đổi theo loại. Không có `min`, không giới hạn tối đa 100 khi chọn % (L659-675) | FR-17 (> 0) | IA-02 |
| 5.5 | Ô "Đơn tối thiểu (₫)" | `<input type="number">` | Mặc định 0, nên placeholder bị che và ô không có nhãn nào. Không `min` (L676-687) | FR-17 (≥ 0) | IA-02 |
| 5.6 | Ô "Ngày hết hạn" | `<input type="date" required>` | Placeholder không hiện với ô kiểu date nên ô không có nhãn (L688-697) | FR-17 | IA-02 |
| 5.7 | Ô "Số lần dùng tối đa/người" | `<input type="number" min="1">` | Mặc định 1, placeholder bị che. Không `required` (L698-710) | FR-17 (≥ 1) | IA-02 |
| 5.8 | Nút "Tạo mã" | submit, **cam** | (L712-714) | FR-21 (màu) | IA-01 |
| 5.9 | Thông báo tạo mã | `alert()` / không có | Thành công thì không báo. Lỗi hiện "Lỗi: …" (L630) | FR-22 | IA-04 |
| 5.10 | Bảng: Mã / Loại / Giá trị / Đơn tối thiểu / Hết hạn / Giới hạn/người / Hành động | `<table>` | Mã hết hạn hiện chữ đỏ "Hết hạn" thay cho ngày. Giá trị dùng `toLocaleString()` kèm ₫. Không có empty state (L716-773) | FR-17 (Xem), FR-21 | IA-01, IA-04 |
| 5.11 | Nút "Xóa" | button đỏ | Không có dialog xác nhận, không báo khi xóa xong (L754-768) | FR-17, FR-24 | IA-04 |

---

## Những điểm đặc tả không nói rõ

1. **`<h1>` trong SPA (FR-21):** Admin chỉ có một URL và chuyển màn bằng tab. Đặc tả không nói mỗi tab có tính là một "trang" hay không. Hiện `<h1>` "EShop Admin" giống nhau ở mọi tab và không mô tả nội dung từng màn; riêng màn Login không có `<h1>`.
2. **"Thuật ngữ kỹ thuật chuẩn" (FR-21)** không được định nghĩa, nên không rõ "Dashboard", "Login", "Import", "CSV", "Delivered", "Password" có được giữ tiếng Anh hay không.
3. **Màu nút (FR-21)** chỉ quy định xanh dương cho hành động tích cực và đỏ cho hành động nguy hiểm. Không có quy định cho nút phụ ("Hủy sửa"), nút sửa (vàng), nút "Lưu sản phẩm" (xanh lá) hay "Tạo mã" (cam). Không rõ "Lưu"/"Tạo" có bắt buộc phải xanh dương không.
4. **Dạng thông báo lỗi (FR-22):** Đặc tả chỉ yêu cầu lỗi nằm "trên nút submit", không nói `alert()` có chấp nhận được không. Cũng không có yêu cầu nào về thông báo thành công sau khi thêm, sửa hoặc xóa.
5. **Dấu `*` (FR-22)** phải đặt "bên cạnh nhãn", nhưng đặc tả không bắt form phải có nhãn. Form admin hiện chỉ dùng placeholder.
6. **Dialog xác nhận (FR-24)** chỉ được nêu cho việc xóa khỏi giỏ hàng. Việc xóa danh mục, sản phẩm, mã giảm giá và việc đăng xuất ở admin thì không được nhắc tới.
7. **Empty state (FR-24)** viết là "Trang trống". Không rõ quy định này có áp dụng cho bảng admin rỗng không.
8. **Loading** chỉ được yêu cầu ở trang chủ (FR-05). Không có yêu cầu cho Dashboard, các bảng admin hay nút đăng nhập.
9. **Điều hướng admin (FR-23):** Đặc tả nói "Navbar" mà không nói sidebar admin có tính là navbar không. Breadcrumb chỉ bắt buộc cho các trang con phía người dùng.
10. **Đăng nhập admin:** Đặc tả không nói khóa tài khoản sau 3 lần sai (FR-02) có áp dụng cho admin không, cũng không nói giao diện phải hiện gì khi tài khoản không phải admin hoặc khi hết phiên (FR-12).
11. **Dashboard (FR-13):** "Tổng số đơn hàng" có tính cả đơn đã hủy không? Định dạng ₫ cụ thể là gì: dấu phân cách "." hay ",", ký hiệu đặt trước hay sau số?
12. **Danh mục (FR-14):** Không quy định độ dài tối đa, có cho trùng tên không, có cắt khoảng trắng không, và xóa danh mục đang có sản phẩm thì xử lý thế nào.
13. **Sản phẩm (FR-15):** Mô tả và URL ảnh có bắt buộc không? Giá có giới hạn trên, có nhận số lẻ không? Đặc tả cũng không mô tả cách giao diện chuyển giữa chế độ thêm và sửa.
14. **Import CSV (FR-16):**
    - Không quy định kích thước file hay số dòng tối đa.
    - Không nói `category_id` có được kiểm tra không (danh sách validation chỉ có `name` và `price`).
    - Không nói có chấp nhận header khác tên hoặc khác chữ hoa/thường không, và file rỗng thì xử lý ra sao.
    - Không nói có bắt buộc bước xem trước không, và báo cáo kết quả phải trình bày theo định dạng nào.
15. **Mã giảm giá (FR-17):**
    - Loại percent có giới hạn tối đa 100 không? Mã có quy định định dạng, độ dài, chữ hoa không?
    - `expired_at` có phải là ngày trong tương lai không?
    - Mã hết hạn nên hiển thị thế nào trong bảng?
    - Các giá trị mặc định (0 và 1) có được tính là "đã nhập" cho trường bắt buộc không?

---

## Giải đáp các điểm không rõ (dùng làm oracle cho checklist)

Quyết định của người kiểm thử (2026-11-12) cho 15 điểm ở trên. BP = best practice được dùng làm căn cứ khi đặc tả không quy định.

1. **`<h1>` trong SPA (FR-21):** Mỗi tab tính là một trang. Mỗi màn hình, kể cả Login, phải có đúng một `<h1>` mô tả nội dung của màn đó. Nếu mọi tab dùng chung `<h1>` "EShop Admin" thì Fail.
2. **Thuật ngữ kỹ thuật (FR-21):**
   - Được giữ tiếng Anh: Dashboard, Admin, CSV, Import, URL, ID, Email.
   - Phải dịch: Login → Đăng nhập, Password → Mật khẩu, Delivered → Đã giao, và các thông báo lỗi kỹ thuật.
3. **Màu nút (FR-21, nới lỏng):**
   - Bắt buộc: nút nguy hiểm (Xóa, Đăng xuất) có màu đỏ, nút hành động chính không có màu đỏ.
   - Khuyến nghị: nút hành động chính nên màu xanh dương. Nút màu khác (ví dụ "Lưu sản phẩm" màu xanh lá, "Tạo mã" màu cam) vẫn Pass, chỉ ghi chú vào Notes.
4. **Dạng thông báo (FR-22, nới lỏng; BP: Nielsen #9):**
   - Bắt buộc: khi có lỗi phải hiện thông báo bằng tiếng Việt, nêu được lý do và người dùng hiểu được. Dùng `alert()` vẫn chấp nhận. Thông báo kỹ thuật như "Request failed with status code 400" thì Fail.
   - Khuyến nghị: thông báo lỗi nằm ngay trong form, phía trên nút submit.
   - Sau khi thêm, sửa hoặc xóa, chỉ cần người dùng thấy được kết quả (bảng cập nhật ngay) là Pass.
5. **Nhãn và dấu `*` (FR-22; BP: WCAG 3.3.2):** Mỗi trường phải có nhãn hiển thị, trường bắt buộc có `*` bên cạnh nhãn. Nếu chỉ có placeholder thì Fail.
6. **Dialog xác nhận (BP: Nielsen #5, mở rộng từ FR-24):** Mọi thao tác xóa ở admin (danh mục, sản phẩm, coupon) phải có dialog xác nhận. Đăng xuất thì không cần.
7. **Empty state (FR-24, mở rộng):** Áp dụng cho các bảng ở admin. Khi bảng rỗng phải hiện thông báo thân thiện, không để bảng trống trơn.
8. **Loading (BP: Nielsen #1):**
   - Dashboard và các bảng phải có trạng thái loading khi đang tải dữ liệu.
   - Nút submit phải bị khóa trong lúc đang gửi, để tránh bấm hai lần.
9. **Sidebar và breadcrumb (FR-23):** Sidebar được tính là navbar, nên phải highlight mục đang chọn. Breadcrumb không bắt buộc ở admin (N/A).
10. **Đăng nhập admin (FR-02, FR-12; BP):**
    - Khóa tài khoản sau 3 lần nhập sai giống FR-02, vì dùng chung API đăng nhập.
    - Thông báo lỗi viết chung chung, không để lộ lý do.
    - Tài khoản không phải admin phải thấy thông báo rõ ràng.
    - Khi hết phiên thì quay về màn Login, kèm thông báo.
11. **Dashboard (FR-13, FR-21):**
    - "Tổng số đơn hàng" đếm đơn ở mọi trạng thái.
    - Doanh thu chỉ tính các đơn đã giao (delivered).
    - Tiền hiển thị theo định dạng vi-VN `1.234.567 ₫` (dấu chấm phân cách, ký hiệu ₫ đứng sau) và thống nhất giữa các màn hình.
12. **Danh mục (FR-14; BP):**
    - Tên chỉ gồm khoảng trắng được tính là rỗng và bị từ chối. Tên tối đa 255 ký tự, không được trùng.
    - Xóa danh mục đang có sản phẩm phải bị chặn hoặc có cảnh báo.
    - Mọi trường hợp lỗi đều phải có thông báo hiện trên giao diện.
13. **Sản phẩm (FR-15; BP):**
    - Mô tả và URL ảnh không bắt buộc.
    - Giá là số nguyên lớn hơn 0, không nhận số lẻ (VND không có đơn vị lẻ).
    - Ở chế độ sửa, form phải thể hiện rõ đang sửa (đổi tiêu đề, có nút Hủy) và tự cuộn lên form.
14. **Import CSV (FR-16; BP):**
    - Chỉ cho chọn file `.csv`, chọn file khác phải báo lỗi. File rỗng cũng phải báo lỗi.
    - Header phải đúng tên cột, không phân biệt hoa thường.
    - Dòng có `category_id` không tồn tại được tính là dòng lỗi.
    - Bảng xem trước phải khớp với dữ liệu sẽ import, kể cả trường có dấu phẩy nằm trong nháy kép.
    - Báo cáo kết quả phải có số dòng thành công, số dòng lỗi và lý do lỗi của từng dòng.
    - Giới hạn kích thước file không kiểm thử (N/A).
15. **Mã giảm giá (FR-17; BP):**
    - Loại phần trăm phải không quá 100.
    - Mã chỉ gồm chữ hoa và số, không có khoảng trắng.
    - Ngày hết hạn phải là ngày trong tương lai. Mã đã hết hạn hiện nhãn "Hết hạn" là chấp nhận được.
    - Giá trị mặc định (0 và 1) được tính là đã nhập, nhưng các trường vẫn phải có nhãn và dấu `*`.

---

_Ngoài phạm vi:_ hai tab Đơn hàng và Người dùng có trên sidebar nhưng không được liệt kê.
