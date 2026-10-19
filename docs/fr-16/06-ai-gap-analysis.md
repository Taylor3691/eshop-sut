# FR-16 — AI gap analysis sau review

AI bám danh sách ví dụ trong prompt (giá âm/0/chữ, dấu phẩy trong nháy) nên bỏ qua cú pháp CSV khác và giá thập phân. Sau review đã thêm và chạy:

| Gap | Case | Kết quả ngày 18/10/2026 |
| --- | --- | --- |
| Nháy kép escape | TC-25 | FAIL: còn ký tự nháy bao và escape trong mô tả |
| Newline trong trường nháy kép | TC-26 | FAIL: một dòng logic bị thành hai sản phẩm |
| CRLF | TC-27 | PASS: dữ liệu được giữ đúng |
| Tên chỉ dấu cách | TC-28 | PASS theo tiêu chí trim đề xuất; cần xác nhận oracle |
| Giá dương thập phân | TC-29/30 | PASS với 1.5 và 0.01 |
| Giá âm thập phân | TC-31 | FAIL: -0.01 vẫn được import |

TC-25/26 mở rộng bằng chứng cho BUG-14; TC-31 mở rộng BUG-18, không tăng số bug theo số test FAIL. Ảnh bằng chứng hiện hành: docs/bugs/review-fr16-TC-03.png, TC-25, TC-26, TC-31 (xem cập nhật lần hai).

BOM và giá có dấu phân cách địa phương còn cần làm rõ yêu cầu. Không tự áp đặt phải chấp nhận BOM hay hiểu 100.000 thành một trăm nghìn. Giới hạn tên 255 chỉ xuất hiện ở FR-15: đã rút TC-21 khỏi bộ chấm. BUG-19 đã kết luận không phải bug của FR-16.

## Cập nhật lần hai

| Gap | Nguyên nhân AI bỏ sót | Khắc phục |
| --- | --- | --- |
| Điểm on/off/in/out | Skill chỉ có BVA 3 giá trị. AI không phân biệt biên đóng (tên, số dòng) với biên mở (giá `> 0`), nên chưa chỉ ra on point của giá nằm ngoài miền | Phần A ở bước 3: A.1 tên, A.2 giá (on 0, off 0.01), A.3 số dòng; ánh xạ vào TC hiện có |
| Ảnh bằng chứng không chứng minh lỗi | Script chụp ngay sau khi bấm Import, chỉ thấy banner "Import hoàn tất"; năm ảnh của test khác nhau giống hệt nhau (cùng MD5). AI không mở ảnh ra kiểm tra | Script chụp lại bảng sản phẩm sau khi tải lại trang, hoặc trang chi tiết sản phẩm để thấy mô tả. Chỉ chụp test FAIL (TC-03, 25, 26, 31); bỏ ảnh của TC-27/29/30 vì các test này PASS |

Bài học: tách yêu cầu xác nhận, giả định và thăm dò; không ép giá dương thành số nguyên hoặc lấy giới hạn chức năng khác mà chưa xác nhận phạm vi.
