# Bug report – HW05 Performance Testing

Repo: https://github.com/Taylor3691/eshop-sut/issues?q=label%3Ahw05

## Issue đã tạo (5)

| Issue | Loại | Mức độ | Tóm tắt | Bằng chứng |
|---|---|---|---|---|
| [#225](https://github.com/Taylor3691/eshop-sut/issues/225) | Chức năng (FR-02) | Major | Tài khoản bị khóa sau 2 lần sai thay vì 3 (`login_attempts + 2`) | `evidence/bugs/bug_lockout.png`, sampler `LOCK_04` trong 3 file `.jtl` |
| [#226](https://github.com/Taylor3691/eshop-sut/issues/226) | Bảo mật | Major | Body JSON không hợp lệ → 400 kèm trang HTML stack trace lộ đường dẫn server | `evidence/bugs/bug_stacktrace.png` |
| [#227](https://github.com/Taylor3691/eshop-sut/issues/227) | Chức năng (FR-06) | Minor | `GET /api/products/:id` trả 200 `{}` khi không tồn tại thay vì 404 | `evidence/bugs/bug_notfound.png` |
| [#228](https://github.com/Taylor3691/eshop-sut/issues/228) | Chức năng (FR-06) | Minor | Sản phẩm id chẵn trả `price` dạng chuỗi | `evidence/bugs/bug_pricetype.png` |
| [#229](https://github.com/Taylor3691/eshop-sut/issues/229) | **Hiệu năng** (FR-07) | Major | RAM `node` tăng 90 → 241 MB dưới tải Stress và không giảm sau khi hết tải; `userCarts` không giải phóng | `evidence/bugs/bug_memory.png` |

## Bug phát hiện lại, đã có issue từ trước (không tạo trùng)

| Issue có sẵn | Nội dung | HW05 xác nhận bằng |
|---|---|---|
| [#20](https://github.com/Taylor3691/eshop-sut/issues/20) | Coupon phần trăm (`SAVE10`) tạo giảm giá âm, tổng tiền tăng gấp 10 | Assertion `04_ApplyCoupon`: `total=6000000, discount=-54000000, final=60000000` |
| [#34](https://github.com/Taylor3691/eshop-sut/issues/34), [#68](https://github.com/Taylor3691/eshop-sut/issues/68) | Checkout tin `total_amount` do client gửi | Đọc code `POST /api/checkout` |
| [#70](https://github.com/Taylor3691/eshop-sut/issues/70) | Giỏ không được xóa sau checkout | Là nguyên nhân chức năng của #229 |

## Ảnh chụp trang GitHub Issues

Ảnh chụp toàn trang (nội dung, nhãn, ảnh bằng chứng đính kèm) của từng issue, chụp ngày 22/11/2026: [`evidence/issues/`](evidence/issues/)

| Issue | Ảnh |
|---|---|
| #225 | [`issue_225_lockout.jpg`](evidence/issues/issue_225_lockout.jpg) |
| #226 | [`issue_226_stacktrace.jpg`](evidence/issues/issue_226_stacktrace.jpg) |
| #227 | [`issue_227_notfound.jpg`](evidence/issues/issue_227_notfound.jpg) |
| #228 | [`issue_228_pricetype.jpg`](evidence/issues/issue_228_pricetype.jpg) |
| #229 | [`issue_229_memory.jpg`](evidence/issues/issue_229_memory.jpg) |
