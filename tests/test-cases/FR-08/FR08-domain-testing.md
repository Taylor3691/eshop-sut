# FR-08 — Domain Testing bổ sung

## Requirement Analysis

- Requirement: FR-08 Checkout, theo `README.md`.
- Rules: cần đăng nhập; tổng lấy từ cart và không được người dùng sửa trực tiếp; UI hiển thị đầy đủ sản phẩm; backend tính lại total và không tin `total_amount` do client gửi; thành công thì xóa cart.
- Preconditions: tài khoản thử nghiệm; cart và dữ liệu đơn có thể kiểm tra; dùng môi trường cô lập.
- Inputs: auth state, cart contents/current cart total, client total, checkout result/cart state.
- Expected outputs: checkout từ chối guest; tổng dựa trên cart hiện tại; danh sách khớp cart; cart rỗng sau success.
- Ambiguities: empty cart; API specification minh họa `total_amount` trong request trong khi FR-08 yêu cầu backend tự tính; behavior khi thiếu field chưa được mô tả rõ.

## Domain Analysis and Equivalence Partitions

| Variable | Valid / invalid partition | Coverage in existing tests |
|---|---|---|
| Authentication | Authenticated / guest | TC-FR-08-CHECKOUT-001, 002 |
| Cart | Populated / empty (expected unspecified) | TC-FR-08-CHECKOUT-001, 006, 007, 008 |
| Client total vs current cart total | Matching / lower / higher | TC-FR-08-CHECKOUT-001, 003, 004 |
| UI total control | Read-only/derived / directly editable | TC-FR-08-CHECKOUT-005 |
| Cart revision after displayed total | Current total differs from stale submitted value | TC-FR-08-CHECKOUT-009 (new interaction case) |
| Cart after checkout | Success -> empty | TC-FR-08-CHECKOUT-001, 007 |

## Boundary Analysis / BVA

FR-08 defines no numeric min/max for quantity or total. Do not invent numeric boundaries. The client-total partitions are relational (equal/lower/higher) rather than a specified threshold; use EP. Empty cart is a state partition with unresolved expected behavior. No BVA applies.

## Coverage Review

- Existing cases already cover core valid/invalid auth, total manipulation in both directions, UI total display, products, cart clearing, and ambiguous empty cart.
- Added TC-FR-08-CHECKOUT-009 for cross-variable interaction: the cart changes after the displayed/submitted amount becomes stale.
- API behavior when `total_amount` is omitted remains an ambiguity because the API specification shows the field in the request example.

## Human Review / AI Gap Candidates

1. Confirm whether checkout API accepts a request without `total_amount` while still deriving the total from cart.
2. Define expected behavior for an empty cart and failed checkout state preservation.
3. Confirm how to observe current cart contents and persisted order total in the approved test environment.
