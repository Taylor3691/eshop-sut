# Thiết kế Load Test EShop — 23120157

**Plan:** `test-plans/23120157_Load_20261118.jmx`  
**Dữ liệu:** `test-data/users.csv`  
**Trạng thái:** Đã tạo và kiểm tra cấu trúc; **chưa thực thi**. Đây là cấu hình baseline an toàn theo dữ liệu hiện có, chưa phải bài đo tải nhiều người dùng được xác nhận.

## Mục tiêu và workflow

Một virtual user chạy cùng một end-to-end journey đã chọn cho các scenario Load/Stress/Spike:

```text
POST /api/login
→ GET /api/products?search=...
→ GET /api/products/{product_id}
→ POST /api/cart
→ POST /api/checkout
```

Auth-heavy được phủ bởi login và JWT extraction; read-heavy bởi search/list và detail; transactional bởi add-to-cart và checkout. Token được trích bằng JSON PostProcessor từ `$.token`, sau đó gửi trong `Authorization: Bearer ...` cho hai API được bảo vệ. Workflow giữ một lần checkout cho mỗi VU để không tạo order vô hạn.

## Workload được cấu hình

| Tham số | Giá trị mặc định | Cơ sở / giới hạn |
|---|---:|---|
| Virtual users | 1 | Snapshot DB chỉ xác nhận một customer account seed. Cart được chia theo user ID; dùng chung account đồng thời làm nhiễu state. Không giả tạo thêm credential. |
| Ramp-up | 1 giây | Chỉ một VU; ramp dài hơn không tạo thêm thông tin tải. |
| Iterations | 1 journey/VU | Mỗi lần checkout ghi order bền vào SQLite, cart nằm RAM và không được clear. Giới hạn side effects. |
| Think-time | 3 giây trước mỗi sampler | Khoảng nghỉ có chủ đích giữa thao tác người dùng; có thể override qua `-Jthink_time_ms`. Timer cũng thêm delay trước request login đầu tiên. |
| Sustained duration | Chưa cấu hình thành vòng lặp lặp vô hạn | Chưa an toàn/đủ data để lặp transactional workflow; xem phần giới hạn. Không tuyên bố plan này đã đạt yêu cầu sustained Load. |
| Listener | Summary Report | Đúng loại listener được yêu cầu cho Load. GUI listener không thay thế raw JTL; khi chạy, lưu JTL bằng `-l`. |

## Vì sao chưa chọn tải nhiều VU / sustained loop

Máy hiện tại: Intel Core i7-1355U, 10 cores/12 logical processors, 15.7 GiB RAM, Windows 11 Home; Java 21.0.11 có sẵn. `jmeter` chưa có trong PATH nên chưa xác minh được phiên bản JMeter cài đặt. Phần cứng đủ cho một bài tải local nhỏ, nhưng chưa phải yếu tố giới hạn chính.

Ràng buộc hiện tại là dữ liệu và side effects của SUT:

- `backend/database.sqlite` có một seed customer user; các VU cùng login account này sẽ cùng sử dụng `userCarts[userId]` trong RAM.
- Mỗi checkout thêm một order persistent; endpoint không clear cart.
- Không có account pool đã được cấp để dùng cho concurrency. Không thể tạo thêm credentials theo quy tắc không bịa dữ liệu.
- CSV có một dòng duy nhất và `recycle=false`, `stopThread=true`; cấu hình mặc định an toàn một VU. Tăng `-Jusers` khi chưa thêm các account riêng sẽ khiến thread hết dữ liệu dừng, không tạo tải nhiều VU như mong đợi.
- Backend hiện chưa chạy tại localhost; không start vì `database.js` khởi tạo bằng cách drop/recreate bảng. DB snapshot đã có 3 order, cần bảo toàn.

Do đó plan hiện kiểm tra baseline workflow và khả năng thu thập response/assertion; nó chưa đo capacity, throughput ổn định hay performance dưới tải. Để hoàn thiện sustained Load cần provision một account test riêng cho mỗi VU trong DB cô lập, xác định address fixture hợp lệ, quy trình reset giỏ/order/database, rồi tăng số VU/ramp/duration theo từng bước dựa trên quan sát máy chủ. Sau khi có account pool, cấu hình vòng lặp cũng phải xem lại vì mỗi vòng tạo thêm order và cart item.

## Test data và assertions

CSV lấy seed account và product ID/name/price từ `AGENTS.md`, `backend/database.js`, và snapshot DB read-only ngày 2026-11-18. Product ID 1 được dùng vì data hiện có xác nhận `iPhone 15 Pro Max`, giá 30,000,000; ID lẻ tránh nhánh detail biến `price` thành string. Search assertion đối chiếu tên sản phẩm. Các request được kiểm tra status/response với assertions: login thành công và token; search/detail có product name; add cart có thông báo `Added to cart`; checkout có thông báo thành công và `orderId`.

**Chặn trước thực thi:** `shipping_address` để trống trong CSV vì profile seed hiện không có address và không được tự đặt địa chỉ. API specification ghi trường này trong checkout body, dù backend hiện không validate và frontend web không gửi. Cần cấp giá trị fixture test hợp lệ trước khi chạy bài đo.

## Cách mở/chạy sau khi đã cài và chuẩn bị data

Từ thư mục repository, chạy low-load smoke run được duyệt trước; ví dụ command hình thức (chưa chạy):

```powershell
jmeter -n -t HW05/test-plans/23120157_Load_20261118.jmx -Jusers=1 -Jramp_seconds=1 -Jthink_time_ms=3000 -Jcsv_file=HW05/test-data/users.csv -l HW05/results/Load/23120157_Load_20261118.jtl -e -o HW05/html-reports/Load/23120157_Load_20261118
```

JMeter chưa được xác nhận cài đặt; cài đúng phiên bản tương thích, xác nhận thư mục output tồn tại/đang rỗng, backup/cô lập DB, hoàn thành address fixture và account pool trước khi chạy. Không dùng lệnh này làm bằng chứng đã thực thi.

## Kết quả xác minh hiện tại

- JMX/XML và tham chiếu CSV/JTL: sẽ được kiểm tra cấu trúc trong task này.
- JMeter native plan validation: chưa thể thực hiện vì `jmeter` không có trong PATH.
- Backend smoke test: chưa thực hiện; request GET cục bộ trước đó timeout.
- Performance metrics/JTL/HTML report: chưa có, không được tạo giả.
