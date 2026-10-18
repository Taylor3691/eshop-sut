# FR-15 — Product CRUD: Mobile Test Cases

**4 cases: 0 BVA + 4 Equivalence Partitioning/state checks.** Oracle: `README.md`, FR-15. Các case dùng ứng dụng mobile để kiểm tra sản phẩm sau thao tác CRUD do Admin thực hiện trên hệ thống.

## Scope

FR-15 mô tả quyền Admin thêm/xem/sửa/xóa sản phẩm và validation các trường. Ứng dụng `frontend-mobile` hiện là luồng mua sắm: xem danh sách, xem chi tiết và thêm vào giỏ; không có màn hình Admin CRUD. Vì vậy pool này chỉ kiểm tra dữ liệu sản phẩm được phản ánh đúng trên mobile sau khi CRUD qua kênh quản trị được hỗ trợ. Các form nhập và validation CRUD (`name`, `price`, `category`) cần test ở giao diện quản trị; không kết luận chúng đã được kiểm tra bằng mobile.

## Chuẩn bị

- Chạy backend, frontend-admin và Expo/mobile theo hướng dẫn dự án; với thiết bị thật, cấu hình `API_URL` tới địa chỉ LAN của backend trước khi chạy.
- Dùng môi trường test cô lập và sản phẩm thử; không sửa/xóa sản phẩm đang dùng thật.
- Đăng nhập Admin trên giao diện quản trị để chuẩn bị thao tác tạo/sửa/xóa. Trên mobile, mở catalog bằng tài khoản khách hàng hoặc luồng xem sản phẩm hiện hành.
- Ghi lại ID, tên, giá, danh mục và trạng thái trước/sau của sản phẩm thử; giữ một sản phẩm khác làm đối chứng.
- Backend startup có thể reset/reseed SQLite. Không khởi động backend trên DB có dữ liệu cần giữ.

## Danh sách Test Cases

| ID | Mục tiêu | Technique | Requirement |
|---|---|---|---|
| [TC-FR-15-PRODUCT-MOBILE-001](TC-FR-15-PRODUCT-MOBILE-001.md) | Sản phẩm mới tạo xuất hiện trên catalog mobile | Equivalence Partitioning | FR-15 (Create/View) |
| [TC-FR-15-PRODUCT-MOBILE-002](TC-FR-15-PRODUCT-MOBILE-002.md) | Thay đổi sản phẩm được phản ánh trên mobile | Equivalence Partitioning | FR-15 (Update/View) |
| [TC-FR-15-PRODUCT-MOBILE-003](TC-FR-15-PRODUCT-MOBILE-003.md) | Chỉ sản phẩm được sửa thay đổi; sản phẩm đối chứng giữ nguyên | Equivalence Partitioning | FR-15 (Update isolation) |
| [TC-FR-15-PRODUCT-MOBILE-004](TC-FR-15-PRODUCT-MOBILE-004.md) | Sản phẩm đã xóa không còn trong catalog mobile | State partition | FR-15 (Delete/View) |

## Cách ghi kết quả

Ghi model/OS hoặc emulator, build/app version nếu biết, ID sản phẩm, thao tác Admin đã thực hiện, dữ liệu mobile trước/sau và ảnh bằng chứng phù hợp. Chỉ Pass khi đối chiếu đủ sản phẩm thử và sản phẩm đối chứng. Ghi Blocked nếu mobile không kết nối được API hoặc không tạo được dữ liệu trạng thái ban đầu.

## Giới hạn / điểm cần bổ sung

- FR-15 không yêu cầu Admin CRUD trực tiếp trên mobile; không tạo expected result cho chức năng này.
- Mobile hiện hiển thị tên, giá và mô tả ở chi tiết sản phẩm; không thấy category trên màn hình chi tiết. Kiểm tra category và validation CRUD phải thực hiện ở admin web/API theo test plan tương ứng.
- FR-15 nêu tên tối đa 255 ký tự và giá dương, nhưng pool mobile không nhập các giá trị đó. BVA/validation cho độ dài tên, giá `0`/giá dương và category bắt buộc cần case riêng cho giao diện Admin.
- Thời gian đồng bộ/cache và hành vi khi mở chi tiết của ID đã xóa chưa được FR-15 quy định; các case chỉ yêu cầu trạng thái sau khi tải lại catalog.
