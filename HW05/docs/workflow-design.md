# Thiết kế workflow end-to-end

## Hành trình dùng chung

```text
POST /api/login
  -> GET /api/products?search=<từ khóa đã xác minh>
  -> GET /api/products/{id lấy từ kết quả search}
  -> POST /api/cart (Bearer token)
  -> POST /api/checkout (Bearer token)
```

Workflow giữ nguyên thứ tự và business assertions giữa Load, Stress, Spike. Endpoint và body được đối chiếu với `backend/server.js`, `api_specification.md` và seed/frontend. Đây là thiết kế dựa trên source, chưa chạy HTTP/JMeter.

| Nhóm | Request | Vai trò |
|---|---|---|
| Auth-heavy | Login, trích token và truyền cho API bảo vệ | Xác thực và cung cấp identity cho phần còn lại. |
| Read-heavy | Search/list và product detail | Đọc/tìm mặt hàng và truy xuất chi tiết. |
| Transactional | Add-to-cart và checkout | Thay đổi giỏ trong RAM, insert order vào SQLite. |

## Phụ thuộc và xác nhận nghiệp vụ

1. Login bằng account test riêng cho từng virtual user. Assert 200, token khác rỗng, user ID có mặt.
2. Search bằng từ khóa khớp dữ liệu hiện hành. Assert 200, response array có kết quả; trích `id/name/price` từ response để cấp cho sampler detail/cart.
3. Detail với ID vừa trích. Assert 200 và ID khớp; xử lý `price` có thể là number hoặc string theo parity của ID.
4. Thêm cart item với token và object theo API spec: `id,name,price,quantity`. Assert 200 và `message=Added to cart`.
5. Checkout với token, `total_amount` tính từ giá/quantity của item vừa xác minh và `shipping_address` từ fixture được phê duyệt. Assert 200 và `orderId` hiện diện.
6. Có thể gọi `GET /api/orders/my-orders` như bước kiểm tra phụ; nếu đưa vào workload đo thì phải giữ ở mọi scenario và tính vào transaction mix.

Không chỉ assert HTTP 200. Backend hiện không xác thực item, giá, quantity, tồn kho hay liên kết cart-checkout; checkout tin `total_amount` từ client và không clear cart. Ghi nhận đây là behavior thực tế, không che khác biệt bằng assertion.

## Data isolation và trạng thái

- `userCarts` là object RAM trong Node process, keyed theo user ID. Dùng chung account cho nhiều thread khiến các thread mutate chung cart. Cấp một account riêng cho mỗi thread/user nếu không chủ ý đo tranh chấp.
- Mỗi checkout tạo một order bền trong SQLite; không có customer cleanup route. Hạn chế số checkout/iteration, tránh lặp vô hạn và theo dõi số order trước/sau.
- Cart không được xóa sau checkout. Nếu cần reset, chỉ làm ngoài thời gian đo và trong DB/process cô lập. Import backend `database.js` sẽ drop/reseed toàn DB, nên backup trước.
- Không thử password sai trong main workflow: implementation có thể khóa user 180s sau một lần sai. Nếu xảy ra trên test account riêng, chờ 180 giây hoặc reset account đó trong DB cô lập.

CSV thực tế (tạo ở Prompt 04) cần credential account đã provision, search term/product ID hợp lệ, quantity, và shipping address test. Password để ngoài Git. Chưa chọn concurrency/ramp ở đây; xác định workload ở Prompt 04-06 sau khi chốt hardware và cấp data.

## Tính duy nhất trong nhóm

`HW05/README.md` hiện ghi cùng sequence này. Không có roster hay workflow của các bạn khác trong workspace, nên không thể xác nhận rằng workflow không trùng nhóm. Cần đối chiếu với nhóm trước khi chốt. Nếu bị trùng, đổi lựa chọn endpoint đã xác minh nhưng giữ cùng workflow giữa ba scenario.
