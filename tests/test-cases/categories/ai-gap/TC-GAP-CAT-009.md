# TC-GAP-CAT-009: Xóa danh mục đang có sản phẩm liên kết gây mồ côi dữ liệu khóa ngoại (Orphaned Foreign Key)

## Requirement ID

FR-14

## Module / Test Type / Technique

CATEGORIES / Functional / AI Gap Analysis

## Preconditions

- Tài khoản Admin có JWT Token hợp lệ.
- Danh mục `id = 1` ("Điện thoại") đang có ít nhất 2 sản phẩm liên kết (`iPhone 15 Pro Max` và `Samsung Galaxy S24 Ultra` có `category_id = 1`).

## Test Data

| Field | Value |
|---|---|
| Method & Endpoint | `DELETE /api/categories/1` |
| Headers | `Authorization: Bearer <ADMIN_JWT_TOKEN>` |

## Test Steps

1. Xác nhận các sản phẩm trong `GET /api/products` có `category_id = 1`.
2. Gửi request `DELETE /api/categories/1` bằng tài khoản Admin.
3. Kiểm tra phản hồi từ server.
4. Gửi `GET /api/products` để kiểm tra giá trị `category_id` của các sản phẩm liên quan.

## Expected Result

- Hệ thống phải kiểm tra toàn vẹn dữ liệu quan hệ: Từ chối xóa danh mục khi còn sản phẩm liên kết (HTTP 400 hoặc 409 Conflict), hoặc cập nhật chuyển đổi danh mục cho các sản phẩm.
- Không để xảy ra tình trạng các sản phẩm trỏ tới một `category_id` không còn tồn tại trong hệ thống.

## Actual Result

HTTP 200; `{"message":"Category deleted"}`

## Missing Scenario

Kiểm tra việc xóa danh mục đang có sản phẩm thuộc về nó dẫn đến việc sản phẩm bị mồ côi (`category_id` trỏ tới ID không còn tồn tại) do thiếu ràng buộc khóa ngoại trong CSDL.

## Gap Rationale

Hệ thống SQLite không kích hoạt `PRAGMA foreign_keys = ON` và API backend không kiểm tra bảng `products` trước khi xóa danh mục. Kết quả là danh mục bị xóa mất nhưng sản phẩm vẫn giữ `category_id = 1`, làm hỏng bộ lọc sản phẩm trên giao diện người dùng.

## Status / Related Bugs

FAIL / DEF-FR14-05 — see [execution report](../../../test-summary/FR-14-ai-gap-analysis.md).
