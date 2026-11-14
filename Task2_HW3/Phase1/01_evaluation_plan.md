# Phase 1 — Kế hoạch đánh giá usability

## 1. Mục tiêu

Đánh giá xem người đã có nhu cầu mua hàng trực tuyến có thể tự tin hoàn thành luồng **đăng nhập → chọn một sản phẩm → chỉnh số lượng → thêm vào giỏ → kiểm tra sản phẩm/số lượng trong giỏ → đăng xuất** hay không, mà không cần hướng dẫn thao tác.

| Mục tiêu | Câu hỏi cần trả lời | Chỉ số thu thập |
|---|---|---|
| Hiểu và điều hướng | Người dùng có tìm được điểm bắt đầu, chi tiết sản phẩm, giỏ và nút thoát không? | Trạng thái hoàn thành từng mốc; số lần lạc hướng/do dự |
| Chọn số lượng | Người dùng có hiểu ô số lượng và nhận ra giá trị đã chọn không? | Lần nhập sai, lần sửa được, bình luận think-aloud |
| Phản hồi sau thêm giỏ | Người dùng có biết hành động thêm giỏ thành công không? | Thời gian xác nhận, thao tác lặp, trích dẫn người dùng |
| Kiểm tra giỏ | Người dùng có xác minh đúng tên sản phẩm và số lượng không? | Thành công độc lập; lỗi nhận biết hoặc hiểu nhầm |
| Tin cậy và hiệu quả | Luồng có rõ, đủ nhanh và tạo cảm giác an tâm không? | Thời gian toàn luồng, SUS, probe về speed/trust |

## 2. Phạm vi

| Mốc | Màn hình/chức năng | FR |
|---|---|---|
| M1 | Đăng nhập bằng tài khoản test đã cấp | FR-02 |
| M2 | Tìm/chọn một sản phẩm và mở chi tiết | FR-05, FR-06 |
| M3 | Chọn số lượng mong muốn | FR-06 |
| M4 | Thêm sản phẩm vào giỏ | FR-06, FR-07 |
| M5 | Mở giỏ, đối chiếu tên sản phẩm và số lượng | FR-07 |
| M6 | Đăng xuất | FR-02 |

Không đánh giá checkout, coupon, tạo tài khoản hoặc quản trị trong Task 2 này.

## 3. Tiêu chí và cách đo

| Chỉ số | Quy ước ghi nhận |
|---|---|
| Kết quả mốc | `Độc lập` / `Hoàn thành nhưng gặp khó` / `Không hoàn thành` |
| Thời gian | Bắt đầu khi người tham gia đọc xong kịch bản; dừng sau khi đăng xuất hoặc bỏ cuộc. Ghi `mm:ss`. |
| Do dự | Dừng quá 3 giây, đi qua lại, đọc lại nhãn hoặc hỏi cách làm. Không coi mọi khoảng dừng là lỗi. |
| Can thiệp | Chỉ đánh dấu khi moderator phải phá bế tắc; ghi nguyên văn lời can thiệp. |
| SUS | 10 câu, Likert 1–5, chấm đúng công thức trong Phase 3. |
| Bằng chứng | Ghi chú theo thời điểm; recording/audio chỉ khi đã được đồng ý. |

Mục tiêu định hướng (không phải tiêu chí để loại bỏ dữ liệu): ít nhất 6/7 người hoàn thành toàn luồng độc lập hoặc chỉ gặp khó nhẹ; SUS trung bình được so sánh với mốc tham khảo 68/100.

## 4. Đối tượng, cỡ mẫu và đạo đức

- **Cỡ mẫu chính:** 7 người thật, 7 phiên riêng biệt; thêm 1 phiên pilot không tính vào 7 người.
- **Điều kiện đã chọn:** sinh viên **18–21 tuổi**, ở ngoài lớp học HW03; đã từng mua hàng trực tuyến. Họ có thể học ngành IT, nhưng cần ghi đúng bối cảnh để phân tích thiên lệch mẫu.
- **Bảo mật:** chỉ dùng mã P01–P07 trong báo cáo; che 4 chữ số giữa của liên hệ; không commit thông tin nhạy cảm/ảnh mặt nếu chưa được đồng ý.
- **Quyền của người tham gia:** được từ chối ghi âm/ghi hình hoặc dừng bất kỳ lúc nào, không cần nêu lý do.

### Giới hạn mẫu cần nêu trong báo cáo

Vì cả bảy người tham gia đều là sinh viên 18–21 tuổi, mẫu có thể quen với giao diện số và không đại diện cho người mua ở độ tuổi/bối cảnh khác. Báo cáo chỉ nên kết luận trong phạm vi mẫu này; không dùng đây như bằng chứng rằng mọi khách hàng đều có cùng trải nghiệm.

## 5. Chuẩn bị trước phiên

| Hạng mục | Giá trị cần tự xác nhận |
|---|---|
| URL SUT | `http://localhost:5173/` — xác nhận Vite thực sự chạy ở URL này trước mỗi phiên |
| Backend API | `http://localhost:3000/` — phải chạy trước frontend |
| Phiên bản/commit SUT | Ghi mã commit thật ngay trước Pilot/P01: `[TỰ ĐIỀN]` |
| Trình duyệt, OS, thiết bị | Chrome trên Windows; ghi phiên bản/thông số thực tế khi chạy: `[TỰ ĐIỀN]` |
| Tài khoản test | Tài khoản test do moderator cấp riêng; **không ghi mật khẩu** vào Markdown, video hoặc Git |
| Sản phẩm chuẩn bị | `iPhone 15 Pro Max` (seed product sau khi chạy `node database.js`); xác nhận sản phẩm hiển thị trước phiên |
| Số lượng mục tiêu cho scenario | `2` |
| Môi trường giỏ trống | `[Đã xác nhận / Chưa]` |
| Ghi hình/ghi âm hoạt động | `[TỰ ĐIỀN]` |

### Thiết lập kỹ thuật đã xác minh từ source

- Frontend web là React + Vite + Tailwind CSS; lệnh chạy là `npm run dev` trong `frontend-web`.
- Backend là Node.js + Express + SQLite; lệnh chạy là `node server.js` trong `backend`.
- `node database.js` sẽ **xóa và seed lại** cơ sở dữ liệu. Chỉ dùng trước khi bắt đầu một loạt phiên, không chạy giữa phiên hoặc khi cần bảo toàn dữ liệu/bug evidence.
- Không đặt sẵn sản phẩm trong giỏ. Mỗi phiên cần bắt đầu bằng browser profile/phiên sạch và giỏ trống.

## 6. Phân vai

Người điều phối đọc lời mở đầu, theo dõi thời gian và chỉ can thiệp khi bế tắc. Người quan sát (nếu có) chỉ ghi chú, không gợi ý. Mỗi phiên chỉ có một người tham gia và không xem kết quả của người khác.
