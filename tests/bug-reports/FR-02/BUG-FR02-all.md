# Báo cáo các lỗi FR-02

Tài liệu này gom các TC FAILED theo nguyên nhân gốc. Mỗi mục có thể được tách thành một GitHub Issue riêng.

---

## BUG-FR02-001: Bộ đếm đăng nhập sai tăng 2 thay vì 1

**Các TC liên quan:** `TC-FR-02-LOGIN-007`, `TC-FR-02-LOGIN-009`, `TC-FR-02-LOGIN-011`, `TC-FR-02-LOGIN-012`, `TC-FR-02-LOGIN-013`

**Mức độ:** Major - Nghiêm trọng

### Môi trường

- Backend API: `POST http://localhost:3000/api/login`
- Cơ sở dữ liệu: SQLite
- Tài khoản: `test@eshop.com`
- Mật khẩu sai: `WrongPass123!`

### Các bước tái hiện

1. Đặt `login_attempts = 0` cho tài khoản `test@eshop.com`.
2. Đăng nhập một lần bằng mật khẩu sai.
3. Kiểm tra lại giá trị `login_attempts`.
4. Lặp lại lần đăng nhập sai thứ hai nếu cần kiểm tra ngưỡng khóa.

### Kết quả thực tế

- Sau một lần đăng nhập sai, bộ đếm tăng từ `0` lên `2`.
- Tài khoản bị khóa sau hai lần đăng nhập sai.

### Kết quả mong đợi

- Bộ đếm tăng chính xác một đơn vị: `0 -> 1`.
- Tài khoản chỉ bị khóa sau ít nhất ba lần đăng nhập sai liên tiếp.

### Bằng chứng

Backend hiện dùng:

```js
const newAttempts = user.login_attempts + 2;
```

### Đề xuất sửa

```js
const newAttempts = user.login_attempts + 1;
```

---

## BUG-FR02-002: Thời gian khóa tài khoản là 180 giây thay vì 30 giây

**Các TC liên quan:** `TC-FR-02-LOGIN-016`, `TC-FR-02-LOGIN-017`

**Mức độ:** Major - Nghiêm trọng

### Môi trường

- Backend API: `POST http://localhost:3000/api/login`
- Tài khoản đã đạt ngưỡng khóa

### Các bước tái hiện

1. Đưa tài khoản vào trạng thái bị khóa.
2. Chờ đủ 30 giây rồi thử đăng nhập bằng mật khẩu đúng.
3. Thử lại sau hơn 31 giây.

### Kết quả thực tế

- Tài khoản vẫn bị khóa sau 30 giây và sau hơn 31 giây.

### Kết quả mong đợi

- Tài khoản bị khóa đúng 30 giây.
- Sau khi hết 30 giây, người dùng được phép thử đăng nhập lại.

### Bằng chứng

Backend hiện đặt thời gian khóa là 180.000 mili giây, tương đương 180 giây:

```js
lockedUntil = new Date(Date.now() + 180000).toISOString();
```

### Đề xuất sửa

```js
lockedUntil = new Date(Date.now() + 30000).toISOString();
```

---

## BUG-FR02-003: Trường email không dùng HTML5 `type="email"`

**Các TC liên quan:** `TC-FR-02-LOGIN-029`, `TC-FR-02-LOGIN-031`

**Mức độ:** Medium - Trung bình

### Môi trường

- Frontend Web: `http://localhost:5173`
- Trang đăng nhập
- Trình duyệt: Chrome

### Các bước tái hiện

1. Mở trang đăng nhập.
2. Mở DevTools → Console.
3. Chạy:

```js
document.querySelector('form input').type
```

4. Hoặc nhập `abc` vào ô email rồi bấm đăng nhập.

### Kết quả thực tế

- Console trả về `"text"`.
- Form vẫn gửi request `/api/login` với email sai định dạng.
- Backend trả `401` thay vì trình duyệt chặn form trước khi gửi request.

### Kết quả mong đợi

- Ô email phải có `type="email"`.
- Email như `abc` hoặc `user@` phải bị trình duyệt từ chối.
- Không được gửi request `/api/login` khi định dạng email không hợp lệ.

### Bằng chứng

Trong `frontend-web/src/pages/Login.jsx`:

```jsx
<input
  type="text"
  value={email}
```

### Đề xuất sửa

```jsx
<input
  type="email"
  value={email}
```

---

## BUG-FR02-004: Client chấp nhận response đăng nhập không có token hoặc token rỗng

**Các TC liên quan:** `TC-FR-02-LOGIN-034`, `TC-FR-02-LOGIN-035`

**Mức độ:** Major - Nghiêm trọng

### Các bước tái hiện

1. Mô phỏng response đăng nhập thành công không có token:

```json
{
  "message": "Login successful",
  "user": {
    "email": "test@eshop.com"
  }
}
```

2. Hoặc mô phỏng response có:

```json
{
  "message": "Login successful",
  "token": "",
  "user": {}
}
```

3. Quan sát giao diện và Local Storage.

### Kết quả thực tế

- Client vẫn xử lý đăng nhập thành công.
- Giao diện có thể chuyển người dùng về trang chủ.
- Client lưu giá trị `undefined` hoặc token rỗng vào Local Storage.

### Kết quả mong đợi

- Client phải từ chối response nếu `token` không tồn tại hoặc rỗng.
- Không lưu token không hợp lệ.
- Không chuyển người dùng vào trạng thái đã đăng nhập.

### Bằng chứng

Trong `frontend-web/src/context/AuthContext.jsx`:

```js
setToken(res.data.token);
localStorage.setItem("token", res.data.token);
setUser(res.data.user);
```

Client chưa kiểm tra `res.data.token` trước khi lưu và cập nhật trạng thái đăng nhập.

### Đề xuất sửa

```js
if (!res.data.token || typeof res.data.token !== "string") {
  throw new Error("Invalid login response");
}

setToken(res.data.token);
localStorage.setItem("token", res.data.token);
setUser(res.data.user);
```

---

## BUG-FR02-005: Response đăng nhập làm lộ mật khẩu dạng plaintext

**TC liên quan:** `TC-FR-02-LOGIN-036`

**Mức độ:** Critical - Nghiêm trọng về bảo mật

### Các bước tái hiện

1. Đăng nhập bằng tài khoản hợp lệ:
   - Email: `test@eshop.com`
   - Mật khẩu: `Test1234!`
2. Mở DevTools → Network.
3. Chọn request `/api/login` → tab **Response**.
4. Kiểm tra dữ liệu trả về trong trường `user`.

### Kết quả thực tế

Response chứa trường mật khẩu dạng plaintext, ví dụ:

```json
{
  "user": {
    "email": "test@eshop.com",
    "password": "Test1234!"
  }
}
```

### Kết quả mong đợi

Response không được chứa `password`, plaintext password hoặc bất kỳ secret nào.

### Bằng chứng

Backend trả toàn bộ đối tượng user:

```js
res.json({ message: "Login successful", token, user });
```

Đối tượng `user` được lấy bằng `SELECT *`, nên bao gồm cả trường `password`.

### Đề xuất sửa

Chỉ trả các trường cần thiết:

```js
const safeUser = {
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
};

res.json({ message: "Login successful", token, user: safeUser });
```

---

## BUG-FR02-006: Giao diện không hiển thị thông báo tài khoản bị khóa

**TC liên quan:** `TC-FR-02-LOGIN-038`

**Mức độ:** Medium - Trung bình

### Các bước tái hiện

1. Đưa tài khoản đến trạng thái bị khóa.
2. Thử đăng nhập lại, kể cả khi dùng mật khẩu đúng.
3. Quan sát thông báo trên giao diện.

### Kết quả thực tế

- Backend trả lỗi tài khoản bị khóa.
- Giao diện chỉ hiển thị thông báo chung:
  `Đăng nhập thất bại. Vui lòng kiểm tra lại.`
- Người dùng không biết tài khoản đang bị khóa hoặc cần thử lại sau.

### Kết quả mong đợi

Giao diện phải hiển thị thông báo phù hợp, ví dụ:

```text
Tài khoản đang bị khóa. Vui lòng thử lại sau.
```

Thông báo không được hiển thị số lần đăng nhập sai hoặc thông tin nội bộ.

### Bằng chứng

Trong `frontend-web/src/pages/Login.jsx`, mọi lỗi login đều bị thay bằng cùng một thông báo:

```js
catch (err) {
  setError('Đăng nhập thất bại. Vui lòng kiểm tra lại.');
}
```

### Đề xuất sửa

Phân biệt lỗi khóa tài khoản, ví dụ dựa trên HTTP status `403`, nhưng vẫn dùng thông báo an toàn cho người dùng.

---

## Tóm tắt

| Mã bug | Mô tả | TC liên quan | Mức độ |
|---|---|---|---|
| BUG-FR02-001 | Bộ đếm tăng 2 thay vì 1 | 007, 009, 011, 012, 013 | Major |
| BUG-FR02-002 | Khóa 180 giây thay vì 30 giây | 016, 017 | Major |
| BUG-FR02-003 | Email dùng `type="text"` | 029, 031 | Medium |
| BUG-FR02-004 | Chấp nhận token thiếu hoặc rỗng | 034, 035 | Major |
| BUG-FR02-005 | Lộ mật khẩu plaintext | 036 | Critical |
| BUG-FR02-006 | Không hiển thị lỗi tài khoản bị khóa | 038 | Medium |
