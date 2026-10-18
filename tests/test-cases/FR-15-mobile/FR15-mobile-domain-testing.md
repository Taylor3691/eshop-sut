# FR-15 Mobile — Domain Testing bổ sung

## Requirement Analysis

- Requirement: FR-15 Product CRUD, theo `README.md`.
- Rules: Admin thêm/xem/sửa/xóa sản phẩm; name bắt buộc, tối đa 255 ký tự; price bắt buộc và > 0; category bắt buộc và phải thuộc danh sách có sẵn; khi sửa chỉ sản phẩm mục tiêu thay đổi.
- Mobile scope: app mobile chỉ xem catalog/chi tiết, không có màn hình Admin CRUD. Input validation cần gửi qua Admin API/UI; mobile dùng để xác nhận sản phẩm hợp lệ được hiển thị và dữ liệu không hợp lệ không xuất hiện.
- Preconditions: admin token hợp lệ, category có sẵn cho ca hợp lệ, mobile kết nối cùng backend, dữ liệu test cô lập.
- Ambiguities: whitespace-only name, decimal/precision/maximum price, cách xử lý category ID không tồn tại, exact API status/error message chưa được FR-15 quy định.

## Domain Analysis

| Variable | Type | Valid domain | Invalid domain | Constraint / Notes |
|---|---|---|---|---|
| Product name | String | Non-empty, length <= 255 | Empty; length > 255 | No lower length beyond required/non-empty |
| Product price | Numeric | > 0 | <= 0 | Threshold at 0; no maximum/precision specified |
| Category | ID/selection | Existing category selected | Missing category | Non-existing category ID behavior is not explicit |
| Product state | Entity state | Created/updated product visible | Deleted product absent | Mobile checks catalog after reload |
| Update target | Entity identity | Target product alone changes | Other products change | Cross-entity interaction |

## Equivalence Partitions and Boundaries

| Partition / boundary | Representative values | Test case |
|---|---|---|
| Name valid below max | 254 characters | TC-FR-15-PRODUCT-MOBILE-005 |
| Name valid at max | 255 characters | TC-FR-15-PRODUCT-MOBILE-005 |
| Name invalid above max | 256 characters | TC-FR-15-PRODUCT-MOBILE-006 |
| Name invalid empty | Empty string | TC-FR-15-PRODUCT-MOBILE-007 |
| Price valid just above 0 | 1 VND unit | TC-FR-15-PRODUCT-MOBILE-008 |
| Price invalid at/below 0 | 0 and -1 | TC-FR-15-PRODUCT-MOBILE-009 |
| Category valid | Existing category | TC-FR-15-PRODUCT-MOBILE-001 (existing) |
| Category invalid | Omitted category | TC-FR-15-PRODUCT-MOBILE-010 |
| Create/update/delete propagation and isolation | Product entity states | TC-FR-15-PRODUCT-MOBILE-001–004 (existing) |

## BVA and Coverage

- Name upper boundary 255: 254 and 255 expected valid; 256 invalid.
- Price threshold 0: 0 and -1 invalid; 1 VND is a positive representative under integer-VND test data. The spec does not define precision or a maximum, so 1 is not claimed to be the smallest representable value.
- Category is categorical; use EP, not BVA.
- Existing mobile propagation cases plus six new validation cases cover the stated FR-15 partitions. These cases do not claim that validation is performed by the mobile UI.

## Human Review / AI Gap Candidates

1. Confirm whether whitespace-only names count as empty.
2. Confirm supported price precision and whether 1 VND is an acceptable smallest positive test amount.
3. Confirm expected error behavior for a category ID that does not exist; current TC tests a missing category only.
4. Admin UI has no explicit name `maxLength` in its visible input; validate the requirement through the authorized API/admin workflow and record actual behavior.
