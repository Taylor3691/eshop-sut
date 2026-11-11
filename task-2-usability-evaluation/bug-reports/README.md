# Quy ước Báo cáo Lỗi Usability và Đồng bộ GitHub Issues (HW03 Task 2)

Thư mục này quản lý các báo cáo lỗi Usability và các khiếm khuyết nghiệp vụ phát hiện được trong quá trình thực hiện Task 2 — Usability Evaluation trên luồng mua sắm khép kín:
`Login → Cart → Apply Coupon → Checkout → Verify Order → Logout`

> **LƯU Ý:**  
> - Chỉ tạo báo cáo lỗi khi một vấn đề đã được **xác minh thực tế (Verified)** qua quan sát phiên người dùng hoặc đối chiếu trực tiếp với đặc tả `README.md`.  
> - Không tạo báo cáo lỗi dựa trên giả định hoặc phỏng đoán chưa kiểm chứng.  
> - Sử dụng mẫu chuẩn tại [BUG-REPORT-TEMPLATE.md](./BUG-REPORT-TEMPLATE.md).

---

## 1. Tiêu chí Phân loại Mức độ Nghiêm trọng & Ưu tiên

Để đồng bộ với chuẩn đánh giá của môn học và Task 1, hệ thống sử dụng 2 thang phân loại:

### 1.1. Phân loại trong Markdown Bug Report (Theo chuẩn Test Report)

| Trường (Field) | Giá trị cho phép | Ý nghĩa thực tế |
|---|---|---|
| **Priority (Độ ưu tiên)** | `Critical` / `High` / `Medium` / `Low` | Mức độ cấp bách cần sửa chữa (sửa ngay trong ngày / trong 2–4 ngày / 5–8 ngày / phiên bản sau). |
| **Severity (Mức độ nghiêm trọng)** | `Fatal (10)` / `Serious (5)` / `Medium (3)` / `Cosmetic (1)` | Mức độ ảnh hưởng đến hệ thống: sập ứng dụng/mất dữ liệu (Fatal); làm tắc nghẽn chức năng chính (Serious); sai lệch yêu cầu nhỏ (Medium); lỗi hiển thị thẩm mỹ (Cosmetic). |
| **Usability Severity (Nielsen)** | `4 - Catastrophe` / `3 - Major` / `2 - Minor` | Đánh giá mức độ cản trở người dùng theo chuẩn Nielsen Norman Group. |

*Lưu ý: Priority (tính cấp bách) và Severity (tính ảnh hưởng) là hai khía cạnh độc lập.*

### 1.2. Phân loại trên GitHub Issues (Theo chuẩn GitHub Bug Management)

Khi đồng bộ lỗi lên GitHub Issues, sử dụng hệ thống nhãn (labels):
- **Type:** `type: bug`, `type: usability`, `type: enhancement`
- **Severity:** `severity: blocker`, `severity: critical`, `severity: major`, `severity: minor`, `severity: trivial`
- **Priority:** `priority: P0`, `priority: P1`, `priority: P2`, `priority: P3`
- **Status:** `status: new`, `status: triaged`, `status: in progress`, `status: ready for retest`, `status: verified`
- **Module:** `module: login`, `module: cart`, `module: checkout`, `module: coupon`, `module: orders`

---

## 2. Quy ước Đặt Tiêu đề (Naming Convention)

### Tiêu đề Bug Report và GitHub Issue:
```text
[USABILITY-BUG][<Module>] <Mô tả ngắn gọn lỗi>
```

**Ví dụ:**
- `[USABILITY-BUG][Cart] Missing confirmation dialog when deleting product from cart (FR-07)`
- `[USABILITY-BUG][Coupon] Error message is unclear when order does not meet minimum threshold (FR-09)`
- `[USABILITY-BUG][Orders] Order status is not localized to Vietnamese (FR-11)`

---

## 3. Quy trình Báo cáo và Lưu trữ Bằng chứng

1. Xác định vấn đề trong phiên thử nghiệm của người dùng hoặc đối chiếu SRS.
2. Sao chép mẫu `BUG-REPORT-TEMPLATE.md` thành `BUG-20261111-###.md` (mã số duy nhất tăng dần).
3. Chụp ảnh màn hình minh chứng chân thực, lưu vào `task-2-usability-evaluation/evidence/screenshots/`.
4. Tạo issue tương ứng trên GitHub Issues repository, gắn nhãn phù hợp, sau đó lưu bản sao issue vào `task-2-usability-evaluation/evidence/github-issues/`.

