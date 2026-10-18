# GitHub issue drafts — FR-13 và FR-15

Tổng hợp theo [test run FR-13](../test-runs/FR-13/FR13-dashboard-test-run-001.md) và [test run FR-15 Mobile](../test-runs/FR-15-mobile/FR15-mobile-test-run-001.md). Các phát hiện dưới đây chủ yếu dựa trên rà soát mã nguồn/schema; test run chưa ghi nhận xác nhận runtime, số liệu quan sát hoặc ảnh chụp. Hãy xác nhận trên môi trường chạy trước khi báo cáo là lỗi đã tái hiện.

---

## [BUG][FR-13] Doanh thu đơn `delivered` bị cộng gấp đôi trên Dashboard

**Mức độ đề xuất:** Major  
**Test case liên quan:** `TC-FR-13-DASHBOARD-001`, `TC-FR-13-DASHBOARD-006`

### Các bước tái hiện

1. Chuẩn bị dữ liệu có ít nhất một đơn trạng thái `delivered`; ghi lại `total_amount` của từng đơn.
2. Đăng nhập với tài khoản admin và mở Dashboard.
3. So sánh doanh thu hiển thị với tổng `total_amount` của các đơn `delivered`.

### Kết quả thực tế

Theo rà soát mã nguồn được ghi trong test run, phép tính `totalRevenue` cộng `o.total_amount * 2` cho mỗi đơn `delivered`, khiến doanh thu đơn đó bị tính hai lần.

### Kết quả mong đợi

Mỗi đơn `delivered` đóng góp `total_amount` đúng một lần vào doanh thu Dashboard.

### Bằng chứng

Test run FR-13 đánh dấu TC-001 và TC-006 Fail, với ghi nhận phép tính nhân đôi doanh thu. Chưa có số liệu runtime hoặc ảnh chụp trong báo cáo.

### Đề xuất sửa

Cộng `total_amount` một lần cho mỗi đơn đủ điều kiện và xác nhận lại bằng dữ liệu có doanh thu đã tính trước.

---

## [BUG][FR-15 Mobile] API chấp nhận tên sản phẩm dài hơn 255 ký tự

**Mức độ đề xuất:** Medium  
**Test case liên quan:** `TC-FR-15-PRODUCT-MOBILE-006`

### Các bước tái hiện

1. Gửi request tạo sản phẩm với `name` dài hơn 255 ký tự.
2. Kiểm tra response và dữ liệu sản phẩm được lưu.
3. Tải danh sách sản phẩm trên mobile để kiểm tra sản phẩm đó.

### Kết quả thực tế

Theo rà soát mã nguồn/schema, API không giới hạn độ dài tên và cột SQLite `TEXT` chấp nhận giá trị vượt 255 ký tự.

### Kết quả mong đợi

API từ chối tên vượt giới hạn 255 ký tự theo test case FR-15.

### Bằng chứng

TC-FR-15-PRODUCT-MOBILE-006 trong test run ghi Fail vì API/schema không áp dụng giới hạn. Chưa xác nhận bằng request runtime.

### Đề xuất sửa

Validate độ dài tên ở API và trả lỗi validation rõ ràng.

---

## [BUG][FR-15 Mobile] API chấp nhận sản phẩm thiếu tên hoặc tên rỗng

**Mức độ đề xuất:** Major  
**Test case liên quan:** `TC-FR-15-PRODUCT-MOBILE-007`

### Các bước tái hiện

1. Gửi request tạo sản phẩm lần lượt với `name` bị thiếu, `null`, chuỗi rỗng hoặc chỉ có khoảng trắng.
2. Kiểm tra response API và dữ liệu được lưu.

### Kết quả thực tế

Test run ghi nhận API không kiểm tra tên rỗng; schema cho phép `name` là `NULL` và chuỗi rỗng.

### Kết quả mong đợi

API từ chối sản phẩm không có tên hoặc tên rỗng sau khi loại bỏ khoảng trắng.

### Bằng chứng

TC-FR-15-PRODUCT-MOBILE-007 trong test run ghi Fail. Đây là kết quả rà soát mã nguồn/schema, chưa xác nhận bằng request runtime.

### Đề xuất sửa

Yêu cầu trường tên, trim khoảng trắng và từ chối giá trị rỗng trước khi lưu.

---

## [BUG][FR-15 Mobile] API chấp nhận giá sản phẩm bằng 0 hoặc âm

**Mức độ đề xuất:** Major  
**Test case liên quan:** `TC-FR-15-PRODUCT-MOBILE-009`

### Các bước tái hiện

1. Gửi request tạo hoặc cập nhật sản phẩm với `price = 0`.
2. Lặp lại với `price = -1`.
3. Kiểm tra response API và giá trị được lưu.

### Kết quả thực tế

Theo rà soát, API không xác thực `price > 0`; schema không có ràng buộc `CHECK` để chặn giá trị 0 hoặc âm.

### Kết quả mong đợi

API từ chối giá bằng hoặc nhỏ hơn 0; giá sản phẩm phải là số dương.

### Bằng chứng

TC-FR-15-PRODUCT-MOBILE-009 trong test run ghi Fail. Cần xác nhận hành vi qua API runtime.

### Đề xuất sửa

Validate giá là số và lớn hơn 0 ở API; cân nhắc thêm ràng buộc dữ liệu ở schema.

---

## [BUG][FR-15 Mobile] API cho phép tạo sản phẩm thiếu danh mục

**Mức độ đề xuất:** Major  
**Test case liên quan:** `TC-FR-15-PRODUCT-MOBILE-010`

### Các bước tái hiện

1. Gửi request tạo sản phẩm không có `category_id` hoặc đặt `category_id` thành `null`.
2. Kiểm tra response API và bản ghi sản phẩm.
3. Thử thêm một `category_id` không tồn tại để kiểm tra liên kết danh mục.

### Kết quả thực tế

Test run ghi nhận API không xác thực danh mục bắt buộc; cột `category_id` cho phép `NULL` và không khai báo foreign key.

### Kết quả mong đợi

API từ chối sản phẩm thiếu danh mục hoặc tham chiếu đến danh mục không tồn tại.

### Bằng chứng

TC-FR-15-PRODUCT-MOBILE-010 trong test run ghi Fail. Phát hiện dựa trên rà soát mã nguồn/schema, chưa xác nhận bằng request runtime.

### Đề xuất sửa

Validate `category_id` là bắt buộc và danh mục tồn tại trước khi lưu.

---

## Kết quả không đưa thành issue

- FR-13: TC-004 chỉ kiểm tra luồng chặn trên giao diện; quyền truy cập API theo role thuộc phạm vi FR-12 và chưa được xác nhận bằng test API riêng.
- FR-15 Mobile: TC-005 (tên dài 254/255 ký tự) và TC-008 (giá dương) được ghi Pass trong test run.
