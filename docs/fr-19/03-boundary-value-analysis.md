# FR-19 — Boundary Value Analysis, 3-value

Chức năng: **FR-19 Quản lý Người dùng (Admin)**, kiểm trên app mobile `frontend-mobile/App.js`.

Kỹ thuật: với biên đóng `[Min, Max]`, lấy `Min-1`, `Min`, `Min+1`, `Max-1`, `Max`, `Max+1`. Giá trị `Min` và `Max` nằm trên biên. `Min+1` và `Max-1` nằm trong miền. `Min-1` và `Max+1` nằm sát ngoài miền.

Miền lấy từ bước 2 (`docs/fr-19/02-equivalence-partitioning.md`). Bước này chỉ tính số. Chưa viết test case.

## Kết quả

Bước 2 không có lớp VEC hay IEC, và không có khoảng `[Min, Max]`. Không có biên để lấy `Min-1`, `Min`, `Min+1`, `Max-1`, `Max`, `Max+1`.

Không bịa Max cho số người dùng, độ dài mật khẩu, hay id tài khoản. Bước 1 đã kết luận những biến đó không phải input của app mobile. FR-19 cũng không khai báo phân trang, nên không đặt `Limit`.
