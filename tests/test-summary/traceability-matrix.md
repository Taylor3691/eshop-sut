# Traceability Matrix — Pool A / FR-04

Ma trận **thiết kế**, không phải kết quả execution. Tiền tố case `TC-PROFILE-WEB-`; toàn bộ Result `Not Run`, Related Bugs `None`. Scope chỉ hồ sơ storefront/API.

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
