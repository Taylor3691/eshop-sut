---
name: gui-checklist-generator
description: Tạo checklist kiểm thử GUI ở giai đoạn thiết kế từ tên và ảnh chụp các màn hình của SUT eShop. Dùng cho Task 1 của HW03; không dùng để thực thi kiểm thử hoặc kết luận Đạt/Không đạt.
---

# Trình tạo GUI Checklist

Tạo file `GUI_checklist.md` trong thư mục làm việc hiện tại cho các màn hình do người dùng cung cấp. Đầu ra là **checklist ở giai đoạn thiết kế**: xây dựng các tiêu chí xác minh nhưng không thực thi chúng và không suy ra kết quả Đạt/Không đạt từ ảnh chụp màn hình.

## Đầu vào bắt buộc

Thu thập các thông tin sau từ prompt hoặc tệp đính kèm:

- Tên màn hình chính và tất cả màn hình liên quan nằm trong phạm vi kiểm thử.
- Ít nhất một ảnh chụp cho mỗi màn hình đã nêu. Các ảnh bổ sung có thể thể hiện những trạng thái liên quan như mặc định, đã nhập dữ liệu, lỗi validation, đang tải, rỗng, thành công hoặc hộp thoại xác nhận.

Sử dụng các thông tin sau nếu người dùng đã cung cấp, nhưng không yêu cầu họ nhập lại:

- Luồng màn hình, vai trò người dùng, nền tảng, trình duyệt/thiết bị và kích thước viewport.
- Tên dự án, người rà soát và ngày rà soát.
- Đặc tả thiết kế hoặc quy tắc design system bổ sung cho các yêu cầu trong repository.

Nếu thiếu tên màn hình hoặc ảnh chụp có thể đọc được, chỉ yêu cầu người dùng bổ sung đúng phần còn thiếu. Nếu phạm vi được chọn không thể bao phủ có ý nghĩa cả bốn nhóm IA, hãy giải thích khoảng trống bao phủ và yêu cầu thêm một màn hình phù hợp thay vì tự bịa ra các control không tồn tại. Đặc biệt, IA-02 yêu cầu ít nhất một màn hình có form hoặc control nhập liệu.

## Nguồn yêu cầu chính thức

Trước khi tạo checklist:

1. Đọc hướng dẫn chọn phạm vi và toàn bộ bốn mục của **Task 1 — GUI Checklist** trong `HW03.md`.
2. Đọc **Mục 8 — Yêu cầu Giao diện** trong `README.md`, bao gồm FR-21 đến FR-24.
3. Tìm trong `README.md` các yêu cầu chức năng liên quan đến màn hình hoặc luồng đã chọn và đọc các phần đó. Ví dụ: đọc yêu cầu đăng ký cho màn hình Register; đọc yêu cầu Cart và Checkout cho luồng Cart-to-Checkout.
4. Quan sát từng ảnh chụp được cung cấp để nhận diện thành phần hiển thị và các trạng thái UI liên quan.

Khi các nguồn mâu thuẫn, áp dụng thứ tự ưu tiên sau:

1. Yêu cầu bài tập trong `HW03.md`.
2. Yêu cầu chức năng áp dụng cho màn hình và FR-21 đến FR-24 trong `README.md`.
3. Đặc tả thiết kế do người dùng cung cấp rõ ràng.
4. Các heuristic GUI/accessibility đã được công nhận và phù hợp với phạm vi.
5. Giao diện hiện tại xuất hiện trong ảnh chụp.

Ảnh chụp là **nguồn cung cấp ngữ cảnh, không phải kết quả mong đợi**. Tuyệt đối không biến một lỗi đang thấy thành hành vi mong đợi. Ví dụ: nếu nút hành động tích cực có màu đỏ trong ảnh nhưng FR-21 yêu cầu màu xanh dương, hãy viết checkpoint yêu cầu màu xanh dương và để trống Đạt/Không đạt. Ghi các mâu thuẫn nguồn quan trọng trong mục `Giả định và mâu thuẫn nguồn`.

## Xây dựng checklist

Tạo checklist cuối cùng có **hơn 40 mục**; mặc định hướng tới 45–50 mục có ý nghĩa, trừ khi người dùng yêu cầu số lượng lớn hơn. Bao phủ đầy đủ bốn nhóm:

- `IA-01 (Tiêu chuẩn giao diện chung)`
- `IA-02 (Form và control)`
- `IA-03 (Điều hướng)`
- `IA-04 (Phản hồi và trạng thái)`

Không bắt buộc số lượng cố định cho từng nhóm, nhưng mỗi nhóm phải có độ bao phủ đáng kể và phù hợp với màn hình. Ưu tiên nhiều màn hình liên quan hoặc một luồng thống nhất thay vì cố tăng số lượng bằng các mục nông hoặc lặp lại trên một màn hình.

Luôn áp dụng FR-21 đến FR-24 khi phù hợp:

- FR-21: Tiêu chuẩn Giao diện Chung
+ **Nhất quán ngôn ngữ**: Toàn bộ giao diện dùng tiếng Việt (trừ thuật ngữ kỹ thuật chuẩn).
+ **Nhất quán màu sắc**: Các nút hành động tích cực (Submit, Mua hàng) dùng màu xanh dương. Các nút nguy hiểm/hủy bỏ dùng màu đỏ.
+ **Nhất quán đơn vị tiền**: Luôn dùng ký hiệu `₫` với định dạng phân cách hàng nghìn.
+ **Tiêu đề trang**: Mỗi trang có đúng 1 thẻ `<h1>` mô tả nội dung trang.
+ **Tab Order**: Thứ tự focus theo Tab phải đi từ trên xuống dưới, trái sang phải.
- FR-22: Form Requirements
+ Tất cả trường bắt buộc phải có ký hiệu `*` bên cạnh nhãn.
+ Trường Email phải dùng `type="email"`.
+ Trường Mật khẩu phải dùng `type="password"` (không hiển thị rõ).
+ Thông báo lỗi phải xuất hiện **trên** nút submit, không phải bên dưới.
+ Các form có từ 2 bước trở lên phải có **Step Indicator** rõ ràng.
- FR-23: Navigation Requirements
+ Thanh điều hướng (Navbar) phải **highlight** trang đang được chọn.
+ Link "Giỏ hàng" phải hiển thị **badge số lượng** sản phẩm trong giỏ.
+ Nút Đăng xuất phải nhãn là "Đăng xuất" (không phải "Thoát").
+ Breadcrumb bắt buộc có ở các trang con (Giỏ hàng, Thanh toán, Chi tiết sản phẩm).
- FR-24: Feedback & State Requirements
+ Sau khi bấm "Thêm vào giỏ", phải có phản hồi trực quan (toast/badge).
+ Khi xóa item khỏi giỏ phải có dialog xác nhận.
+ Trang trống (Empty State) phải có icon/hình minh họa và message thân thiện.
+ Tất cả ảnh sản phẩm phải có thuộc tính `alt` mô tả nội dung ảnh (không để rỗng).

Mỗi mục checklist phải:

- Kiểm tra một hành vi hoặc quy tắc hiển thị chính.
- Nêu rõ màn hình và, khi cần, trạng thái hoặc component liên quan.
- Có tiêu chí xác minh quan sát được, lặp lại được và kết quả mong đợi không mơ hồ.
- Truy vết được đến yêu cầu trong repository, quy tắc thiết kế được cung cấp hoặc heuristic có tên rõ ràng.
- Tránh cách viết mơ hồ như “trông đẹp”, “thân thiện với người dùng” hoặc “hoạt động đúng”.
- Tránh lặp lại cùng một kiểm tra chung cho nhiều màn hình, trừ khi việc thực thi riêng trên từng màn hình tạo ra độ bao phủ có ý nghĩa.
- Không khẳng định điều không thể xác lập từ các nguồn. Đưa các điều kiện cần thiết vào phần giả định.

## AI tạo ban đầu và rà soát phản biện

Thực hiện hai lượt để đầu ra hỗ trợ đúng Task 1 của HW03:

1. Tạo bộ mục ban đầu bằng AI dựa trên yêu cầu chính thức và cấu trúc màn hình quan sát được.
2. Rà soát phản biện bộ ban đầu để tìm khoảng trống bao phủ và bổ sung những mục có ý nghĩa mà lượt đầu đã bỏ sót.

## File đầu ra

Chỉ ghi hoặc thay thế file `GUI_checklist.md` trong thư mục làm việc hiện tại. Viết nội dung checklist bằng tiếng Việt, trừ khi người dùng yêu cầu rõ ràng một ngôn ngữ khác.

Sử dụng cấu trúc sau:

```markdown
# GUI Checklist

**Dự án:** ...  
**Màn hình chính / Luồng:** ...  
**Các màn hình trong phạm vi:** ...  
**Người rà soát:** ...  
**Ngày:** ...  
**Nền tảng / Viewport:** ...  
**Trạng thái:** Đã thiết kế — Chưa thực thi

## Checklist

| # | Màn hình / Trạng thái | Phân loại | Checkpoint | Tiêu chí xác minh | Đạt | Không đạt | Ghi chú / Minh chứng |
|---|---|---|---|---|---|---|---|
| 1 | ... | IA-01 (Tiêu chuẩn giao diện chung) | ... | ... | ☐ | ☐ | — |


## Tổng hợp kết quả kiểm thử

- Đã thiết kế: [tổng số mục checklist]
- Đã thực thi: 0
- Đạt: Chưa thực thi
- Không đạt: Chưa thực thi
- Lỗi đang mở: Chưa đánh giá
```

Giữ cả hai ô `Đạt` và `Không đạt` ở trạng thái chưa chọn (`☐`) trong mọi dòng. Không điền số lượng lỗi, không đính kèm minh chứng lỗi và không kết luận một vấn đề quan sát được là bug đã xác nhận trong giai đoạn thiết kế checklist. Ảnh chụp cho các mục Không đạt thuộc giai đoạn thực thi sau đó của Task 1, không thuộc bước tạo checklist này.

Trước khi hoàn tất, xác minh rằng:

- File có ít nhất 41 dòng checklist không trùng lặp.
- IA-01, IA-02, IA-03 và IA-04 đều được bao phủ có ý nghĩa.
- Các quy tắc FR-21 đến FR-24 áp dụng được đều có thông tin truy vết trong bảng.
- Yêu cầu chức năng của các màn hình được chọn được phản ánh khi chúng ảnh hưởng đến hành vi GUI.
- Mỗi mục bổ sung sau rà soát có lý do cụ thể.
- Tất cả ô Đạt/Không đạt vẫn chưa được chọn và trạng thái là `Đã thiết kế — Chưa thực thi`.
- Tổng số theo các nhóm bằng tổng số dòng checklist.

## Ví dụ cách gọi skill

```text
Hãy làm theo GUI_skill.md và tạo file GUI_checklist.md.

Màn hình chính: Thanh toán
Màn hình liên quan: Chi tiết sản phẩm, Giỏ hàng, Xác nhận đơn hàng
Luồng: Chi tiết sản phẩm → Giỏ hàng → Thanh toán → Xác nhận đơn hàng
Vai trò: Khách hàng
Ảnh chụp: sử dụng các ảnh đính kèm; tên file ảnh cho biết màn hình và trạng thái.

Không thực thi kiểm thử và không điền Đạt/Không đạt.
```
