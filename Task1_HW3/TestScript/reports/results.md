# Kết quả kiểm thử GUI bằng Puppeteer

- Thời gian bắt đầu: 2026-11-14T01:25:59+07:00
- Thời gian kết thúc: 2026-11-14T01:27:10+07:00
- Base URL: http://localhost:5173
- Tổng số: 56
- Đạt: 15
- Không đạt: 41

| ID | Trường hợp kiểm thử | Kết quả | Thời gian | Lỗi / Ảnh chụp |
|---|---|---|---:|---|
| GUI-01 | Nhất quán ngôn ngữ trên ba màn hình | PASSED | 3040 ms | — |
| GUI-02 | Nút hành động tích cực dùng màu xanh dương | FAILED | 1983 ms | Nút Thêm vào giỏ hàng không có màu xanh dương  false !== true  — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-02.png |
| GUI-03 | Nút nguy hiểm dùng màu đỏ | FAILED | 1245 ms | Không tìm thấy header button có nội dung “Đăng xuất” — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-03.png |
| GUI-04 | Định dạng tiền tệ thống nhất | FAILED | 1133 ms | Không tìm thấy giá đúng định dạng tại / — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-04.png |
| GUI-05 | Mỗi trang có đúng một h1 | FAILED | 961 ms | Trang Danh sách không có đúng một h1  2 !== 1  — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-05.png |
| GUI-06 | Các thẻ sản phẩm được căn đều | PASSED | 1072 ms | — |
| GUI-07 | Ảnh sản phẩm không bị méo | PASSED | 2050 ms | — |
| GUI-08 | Nội dung không chồng lấn hoặc tràn khung | PASSED | 2049 ms | — |
| GUI-09 | Phân cấp chữ rõ ràng | PASSED | 711 ms | — |
| GUI-10 | Khoảng cách và căn chỉnh trong lưới đồng đều | PASSED | 1065 ms | — |
| GUI-11 | Bố cục responsive không tràn ngang | PASSED | 2628 ms | — |
| GUI-12 | Độ tương phản chữ đạt yêu cầu | FAILED | 1164 ms | Độ tương phản 3.92:1 không đạt cho “Chào, Test User” — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-12.png |
| GUI-13 | Trang Chi tiết có đủ thông tin sản phẩm | PASSED | 1102 ms | — |
| GUI-14 | Ô tìm kiếm có tên rõ ràng | FAILED | 1009 ms | Ô tìm kiếm không có label hoặc aria-label — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-14.png |
| GUI-15 | Nút Tìm và phím Enter gửi cùng một tìm kiếm | PASSED | 1422 ms | — |
| GUI-16 | Từ khóa tìm kiếm được hiển thị an toàn | FAILED | 1045 ms | HTML từ từ khóa đã được render  1 !== 0  — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-16.png |
| GUI-17 | Ô Số lượng chỉ nhận số nguyên dương | FAILED | 1186 ms | Ô số lượng phải có min=1  null !== '1'  — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-17.png |
| GUI-18 | Số lượng mặc định là 1 | PASSED | 1059 ms | — |
| GUI-19 | Số lượng không hợp lệ bị từ chối và có thông báo | FAILED | 1239 ms | Không có thông báo cho giá trị “” — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-19.png |
| GUI-20 | Trường Số lượng bắt buộc có dấu sao | FAILED | 1182 ms | Ô Số lượng chưa có thuộc tính required  false !== true  — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-20.png |
| GUI-21 | Thứ tự Tab ở trang Danh sách hợp lý | PASSED | 1058 ms | — |
| GUI-22 | Thứ tự Tab ở trang Chi tiết hợp lý | PASSED | 1073 ms | — |
| GUI-23 | Giỏ hàng có nút tăng giảm số lượng | FAILED | 1230 ms | Các nút hiện có: Xóa — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-23.png |
| GUI-24 | Logo EShop đưa về Danh sách sản phẩm | PASSED | 826 ms | — |
| GUI-25 | Thanh điều hướng làm nổi bật đúng trang | FAILED | 1123 ms | Phải có đúng một mục đang hoạt động tại /  0 !== 1  — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-25.png |
| GUI-26 | Giỏ hàng có badge số lượng đúng | FAILED | 959 ms | Badge Giỏ hàng chưa hiển thị số lượng 1 — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-26.png |
| GUI-27 | Nút đăng xuất có đúng nhãn | FAILED | 1176 ms | Nhãn hiện tại: Thoát — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-27.png |
| GUI-28 | Chi tiết sản phẩm có breadcrumb | FAILED | 1155 ms | Không có breadcrumb ở Chi tiết sản phẩm — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-28.png |
| GUI-29 | Giỏ hàng có breadcrumb | FAILED | 1229 ms | Không có breadcrumb ở Giỏ hàng — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-29.png |
| GUI-30 | Xem chi tiết mở đúng sản phẩm | PASSED | 1094 ms | — |
| GUI-31 | Tiếp tục mua sắm giữ nguyên giỏ hàng | FAILED | 1024 ms | Không tìm thấy main a, main button có nội dung “Tiếp tục mua sắm” — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-31.png |
| GUI-32 | Hiển thị trạng thái loading khi tải sản phẩm | FAILED | 301 ms | Không có trạng thái loading — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-32.png |
| GUI-33 | Tìm kiếm không có kết quả hiển thị Empty State | FAILED | 1120 ms | The input did not match the regular expression /không (có\|tìm thấy).*sản phẩm\|chưa có sản phẩm/i. Input:  'EShop Giỏ hàng Chào, Test User Thoát Danh sách sản phẩm Tìm © 2026 EShop SUT. Dành cho mục đích kiểm thử.'  — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-33.png |
| GUI-34 | Thêm từ thẻ sản phẩm có toast hoặc badge | FAILED | 1244 ms | Không có toast hoặc badge sau khi thêm giỏ — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-34.png |
| GUI-35 | Thêm từ Chi tiết có phản hồi ngay lần đầu | FAILED | 1242 ms | Lần bấm đầu chưa có phản hồi — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-35.png |
| GUI-36 | Thêm lại sản phẩm chỉ tăng số lượng | FAILED | 932 ms | Sản phẩm bị tạo thành hai dòng  2 !== 1  — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-36.png |
| GUI-37 | Nút cộng trừ cập nhật số lượng và thành tiền | FAILED | 880 ms | Không tìm thấy main table button có nội dung “+” — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-37.png |
| GUI-38 | Tổng tiền có đúng nhãn Tổng cộng | FAILED | 1244 ms | The input did not match the regular expression /Tổng cộng:\s*30\.000\.000 ₫/. Input:  'EShop Giỏ hàng Chào, Test User Thoát Giỏ Hàng Sản phẩm Giá Số lượng Thành tiền Thao tác iPhone 15 Pro Max 30.000.000 ₫ 1 30.000.000 ₫ Xóa Tổng tạm tính: 30.000.000 ₫ ← Mua tiếp Tiến hành thanh toán © 2026 EShop SUT. Dành cho mục đích kiểm thử.'  — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-38.png |
| GUI-39 | Xóa sản phẩm phải xác nhận trước | FAILED | 1369 ms | Không có hộp xác nhận xóa — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-39.png |
| GUI-40 | Giỏ hàng rỗng có hình, thông báo và nút quay lại | FAILED | 1154 ms | Giỏ hàng rỗng chưa có hình minh họa — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-40.png |
| GUI-41 | Ảnh sản phẩm có alt text phù hợp | FAILED | 1181 ms | Có ảnh trong danh sách thiếu alt text — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-41.png |
| GUI-42 | Nội dung dùng được khi phóng to 200% | FAILED | 916 ms | Trang / tràn khi zoom 200%: 728px > 720px — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-42.png |
| GUI-43 | Thông tin không chỉ được thể hiện bằng màu | FAILED | 1130 ms | Trang hiện tại chỉ dựa vào màu hoặc chưa có dấu hiệu ngoài màu — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-43.png |
| GUI-44 | Ô tìm kiếm và Số lượng có nhãn cho trình đọc màn hình | FAILED | 1136 ms | Ô tìm kiếm thiếu tên truy cập — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-44.png |
| GUI-45 | Lỗi số lượng được công nghệ hỗ trợ nhận biết | FAILED | 934 ms | Expected values to be strictly equal:  null !== 'true'  — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-45.png |
| GUI-46 | Toast hoặc badge nhất quán ở hai màn hình | FAILED | 1231 ms | Danh sách sản phẩm thiếu phản hồi — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-46.png |
| GUI-47 | Dialog xóa có đủ thông tin và nút Hủy | FAILED | 1389 ms | Hộp xác nhận không nêu sản phẩm cần xóa — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-47.png |
| GUI-48 | Các Empty State có hướng phục hồi | FAILED | 1266 ms | The input did not match the regular expression /không (có\|tìm thấy)\|trống/i. Input:  'EShop Giỏ hàng Chào, Test User Thoát Danh sách sản phẩm Tìm Kết quả tìm kiếm cho: khong-co-san-pham © 2026 EShop SUT. Dành cho mục đích kiểm thử.'  — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-48.png |
| GUI-49 | Có thể điều hướng toàn bộ luồng bằng bàn phím | FAILED | 1982 ms | Có control không có tên — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-49.png |
| GUI-50 | Trạng thái động được công bố cho công nghệ hỗ trợ | FAILED | 281 ms | Loading không có vùng thông báo trạng thái — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-50.png |
| GUI-51 | Trang có landmark, heading và bảng ngữ nghĩa | FAILED | 1221 ms | Expected values to be strictly equal:  2 !== 1  — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-51.png |
| GUI-52 | Bố cục không vỡ trong RTL | PASSED | 2786 ms | — |
| GUI-53 | Thứ tự và ký hiệu điều hướng đúng trong RTL | FAILED | 1070 ms | Bảng vẫn căn trái trong RTL — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-53.png |
| GUI-54 | Dark mode được áp dụng nhất quán | FAILED | 1166 ms | Nền chính chưa chuyển sang tối — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-54.png |
| GUI-55 | Dark mode giữ độ tương phản và trạng thái rõ ràng | FAILED | 1138 ms | Ứng dụng chưa bật dark mode — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-55.png |
| GUI-56 | Phản hồi hệ thống dễ nhìn trong dark mode | FAILED | 1122 ms | Ứng dụng chưa bật dark mode — D:\HK7\Tester\eshop-sut\Task1_HW3\TestScript\reports\screenshots\GUI-56.png |

