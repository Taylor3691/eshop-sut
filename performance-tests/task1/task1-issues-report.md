# Task 1.9 – Report Issues

## 1. Phạm vi kiểm tra

Các nguồn đã được đối chiếu:

- Raw JTL của Load, Spike, Stress và Endurance.
- `README.md` và các yêu cầu FR/SEC của SUT.
- `backend/server.js` và `backend/database.js`.
- `task1-human-review.md`.

Bảy phát hiện đã được tái hiện bằng HTTP request thật trên backend Node.js tạm ở cổng `3100`, dùng bản sao SQLite tách biệt. Ảnh request/response và JSON kết quả nằm trong `23120117_HW05_AI_Performance_100/Bug Reports/`; JWT và password đã được che. Báo cáo này không chứa URL GitHub Issue công khai.

## 2. Kiểm tra performance issues từ raw JTL

| Scenario | Max VU | Duration | HTTP samples | Error % | HTTP p95 | HTTP p99 | HTTP max |
|---|---:|---:|---:|---:|---:|---:|---:|
| Load | 20 | 359,92 giây | 4.151 | 0,00% | 13 ms | 17 ms | 75 ms |
| Spike | 100 | 179,42 giây | 4.233 | 0,00% | 14 ms | 21 ms | 44 ms |
| Stress | 120 | 299,99 giây | 13.538 | 0,00% | 12 ms | 19 ms | 58 ms |
| Endurance | 120 | 719,96 giây | 49.146 | 0,00% | 11 ms | 18 ms | 184 ms |

### Kết luận performance

Không có bằng chứng đủ mạnh để mở performance issue từ bốn raw logs:

- Không có HTTP error hoặc assertion failure.
- Không xuất hiện response code khác 200.
- HTTP p95 vẫn thấp ở tất cả scenario.
- Endurance giữ stable throughput khoảng 74,38 HTTP RPS trong 10 phút hold.
- CPU và Working Set trong Endurance không cho thấy saturation hoặc tăng không kiểm soát.

E2E Transaction Controller có p95 khoảng 10 giây vì chứa think-time 1–3 giây giữa các bước. Không được báo p95 E2E này như một lỗi API latency.

## 3. Runtime-confirmed issues

| ID | Tiêu đề | Loại | Mức độ | Trạng thái |
|---|---|---|---|---|
| ISSUE-01 | API Admin không kiểm tra role admin | Security/Authorization | Critical | Runtime-confirmed; screenshot available |
| ISSUE-02 | User có thể tự đổi role thành admin | Security/Privilege escalation | Critical | Runtime-confirmed; screenshot available |
| ISSUE-03 | Checkout tin cậy total_amount từ client | Functional/Security | High | Runtime-confirmed; screenshot available |
| ISSUE-04 | Giỏ hàng không được xóa sau checkout | Functional | High | Runtime-confirmed; screenshot available |
| ISSUE-05 | Thêm cùng sản phẩm tạo dòng trùng thay vì tăng quantity | Functional | Medium | Runtime-confirmed; screenshot available |
| ISSUE-06 | Công thức coupon phần trăm tạo số tiền sai | Functional | High | Runtime-confirmed; screenshot available |
| ISSUE-07 | Login lockout tăng sai bộ đếm và khóa sai thời gian | Functional/Security | High | Runtime-confirmed; screenshot available |

## 4. GitHub Issue drafts

### ISSUE-01 – Authenticated non-admin user can access Admin APIs

**Severity:** Critical  
**Requirement:** FR-12, SEC-03.

**Source evidence:**

- README yêu cầu mọi `/api/admin/*` phải kiểm tra JWT và `role = 'admin'`.
- Các route `/api/admin/users`, `/api/admin/orders`, xóa user, cập nhật order và CRUD coupon chỉ gọi `authenticateToken`.
- `authenticateToken` chỉ verify JWT và không kiểm tra `req.user.role`.

**Steps to reproduce:**

1. Đăng nhập bằng tài khoản user thường và lấy JWT.
2. Gửi `GET /api/admin/users` với `Authorization: Bearer <user-token>`.
3. Gửi `GET /api/admin/orders` bằng cùng token.

**Expected:** Server trả 403 cho tài khoản không có role admin.  
**Kết quả thực tế:** User role `user` gọi `GET /api/admin/users` và nhận HTTP 200 cùng danh sách 2 user.

**Impact:** User thường có thể đọc dữ liệu người dùng/đơn hàng và gọi các API thay đổi dữ liệu admin.

**Evidence cần chụp:** Request có token user thường; response 200; profile của user thể hiện role `user`.

---

### ISSUE-02 – User can self-assign the admin role through profile update

**Severity:** Critical  
**Requirement:** SEC-06.

**Source evidence:**

`PUT /api/users/me` đọc trường `role` từ request body và thêm `role = ?` vào câu UPDATE nếu client gửi trường này.

**Steps to reproduce:**

1. Đăng nhập bằng user thường.
2. Gửi `PUT /api/users/me` với body chứa `"role": "admin"`.
3. Gọi lại `GET /api/users/me`.

**Expected:** Server bỏ qua hoặc từ chối trường `role`; role vẫn là `user`.  
**Kết quả thực tế:** `PUT /api/users/me` chứa role `admin` trả HTTP 200; lần `GET /api/users/me` sau đó trả role `admin`.

**Impact:** Privilege escalation từ user thường thành admin.

**Evidence cần chụp:** Profile trước/sau, request body và response.

---

### ISSUE-03 – Checkout accepts client-controlled total_amount

**Severity:** High  
**Requirement:** FR-08.

**Source evidence:**

README yêu cầu backend tự tính tổng từ cart và không chấp nhận `total_amount` từ client. Route `/api/checkout` lại lấy trực tiếp `total_amount` từ `req.body` và ghi vào bảng orders.

**Steps to reproduce:**

1. Đăng nhập và thêm sản phẩm có giá lớn hơn 1 vào cart.
2. Gửi `POST /api/checkout` với `"total_amount": 1`.
3. Gọi order history hoặc Admin Orders để kiểm tra đơn vừa tạo.

**Expected:** Backend tính lại tổng đúng từ cart và bỏ qua giá client.  
**Kết quả thực tế:** Product giá 30000000 được thêm vào cart; checkout với total_amount 1 trả HTTP 200 và order history lưu total_amount 1.

**Impact:** Người dùng có thể tạo đơn với giá tùy ý.

**Evidence cần chụp:** Cart trước checkout, request checkout bị sửa giá, response có orderId và order history hiển thị tổng sai.

---

### ISSUE-04 – Cart remains populated after successful checkout

**Severity:** High  
**Requirement:** FR-08.

**Source evidence:**

README yêu cầu xóa cart sau checkout. Route `/api/checkout` tạo order nhưng không gán `userCarts[userId] = []` hoặc xóa các item.

**Steps to reproduce:**

1. Đăng nhập và thêm một item vào cart.
2. Gọi `GET /api/cart` và chụp cart trước checkout.
3. Checkout thành công.
4. Gọi lại `GET /api/cart`.

**Expected:** Cart rỗng.  
**Kết quả thực tế:** Cart có 1 item trước checkout và vẫn có 1 item sau response checkout HTTP 200.

**Impact:** Người dùng có thể checkout lặp lại item cũ; performance workflow tích lũy cart theo thời gian và làm workload thay đổi.

**Evidence cần chụp:** Hai response GET cart trước và sau checkout cùng response checkout thành công.

---

### ISSUE-05 – Adding the same product creates duplicate cart rows

**Severity:** Medium  
**Requirement:** FR-07.

**Source evidence:**

README yêu cầu thêm cùng sản phẩm phải tăng quantity. `POST /api/cart` luôn gọi `userCarts[userId].push(req.body)` và không tìm item có cùng product ID.

**Steps to reproduce:**

1. Đăng nhập.
2. Gửi hai lần `POST /api/cart` với cùng product ID và quantity 1.
3. Gọi `GET /api/cart`.

**Expected:** Một dòng sản phẩm với quantity 2.  
**Kết quả thực tế:** Hai request thêm product ID 1 tạo 2 dòng riêng cùng product ID, mỗi dòng quantity 1.

**Impact:** Cart hiển thị sai và tổng tiền/tương tác checkout có thể không nhất quán.

**Evidence cần chụp:** Hai request add-to-cart và response GET cart.

---

### ISSUE-06 – Percentage coupon calculation returns an invalid final amount

**Severity:** High  
**Requirement:** FR-09.

**Source evidence:**

Coupon `SAVE10` được seed với `discount_value = 10`. Backend tính:

```text
discount_amount = total_amount * (1 - discount_value)
final_amount = total_amount - discount_amount
```

Với total 1.000.000, công thức tạo discount -9.000.000 và final 10.000.000 thay vì discount 100.000 và final 900.000.

**Steps to reproduce:**

1. Gửi `POST /api/apply-coupon` với code `SAVE10` và total_amount 1.000.000.
2. Kiểm tra `discount_amount` và `final_amount`.

**Expected:** discount 100.000; final 900.000.  
**Kết quả thực tế:** `SAVE10` với total 1000000 trả discount_amount -9000000 và final_amount 10000000.

**Impact:** Tính tiền sai cho mọi coupon loại percent.

**Evidence cần chụp:** Request/response của `SAVE10` và dữ liệu coupon thể hiện 10%.

---

### ISSUE-07 – Login lockout counts two attempts per failure and locks for 180 seconds

**Severity:** High  
**Requirement:** FR-02 và yêu cầu 3-fail login lockout của HW5.

**Source evidence:**

- README yêu cầu mỗi lần sai tăng đúng 1, khóa sau ba lần và khóa 30 giây.
- Backend dùng `newAttempts = user.login_attempts + 2`.
- Backend đặt `locked_until` thêm 180.000 ms, tương đương 180 giây.

**Steps to reproduce:**

1. Dùng một account chưa bị khóa.
2. Đăng nhập sai lần thứ nhất.
3. Đăng nhập sai lần thứ hai.
4. Thử đăng nhập đúng ngay sau đó.

**Expected:** Sau hai lần sai, tài khoản chưa bị khóa; lần thứ ba mới khóa trong 30 giây.  
**Kết quả thực tế:** Hai login sai trả 401/401; login đúng ngay sau đó và sau 31 giây đều trả 403.

**Impact:** Người dùng hợp lệ bị khóa sớm và lâu hơn yêu cầu; Stress/Spike có credential sai sẽ làm sai kết quả kiểm thử.

**Evidence cần chụp:** Response từng lần login kèm thời gian hệ thống, response login đúng sau lần sai thứ hai và trạng thái account.

## 5. Thứ tự ưu tiên tái hiện và đăng GitHub

Nên tái hiện và đăng theo thứ tự:

1. ISSUE-01 – Admin APIs thiếu role authorization.
2. ISSUE-02 – User tự nâng role.
3. ISSUE-03 – Client kiểm soát total checkout.
4. ISSUE-07 – Sai cơ chế lockout.
5. ISSUE-04 – Cart không xóa sau checkout.
6. ISSUE-06 – Coupon percent tính sai.
7. ISSUE-05 – Cart tạo dòng trùng.

Không mở performance issue chỉ để đủ số lượng. Raw logs hiện tại không chứng minh crash, high latency hoặc elevated error rate.

## 6. Checklist trước khi đăng từng issue

- Tái hiện trên backend đang chạy từ source hiện tại.
- Dùng account test, không dùng dữ liệu cá nhân.
- Chụp request, response, timestamp và trạng thái trước/sau.
- Ẩn JWT/password trong ảnh.
- Tiêu đề GitHub Issue mô tả đúng một vấn đề.
- Đính kèm Expected, Actual, Steps to reproduce, Environment và Evidence.
- Nếu không tái hiện được, giữ dưới dạng candidate; không đăng như bug đã xác nhận.

