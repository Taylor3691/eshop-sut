# Phương pháp GUI checklist

## 1. Nhóm IA và các chủ đề nên phủ

| Nhóm | Chủ đề con (dùng làm khung khi sinh mục) |
|---|---|
| **IA-01 Chuẩn giao diện chung** | Tiêu đề trang (`<h1>` duy nhất, thứ bậc heading) · Ngôn ngữ và thuật ngữ (nhất quán, không còn tiếng Anh/viết tắt ngoài danh sách cho phép) · Màu sắc (nút chính / nút nguy hiểm, độ tương phản) · Định dạng tiền, ngày, số · Tab order và viền focus · Bố cục (responsive, zoom 200%, dữ liệu dài, dark mode, RTL) · Tiêu đề tab trình duyệt, favicon |
| **IA-02 Form** | Nhãn hiển thị và dấu `*` · Kiểu ô (`type=email`, `password`, `number`, `date`) · Kiểm tra dữ liệu ở biên (rỗng, khoảng trắng, 0, âm, số lẻ, quá độ dài, trùng) · Vị trí và nội dung thông báo lỗi · Giá trị mặc định / chọn sẵn · Ô chọn file (lọc đuôi, file rỗng, sai header) · Hỗ trợ nhập nhanh (autofocus, autocomplete) · Cuộn chuột trên ô số · Hiển thị an toàn dữ liệu người dùng nhập (không render HTML) |
| **IA-03 Điều hướng** | Highlight mục đang mở · Phần tử menu là link/button thật · Sau đăng nhập / đăng xuất đi đâu · Chặn truy cập khi chưa đăng nhập · URL riêng cho từng màn, F5 / Back / Forward · Breadcrumb (nếu đặc tả bắt buộc) · Điều hướng trên màn hình hẹp · Rời trang khi form nhập dở |
| **IA-04 Phản hồi / trạng thái** | Loading và khóa nút submit khi đang gửi · Kết quả hiện ngay sau thêm / sửa / xóa · Hộp thoại xác nhận khi xóa hoặc thao tác không đảo ngược được · Empty state · Thông báo lỗi hệ thống, hết phiên, không đủ quyền · Xem trước và báo cáo kết quả (import) · Ảnh và `alt` · Thông báo đọc được bằng trình đọc màn hình (`role="alert"`, `aria-live`) |

## 2. Cách viết một mục

- **Tiêu chí cần đạt**, viết ở thể khẳng định, một ý một mục. Ví dụ tốt: "Ô chọn danh mục có lựa chọn gợi ý '— Chọn danh mục —' và chặn gửi khi chưa chọn". Ví dụ không tốt: "Kiểm tra ô danh mục".
- **Cách kiểm / điều kiện Pass** đủ để người khác làm lại: dữ liệu thử (ví dụ tên 256 ký tự, giá `1000.5`), thao tác (DevTools, thu cửa sổ còn 768px, bật VoiceOver) và điều kiện đo được (đếm được đúng 1 `<h1>`, tỉ lệ tương phản ≥ 4.5:1).
- **Căn cứ** theo thứ tự ưu tiên: mã FR trong đặc tả → giải đáp của người kiểm thử (GĐ n) → best practice có tên (Nielsen #n, WCAG x.x.x).
- Mục áp dụng cho nhiều màn hình thì ghi "Nhiều màn hình" và liệt kê màn trong cách kiểm.

## 3. Các khía cạnh AI hay bỏ sót (dùng ở bước 3)

Khi AI chỉ đọc mã nguồn và đặc tả, các khía cạnh sau thường không xuất hiện trong bản nháp. Ở HW03, 7/12 mục bổ sung từ danh sách này bị Failed.

| Khía cạnh | Vì sao AI bỏ sót | Cách kiểm gợi ý |
|---|---|---|
| Responsive (1024px, 768px) và điều hướng trên màn hình hẹp | AI không hiển thị giao diện ở nhiều kích thước | Thu cửa sổ; bảng không tràn, sidebar không che nội dung |
| Zoom 200% | Chỉ thấy khi hiển thị thật | Cmd/Ctrl + đến 200% (WCAG 1.4.4, 1.4.10) |
| Độ tương phản | Cần màu sau khi hiển thị; AI chỉ xét ý nghĩa màu | DevTools Contrast ratio hoặc axe (WCAG 1.4.3) |
| Dark mode | Đặc tả không nhắc, code không có `dark:` | Bật dark mode hệ điều hành hoặc Chrome Auto Dark Mode |
| RTL | Giao diện một ngôn ngữ nên AI coi là ngoài phạm vi | Thêm `dir="rtl"` vào `<html>` |
| Dữ liệu dài trong bảng | AI kiểm độ dài ở form, không xét chỗ hiển thị | Tên 255 ký tự liền nhau, tên tiếng Việt dài |
| `<title>`, favicon | Nằm trong `index.html`, thường không có trong prompt | Tiêu đề tab đổi theo màn (WCAG 2.4.2) |
| Hiển thị an toàn (XSS) | Yêu cầu nằm ở mục Bảo mật, không ở mục GUI | Nhập `<b>x</b>`, `<img src=x onerror=alert(1)>` |
| Cuộn chuột trên ô `type=number` | Hành vi mặc định của trình duyệt, không thấy trong code | Nhập số rồi cuộn chuột khi con trỏ trên ô |
| Autofocus, autocomplete | Không có trong đặc tả | WCAG 1.3.5 |
| Trình đọc màn hình | AI không mô phỏng công nghệ hỗ trợ | VoiceOver / NVDA đọc được thông báo lỗi (WCAG 4.1.3) |

Ba nhóm lý do để ghi vào cột "Lý do AI bỏ sót":
1. **Giới hạn đầu vào:** prompt thiếu file (`index.html`) hoặc thiếu phần đặc tả (mục Bảo mật).
2. **Giới hạn của AI:** chỉ phân tích tĩnh, không hiển thị, không thao tác thật, không dùng công nghệ hỗ trợ.
3. **Đặc điểm giao diện:** một ngôn ngữ, không có dark mode, đặc tả không nhắc tới.

## 4. Tiêu chí lọc bản nháp (bước 3)

| Loại khỏi checklist | Ví dụ |
|---|---|
| Kiểm thử chức năng, không phải giao diện | Khóa tài khoản 30 giây, phép tính trên Dashboard |
| Trùng hoặc nên gộp vào mục khác | Hai mục cùng kiểm hộp thoại xác nhận xóa |
| Giá trị thấp / quá chi tiết | Kiểm từng màu của từng nút riêng lẻ |
| Không áp dụng (N/A) | Breadcrumb khi đặc tả không bắt buộc; Step Indicator khi không có form nhiều bước |

Giữ cột "ID cũ" để truy vết mục nào đến từ bản nháp nào.

## 5. Chấm Pass / Fail

- Chỉ có ba giá trị: `Passed`, `Failed`, `N/A`. Mục Failed bắt buộc có Notes (lý do) và ảnh; mục Passed không cần ảnh.
- Kết quả do người kiểm thử quyết định sau khi xem ảnh. Cột "Gợi ý kết quả" của script chỉ để tham khảo.
- Khi đặc tả "nới lỏng" (ví dụ dùng `alert()` vẫn chấp nhận) thì Pass nhưng ghi chú vào Notes.

## 6. Gom bug

- **Một bug một nguyên nhân.** Ví dụ: "trường không có nhãn và dấu `*`" gộp mục nhãn và mục `*`; "Dashboard doanh thu gấp đôi" và "định dạng tiền theo ngôn ngữ trình duyệt" là hai nguyên nhân khác nhau dù cùng một mục.
- Tiêu đề bug: `[Màn hình] Hiện tượng khi điều kiện`.
- Severity:

| Severity | Khi nào |
|---|---|
| Critical | Mất dữ liệu, lỗ hổng bảo mật, chặn hoàn toàn chức năng chính |
| Major | Dữ liệu sai được lưu, thao tác không đảo ngược được không có bảo vệ, không dùng được bằng bàn phím |
| Minor | Sai quy chuẩn hiển thị, gây khó nhưng có cách vượt qua |
| Trivial | Thẩm mỹ, không ảnh hưởng thao tác |

- Priority → nhãn GitHub: High → `priority: P1`, Medium → `priority: P2`, Low → `priority: P3`.
- Issue: tiêu đề `[<Dự án>][BUG][<Phân hệ> - <Màn hình>] <mô tả ngắn>`; nhãn `type: bug`, `status: new`, `severity: <...>`, `priority: <...>`, cộng nhãn của dự án và phân hệ. Nội dung gồm mô tả, môi trường, điều kiện tiên quyết, bước tái hiện, kết quả mong đợi, kết quả thực tế, mục checklist liên quan, ảnh.
