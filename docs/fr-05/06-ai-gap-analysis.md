# FR-05 web — AI gap analysis

Mục 6 của đề: nếu AI bỏ sót test case hoặc bug thì phải ghi lại, và giải thích lý do. Lý do được xếp vào ba nhóm mà đề nêu: chất lượng prompt, giới hạn của công cụ, độ phức tạp của chức năng.

Oracle vẫn là câu trong README. Các case dưới đây chưa được thêm vào `04-test-cases.md` và chưa chạy, nên chưa có mã BUG mới.

## Test case bị bỏ sót

| ID | Chỗ bỏ sót | Bằng chứng | Lý do |
| --- | --- | --- | --- |
| GAP-05-01 | Từ khóa có `&`, `#`, `?` | `frontend-web/src/pages/Home.jsx` ghép `` `.../api/products?search=${query}` ``, không `encodeURIComponent`. Cùng cách ghép trên mobile đã làm `a&b` và `a#b` thành tìm chữ `a` (BUG-22, TC-20 và TC-21 của `docs/fr-05-mobile/`). Bộ web không có lớp nào cho ba ký tự này. | Chất lượng prompt. Prompt phân hoạch liệt kê `%`, `_`, `'`, `<script>` và dừng ở danh sách đó. Công cụ không tự suy ra các ký tự có nghĩa trong URL. |
| GAP-05-02 | Ảnh có tỷ lệ chuẩn | FR-05 yêu cầu ảnh tỷ lệ chuẩn. `Home.jsx` dùng `h-48 object-cover`. Không có lớp hay test case cho tỷ lệ khung. | Chất lượng prompt. Prompt bước 1 và bước 2 tập trung vào từ khóa, giá, danh mục, sort. Câu về ảnh trong FR-05 không được đưa vào miền. |
| GAP-05-03 | Danh sách dạng lưới | FR-05 yêu cầu lưới. `Home.jsx` có `grid-cols-1 sm:grid-cols-2 md:grid-cols-3`. Không có test nào kiểm số cột theo bề rộng màn hình. | Cùng lý do với GAP-05-02. |

GAP-05-01 là chỗ có khả năng thành bug cao nhất, vì mobile đã chạy cùng kiểu ghép URL và đã lệch. Trên web case này chưa chạy, nên chưa lập bug.

## Kết quả AI tạo ra nhưng không phải bug

| Chỗ | Việc đã xảy ra | Lý do |
| --- | --- | --- |
| TC-04 | Expected bắt `iphone` không được ra `iPhone 15 Pro Max`. Chạy thì ra sản phẩm đó. Không lập bug. | README không bắt tìm phân biệt hoa thường. Expected là diễn giải thêm, không phải câu trong spec. |
| TC-23, TC-24, TC-25, TC-26, TC-46 | BLOCKED. Precondition dùng ký hiệu `L`. | Prompt BVA đòi phân trang và `Limit`. FR-05 không có page size. Công cụ giữ `L` thay vì bỏ miền này. |

Giá, danh mục và sort cũng không có trong FR-05. Chúng có mặt vì prompt yêu cầu. Khi chạy, các tham số đó không đổi tập sản phẩm. Đó không phải bug của FR-05.
