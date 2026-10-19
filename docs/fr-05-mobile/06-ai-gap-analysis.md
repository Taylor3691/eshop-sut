# FR-05 mobile — AI gap analysis

Mục 6 của đề: ghi test case hoặc bug mà AI bỏ sót, và lý do. Bộ mobile viết sau bộ web. Nhờ đọc `frontend-mobile/App.js`, lần này có thêm `&`, `#`, `?` (KW-IEC-05 đến KW-IEC-07). Hai ký tự đầu thành BUG-22. `?` trong TC-22 không bị cắt; case đó fail vì không có empty state, cùng BUG-21.

## Test case hoặc kết quả bị bỏ sót

| ID | Chỗ bỏ sót | Bằng chứng | Lý do |
| --- | --- | --- | --- |
| GAP-M-01 | Từ khóa chỉ gồm dấu cách, trên iOS hoặc Android | Lượt Chrome để TC-15 và TC-16 BLOCKED vì trình duyệt cắt dấu cách cuối URL. | Giới hạn của công cụ lúc đó. Lượt Android emulator 18/10 đóng gap này cho Android: FAIL, request `search=` rỗng, trả đủ seed. iOS chưa chạy. |
| GAP-M-02 | Ký tự `#` trên thiết bị thật | Lượt Chrome chưa chứng minh WebView. | Lượt Android emulator 18/10 đóng gap này cho Android: TC-21 gửi `search=a`. iOS chưa chạy. |

GAP-05-01 ở bộ web là hệ quả của lần làm mobile: cùng cách ghép `` `search=${query}` `` có trong `Home.jsx`, nhưng bộ web không có ba lớp này. Prompt web không liệt kê chúng.

## Kết quả AI tạo ra nhưng không phải bug

| Chỗ | Việc đã xảy ra | Lý do |
| --- | --- | --- |
| Lần chạy đầu | 5 PASS, 18 FAIL. Expected của TC-01 có `h1`, `alt` và một cột. | Công cụ chép oracle của web sang Expo web. App không có `h1`. `react-native-web` tự sinh `alt=""`. README không nêu số cột trên mobile. Sau khi đối lại, ba mục này bị bỏ và TC-01 thành PASS. |
| TC-04 | `iphone` ra `iPhone 15 Pro Max`, bị tính FAIL. | README không cấm tìm không phân biệt hoa thường với chữ ASCII. Cùng cách diễn giải sai như TC-04 của web. Không lập bug. |
| TC-10 | Lần đầu expected không tính chữ `a` trong `Max` của `iPhone 15 Pro Max`. | Đại diện độ dài trùng một ký tự có sẵn trong tên seed. Công cụ không đối chiếu giá trị đại diện với dữ liệu seed trước khi chấm. Đã sửa expected rồi chạy lại. |

## Cập nhật review 18/10/2026

## Cập nhật lần hai

| Gap | Nguyên nhân AI bỏ sót | Khắc phục |
| --- | --- | --- |
| Bộ mobile chép gần nguyên bộ web, không có miền riêng của thiết bị | Prompt yêu cầu "làm FR-05 trên mobile" và trỏ bộ web làm mẫu; skill dặn dùng FR-05 làm mẫu bố cục, AI hiểu thành mẫu nội dung | Thêm VIEW-VEC-01..03 (320/390/768 px) và TC-27/28, cả hai PASS |
| Số sản phẩm trong CSDL 0/1/2 | Như bộ web: biến có ở bước 1 nhưng không được đưa sang bước 2/3 | CAT-VEC-01/02, CAT-B-01..03, TC-24..26. TC-24 FAIL: CSDL rỗng không có trang trống, mở rộng BUG-21 |
| Điểm on/off/in/out | Skill chỉ có BVA 3 giá trị | Phần A ở bước 3 |
| `04-test-cases.md` vẫn ghi "Chưa chạy" sau khi đã chạy | AI cập nhật file kết quả nhưng không đối chiếu lại file test case | Đã sửa phần tổng hợp |

Nhấn Enter trên bàn phím để tìm: `App.js` không có `onSubmitEditing`, nên chỉ nút "Tìm" gửi được từ khóa. README không yêu cầu Enter phải tìm, nên không lập test có PASS/FAIL và không lập bug. Ghi lại làm quan sát cho người đặt yêu cầu.

TC-04/05/07 đã sửa oracle để không bắt buộc chính sách hoa thường/dấu. TC-04 không còn là FAIL do `iphone` khớp iPhone. Chuỗi dài 254/255/256 chỉ là kiểm tra bổ sung, không phải MaxLength search.

Lượt Android emulator (18/10/2026, Expo Go 54, AVD Medium_Phone) đóng GAP-M-01 và GAP-M-02 cho Android: TC-15/16 FAIL vì dấu cách không được encode, request thành `search=` rỗng và trả đủ seed; TC-21 vẫn cắt `#` thành `search=a`. Chưa chạy iOS.
