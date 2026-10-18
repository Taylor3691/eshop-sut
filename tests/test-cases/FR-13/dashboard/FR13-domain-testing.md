# FR-13 — Dashboard Domain Testing

## Requirement Analysis

- Requirement: FR-13 Dashboard, theo `README.md`.
- Functional rules: hiển thị tổng doanh thu chỉ cộng `total_amount` từ đơn `delivered`; hiển thị tổng số đơn hàng.
- Related access rule: FR-12 chỉ cho admin vào phân hệ Admin.
- Inputs/state: collection of orders, each order status and amount, user role/auth state.
- Expected outputs: sum of delivered amounts; count of all orders; dashboard data restricted to admin.
- Assumption for empty collection: sum/count display numeric zero. Confirm presentation with requirement owner if a different empty state is intended.

## Domain Analysis

| Variable | Valid partitions | Invalid / notable partitions | Notes |
|---|---|---|---|
| Order status for revenue | `delivered` is included | `pending`, `confirmed`, `shipping`, `canceled` are excluded | Status values from order workflow requirements |
| Order collection | One/more orders | Empty collection | Empty-set display is not explicitly described |
| Order amount | Numeric `total_amount` | Missing/non-numeric amount | Data integrity behavior is unspecified; do not create expected behavior |
| Access state | Authenticated admin | Customer role, unauthenticated | FR-12 access rule |

## Equivalence Partitions / Traceability

| Partition | Representative | Existing / New case |
|---|---|---|
| Delivered order | Amount is included in sum | TC-FR-13-DASHBOARD-001, 006 |
| Pending order | Excluded from revenue, included in order count | TC-FR-13-DASHBOARD-001, 002, 006 |
| Confirmed order | Excluded from revenue, included in order count | TC-FR-13-DASHBOARD-006 |
| Shipping order | Excluded from revenue, included in order count | TC-FR-13-DASHBOARD-006 |
| Canceled order | Excluded from revenue, included in order count | TC-FR-13-DASHBOARD-006 |
| No orders | Revenue = 0 and count = 0 (assumption) | TC-FR-13-DASHBOARD-007 |
| Admin / customer / guest | Allow admin; deny other roles | TC-FR-13-DASHBOARD-004, 005 |

## Boundary Analysis / BVA

FR-13 specifies no numeric threshold, date range, or amount limit. BVA does not apply. The empty order collection is a state partition, not a numeric boundary. Avoid inventing money-format or live-refresh requirements.

## Human Review / AI Gap Candidates

1. Confirm that an empty dashboard shows numeric zero rather than a separate empty state.
2. Confirm whether total order count includes canceled orders; FR-13 says total number of orders without excluding statuses, so current expected result counts all.
3. Define handling for missing/invalid `total_amount` and when dashboard figures refresh; these are not specified.
