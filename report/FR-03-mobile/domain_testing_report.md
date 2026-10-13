# Báo cáo Thực thi Kiểm thử Miền giá trị (Domain Testing Report) — FR-03 Mobile: Quên mật khẩu

---

## 1. Thông tin Tổng quan (Execution Overview)

- **Mã Yêu cầu (Feature ID)**: FR-03 — Quên mật khẩu và Đặt lại mật khẩu 2 bước
- **Hệ thống Kiểm thử (SUT)**: EShop Mobile App, Expo web renderer
- **Công cụ Tự động hóa**: Playwright Automation
- **Môi trường Thực thi**:
  - Mobile UI renderer: `http://localhost:8081/`
  - Backend API: `http://localhost:3000`
  - Playwright routed the configured mobile API host to the local backend; application code was not changed.
- **Ngày thực thi**: 13/10/2026
- **Tài khoản kiểm thử**: `test@eshop.com`; `admin@eshop.com`
- **Giới hạn môi trường**: Native `Alert.alert` text was not exposed by Expo web. Cross-account substitution could not be entered because the mobile reset form has no step-2 email field.

---

## 2. Thống kê Kết quả Thực thi (Execution Summary Metrics)

| Chỉ số             | Giá trị |  Tỷ lệ |
| ------------------ | ------: | -----: |
| Tổng số Test Case  |      30 |   100% |
| Đã thực thi        |      30 |   100% |
| PASS               |      19 | 63.33% |
| FAIL               |       8 | 26.67% |
| BLOCKED            |       3 | 10.00% |
| NOT EXECUTED       |       0 |  0.00% |
| Defect đã xác minh |       6 |      — |

---

## 3. Bảng Kết quả Thực thi Chi tiết

| Test Case ID      | Kịch bản / Actual Result                                                    | Trạng thái | Minh chứng                                                                                 | Defect ID      |
| ----------------- | --------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------ | -------------- |
| TC-MOB-FORGOT-001 | Login chuyển sang màn hình Quên mật khẩu, hiển thị email và nút OTP.        | PASS       | [TC-MOB-FORGOT-001.png](test-cases/FR-03-mobile/screenshots/TC-MOB-FORGOT-001.png)         | —              |
| TC-MOB-FORGOT-002 | Không hiển thị chỉ báo bước tại Bước 1.                                     | FAIL       | [TC-MOB-FORGOT-001.png](test-cases/FR-03-mobile/screenshots/TC-MOB-FORGOT-001.png)         | D-FR03-MOB-001 |
| TC-MOB-FORGOT-003 | Không có nút Quay lại đăng nhập tại Bước 1.                                 | FAIL       | [TC-MOB-FORGOT-001.png](test-cases/FR-03-mobile/screenshots/TC-MOB-FORGOT-001.png)         | D-FR03-MOB-002 |
| TC-MOB-FORGOT-004 | Email hợp lệ trả HTTP 200 và chuyển Bước 2.                                 | PASS       | [TC-MOB-FORGOT-011.png](test-cases/FR-03-mobile/screenshots/TC-MOB-FORGOT-011.png)         | —              |
| TC-MOB-FORGOT-005 | Không hiển thị giá trị OTP trên màn hình.                                   | FAIL       | [TC-MOB-FORGOT-011.png](test-cases/FR-03-mobile/screenshots/TC-MOB-FORGOT-011.png)         | D-FR03-MOB-003 |
| TC-MOB-FORGOT-006 | HTTP 404, vẫn ở Bước 1; native alert không quan sát được trên web.          | BLOCKED    | [TC-MOB-FORGOT-006.png](test-cases/FR-03-mobile/screenshots/TC-MOB-FORGOT-006.png)         | —              |
| TC-MOB-FORGOT-007 | Email rỗng bị từ chối, vẫn ở Bước 1; native alert không quan sát được.      | BLOCKED    | [TC-MOB-FORGOT-007.png](test-cases/FR-03-mobile/screenshots/TC-MOB-FORGOT-007.png)         | —              |
| TC-MOB-FORGOT-008 | Email sai định dạng trả HTTP 404.                                           | PASS       | [TC-MOB-FORGOT-008.png](test-cases/FR-03-mobile/screenshots/TC-MOB-FORGOT-008.png)         | —              |
| TC-MOB-FORGOT-009 | Email có khoảng trắng không được trim, trả HTTP 404.                        | PASS       | [TC-MOB-FORGOT-009.png](test-cases/FR-03-mobile/screenshots/TC-MOB-FORGOT-009.png)         | —              |
| TC-MOB-FORGOT-010 | Email chữ hoa trả HTTP 404, không matching không phân biệt hoa thường.      | FAIL       | [TC-MOB-FORGOT-010.png](test-cases/FR-03-mobile/screenshots/TC-MOB-FORGOT-010.png)         | D-FR03-MOB-005 |
| TC-MOB-FORGOT-011 | Bước 2 hiển thị OTP, mật khẩu mới, reset và quay lại.                       | PASS       | [TC-MOB-FORGOT-011.png](test-cases/FR-03-mobile/screenshots/TC-MOB-FORGOT-011.png)         | —              |
| TC-MOB-FORGOT-012 | Không hiển thị chỉ báo bước tại Bước 2.                                     | FAIL       | [TC-MOB-FORGOT-011.png](test-cases/FR-03-mobile/screenshots/TC-MOB-FORGOT-011.png)         | D-FR03-MOB-001 |
| TC-MOB-FORGOT-013 | Thiếu trường Xác nhận mật khẩu mới.                                         | FAIL       | [TC-MOB-FORGOT-011.png](test-cases/FR-03-mobile/screenshots/TC-MOB-FORGOT-011.png)         | D-FR03-MOB-004 |
| TC-MOB-FORGOT-014 | UI và backend dùng OTP 4 số thay vì 6 số.                                   | FAIL       | [TC-MOB-FORGOT-011.png](test-cases/FR-03-mobile/screenshots/TC-MOB-FORGOT-011.png)         | D-FR03-MOB-003 |
| TC-MOB-FORGOT-015 | Token thật 4 số và mật khẩu mạnh đưa UI về Login.                           | PASS       | [TC-MOB-FORGOT-020.png](test-cases/FR-03-mobile/screenshots/TC-MOB-FORGOT-020.png)         | —              |
| TC-MOB-FORGOT-016 | OTP sai giữ ở Bước 2, backend trả HTTP 400.                                 | PASS       | [TC-MOB-BVA-FORGOT-001.png](test-cases/FR-03-mobile/screenshots/TC-MOB-BVA-FORGOT-001.png) | —              |
| TC-MOB-FORGOT-017 | OTP rỗng giữ ở Bước 2.                                                      | PASS       | [TC-MOB-BVA-FORGOT-001.png](test-cases/FR-03-mobile/screenshots/TC-MOB-BVA-FORGOT-001.png) | —              |
| TC-MOB-FORGOT-018 | OTP không phải số giữ ở Bước 2.                                             | PASS       | [TC-MOB-BVA-FORGOT-001.png](test-cases/FR-03-mobile/screenshots/TC-MOB-BVA-FORGOT-001.png) | —              |
| TC-MOB-FORGOT-019 | Không có email ở Bước 2 nên không nhập được kịch bản chéo tài khoản qua UI. | BLOCKED    | [TC-MOB-FORGOT-011.png](test-cases/FR-03-mobile/screenshots/TC-MOB-FORGOT-011.png)         | —              |
| TC-MOB-FORGOT-020 | Mật khẩu mạnh 8 ký tự thành công với token thật.                            | PASS       | [TC-MOB-BVA-FORGOT-003.png](test-cases/FR-03-mobile/screenshots/TC-MOB-BVA-FORGOT-003.png) | —              |
| TC-MOB-FORGOT-021 | Mật khẩu 7 ký tự không chuyển bước.                                         | PASS       | [TC-MOB-BVA-FORGOT-007.png](test-cases/FR-03-mobile/screenshots/TC-MOB-BVA-FORGOT-007.png) | —              |
| TC-MOB-FORGOT-022 | Mật khẩu rỗng không chuyển bước.                                            | PASS       | [TC-MOB-BVA-FORGOT-007.png](test-cases/FR-03-mobile/screenshots/TC-MOB-BVA-FORGOT-007.png) | —              |
| TC-MOB-FORGOT-023 | Thiếu chữ hoa không chuyển bước.                                            | PASS       | [TC-MOB-BVA-FORGOT-007.png](test-cases/FR-03-mobile/screenshots/TC-MOB-BVA-FORGOT-007.png) | —              |
| TC-MOB-FORGOT-024 | Thiếu chữ thường không chuyển bước.                                         | PASS       | [TC-MOB-BVA-FORGOT-007.png](test-cases/FR-03-mobile/screenshots/TC-MOB-BVA-FORGOT-007.png) | —              |
| TC-MOB-FORGOT-025 | Thiếu chữ số không chuyển bước.                                             | PASS       | [TC-MOB-BVA-FORGOT-007.png](test-cases/FR-03-mobile/screenshots/TC-MOB-BVA-FORGOT-007.png) | —              |
| TC-MOB-FORGOT-026 | Thiếu ký tự đặc biệt không chuyển bước.                                     | PASS       | [TC-MOB-BVA-FORGOT-017.png](test-cases/FR-03-mobile/screenshots/TC-MOB-BVA-FORGOT-017.png) | —              |
| TC-MOB-FORGOT-027 | Ký tự đặc biệt `@` được chấp nhận.                                          | PASS       | [TC-MOB-BVA-FORGOT-003.png](test-cases/FR-03-mobile/screenshots/TC-MOB-BVA-FORGOT-003.png) | —              |
| TC-MOB-FORGOT-028 | Ký tự `#` được chấp nhận dù FR-01 loại trừ.                                 | FAIL       | [TC-MOB-FORGOT-028.png](test-cases/FR-03-mobile/screenshots/TC-MOB-FORGOT-028.png)         | D-FR03-MOB-006 |
| TC-MOB-FORGOT-029 | Nút quay lại Bước 2 về Bước 1 và giữ email.                                 | PASS       | [TC-MOB-FORGOT-007.png](test-cases/FR-03-mobile/screenshots/TC-MOB-FORGOT-007.png)         | —              |
| TC-MOB-FORGOT-030 | Đăng nhập bằng mật khẩu mới thành công, hiển thị Test User.                 | PASS       | [TC-MOB-FORGOT-030.png](test-cases/FR-03-mobile/screenshots/TC-MOB-FORGOT-030.png)         | —              |

---

## 4. Danh mục Lỗi Xác minh (Verified Defect Catalog)

### D-FR03-MOB-001: Thiếu Step Indicator

- **Mức độ**: Major
- **Phạm vi**: TC-MOB-FORGOT-002, TC-MOB-FORGOT-012
- **Mô tả**: UI không hiển thị Bước 1 / 2 hoặc Bước 2 / 2 theo yêu cầu FR-03.

### D-FR03-MOB-002: Thiếu nút quay lại đăng nhập tại Bước 1

- **Mức độ**: Major
- **Phạm vi**: TC-MOB-FORGOT-003
- **Mô tả**: Người dùng không có điều khiển hủy/quay lại Login ở Bước 1.

### D-FR03-MOB-003: OTP 4 số và không hiển thị trong demo

- **Mức độ**: Critical
- **Phạm vi**: TC-MOB-FORGOT-005, TC-MOB-FORGOT-014
- **Mô tả**: Backend/UI dùng 4 số và UI không hiển thị OTP, trái yêu cầu OTP 6 số và hiển thị trực tiếp trong môi trường demo.

### D-FR03-MOB-004: Thiếu trường xác nhận mật khẩu

- **Mức độ**: Major
- **Phạm vi**: TC-MOB-FORGOT-013
- **Mô tả**: Bước 2 chỉ có trường mật khẩu mới, không có trường xác nhận và không kiểm tra hai giá trị khớp nhau.

### D-FR03-MOB-005: Email phân biệt hoa thường

- **Mức độ**: Major
- **Phạm vi**: TC-MOB-FORGOT-010
- **Mô tả**: `TEST@ESHOP.COM` không được đối chiếu với tài khoản `test@eshop.com`.

### D-FR03-MOB-006: Chấp nhận ký tự đặc biệt ngoài danh sách FR-01

- **Mức độ**: Major
- **Phạm vi**: TC-MOB-FORGOT-028
- **Mô tả**: Mật khẩu chứa `#` được reset dù FR-01 chỉ cho phép `@`, `$`, `!`, `%`, `*`, `?`, `&`.

---

## 5. Ghi chú Phạm vi

Category CRUD không được thực thi trong report này vì thuộc FR-14, không thuộc FR-03 Mobile.
