# Kịch bản Nhiệm vụ Đánh giá Usability (Task Scenarios)

## 1. Nguyên tắc thiết kế kịch bản

Theo hướng dẫn HW03 và phương pháp chuẩn trong Usability Engineering (Nielsen Norman Group):
- **Hướng mục tiêu (Goal-Oriented):** Kịch bản cung cấp cho người tham gia một mục tiêu thực tế và ngữ cảnh cụ thể trong đời sống, **tuyệt đối không cung cấp hướng dẫn bấm từng bước (Step-by-step instructions)**.
- **Không dùng ngôn ngữ dẫn dắt:** Tránh dùng tên chính xác của các nút bấm hoặc nhãn trên giao diện (ví dụ: không ghi "Bấm nút Thêm vào giỏ" mà ghi "Lựa chọn sản phẩm bạn muốn mua").
- **Dữ liệu mồi thực tế (Realistic Test Data):** Cung cấp tài khoản thử nghiệm và mã giảm giá có sẵn trong hệ thống để người dùng thử nghiệm tính năng.

---

## 2. Bối cảnh & Dữ liệu chuẩn bị

### 2.1. Dữ liệu tài khoản
- **Tài khoản kiểm thử:** Người dùng có thể sử dụng tài khoản mẫu:
  - Email: `test@eshop.com`
  - Mật khẩu: `Test1234!`
  *(Hoặc người tham gia có thể đăng ký tài khoản mới nếu muốn kiểm tra luồng từ đầu).*

### 2.2. Dữ liệu mã giảm giá (theo FR-09)
Người dùng được thông báo về các chương trình ưu đãi hiện hành của cửa hàng:
- Mã giảm 10% cho đơn từ 300.000 ₫: `SAVE10`
- Mã giảm 50.000 ₫ cho đơn từ 500.000 ₫: `BIGBUY`
- *(Hệ thống cũng có mã hết hạn hoặc mã không tồn tại để kiểm tra khả năng xử lý lỗi nếu người dùng nhập nhầm)*.

---

## 3. Kịch bản Nhiệm vụ Chính (Main Task Scenario)

### Tên kịch bản: "Đặt mua quà tặng công nghệ với ưu đãi giảm giá"

> **Lời dẫn cho người tham gia:**  
> *"Hôm nay bạn muốn mua sắm trên website EShop. Bạn đã có tài khoản thành viên (`test@eshop.com` / `Test1234!`).*  
> *Bạn muốn tìm mua một sản phẩm công nghệ (hoặc thời trang) có giá trị từ 300.000 ₫ trở lên để đủ điều kiện áp dụng mã giảm giá `SAVE10` (hoặc `BIGBUY`).*  
> *Hãy đăng nhập vào tài khoản của bạn, thêm sản phẩm vào giỏ hàng, áp dụng mã ưu đãi để được giảm giá, hoàn tất đặt hàng, kiểm tra lại đơn hàng trong lịch sử mua sắm để đảm bảo đơn đã được ghi nhận, và cuối cùng đăng xuất khỏi tài khoản để bảo mật máy tính."*

---

## 4. Các chặng hành trình kỳ vọng (Milestones & Success Criteria)

Dù người tham gia tự do tương tác, người quan sát sẽ theo dõi sự hoàn thành qua 6 chặng (Milestones) sau:

| Chặng | Mục tiêu hành vi của người tham gia | Yêu cầu nghiệp vụ đối chiếu | Tiêu chí hoàn thành (Success Criteria) |
|---|---|---|---|
| **M1: Đăng nhập** | Nhận diện khu vực đăng nhập, nhập email và mật khẩu hợp lệ để vào hệ thống. | **FR-02** | Đăng nhập thành công, token được lưu, header hiển thị trạng thái đã đăng nhập. |
| **M2: Chọn hàng & Giỏ hàng** | Duyệt danh sách hoặc chi tiết sản phẩm, chọn số lượng phù hợp (tổng tiền >= 300k), đưa vào giỏ hàng và mở trang Giỏ hàng. | **FR-07** | Sản phẩm xuất hiện trong giỏ hàng, bảng liệt kê đúng đơn giá, số lượng, thành tiền và nhãn "Tổng cộng". |
| **M3: Áp dụng Mã giảm giá** | Tiến hành chuyển sang thanh toán, tìm ô nhập mã ưu đãi và áp dụng mã `SAVE10`. | **FR-09** | Hệ thống ghi nhận mã hợp lệ, trừ tiền đúng theo công thức (`total * 10%`), hiển thị số tiền thanh toán cuối cùng. |
| **M4: Hoàn tất Đơn hàng** | Điền thông tin giao nhận cần thiết và xác nhận đặt hàng. | **FR-08** | Đơn hàng được tạo thành công, giỏ hàng được làm rỗng, hiển thị thông báo xác nhận. |
| **M5: Kiểm tra Lịch sử đơn** | Tìm đến trang Lịch sử đơn hàng cá nhân để xem lại đơn vừa đặt. | **FR-10, FR-11** | Tìm thấy mã đơn hàng mới, thấy trạng thái hiển thị bằng tiếng Việt (`pending` / Chờ xử lý) kèm màu sắc nhận diện. |
| **M6: Đăng xuất an toàn** | Tìm và thực hiện thao tác Đăng xuất khỏi hệ thống. | **FR-02** | Trở về trạng thái khách vãng lai, token được dọn dẹp, giao diện cập nhật nút Đăng nhập. |

---

## 5. Kịch bản Thử thách Phụ (Optional Sub-Task / Error Recovery Probe)

Nếu người tham gia hoàn thành sớm hoặc điều phối viên muốn kiểm tra tính kiên cường của hệ thống khi gặp lỗi:
- **Thử thách phụ:** *"Hãy thử áp dụng một mã giảm giá bất kỳ mà bạn tự nghĩ ra (hoặc mã `EXPIRED`), quan sát cách website phản hồi."*
- **Mục tiêu:** Quan sát xem người dùng có hiểu tại sao mã bị từ chối hay không, thông báo lỗi có rõ ràng và giúp người dùng khắc phục lỗi dễ dàng hay không.

