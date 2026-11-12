# GUI Checklist — Web Admin (BẢN NHÁP để review)

- **SUT:** Web Admin EShop — http://localhost:5174
- **Phạm vi:** Admin Login, Dashboard, Quản lý Danh mục, Quản lý Sản phẩm (gồm Import CSV), Quản lý Mã giảm giá
- **Nguồn:** `submission/task1-checklist/ui-inventory.md` (bảng thành phần + 15 giải đáp)
- **Trạng thái:** nháp do AI sinh (audit log #06–#08), chưa review, chưa chạy kiểm thử
- **Ngày:** 2026-11-12

**Cách đọc:**
- **Căn cứ:** mã FR trong `README.md`; **GĐ n** = giải đáp số n trong `ui-inventory.md`; **BP** = best practice (Nielsen, WCAG).
- **Inv.:** số mục trong bảng thành phần ở `ui-inventory.md`.

| Nhóm | Số mục |
|---|---|
| IA-01 General UI standards | 26 |
| IA-02 Forms | 41 |
| IA-03 Navigation | 15 |
| IA-04 Feedback / State | 27 |
| **Tổng** | **109** |

---

## IA-01: General UI standards

| ID | Màn hình | Tiêu chí cần đạt | Cách kiểm / điều kiện Pass | Căn cứ | Inv. |
|---|---|---|---|---|---|
| **Tiêu đề trang** | | | | | |
| GUI-01-01 | Login | Màn Login có đúng 1 `<h1>` mô tả việc đăng nhập quản trị | DevTools: `document.querySelectorAll('h1').length === 1`, nội dung nói rõ là đăng nhập (ví dụ "Đăng nhập quản trị") | FR-21, GĐ 1 | 1.2 |
| GUI-01-02 | Dashboard, Danh mục, Sản phẩm, Mã giảm giá | Mỗi tab có đúng 1 `<h1>` mô tả nội dung của tab đó | Mở lần lượt 4 tab, ở mỗi tab đếm được đúng 1 `<h1>`. Nội dung `<h1>` khác nhau giữa các tab và trùng với tên màn hình (không phải "EShop Admin" ở mọi tab) | FR-21, GĐ 1 | 0.1, 2.1, 3.1, 4.1, 5.1 |
| GUI-01-03 | Cả 5 màn | Cấp tiêu đề đi theo thứ tự, không nhảy cấp | Dùng extension HeadingsMap hoặc xem cây DOM: sau `<h1>` là `<h2>` rồi `<h3>`, không có `<h3>` nào đứng ngay sau `<h1>` | BP (WCAG 1.3.1) | 2.2, 4.2, 4.8, 5.1 |
| **Ngôn ngữ và thuật ngữ** | | | | | |
| GUI-01-04 | Login | Mọi chữ hiển thị trên màn Login là tiếng Việt, trừ các từ được phép giữ | Tiêu đề, placeholder và nút lần lượt là "Đăng nhập…", "Mật khẩu", "Đăng nhập". Chỉ "Email" và "Admin" được giữ tiếng Anh | FR-21, GĐ 2 | 1.2, 1.4, 1.5 |
| GUI-01-05 | Dashboard | Nhãn trên các thẻ số liệu là tiếng Việt | Thẻ doanh thu ghi "Đã giao" thay cho "Delivered". Chữ "Dashboard" được giữ | FR-21, GĐ 2 | 2.1, 2.2 |
| GUI-01-06 | Danh mục, Sản phẩm, Mã giảm giá | Nhãn, nút, cột bảng và placeholder là tiếng Việt | Rà toàn bộ chữ trên 3 màn: mọi từ tiếng Anh xuất hiện đều nằm trong danh sách được giữ (Dashboard, Admin, CSV, Import, URL, ID, Email) | FR-21, GĐ 2 | 3.x, 4.x, 5.x |
| GUI-01-07 | Cả 5 màn | Mọi thông báo lỗi viết bằng tiếng Việt, không chứa chuỗi kỹ thuật | Tạo lỗi ở từng form: đăng nhập sai, tên danh mục rỗng, giá âm, trùng mã coupon, xóa thất bại. Không có thông báo nào chứa chuỗi kiểu "Request failed with status code …" hoặc tên exception | FR-21, GĐ 2, GĐ 4 | 1.7, 3.4, 3.6, 4.16, 5.9 |
| GUI-01-08 | Danh mục, Sản phẩm | Nhãn và thông báo không dùng từ viết tắt khó hiểu | Không thấy các viết tắt như "DM", "SP" trong cột bảng hay thông báo; phải viết đủ "danh mục", "sản phẩm" | BP (Nielsen #2) | 3.4, 3.6, 4.17 |
| GUI-01-09 | Cả 5 màn | Cách viết hoa thống nhất (chỉ viết hoa chữ đầu) | Menu, tiêu đề màn và tiêu đề cột theo cùng một kiểu, ví dụ "Mã giảm giá", "Tên danh mục" chứ không phải "Mã Giảm Giá", "Tên Danh Mục" | BP (Nielsen #4) | 0.2, 3.5, 5.1 |
| GUI-01-10 | Sidebar + Mã giảm giá | Mỗi đối tượng chỉ được gọi bằng một tên | Tên mục menu trùng với tiêu đề màn tương ứng. Trên giao diện không lẫn "coupon" với "mã giảm giá" | BP (Nielsen #4) | 0.2, 5.1, 5.2 |
| GUI-01-11 | Sản phẩm (Import) | Tên trên nhãn link tải mẫu khớp với file tải về | Bấm "Tải file mẫu (…)": tên file nhận được trùng với tên ghi trong ngoặc trên nhãn | BP (Nielsen #4) | 4.3 |
| **Màu sắc** | | | | | |
| GUI-01-12 | Sidebar, Danh mục, Sản phẩm, Mã giảm giá | Nút nguy hiểm có màu đỏ | Đăng xuất và nút "Xóa" ở cả 3 bảng đều có màu đỏ | FR-21, GĐ 3 | 0.3, 3.6, 4.19, 5.11 |
| GUI-01-13 | Login, Danh mục, Sản phẩm, Mã giảm giá | Nút hành động chính không dùng màu đỏ (nên dùng xanh dương) | "Đăng nhập", "Thêm mới", "Import…", "Lưu sản phẩm", "Tạo mã" không có màu đỏ thì Pass. Nút nào không phải xanh dương thì ghi màu thực tế vào Notes | FR-21, GĐ 3 | 1.5, 3.3, 4.6, 4.14, 5.8 |
| GUI-01-14 | Danh mục, Sản phẩm, Mã giảm giá | Các nút cùng chức năng có cùng kiểu dáng ở mọi màn | Nút "Xóa" ở 3 bảng giống nhau về màu, cỡ chữ, padding và bo góc | BP (Nielsen #4) | 3.6, 4.19, 5.11 |
| GUI-01-15 | Sản phẩm, Mã giảm giá, Dashboard | Màu trạng thái mang nghĩa thống nhất | Đỏ chỉ dùng cho lỗi, nguy hiểm hoặc hết hạn; xanh lá cho thành công hoặc số dương. Không chỗ nào dùng ngược nghĩa | BP (Nielsen #4) | 2.2, 4.7, 5.10 |
| **Định dạng tiền và ngày** | | | | | |
| GUI-01-16 | Dashboard | Doanh thu hiển thị theo định dạng vi-VN | Có ít nhất 1 đơn đã giao, doanh thu hiện dạng `1.234.567 ₫` (dấu chấm phân cách hàng nghìn, ₫ đứng sau) | FR-21, GĐ 11 | 2.2 |
| GUI-01-17 | Sản phẩm | Cột Giá hiển thị theo định dạng vi-VN | Sản phẩm giá 1500000 hiện là `1.500.000 ₫` | FR-21, GĐ 11 | 4.17 |
| GUI-01-18 | Mã giảm giá | Số tiền trong bảng coupon theo định dạng vi-VN; coupon loại phần trăm hiện ký hiệu % | Cột "Giá trị" với loại cố định và cột "Đơn tối thiểu" hiện dạng `50.000 ₫`. Loại phần trăm hiện `10%` | FR-21, GĐ 11 | 5.10 |
| GUI-01-19 | Dashboard, Sản phẩm, Mã giảm giá | Định dạng tiền không đổi theo ngôn ngữ trình duyệt | Đặt ngôn ngữ trình duyệt là English (US) rồi tải lại trang: tiền vẫn hiện `1.234.567 ₫` ở cả 3 màn | FR-21, GĐ 11 | 2.2, 4.17, 5.10 |
| GUI-01-20 | Mã giảm giá | Ngày hiển thị theo một định dạng Việt Nam thống nhất | Cột "Hết hạn" hiện ngày dạng `dd/mm/yyyy` ở mọi dòng | BP (Nielsen #2, #4) | 5.10 |
| **Tab order và focus** | | | | | |
| GUI-01-21 | Login | Thứ tự Tab đi theo thứ tự hiển thị | Nhấn Tab từ đầu trang: Email → Mật khẩu → Đăng nhập | FR-21 | 1.3–1.5 |
| GUI-01-22 | Sidebar | Mọi mục menu và nút Đăng xuất đều tới được bằng bàn phím | Nhấn Tab đi qua lần lượt từng mục từ trên xuống dưới; nhấn Enter tại một mục thì chuyển sang màn đó | FR-21, BP (WCAG 2.1.1) | 0.2, 0.3 |
| GUI-01-23 | Sản phẩm | Thứ tự Tab đi theo bố cục trên xuống dưới, trái sang phải | Thứ tự: chọn file → Import → Tên → Giá → URL ảnh → Mô tả → Danh mục → Lưu sản phẩm (→ Hủy sửa nếu đang sửa) → các nút Sửa/Xóa trong bảng | FR-21 | 4.4–4.19 |
| GUI-01-24 | Mã giảm giá | Thứ tự Tab đi theo lưới 3 cột, từ trái sang phải | Thứ tự: Mã → Loại → Giá trị → Đơn tối thiểu → Ngày hết hạn → Số lần/người → Tạo mã → các nút Xóa | FR-21 | 5.2–5.11 |
| GUI-01-25 | Cả 5 màn | Phần tử đang được focus có viền nhìn thấy rõ | Khi Tab qua mỗi ô nhập, nút và mục menu đều thấy viền hoặc vùng tô focus | BP (WCAG 2.4.7) | toàn bộ |
| **Bố cục và hiển thị** | | | | | |
| GUI-01-26 | Danh mục, Sản phẩm, Mã giảm giá | Các bảng dữ liệu cùng một kiểu trình bày | Cả 3 bảng có header cùng màu nền và cỡ chữ, cột "Hành động" nằm cuối, cùng khoảng cách dòng | BP (Nielsen #4) | 3.5, 4.17, 5.10 |

---

## IA-02: Forms

| ID | Màn hình | Tiêu chí cần đạt | Dữ liệu thử / điều kiện Pass | Căn cứ | Inv. |
|---|---|---|---|---|---|
| **Chung cho mọi form** | | | | | |
| GUI-02-01 | Login, Danh mục, Sản phẩm, Mã giảm giá | Mỗi trường nhập có nhãn hiển thị cố định, không chỉ dựa vào placeholder | Mỗi trường có chữ nhãn đứng ngoài ô. Nhãn vẫn thấy được sau khi ô đã có dữ liệu, kể cả ô có giá trị mặc định (Đơn tối thiểu = 0, Số lần = 1) và ô ngày | FR-22, GĐ 5 | 1.3, 1.4, 3.2, 4.9–4.13, 5.2–5.7 |
| GUI-02-02 | Như trên | Trường bắt buộc có `*` cạnh nhãn, trường không bắt buộc thì không có | Có `*`: Email, Mật khẩu, Tên danh mục, Tên SP, Giá, Danh mục, cả 6 trường coupon. Không có `*`: Mô tả, URL ảnh | FR-22, GĐ 5, GĐ 13, GĐ 15 | như trên |
| GUI-02-03 | Như trên | Khi nhập sai, thông báo chỉ rõ trường nào lỗi và lý do | Ví dụ nhập Giá = 0 thì thấy thông báo kiểu "Giá phải lớn hơn 0", không phải "Lỗi" chung chung. Nếu có tô viền trường lỗi càng tốt | FR-22, GĐ 4, BP (Nielsen #9) | 3.4, 4.16, 5.9 |
| GUI-02-04 | Như trên | Thông báo lỗi đặt trong form, ngay phía trên nút submit | Lỗi nằm phía trên nút submit thì Pass. Nếu lỗi hiện bằng `alert()` vẫn Pass nhưng ghi Notes "dùng alert" | FR-22, GĐ 4 | 1.7, 3.4, 4.16, 5.9 |
| GUI-02-05 | Như trên | Khi form báo lỗi, dữ liệu đã nhập được giữ nguyên | Nhập đủ form, cố ý để 1 trường sai rồi gửi: các trường còn lại không bị xóa | BP (Nielsen #5) | 4.16, 5.9 |
| GUI-02-06 | Như trên | Nhấn Enter trong ô nhập một dòng thì gửi form | Đặt con trỏ ở ô cuối rồi nhấn Enter: form được gửi như khi bấm nút submit | BP | 1.1, 3.2, 4.9, 5.2 |
| GUI-02-07 | Danh mục, Sản phẩm, Mã giảm giá | Gửi thành công thì form trở về trạng thái ban đầu | Sau khi thêm thành công, các ô trống trở lại hoặc về giá trị mặc định; không còn dữ liệu cũ | BP | 3.4, 4.16, 5.9 |
| **Login** | | | | | |
| GUI-02-08 | Login | Ô Email dùng `type="email"` và kiểm tra định dạng | Kiểm tra DOM có `type="email"`. Nhập `abc` rồi gửi: trình duyệt chặn và báo sai định dạng | FR-22, FR-02 | 1.3 |
| GUI-02-09 | Login | Ô Mật khẩu che ký tự | Kiểm tra DOM có `type="password"`; ký tự gõ vào hiện thành dấu chấm | FR-22 | 1.4 |
| GUI-02-10 | Login | Để trống trường bắt buộc thì không gửi được | Để trống Email, hoặc trống Mật khẩu, rồi bấm Đăng nhập: form không gửi và báo trường cần nhập | FR-22, BP | 1.3–1.5 |
| GUI-02-11 | Login | Sai mật khẩu từ 3 lần liên tiếp thì tài khoản bị khóa 30 giây | Sai lần 3 thì thấy thông báo bị khóa. Đăng nhập đúng trong vòng 30 giây vẫn bị từ chối; sau 30 giây thì vào được | FR-02, GĐ 10 | 1.7 |
| GUI-02-12 | Login | Thông báo đăng nhập sai không lộ lý do cụ thể | Sai email và sai mật khẩu đều cho cùng một thông báo, ví dụ "Email hoặc mật khẩu không đúng" | FR-02, GĐ 10 | 1.7 |
| **Danh mục** | | | | | |
| GUI-02-13 | Danh mục | Tên danh mục để trống thì bị từ chối | Bấm "Thêm mới" khi ô trống: có thông báo lỗi và bảng không có dòng mới | FR-14 | 3.2, 3.4 |
| GUI-02-14 | Danh mục | Tên chỉ có khoảng trắng được coi là rỗng | Nhập `"   "`: bị từ chối như GUI-02-13 | GĐ 12 | 3.2 |
| GUI-02-15 | Danh mục | Tên tối đa 255 ký tự | Tên 255 ký tự thì thêm được. Tên 256 ký tự thì bị từ chối kèm thông báo, hoặc ô không cho gõ quá 255 | GĐ 12 | 3.2 |
| GUI-02-16 | Danh mục | Không cho tạo danh mục trùng tên | Thêm tên đã có trong bảng: bị từ chối và có thông báo trùng tên | GĐ 12 | 3.2, 3.4 |
| **Sản phẩm (thêm/sửa)** | | | | | |
| GUI-02-17 | Sản phẩm | Tên sản phẩm là bắt buộc | Để trống Tên: form không gửi và báo lỗi | FR-15 | 4.9 |
| GUI-02-18 | Sản phẩm | Tên tối đa 255 ký tự | 255 ký tự lưu được. 256 ký tự bị từ chối hoặc không gõ thêm được | FR-15 | 4.9 |
| GUI-02-19 | Sản phẩm | Giá là bắt buộc | Để trống Giá: form không gửi và báo lỗi | FR-15 | 4.10 |
| GUI-02-20 | Sản phẩm | Giá phải lớn hơn 0 | Giá `0` và `-1000` bị từ chối kèm thông báo. Giá `1` lưu được | FR-15 | 4.10 |
| GUI-02-21 | Sản phẩm | Giá phải là số nguyên | Giá `1000.5` bị từ chối kèm thông báo | GĐ 13 | 4.10 |
| GUI-02-22 | Sản phẩm | Ô Giá chỉ nhận số | Gõ `abc` thì ô không nhận. Gõ `1e5` thì bị từ chối hoặc báo lỗi | BP | 4.10 |
| GUI-02-23 | Sản phẩm | Danh mục bắt buộc chọn và có lựa chọn gợi ý ban đầu | Ở form thêm mới, ô chọn mặc định là "-- Chọn danh mục --". Gửi khi chưa chọn thì bị chặn và báo lỗi | FR-15 | 4.13 |
| GUI-02-24 | Sản phẩm | Danh sách danh mục khớp với dữ liệu thật | Các lựa chọn trùng với bảng Danh mục. Thêm hoặc xóa danh mục rồi quay lại thì danh sách đã cập nhật | FR-15 | 4.13, 3.5 |
| GUI-02-25 | Sản phẩm | Mô tả và URL ảnh không bắt buộc | Chỉ nhập Tên, Giá, Danh mục: lưu thành công | GĐ 13 | 4.11, 4.12 |
| GUI-02-26 | Sản phẩm | Chế độ sửa thể hiện rõ và đưa người dùng tới form | Bấm "Sửa" ở một dòng cuối bảng: trang tự cuộn lên form, tiêu đề đổi thành "Sửa sản phẩm", các ô điền đúng dữ liệu của dòng đó, có nút Hủy | GĐ 13 | 4.8, 4.15, 4.18 |
| GUI-02-27 | Sản phẩm | Nút "Hủy sửa" thoát chế độ sửa mà không lưu | Sửa vài ô rồi bấm Hủy: form trống lại, tiêu đề về "Thêm sản phẩm mới", sản phẩm trong bảng không đổi | BP (Nielsen #3) | 4.15 |
| GUI-02-28 | Sản phẩm | Lưu khi sửa chỉ thay đổi đúng sản phẩm đó | Đổi tên sản phẩm A rồi lưu: dòng A đổi tên, mọi dòng khác giữ nguyên, kể cả sau khi tải lại trang | FR-15 | 4.16 |
| **Import CSV** | | | | | |
| GUI-02-29 | Sản phẩm | Ô chọn file chỉ nhận `.csv` | Hộp chọn file chỉ lọc ra file `.csv`. Chọn `.txt` hoặc `.xlsx` thì báo lỗi và nút Import bị khóa | FR-16, GĐ 14 | 4.4, 4.6 |
| GUI-02-30 | Sản phẩm | File rỗng bị từ chối | Chọn file `.csv` 0 byte, hoặc chỉ có dòng header: có thông báo lỗi và không import gì | GĐ 14 | 4.4, 4.7 |
| GUI-02-31 | Sản phẩm | Header phải đúng tên cột, không phân biệt hoa thường | Header `NAME,PRICE,DESCRIPTION,IMAGEURL,CATEGORY_ID` được chấp nhận. Header thiếu cột hoặc sai tên (ví dụ `ten,gia,…`) bị báo lỗi và không import | FR-16, GĐ 14 | 4.6, 4.7 |
| GUI-02-32 | Sản phẩm | Dòng dữ liệu sai làm hủy toàn bộ lần import | File có 1 dòng sai (`name` rỗng, `price` ≤ 0 hoặc `category_id` không tồn tại) lẫn với các dòng đúng: báo lỗi đúng dòng đó, bảng sản phẩm không thêm dòng nào | FR-16, GĐ 14 | 4.6, 4.7 |
| **Mã giảm giá** | | | | | |
| GUI-02-33 | Mã giảm giá | Mã chỉ gồm chữ hoa và số, không có khoảng trắng | `SAVE20` hợp lệ. `SAVE 20`, `GIẢM10`, `SAVE-20` bị từ chối kèm thông báo | GĐ 15 | 5.2 |
| GUI-02-34 | Mã giảm giá | Không cho tạo mã trùng | Tạo lại `SAVE10`: bị từ chối, thông báo là mã đã tồn tại | FR-17 | 5.2, 5.9 |
| GUI-02-35 | Mã giảm giá | Giá trị giảm phải lớn hơn 0 | `0` và `-5` bị từ chối. `1` được chấp nhận | FR-17 | 5.4 |
| GUI-02-36 | Mã giảm giá | Loại phần trăm không vượt quá 100 | Với loại %, giá trị `101` bị từ chối, `100` được chấp nhận | GĐ 15 | 5.3, 5.4 |
| GUI-02-37 | Mã giảm giá | Đơn tối thiểu không được âm | `-1` bị từ chối. `0` được chấp nhận | FR-17 | 5.5 |
| GUI-02-38 | Mã giảm giá | Số lần dùng mỗi người là số nguyên ≥ 1 | `0` và `1.5` bị từ chối. `1` được chấp nhận | FR-17, BP | 5.7 |
| GUI-02-39 | Mã giảm giá | Ngày hết hạn là bắt buộc | Để trống ngày: form không gửi và báo lỗi | FR-17 | 5.6 |
| GUI-02-40 | Mã giảm giá | Ngày hết hạn phải sau hôm nay | Chọn hôm qua hoặc hôm nay thì bị từ chối. Chọn ngày mai thì được chấp nhận | GĐ 15 | 5.6 |
| GUI-02-41 | Mã giảm giá | Đổi loại mã thì gợi ý của ô giá trị đổi theo | Chọn "Phần trăm" thì nhãn hoặc gợi ý nói về %. Chọn "Số tiền cố định" thì nói về ₫ | BP (Nielsen #2) | 5.3, 5.4 |

---

## IA-03: Navigation

| ID | Màn hình | Tiêu chí cần đạt | Cách kiểm / điều kiện Pass | Căn cứ | Inv. |
|---|---|---|---|---|---|
| GUI-03-01 | Sidebar | Sidebar làm nổi bật mục đang mở | Bấm lần lượt Dashboard, Danh mục, Sản phẩm, Mã giảm giá: mỗi lúc chỉ đúng mục đang mở được làm nổi bật, và phần nổi bật chuyển theo khi bấm mục khác | FR-23, GĐ 9 | 0.2 |
| GUI-03-02 | Sidebar | Mục đang mở nhận ra được mà không cần phân biệt màu | Xem ở chế độ grayscale (DevTools → Rendering → Emulate vision deficiency: achromatopsia): vẫn phân biệt được mục đang mở nhờ nền, chữ đậm hoặc vạch chỉ báo | BP (WCAG 1.4.1) | 0.2 |
| GUI-03-03 | Sidebar | Mục menu cho thấy có thể bấm được | Rê chuột lên mục menu thì con trỏ thành bàn tay và mục đổi màu | BP (Nielsen #6) | 0.2, 0.3 |
| GUI-03-04 | Sidebar | Menu dùng thẻ điều hướng đúng ngữ nghĩa | DOM: menu nằm trong `<nav>`, mỗi mục là `<a>` hoặc `<button>`, không phải `<li onClick>`. Trình đọc màn hình đọc được là liên kết hoặc nút | BP (WCAG 4.1.2) | 0.2 |
| GUI-03-05 | Dashboard, Danh mục, Sản phẩm, Mã giảm giá | Sidebar giữ nguyên ở mọi màn | Chuyển qua 4 màn: sidebar có cùng vị trí, cùng thứ tự mục và cùng cách hiển thị | BP (Nielsen #4) | 0.2 |
| GUI-03-06 | Login → Dashboard | Đăng nhập xong thì vào thẳng Dashboard | Đăng nhập thành công: màn Dashboard hiện ra và mục Dashboard đang được làm nổi bật | BP | 0.2, 2.1 |
| GUI-03-07 | Sidebar | Nút đăng xuất ghi đúng chữ "Đăng xuất" | Nhãn là "Đăng xuất", không phải "Thoát" hay "Logout" | FR-23 | 0.3 |
| GUI-03-08 | Sidebar → Login | Đăng xuất đưa về màn Login và không quay lại được admin bằng nút Back | Bấm Đăng xuất thì về màn Login. Bấm Back của trình duyệt vẫn ở Login, không hiện dữ liệu admin | FR-12, BP | 0.3 |
| GUI-03-09 | Login | Sau khi đăng xuất, tải lại trang vẫn ở màn Login | Đăng xuất rồi nhấn F5: vẫn ở màn Login | FR-12 | 0.3 |
| GUI-03-10 | Mọi màn admin | Chưa đăng nhập thì không vào được màn admin | Mở `localhost:5174` trong cửa sổ ẩn danh, hoặc mở trực tiếp URL của một tab: chỉ thấy màn Login | FR-12 | 0.4 |
| GUI-03-11 | Dashboard, Danh mục, Sản phẩm, Mã giảm giá | Mỗi tab có URL riêng và tải lại vẫn ở đúng tab | Ở tab Sản phẩm, URL có phần riêng của tab (ví dụ `/products`). Nhấn F5 thì vẫn ở tab Sản phẩm, không bị đưa về Dashboard | GĐ 1, BP (Nielsen #3) | 0.2 |
| GUI-03-12 | Dashboard, Danh mục, Sản phẩm, Mã giảm giá | Nút Back/Forward của trình duyệt đi qua lại giữa các tab | Mở lần lượt Danh mục → Sản phẩm rồi bấm Back: quay về Danh mục, phần nổi bật trên sidebar cũng đổi theo | BP (Nielsen #3) | 0.2 |
| GUI-03-13 | Danh mục, Sản phẩm, Mã giảm giá | Chuyển tab khi form đang nhập dở không làm mất dữ liệu mà không báo trước | Nhập dở form Sản phẩm, chuyển sang tab khác rồi quay lại: dữ liệu còn nguyên, hoặc có hộp thoại cảnh báo trước khi rời tab | BP (Nielsen #5) | 4.8–4.13 |
| GUI-03-14 | Sidebar | Sidebar luôn dùng được khi trang dài | Ở độ phân giải 1366×768, cuộn bảng sản phẩm dài: sidebar đứng yên và nút "Đăng xuất" vẫn thấy được mà không phải cuộn sidebar | BP | 0.2, 0.3 |
| GUI-03-15 | Mọi màn admin | Breadcrumb | Không bắt buộc ở admin, đánh N/A | FR-23, GĐ 9 | 0.5 |

---

## IA-04: Feedback / State

| ID | Màn hình | Tiêu chí cần đạt | Cách kiểm / điều kiện Pass | Căn cứ | Inv. |
|---|---|---|---|---|---|
| **Đang tải và đang gửi** | | | | | |
| GUI-04-01 | Dashboard | Có trạng thái loading khi đang tải số liệu | Đặt DevTools → Network → Slow 3G rồi tải lại: thấy spinner hoặc skeleton. Không hiện "0 ₫" / "0" trước khi có dữ liệu thật | GĐ 8, BP (Nielsen #1) | 2.4, 0.4 |
| GUI-04-02 | Danh mục, Sản phẩm, Mã giảm giá | Bảng có trạng thái loading khi đang tải | Vẫn để Slow 3G, mở từng tab: thấy chỉ báo đang tải thay vì bảng trống | GĐ 8 | 0.4, 3.5, 4.17, 5.10 |
| GUI-04-03 | Login, Danh mục, Sản phẩm, Mã giảm giá | Nút submit bị khóa trong lúc đang gửi | Để Slow 3G, bấm nhanh 2 lần vào "Đăng nhập", "Thêm mới", "Lưu sản phẩm", "Tạo mã": nút bị khóa ngay lần đầu và chỉ tạo ra 1 bản ghi | GĐ 8 | 1.5, 3.3, 4.14, 5.8 |
| GUI-04-04 | Sản phẩm (Import) | Nút Import thể hiện đúng trạng thái | Chưa chọn file: nút bị khóa và nhãn không gây hiểu lầm (không ghi "Import 0 sản phẩm"). Đang chạy: nhãn đổi thành "Đang import..." và nút bị khóa | GĐ 8, BP | 4.6 |
| **Kết quả sau khi thao tác** | | | | | |
| GUI-04-05 | Danh mục | Thêm danh mục xong thì thấy kết quả ngay | Dòng mới xuất hiện trong bảng mà không cần tải lại trang | GĐ 4 | 3.4, 3.5 |
| GUI-04-06 | Sản phẩm | Thêm hoặc sửa sản phẩm xong thì thấy kết quả ngay | Thêm: có dòng mới. Sửa: dòng đó cập nhật đúng dữ liệu. Không cần tải lại | GĐ 4 | 4.16, 4.17 |
| GUI-04-07 | Mã giảm giá | Tạo mã xong thì thấy kết quả ngay | Mã mới xuất hiện trong bảng với đúng các giá trị vừa nhập | GĐ 4 | 5.9, 5.10 |
| GUI-04-08 | Danh mục, Sản phẩm, Mã giảm giá | Xóa xong thì dòng biến mất ngay | Xác nhận xóa: dòng đó biến mất khỏi bảng mà không cần tải lại | GĐ 4 | 3.6, 4.19, 5.11 |
| **Xác nhận trước khi xóa** | | | | | |
| GUI-04-09 | Danh mục | Có hộp thoại xác nhận trước khi xóa danh mục | Bấm Xóa thì hộp thoại hiện ra. Chọn Hủy: bảng giữ nguyên. Chọn đồng ý: dòng bị xóa | GĐ 6 | 3.6 |
| GUI-04-10 | Sản phẩm | Có hộp thoại xác nhận trước khi xóa sản phẩm | Như GUI-04-09 | GĐ 6 | 4.19 |
| GUI-04-11 | Mã giảm giá | Có hộp thoại xác nhận trước khi xóa mã | Như GUI-04-09 | GĐ 6 | 5.11 |
| GUI-04-12 | Danh mục, Sản phẩm, Mã giảm giá | Hộp thoại nêu rõ đối tượng sắp bị xóa | Nội dung có tên đối tượng, ví dụ "Xóa danh mục 'Điện thoại'?", và hai nút ghi rõ hành động | BP (Nielsen #5) | 3.6, 4.19, 5.11 |
| GUI-04-13 | Danh mục | Xóa danh mục đang có sản phẩm thì bị chặn hoặc được cảnh báo | Xóa một danh mục có sản phẩm: thao tác bị chặn kèm thông báo, hoặc có cảnh báo nói rõ ảnh hưởng tới các sản phẩm đó | GĐ 12 | 3.6 |
| **Trạng thái trống** | | | | | |
| GUI-04-14 | Danh mục, Sản phẩm, Mã giảm giá | Bảng rỗng có thông báo thân thiện | Xóa hết dòng, hoặc dùng DB rỗng: bảng hiện icon/hình minh họa và câu thông báo kiểu "Chưa có danh mục nào", không để trống trơn chỉ còn header | FR-24, GĐ 7 | 3.5, 4.17, 5.10 |
| GUI-04-15 | Dashboard | Khi chưa có dữ liệu, số liệu vẫn hiển thị rõ ràng | Chưa có đơn đã giao: doanh thu hiện `0 ₫`, không hiện trống, `NaN` hay `undefined` | BP | 2.2, 2.3 |
| **Thông báo lỗi và phiên đăng nhập** | | | | | |
| GUI-04-16 | Mọi màn | Lỗi kết nối tới server được báo cho người dùng | Dừng backend rồi tải lại hoặc thử thêm dữ liệu: có thông báo tiếng Việt dễ hiểu. Không có trang trắng, không im lặng | GĐ 4, GĐ 12 | 0.4, 3.4, 4.16, 5.9 |
| GUI-04-17 | Login | Tài khoản không phải admin nhận được thông báo rõ ràng | Đăng nhập bằng `test@eshop.com`: thông báo nói rõ tài khoản không có quyền quản trị, và vẫn ở màn Login | FR-12, GĐ 10 | 1.6 |
| GUI-04-18 | Mọi màn admin | Hết phiên thì về Login và có thông báo | Đang ở admin, xóa hoặc sửa `adminToken` trong localStorage rồi thao tác: quay về Login và thấy thông báo kiểu "Phiên đăng nhập đã hết hạn" | GĐ 10 | 0.4 |
| **Import CSV** | | | | | |
| GUI-04-19 | Sản phẩm | Bảng xem trước khớp với nội dung file | Dùng file có trường `"Áo, size L"`: bảng xem trước hiện đúng giá trị đó trong một ô và số cột khớp với header | FR-16, GĐ 14 | 4.5 |
| GUI-04-20 | Sản phẩm | Xem trước cho biết số dòng và các cột | Dòng "Xem trước (n dòng)" ghi đúng số dòng dữ liệu, không tính header. Tên cột hiển thị đúng | FR-16 | 4.5 |
| GUI-04-21 | Sản phẩm | Báo cáo import đủ thông tin | Sau khi import, báo cáo có số dòng thành công, số dòng lỗi, và với mỗi dòng lỗi có số thứ tự dòng kèm lý do | FR-16, GĐ 14 | 4.7 |
| GUI-04-22 | Sản phẩm | Trạng thái import được làm mới đúng lúc | Import thành công thì bảng sản phẩm cập nhật ngay. Chọn file mới thì kết quả cũ biến mất và xem trước hiện theo file mới | BP | 4.5, 4.7 |
| **Ảnh** | | | | | |
| GUI-04-23 | Sản phẩm | Mọi ảnh sản phẩm có `alt` mô tả | DOM: mọi `<img>` trong bảng có `alt` khác rỗng và mô tả sản phẩm | FR-24 | 4.17 |
| GUI-04-24 | Sản phẩm | Ảnh lỗi được thay bằng ảnh dự phòng | Lưu sản phẩm có URL ảnh sai: bảng hiện ảnh thay thế, không hiện biểu tượng ảnh vỡ | BP | 4.17 |
| **Trạng thái dữ liệu** | | | | | |
| GUI-04-25 | Mã giảm giá | Mã đã hết hạn được phân biệt rõ | Mã `EXPIRED` hiện nhãn "Hết hạn" bằng cả chữ lẫn màu, khác với mã còn hạn | GĐ 15 | 5.10 |
| GUI-04-26 | Dashboard | Doanh thu chỉ tính đơn đã giao | Đối chiếu với tab Đơn hàng: doanh thu bằng đúng tổng tiền của các đơn "Đã giao". Đổi một đơn sang "Đã giao" thì doanh thu tăng đúng bằng tiền đơn đó | FR-13, GĐ 11 | 2.2 |
| GUI-04-27 | Dashboard | Tổng số đơn đếm mọi trạng thái | Con số trên Dashboard bằng tổng số dòng ở tab Đơn hàng | FR-13, GĐ 11 | 2.3 |

---

## Ghi chú cho người review

- **Không lập mục:** Step Indicator (FR-22) là N/A vì không có form admin nào từ 2 bước trở lên. Breadcrumb được giữ thành mục GUI-03-15 và đánh N/A.
- **Mục gộp nhiều form/màn:** GUI-02-01 và GUI-02-02 gộp cả 4 form. Nếu cần kết quả Pass/Fail theo từng màn thì tách mỗi mục thành 4 dòng.
- **Mục chỉ dựa trên BP**, không có giải đáp riêng: GUI-01-20 (định dạng ngày `dd/mm/yyyy`). Nhóm có thể bỏ nếu không muốn kiểm.
- **Mục cần tab ngoài phạm vi:** GUI-04-26 và 04-27 dùng tab Đơn hàng để đối chiếu số liệu. `scripts/seed-hw03.sh` tạo sẵn đơn hàng.
- **Mục cần chuẩn bị môi trường:**
  - GUI-04-14 cần DB rỗng.
  - GUI-04-16 cần dừng backend.
  - Backend reset database mỗi lần khởi động, nên làm các mục này cuối buổi rồi khởi động lại.
- **Mục cần mạng chậm:** GUI-04-01/02/03 nên kiểm với DevTools → Network → Slow 3G.
- **Dùng lại cho Task 3:** GUI-01-19 kiểm định dạng tiền khi đổi ngôn ngữ trình duyệt, áp dụng được khi kiểm đa trình duyệt.
