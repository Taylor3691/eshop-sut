# Dữ liệu thử Import CSV (FR-16)

| File | Mục đích | Kết quả mong đợi theo spec |
|---|---|---|
| 01-valid-3-rows.csv | Hợp lệ, có trường chứa dấu phẩy bọc nháy kép (RFC 4180) | Import 3 dòng, báo cáo 3 thành công |
| 02-invalid-negative-price.csv | Dòng 2 giá âm | Rollback toàn bộ (0 dòng được thêm), báo lỗi dòng 2 |
| 03-invalid-empty-name.csv | Dòng 1 thiếu name | Rollback toàn bộ, báo lỗi dòng 1 |
| 04-boundary-price-zero.csv | Biên giá = 0 | Từ chối (giá phải > 0) |
| 05-wrong-header.csv | Header sai | Từ chối, thông báo header không hợp lệ |
| 06-wrong-extension.txt | Sai đuôi file | Từ chối, chỉ nhận .csv |
| 07-name-255-256.csv | Biên độ dài tên 255/256 | 255 hợp lệ, 256 bị từ chối → rollback |
| 08-html-escape.csv | HTML trong dữ liệu | Hiển thị dạng text, không render HTML |
