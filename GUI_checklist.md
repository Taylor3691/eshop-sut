# GUI Checklist

**Dự án:** EShop SUT  
**Màn hình chính / Luồng:** Chi tiết sản phẩm — Danh sách sản phẩm → Xem chi tiết → Chi tiết sản phẩm → Thêm vào giỏ hàng → Giỏ hàng  
**Các màn hình trong phạm vi:** Danh sách sản phẩm; Chi tiết sản phẩm; Giỏ hàng  
**Vai trò:** Khách hàng đã đăng nhập  
**Người rà soát:** Chưa cung cấp  
**Ngày:** 2026-11-14  
**Trạng thái:** Đã thiết kế — Chưa thực thi
## Checklist

| # | Màn hình / Trạng thái | Phân loại | Checkpoint | Tiêu chí xác minh | Đạt | Không đạt | Ghi chú / Minh chứng |
|---:|---|---|---|---|:---:|:---:|---|
| 1 | Cả ba màn hình | IA-01 (Tiêu chuẩn giao diện chung) | Nhất quán ngôn ngữ | Tất cả tiêu đề, nhãn, nút, thông báo và hướng dẫn dùng tiếng Việt; chỉ dùng tiếng Anh cho thuật ngữ kỹ thuật phổ biến. | ☐ | ☐ | — |
| 2 | Cả ba màn hình | IA-01 (Tiêu chuẩn giao diện chung) | Màu hành động tích cực | Các nút `Tìm`, `Thêm vào giỏ hàng` và `Tiến hành thanh toán` đều dùng màu xanh dương. | ☐ | ☐ | — |
| 3 | Giỏ hàng / Navbar | IA-01 (Tiêu chuẩn giao diện chung) | Màu hành động nguy hiểm | Các nút `Xóa` và `Đăng xuất` dùng màu đỏ, khác rõ với nút hành động tích cực. | ☐ | ☐ | — |
| 4 | Cả ba màn hình | IA-01 (Tiêu chuẩn giao diện chung) | Định dạng tiền tệ | Mọi số tiền có dạng như `30.000.000 ₫`; không dùng lẫn `VND` và `₫`. | ☐ | ☐ | — |
| 5 | Cả ba màn hình | IA-01 (Tiêu chuẩn giao diện chung) | Một tiêu đề cấp 1 | Mỗi trang có đúng một thẻ `<h1>` ghi đúng tên trang hoặc tên sản phẩm. | ☐ | ☐ | — |
| 6 | Danh sách sản phẩm / Có dữ liệu | IA-01 (Tiêu chuẩn giao diện chung) | Bố cục lưới sản phẩm | Các thẻ sản phẩm có cùng chiều rộng; ảnh, khoảng cách và nhóm nút được căn đều trong cùng một hàng. | ☐ | ☐ | — |
| 7 | Danh sách và Chi tiết sản phẩm | IA-01 (Tiêu chuẩn giao diện chung) | Tỷ lệ ảnh sản phẩm | Ảnh nằm gọn trong khung, không méo và không bị cắt mất phần quan trọng. | ☐ | ☐ | — |
| 8 | Cả ba màn hình | IA-01 (Tiêu chuẩn giao diện chung) | Không chồng lấn nội dung | Tiêu đề, ảnh, giá, nút, bảng và chân trang không đè lên nhau, không bị cắt hoặc tràn khỏi khung. | ☐ | ☐ | — |
| 9 | Cả ba màn hình | IA-01 (Tiêu chuẩn giao diện chung) | Phân cấp chữ | Tiêu đề, tên sản phẩm, giá, nhãn và nội dung có cỡ chữ, độ đậm rõ ràng và nhất quán. | ☐ | ☐ | — |
| 10 | Cả ba màn hình | IA-01 (Tiêu chuẩn giao diện chung) | Khoảng trắng và căn chỉnh | Các nội dung liên quan được căn thẳng hàng, cách đều và không bị tách quá xa nhau. | ☐ | ☐ | — |
| 11 | Cả ba màn hình / Responsive | IA-01 (Tiêu chuẩn giao diện chung) | Reflow theo viewport | Khi màn hình hẹp hơn, bố cục tự sắp xếp lại, không có thanh cuộn ngang và mọi nút vẫn dùng được. | ☐ | ☐ | — |
| 12 | Cả ba màn hình | IA-01 (Tiêu chuẩn giao diện chung) | Độ tương phản | Chữ thường đạt ít nhất 4.5:1, chữ lớn đạt ít nhất 3:1; chữ trên nút và liên kết luôn dễ đọc. | ☐ | ☐ | — |
| 13 | Chi tiết sản phẩm / Có dữ liệu | IA-01 (Tiêu chuẩn giao diện chung) | Đủ thông tin sản phẩm | Trang hiển thị đủ ảnh lớn, tên, giá, mô tả và danh mục của sản phẩm. | ☐ | ☐ | — |
| 14 | Danh sách sản phẩm | IA-02 (Form và control) | Nhận diện ô tìm kiếm | Ô tìm kiếm có tên rõ ràng để người dùng và trình đọc màn hình nhận biết; chữ gợi ý không thay thế cho nhãn. | ☐ | ☐ | — |
| 15 | Danh sách sản phẩm | IA-02 (Form và control) | Gửi tìm kiếm | Nhấn nút `Tìm` hoặc phím Enter cho cùng một kết quả và chỉ gửi tìm kiếm một lần. | ☐ | ☐ | — |
| 16 | Danh sách sản phẩm / Có từ khóa | IA-02 (Form và control) | Hiển thị an toàn từ khóa | Từ khóa được hiển thị như chữ thường; mã HTML hoặc script không được chạy. | ☐ | ☐ | — |
| 17 | Chi tiết sản phẩm | IA-02 (Form và control) | Kiểu dữ liệu số lượng | Ô `Số lượng` chỉ nhận số nguyên lớn hơn 0. | ☐ | ☐ | — |
| 18 | Chi tiết sản phẩm / Mặc định | IA-02 (Form và control) | Giá trị số lượng mặc định | Khi mở trang, ô `Số lượng` có sẵn giá trị `1`. | ☐ | ☐ | — |
| 19 | Chi tiết sản phẩm / Dữ liệu không hợp lệ | IA-02 (Form và control) | Validation số lượng | Không chấp nhận ô trống, chữ, số 0, số âm hoặc số thập phân; lỗi hiển thị trên nút `Thêm vào giỏ hàng`. | ☐ | ☐ | — |
| 20 | Chi tiết sản phẩm | IA-02 (Form và control) | Ký hiệu trường bắt buộc | Nếu bắt buộc nhập số lượng, nhãn `Số lượng` có dấu `*` và ý nghĩa của dấu này được giải thích. | ☐ | ☐ | — |
| 21 | Danh sách sản phẩm / Bàn phím | IA-02 (Form và control) | Tab order vùng tìm kiếm và card | Phím Tab đi từ ô tìm kiếm đến nút `Tìm`, rồi đến các nút sản phẩm theo thứ tự trên xuống dưới, trái sang phải. | ☐ | ☐ | — |
| 22 | Chi tiết sản phẩm / Bàn phím | IA-02 (Form và control) | Tab order vùng mua hàng | Phím Tab đi đến ô `Số lượng`, rồi đến nút `Thêm vào giỏ hàng`; không bỏ qua hoặc lặp bất thường. | ☐ | ☐ | — |
| 23 | Giỏ hàng / Có sản phẩm | IA-02 (Form và control) | Control tăng giảm số lượng | Mỗi sản phẩm có nút `-` và `+`; số lượng hiện tại hiển thị rõ cạnh hai nút. | ☐ | ☐ | — |
| 24 | Cả ba màn hình | IA-03 (Điều hướng) | Logo về trang danh sách | Nhấn logo `EShop` luôn đưa người dùng về trang Danh sách sản phẩm. | ☐ | ☐ | — |
| 25 | Cả ba màn hình | IA-03 (Điều hướng) | Highlight trang hiện tại | Thanh điều hướng làm nổi bật đúng trang đang mở và không làm nổi bật nhầm mục khác. | ☐ | ☐ | — |
| 26 | Cả ba màn hình / Có sản phẩm trong giỏ | IA-03 (Điều hướng) | Badge số lượng Giỏ hàng | Mục `Giỏ hàng` có badge hiển thị đúng số lượng và badge nằm sát mục này. | ☐ | ☐ | — |
| 27 | Cả ba màn hình / Đã đăng nhập | IA-03 (Điều hướng) | Nhãn Đăng xuất | Nút đăng xuất luôn có nhãn `Đăng xuất`, không dùng nhãn `Thoát`. | ☐ | ☐ | — |
| 28 | Chi tiết sản phẩm | IA-03 (Điều hướng) | Breadcrumb Chi tiết sản phẩm | Breadcrumb cho biết đường dẫn đến trang Chi tiết sản phẩm; người dùng có thể nhấn các cấp trước để quay lại. | ☐ | ☐ | — |
| 29 | Giỏ hàng | IA-03 (Điều hướng) | Breadcrumb Giỏ hàng | Trang Giỏ hàng có breadcrumb về trang gốc và làm rõ `Giỏ hàng` là trang hiện tại. | ☐ | ☐ | — |
| 30 | Danh sách → Chi tiết sản phẩm | IA-03 (Điều hướng) | Điều hướng Xem chi tiết | Nhấn `Xem chi tiết` mở đúng sản phẩm; tên, ảnh và giá khớp với thẻ đã chọn. | ☐ | ☐ | — |
| 31 | Giỏ hàng → Danh sách sản phẩm | IA-03 (Điều hướng) | Tiếp tục mua sắm | Nhấn `Tiếp tục mua sắm` quay về Danh sách sản phẩm và vẫn giữ nguyên giỏ hàng. | ☐ | ☐ | — |
| 32 | Danh sách sản phẩm / Đang tải | IA-04 (Phản hồi và trạng thái) | Trạng thái loading | Khi đang tải, trang hiển thị trạng thái chờ rõ ràng, không báo nhầm là không có dữ liệu và không gửi yêu cầu lặp. | ☐ | ☐ | — |
| 33 | Danh sách sản phẩm / Không có kết quả | IA-04 (Phản hồi và trạng thái) | Empty state tìm kiếm | Khi không có kết quả, trang hiển thị hình minh họa và thông báo tiếng Việt dễ hiểu. | ☐ | ☐ | — |
| 34 | Danh sách sản phẩm / Sau khi thêm giỏ | IA-04 (Phản hồi và trạng thái) | Phản hồi Thêm vào giỏ từ card | Sau khi nhấn `Thêm vào giỏ`, toast hoặc badge cho biết sản phẩm đã được thêm. | ☐ | ☐ | — |
| 35 | Chi tiết sản phẩm / Sau khi thêm giỏ | IA-04 (Phản hồi và trạng thái) | Phản hồi Thêm vào giỏ từ chi tiết | Sau khi thêm sản phẩm, toast hoặc badge xuất hiện, không che nút chính và có thể tự ẩn hoặc đóng. | ☐ | ☐ | — |
| 36 | Giỏ hàng / Thêm lại cùng sản phẩm | IA-04 (Phản hồi và trạng thái) | Gộp sản phẩm trùng | Thêm lại cùng sản phẩm chỉ tăng số lượng ở dòng hiện có, không tạo dòng mới. | ☐ | ☐ | — |
| 37 | Giỏ hàng / Thay đổi số lượng | IA-04 (Phản hồi và trạng thái) | Cập nhật thành tiền | Nhấn `+` hoặc `-` cập nhật ngay số lượng, thành tiền của sản phẩm và tổng cộng. | ☐ | ☐ | — |
| 38 | Giỏ hàng / Có sản phẩm | IA-04 (Phản hồi và trạng thái) | Nhãn tổng tiền chính xác | Tổng tiền có đúng nhãn `Tổng cộng`, không dùng `Tổng tạm tính`, và dễ phân biệt với tiền từng sản phẩm. | ☐ | ☐ | — |
| 39 | Giỏ hàng / Xóa sản phẩm | IA-04 (Phản hồi và trạng thái) | Dialog xác nhận xóa | Nhấn `Xóa` mở hộp xác nhận có nút đồng ý và hủy; chỉ xóa sản phẩm sau khi người dùng đồng ý. | ☐ | ☐ | — |
| 40 | Giỏ hàng / Rỗng | IA-04 (Phản hồi và trạng thái) | Empty state giỏ hàng | Giỏ hàng rỗng có hình minh họa, thông báo rõ ràng và nút quay lại mua sắm; không hiển thị bảng hoặc tổng tiền gây nhầm lẫn. | ☐ | ☐ | — |
| 41 | Danh sách và Chi tiết sản phẩm / DOM | IA-01 (Tiêu chuẩn giao diện chung) | Alt text ảnh sản phẩm | Mỗi ảnh sản phẩm có mô tả `alt` đúng với sản phẩm; ảnh chỉ để trang trí được bỏ qua bởi trình đọc màn hình. | ☐ | ☐ | — |
| 42 | Cả ba màn hình / Zoom 200% | IA-01 (Tiêu chuẩn giao diện chung) | Bảo toàn nội dung khi zoom | Khi phóng to 200%, nội dung và nút vẫn thấy rõ, không đè lên nhau và vẫn sử dụng được. | ☐ | ☐ | — |
| 43 | Cả ba màn hình | IA-01 (Tiêu chuẩn giao diện chung) | Không chỉ dựa vào màu sắc | Trang hiện tại, lỗi, nút nguy hiểm và thông báo có thêm chữ, biểu tượng hoặc đường viền; không chỉ dùng màu để phân biệt. | ☐ | ☐ | — |
| 44 | Danh sách và Chi tiết sản phẩm / DOM | IA-02 (Form và control) | Liên kết nhãn với control | Trình đọc màn hình đọc đúng tên, loại và giá trị của ô tìm kiếm và ô `Số lượng`. | ☐ | ☐ | — |
| 45 | Chi tiết sản phẩm / Lỗi số lượng | IA-02 (Form và control) | Lỗi có thể được công nghệ hỗ trợ nhận biết | Trình đọc màn hình đọc được lỗi số lượng; điểm chọn được giữ hoặc chuyển đến nơi giúp người dùng sửa lỗi. | ☐ | ☐ | — |
| 46 | Danh sách và Chi tiết sản phẩm / Sau khi thêm giỏ | IA-04 (Phản hồi và trạng thái) | Toast/badge nhất quán sau khi Thêm vào giỏ | Cả hai màn hình dùng toast hoặc badge giống nhau; thông báo đúng kết quả và badge cập nhật đúng số lượng. | ☐ | ☐ | — |
| 47 | Giỏ hàng / Xác nhận xóa | IA-04 (Phản hồi và trạng thái) | Dialog xác nhận xóa đầy đủ | Hộp xác nhận ghi rõ sản phẩm cần xóa, có nút `Xác nhận` và `Hủy`; chọn Hủy không làm đổi giỏ hàng. | ☐ | ☐ | — |
| 48 | Danh sách sản phẩm không có kết quả và Giỏ hàng rỗng | IA-04 (Phản hồi và trạng thái) | Empty State có hướng phục hồi | Mỗi trang trống có hình minh họa, thông báo dễ hiểu và nút phù hợp để tìm lại hoặc tiếp tục mua sắm. | ☐ | ☐ | — |
| 49 | Toàn bộ luồng / Chỉ dùng bàn phím | IA-03 (Điều hướng) | Điều hướng bàn phím đầy đủ | Có thể dùng bàn phím để đi đến và kích hoạt mọi nút, liên kết và ô nhập; điểm chọn luôn thấy rõ và không bị kẹt. | ☐ | ☐ | — |
| 50 | Danh sách và Chi tiết sản phẩm / Phản hồi động | IA-04 (Phản hồi và trạng thái) | Công bố trạng thái cho công nghệ hỗ trợ | Trình đọc màn hình thông báo đúng lúc khi đang tải, có lỗi, trang trống, thêm giỏ thành công hoặc badge thay đổi; không tự chuyển điểm chọn. | ☐ | ☐ | — |
| 51 | Cả ba màn hình / Cấu trúc ngữ nghĩa | IA-01 (Tiêu chuẩn giao diện chung) | Landmark, heading và bảng có ngữ nghĩa | Trang có các vùng đầu trang, điều hướng và nội dung chính rõ ràng; tiêu đề đúng thứ tự và cột Giỏ hàng gắn đúng với dữ liệu. | ☐ | ☐ | — |
| 52 | Cả ba màn hình / RTL | IA-01 (Tiêu chuẩn giao diện chung) | Bố cục thích ứng chiều phải sang trái | Ở chế độ chữ từ phải sang trái, các vùng giao diện đổi hướng đúng, không chồng lấn, bị cắt hoặc xuất hiện cuộn ngang. | ☐ | ☐ | — |
| 53 | Toàn bộ luồng / RTL | IA-03 (Điều hướng) | Thứ tự và ký hiệu điều hướng trong RTL | Ở chế độ phải sang trái, thứ tự đọc, thứ tự Tab và mũi tên quay lại đổi hướng đúng; số, giá và ký hiệu `₫` vẫn dễ đọc. | ☐ | ☐ | — |
| 54 | Cả ba màn hình / Dark mode | IA-01 (Tiêu chuẩn giao diện chung) | Áp dụng giao diện tối nhất quán | Khi bật chế độ tối, nền trang, thanh điều hướng, thẻ sản phẩm, bảng, ô nhập và chân trang đều chuyển sang màu tối phù hợp. | ☐ | ☐ | — |
| 55 | Cả ba màn hình / Dark mode | IA-01 (Tiêu chuẩn giao diện chung) | Độ tương phản và trạng thái tương tác trong dark mode | Trong chế độ tối, chữ, giá, liên kết, viền, biểu tượng và nút vẫn dễ đọc; trạng thái được chọn, bị khóa và báo lỗi vẫn rõ. | ☐ | ☐ | — |
| 56 | Loading, Empty State, toast/badge và dialog / Dark mode | IA-04 (Phản hồi và trạng thái) | Phản hồi hệ thống rõ ràng trong dark mode | Trong chế độ tối, trạng thái chờ, trang trống, toast, badge và hộp xác nhận vẫn dễ nhìn và các nút vẫn đọc rõ. | ☐ | ☐ | — |

## Ba mục bổ sung theo yêu cầu người dùng

| Mục | Yêu cầu được bổ sung | Vì sao cần bổ sung ngoài bộ ban đầu |
|---:|---|---|
| 46 | Sau khi bấm `Thêm vào giỏ`, phải có phản hồi trực quan bằng toast/badge. | Các mục #34 và #35 đã kiểm tra từng màn hình riêng, nhưng chưa kiểm tra tính nhất quán và việc badge phản ánh đúng số lượng giữa hai điểm thêm sản phẩm. |
| 47 | Khi xóa item khỏi giỏ phải có dialog xác nhận. | Mục #39 đã kiểm tra sự tồn tại của dialog, nhưng chưa bao phủ tên sản phẩm, quản lý focus và việc Hủy không làm thay đổi dữ liệu. |
| 48 | Empty State phải có icon/hình minh họa và message thân thiện. | Các mục #33 và #40 đã kiểm tra từng trạng thái rỗng, nhưng chưa kiểm tra thống nhất hành động phục hồi phù hợp cho từng ngữ cảnh. |

## Các phần AI thường bỏ sót được bổ sung

| Phần rà soát | Bao phủ đã có trong #1–#48 | Mục bổ sung | Khả năng triển khai kiểm thử |
|---|---|---|---|
| Accessibility | Đã có độ tương phản, Tab order, accessible name, alt text, zoom, không chỉ dựa vào màu, liên kết label và thông báo lỗi. | #49–#51 bổ sung điều hướng bàn phím toàn luồng, thông báo trạng thái động và cấu trúc ngữ nghĩa. | Có thể kiểm tra bằng bàn phím, accessibility tree/DOM và trình đọc màn hình. |
| RTL layout | Chưa có mục riêng. | #52–#53 kiểm tra reflow, thứ tự đọc/focus, biểu tượng điều hướng và dữ liệu số trong RTL. | Có thể kiểm tra bằng cách đặt `dir="rtl"` cho tài liệu và dùng nội dung RTL đại diện. |
| Dark mode | Chưa có mục riêng. | #54–#56 kiểm tra theme tối, độ tương phản/trạng thái tương tác và các phản hồi động. | Có thể kiểm tra qua theme của ứng dụng hoặc `prefers-color-scheme: dark`; nếu không có cơ chế kích hoạt thì ghi Không đạt khi thực thi. |

## Tổng hợp độ bao phủ

| Phân loại | AI tạo ban đầu | Bổ sung sau rà soát | Người dùng yêu cầu bổ sung | Bổ sung Accessibility/RTL/Dark mode | Tổng cộng |
|---|---:|---:|---:|---:|---:|
| IA-01 | 13 | 3 | 0 | 4 | 20 |
| IA-02 | 10 | 2 | 0 | 0 | 12 |
| IA-03 | 8 | 0 | 0 | 2 | 10 |
| IA-04 | 9 | 0 | 3 | 2 | 14 |
| **Tổng cộng** | **40** | **5** | **3** | **8** | **56** |

## Tổng hợp kết quả kiểm thử

- Đã thiết kế: 56
- Đã thực thi: 0
- Đạt: Chưa thực thi
- Không đạt: Chưa thực thi
- Lỗi đang mở: Chưa đánh giá
