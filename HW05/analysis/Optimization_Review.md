# Đánh giá khả thi các đề xuất tối ưu

## Kiến trúc đã kiểm tra

Đối chiếu `backend/database.js`, `backend/server.js`, `backend/package.json`, các JTL và hardware evidence. Backend Node.js/Express dùng `sqlite3` và một `sqlite3.Database` mở trực tiếp tới file `backend/database.sqlite`; không có server database riêng hay cấu hình connection pool. Startup gọi `initDatabase()` vô điều kiện và drop/tạo lại các bảng. Schema hiện khai báo khóa chính nhưng không tạo secondary index. Product search dùng `LIKE '%...%'`; checkout thêm một row vào `orders`; lịch sử đơn hàng lọc `orders` theo `user_id` và sort `id DESC`. JTL không chứa query plan, DB timings, tracing hoặc profile.

Các phân loại mô tả độ phù hợp kỹ thuật với mã hiện tại; “Feasible” không đồng nghĩa đã benchmark chứng minh hiệu quả. Không thay đổi source code hay bật cấu hình DB trong phase đánh giá này.

## Bảng đánh giá

| Đề xuất | Phân loại | Bằng chứng từ EShop | Đánh giá và điều kiện |
|---|---|---|---|
| Thêm index cho truy vấn đơn hàng theo user | **Feasible** | `GET /api/orders/my-orders` chạy `SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC`; schema `orders` chỉ có `id INTEGER PRIMARY KEY`, không có index `user_id`. | Có thể thử index composite `(user_id, id DESC)` trên DB benchmark cô lập. Đo `EXPLAIN QUERY PLAN`, latency và write cost với tập orders đại diện. Dataset demo nhỏ nên chưa có bằng chứng lợi ích hiện tại. |
| Index cho `products.name` để tăng tốc tìm kiếm `LIKE '%term%'` | **Needs verification** | Search ghép wildcard ở cả hai đầu (`name LIKE '%${searchQuery}%'`); seed chỉ 5 products. | B-tree thường không hỗ trợ efficient seek khi pattern mở đầu wildcard; không hứa hẹn index thường sẽ tăng tốc. Xác định yêu cầu prefix/substring, đo SQLite query plan, cân nhắc FTS nếu dữ liệu lớn và semantics cho phép. |
| SQLite WAL mode | **Needs verification** | SQLite file cục bộ, đọc sản phẩm và ghi orders/account state; không thấy `PRAGMA journal_mode=WAL`. | WAL có thể cải thiện reader/writer coexistence nhưng không loại bỏ writer serialization và tạo thêm `-wal`/`-shm`. Bật chỉ trên DB tạm, đánh giá checkpoint, backup/cleanup, workload và hành vi reset startup trước khi đề xuất áp dụng. |
| “Bật connection pooling” như với PostgreSQL/MySQL | **Hallucinated** | Dependency là `sqlite3`; `database.js` mở một file DB bằng một `new sqlite3.Database(...)`. Không có URI server DB, pool package hoặc cấu hình pool. | Không tồn tại pool knob của PostgreSQL/MySQL để bật trong ứng dụng này. Thêm nhiều SQLite connections là thay đổi kiến trúc, có thể tăng contention và phải được thiết kế/benchmark riêng; không gọi là tối ưu cấu hình hiện hữu. |
| Query optimization ở product search | **Feasible** | SQL hiện nối trực tiếp `searchQuery` vào `LIKE` (`server.js`, route `/api/products`); nhánh search xử lý query động. | Tham số hóa truy vấn là sửa đổi có cơ sở cho correctness/security, nhưng không tự động làm substring search nhanh hơn. Đo trên data volume thật; nếu mục tiêu là latency cần benchmark prefix/FTS và kết quả tương đương nghiệp vụ. Không thay đổi trong phase này. |
| Cache danh mục/sản phẩm | **Needs verification** | `GET /api/products` và detail đọc DB; admin routes có thể cập nhật sản phẩm; không có cache layer hiện tại. | Đọc lặp lại có thể hưởng lợi nếu workload/data volume phù hợp. Cần xác định TTL/invalidation khi admin sửa/xóa/nhập sản phẩm, cache key cho search, memory cost và consistency. JTL hiện tại quá nhỏ để chứng minh DB read là bottleneck. |
| Giảm số lần truy cập DB trong login/checkout | **Needs verification** | Login đọc user rồi cập nhật attempts khi thành công/thất bại; checkout thực hiện một `INSERT`. | Không gộp hoặc bỏ update lockout state nếu chưa chứng minh semantics tương đương. Checkout đã là một write trong handler. Cần profiling và kiểm thử tính đúng đắn (đặc biệt lockout) trước mọi thay đổi. |

## Đối chiếu với kết quả hiệu năng

Spike peak có Checkout mean321.5ms và max595ms (n=4); Endurance Checkout mean43.77ms/p95 88ms (n=61), cao hơn mean của các sampler khác trong Endurance. Đây là dấu hiệu nên điều tra luồng transactional/host contention, không bằng chứng một query cụ thể chậm. Endurance bị dừng trước 10 phút; CPU host chạm 100%, RAM khả dụng xuống 253MiB; tài nguyên host có thể là yếu tố gây nhiễu. Không có server-process CPU profile, query timing, DB file size/production-like load hay baseline lặp lại.

## Kế hoạch xác minh trước khi áp dụng

1. Dùng bản sao DB và cùng workload/dữ liệu, baseline lặp nhiều lần trên host rảnh.
2. Thu process-level CPU, RSS/private memory, SQLite query plan và thời gian từng query; tách thời gian backend khỏi client/host.
3. Mỗi lần chỉ thay đổi một thứ (index hoặc WAL hoặc query/caching) và xác minh business assertions, dữ liệu đơn hàng, lockout, admin invalidation.
4. So sánh median/p95, throughput, error rate và chi phí ghi; không kết luận từ 4 checkout mẫu của Spike.
5. Không khởi động backend trong workspace để thử, vì module database khởi tạo sẽ drop/reseed DB. Giữ thử nghiệm trong DB cục bộ dùng một lần.
