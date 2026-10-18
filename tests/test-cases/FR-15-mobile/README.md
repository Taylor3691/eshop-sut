# FR-15 — Product CRUD: Mobile Test Cases

**10 cases: 4 BVA + 6 Equivalence Partitioning/state checks.** Oracle: `README.md`, FR-15. Các case dùng ứng dụng mobile để kiểm tra sản phẩm sau thao tác CRUD do Admin thực hiện; validation cases dùng Admin API rồi xác nhận dữ liệu không hợp lệ không xuất hiện trên mobile.

## Scope

FR-15 mô tả quyền Admin thêm/xem/sửa/xóa sản phẩm và validation các trường. Ứng dụng `frontend-mobile` hiện là luồng mua sắm: xem danh sách, xem chi tiết và thêm vào giỏ; không có màn hình Admin CRUD. Các TC CRUD dùng Admin UI để chuẩn bị dữ liệu rồi kiểm tra kết quả trên mobile. Các TC validation bổ sung gửi request tới Admin API bằng token admin hợp lệ, rồi xác nhận sản phẩm không hợp lệ không được tạo/hiển thị trên mobile; chúng không kiểm tra form nhập trực tiếp trên app mobile.

Phân tích domain và traceability: [FR15-mobile-domain-testing.md](FR15-mobile-domain-testing.md).

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
| [TC-FR-15-PRODUCT-MOBILE-005](TC-FR-15-PRODUCT-MOBILE-005.md) | Chấp nhận tên sản phẩm dài 254 hoặc 255 ký tự | BVA | FR-15 (name max 255) |
| [TC-FR-15-PRODUCT-MOBILE-006](TC-FR-15-PRODUCT-MOBILE-006.md) | Từ chối tên sản phẩm dài 256 ký tự | BVA | FR-15 (name max 255) |
| [TC-FR-15-PRODUCT-MOBILE-007](TC-FR-15-PRODUCT-MOBILE-007.md) | Từ chối tên sản phẩm rỗng | Equivalence Partitioning | FR-15 (name required) |
| [TC-FR-15-PRODUCT-MOBILE-008](TC-FR-15-PRODUCT-MOBILE-008.md) | Chấp nhận giá dương 1 ₫ | BVA representative | FR-15 (price > 0) |
| [TC-FR-15-PRODUCT-MOBILE-009](TC-FR-15-PRODUCT-MOBILE-009.md) | Từ chối giá bằng hoặc nhỏ hơn 0 | BVA / Equivalence Partitioning | FR-15 (price > 0) |
| [TC-FR-15-PRODUCT-MOBILE-010](TC-FR-15-PRODUCT-MOBILE-010.md) | Từ chối sản phẩm không có danh mục | Equivalence Partitioning | FR-15 (category required) |

## Cách ghi kết quả

Ghi model/OS hoặc emulator, build/app version nếu biết, ID sản phẩm, thao tác Admin đã thực hiện, dữ liệu mobile trước/sau và ảnh bằng chứng phù hợp. Chỉ Pass khi đối chiếu đủ sản phẩm thử và sản phẩm đối chứng. Ghi Blocked nếu mobile không kết nối được API hoặc không tạo được dữ liệu trạng thái ban đầu.

## Giới hạn / điểm cần bổ sung

- FR-15 không yêu cầu Admin CRUD trực tiếp trên mobile; không tạo expected result cho chức năng này.
- Mobile hiện hiển thị tên, giá và mô tả ở chi tiết sản phẩm; không thấy category trên màn hình chi tiết. Kiểm tra category và validation CRUD phải thực hiện ở admin web/API theo test plan tương ứng.
- Các boundary validation được kiểm tra qua Admin API; không thể nhập trực tiếp trên app mobile vì app không có CRUD Admin.
- Thời gian đồng bộ/cache và hành vi khi mở chi tiết của ID đã xóa chưa được FR-15 quy định; các case chỉ yêu cầu trạng thái sau khi tải lại catalog.
