# Traceability Matrix — Pool A / FR-04 và Pool B / FR-10

Ma trận **thiết kế**, không phải kết quả execution. Phần Pool A bên dưới dùng tiền tố `TC-PROFILE-WEB-`, scope hồ sơ storefront/API; phần Pool B ở cuối dùng `TC-ORDER-STATE-`, scope trạng thái đơn hàng. Toàn bộ Result `Not Run`, Related Bugs `None`.

Nguồn phân tích: [Requirement → Domain → Partition → Boundary](profile-web-analysis.md).
Fixture và danh mục: [profile-web](../test-cases/profile-web/README.md).

## Requirement → Test Case

| Requirement / Quy tắc nội bộ | Case | Mức bao phủ thiết kế |
|---|---|---|
| FR-04 R1: name, phone, address của chính mình | [001](../test-cases/profile-web/TC-PROFILE-WEB-001.md), [002](../test-cases/profile-web/TC-PROFILE-WEB-002.md), [005](../test-cases/profile-web/TC-PROFILE-WEB-005.md), [006](../test-cases/profile-web/TC-PROFILE-WEB-006.md), [013](../test-cases/profile-web/TC-PROFILE-WEB-013.md), [014](../test-cases/profile-web/TC-PROFILE-WEB-014.md), [027](../test-cases/profile-web/TC-PROFILE-WEB-027.md), [028](../test-cases/profile-web/TC-PROFILE-WEB-028.md) | Từng trường và cập nhật đồng thời; chưa có oracle cho rỗng/độ dài name/address |
| FR-04 R2: phone | [001](../test-cases/profile-web/TC-PROFILE-WEB-001.md), [002](../test-cases/profile-web/TC-PROFILE-WEB-002.md), [003](../test-cases/profile-web/TC-PROFILE-WEB-003.md), [004](../test-cases/profile-web/TC-PROFILE-WEB-004.md), [005](../test-cases/profile-web/TC-PROFILE-WEB-005.md), [006](../test-cases/profile-web/TC-PROFILE-WEB-006.md), [007](../test-cases/profile-web/TC-PROFILE-WEB-007.md), [008](../test-cases/profile-web/TC-PROFILE-WEB-008.md), [009](../test-cases/profile-web/TC-PROFILE-WEB-009.md), [010](../test-cases/profile-web/TC-PROFILE-WEB-010.md), [011](../test-cases/profile-web/TC-PROFILE-WEB-011.md), [012](../test-cases/profile-web/TC-PROFILE-WEB-012.md) | 4 độ dài, tiền tố sai, ký tự sai; UI/API độc lập |
| FR-04 R3: email UI không sửa | [015](../test-cases/profile-web/TC-PROFILE-WEB-015.md) | Thao tác UI thông thường; API email chờ làm rõ |
| FR-04 R4: ownership | [005](../test-cases/profile-web/TC-PROFILE-WEB-005.md), [006](../test-cases/profile-web/TC-PROFILE-WEB-006.md), [016](../test-cases/profile-web/TC-PROFILE-WEB-016.md), [021](../test-cases/profile-web/TC-PROFILE-WEB-021.md), [022](../test-cases/profile-web/TC-PROFILE-WEB-022.md), [024](../test-cases/profile-web/TC-PROFILE-WEB-024.md), [027](../test-cases/profile-web/TC-PROFILE-WEB-027.md), [028](../test-cases/profile-web/TC-PROFILE-WEB-028.md) | Readback A/B, selector body/query, token sửa; không exhaustive mọi selector |
| FR-04 R5 / SEC-06: role | [023](../test-cases/profile-web/TC-PROFILE-WEB-023.md) | Role được đọc lại và kiểm tra sau đăng nhập mới |
| SEC-02 R6: JWT | [005](../test-cases/profile-web/TC-PROFILE-WEB-005.md), [016](../test-cases/profile-web/TC-PROFILE-WEB-016.md), [017](../test-cases/profile-web/TC-PROFILE-WEB-017.md), [018](../test-cases/profile-web/TC-PROFILE-WEB-018.md), [019](../test-cases/profile-web/TC-PROFILE-WEB-019.md), [020](../test-cases/profile-web/TC-PROFILE-WEB-020.md), [024](../test-cases/profile-web/TC-PROFILE-WEB-024.md) | Hợp lệ, thiếu, sai định dạng, sai chữ ký do sửa payload; không có BVA expiry |
| SEC-04 R7: render an toàn | [025](../test-cases/profile-web/TC-PROFILE-WEB-025.md), [026](../test-cases/profile-web/TC-PROFILE-WEB-026.md) | Có điều kiện dữ liệu tới điểm hiển thị; không phải toàn bộ SEC-04 |
| FR-22 R8: email type và vị trí lỗi | [003](../test-cases/profile-web/TC-PROFILE-WEB-003.md), [015](../test-cases/profile-web/TC-PROFILE-WEB-015.md) | Chỉ hai quy tắc liên quan; không tuyên bố toàn bộ FR-22 |

## Partition → Test Case

| Partition | Cases | Giới hạn |
|---|---|---|
| EP-PW-01 | [001](../test-cases/profile-web/TC-PROFILE-WEB-001.md), [002](../test-cases/profile-web/TC-PROFILE-WEB-002.md), [005](../test-cases/profile-web/TC-PROFILE-WEB-005.md), [006](../test-cases/profile-web/TC-PROFILE-WEB-006.md), [013](../test-cases/profile-web/TC-PROFILE-WEB-013.md), [014](../test-cases/profile-web/TC-PROFILE-WEB-014.md), [027](../test-cases/profile-web/TC-PROFILE-WEB-027.md), [028](../test-cases/profile-web/TC-PROFILE-WEB-028.md) | Đại diện partition; chưa execute |
| EP-PW-02 | [003](../test-cases/profile-web/TC-PROFILE-WEB-003.md), [007](../test-cases/profile-web/TC-PROFILE-WEB-007.md) | Đại diện partition; chưa execute |
| EP-PW-03 | [004](../test-cases/profile-web/TC-PROFILE-WEB-004.md), [008](../test-cases/profile-web/TC-PROFILE-WEB-008.md) | Đại diện partition; chưa execute |
| EP-PW-04 | [009](../test-cases/profile-web/TC-PROFILE-WEB-009.md), [010](../test-cases/profile-web/TC-PROFILE-WEB-010.md) | Đại diện partition; chưa execute |
| EP-PW-05 | [011](../test-cases/profile-web/TC-PROFILE-WEB-011.md), [012](../test-cases/profile-web/TC-PROFILE-WEB-012.md) | Đại diện partition; chưa execute |
| EP-PW-06 | [013](../test-cases/profile-web/TC-PROFILE-WEB-013.md), [027](../test-cases/profile-web/TC-PROFILE-WEB-027.md), [028](../test-cases/profile-web/TC-PROFILE-WEB-028.md) | Đại diện partition; chưa execute |
| EP-PW-07 | [014](../test-cases/profile-web/TC-PROFILE-WEB-014.md), [027](../test-cases/profile-web/TC-PROFILE-WEB-027.md), [028](../test-cases/profile-web/TC-PROFILE-WEB-028.md) | Đại diện partition; chưa execute |
| EP-PW-08 | [015](../test-cases/profile-web/TC-PROFILE-WEB-015.md) | Đại diện partition; chưa execute |
| EP-PW-09 | [015](../test-cases/profile-web/TC-PROFILE-WEB-015.md) | Đại diện partition; chưa execute |
| EP-PW-10 | [001](../test-cases/profile-web/TC-PROFILE-WEB-001.md), [002](../test-cases/profile-web/TC-PROFILE-WEB-002.md), [003](../test-cases/profile-web/TC-PROFILE-WEB-003.md), [004](../test-cases/profile-web/TC-PROFILE-WEB-004.md), [005](../test-cases/profile-web/TC-PROFILE-WEB-005.md), [006](../test-cases/profile-web/TC-PROFILE-WEB-006.md), [007](../test-cases/profile-web/TC-PROFILE-WEB-007.md), [008](../test-cases/profile-web/TC-PROFILE-WEB-008.md), [009](../test-cases/profile-web/TC-PROFILE-WEB-009.md), [010](../test-cases/profile-web/TC-PROFILE-WEB-010.md), [011](../test-cases/profile-web/TC-PROFILE-WEB-011.md), [012](../test-cases/profile-web/TC-PROFILE-WEB-012.md), [013](../test-cases/profile-web/TC-PROFILE-WEB-013.md), [014](../test-cases/profile-web/TC-PROFILE-WEB-014.md), [015](../test-cases/profile-web/TC-PROFILE-WEB-015.md), [021](../test-cases/profile-web/TC-PROFILE-WEB-021.md), [022](../test-cases/profile-web/TC-PROFILE-WEB-022.md), [023](../test-cases/profile-web/TC-PROFILE-WEB-023.md), [025](../test-cases/profile-web/TC-PROFILE-WEB-025.md), [026](../test-cases/profile-web/TC-PROFILE-WEB-026.md), [027](../test-cases/profile-web/TC-PROFILE-WEB-027.md), [028](../test-cases/profile-web/TC-PROFILE-WEB-028.md) | Đại diện partition; chưa execute |
| EP-PW-11 | [016](../test-cases/profile-web/TC-PROFILE-WEB-016.md), [017](../test-cases/profile-web/TC-PROFILE-WEB-017.md), [018](../test-cases/profile-web/TC-PROFILE-WEB-018.md) | Đại diện partition; chưa execute |
| EP-PW-12 | [019](../test-cases/profile-web/TC-PROFILE-WEB-019.md), [020](../test-cases/profile-web/TC-PROFILE-WEB-020.md) | Đại diện partition; chưa execute |
| EP-PW-13 | [024](../test-cases/profile-web/TC-PROFILE-WEB-024.md) | Đại diện partition; chưa execute |
| EP-PW-14 | [001](../test-cases/profile-web/TC-PROFILE-WEB-001.md), [002](../test-cases/profile-web/TC-PROFILE-WEB-002.md), [003](../test-cases/profile-web/TC-PROFILE-WEB-003.md), [004](../test-cases/profile-web/TC-PROFILE-WEB-004.md), [005](../test-cases/profile-web/TC-PROFILE-WEB-005.md), [006](../test-cases/profile-web/TC-PROFILE-WEB-006.md), [007](../test-cases/profile-web/TC-PROFILE-WEB-007.md), [008](../test-cases/profile-web/TC-PROFILE-WEB-008.md), [009](../test-cases/profile-web/TC-PROFILE-WEB-009.md), [010](../test-cases/profile-web/TC-PROFILE-WEB-010.md), [011](../test-cases/profile-web/TC-PROFILE-WEB-011.md), [012](../test-cases/profile-web/TC-PROFILE-WEB-012.md), [013](../test-cases/profile-web/TC-PROFILE-WEB-013.md), [014](../test-cases/profile-web/TC-PROFILE-WEB-014.md), [025](../test-cases/profile-web/TC-PROFILE-WEB-025.md), [026](../test-cases/profile-web/TC-PROFILE-WEB-026.md), [027](../test-cases/profile-web/TC-PROFILE-WEB-027.md), [028](../test-cases/profile-web/TC-PROFILE-WEB-028.md) | Đại diện partition; chưa execute |
| EP-PW-15 | [021](../test-cases/profile-web/TC-PROFILE-WEB-021.md), [022](../test-cases/profile-web/TC-PROFILE-WEB-022.md), [024](../test-cases/profile-web/TC-PROFILE-WEB-024.md) | Đại diện partition; chưa execute |
| EP-PW-16 | [001](../test-cases/profile-web/TC-PROFILE-WEB-001.md), [002](../test-cases/profile-web/TC-PROFILE-WEB-002.md), [003](../test-cases/profile-web/TC-PROFILE-WEB-003.md), [004](../test-cases/profile-web/TC-PROFILE-WEB-004.md), [005](../test-cases/profile-web/TC-PROFILE-WEB-005.md), [006](../test-cases/profile-web/TC-PROFILE-WEB-006.md), [007](../test-cases/profile-web/TC-PROFILE-WEB-007.md), [008](../test-cases/profile-web/TC-PROFILE-WEB-008.md), [009](../test-cases/profile-web/TC-PROFILE-WEB-009.md), [010](../test-cases/profile-web/TC-PROFILE-WEB-010.md), [011](../test-cases/profile-web/TC-PROFILE-WEB-011.md), [012](../test-cases/profile-web/TC-PROFILE-WEB-012.md), [013](../test-cases/profile-web/TC-PROFILE-WEB-013.md), [014](../test-cases/profile-web/TC-PROFILE-WEB-014.md), [021](../test-cases/profile-web/TC-PROFILE-WEB-021.md), [022](../test-cases/profile-web/TC-PROFILE-WEB-022.md), [027](../test-cases/profile-web/TC-PROFILE-WEB-027.md), [028](../test-cases/profile-web/TC-PROFILE-WEB-028.md) | Đại diện partition; chưa execute |
| EP-PW-17 | [023](../test-cases/profile-web/TC-PROFILE-WEB-023.md) | Đại diện partition; chưa execute |
| EP-PW-18 | [025](../test-cases/profile-web/TC-PROFILE-WEB-025.md) | Điểm hiển thị chỉ được exercise nếu dữ liệu được lưu (AM-07) |
| EP-PW-19 | [026](../test-cases/profile-web/TC-PROFILE-WEB-026.md) | Điểm hiển thị chỉ được exercise nếu dữ liệu được lưu (AM-07) |

## Boundary → Test Case

| Boundary | Vị trí | Giá trị | UI | API |
|---|---|---|---|---|
| B-PW-L = 10 | min−1 | 9 / `091234567` | [003](../test-cases/profile-web/TC-PROFILE-WEB-003.md) | [007](../test-cases/profile-web/TC-PROFILE-WEB-007.md) |
| B-PW-L = 10 | min | 10 / `0912345678` | [001](../test-cases/profile-web/TC-PROFILE-WEB-001.md) | [005](../test-cases/profile-web/TC-PROFILE-WEB-005.md) |
| B-PW-L = 10 | min+1 | 11 / `09123456789` | [002](../test-cases/profile-web/TC-PROFILE-WEB-002.md) | [006](../test-cases/profile-web/TC-PROFILE-WEB-006.md) |
| B-PW-U = 11 | max−1 | 10 / `0912345678` | [001](../test-cases/profile-web/TC-PROFILE-WEB-001.md) | [005](../test-cases/profile-web/TC-PROFILE-WEB-005.md) |
| B-PW-U = 11 | max | 11 / `09123456789` | [002](../test-cases/profile-web/TC-PROFILE-WEB-002.md) | [006](../test-cases/profile-web/TC-PROFILE-WEB-006.md) |
| B-PW-U = 11 | max+1 | 12 / `091234567890` | [004](../test-cases/profile-web/TC-PROFILE-WEB-004.md) | [008](../test-cases/profile-web/TC-PROFILE-WEB-008.md) |

## Test Case → Requirement / Partition / Boundary / Result

| Test Case | Requirement | Partition | Boundary | Result | Related Bugs |
|---|---|---|---|---|---|
| [TC-PROFILE-WEB-001](../test-cases/profile-web/TC-PROFILE-WEB-001.md) | FR-04 | EP-PW-01, EP-PW-10, EP-PW-14, EP-PW-16 | B-PW-L min; B-PW-U max−1 | Not Run | None |
| [TC-PROFILE-WEB-002](../test-cases/profile-web/TC-PROFILE-WEB-002.md) | FR-04 | EP-PW-01, EP-PW-10, EP-PW-14, EP-PW-16 | B-PW-L min+1; B-PW-U max | Not Run | None |
| [TC-PROFILE-WEB-003](../test-cases/profile-web/TC-PROFILE-WEB-003.md) | FR-04; FR-22 | EP-PW-02, EP-PW-10, EP-PW-14, EP-PW-16 | B-PW-L min−1 | Not Run | None |
| [TC-PROFILE-WEB-004](../test-cases/profile-web/TC-PROFILE-WEB-004.md) | FR-04 | EP-PW-03, EP-PW-10, EP-PW-14, EP-PW-16 | B-PW-U max+1 | Not Run | None |
| [TC-PROFILE-WEB-005](../test-cases/profile-web/TC-PROFILE-WEB-005.md) | FR-04 | EP-PW-01, EP-PW-10, EP-PW-14, EP-PW-16 | B-PW-L min; B-PW-U max−1 | Not Run | None |
| [TC-PROFILE-WEB-006](../test-cases/profile-web/TC-PROFILE-WEB-006.md) | FR-04 | EP-PW-01, EP-PW-10, EP-PW-14, EP-PW-16 | B-PW-L min+1; B-PW-U max | Not Run | None |
| [TC-PROFILE-WEB-007](../test-cases/profile-web/TC-PROFILE-WEB-007.md) | FR-04 | EP-PW-02, EP-PW-10, EP-PW-14, EP-PW-16 | B-PW-L min−1 | Not Run | None |
| [TC-PROFILE-WEB-008](../test-cases/profile-web/TC-PROFILE-WEB-008.md) | FR-04 | EP-PW-03, EP-PW-10, EP-PW-14, EP-PW-16 | B-PW-U max+1 | Not Run | None |
| [TC-PROFILE-WEB-009](../test-cases/profile-web/TC-PROFILE-WEB-009.md) | FR-04 | EP-PW-04, EP-PW-10, EP-PW-14, EP-PW-16 | — | Not Run | None |
| [TC-PROFILE-WEB-010](../test-cases/profile-web/TC-PROFILE-WEB-010.md) | FR-04 | EP-PW-04, EP-PW-10, EP-PW-14, EP-PW-16 | — | Not Run | None |
| [TC-PROFILE-WEB-011](../test-cases/profile-web/TC-PROFILE-WEB-011.md) | FR-04 | EP-PW-05, EP-PW-10, EP-PW-14, EP-PW-16 | — | Not Run | None |
| [TC-PROFILE-WEB-012](../test-cases/profile-web/TC-PROFILE-WEB-012.md) | FR-04 | EP-PW-05, EP-PW-10, EP-PW-14, EP-PW-16 | — | Not Run | None |
| [TC-PROFILE-WEB-013](../test-cases/profile-web/TC-PROFILE-WEB-013.md) | FR-04 | EP-PW-06, EP-PW-01, EP-PW-10, EP-PW-14, EP-PW-16 | — | Not Run | None |
| [TC-PROFILE-WEB-014](../test-cases/profile-web/TC-PROFILE-WEB-014.md) | FR-04 | EP-PW-07, EP-PW-01, EP-PW-10, EP-PW-14, EP-PW-16 | — | Not Run | None |
| [TC-PROFILE-WEB-015](../test-cases/profile-web/TC-PROFILE-WEB-015.md) | FR-04; FR-22 | EP-PW-08, EP-PW-09, EP-PW-10 | — | Not Run | None |
| [TC-PROFILE-WEB-016](../test-cases/profile-web/TC-PROFILE-WEB-016.md) | FR-04 | EP-PW-11 | — | Not Run | None |
| [TC-PROFILE-WEB-017](../test-cases/profile-web/TC-PROFILE-WEB-017.md) | FR-04; SEC-02 | EP-PW-11 | — | Not Run | None |
| [TC-PROFILE-WEB-018](../test-cases/profile-web/TC-PROFILE-WEB-018.md) | FR-04; SEC-02 | EP-PW-11 | — | Not Run | None |
| [TC-PROFILE-WEB-019](../test-cases/profile-web/TC-PROFILE-WEB-019.md) | FR-04; SEC-02 | EP-PW-12 | — | Not Run | None |
| [TC-PROFILE-WEB-020](../test-cases/profile-web/TC-PROFILE-WEB-020.md) | FR-04; SEC-02 | EP-PW-12 | — | Not Run | None |
| [TC-PROFILE-WEB-021](../test-cases/profile-web/TC-PROFILE-WEB-021.md) | FR-04; SEC-02 | EP-PW-10, EP-PW-15, EP-PW-16 | — | Not Run | None |
| [TC-PROFILE-WEB-022](../test-cases/profile-web/TC-PROFILE-WEB-022.md) | FR-04; SEC-02 | EP-PW-10, EP-PW-15, EP-PW-16 | — | Not Run | None |
| [TC-PROFILE-WEB-023](../test-cases/profile-web/TC-PROFILE-WEB-023.md) | FR-04; SEC-06 | EP-PW-10, EP-PW-17 | — | Not Run | None |
| [TC-PROFILE-WEB-024](../test-cases/profile-web/TC-PROFILE-WEB-024.md) | FR-04; SEC-02 | EP-PW-13, EP-PW-15 | — | Not Run | None |
| [TC-PROFILE-WEB-025](../test-cases/profile-web/TC-PROFILE-WEB-025.md) | FR-04; SEC-04 | EP-PW-18, EP-PW-10, EP-PW-14 | — | Not Run | None |
| [TC-PROFILE-WEB-026](../test-cases/profile-web/TC-PROFILE-WEB-026.md) | FR-04; SEC-04 | EP-PW-19, EP-PW-10, EP-PW-14 | — | Not Run | None |
| [TC-PROFILE-WEB-027](../test-cases/profile-web/TC-PROFILE-WEB-027.md) | FR-04 | EP-PW-01, EP-PW-06, EP-PW-07, EP-PW-10, EP-PW-14, EP-PW-16 | — | Not Run | None |
| [TC-PROFILE-WEB-028](../test-cases/profile-web/TC-PROFILE-WEB-028.md) | FR-04 | EP-PW-01, EP-PW-06, EP-PW-07, EP-PW-10, EP-PW-14, EP-PW-16 | — | Not Run | None |

17 partitions có case không phụ thuộc việc lưu dữ liệu HTML; 2 partitions có case điều kiện. 19/19 partitions **đã ánh xạ thiết kế**, không phải 19/19 đã được kiểm chứng. Các ambiguity và miền ngoài scope vẫn còn.

## Pool B — FR-10: Order State Machine

Nguồn: [phân tích Pool B](order-state-analysis.md), [fixture/danh mục cases](../test-cases/order-state/README.md). Module `ORDER-STATE`; 52 cases EP, **0 BVA** do không có ordered domain/threshold. Tất cả Not Run / None.

### Requirement → Test Case (Pool B)

| Requirement / Quy tắc nội bộ | Case | Mức bao phủ thiết kế |
|---|---|---|
| FR-10 R-OS-01: 5 states/target domain | [001](../test-cases/order-state/TC-ORDER-STATE-001.md), [002](../test-cases/order-state/TC-ORDER-STATE-002.md), [003](../test-cases/order-state/TC-ORDER-STATE-003.md), [004](../test-cases/order-state/TC-ORDER-STATE-004.md), [005](../test-cases/order-state/TC-ORDER-STATE-005.md), [034](../test-cases/order-state/TC-ORDER-STATE-034.md), [035](../test-cases/order-state/TC-ORDER-STATE-035.md), [036](../test-cases/order-state/TC-ORDER-STATE-036.md), [037](../test-cases/order-state/TC-ORDER-STATE-037.md), [038](../test-cases/order-state/TC-ORDER-STATE-038.md) | Enum và các payload đại diện; không suy numeric boundary |
| FR-10 R-OS-02: 3 admin forward edges | [001](../test-cases/order-state/TC-ORDER-STATE-001.md), [002](../test-cases/order-state/TC-ORDER-STATE-002.md), [003](../test-cases/order-state/TC-ORDER-STATE-003.md), [041](../test-cases/order-state/TC-ORDER-STATE-041.md) | API từng cặp và UI chuỗi trên đơn B |
| FR-10 R-OS-03: pending/confirmed cancel | [004](../test-cases/order-state/TC-ORDER-STATE-004.md), [005](../test-cases/order-state/TC-ORDER-STATE-005.md), [020](../test-cases/order-state/TC-ORDER-STATE-020.md), [021](../test-cases/order-state/TC-ORDER-STATE-021.md), [042](../test-cases/order-state/TC-ORDER-STATE-042.md), [043](../test-cases/order-state/TC-ORDER-STATE-043.md), [046](../test-cases/order-state/TC-ORDER-STATE-046.md), [047](../test-cases/order-state/TC-ORDER-STATE-047.md) | Admin/User, UI/API |
| FR-10 R-OS-04: user không hủy shipping | [022](../test-cases/order-state/TC-ORDER-STATE-022.md), [048](../test-cases/order-state/TC-ORDER-STATE-048.md), [051](../test-cases/order-state/TC-ORDER-STATE-051.md) | API trực tiếp, UI và UI cũ |
| FR-10 R-OS-05: final states | [012](../test-cases/order-state/TC-ORDER-STATE-012.md), [013](../test-cases/order-state/TC-ORDER-STATE-013.md), [014](../test-cases/order-state/TC-ORDER-STATE-014.md), [015](../test-cases/order-state/TC-ORDER-STATE-015.md), [016](../test-cases/order-state/TC-ORDER-STATE-016.md), [017](../test-cases/order-state/TC-ORDER-STATE-017.md), [018](../test-cases/order-state/TC-ORDER-STATE-018.md), [019](../test-cases/order-state/TC-ORDER-STATE-019.md), [023](../test-cases/order-state/TC-ORDER-STATE-023.md), [024](../test-cases/order-state/TC-ORDER-STATE-024.md), [044](../test-cases/order-state/TC-ORDER-STATE-044.md), [045](../test-cases/order-state/TC-ORDER-STATE-045.md), [049](../test-cases/order-state/TC-ORDER-STATE-049.md), [050](../test-cases/order-state/TC-ORDER-STATE-050.md), [052](../test-cases/order-state/TC-ORDER-STATE-052.md) | 8 admin edges sang state khác; canceled retry chỉ kiểm tra bảo toàn, response còn mở |
| FR-10 R-OS-06: illegal transition/error | [006](../test-cases/order-state/TC-ORDER-STATE-006.md), [007](../test-cases/order-state/TC-ORDER-STATE-007.md), [008](../test-cases/order-state/TC-ORDER-STATE-008.md), [009](../test-cases/order-state/TC-ORDER-STATE-009.md), [010](../test-cases/order-state/TC-ORDER-STATE-010.md), [011](../test-cases/order-state/TC-ORDER-STATE-011.md), [012](../test-cases/order-state/TC-ORDER-STATE-012.md), [013](../test-cases/order-state/TC-ORDER-STATE-013.md), [014](../test-cases/order-state/TC-ORDER-STATE-014.md), [015](../test-cases/order-state/TC-ORDER-STATE-015.md), [016](../test-cases/order-state/TC-ORDER-STATE-016.md), [017](../test-cases/order-state/TC-ORDER-STATE-017.md), [018](../test-cases/order-state/TC-ORDER-STATE-018.md), [019](../test-cases/order-state/TC-ORDER-STATE-019.md), [022](../test-cases/order-state/TC-ORDER-STATE-022.md), [023](../test-cases/order-state/TC-ORDER-STATE-023.md), [034](../test-cases/order-state/TC-ORDER-STATE-034.md), [035](../test-cases/order-state/TC-ORDER-STATE-035.md), [036](../test-cases/order-state/TC-ORDER-STATE-036.md), [037](../test-cases/order-state/TC-ORDER-STATE-037.md), [038](../test-cases/order-state/TC-ORDER-STATE-038.md), [039](../test-cases/order-state/TC-ORDER-STATE-039.md), [040](../test-cases/order-state/TC-ORDER-STATE-040.md), [051](../test-cases/order-state/TC-ORDER-STATE-051.md), [052](../test-cases/order-state/TC-ORDER-STATE-052.md) | Cặp sai, payload/resource và stale; không ấn định HTTP/wording |
| FR-12 / SEC-03 R-OS-07: role admin | [025](../test-cases/order-state/TC-ORDER-STATE-025.md), [026](../test-cases/order-state/TC-ORDER-STATE-026.md), [033](../test-cases/order-state/TC-ORDER-STATE-033.md), [041](../test-cases/order-state/TC-ORDER-STATE-041.md) | User/token sửa bị chặn; admin thao tác đơn B |
| SEC-02 R-OS-07/08: JWT | [029](../test-cases/order-state/TC-ORDER-STATE-029.md), [030](../test-cases/order-state/TC-ORDER-STATE-030.md), [031](../test-cases/order-state/TC-ORDER-STATE-031.md), [032](../test-cases/order-state/TC-ORDER-STATE-032.md), [033](../test-cases/order-state/TC-ORDER-STATE-033.md) | Hai endpoint thiếu/sai token; admin endpoint JWT sửa role |
| FR-18 R-OS-07: admin transition theo FR-10 | [001](../test-cases/order-state/TC-ORDER-STATE-001.md), [002](../test-cases/order-state/TC-ORDER-STATE-002.md), [003](../test-cases/order-state/TC-ORDER-STATE-003.md), [004](../test-cases/order-state/TC-ORDER-STATE-004.md), [005](../test-cases/order-state/TC-ORDER-STATE-005.md), [041](../test-cases/order-state/TC-ORDER-STATE-041.md), [042](../test-cases/order-state/TC-ORDER-STATE-042.md), [043](../test-cases/order-state/TC-ORDER-STATE-043.md), [044](../test-cases/order-state/TC-ORDER-STATE-044.md), [045](../test-cases/order-state/TC-ORDER-STATE-045.md), [052](../test-cases/order-state/TC-ORDER-STATE-052.md) | Không bao phủ toàn bộ FR-18, chỉ state mutations |
| FR-11 liên quan / AS-OS-03: user ownership | [027](../test-cases/order-state/TC-ORDER-STATE-027.md), [028](../test-cases/order-state/TC-ORDER-STATE-028.md) | Oracle mutation ownership chờ review; không dùng FR-11 view rule làm bằng chứng cấm mutation |

### Partition → Test Case (Pool B)

| Partition | Cases | Giới hạn |
|---|---|---|
| EP-OS-01 | [001](../test-cases/order-state/TC-ORDER-STATE-001.md), [041](../test-cases/order-state/TC-ORDER-STATE-041.md) | Đại diện partition; chưa execute |
| EP-OS-02 | [002](../test-cases/order-state/TC-ORDER-STATE-002.md), [041](../test-cases/order-state/TC-ORDER-STATE-041.md), [051](../test-cases/order-state/TC-ORDER-STATE-051.md) | Đại diện partition; chưa execute |
| EP-OS-03 | [003](../test-cases/order-state/TC-ORDER-STATE-003.md), [041](../test-cases/order-state/TC-ORDER-STATE-041.md) | Đại diện partition; chưa execute |
| EP-OS-04 | [004](../test-cases/order-state/TC-ORDER-STATE-004.md), [042](../test-cases/order-state/TC-ORDER-STATE-042.md) | Đại diện partition; chưa execute |
| EP-OS-05 | [005](../test-cases/order-state/TC-ORDER-STATE-005.md), [043](../test-cases/order-state/TC-ORDER-STATE-043.md) | Đại diện partition; chưa execute |
| EP-OS-06 | [006](../test-cases/order-state/TC-ORDER-STATE-006.md), [007](../test-cases/order-state/TC-ORDER-STATE-007.md) | Đại diện partition; chưa execute |
| EP-OS-07 | [008](../test-cases/order-state/TC-ORDER-STATE-008.md), [009](../test-cases/order-state/TC-ORDER-STATE-009.md) | Đại diện partition; chưa execute |
| EP-OS-08 | [010](../test-cases/order-state/TC-ORDER-STATE-010.md), [011](../test-cases/order-state/TC-ORDER-STATE-011.md) | Đại diện partition; chưa execute |
| EP-OS-09 | [012](../test-cases/order-state/TC-ORDER-STATE-012.md), [013](../test-cases/order-state/TC-ORDER-STATE-013.md), [014](../test-cases/order-state/TC-ORDER-STATE-014.md), [015](../test-cases/order-state/TC-ORDER-STATE-015.md), [045](../test-cases/order-state/TC-ORDER-STATE-045.md) | Đại diện partition; chưa execute |
| EP-OS-10 | [016](../test-cases/order-state/TC-ORDER-STATE-016.md), [017](../test-cases/order-state/TC-ORDER-STATE-017.md), [018](../test-cases/order-state/TC-ORDER-STATE-018.md), [019](../test-cases/order-state/TC-ORDER-STATE-019.md), [044](../test-cases/order-state/TC-ORDER-STATE-044.md), [052](../test-cases/order-state/TC-ORDER-STATE-052.md) | Đại diện partition; chưa execute |
| EP-OS-11 | [020](../test-cases/order-state/TC-ORDER-STATE-020.md), [046](../test-cases/order-state/TC-ORDER-STATE-046.md) | Đại diện partition; chưa execute |
| EP-OS-12 | [021](../test-cases/order-state/TC-ORDER-STATE-021.md), [047](../test-cases/order-state/TC-ORDER-STATE-047.md), [052](../test-cases/order-state/TC-ORDER-STATE-052.md) | Đại diện partition; chưa execute |
| EP-OS-13 | [022](../test-cases/order-state/TC-ORDER-STATE-022.md), [048](../test-cases/order-state/TC-ORDER-STATE-048.md), [051](../test-cases/order-state/TC-ORDER-STATE-051.md) | Đại diện partition; chưa execute |
| EP-OS-14 | [023](../test-cases/order-state/TC-ORDER-STATE-023.md), [049](../test-cases/order-state/TC-ORDER-STATE-049.md) | Đại diện partition; chưa execute |
| EP-OS-15 | [024](../test-cases/order-state/TC-ORDER-STATE-024.md), [050](../test-cases/order-state/TC-ORDER-STATE-050.md) | Bảo toàn canceled; không giải quyết response của retry |
| EP-OS-16 | [001](../test-cases/order-state/TC-ORDER-STATE-001.md), [002](../test-cases/order-state/TC-ORDER-STATE-002.md), [003](../test-cases/order-state/TC-ORDER-STATE-003.md), [004](../test-cases/order-state/TC-ORDER-STATE-004.md), [005](../test-cases/order-state/TC-ORDER-STATE-005.md), [006](../test-cases/order-state/TC-ORDER-STATE-006.md), [007](../test-cases/order-state/TC-ORDER-STATE-007.md), [008](../test-cases/order-state/TC-ORDER-STATE-008.md), [009](../test-cases/order-state/TC-ORDER-STATE-009.md), [010](../test-cases/order-state/TC-ORDER-STATE-010.md), [011](../test-cases/order-state/TC-ORDER-STATE-011.md), [012](../test-cases/order-state/TC-ORDER-STATE-012.md), [013](../test-cases/order-state/TC-ORDER-STATE-013.md), [014](../test-cases/order-state/TC-ORDER-STATE-014.md), [015](../test-cases/order-state/TC-ORDER-STATE-015.md), [016](../test-cases/order-state/TC-ORDER-STATE-016.md), [017](../test-cases/order-state/TC-ORDER-STATE-017.md), [018](../test-cases/order-state/TC-ORDER-STATE-018.md), [019](../test-cases/order-state/TC-ORDER-STATE-019.md), [034](../test-cases/order-state/TC-ORDER-STATE-034.md), [035](../test-cases/order-state/TC-ORDER-STATE-035.md), [036](../test-cases/order-state/TC-ORDER-STATE-036.md), [037](../test-cases/order-state/TC-ORDER-STATE-037.md), [038](../test-cases/order-state/TC-ORDER-STATE-038.md), [039](../test-cases/order-state/TC-ORDER-STATE-039.md), [041](../test-cases/order-state/TC-ORDER-STATE-041.md), [042](../test-cases/order-state/TC-ORDER-STATE-042.md), [043](../test-cases/order-state/TC-ORDER-STATE-043.md), [044](../test-cases/order-state/TC-ORDER-STATE-044.md), [045](../test-cases/order-state/TC-ORDER-STATE-045.md), [051](../test-cases/order-state/TC-ORDER-STATE-051.md), [052](../test-cases/order-state/TC-ORDER-STATE-052.md) | Đại diện partition; chưa execute |
| EP-OS-17 | [025](../test-cases/order-state/TC-ORDER-STATE-025.md), [026](../test-cases/order-state/TC-ORDER-STATE-026.md) | Đại diện partition; chưa execute |
| EP-OS-18 | [001](../test-cases/order-state/TC-ORDER-STATE-001.md), [002](../test-cases/order-state/TC-ORDER-STATE-002.md), [003](../test-cases/order-state/TC-ORDER-STATE-003.md), [004](../test-cases/order-state/TC-ORDER-STATE-004.md), [005](../test-cases/order-state/TC-ORDER-STATE-005.md), [006](../test-cases/order-state/TC-ORDER-STATE-006.md), [007](../test-cases/order-state/TC-ORDER-STATE-007.md), [008](../test-cases/order-state/TC-ORDER-STATE-008.md), [009](../test-cases/order-state/TC-ORDER-STATE-009.md), [010](../test-cases/order-state/TC-ORDER-STATE-010.md), [011](../test-cases/order-state/TC-ORDER-STATE-011.md), [012](../test-cases/order-state/TC-ORDER-STATE-012.md), [013](../test-cases/order-state/TC-ORDER-STATE-013.md), [014](../test-cases/order-state/TC-ORDER-STATE-014.md), [015](../test-cases/order-state/TC-ORDER-STATE-015.md), [016](../test-cases/order-state/TC-ORDER-STATE-016.md), [017](../test-cases/order-state/TC-ORDER-STATE-017.md), [018](../test-cases/order-state/TC-ORDER-STATE-018.md), [019](../test-cases/order-state/TC-ORDER-STATE-019.md), [020](../test-cases/order-state/TC-ORDER-STATE-020.md), [021](../test-cases/order-state/TC-ORDER-STATE-021.md), [022](../test-cases/order-state/TC-ORDER-STATE-022.md), [023](../test-cases/order-state/TC-ORDER-STATE-023.md), [024](../test-cases/order-state/TC-ORDER-STATE-024.md), [025](../test-cases/order-state/TC-ORDER-STATE-025.md), [026](../test-cases/order-state/TC-ORDER-STATE-026.md), [027](../test-cases/order-state/TC-ORDER-STATE-027.md), [028](../test-cases/order-state/TC-ORDER-STATE-028.md), [034](../test-cases/order-state/TC-ORDER-STATE-034.md), [035](../test-cases/order-state/TC-ORDER-STATE-035.md), [036](../test-cases/order-state/TC-ORDER-STATE-036.md), [037](../test-cases/order-state/TC-ORDER-STATE-037.md), [038](../test-cases/order-state/TC-ORDER-STATE-038.md), [039](../test-cases/order-state/TC-ORDER-STATE-039.md), [040](../test-cases/order-state/TC-ORDER-STATE-040.md), [041](../test-cases/order-state/TC-ORDER-STATE-041.md), [042](../test-cases/order-state/TC-ORDER-STATE-042.md), [043](../test-cases/order-state/TC-ORDER-STATE-043.md), [044](../test-cases/order-state/TC-ORDER-STATE-044.md), [045](../test-cases/order-state/TC-ORDER-STATE-045.md), [046](../test-cases/order-state/TC-ORDER-STATE-046.md), [047](../test-cases/order-state/TC-ORDER-STATE-047.md), [048](../test-cases/order-state/TC-ORDER-STATE-048.md), [049](../test-cases/order-state/TC-ORDER-STATE-049.md), [050](../test-cases/order-state/TC-ORDER-STATE-050.md), [051](../test-cases/order-state/TC-ORDER-STATE-051.md), [052](../test-cases/order-state/TC-ORDER-STATE-052.md) | Đại diện partition; chưa execute |
| EP-OS-19 | [029](../test-cases/order-state/TC-ORDER-STATE-029.md), [030](../test-cases/order-state/TC-ORDER-STATE-030.md) | Đại diện partition; chưa execute |
| EP-OS-20 | [031](../test-cases/order-state/TC-ORDER-STATE-031.md), [032](../test-cases/order-state/TC-ORDER-STATE-032.md) | Đại diện partition; chưa execute |
| EP-OS-21 | [033](../test-cases/order-state/TC-ORDER-STATE-033.md) | Đại diện partition; chưa execute |
| EP-OS-22 | [020](../test-cases/order-state/TC-ORDER-STATE-020.md), [021](../test-cases/order-state/TC-ORDER-STATE-021.md), [022](../test-cases/order-state/TC-ORDER-STATE-022.md), [023](../test-cases/order-state/TC-ORDER-STATE-023.md), [024](../test-cases/order-state/TC-ORDER-STATE-024.md), [046](../test-cases/order-state/TC-ORDER-STATE-046.md), [047](../test-cases/order-state/TC-ORDER-STATE-047.md), [048](../test-cases/order-state/TC-ORDER-STATE-048.md), [049](../test-cases/order-state/TC-ORDER-STATE-049.md), [050](../test-cases/order-state/TC-ORDER-STATE-050.md), [051](../test-cases/order-state/TC-ORDER-STATE-051.md), [052](../test-cases/order-state/TC-ORDER-STATE-052.md) | Đại diện partition; chưa execute |
| EP-OS-23 | [027](../test-cases/order-state/TC-ORDER-STATE-027.md), [028](../test-cases/order-state/TC-ORDER-STATE-028.md) | Theo AS-OS-03, chờ xác nhận ownership oracle |
| EP-OS-24 | [001](../test-cases/order-state/TC-ORDER-STATE-001.md), [002](../test-cases/order-state/TC-ORDER-STATE-002.md), [003](../test-cases/order-state/TC-ORDER-STATE-003.md), [004](../test-cases/order-state/TC-ORDER-STATE-004.md), [005](../test-cases/order-state/TC-ORDER-STATE-005.md), [006](../test-cases/order-state/TC-ORDER-STATE-006.md), [007](../test-cases/order-state/TC-ORDER-STATE-007.md), [008](../test-cases/order-state/TC-ORDER-STATE-008.md), [009](../test-cases/order-state/TC-ORDER-STATE-009.md), [010](../test-cases/order-state/TC-ORDER-STATE-010.md), [011](../test-cases/order-state/TC-ORDER-STATE-011.md), [012](../test-cases/order-state/TC-ORDER-STATE-012.md), [013](../test-cases/order-state/TC-ORDER-STATE-013.md), [014](../test-cases/order-state/TC-ORDER-STATE-014.md), [015](../test-cases/order-state/TC-ORDER-STATE-015.md), [016](../test-cases/order-state/TC-ORDER-STATE-016.md), [017](../test-cases/order-state/TC-ORDER-STATE-017.md), [018](../test-cases/order-state/TC-ORDER-STATE-018.md), [019](../test-cases/order-state/TC-ORDER-STATE-019.md), [020](../test-cases/order-state/TC-ORDER-STATE-020.md), [021](../test-cases/order-state/TC-ORDER-STATE-021.md), [022](../test-cases/order-state/TC-ORDER-STATE-022.md), [023](../test-cases/order-state/TC-ORDER-STATE-023.md), [024](../test-cases/order-state/TC-ORDER-STATE-024.md), [025](../test-cases/order-state/TC-ORDER-STATE-025.md), [026](../test-cases/order-state/TC-ORDER-STATE-026.md), [027](../test-cases/order-state/TC-ORDER-STATE-027.md), [028](../test-cases/order-state/TC-ORDER-STATE-028.md), [029](../test-cases/order-state/TC-ORDER-STATE-029.md), [030](../test-cases/order-state/TC-ORDER-STATE-030.md), [031](../test-cases/order-state/TC-ORDER-STATE-031.md), [032](../test-cases/order-state/TC-ORDER-STATE-032.md), [033](../test-cases/order-state/TC-ORDER-STATE-033.md), [034](../test-cases/order-state/TC-ORDER-STATE-034.md), [035](../test-cases/order-state/TC-ORDER-STATE-035.md), [036](../test-cases/order-state/TC-ORDER-STATE-036.md), [037](../test-cases/order-state/TC-ORDER-STATE-037.md), [038](../test-cases/order-state/TC-ORDER-STATE-038.md), [041](../test-cases/order-state/TC-ORDER-STATE-041.md), [042](../test-cases/order-state/TC-ORDER-STATE-042.md), [043](../test-cases/order-state/TC-ORDER-STATE-043.md), [044](../test-cases/order-state/TC-ORDER-STATE-044.md), [045](../test-cases/order-state/TC-ORDER-STATE-045.md), [046](../test-cases/order-state/TC-ORDER-STATE-046.md), [047](../test-cases/order-state/TC-ORDER-STATE-047.md), [048](../test-cases/order-state/TC-ORDER-STATE-048.md), [049](../test-cases/order-state/TC-ORDER-STATE-049.md), [050](../test-cases/order-state/TC-ORDER-STATE-050.md), [051](../test-cases/order-state/TC-ORDER-STATE-051.md), [052](../test-cases/order-state/TC-ORDER-STATE-052.md) | Đại diện partition; chưa execute |
| EP-OS-25 | [039](../test-cases/order-state/TC-ORDER-STATE-039.md), [040](../test-cases/order-state/TC-ORDER-STATE-040.md) | Đại diện partition; chưa execute |
| EP-OS-26 | [034](../test-cases/order-state/TC-ORDER-STATE-034.md) | Đại diện partition; chưa execute |
| EP-OS-27 | [035](../test-cases/order-state/TC-ORDER-STATE-035.md) | Đại diện partition; chưa execute |
| EP-OS-28 | [036](../test-cases/order-state/TC-ORDER-STATE-036.md) | Đại diện partition; chưa execute |
| EP-OS-29 | [037](../test-cases/order-state/TC-ORDER-STATE-037.md) | Đại diện partition; chưa execute |
| EP-OS-30 | [038](../test-cases/order-state/TC-ORDER-STATE-038.md) | Đại diện partition; chưa execute |

### Admin transition pair → Test Case

| Current | Target | Class | API case |
|---|---|---|---|
| pending | confirmed | VALID | [001](../test-cases/order-state/TC-ORDER-STATE-001.md) |
| confirmed | shipping | VALID | [002](../test-cases/order-state/TC-ORDER-STATE-002.md) |
| shipping | delivered | VALID | [003](../test-cases/order-state/TC-ORDER-STATE-003.md) |
| pending | canceled | VALID | [004](../test-cases/order-state/TC-ORDER-STATE-004.md) |
| confirmed | canceled | VALID | [005](../test-cases/order-state/TC-ORDER-STATE-005.md) |
| pending | shipping | INVALID | [006](../test-cases/order-state/TC-ORDER-STATE-006.md) |
| pending | delivered | INVALID | [007](../test-cases/order-state/TC-ORDER-STATE-007.md) |
| confirmed | pending | INVALID | [008](../test-cases/order-state/TC-ORDER-STATE-008.md) |
| confirmed | delivered | INVALID | [009](../test-cases/order-state/TC-ORDER-STATE-009.md) |
| shipping | pending | INVALID | [010](../test-cases/order-state/TC-ORDER-STATE-010.md) |
| shipping | confirmed | INVALID | [011](../test-cases/order-state/TC-ORDER-STATE-011.md) |
| delivered | pending | INVALID | [012](../test-cases/order-state/TC-ORDER-STATE-012.md) |
| delivered | confirmed | INVALID | [013](../test-cases/order-state/TC-ORDER-STATE-013.md) |
| delivered | shipping | INVALID | [014](../test-cases/order-state/TC-ORDER-STATE-014.md) |
| delivered | canceled | INVALID | [015](../test-cases/order-state/TC-ORDER-STATE-015.md) |
| canceled | pending | INVALID | [016](../test-cases/order-state/TC-ORDER-STATE-016.md) |
| canceled | confirmed | INVALID | [017](../test-cases/order-state/TC-ORDER-STATE-017.md) |
| canceled | shipping | INVALID | [018](../test-cases/order-state/TC-ORDER-STATE-018.md) |
| canceled | delivered | INVALID | [019](../test-cases/order-state/TC-ORDER-STATE-019.md) |
| shipping | canceled | Chờ AM-OS-01 | Chưa tạo case gán Expected Result |
| pending / confirmed / shipping / delivered / canceled | Chính current_status | Chờ AM-OS-02 | Không áp oracle error/no-op cho admin self-transition |

Đã ánh xạ **19/19 cặp có oracle** trong tổng 25 cặp admin: 5 valid + 14 invalid. 6 cặp chưa rõ không được tính là đã bao phủ yêu cầu chắc chắn. Cases 024/050 thử user retry canceled chỉ kiểm tra bất biến final state, không thay cho 5 admin self-transition policies.

### User cancel state → Test Case

| Current | Đích | Oracle | API | UI |
|---|---|---|---|---|
| pending | canceled | Thành công | [020](../test-cases/order-state/TC-ORDER-STATE-020.md) | [046](../test-cases/order-state/TC-ORDER-STATE-046.md) |
| confirmed | canceled | Thành công | [021](../test-cases/order-state/TC-ORDER-STATE-021.md) | [047](../test-cases/order-state/TC-ORDER-STATE-047.md) |
| shipping | canceled | Lỗi/không cho thao tác, giữ shipping | [022](../test-cases/order-state/TC-ORDER-STATE-022.md) | [048](../test-cases/order-state/TC-ORDER-STATE-048.md) |
| delivered | canceled | Lỗi/không cho thao tác, giữ delivered | [023](../test-cases/order-state/TC-ORDER-STATE-023.md) | [049](../test-cases/order-state/TC-ORDER-STATE-049.md) |
| canceled | canceled | Giữ canceled; response chưa xác định | [024](../test-cases/order-state/TC-ORDER-STATE-024.md) | [050](../test-cases/order-state/TC-ORDER-STATE-050.md) |

### Boundary → Test Case (Pool B)

| Variable | Kết quả đánh giá | BVA case |
|---|---|---|
| State/role/ownership/existence | Categorical; không có min/max | N/A |
| Order ID/time/counter | Không có requirement về ordered threshold | Chưa sinh BVA values |

0 boundary được requirement cung cấp, 0 BVA case. Đây là kết quả applicability, không tuyên bố đã kiểm chứng numeric boundaries.

### Test Case → Requirement / Partition / Result (Pool B)

| Test Case | Requirement | Partition | Technique | Result | Related Bugs |
|---|---|---|---|---|---|
| [TC-ORDER-STATE-001](../test-cases/order-state/TC-ORDER-STATE-001.md) | FR-10; FR-12; FR-18; SEC-02; SEC-03 | EP-OS-01, EP-OS-16, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-002](../test-cases/order-state/TC-ORDER-STATE-002.md) | FR-10; FR-12; FR-18; SEC-02; SEC-03 | EP-OS-02, EP-OS-16, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-003](../test-cases/order-state/TC-ORDER-STATE-003.md) | FR-10; FR-12; FR-18; SEC-02; SEC-03 | EP-OS-03, EP-OS-16, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-004](../test-cases/order-state/TC-ORDER-STATE-004.md) | FR-10; FR-12; FR-18; SEC-02; SEC-03 | EP-OS-04, EP-OS-16, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-005](../test-cases/order-state/TC-ORDER-STATE-005.md) | FR-10; FR-12; FR-18; SEC-02; SEC-03 | EP-OS-05, EP-OS-16, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-006](../test-cases/order-state/TC-ORDER-STATE-006.md) | FR-10; FR-12; FR-18; SEC-02; SEC-03 | EP-OS-06, EP-OS-16, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-007](../test-cases/order-state/TC-ORDER-STATE-007.md) | FR-10; FR-12; FR-18; SEC-02; SEC-03 | EP-OS-06, EP-OS-16, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-008](../test-cases/order-state/TC-ORDER-STATE-008.md) | FR-10; FR-12; FR-18; SEC-02; SEC-03 | EP-OS-07, EP-OS-16, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-009](../test-cases/order-state/TC-ORDER-STATE-009.md) | FR-10; FR-12; FR-18; SEC-02; SEC-03 | EP-OS-07, EP-OS-16, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-010](../test-cases/order-state/TC-ORDER-STATE-010.md) | FR-10; FR-12; FR-18; SEC-02; SEC-03 | EP-OS-08, EP-OS-16, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-011](../test-cases/order-state/TC-ORDER-STATE-011.md) | FR-10; FR-12; FR-18; SEC-02; SEC-03 | EP-OS-08, EP-OS-16, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-012](../test-cases/order-state/TC-ORDER-STATE-012.md) | FR-10; FR-12; FR-18; SEC-02; SEC-03 | EP-OS-09, EP-OS-16, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-013](../test-cases/order-state/TC-ORDER-STATE-013.md) | FR-10; FR-12; FR-18; SEC-02; SEC-03 | EP-OS-09, EP-OS-16, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-014](../test-cases/order-state/TC-ORDER-STATE-014.md) | FR-10; FR-12; FR-18; SEC-02; SEC-03 | EP-OS-09, EP-OS-16, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-015](../test-cases/order-state/TC-ORDER-STATE-015.md) | FR-10; FR-12; FR-18; SEC-02; SEC-03 | EP-OS-09, EP-OS-16, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-016](../test-cases/order-state/TC-ORDER-STATE-016.md) | FR-10; FR-12; FR-18; SEC-02; SEC-03 | EP-OS-10, EP-OS-16, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-017](../test-cases/order-state/TC-ORDER-STATE-017.md) | FR-10; FR-12; FR-18; SEC-02; SEC-03 | EP-OS-10, EP-OS-16, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-018](../test-cases/order-state/TC-ORDER-STATE-018.md) | FR-10; FR-12; FR-18; SEC-02; SEC-03 | EP-OS-10, EP-OS-16, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-019](../test-cases/order-state/TC-ORDER-STATE-019.md) | FR-10; FR-12; FR-18; SEC-02; SEC-03 | EP-OS-10, EP-OS-16, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-020](../test-cases/order-state/TC-ORDER-STATE-020.md) | FR-10; SEC-02 | EP-OS-11, EP-OS-18, EP-OS-22, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-021](../test-cases/order-state/TC-ORDER-STATE-021.md) | FR-10; SEC-02 | EP-OS-12, EP-OS-18, EP-OS-22, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-022](../test-cases/order-state/TC-ORDER-STATE-022.md) | FR-10; SEC-02 | EP-OS-13, EP-OS-18, EP-OS-22, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-023](../test-cases/order-state/TC-ORDER-STATE-023.md) | FR-10; SEC-02 | EP-OS-14, EP-OS-18, EP-OS-22, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-024](../test-cases/order-state/TC-ORDER-STATE-024.md) | FR-10; SEC-02 | EP-OS-15, EP-OS-18, EP-OS-22, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-025](../test-cases/order-state/TC-ORDER-STATE-025.md) | FR-10; FR-12; SEC-02; SEC-03 | EP-OS-17, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-026](../test-cases/order-state/TC-ORDER-STATE-026.md) | FR-10; FR-12; SEC-02; SEC-03 | EP-OS-17, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-027](../test-cases/order-state/TC-ORDER-STATE-027.md) | FR-10; FR-11 (liên quan); SEC-02; AS-OS-03 cần review | EP-OS-23, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-028](../test-cases/order-state/TC-ORDER-STATE-028.md) | FR-10; FR-11 (liên quan); SEC-02; AS-OS-03 cần review | EP-OS-23, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-029](../test-cases/order-state/TC-ORDER-STATE-029.md) | FR-10; SEC-02 | EP-OS-19, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-030](../test-cases/order-state/TC-ORDER-STATE-030.md) | FR-10; FR-12; SEC-02 | EP-OS-19, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-031](../test-cases/order-state/TC-ORDER-STATE-031.md) | FR-10; SEC-02 | EP-OS-20, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-032](../test-cases/order-state/TC-ORDER-STATE-032.md) | FR-10; FR-12; SEC-02 | EP-OS-20, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-033](../test-cases/order-state/TC-ORDER-STATE-033.md) | FR-10; FR-12; SEC-02; SEC-03 | EP-OS-21, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-034](../test-cases/order-state/TC-ORDER-STATE-034.md) | FR-10; FR-12; SEC-02; SEC-03 | EP-OS-26, EP-OS-16, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-035](../test-cases/order-state/TC-ORDER-STATE-035.md) | FR-10; FR-12; SEC-02; SEC-03 | EP-OS-27, EP-OS-16, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-036](../test-cases/order-state/TC-ORDER-STATE-036.md) | FR-10; FR-12; SEC-02; SEC-03 | EP-OS-28, EP-OS-16, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-037](../test-cases/order-state/TC-ORDER-STATE-037.md) | FR-10; FR-12; SEC-02; SEC-03 | EP-OS-29, EP-OS-16, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-038](../test-cases/order-state/TC-ORDER-STATE-038.md) | FR-10; FR-12; SEC-02; SEC-03 | EP-OS-30, EP-OS-16, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-039](../test-cases/order-state/TC-ORDER-STATE-039.md) | FR-10; FR-12; SEC-02 | EP-OS-25, EP-OS-18, EP-OS-16 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-040](../test-cases/order-state/TC-ORDER-STATE-040.md) | FR-10; SEC-02 | EP-OS-25, EP-OS-18 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-041](../test-cases/order-state/TC-ORDER-STATE-041.md) | FR-10; FR-18; FR-12 | EP-OS-01, EP-OS-02, EP-OS-03, EP-OS-16, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-042](../test-cases/order-state/TC-ORDER-STATE-042.md) | FR-10; FR-18; FR-12 | EP-OS-04, EP-OS-16, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-043](../test-cases/order-state/TC-ORDER-STATE-043.md) | FR-10; FR-18; FR-12 | EP-OS-05, EP-OS-16, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-044](../test-cases/order-state/TC-ORDER-STATE-044.md) | FR-10; FR-18 | EP-OS-10, EP-OS-16, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-045](../test-cases/order-state/TC-ORDER-STATE-045.md) | FR-10; FR-18 | EP-OS-09, EP-OS-16, EP-OS-18, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-046](../test-cases/order-state/TC-ORDER-STATE-046.md) | FR-10 | EP-OS-11, EP-OS-18, EP-OS-22, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-047](../test-cases/order-state/TC-ORDER-STATE-047.md) | FR-10 | EP-OS-12, EP-OS-18, EP-OS-22, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-048](../test-cases/order-state/TC-ORDER-STATE-048.md) | FR-10 | EP-OS-13, EP-OS-18, EP-OS-22, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-049](../test-cases/order-state/TC-ORDER-STATE-049.md) | FR-10 | EP-OS-14, EP-OS-18, EP-OS-22, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-050](../test-cases/order-state/TC-ORDER-STATE-050.md) | FR-10 | EP-OS-15, EP-OS-18, EP-OS-22, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-051](../test-cases/order-state/TC-ORDER-STATE-051.md) | FR-10; FR-18; AS-OS-04 | EP-OS-02, EP-OS-13, EP-OS-16, EP-OS-18, EP-OS-22, EP-OS-24 | Equivalence Partitioning | Not Run | None |
| [TC-ORDER-STATE-052](../test-cases/order-state/TC-ORDER-STATE-052.md) | FR-10; FR-18; AS-OS-04 | EP-OS-12, EP-OS-10, EP-OS-16, EP-OS-18, EP-OS-22, EP-OS-24 | Equivalence Partitioning | Not Run | None |

30/30 partitions có case thiết kế; EP-OS-23 phụ thuộc assumption. 2 stale cases chỉ exercise backend stale khi request được gửi sau khi server đổi state. Không có tỷ lệ coverage execution hoặc confirmed bug.

### Tổng số thiết kế hiện tại

| Pool | Feature | EP cases | BVA cases | Not Run |
|---|---|---:|---:|---:|
| A | FR-04 | 20 | 8 | 28 |
| B | FR-10 | 52 | 0 | 52 |
| Tổng | 2 features | 72 | 8 | 80 |

Số đếm trên chỉ là thiết kế; không tự xác nhận review/phê duyệt của Pool A hoặc Pool B.
