# FR-16 — AI gap analysis

Mục 6 của đề: ghi test case hoặc bug mà AI bỏ sót, và lý do. Bộ 24 test case đã phủ đuôi file, header, dấu phẩy trong nháy kép, tên rỗng, giá âm và bằng 0, giá không phải số, tên dài 256, rollback, và role admin. Các lệch đã chạy là BUG-14 đến BUG-20.

Các case dưới đây chưa được thêm vào `04-test-cases.md` và chưa chạy, nên chưa có mã BUG mới. Parser trên admin là `split("\n")` rồi `split(",")` trong `frontend-admin/src/App.jsx`. Cách cắt đó là căn cứ để chỉ ra lớp còn thiếu. Nó không thay cho một lần chạy.

## Test case bị bỏ sót

| ID | Chỗ bỏ sót | Bằng chứng | Lý do |
| --- | --- | --- | --- |
| GAP-16-01 | Dấu nháy kép được escape theo RFC 4180, dạng `""` bên trong trường đã bọc nháy | Spec dẫn RFC 4180. Case đã viết chỉ có dấu phẩy trong nháy kép (TC-03, BUG-14). Parser cắt mọi dấu phẩy, không hiểu `""`. | Độ phức tạp của chức năng, cộng với prompt. Prompt và câu spec được dùng cho lớp CSV chỉ nói tới dấu phẩy trong nháy kép. Phần escape của RFC 4180 không được nhắc. |
| GAP-16-02 | Dấu xuống dòng bên trong trường đã bọc nháy kép | Parser tách dòng bằng `split("\n")` trước khi đọc cột. Một trường hợp lệ theo RFC 4180 có thể bị cắt thành hai dòng. | Cùng lý do với GAP-16-01. |
| GAP-16-03 | Xuống dòng kiểu CRLF (`\r\n`) | `split("\n")` để lại `\r` ở cột cuối. Header mẫu kết thúc bằng `category_id`. File lưu từ Excel thường dùng CRLF. | Giới hạn của công cụ khi bám một file mẫu dùng `\n`. Miền "đúng header" chỉ có một đại diện LF. |
| GAP-16-04 | BOM UTF-8 ở đầu file | Byte `\uFEFF` dính vào header `name` thì khóa `name` không còn khớp. Không có lớp này. | Cùng lý do với GAP-16-03. File mẫu trong admin không có BOM. |
| GAP-16-05 | Tên chỉ gồm dấu cách, giá thập phân `1.5`, giá có dấu phân cách `100.000` | Tên rỗng `""` đã có (TC-16). Parser còn `.trim()`, nên một tên toàn dấu cách có thể thành rỗng sau khi cắt, hoặc không. Giá chỉ có `-1`, `0`, `1`, `abc`, `100@`. | Chất lượng prompt. Prompt liệt kê giá âm, bằng 0, chữ và ký tự đặc biệt. Không có số thập phân và không có cách viết hàng nghìn. |

## Biên lấy từ chức năng khác

FR-16 không ghi độ dài tên tối đa. Bước BVA mượn Max = 255 từ FR-15, rồi TC-21 chờ hệ thống từ chối tên 256 ký tự. Hệ thống thêm tên đó. BUG-19 được lập trên biên đã mượn. Spec của riêng FR-16 không có câu "tối đa 255". Đây là giới hạn của prompt BVA: prompt đòi MaxLength trong khi FR-16 không khai báo số đó.
