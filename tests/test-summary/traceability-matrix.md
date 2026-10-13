# Traceability Matrix — bộ kiểm thử thao tác thủ công

Tổng **67 cases = 24 BVA + 43 EP**: Pool A 11, B 18, C 24, D 14. A/B/C chạy trên trang web; D chạy ứng dụng trên thiết bị di động. Mapping là thiết kế, không phải kết quả thực thi.

## Pool A — Hồ sơ cá nhân

[Phân tích](profile-web-analysis.md) · [Cases](../test-cases/profile-web/README.md) · [Test run](../test-runs/pool-a-test-run.md)

### Test Case → Requirement / Partition / Technique

| Test Case | Mục tiêu | Requirement | Partitions | Technique |
|---|---|---|---|---|
| [TC-PROFILE-WEB-001](../test-cases/profile-web/TC-PROFILE-WEB-001.md) | Chấp nhận số điện thoại 10 chữ số | FR-04 | EP-PW-01, EP-PW-14 | BVA |
| [TC-PROFILE-WEB-002](../test-cases/profile-web/TC-PROFILE-WEB-002.md) | Chấp nhận số điện thoại 11 chữ số | FR-04 | EP-PW-01, EP-PW-14 | BVA |
| [TC-PROFILE-WEB-003](../test-cases/profile-web/TC-PROFILE-WEB-003.md) | Từ chối số điện thoại 9 chữ số | FR-04 | EP-PW-02 | BVA |
| [TC-PROFILE-WEB-004](../test-cases/profile-web/TC-PROFILE-WEB-004.md) | Từ chối số điện thoại 12 chữ số | FR-04 | EP-PW-03 | BVA |
| [TC-PROFILE-WEB-010](../test-cases/profile-web/TC-PROFILE-WEB-010.md) | Từ chối số điện thoại không bắt đầu bằng 0 | FR-04 | EP-PW-04 | Equivalence Partitioning |
| [TC-PROFILE-WEB-012](../test-cases/profile-web/TC-PROFILE-WEB-012.md) | Từ chối số điện thoại chứa chữ cái | FR-04 | EP-PW-05 | Equivalence Partitioning |
| [TC-PROFILE-WEB-015](../test-cases/profile-web/TC-PROFILE-WEB-015.md) | Email không được phép thay đổi | FR-04 | EP-PW-08, EP-PW-09 | Equivalence Partitioning |
| [TC-PROFILE-WEB-016](../test-cases/profile-web/TC-PROFILE-WEB-016.md) | Chưa đăng nhập không thể sửa hồ sơ | FR-04 | EP-PW-20 | Equivalence Partitioning |
| [TC-PROFILE-WEB-025](../test-cases/profile-web/TC-PROFILE-WEB-025.md) | Hiển thị an toàn nội dung giống thẻ định dạng trong Họ Tên | FR-04; SEC-04 | EP-PW-18 | Equivalence Partitioning |
| [TC-PROFILE-WEB-026](../test-cases/profile-web/TC-PROFILE-WEB-026.md) | Hiển thị an toàn nội dung giống thẻ định dạng trong Địa chỉ giao hàng | FR-04; SEC-04 | EP-PW-19 | Equivalence Partitioning |
| [TC-PROFILE-WEB-028](../test-cases/profile-web/TC-PROFILE-WEB-028.md) | Cập nhật đồng thời Họ Tên, Số điện thoại và Địa chỉ | FR-04 | EP-PW-01, EP-PW-06, EP-PW-07, EP-PW-14 | Equivalence Partitioning |

### Partition → Test Case

| Partition | Cases | Phạm vi |
|---|---|---|
| EP-PW-01 | [001](../test-cases/profile-web/TC-PROFILE-WEB-001.md), [002](../test-cases/profile-web/TC-PROFILE-WEB-002.md), [028](../test-cases/profile-web/TC-PROFILE-WEB-028.md) | Có đại diện thiết kế |
| EP-PW-02 | [003](../test-cases/profile-web/TC-PROFILE-WEB-003.md) | Có đại diện thiết kế |
| EP-PW-03 | [004](../test-cases/profile-web/TC-PROFILE-WEB-004.md) | Có đại diện thiết kế |
| EP-PW-04 | [010](../test-cases/profile-web/TC-PROFILE-WEB-010.md) | Có đại diện thiết kế |
| EP-PW-05 | [012](../test-cases/profile-web/TC-PROFILE-WEB-012.md) | Có đại diện thiết kế |
| EP-PW-06 | [028](../test-cases/profile-web/TC-PROFILE-WEB-028.md) | Có đại diện thiết kế |
| EP-PW-07 | [028](../test-cases/profile-web/TC-PROFILE-WEB-028.md) | Có đại diện thiết kế |
| EP-PW-08 | [015](../test-cases/profile-web/TC-PROFILE-WEB-015.md) | Có đại diện thiết kế |
| EP-PW-09 | [015](../test-cases/profile-web/TC-PROFILE-WEB-015.md) | Có đại diện thiết kế |
| EP-PW-10 | — | Chưa kiểm tra trong phạm vi này |
| EP-PW-11 | — | Chưa kiểm tra trong phạm vi này |
| EP-PW-12 | — | Chưa kiểm tra trong phạm vi này |
| EP-PW-13 | — | Chưa kiểm tra trong phạm vi này |
| EP-PW-14 | [001](../test-cases/profile-web/TC-PROFILE-WEB-001.md), [002](../test-cases/profile-web/TC-PROFILE-WEB-002.md), [028](../test-cases/profile-web/TC-PROFILE-WEB-028.md) | Có đại diện thiết kế |
| EP-PW-15 | — | Chưa kiểm tra trong phạm vi này |
| EP-PW-16 | — | Chưa kiểm tra trong phạm vi này |
| EP-PW-17 | — | Chưa kiểm tra trong phạm vi này |
| EP-PW-18 | [025](../test-cases/profile-web/TC-PROFILE-WEB-025.md) | Có đại diện thiết kế |
| EP-PW-19 | [026](../test-cases/profile-web/TC-PROFILE-WEB-026.md) | Có đại diện thiết kế |
| EP-PW-20 | [016](../test-cases/profile-web/TC-PROFILE-WEB-016.md) | Có đại diện thiết kế |

### Boundary → Test Case

| Biến / giá trị | Cases |
|---|---|
| Chấp nhận số điện thoại 10 chữ số | [001](../test-cases/profile-web/TC-PROFILE-WEB-001.md) |
| Chấp nhận số điện thoại 11 chữ số | [002](../test-cases/profile-web/TC-PROFILE-WEB-002.md) |
| Từ chối số điện thoại 9 chữ số | [003](../test-cases/profile-web/TC-PROFILE-WEB-003.md) |
| Từ chối số điện thoại 12 chữ số | [004](../test-cases/profile-web/TC-PROFILE-WEB-004.md) |

## Pool B — Trạng thái đơn hàng

[Phân tích](order-state-analysis.md) · [Cases](../test-cases/order-state/README.md) · [Test run](../test-runs/pool-b-test-run.md)

### Test Case → Requirement / Partition / Technique

| Test Case | Mục tiêu | Requirement | Partitions | Technique |
|---|---|---|---|---|
| [TC-ORDER-STATE-004](../test-cases/order-state/TC-ORDER-STATE-004.md) | Quản trị viên hủy đơn Chờ xác nhận | FR-10; FR-18 | EP-OS-04 | Equivalence Partitioning |
| [TC-ORDER-STATE-005](../test-cases/order-state/TC-ORDER-STATE-005.md) | Quản trị viên hủy đơn Đã xác nhận | FR-10; FR-18 | EP-OS-05 | Equivalence Partitioning |
| [TC-ORDER-STATE-006](../test-cases/order-state/TC-ORDER-STATE-006.md) | Không cho chuyển đơn Chờ xác nhận sang Đang giao | FR-10; FR-18 | EP-OS-06 | Equivalence Partitioning |
| [TC-ORDER-STATE-008](../test-cases/order-state/TC-ORDER-STATE-008.md) | Không cho chuyển đơn Đã xác nhận sang Chờ xác nhận | FR-10; FR-18 | EP-OS-07 | Equivalence Partitioning |
| [TC-ORDER-STATE-009](../test-cases/order-state/TC-ORDER-STATE-009.md) | Không cho chuyển đơn Đã xác nhận sang Đã giao | FR-10; FR-18 | EP-OS-07 | Equivalence Partitioning |
| [TC-ORDER-STATE-011](../test-cases/order-state/TC-ORDER-STATE-011.md) | Không cho chuyển đơn Đang giao sang Đã xác nhận | FR-10; FR-18 | EP-OS-08 | Equivalence Partitioning |
| [TC-ORDER-STATE-012](../test-cases/order-state/TC-ORDER-STATE-012.md) | Không cho chuyển đơn Đã giao sang Chờ xác nhận | FR-10; FR-18 | EP-OS-09 | Equivalence Partitioning |
| [TC-ORDER-STATE-015](../test-cases/order-state/TC-ORDER-STATE-015.md) | Không cho chuyển đơn Đã giao sang Đã hủy | FR-10; FR-18 | EP-OS-09 | Equivalence Partitioning |
| [TC-ORDER-STATE-016](../test-cases/order-state/TC-ORDER-STATE-016.md) | Không cho chuyển đơn Đã hủy sang Chờ xác nhận | FR-10; FR-18 | EP-OS-10 | Equivalence Partitioning |
| [TC-ORDER-STATE-019](../test-cases/order-state/TC-ORDER-STATE-019.md) | Không cho chuyển đơn Đã hủy sang Đã giao | FR-10; FR-18 | EP-OS-10 | Equivalence Partitioning |
| [TC-ORDER-STATE-021](../test-cases/order-state/TC-ORDER-STATE-021.md) | Khách hàng hủy đơn Đã xác nhận | FR-10; FR-18 | EP-OS-12, EP-OS-22 | Equivalence Partitioning |
| [TC-ORDER-STATE-022](../test-cases/order-state/TC-ORDER-STATE-022.md) | Khách hàng không được hủy đơn Đang giao | FR-10; FR-18 | EP-OS-13, EP-OS-22 | Equivalence Partitioning |
| [TC-ORDER-STATE-023](../test-cases/order-state/TC-ORDER-STATE-023.md) | Khách hàng không được hủy đơn Đã giao | FR-10; FR-18 | EP-OS-14, EP-OS-22 | Equivalence Partitioning |
| [TC-ORDER-STATE-025](../test-cases/order-state/TC-ORDER-STATE-025.md) | Khách hàng không được quản lý trạng thái đơn hàng | FR-12; FR-18; SEC-03 | EP-OS-31 | Equivalence Partitioning |
| [TC-ORDER-STATE-041](../test-cases/order-state/TC-ORDER-STATE-041.md) | Xác nhận, giao hàng và hoàn thành một đơn | FR-10; FR-18 | EP-OS-01, EP-OS-02, EP-OS-03 | Equivalence Partitioning |
| [TC-ORDER-STATE-046](../test-cases/order-state/TC-ORDER-STATE-046.md) | Khách hàng hủy đơn Chờ xác nhận | FR-10; FR-18 | EP-OS-11, EP-OS-22 | Equivalence Partitioning |
| [TC-ORDER-STATE-051](../test-cases/order-state/TC-ORDER-STATE-051.md) | Không hủy được đơn đã giao đi từ trang chưa tải lại | FR-10; FR-18 | EP-OS-13 | Equivalence Partitioning |
| [TC-ORDER-STATE-052](../test-cases/order-state/TC-ORDER-STATE-052.md) | Không chuyển đơn đã hủy sang Đang giao từ trang chưa tải lại | FR-10; FR-18 | EP-OS-10 | Equivalence Partitioning |

### Partition → Test Case

| Partition | Cases | Phạm vi |
|---|---|---|
| EP-OS-01 | [041](../test-cases/order-state/TC-ORDER-STATE-041.md) | Có đại diện thiết kế |
| EP-OS-02 | [041](../test-cases/order-state/TC-ORDER-STATE-041.md) | Có đại diện thiết kế |
| EP-OS-03 | [041](../test-cases/order-state/TC-ORDER-STATE-041.md) | Có đại diện thiết kế |
| EP-OS-04 | [004](../test-cases/order-state/TC-ORDER-STATE-004.md) | Có đại diện thiết kế |
| EP-OS-05 | [005](../test-cases/order-state/TC-ORDER-STATE-005.md) | Có đại diện thiết kế |
| EP-OS-06 | [006](../test-cases/order-state/TC-ORDER-STATE-006.md) | Có đại diện thiết kế |
| EP-OS-07 | [008](../test-cases/order-state/TC-ORDER-STATE-008.md), [009](../test-cases/order-state/TC-ORDER-STATE-009.md) | Có đại diện thiết kế |
| EP-OS-08 | [011](../test-cases/order-state/TC-ORDER-STATE-011.md) | Có đại diện thiết kế |
| EP-OS-09 | [012](../test-cases/order-state/TC-ORDER-STATE-012.md), [015](../test-cases/order-state/TC-ORDER-STATE-015.md) | Có đại diện thiết kế |
| EP-OS-10 | [016](../test-cases/order-state/TC-ORDER-STATE-016.md), [019](../test-cases/order-state/TC-ORDER-STATE-019.md), [052](../test-cases/order-state/TC-ORDER-STATE-052.md) | Có đại diện thiết kế |
| EP-OS-11 | [046](../test-cases/order-state/TC-ORDER-STATE-046.md) | Có đại diện thiết kế |
| EP-OS-12 | [021](../test-cases/order-state/TC-ORDER-STATE-021.md) | Có đại diện thiết kế |
| EP-OS-13 | [022](../test-cases/order-state/TC-ORDER-STATE-022.md), [051](../test-cases/order-state/TC-ORDER-STATE-051.md) | Có đại diện thiết kế |
| EP-OS-14 | [023](../test-cases/order-state/TC-ORDER-STATE-023.md) | Có đại diện thiết kế |
| EP-OS-15 | — | Chưa kiểm tra trong phạm vi này |
| EP-OS-16 | — | Chưa kiểm tra trong phạm vi này |
| EP-OS-17 | — | Chưa kiểm tra trong phạm vi này |
| EP-OS-18 | — | Chưa kiểm tra trong phạm vi này |
| EP-OS-19 | — | Chưa kiểm tra trong phạm vi này |
| EP-OS-20 | — | Chưa kiểm tra trong phạm vi này |
| EP-OS-21 | — | Chưa kiểm tra trong phạm vi này |
| EP-OS-22 | [021](../test-cases/order-state/TC-ORDER-STATE-021.md), [022](../test-cases/order-state/TC-ORDER-STATE-022.md), [023](../test-cases/order-state/TC-ORDER-STATE-023.md), [046](../test-cases/order-state/TC-ORDER-STATE-046.md) | Có đại diện thiết kế |
| EP-OS-23 | — | Chưa kiểm tra trong phạm vi này |
| EP-OS-24 | — | Chưa kiểm tra trong phạm vi này |
| EP-OS-25 | — | Chưa kiểm tra trong phạm vi này |
| EP-OS-26 | — | Chưa kiểm tra trong phạm vi này |
| EP-OS-27 | — | Chưa kiểm tra trong phạm vi này |
| EP-OS-28 | — | Chưa kiểm tra trong phạm vi này |
| EP-OS-29 | — | Chưa kiểm tra trong phạm vi này |
| EP-OS-30 | — | Chưa kiểm tra trong phạm vi này |
| EP-OS-31 | [025](../test-cases/order-state/TC-ORDER-STATE-025.md) | Có đại diện thiết kế |

### Boundary → Test Case

| Biến / giá trị | Cases |
|---|---|
| Không có miền có thứ tự để áp dụng BVA | — |

## Pool C — Quản lý sản phẩm

[Phân tích](product-crud-analysis.md) · [Cases](../test-cases/product-crud/README.md) · [Test run](../test-runs/pool-c-test-run.md)

### Test Case → Requirement / Partition / Technique

| Test Case | Mục tiêu | Requirement | Partitions | Technique |
|---|---|---|---|---|
| [TC-PRODUCT-CRUD-001](../test-cases/product-crud/TC-PRODUCT-CRUD-001.md) | Thêm sản phẩm với tên 0 ký tự | FR-15; FR-12 | EP-PC-02, EP-PC-22 | BVA |
| [TC-PRODUCT-CRUD-002](../test-cases/product-crud/TC-PRODUCT-CRUD-002.md) | Thêm sản phẩm với tên 1 ký tự | FR-15; FR-12 | EP-PC-01, EP-PC-22 | BVA |
| [TC-PRODUCT-CRUD-003](../test-cases/product-crud/TC-PRODUCT-CRUD-003.md) | Thêm sản phẩm với tên 2 ký tự | FR-15; FR-12 | EP-PC-01, EP-PC-22 | BVA |
| [TC-PRODUCT-CRUD-004](../test-cases/product-crud/TC-PRODUCT-CRUD-004.md) | Thêm sản phẩm với tên 254 ký tự | FR-15; FR-12 | EP-PC-01, EP-PC-22 | BVA |
| [TC-PRODUCT-CRUD-005](../test-cases/product-crud/TC-PRODUCT-CRUD-005.md) | Thêm sản phẩm với tên 255 ký tự | FR-15; FR-12 | EP-PC-01, EP-PC-22 | BVA |
| [TC-PRODUCT-CRUD-006](../test-cases/product-crud/TC-PRODUCT-CRUD-006.md) | Thêm sản phẩm với tên 256 ký tự | FR-15; FR-12 | EP-PC-03, EP-PC-22 | BVA |
| [TC-PRODUCT-CRUD-013](../test-cases/product-crud/TC-PRODUCT-CRUD-013.md) | Sửa sản phẩm với tên 0 ký tự | FR-15; FR-12 | EP-PC-02, EP-PC-23 | BVA |
| [TC-PRODUCT-CRUD-014](../test-cases/product-crud/TC-PRODUCT-CRUD-014.md) | Sửa sản phẩm với tên 1 ký tự | FR-15; FR-12 | EP-PC-01, EP-PC-23 | BVA |
| [TC-PRODUCT-CRUD-017](../test-cases/product-crud/TC-PRODUCT-CRUD-017.md) | Sửa sản phẩm với tên 255 ký tự | FR-15; FR-12 | EP-PC-01, EP-PC-23 | BVA |
| [TC-PRODUCT-CRUD-018](../test-cases/product-crud/TC-PRODUCT-CRUD-018.md) | Sửa sản phẩm với tên 256 ký tự | FR-15; FR-12 | EP-PC-03, EP-PC-23 | BVA |
| [TC-PRODUCT-CRUD-025](../test-cases/product-crud/TC-PRODUCT-CRUD-025.md) | Thêm sản phẩm với giá -1 | FR-15; FR-12 | EP-PC-08, EP-PC-22 | BVA |
| [TC-PRODUCT-CRUD-026](../test-cases/product-crud/TC-PRODUCT-CRUD-026.md) | Thêm sản phẩm với giá 0 | FR-15; FR-12 | EP-PC-07, EP-PC-22 | BVA |
| [TC-PRODUCT-CRUD-027](../test-cases/product-crud/TC-PRODUCT-CRUD-027.md) | Thêm sản phẩm với giá 1 | FR-15; FR-12 | EP-PC-06, EP-PC-22 | BVA |
| [TC-PRODUCT-CRUD-032](../test-cases/product-crud/TC-PRODUCT-CRUD-032.md) | Sửa sản phẩm với giá 0 | FR-15; FR-12 | EP-PC-07, EP-PC-23 | BVA |
| [TC-PRODUCT-CRUD-033](../test-cases/product-crud/TC-PRODUCT-CRUD-033.md) | Sửa sản phẩm với giá 1 | FR-15; FR-12 | EP-PC-06, EP-PC-23 | BVA |
| [TC-PRODUCT-CRUD-034](../test-cases/product-crud/TC-PRODUCT-CRUD-034.md) | Sửa sản phẩm với giá -1 | FR-15; FR-12 | EP-PC-08, EP-PC-23 | BVA |
| [TC-PRODUCT-CRUD-037](../test-cases/product-crud/TC-PRODUCT-CRUD-037.md) | Thêm mới sản phẩm hợp lệ | FR-15; FR-12 | EP-PC-01, EP-PC-06, EP-PC-12, EP-PC-22, EP-PC-26, EP-PC-27 | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-039](../test-cases/product-crud/TC-PRODUCT-CRUD-039.md) | Sửa đầy đủ các trường của một sản phẩm | FR-15; FR-12 | EP-PC-01, EP-PC-06, EP-PC-12, EP-PC-23, EP-PC-26, EP-PC-27 | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-041](../test-cases/product-crud/TC-PRODUCT-CRUD-041.md) | Xem sản phẩm và mở form sửa không làm thay đổi dữ liệu | FR-15; FR-12 | EP-PC-21, EP-PC-24 | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-043](../test-cases/product-crud/TC-PRODUCT-CRUD-043.md) | Xóa đúng sản phẩm thử | FR-15; FR-12 | EP-PC-21, EP-PC-25 | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-051](../test-cases/product-crud/TC-PRODUCT-CRUD-051.md) | Thêm sản phẩm với giá abc | FR-15; FR-12 | EP-PC-11, EP-PC-22 | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-054](../test-cases/product-crud/TC-PRODUCT-CRUD-054.md) | Sửa sản phẩm với giá abc | FR-15; FR-12 | EP-PC-11, EP-PC-23 | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-073](../test-cases/product-crud/TC-PRODUCT-CRUD-073.md) | Khách hàng không được quản lý sản phẩm | FR-12; SEC-03 | EP-PC-17 | Equivalence Partitioning |
| [TC-PRODUCT-CRUD-075](../test-cases/product-crud/TC-PRODUCT-CRUD-075.md) | Chuyển lựa chọn từ sản phẩm P sang Q rồi chỉ lưu Q | FR-15; FR-12 | EP-PC-23, EP-PC-29 | Equivalence Partitioning |

### Partition → Test Case

| Partition | Cases | Phạm vi |
|---|---|---|
| EP-PC-01 | [002](../test-cases/product-crud/TC-PRODUCT-CRUD-002.md), [003](../test-cases/product-crud/TC-PRODUCT-CRUD-003.md), [004](../test-cases/product-crud/TC-PRODUCT-CRUD-004.md), [005](../test-cases/product-crud/TC-PRODUCT-CRUD-005.md), [014](../test-cases/product-crud/TC-PRODUCT-CRUD-014.md), [017](../test-cases/product-crud/TC-PRODUCT-CRUD-017.md), [037](../test-cases/product-crud/TC-PRODUCT-CRUD-037.md), [039](../test-cases/product-crud/TC-PRODUCT-CRUD-039.md) | Có đại diện thiết kế |
| EP-PC-02 | [001](../test-cases/product-crud/TC-PRODUCT-CRUD-001.md), [013](../test-cases/product-crud/TC-PRODUCT-CRUD-013.md) | Có đại diện thiết kế |
| EP-PC-03 | [006](../test-cases/product-crud/TC-PRODUCT-CRUD-006.md), [018](../test-cases/product-crud/TC-PRODUCT-CRUD-018.md) | Có đại diện thiết kế |
| EP-PC-04 | — | Chưa kiểm tra trong phạm vi này |
| EP-PC-05 | — | Chưa kiểm tra trong phạm vi này |
| EP-PC-06 | [027](../test-cases/product-crud/TC-PRODUCT-CRUD-027.md), [033](../test-cases/product-crud/TC-PRODUCT-CRUD-033.md), [037](../test-cases/product-crud/TC-PRODUCT-CRUD-037.md), [039](../test-cases/product-crud/TC-PRODUCT-CRUD-039.md) | Có đại diện thiết kế |
| EP-PC-07 | [026](../test-cases/product-crud/TC-PRODUCT-CRUD-026.md), [032](../test-cases/product-crud/TC-PRODUCT-CRUD-032.md) | Có đại diện thiết kế |
| EP-PC-08 | [025](../test-cases/product-crud/TC-PRODUCT-CRUD-025.md), [034](../test-cases/product-crud/TC-PRODUCT-CRUD-034.md) | Có đại diện thiết kế |
| EP-PC-09 | — | Chưa kiểm tra trong phạm vi này |
| EP-PC-10 | — | Chưa kiểm tra trong phạm vi này |
| EP-PC-11 | [051](../test-cases/product-crud/TC-PRODUCT-CRUD-051.md), [054](../test-cases/product-crud/TC-PRODUCT-CRUD-054.md) | Có đại diện thiết kế |
| EP-PC-12 | [037](../test-cases/product-crud/TC-PRODUCT-CRUD-037.md), [039](../test-cases/product-crud/TC-PRODUCT-CRUD-039.md) | Có đại diện thiết kế |
| EP-PC-13 | — | Chưa kiểm tra trong phạm vi này |
| EP-PC-14 | — | Chưa kiểm tra trong phạm vi này |
| EP-PC-15 | — | Chưa kiểm tra trong phạm vi này |
| EP-PC-16 | — | Chưa kiểm tra trong phạm vi này |
| EP-PC-17 | [073](../test-cases/product-crud/TC-PRODUCT-CRUD-073.md) | Có đại diện thiết kế |
| EP-PC-18 | — | Chưa kiểm tra trong phạm vi này |
| EP-PC-19 | — | Chưa kiểm tra trong phạm vi này |
| EP-PC-20 | — | Chưa kiểm tra trong phạm vi này |
| EP-PC-21 | [041](../test-cases/product-crud/TC-PRODUCT-CRUD-041.md), [043](../test-cases/product-crud/TC-PRODUCT-CRUD-043.md) | Có đại diện thiết kế |
| EP-PC-22 | [001](../test-cases/product-crud/TC-PRODUCT-CRUD-001.md), [002](../test-cases/product-crud/TC-PRODUCT-CRUD-002.md), [003](../test-cases/product-crud/TC-PRODUCT-CRUD-003.md), [004](../test-cases/product-crud/TC-PRODUCT-CRUD-004.md), [005](../test-cases/product-crud/TC-PRODUCT-CRUD-005.md), [006](../test-cases/product-crud/TC-PRODUCT-CRUD-006.md), [025](../test-cases/product-crud/TC-PRODUCT-CRUD-025.md), [026](../test-cases/product-crud/TC-PRODUCT-CRUD-026.md), [027](../test-cases/product-crud/TC-PRODUCT-CRUD-027.md), [037](../test-cases/product-crud/TC-PRODUCT-CRUD-037.md), [051](../test-cases/product-crud/TC-PRODUCT-CRUD-051.md) | Có đại diện thiết kế |
| EP-PC-23 | [013](../test-cases/product-crud/TC-PRODUCT-CRUD-013.md), [014](../test-cases/product-crud/TC-PRODUCT-CRUD-014.md), [017](../test-cases/product-crud/TC-PRODUCT-CRUD-017.md), [018](../test-cases/product-crud/TC-PRODUCT-CRUD-018.md), [032](../test-cases/product-crud/TC-PRODUCT-CRUD-032.md), [033](../test-cases/product-crud/TC-PRODUCT-CRUD-033.md), [034](../test-cases/product-crud/TC-PRODUCT-CRUD-034.md), [039](../test-cases/product-crud/TC-PRODUCT-CRUD-039.md), [054](../test-cases/product-crud/TC-PRODUCT-CRUD-054.md), [075](../test-cases/product-crud/TC-PRODUCT-CRUD-075.md) | Có đại diện thiết kế |
| EP-PC-24 | [041](../test-cases/product-crud/TC-PRODUCT-CRUD-041.md) | Có đại diện thiết kế |
| EP-PC-25 | [043](../test-cases/product-crud/TC-PRODUCT-CRUD-043.md) | Có đại diện thiết kế |
| EP-PC-26 | [037](../test-cases/product-crud/TC-PRODUCT-CRUD-037.md), [039](../test-cases/product-crud/TC-PRODUCT-CRUD-039.md) | Có đại diện thiết kế |
| EP-PC-27 | [037](../test-cases/product-crud/TC-PRODUCT-CRUD-037.md), [039](../test-cases/product-crud/TC-PRODUCT-CRUD-039.md) | Có đại diện thiết kế |
| EP-PC-28 | — | Chưa kiểm tra trong phạm vi này |
| EP-PC-29 | [075](../test-cases/product-crud/TC-PRODUCT-CRUD-075.md) | Có đại diện thiết kế |
| EP-PC-30 | — | Chưa kiểm tra trong phạm vi này |

### Boundary → Test Case

| Biến / giá trị | Cases |
|---|---|
| Thêm sản phẩm với tên 0 ký tự | [001](../test-cases/product-crud/TC-PRODUCT-CRUD-001.md) |
| Thêm sản phẩm với tên 1 ký tự | [002](../test-cases/product-crud/TC-PRODUCT-CRUD-002.md) |
| Thêm sản phẩm với tên 2 ký tự | [003](../test-cases/product-crud/TC-PRODUCT-CRUD-003.md) |
| Thêm sản phẩm với tên 254 ký tự | [004](../test-cases/product-crud/TC-PRODUCT-CRUD-004.md) |
| Thêm sản phẩm với tên 255 ký tự | [005](../test-cases/product-crud/TC-PRODUCT-CRUD-005.md) |
| Thêm sản phẩm với tên 256 ký tự | [006](../test-cases/product-crud/TC-PRODUCT-CRUD-006.md) |
| Sửa sản phẩm với tên 0 ký tự | [013](../test-cases/product-crud/TC-PRODUCT-CRUD-013.md) |
| Sửa sản phẩm với tên 1 ký tự | [014](../test-cases/product-crud/TC-PRODUCT-CRUD-014.md) |
| Sửa sản phẩm với tên 255 ký tự | [017](../test-cases/product-crud/TC-PRODUCT-CRUD-017.md) |
| Sửa sản phẩm với tên 256 ký tự | [018](../test-cases/product-crud/TC-PRODUCT-CRUD-018.md) |
| Thêm sản phẩm với giá -1 | [025](../test-cases/product-crud/TC-PRODUCT-CRUD-025.md) |
| Thêm sản phẩm với giá 0 | [026](../test-cases/product-crud/TC-PRODUCT-CRUD-026.md) |
| Thêm sản phẩm với giá 1 | [027](../test-cases/product-crud/TC-PRODUCT-CRUD-027.md) |
| Sửa sản phẩm với giá 0 | [032](../test-cases/product-crud/TC-PRODUCT-CRUD-032.md) |
| Sửa sản phẩm với giá 1 | [033](../test-cases/product-crud/TC-PRODUCT-CRUD-033.md) |
| Sửa sản phẩm với giá -1 | [034](../test-cases/product-crud/TC-PRODUCT-CRUD-034.md) |

## Pool D — Hồ sơ trên thiết bị di động

[Phân tích](profile-mobile-analysis.md) · [Cases](../test-cases/profile-mobile/README.md) · [Test run](../test-runs/pool-d-test-run.md)

### Test Case → Requirement / Partition / Technique

| Test Case | Mục tiêu | Requirement | Partitions | Technique |
|---|---|---|---|---|
| [TC-PROFILE-MOBILE-001](../test-cases/profile-mobile/TC-PROFILE-MOBILE-001.md) | Từ chối số điện thoại 9 chữ số | FR-04; FR-20 | EP-PM-02 | BVA |
| [TC-PROFILE-MOBILE-002](../test-cases/profile-mobile/TC-PROFILE-MOBILE-002.md) | Chấp nhận số điện thoại 10 chữ số | FR-04; FR-20 | EP-PM-01, EP-PM-15 | BVA |
| [TC-PROFILE-MOBILE-003](../test-cases/profile-mobile/TC-PROFILE-MOBILE-003.md) | Chấp nhận số điện thoại 11 chữ số | FR-04; FR-20 | EP-PM-01, EP-PM-15 | BVA |
| [TC-PROFILE-MOBILE-004](../test-cases/profile-mobile/TC-PROFILE-MOBILE-004.md) | Từ chối số điện thoại 12 chữ số | FR-04; FR-20 | EP-PM-03 | BVA |
| [TC-PROFILE-MOBILE-005](../test-cases/profile-mobile/TC-PROFILE-MOBILE-005.md) | Từ chối số điện thoại không bắt đầu bằng 0 | FR-04; FR-20 | EP-PM-04 | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-006](../test-cases/profile-mobile/TC-PROFILE-MOBILE-006.md) | Từ chối số điện thoại chứa chữ cái khi dán | FR-04; FR-20 | EP-PM-05 | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-013](../test-cases/profile-mobile/TC-PROFILE-MOBILE-013.md) | Lưu đồng thời Họ Tên, Số điện thoại và Địa chỉ | FR-04; FR-20 | EP-PM-01, EP-PM-06, EP-PM-07, EP-PM-15 | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-014](../test-cases/profile-mobile/TC-PROFILE-MOBILE-014.md) | Email không sửa được bằng gõ hoặc dán | FR-04; FR-20 | EP-PM-08 | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-016](../test-cases/profile-mobile/TC-PROFILE-MOBILE-016.md) | Chưa đăng nhập không thể sửa hồ sơ | FR-04; FR-20 | EP-PM-17 | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-017](../test-cases/profile-mobile/TC-PROFILE-MOBILE-017.md) | Đăng xuất không giữ quyền sửa hồ sơ trước đó | FR-04; FR-20 | EP-PM-18 | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-018](../test-cases/profile-mobile/TC-PROFILE-MOBILE-018.md) | Đổi tài khoản rồi lưu đúng hồ sơ của người vừa đăng nhập | FR-04; FR-20 | EP-PM-01, EP-PM-06, EP-PM-07, EP-PM-15, EP-PM-19 | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-028](../test-cases/profile-mobile/TC-PROFILE-MOBILE-028.md) | Hiển thị an toàn nội dung giống thẻ định dạng trong Họ Tên | FR-04; SEC-04; FR-20 | EP-PM-20 | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-029](../test-cases/profile-mobile/TC-PROFILE-MOBILE-029.md) | Hiển thị an toàn nội dung giống thẻ định dạng trong Địa chỉ giao hàng | FR-04; SEC-04; FR-20 | EP-PM-21 | Equivalence Partitioning |
| [TC-PROFILE-MOBILE-030](../test-cases/profile-mobile/TC-PROFILE-MOBILE-030.md) | Đăng nhập lại trên điện thoại tải hồ sơ vừa đổi trên trang web | FR-04; FR-20 | EP-PM-01, EP-PM-06, EP-PM-07, EP-PM-15 | Equivalence Partitioning |

### Partition → Test Case

| Partition | Cases | Phạm vi |
|---|---|---|
| EP-PM-01 | [002](../test-cases/profile-mobile/TC-PROFILE-MOBILE-002.md), [003](../test-cases/profile-mobile/TC-PROFILE-MOBILE-003.md), [013](../test-cases/profile-mobile/TC-PROFILE-MOBILE-013.md), [018](../test-cases/profile-mobile/TC-PROFILE-MOBILE-018.md), [030](../test-cases/profile-mobile/TC-PROFILE-MOBILE-030.md) | Có đại diện thiết kế |
| EP-PM-02 | [001](../test-cases/profile-mobile/TC-PROFILE-MOBILE-001.md) | Có đại diện thiết kế |
| EP-PM-03 | [004](../test-cases/profile-mobile/TC-PROFILE-MOBILE-004.md) | Có đại diện thiết kế |
| EP-PM-04 | [005](../test-cases/profile-mobile/TC-PROFILE-MOBILE-005.md) | Có đại diện thiết kế |
| EP-PM-05 | [006](../test-cases/profile-mobile/TC-PROFILE-MOBILE-006.md) | Có đại diện thiết kế |
| EP-PM-06 | [013](../test-cases/profile-mobile/TC-PROFILE-MOBILE-013.md), [018](../test-cases/profile-mobile/TC-PROFILE-MOBILE-018.md), [030](../test-cases/profile-mobile/TC-PROFILE-MOBILE-030.md) | Có đại diện thiết kế |
| EP-PM-07 | [013](../test-cases/profile-mobile/TC-PROFILE-MOBILE-013.md), [018](../test-cases/profile-mobile/TC-PROFILE-MOBILE-018.md), [030](../test-cases/profile-mobile/TC-PROFILE-MOBILE-030.md) | Có đại diện thiết kế |
| EP-PM-08 | [014](../test-cases/profile-mobile/TC-PROFILE-MOBILE-014.md) | Có đại diện thiết kế |
| EP-PM-09 | — | Chưa kiểm tra trong phạm vi này |
| EP-PM-10 | — | Chưa kiểm tra trong phạm vi này |
| EP-PM-11 | — | Chưa kiểm tra trong phạm vi này |
| EP-PM-12 | — | Chưa kiểm tra trong phạm vi này |
| EP-PM-13 | — | Chưa kiểm tra trong phạm vi này |
| EP-PM-14 | — | Chưa kiểm tra trong phạm vi này |
| EP-PM-15 | [002](../test-cases/profile-mobile/TC-PROFILE-MOBILE-002.md), [003](../test-cases/profile-mobile/TC-PROFILE-MOBILE-003.md), [013](../test-cases/profile-mobile/TC-PROFILE-MOBILE-013.md), [018](../test-cases/profile-mobile/TC-PROFILE-MOBILE-018.md), [030](../test-cases/profile-mobile/TC-PROFILE-MOBILE-030.md) | Có đại diện thiết kế |
| EP-PM-16 | — | Chưa kiểm tra trong phạm vi này |
| EP-PM-17 | [016](../test-cases/profile-mobile/TC-PROFILE-MOBILE-016.md) | Có đại diện thiết kế |
| EP-PM-18 | [017](../test-cases/profile-mobile/TC-PROFILE-MOBILE-017.md) | Có đại diện thiết kế |
| EP-PM-19 | [018](../test-cases/profile-mobile/TC-PROFILE-MOBILE-018.md) | Có đại diện thiết kế |
| EP-PM-20 | [028](../test-cases/profile-mobile/TC-PROFILE-MOBILE-028.md) | Có đại diện thiết kế |
| EP-PM-21 | [029](../test-cases/profile-mobile/TC-PROFILE-MOBILE-029.md) | Có đại diện thiết kế |

### Boundary → Test Case

| Biến / giá trị | Cases |
|---|---|
| Từ chối số điện thoại 9 chữ số | [001](../test-cases/profile-mobile/TC-PROFILE-MOBILE-001.md) |
| Chấp nhận số điện thoại 10 chữ số | [002](../test-cases/profile-mobile/TC-PROFILE-MOBILE-002.md) |
| Chấp nhận số điện thoại 11 chữ số | [003](../test-cases/profile-mobile/TC-PROFILE-MOBILE-003.md) |
| Từ chối số điện thoại 12 chữ số | [004](../test-cases/profile-mobile/TC-PROFILE-MOBILE-004.md) |
