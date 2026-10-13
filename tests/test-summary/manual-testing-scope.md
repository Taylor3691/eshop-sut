# Phạm vi kiểm thử thủ công

Theo yêu cầu người dùng: tất cả case còn lại dùng thao tác trên màn hình. A/B/C dùng web; D dùng ứng dụng trên thiết bị di động. Đã đọc đủ 100 case trước khi đổi, giữ 67 và loại 33 case chỉ kiểm được bằng request tự tạo. ID còn lại không đánh số lại; không sửa chương trình để che lỗi.

| Pool | Trước | Hiện hành | BVA | EP |
|---|---:|---:|---:|---:|
| A | 17 | 11 | 4 | 7 |
| B | 28 | 18 | 0 | 18 |
| C | 41 | 24 | 16 | 8 |
| D | 14 | 14 | 4 | 10 |
| Tổng | 100 | 67 | 24 | 43 |

## Cách chuyển đổi

- Đọc dữ liệu trực tiếp được thay bằng tải lại trang hoặc đăng nhập lại và quan sát các ô.
- Kiểm tra chuyển trạng thái dùng các nút trên trang quản trị/khách hàng. Nếu nút cấm không có hoặc không bấm được, chỉ kết luận việc chặn trên trang, không kết luận bảo vệ request giả.
- C-034 dùng form sửa với giá -1; C-051/054 thử gõ/dán abc và ghi giá trị thực tế trong ô, không giả định ký tự đã được gửi.
- A-015 chỉ kiểm Email không sửa được; kiểm loại kỹ thuật của ô đã bỏ khỏi phạm vi.
- A-025/026 và D-028/029 đưa chuỗi vào form rồi mở lại để nhìn; nếu chưa lưu được thì Blocked cho kiểm tra hiển thị. Không dùng sửa dữ liệu trực tiếp để vượt lỗi.
- D-030 đổi dữ liệu từ form trên trang web rồi đăng nhập lại trên thiết bị. D vẫn là kiểm thử ứng dụng riêng, không thay bằng trang web thu nhỏ.
- Kết quả đã ghi của A-001–004 cùng ghi chú/bug links giữ nguyên. Đó là lịch sử trước lần sửa bước, chưa phải kết quả chạy lại. Tài liệu và ảnh bug cũ giữ nguyên.

## Cases đã loại lần này

ID dưới đây là lịch sử, không phải link hoặc việc cần thực hiện. Các file phiên bản cũ còn trong lịch sử Git sau commit.

| Case ID | Lý do |
|---|---|
| `TC-ORDER-STATE-027` | Cần chọn mã đơn người khác trong request; không có thao tác tương đương qua trang khách hàng. |
| `TC-ORDER-STATE-029` | Cần tự sửa/gửi thông tin xác thực, chữ ký hoặc thuộc tính ngoài form. |
| `TC-ORDER-STATE-030` | Cần tự sửa/gửi thông tin xác thực, chữ ký hoặc thuộc tính ngoài form. |
| `TC-ORDER-STATE-032` | Cần tự sửa/gửi thông tin xác thực, chữ ký hoặc thuộc tính ngoài form. |
| `TC-ORDER-STATE-033` | Cần tự sửa/gửi thông tin xác thực, chữ ký hoặc thuộc tính ngoài form. |
| `TC-ORDER-STATE-034` | Cần tự gửi trạng thái ngoài lựa chọn, bỏ trường hoặc đổi kiểu dữ liệu. |
| `TC-ORDER-STATE-035` | Cần tự gửi trạng thái ngoài lựa chọn, bỏ trường hoặc đổi kiểu dữ liệu. |
| `TC-ORDER-STATE-038` | Cần tự gửi trạng thái ngoài lựa chọn, bỏ trường hoặc đổi kiểu dữ liệu. |
| `TC-ORDER-STATE-039` | Cần gửi mã đơn không tồn tại; danh sách không có dòng để thao tác. |
| `TC-ORDER-STATE-040` | Cần gửi mã đơn không tồn tại; danh sách không có dòng để thao tác. |
| `TC-PRODUCT-CRUD-045` | Bỏ hẳn trường trong thông điệp khác để trống ô trên form; không đổi nghĩa case để giữ lại. |
| `TC-PRODUCT-CRUD-047` | Bỏ hẳn trường trong thông điệp khác để trống ô trên form; không đổi nghĩa case để giữ lại. |
| `TC-PRODUCT-CRUD-049` | Bỏ hẳn trường trong thông điệp khác để trống ô trên form; không đổi nghĩa case để giữ lại. |
| `TC-PRODUCT-CRUD-052` | Bỏ hẳn trường trong thông điệp khác để trống ô trên form; không đổi nghĩa case để giữ lại. |
| `TC-PRODUCT-CRUD-055` | Bỏ hẳn trường trong thông điệp khác để trống ô trên form; không đổi nghĩa case để giữ lại. |
| `TC-PRODUCT-CRUD-057` | Cần gửi mã danh mục không tồn tại ngoài danh sách lựa chọn. |
| `TC-PRODUCT-CRUD-058` | Bỏ hẳn trường trong thông điệp khác để trống ô trên form; không đổi nghĩa case để giữ lại. |
| `TC-PRODUCT-CRUD-060` | Cần gửi mã danh mục không tồn tại ngoài danh sách lựa chọn. |
| `TC-PRODUCT-CRUD-061` | Cần tự sửa/gửi thông tin xác thực, chữ ký hoặc thuộc tính ngoài form. |
| `TC-PRODUCT-CRUD-062` | Cần tự sửa/gửi thông tin xác thực, chữ ký hoặc thuộc tính ngoài form. |
| `TC-PRODUCT-CRUD-063` | Cần tự sửa/gửi thông tin xác thực, chữ ký hoặc thuộc tính ngoài form. |
| `TC-PRODUCT-CRUD-064` | Cần tự sửa/gửi thông tin xác thực, chữ ký hoặc thuộc tính ngoài form. |
| `TC-PRODUCT-CRUD-067` | Cần tự sửa/gửi thông tin xác thực, chữ ký hoặc thuộc tính ngoài form. |
| `TC-PRODUCT-CRUD-068` | Cần tự sửa/gửi thông tin xác thực, chữ ký hoặc thuộc tính ngoài form. |
| `TC-PRODUCT-CRUD-069` | Cần tự sửa/gửi thông tin xác thực, chữ ký hoặc thuộc tính ngoài form. |
| `TC-PRODUCT-CRUD-071` | Cần tự sửa/gửi thông tin xác thực, chữ ký hoặc thuộc tính ngoài form. |
| `TC-PRODUCT-CRUD-076` | Cần gửi hai mã sản phẩm mâu thuẫn trong cùng request. |
| `TC-PROFILE-WEB-017` | Cần tự sửa/gửi thông tin xác thực, chữ ký hoặc thuộc tính ngoài form. |
| `TC-PROFILE-WEB-018` | Cần tự sửa/gửi thông tin xác thực, chữ ký hoặc thuộc tính ngoài form. |
| `TC-PROFILE-WEB-020` | Cần tự sửa/gửi thông tin xác thực, chữ ký hoặc thuộc tính ngoài form. |
| `TC-PROFILE-WEB-021` | Cần tự sửa/gửi thông tin xác thực, chữ ký hoặc thuộc tính ngoài form. |
| `TC-PROFILE-WEB-023` | Cần tự sửa/gửi thông tin xác thực, chữ ký hoặc thuộc tính ngoài form. |
| `TC-PROFILE-WEB-024` | Cần tự sửa/gửi thông tin xác thực, chữ ký hoặc thuộc tính ngoài form. |

## Giới hạn

Không còn full coverage xác thực/giả mạo dữ liệu. Những partitions tương ứng giữ trong analysis với trạng thái chưa kiểm tra. Các thao tác bị chặn trước khi lưu không chứng minh dữ liệu đã lưu hoặc renderer đã được thử. Chỉ kiểm tra tài liệu trong lần chỉnh sửa này; chưa chạy lại SUT.
