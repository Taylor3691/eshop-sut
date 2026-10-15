# FR-05 mobile — AI gap analysis

Mục 6 của đề: ghi test case hoặc bug mà AI bỏ sót, và lý do. Bộ mobile viết sau bộ web. Nhờ đọc `frontend-mobile/App.js`, lần này có thêm `&`, `#`, `?` (KW-IEC-05 đến KW-IEC-07). Hai ký tự đầu thành BUG-22. `?` trong TC-22 không bị cắt; case đó fail vì không có empty state, cùng BUG-21.

## Test case hoặc kết quả bị bỏ sót

| ID | Chỗ bỏ sót | Bằng chứng | Lý do |
| --- | --- | --- | --- |
| GAP-M-01 | Từ khóa chỉ gồm dấu cách, trên iOS hoặc Android | TC-15 và TC-16 BLOCKED. Trên Chrome, request thành `search=` rỗng vì trình duyệt cắt dấu cách cuối URL. Script `scripts/fr05-mobile-execute.mjs` chỉ điều khiển Expo web. | Giới hạn của công cụ. Script không gửi được request của app trên điện thoại, nên chưa biết app có lỗi hay không. |
| GAP-M-02 | Ký tự `#` trên thiết bị thật | BUG-22 ghi `#` là rất có thể cùng lỗi với `&`, nhưng lần chạy là Chrome. `#` bắt đầu fragment của URL. Hành vi WebView trên điện thoại chưa được chạy. | Cùng giới hạn với GAP-M-01. |

GAP-05-01 ở bộ web là hệ quả của lần làm mobile: cùng cách ghép `` `search=${query}` `` có trong `Home.jsx`, nhưng bộ web không có ba lớp này. Prompt web không liệt kê chúng.

## Kết quả AI tạo ra nhưng không phải bug

| Chỗ | Việc đã xảy ra | Lý do |
| --- | --- | --- |
| Lần chạy đầu | 5 PASS, 18 FAIL. Expected của TC-01 có `h1`, `alt` và một cột. | Công cụ chép oracle của web sang Expo web. App không có `h1`. `react-native-web` tự sinh `alt=""`. README không nêu số cột trên mobile. Sau khi đối lại, ba mục này bị bỏ và TC-01 thành PASS. |
| TC-04 | `iphone` ra `iPhone 15 Pro Max`, bị tính FAIL. | README không cấm tìm không phân biệt hoa thường với chữ ASCII. Cùng cách diễn giải sai như TC-04 của web. Không lập bug. |
| TC-10 | Lần đầu expected không tính chữ `a` trong `Max` của `iPhone 15 Pro Max`. | Đại diện độ dài trùng một ký tự có sẵn trong tên seed. Công cụ không đối chiếu giá trị đại diện với dữ liệu seed trước khi chấm. Đã sửa expected rồi chạy lại. |
