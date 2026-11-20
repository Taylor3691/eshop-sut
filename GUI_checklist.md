# GUI Checklist

**Dự án:** EShop SUT  
**Màn hình chính / Luồng:** Chi tiết sản phẩm — Danh sách sản phẩm → Nhấn **Xem chi tiết** → Chi tiết sản phẩm → Nhấn **Thêm vào giỏ hàng** → Giỏ hàng  
**Các màn hình trong phạm vi:** Danh sách sản phẩm; Chi tiết sản phẩm; Giỏ hàng  
**Vai trò:** Khách hàng đã đăng nhập  
**Người rà soát:** Võ Hoàng Danh  
**Ngày:** 16/11/2026  
**Nền tảng / Viewport:** Chrome trên Windows, 1440 × 900  
**Ảnh tham chiếu:** `MH_DanhSachSanPham.png`, `MH_ChiTietSanPham.png`, `MH_GioHang.png`  
**Trạng thái:** Đã thiết kế — Chưa thực thi

## Checklist

| # | Màn hình / Trạng thái | Phân loại | Checkpoint | Tiêu chí xác minh | Đạt | Không đạt | Ghi chú / Minh chứng |
|---:|---|---|---|---|:---:|:---:|---|
| 1 | Danh sách sản phẩm | IA-01 (Tiêu chuẩn giao diện chung) | Ngôn ngữ giao diện | Toàn bộ nhãn, tiêu đề, nút và placeholder dùng tiếng Việt, trừ thuật ngữ kỹ thuật chuẩn. [FR-21] | ☐ | ☐ | — |
| 2 | Chi tiết sản phẩm | IA-01 (Tiêu chuẩn giao diện chung) | Ngôn ngữ giao diện | Nội dung hiển thị và nhãn **Số lượng**, **Thêm vào giỏ hàng** dùng tiếng Việt nhất quán. [FR-21] | ☐ | ☐ | — |
| 3 | Giỏ hàng | IA-01 (Tiêu chuẩn giao diện chung) | Ngôn ngữ giao diện | Tiêu đề, cột bảng, tổng tiền và các nút thao tác dùng tiếng Việt nhất quán. [FR-21] | ☐ | ☐ | — |
| 4 | Danh sách sản phẩm | IA-01 (Tiêu chuẩn giao diện chung) | Tiêu đề trang | Trang có đúng một phần tử `<h1>` mô tả danh sách sản phẩm. [FR-05, FR-21] | ☐ | ☐ | — |
| 5 | Chi tiết sản phẩm | IA-01 (Tiêu chuẩn giao diện chung) | Tiêu đề trang | Trang có đúng một `<h1>` mô tả sản phẩm đang xem; tên sản phẩm hiển thị đầy đủ, không bị che khuất hay cắt mất nghĩa. [FR-06, FR-21] | ☐ | ☐ | — |
| 6 | Giỏ hàng | IA-01 (Tiêu chuẩn giao diện chung) | Tiêu đề trang | Trang có đúng một `<h1>` mô tả Giỏ hàng. [FR-21] | ☐ | ☐ | — |
| 7 | Danh sách sản phẩm | IA-01 (Tiêu chuẩn giao diện chung) | Lưới sản phẩm | Mỗi thẻ sản phẩm hiển thị ảnh theo tỷ lệ nhất quán, tên và giá; các thẻ không chồng lấn ở viewport đã nêu. [FR-05] | ☐ | ☐ | — |
| 8 | Danh sách sản phẩm | IA-01 (Tiêu chuẩn giao diện chung) | Định dạng tiền | Giá từng sản phẩm dùng ký hiệu `₫` và phân tách hàng nghìn nhất quán. [FR-05, FR-21] | ☐ | ☐ | — |
| 9 | Chi tiết sản phẩm | IA-01 (Tiêu chuẩn giao diện chung) | Thông tin sản phẩm | Hiển thị ảnh lớn, tên, giá, mô tả và danh mục của sản phẩm; các thông tin này đọc được và không tràn bố cục. [FR-06] | ☐ | ☐ | — |
| 10 | Chi tiết sản phẩm | IA-01 (Tiêu chuẩn giao diện chung) | Định dạng tiền | Giá sản phẩm dùng ký hiệu `₫` và phân tách hàng nghìn nhất quán với danh sách và giỏ hàng. [FR-21] | ☐ | ☐ | — |
| 11 | Giỏ hàng | IA-01 (Tiêu chuẩn giao diện chung) | Bảng giỏ hàng | Các cột Sản phẩm, Đơn giá, Số lượng, Thành tiền và Thao tác được căn chỉnh rõ với dữ liệu ở mỗi dòng. [FR-07] | ☐ | ☐ | — |
| 12 | Giỏ hàng | IA-01 (Tiêu chuẩn giao diện chung) | Tổng tiền | Tổng tiền dùng ký hiệu `₫`, phân tách hàng nghìn và nhãn chính xác **Tổng cộng**. [FR-07, FR-21] | ☐ | ☐ | — |
| 13 | Cả ba màn hình | IA-01 (Tiêu chuẩn giao diện chung) | Khả năng đọc | Văn bản có độ tương phản đủ với nền và không chỉ truyền đạt ý nghĩa bằng màu sắc (ví dụ giá, thao tác xóa, trạng thái chọn). [WCAG 2.2 SC 1.4.3, 1.4.1 — bổ sung sau rà soát] | ☐ | ☐ | — |
| 14 | Chi tiết sản phẩm — mặc định | IA-02 (Form và control) | Ô Số lượng | Có nhãn hiển thị rõ **Số lượng** gắn với ô nhập; giá trị mặc định là 1. [FR-06] | ☐ | ☐ | — |
| 15 | Chi tiết sản phẩm — nhập hợp lệ | IA-02 (Form và control) | Kiểu dữ liệu số lượng | Ô Số lượng chỉ chấp nhận số nguyên dương và giới hạn nhỏ nhất là 1. [FR-06] | ☐ | ☐ | — |
| 16 | Chi tiết sản phẩm — nhập không hợp lệ | IA-02 (Form và control) | Xác thực số lượng | Khi để trống, nhập 0, số âm, số thập phân hoặc ký tự không phải số, hệ thống chặn thao tác thêm giỏ và nêu lỗi cụ thể. [FR-06; heuristic phòng ngừa lỗi] | ☐ | ☐ | — |
| 17 | Chi tiết sản phẩm — lỗi số lượng | IA-02 (Form và control) | Vị trí lỗi | Thông báo lỗi số lượng xuất hiện gần trường lỗi và phía trên nút **Thêm vào giỏ hàng**, không che control. [FR-22; heuristic khả năng hiển thị lỗi] | ☐ | ☐ | — |
| 18 | Chi tiết sản phẩm | IA-02 (Form và control) | Trạng thái lỗi | Trường lỗi được nhận biết bằng văn bản/thông báo và trạng thái lập trình phù hợp, không chỉ thay đổi màu viền. [WCAG 2.2 SC 3.3.1, 1.4.1 — bổ sung sau rà soát] | ☐ | ☐ | — |
| 19 | Chi tiết sản phẩm | IA-02 (Form và control) | Điều khiển bằng bàn phím | Có thể focus, thay đổi giá trị số lượng và kích hoạt nút thêm giỏ chỉ bằng bàn phím; focus nhìn thấy rõ. [WCAG 2.2 SC 2.1.1, 2.4.7 — bổ sung sau rà soát] | ☐ | ☐ | — |
| 20 | Danh sách sản phẩm — tìm kiếm | IA-02 (Form và control) | Nhãn tìm kiếm | Ô tìm kiếm có nhãn lập trình hoặc accessible name mô tả mục đích; placeholder không là nguồn nhãn duy nhất. [FR-05; WCAG 2.2 SC 3.3.2 — bổ sung sau rà soát] | ☐ | ☐ | — |
| 21 | Danh sách sản phẩm — tìm kiếm | IA-02 (Form và control) | Gửi tìm kiếm | Có thể gửi truy vấn bằng nút **Tìm** và phím Enter; nút có nhãn rõ ràng. [FR-05; heuristic tính linh hoạt sử dụng] | ☐ | ☐ | — |
| 22 | Danh sách sản phẩm — tìm kiếm | IA-02 (Form và control) | An toàn hiển thị truy vấn | Từ khóa tìm kiếm được hiển thị/diễn giải dạng văn bản an toàn, không render HTML do người dùng nhập. [FR-05] | ☐ | ☐ | — |
| 23 | Danh sách sản phẩm — tìm kiếm | IA-02 (Form và control) | Giá trị truy vấn | Sau khi tìm, ô tìm kiếm duy trì từ khóa hiện hành hoặc trang hiển thị rõ từ khóa đã áp dụng để người dùng đối chiếu kết quả. [FR-05; heuristic khả năng nhìn thấy trạng thái — bổ sung sau rà soát] | ☐ | ☐ | — |
| 24 | Danh sách sản phẩm | IA-03 (Điều hướng) | Truy cập chi tiết | Mỗi sản phẩm có control **Xem chi tiết** xác định được sản phẩm đích và điều hướng đến đúng trang chi tiết khi kích hoạt. [FR-05, FR-06] | ☐ | ☐ | — |
| 25 | Danh sách sản phẩm | IA-03 (Điều hướng) | Thứ tự Tab | Tab đi theo thứ tự trực quan từ trên xuống dưới, trái sang phải: navbar, tìm kiếm, rồi từng thẻ và control trong thẻ. [FR-21] | ☐ | ☐ | — |
| 26 | Chi tiết sản phẩm | IA-03 (Điều hướng) | Breadcrumb | Có breadcrumb thể hiện vị trí trang Chi tiết sản phẩm và cho phép trở lại cấp Danh sách sản phẩm. [FR-23] | ☐ | ☐ | — |
| 27 | Chi tiết sản phẩm | IA-03 (Điều hướng) | Thứ tự Tab | Tab đi từ navbar/breadcrumb đến ô Số lượng rồi nút **Thêm vào giỏ hàng**, không bỏ qua control hoặc tạo bẫy focus. [FR-21; WCAG 2.2 SC 2.1.2 — bổ sung sau rà soát] | ☐ | ☐ | — |
| 28 | Giỏ hàng | IA-03 (Điều hướng) | Breadcrumb | Có breadcrumb thể hiện vị trí trang Giỏ hàng và liên kết quay lại cấp trước phù hợp. [FR-23] | ☐ | ☐ | — |
| 29 | Giỏ hàng | IA-03 (Điều hướng) | Tiếp tục mua sắm | Có nút **Tiếp tục mua sắm** dẫn về trang chủ/danh sách sản phẩm theo FR-07; nhãn nêu rõ đích đến. [FR-07] | ☐ | ☐ | — |
| 30 | Giỏ hàng | IA-03 (Điều hướng) | Thanh toán | Nút **Tiến hành thanh toán** là control điều hướng rõ ràng đến bước thanh toán cho người dùng đã đăng nhập. [FR-08] | ☐ | ☐ | — |
| 31 | Cả ba màn hình — navbar | IA-03 (Điều hướng) | Trang đang chọn | Navbar highlight rõ trang hiện tại; khi ở trang con, quy tắc highlight được áp dụng nhất quán và không gây hiểu nhầm. [FR-23] | ☐ | ☐ | — |
| 32 | Cả ba màn hình — navbar | IA-03 (Điều hướng) | Link Giỏ hàng | Link **Giỏ hàng** có badge số lượng sản phẩm hiện có; badge cập nhật theo trạng thái giỏ. [FR-23] | ☐ | ☐ | — |
| 33 | Cả ba màn hình — navbar | IA-03 (Điều hướng) | Đăng xuất | Control kết thúc phiên có nhãn đúng là **Đăng xuất**, không dùng nhãn **Thoát**. [FR-23] | ☐ | ☐ | — |
| 34 | Cả ba màn hình — navbar | IA-03 (Điều hướng) | Nhận biết focus | Mọi liên kết và nút navbar có chỉ báo focus bàn phím nhìn thấy rõ, kể cả trạng thái đang chọn. [WCAG 2.2 SC 2.4.7 — bổ sung sau rà soát] | ☐ | ☐ | — |
| 35 | Giỏ hàng | IA-03 (Điều hướng) | Thứ tự Tab | Tab đi theo dòng đọc: breadcrumb/navbar, cột hoặc control trong từng dòng giỏ, **Tiếp tục mua sắm**, rồi **Tiến hành thanh toán**. [FR-21] | ☐ | ☐ | — |
| 36 | Cả ba màn hình | IA-03 (Điều hướng) | Tiêu điểm và tiêu đề khi chuyển trang | Sau điều hướng bằng **Xem chi tiết**, breadcrumb, hoặc navbar, tiêu điểm được đặt tại vùng nội dung/tiêu đề mới để người dùng bàn phím và trình đọc màn hình nhận biết trang đã đổi. [WCAG 2.2 SC 2.4.3, 2.4.6 — bổ sung sau rà soát] | ☐ | ☐ | — |
| 37 | Danh sách sản phẩm — đang tải | IA-04 (Phản hồi và trạng thái) | Loading | Khi tải danh sách hoặc kết quả tìm kiếm, có trạng thái loading dễ nhận biết và nội dung không bị hiểu nhầm là danh sách hoàn chỉnh. [FR-05] | ☐ | ☐ | — |
| 38 | Danh sách sản phẩm — không có kết quả | IA-04 (Phản hồi và trạng thái) | Empty state tìm kiếm | Khi không tìm thấy sản phẩm, hiển thị empty state nêu rõ không có kết quả và có icon/hình minh họa phù hợp. [FR-05, FR-24] | ☐ | ☐ | — |
| 39 | Chi tiết sản phẩm — sau thêm giỏ hợp lệ | IA-04 (Phản hồi và trạng thái) | Phản hồi thêm giỏ | Sau khi bấm **Thêm vào giỏ hàng**, có phản hồi trực quan kịp thời như toast hoặc badge cập nhật, xác định thao tác đã được tiếp nhận. [FR-06, FR-24] | ☐ | ☐ | — |
| 40 | Chi tiết sản phẩm — sau thêm giỏ hợp lệ | IA-04 (Phản hồi và trạng thái) | Thông báo cho công nghệ hỗ trợ | Toast/phản hồi thêm giỏ có role hoặc live region phù hợp để trình đọc màn hình nhận biết mà không tự động giành focus. [WCAG 2.2 SC 4.1.3 — bổ sung sau rà soát] | ☐ | ☐ | — |
| 41 | Danh sách sản phẩm / Chi tiết sản phẩm | IA-04 (Phản hồi và trạng thái) | Ảnh sản phẩm | Mỗi ảnh sản phẩm có `alt` mô tả nội dung/hình ảnh sản phẩm, không để trống; alt phù hợp với sản phẩm đang hiển thị. [FR-05, FR-24] | ☐ | ☐ | — |
| 42 | Danh sách sản phẩm — thêm giỏ | IA-04 (Phản hồi và trạng thái) | Phản hồi thêm trực tiếp | Khi dùng **Thêm vào giỏ** từ một thẻ sản phẩm, có phản hồi trực quan và badge giỏ cập nhật. [FR-24] | ☐ | ☐ | — |
| 43 | Giỏ hàng — một mặt hàng | IA-04 (Phản hồi và trạng thái) | Dữ liệu dòng giỏ | Dòng giỏ phản ánh đúng sản phẩm, đơn giá, số lượng, thành tiền; thành tiền được tính theo đơn giá × số lượng. [FR-07] | ☐ | ☐ | — |
| 44 | Giỏ hàng — thêm lại cùng sản phẩm | IA-04 (Phản hồi và trạng thái) | Gộp sản phẩm trùng | Thêm cùng một sản phẩm lần nữa làm tăng số lượng ở dòng hiện có, không tạo một dòng sản phẩm trùng. [FR-07] | ☐ | ☐ | — |
| 45 | Giỏ hàng — thay đổi số lượng | IA-04 (Phản hồi và trạng thái) | Điều chỉnh số lượng | Mỗi dòng có nút `+` và `−` để điều chỉnh số lượng; sau điều chỉnh, thành tiền, tổng cộng và badge giỏ được cập nhật nhất quán. [FR-07, FR-23] | ☐ | ☐ | — |
| 46 | Giỏ hàng — xác nhận xóa | IA-04 (Phản hồi và trạng thái) | Dialog xóa | Bấm **Xóa sản phẩm** mở dialog xác nhận trước khi xóa; dialog nêu rõ sản phẩm/hành động, có lựa chọn xác nhận và hủy, và focus được giữ trong dialog rồi trả về control gọi. [FR-07, FR-24; WCAG 2.2 SC 2.4.3 — bổ sung sau rà soát] | ☐ | ☐ | — |
| 47 | Giỏ hàng — sau xác nhận xóa | IA-04 (Phản hồi và trạng thái) | Phản hồi xóa | Sau khi xác nhận xóa, dòng sản phẩm, thành tiền, **Tổng cộng** và badge giỏ cập nhật; sau hủy, dữ liệu giỏ giữ nguyên. [FR-07, FR-23, FR-24] | ☐ | ☐ | — |
| 48 | Giỏ hàng — trống | IA-04 (Phản hồi và trạng thái) | Empty state giỏ | Khi không còn sản phẩm, hiển thị icon/hình minh họa cùng thông báo rõ ràng và một cách tiếp tục mua sắm. [FR-07, FR-24] | ☐ | ☐ | — |
| 49 | Giỏ hàng — đang cập nhật | IA-04 (Phản hồi và trạng thái) | Trạng thái thao tác bất đồng bộ | Trong lúc cập nhật số lượng, xóa hoặc chuyển thanh toán, control liên quan thể hiện đang xử lý và ngăn gửi lặp ngoài ý muốn; kết thúc phải thông báo kết quả. [Heuristic Nielsen: visibility of system status, error prevention — bổ sung sau rà soát] | ☐ | ☐ | — |
| 50 | Cả ba màn hình — lỗi tải dữ liệu | IA-04 (Phản hồi và trạng thái) | Lỗi có thể khôi phục | Nếu tải sản phẩm/giỏ thất bại, hiển thị thông điệp dễ hiểu, không làm mất ngữ cảnh và cung cấp hành động thử lại hoặc đường đi thay thế. [Heuristic Nielsen: help users recognize, diagnose, and recover from errors — bổ sung sau rà soát] | ☐ | ☐ | — |

## Rà soát phản biện và mục bổ sung

Các mục 13, 18–20, 23, 27, 34, 36, 40, 46, 49 và 50 được bổ sung sau lượt tạo ban đầu. Lượt đầu tập trung vào các control và yêu cầu nghiệp vụ nhìn thấy trong ảnh nên có thể bỏ sót tiêu chí không thể xác định chỉ bằng ảnh tĩnh: độ tương phản, lỗi không chỉ bằng màu, nhãn lập trình, vận hành bằng bàn phím, focus, live region, quản lý focus dialog và phục hồi lỗi. Các mục này bổ sung khả năng tiếp cận, phản hồi bất đồng bộ và phục hồi lỗi mà vẫn gắn với các control thuộc phạm vi đã chọn.

## Giả định và mâu thuẫn nguồn

- Ảnh là ngữ cảnh để nhận diện màn hình/trạng thái, không phải bằng chứng Đạt/Không đạt; mọi ô kết quả giữ trống để thực thi sau.
- Checklist kiểm tra các trạng thái chưa có ảnh (loading, không có kết quả, giỏ trống, lỗi nhập, dialog xóa) vì chúng được yêu cầu trực tiếp trong FR-05, FR-06, FR-07 và FR-24.
- Ảnh có thể hiển thị nhãn/định dạng khác một số yêu cầu (ví dụ **Thoát**, **Tổng tạm tính**, `VND`, hoặc thiếu breadcrumb/badge). Theo thứ tự ưu tiên, tiêu chí vẫn dùng yêu cầu chính thức của `README.md`; đây không phải kết luận lỗi.
- Chỉ Chrome trên Windows tại 1440 × 900 nằm trong phạm vi. Responsive, dark mode, RTL và các trình duyệt/nền tảng khác không được kết luận trong checklist này.

## Tổng hợp kết quả kiểm thử

- Đã thiết kế: 50 mục checklist
- Phân bố: IA-01: 13; IA-02: 10; IA-03: 13; IA-04: 14
- Đã thực thi: 0
- Đạt: Chưa thực thi
- Không đạt: Chưa thực thi
- Lỗi đang mở: Chưa đánh giá
