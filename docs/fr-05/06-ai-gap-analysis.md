# FR-05 web — AI gap analysis sau review

Prompt cũ yêu cầu giá, danh mục và phân trang nên AI sinh miền ngoài FR-05. Đã bỏ mô hình đó; TC-23..26/46 không áp dụng, không còn BLOCKED. Các query thừa còn lại chỉ là kiểm tra độ bền bổ sung.

AI tự suy ra phải phân biệt hoa thường/dấu dù spec im lặng. Đã sửa TC-04/05/07: chấp nhận rỗng hoặc sản phẩm tương ứng, yêu cầu empty state khi rỗng; không áp đặt chính sách chuẩn hóa. TC-27 cho phép trim hoặc giữ khoảng trắng vì spec chưa chốt.

| Gap gốc | Nguyên nhân | Khắc phục hiện hành |
| --- | --- | --- |
| &, #, ? trong từ khóa | Prompt chỉ liệt kê SQL/HTML | URL-01..03, TC-47..49; đã chạy, xem kết quả |
| Ảnh giữ tỷ lệ | Prompt tập trung dữ liệu tìm kiếm | TC-50/51 kiểm tra CSS giữ tỷ lệ; chưa đánh giá mọi nguồn ảnh |
| Grid và viewport | Chưa đưa điều kiện UI vào mô hình | TC-50/51 kiểm tra desktop và màn hẹp; không bịa số cột |
| Điểm on/off/in/out | Prompt và skill chỉ mô tả BVA 3 giá trị; AI coi BVA là đủ cho domain testing và chỉ ghi "chưa chọn điểm on/off" | Thêm phần A ở bước 3 cho hai biên có thứ tự (độ dài từ khóa, số sản phẩm). Skill được bổ sung bước này |
| Số sản phẩm trong CSDL 0/1/2 | Bước 1 đã liệt kê biến nhưng AI không đưa sang bước 2/3, vì prompt tập trung vào từ khóa | CAT-VEC-01/02, CAT-B-01..03, TC-52..54. TC-52 FAIL: CSDL rỗng không có trang trống (mở rộng BUG-05) |
| Test query thừa bị tính vào tổng | AI giữ test cũ để "không mất truy vết" và cộng thẳng vào summary | Summary tách 26 test chức năng và 23 kiểm tra bổ sung |

254/255/256 ký tự giữ làm mẫu chuỗi dài, không gọi là biên trên search. Bản chạy cũ được lưu trong docs/history/2026-10-15/ để truy vết sự sửa oracle.
