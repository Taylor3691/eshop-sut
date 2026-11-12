# GUI Checklist — Web Admin (bản đã lọc)

- **SUT:** Web Admin EShop — http://localhost:5174
- **Phạm vi:** Admin Login, Dashboard, Quản lý Danh mục, Quản lý Sản phẩm (gồm Import CSV), Quản lý Mã giảm giá
- **Nguồn:** lọc từ `checklist-draft.md` (109 mục AI sinh) → 58 mục. Cột **ID cũ** truy vết về bản nháp.
- **Căn cứ:** mã FR trong `README.md`; **GĐ n** = giải đáp số n trong `ui-inventory.md`; **BP** = best practice (Nielsen, WCAG).

| Nhóm | Số mục |
|---|---|
| IA-01 General UI standards | 14 |
| IA-02 Forms | 22 |
| IA-03 Navigation | 7 |
| IA-04 Feedback / State | 15 |
| **Tổng** | **58** |

---

## IA-01: General UI standards

| ID | Màn hình | Tiêu chí cần đạt | Cách kiểm / điều kiện Pass | Căn cứ | ID cũ |
|---|---|---|---|---|---|
| GUI-01-01 | Cả 5 màn | Mỗi màn có đúng 1 `<h1>` mô tả nội dung màn đó | DevTools: mỗi màn đếm được đúng 1 `<h1>`; nội dung khác nhau giữa các màn và trùng tên màn (Login có `<h1>` riêng, không dùng chung "EShop Admin") | FR-21, GĐ 1 | 01-01, 01-02 |
| GUI-01-02 | Login | Chữ hiển thị là tiếng Việt, trừ từ được phép giữ | Tiêu đề, placeholder, nút là "Đăng nhập…", "Mật khẩu", "Đăng nhập". Chỉ "Email", "Admin" được giữ tiếng Anh | FR-21, GĐ 2 | 01-04 |
| GUI-01-03 | Dashboard, Danh mục, Sản phẩm, Mã giảm giá | Nhãn, nút, cột bảng, placeholder là tiếng Việt | Mọi từ tiếng Anh xuất hiện đều thuộc danh sách được giữ (Dashboard, Admin, CSV, Import, URL, ID, Email). Thẻ doanh thu ghi "Đã giao" thay cho "Delivered" | FR-21, GĐ 2 | 01-05, 01-06 |
| GUI-01-04 | Cả 5 màn | Thông báo lỗi bằng tiếng Việt, không chứa chuỗi kỹ thuật hay viết tắt | Tạo lỗi ở từng form: không thông báo nào chứa "Request failed with status code…", tên exception, hay viết tắt như "DM" | FR-21, GĐ 2, GĐ 4 | 01-07, 01-08 |
| GUI-01-05 | Cả 5 màn | Cách viết hoa thống nhất | Menu, tiêu đề màn, tiêu đề cột cùng kiểu chỉ viết hoa chữ đầu ("Mã giảm giá", không phải "Mã Giảm Giá") | BP (Nielsen #4) | 01-09 |
| GUI-01-06 | Sidebar, Danh mục, Sản phẩm, Mã giảm giá | Nút nguy hiểm có màu đỏ | "Đăng xuất" và nút "Xóa" ở cả 3 bảng đều màu đỏ | FR-21, GĐ 3 | 01-12 |
| GUI-01-07 | Login, Danh mục, Sản phẩm, Mã giảm giá | Nút hành động chính không dùng màu đỏ | "Đăng nhập", "Thêm mới", "Import…", "Lưu sản phẩm", "Tạo mã" không đỏ thì Pass; nút không phải xanh dương thì ghi màu vào Notes | FR-21, GĐ 3 | 01-13 |
| GUI-01-08 | Danh mục, Sản phẩm, Mã giảm giá | Nút và bảng cùng chức năng có cùng kiểu trình bày | Nút "Xóa" ở 3 bảng giống nhau (màu, cỡ, bo góc); 3 bảng cùng kiểu header, cột "Hành động" ở cuối | BP (Nielsen #4) | 01-14, 01-26 |
| GUI-01-09 | Sản phẩm | Cột Giá theo định dạng vi-VN | Giá 1500000 hiện `1.500.000 ₫` | FR-21, GĐ 11 | 01-17 |
| GUI-01-10 | Dashboard, Mã giảm giá | Số tiền theo định dạng vi-VN, không đổi theo ngôn ngữ trình duyệt | Doanh thu, "Giá trị" (loại cố định), "Đơn tối thiểu" hiện dạng `50.000 ₫`; loại % hiện `10%`. Đổi ngôn ngữ trình duyệt sang English (US) rồi tải lại: định dạng không đổi | FR-21, GĐ 11 | 01-16, 01-18, 01-19 |
| GUI-01-11 | Login | Thứ tự Tab theo thứ tự hiển thị | Tab từ đầu trang: Email → Mật khẩu → Đăng nhập | FR-21 | 01-21 |
| GUI-01-12 | Sản phẩm, Mã giảm giá | Thứ tự Tab trong form theo bố cục trên→dưới, trái→phải | Sản phẩm: Tên → Giá → URL ảnh → Mô tả → Danh mục → Lưu. Mã giảm giá: Mã → Loại → Giá trị → Đơn tối thiểu → Ngày hết hạn → Số lần/người → Tạo mã | FR-21 | 01-23, 01-24 |
| GUI-01-13 | Sidebar | Mục menu và Đăng xuất dùng được bằng bàn phím | Tab đi qua từng mục từ trên xuống; Enter tại một mục thì chuyển sang màn đó | FR-21, BP (WCAG 2.1.1) | 01-22 |
| GUI-01-14 | Cả 5 màn | Phần tử đang focus có viền nhìn thấy rõ | Tab qua ô nhập, nút, mục menu: đều thấy viền/vùng tô focus | BP (WCAG 2.4.7) | 01-25 |

---

## IA-02: Forms

| ID | Màn hình | Tiêu chí cần đạt | Dữ liệu thử / điều kiện Pass | Căn cứ | ID cũ |
|---|---|---|---|---|---|
| **Chung** | | | | | |
| GUI-02-01 | Login, Danh mục, Sản phẩm, Mã giảm giá | Mỗi trường có nhãn hiển thị cố định, không chỉ dựa vào placeholder | Nhãn đứng ngoài ô, vẫn thấy khi ô đã có dữ liệu (kể cả ô có giá trị mặc định và ô ngày) | FR-22, GĐ 5 | 02-01 |
| GUI-02-02 | Như trên | Trường bắt buộc có `*` cạnh nhãn, trường không bắt buộc thì không | Có `*`: Email, Mật khẩu, Tên danh mục, Tên SP, Giá, Danh mục, 6 trường coupon. Không `*`: Mô tả, URL ảnh | FR-22, GĐ 5, 13, 15 | 02-02 |
| GUI-02-03 | Như trên | Thông báo lỗi chỉ rõ trường nào lỗi và lý do | Ví dụ Giá = 0 → "Giá phải lớn hơn 0", không phải "Lỗi" chung chung | FR-22, GĐ 4, BP (Nielsen #9) | 02-03 |
| GUI-02-04 | Như trên | Thông báo lỗi đặt trong form, phía trên nút submit | Trên nút submit thì Pass; dùng `alert()` vẫn Pass, ghi Notes "dùng alert" | FR-22, GĐ 4 | 02-04 |
| GUI-02-05 | Danh mục, Sản phẩm, Mã giảm giá | Form báo lỗi thì giữ nguyên dữ liệu đã nhập | Nhập đủ, để 1 trường sai rồi gửi: các trường còn lại không bị xóa | BP (Nielsen #5) | 02-05 |
| **Login** | | | | | |
| GUI-02-06 | Login | Ô Email dùng `type="email"` và kiểm tra định dạng | DOM có `type="email"`; nhập `abc` rồi gửi thì trình duyệt chặn | FR-22, FR-02 | 02-08 |
| GUI-02-07 | Login | Ô Mật khẩu che ký tự | DOM có `type="password"`; ký tự gõ vào hiện dấu chấm | FR-22 | 02-09 |
| GUI-02-08 | Login | Để trống trường bắt buộc thì không gửi được | Trống Email hoặc Mật khẩu rồi bấm Đăng nhập: không gửi, báo trường cần nhập | FR-22 | 02-10 |
| GUI-02-09 | Login | Thông báo đăng nhập sai không lộ lý do cụ thể | Sai email và sai mật khẩu cho cùng một thông báo, ví dụ "Email hoặc mật khẩu không đúng" | FR-02, GĐ 10 | 02-12 |
| **Danh mục** | | | | | |
| GUI-02-10 | Danh mục | Tên trống hoặc chỉ có khoảng trắng bị từ chối | Ô trống, rồi `"   "`: có thông báo lỗi, bảng không có dòng mới | FR-14, GĐ 12 | 02-13, 02-14 |
| **Sản phẩm** | | | | | |
| GUI-02-11 | Sản phẩm | Tên và Giá là bắt buộc | Để trống Tên, rồi để trống Giá: form không gửi, báo lỗi | FR-15 | 02-17, 02-19 |
| GUI-02-12 | Sản phẩm | Tên tối đa 255 ký tự | 255 ký tự lưu được; 256 bị từ chối hoặc không gõ thêm được | FR-15 | 02-18 |
| GUI-02-13 | Sản phẩm | Giá là số nguyên lớn hơn 0 | `0`, `-1000`, `1000.5` bị từ chối kèm thông báo; `1` lưu được | FR-15, GĐ 13 | 02-20, 02-21 |
| GUI-02-14 | Sản phẩm | Danh mục bắt buộc chọn, có lựa chọn gợi ý ban đầu | Form thêm mới mặc định "-- Chọn danh mục --"; gửi khi chưa chọn thì bị chặn | FR-15 | 02-23 |
| GUI-02-15 | Sản phẩm | Chế độ sửa thể hiện rõ và đưa người dùng tới form | Bấm "Sửa" ở dòng cuối bảng: tự cuộn lên form, tiêu đề "Sửa sản phẩm", ô điền đúng dữ liệu, có nút Hủy | GĐ 13 | 02-26 |
| GUI-02-16 | Sản phẩm | "Hủy sửa" thoát chế độ sửa mà không lưu | Sửa vài ô rồi Hủy: form trống, tiêu đề về "Thêm sản phẩm mới", bảng không đổi | BP (Nielsen #3) | 02-27 |
| **Import CSV** | | | | | |
| GUI-02-17 | Sản phẩm | Ô chọn file chỉ nhận `.csv` | Hộp chọn file lọc `.csv`; chọn `.txt`/`.xlsx` thì báo lỗi, nút Import bị khóa (dùng `06-wrong-extension.txt`) | FR-16, GĐ 14 | 02-29 |
| GUI-02-18 | Sản phẩm | File rỗng hoặc sai header bị báo lỗi | File 0 byte, file chỉ có header, file header sai (`05-wrong-header.csv`): có thông báo lỗi, không import | FR-16, GĐ 14 | 02-30, 02-31 |
| **Mã giảm giá** | | | | | |
| GUI-02-19 | Mã giảm giá | Mã chỉ gồm chữ hoa và số, không khoảng trắng | `SAVE20` hợp lệ; `SAVE 20`, `GIẢM10`, `SAVE-20` bị từ chối kèm thông báo | GĐ 15 | 02-33 |
| GUI-02-20 | Mã giảm giá | Giá trị giảm > 0; loại % không vượt 100 | `0`, `-5` bị từ chối; với loại %, `101` bị từ chối, `100` được chấp nhận | FR-17, GĐ 15 | 02-35, 02-36 |
| GUI-02-21 | Mã giảm giá | Đơn tối thiểu ≥ 0; số lần dùng/người là số nguyên ≥ 1 | Đơn tối thiểu `-1` bị từ chối, `0` được. Số lần `0`, `1.5` bị từ chối, `1` được | FR-17 | 02-37, 02-38 |
| GUI-02-22 | Mã giảm giá | Ngày hết hạn bắt buộc và phải sau hôm nay | Trống, hôm qua, hôm nay bị từ chối; ngày mai được chấp nhận | FR-17, GĐ 15 | 02-39, 02-40 |

---

## IA-03: Navigation

| ID | Màn hình | Tiêu chí cần đạt | Cách kiểm / điều kiện Pass | Căn cứ | ID cũ |
|---|---|---|---|---|---|
| GUI-03-01 | Sidebar | Sidebar làm nổi bật mục đang mở | Bấm lần lượt 4 mục: mỗi lúc chỉ đúng mục đang mở được làm nổi bật | FR-23, GĐ 9 | 03-01 |
| GUI-03-02 | Login → Dashboard | Đăng nhập xong vào thẳng Dashboard | Đăng nhập thành công: hiện Dashboard, mục Dashboard được làm nổi bật | BP | 03-06 |
| GUI-03-03 | Sidebar | Nút đăng xuất ghi đúng "Đăng xuất" | Không phải "Thoát" hay "Logout" | FR-23 | 03-07 |
| GUI-03-04 | Sidebar → Login | Đăng xuất về Login; Back hoặc F5 không quay lại admin | Bấm Đăng xuất → Login. Bấm Back, rồi F5: vẫn ở Login, không thấy dữ liệu admin | FR-12, BP | 03-08, 03-09 |
| GUI-03-05 | Mọi màn admin | Chưa đăng nhập thì không vào được màn admin | Mở `localhost:5174` trong cửa sổ ẩn danh: chỉ thấy Login | FR-12 | 03-10 |
| GUI-03-06 | Dashboard, Danh mục, Sản phẩm, Mã giảm giá | Mỗi tab có URL riêng; F5 và Back/Forward giữ đúng tab | Ở tab Sản phẩm, URL có phần riêng (ví dụ `/products`); F5 vẫn ở Sản phẩm. Danh mục → Sản phẩm → Back: về Danh mục, sidebar đổi theo | GĐ 1, BP (Nielsen #3) | 03-11, 03-12 |
| GUI-03-07 | Danh mục, Sản phẩm, Mã giảm giá | Chuyển tab khi form đang nhập dở không làm mất dữ liệu mà không báo | Nhập dở form Sản phẩm, chuyển tab rồi quay lại: dữ liệu còn, hoặc có cảnh báo trước khi rời | BP (Nielsen #5) | 03-13 |

---

## IA-04: Feedback / State

| ID | Màn hình | Tiêu chí cần đạt | Cách kiểm / điều kiện Pass | Căn cứ | ID cũ |
|---|---|---|---|---|---|
| GUI-04-01 | Dashboard, Danh mục, Sản phẩm, Mã giảm giá | Có trạng thái loading khi đang tải | DevTools → Network → Slow 3G, tải lại từng màn: thấy spinner/skeleton; Dashboard không hiện "0 ₫"/"0" trước khi có dữ liệu | GĐ 8, BP (Nielsen #1) | 04-01, 04-02 |
| GUI-04-02 | Login, Danh mục, Sản phẩm, Mã giảm giá | Nút submit bị khóa trong lúc đang gửi | Slow 3G, bấm nhanh 2 lần vào nút submit: nút khóa ngay lần đầu, chỉ tạo 1 bản ghi | GĐ 8 | 04-03 |
| GUI-04-03 | Sản phẩm (Import) | Nút Import thể hiện đúng trạng thái | Chưa chọn file: nút khóa, nhãn không ghi "Import 0 sản phẩm". Đang chạy: nhãn "Đang import...", nút khóa | GĐ 8, BP | 04-04 |
| GUI-04-04 | Danh mục, Sản phẩm, Mã giảm giá | Thêm/sửa xong thấy kết quả ngay, đúng dữ liệu | Thêm: có dòng mới đúng giá trị vừa nhập. Sửa sản phẩm: chỉ dòng đó cập nhật, các dòng khác giữ nguyên. Không cần tải lại | GĐ 4, FR-15 | 04-05, 04-06, 04-07, 02-28 |
| GUI-04-05 | Danh mục, Sản phẩm, Mã giảm giá | Xóa xong dòng biến mất ngay | Xác nhận xóa: dòng biến mất mà không cần tải lại | GĐ 4 | 04-08 |
| GUI-04-06 | Danh mục, Sản phẩm, Mã giảm giá | Có hộp thoại xác nhận trước khi xóa, nêu rõ đối tượng | Bấm Xóa: hộp thoại có tên đối tượng (ví dụ "Xóa danh mục 'Điện thoại'?"). Hủy: bảng giữ nguyên. Đồng ý: dòng bị xóa | GĐ 6, BP (Nielsen #5) | 04-09 → 04-12 |
| GUI-04-07 | Danh mục | Xóa danh mục đang có sản phẩm thì bị chặn hoặc cảnh báo | Xóa danh mục có sản phẩm: bị chặn kèm thông báo, hoặc cảnh báo nêu ảnh hưởng | GĐ 12 | 04-13 |
| GUI-04-08 | Danh mục, Sản phẩm, Mã giảm giá | Bảng rỗng có thông báo thân thiện | Xóa hết dòng: bảng hiện icon và câu kiểu "Chưa có danh mục nào", không trống trơn | FR-24, GĐ 7 | 04-14 |
| GUI-04-09 | Mọi màn | Lỗi kết nối server được báo cho người dùng | Dừng backend rồi tải lại hoặc thêm dữ liệu: có thông báo tiếng Việt, không trang trắng, không im lặng | GĐ 4, GĐ 12 | 04-16 |
| GUI-04-10 | Login | Tài khoản không phải admin nhận thông báo rõ ràng | Đăng nhập `test@eshop.com`: thông báo không có quyền quản trị, vẫn ở Login | FR-12, GĐ 10 | 04-17 |
| GUI-04-11 | Mọi màn admin | Hết phiên thì về Login và có thông báo | Xóa/sửa `adminToken` trong localStorage rồi thao tác: về Login, thấy "Phiên đăng nhập đã hết hạn" | GĐ 10 | 04-18 |
| GUI-04-12 | Sản phẩm (Import) | Bảng xem trước khớp nội dung file | Dùng `01-valid-3-rows.csv` (có `"Ốp lưng iPhone 15, trong suốt"`): giá trị nằm trong 1 ô, số cột khớp header, "Xem trước (n dòng)" đúng số dòng dữ liệu | FR-16, GĐ 14 | 04-19, 04-20 |
| GUI-04-13 | Sản phẩm (Import) | Báo cáo import đủ thông tin, lỗi thì không thêm dòng nào | Import `02-invalid-negative-price.csv`: báo cáo có số dòng thành công, số dòng lỗi, số thứ tự + lý do mỗi dòng lỗi; bảng sản phẩm không đổi | FR-16, GĐ 14 | 04-21, 02-32 |
| GUI-04-14 | Sản phẩm | Mọi ảnh sản phẩm có `alt` mô tả | DOM: mọi `<img>` trong bảng có `alt` khác rỗng, mô tả sản phẩm | FR-24 | 04-23 |
| GUI-04-15 | Mã giảm giá | Mã đã hết hạn được phân biệt rõ | Mã `EXPIRED` hiện nhãn "Hết hạn" bằng cả chữ và màu | GĐ 15 | 04-25 |

---

## Các mục đã loại khỏi bản nháp

| Lý do | ID cũ |
|---|---|
| Kiểm thử chức năng, không phải GUI | 02-11 (khóa 30 giây), 02-16 (trùng tên danh mục), 02-34 (trùng mã coupon), 04-26, 04-27 (phép tính Dashboard, cần tab Đơn hàng ngoài phạm vi) |
| Đã gộp vào mục khác | 02-28 → 04-04; 02-32 → 04-13; xem cột "ID cũ" |
| Giá trị thấp / quá chi tiết | 01-03, 01-10, 01-11, 01-15, 01-20, 02-06, 02-07, 02-15, 02-22, 02-24, 02-25, 02-41, 03-02, 03-03, 03-04, 03-05, 03-14, 04-15, 04-22, 04-24 |
| N/A | 03-15 (breadcrumb không bắt buộc ở admin), Step Indicator (không có form nhiều bước) |

## Mục bổ sung sau review (AI bỏ sót ở bản nháp)

| ID | IA | Màn hình | Tiêu chí cần đạt | Cách kiểm / điều kiện Pass | Căn cứ | Lý do AI bỏ sót |
|---|---|---|---|---|---|---|
| GUI-01-15 | IA-01 | Cả 5 màn | Bố cục không vỡ ở màn hình hẹp | Thu cửa sổ còn 1024px và 768px: bảng không tràn ngang khỏi trang, sidebar không che nội dung, form không chồng cột | BP (responsive) | AI chỉ đọc code, không render giao diện ở nhiều kích thước; prompt cũng không nêu kích thước màn hình cần hỗ trợ |
| GUI-01-16 | IA-01 | Cả 5 màn | Phóng to 200% vẫn dùng được | Ctrl/Cmd + đến 200%: chữ không bị cắt, không chồng lấn, không phải cuộn cả ngang lẫn dọc để đọc một dòng | BP (WCAG 1.4.4, 1.4.10) | Như trên: hiện tượng chỉ thấy khi hiển thị thật, không suy ra được từ class Tailwind |
| GUI-01-17 | IA-01 | Cả 5 màn | Hiển thị đọc được khi bật dark mode | Bật dark mode của hệ điều hành (hoặc Chrome flag "Auto Dark Mode for Web Contents"): không có chữ trắng trên nền trắng, viền ô nhập và nút vẫn thấy rõ | BP | Đặc tả không nhắc dark mode nên AI chỉ bám FR-21; mã nguồn không có class `dark:` nên AI không có gì để phân tích |
| GUI-01-18 | IA-01 | Cả 5 màn | Bố cục chịu được chiều chữ phải-sang-trái (RTL) | DevTools: thêm `dir="rtl"` vào `<html>`: sidebar, form, bảng lật hợp lý, không phần tử nào bị chồng hoặc cắt | BP (i18n) | Giao diện chỉ có tiếng Việt nên AI coi RTL nằm ngoài phạm vi; đây là khía cạnh đề bài gợi ý AI hay bỏ qua |
| GUI-01-19 | IA-01 | Sidebar, Login, Sản phẩm, Mã giảm giá | Độ tương phản chữ/nền tối thiểu 4.5:1 | Đo bằng DevTools (Color picker → Contrast ratio) hoặc axe: mục đang chọn trên sidebar (`text-blue-400` trên nền tối), placeholder xám, chữ trắng trên nút cam và xanh lá | BP (WCAG 1.4.3) | AI xét màu theo ý nghĩa (đỏ = nguy hiểm, xanh = tích cực) như FR-21 yêu cầu, không tính tỷ lệ tương phản vì cần giá trị màu sau khi render |
| GUI-01-20 | IA-01 | Danh mục, Sản phẩm | Dữ liệu dài không làm vỡ bảng | Tạo danh mục/sản phẩm có tên 255 ký tự liền nhau (không khoảng trắng) và tên tiếng Việt dài: chữ xuống dòng hoặc cắt kèm "…", cột "Hành động" vẫn thấy và bấm được | BP | AI kiểm giới hạn 255 ký tự ở phía form (validation) nhưng không xét dữ liệu đó hiển thị ra sao trong bảng |
| GUI-01-21 | IA-01 | Cả 5 màn | Tiêu đề tab trình duyệt mô tả màn đang mở | Tiêu đề tab đổi theo màn (ví dụ "Quản lý sản phẩm – EShop Admin"), không phải tên mặc định của dự án; có favicon riêng | BP (WCAG 2.4.2) | `<title>` và favicon nằm trong `index.html`, trong khi prompt chỉ cung cấp `App.jsx` |
| GUI-02-23 | IA-02 | Danh mục, Sản phẩm | Dữ liệu người dùng nhập được hiển thị an toàn, không render HTML | Tạo danh mục `<b>Test</b>`, sản phẩm `<img src=x onerror=alert(1)>`, import `08-html-escape.csv`: hiển thị nguyên văn chuỗi, không in đậm, không hiện popup | SEC-04 | Prompt chỉ đưa FR-12→17 và FR-21→24; yêu cầu hiển thị an toàn nằm ở mục Bảo mật (SEC-04) nên AI không đối chiếu |
| GUI-02-24 | IA-02 | Sản phẩm, Mã giảm giá | Cuộn chuột trên ô số không vô tình đổi giá trị | Bấm vào ô Giá (hoặc Giá trị giảm), nhập 100000, rồi cuộn chuột khi con trỏ vẫn trên ô: giá trị không đổi | BP | Đây là hành vi mặc định của trình duyệt với `type="number"`, chỉ lộ ra khi thao tác thật, không thấy trong code |
| GUI-02-25 | IA-02 | Login | Ô nhập hỗ trợ nhập nhanh | Mở Login: con trỏ nằm sẵn ở ô Email. Ô Email/Mật khẩu có `autocomplete="email"` / `"current-password"` để trình duyệt gợi ý | BP (WCAG 1.3.5) | AI bám sát FR-22 (type, `*`, vị trí lỗi); các thuộc tính hỗ trợ nhập liệu không có trong đặc tả nên không được nghĩ tới |
| GUI-03-08 | IA-03 | Sidebar | Điều hướng vẫn dùng được trên màn hình hẹp | Ở 768px: sidebar thu gọn (ví dụ nút ☰) hoặc vẫn hiển thị đủ; mọi mục menu và "Đăng xuất" vẫn truy cập được | BP (responsive) | Như GUI-01-15: AI không render ở nhiều kích thước nên không thấy sidebar cố định chiếm chỗ |
| GUI-04-16 | IA-04 | Login, Danh mục, Sản phẩm, Mã giảm giá | Thông báo lỗi được trình đọc màn hình đọc ra | Bật VoiceOver (Cmd + F5), gửi form có lỗi: nghe được nội dung lỗi. DOM: vùng thông báo có `role="alert"` hoặc `aria-live`, ô lỗi có `aria-invalid="true"` | BP (WCAG 4.1.3) | AI không mô phỏng công nghệ hỗ trợ; prompt không yêu cầu kiểm accessibility nên AI chỉ xét những gì người dùng nhìn thấy |

**Tổng sau bổ sung:** 58 + 12 = **70 mục** (IA-01: 21 · IA-02: 25 · IA-03: 8 · IA-04: 16).
