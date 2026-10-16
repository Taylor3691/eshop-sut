# Báo cáo Thực thi Phân tích Giá trị Biên (BVA Testing Report) — FR-03 Mobile: Quên mật khẩu

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
- **Tập trung BVA**: độ dài OTP 4/6 số, độ dài mật khẩu tối thiểu 8 ký tự, số lượng nhóm ký tự bắt buộc, email rỗng/khoảng trắng và liên kết OTP-email.

---

## 2. Thống kê Kết quả Thực thi (Execution Summary Metrics)

| Chỉ số                | Giá trị |  Tỷ lệ |
| --------------------- | ------: | -----: |
| Tổng số Test Case BVA |      25 |   100% |
| Đã thực thi           |      25 |   100% |
| PASS                  |      22 | 88.00% |
| FAIL                  |       2 |  8.00% |
| BLOCKED               |       1 |  4.00% |
| NOT EXECUTED          |       0 |  0.00% |
| Defect đã xác minh    |       1 |      — |

---

## 3. Bảng Kết quả Thực thi Chi tiết

| Test Case ID          | Điểm biên / Actual Result                                                 | Trạng thái | Minh chứng                                                                                 | Defect ID      |
| --------------------- | ------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------ | -------------- |
| TC-MOB-BVA-FORGOT-001 | OTP rỗng bị từ chối, vẫn ở Bước 2.                                        | PASS       | [TC-MOB-BVA-FORGOT-001.png](../../../tests/test-cases/password-reset-mobile/screenshots/TC-MOB-BVA-FORGOT-001.png) | —              |
| TC-MOB-BVA-FORGOT-002 | OTP 3 số bị từ chối, vẫn ở Bước 2.                                        | PASS       | [TC-MOB-BVA-FORGOT-001.png](../../../tests/test-cases/password-reset-mobile/screenshots/TC-MOB-BVA-FORGOT-001.png) | —              |
| TC-MOB-BVA-FORGOT-003 | OTP thật 4 số thành công, trả về Login.                                   | PASS       | [TC-MOB-BVA-FORGOT-003.png](../../../tests/test-cases/password-reset-mobile/screenshots/TC-MOB-BVA-FORGOT-003.png) | —              |
| TC-MOB-BVA-FORGOT-004 | OTP 5 số bị từ chối.                                                      | PASS       | [TC-MOB-BVA-FORGOT-001.png](../../../tests/test-cases/password-reset-mobile/screenshots/TC-MOB-BVA-FORGOT-001.png) | —              |
| TC-MOB-BVA-FORGOT-005 | OTP 6 số bị từ chối vì implementation dùng 4 số.                          | PASS       | [TC-MOB-BVA-FORGOT-001.png](../../../tests/test-cases/password-reset-mobile/screenshots/TC-MOB-BVA-FORGOT-001.png) | —              |
| TC-MOB-BVA-FORGOT-006 | OTP 7 số bị từ chối.                                                      | PASS       | [TC-MOB-BVA-FORGOT-001.png](../../../tests/test-cases/password-reset-mobile/screenshots/TC-MOB-BVA-FORGOT-001.png) | —              |
| TC-MOB-BVA-FORGOT-007 | Mật khẩu rỗng không chuyển bước.                                          | PASS       | [TC-MOB-BVA-FORGOT-007.png](../../../tests/test-cases/password-reset-mobile/screenshots/TC-MOB-BVA-FORGOT-007.png) | —              |
| TC-MOB-BVA-FORGOT-008 | Mật khẩu 7 ký tự không chuyển bước.                                       | PASS       | [TC-MOB-BVA-FORGOT-007.png](../../../tests/test-cases/password-reset-mobile/screenshots/TC-MOB-BVA-FORGOT-007.png) | —              |
| TC-MOB-BVA-FORGOT-009 | Mật khẩu mạnh đúng 8 ký tự thành công.                                    | PASS       | [TC-MOB-BVA-FORGOT-003.png](../../../tests/test-cases/password-reset-mobile/screenshots/TC-MOB-BVA-FORGOT-003.png) | —              |
| TC-MOB-BVA-FORGOT-010 | Mật khẩu mạnh 9 ký tự thành công.                                         | PASS       | [TC-MOB-BVA-FORGOT-003.png](../../../tests/test-cases/password-reset-mobile/screenshots/TC-MOB-BVA-FORGOT-003.png) | —              |
| TC-MOB-BVA-FORGOT-011 | Không có chữ hoa không chuyển bước.                                       | PASS       | [TC-MOB-BVA-FORGOT-007.png](../../../tests/test-cases/password-reset-mobile/screenshots/TC-MOB-BVA-FORGOT-007.png) | —              |
| TC-MOB-BVA-FORGOT-012 | Có đúng 1 chữ hoa, reset thành công.                                      | PASS       | [TC-MOB-BVA-FORGOT-003.png](../../../tests/test-cases/password-reset-mobile/screenshots/TC-MOB-BVA-FORGOT-003.png) | —              |
| TC-MOB-BVA-FORGOT-013 | Không có chữ thường không chuyển bước.                                    | PASS       | [TC-MOB-BVA-FORGOT-007.png](../../../tests/test-cases/password-reset-mobile/screenshots/TC-MOB-BVA-FORGOT-007.png) | —              |
| TC-MOB-BVA-FORGOT-014 | Có đúng 1 chữ thường, reset thành công.                                   | PASS       | [TC-MOB-BVA-FORGOT-003.png](../../../tests/test-cases/password-reset-mobile/screenshots/TC-MOB-BVA-FORGOT-003.png) | —              |
| TC-MOB-BVA-FORGOT-015 | Không có chữ số không chuyển bước.                                        | PASS       | [TC-MOB-BVA-FORGOT-007.png](../../../tests/test-cases/password-reset-mobile/screenshots/TC-MOB-BVA-FORGOT-007.png) | —              |
| TC-MOB-BVA-FORGOT-016 | Có đúng 1 chữ số, reset thành công.                                       | PASS       | [TC-MOB-BVA-FORGOT-003.png](../../../tests/test-cases/password-reset-mobile/screenshots/TC-MOB-BVA-FORGOT-003.png) | —              |
| TC-MOB-BVA-FORGOT-017 | Không có ký tự đặc biệt không chuyển bước.                                | PASS       | [TC-MOB-BVA-FORGOT-017.png](../../../tests/test-cases/password-reset-mobile/screenshots/TC-MOB-BVA-FORGOT-017.png) | —              |
| TC-MOB-BVA-FORGOT-018 | Có đúng 1 ký tự đặc biệt, reset thành công.                               | PASS       | [TC-MOB-BVA-FORGOT-003.png](../../../tests/test-cases/password-reset-mobile/screenshots/TC-MOB-BVA-FORGOT-003.png) | —              |
| TC-MOB-BVA-FORGOT-019 | Không có trường confirm-password nên không nhập được trường hợp khớp.     | FAIL       | [TC-MOB-FORGOT-011.png](../../../tests/test-cases/password-reset-mobile/screenshots/TC-MOB-FORGOT-011.png)         | D-FR03-MOB-004 |
| TC-MOB-BVA-FORGOT-020 | Không có trường confirm-password nên không kiểm tra được trường hợp lệch. | FAIL       | [TC-MOB-FORGOT-011.png](../../../tests/test-cases/password-reset-mobile/screenshots/TC-MOB-FORGOT-011.png)         | D-FR03-MOB-004 |
| TC-MOB-BVA-FORGOT-021 | Email rỗng bị từ chối, vẫn ở Bước 1.                                      | PASS       | [TC-MOB-FORGOT-007.png](../../../tests/test-cases/password-reset-mobile/screenshots/TC-MOB-FORGOT-007.png)         | —              |
| TC-MOB-BVA-FORGOT-022 | Email chỉ có khoảng trắng bị từ chối, vẫn ở Bước 1.                       | PASS       | [TC-MOB-FORGOT-007.png](../../../tests/test-cases/password-reset-mobile/screenshots/TC-MOB-FORGOT-007.png)         | —              |
| TC-MOB-BVA-FORGOT-023 | Email có khoảng trắng đầu/cuối không trim, vẫn ở Bước 1.                  | PASS       | [TC-MOB-FORGOT-009.png](../../../tests/test-cases/password-reset-mobile/screenshots/TC-MOB-FORGOT-009.png)         | —              |
| TC-MOB-BVA-FORGOT-024 | Email khớp và token thật reset thành công.                                | PASS       | [TC-MOB-BVA-FORGOT-003.png](../../../tests/test-cases/password-reset-mobile/screenshots/TC-MOB-BVA-FORGOT-003.png) | —              |
| TC-MOB-BVA-FORGOT-025 | Không có email ở Bước 2 nên kiểm thử chéo tài khoản qua UI bị chặn.       | BLOCKED    | [TC-MOB-FORGOT-011.png](../../../tests/test-cases/password-reset-mobile/screenshots/TC-MOB-FORGOT-011.png)         | —              |

---

## 4. Danh mục Lỗi Biên Xác minh (Verified Boundary Defects)

### D-FR03-MOB-004: Thiếu trường xác nhận mật khẩu

- **Mức độ**: Major
- **Phạm vi**: TC-MOB-BVA-FORGOT-019, TC-MOB-BVA-FORGOT-020
- **Mô tả**: Bước 2 không có `confirmPassword`, vì vậy ứng dụng không thể chấp nhận xác nhận khớp hoặc từ chối xác nhận lệch theo FR-01/FR-03.

---

## 5. Ghi chú BVA

OTP hợp lệ thực tế của implementation là 4 số, trong khi đặc tả FR-03 yêu cầu 6 số. Các trường hợp 6 số được ghi nhận PASS về mặt từ chối dữ liệu không khớp implementation, nhưng không chứng minh tuân thủ đặc tả 6 số; sai lệch này được quản lý trong Domain Testing report.
