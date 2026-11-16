# Phase 3 — Tổng hợp định tính

## Cách tổng hợp

1. Đọc lại 7 bản ghi P01–P07, giữ nguyên liên kết về mã người tham gia và thời điểm.
2. Mã hóa từng quan sát/trích dẫn thành chủ đề; không biến một lời nói cá biệt thành kết luận chung.
3. Đếm **số người** gặp chủ đề, không chỉ số lần chủ đề xuất hiện.
4. Phân loại: `vấn đề hệ thống` khi lặp lại hoặc có nguyên nhân giao diện chung; `sự cố đơn lẻ` khi chỉ xảy ra một lần do môi trường/dữ liệu/người dùng và chưa tái hiện.
5. Tái hiện ứng viên bug trước khi báo cáo GitHub Issue.

## Ma trận chủ đề

| ID | Chủ đề / pain point | Bằng chứng P0x và thời điểm | Số người | Loại (`hệ thống`/`đơn lẻ`) | Ảnh hưởng đến mốc | Diễn giải trung lập |
|---|---|---|---:|---|---|---|
| QF-01 | Nhận biết đăng nhập thành công chưa rõ với một người | `P04, câu 1: “Không”` | 1 | `đơn lẻ` | M1 Đăng nhập | Sáu người trả lời “Có”; cần kiểm tra lại trạng thái/ thông báo đăng nhập với các phiên quan sát trước khi kết luận đây là vấn đề hệ thống. |
| QF-02 | Chọn số lượng và hiển thị trong giỏ có thể gây nhầm lẫn | `P03, câu 3: “Tôi không được chọn số lượng mà phải nhấn thêm sản phẩm 2 lần… hiển thị 2 lần với số lượng là 1”` | 1 | `đơn lẻ` | M3 Chọn số lượng; M5 Kiểm tra giỏ | Đây là phản hồi duy nhất mô tả trở ngại cụ thể; cần tái hiện trước khi xếp là bug hoặc vấn đề hệ thống. |

## Phân tích theo bốn khía cạnh bắt buộc

### Clarity

Sáu trong bảy người trả lời rằng hệ thống giúp họ nhận biết đăng nhập thành công; P04 trả lời “Không” (QF-01). Cả bảy người trả lời rằng họ dễ tìm iPhone 15 Pro Max và dễ kiểm tra đúng sản phẩm cùng số lượng 2 trong giỏ. Đây là phản hồi sau phiên, không thay thế bằng chứng quan sát thao tác.

### Error recovery

P03 mô tả đã phải thêm sản phẩm hai lần để có số lượng 2 và sau đó thấy hai dòng cùng sản phẩm, mỗi dòng số lượng 1 (QF-02). Form không hỏi cách người tham gia tự khôi phục lỗi, nên chưa đủ dữ liệu để đánh giá khả năng khôi phục nói chung.

### Speed & efficiency

Không có thời gian thực hiện từng mốc, thời lượng toàn luồng, số lần nhấp hoặc ghi nhận do dự trong file khảo sát. Vì vậy không thể kết luận về tốc độ hay hiệu quả của luồng từ dữ liệu hiện có.

### Trust

Cả bảy người trả lời rằng họ dễ kiểm tra đúng sản phẩm và số lượng trong giỏ, đồng thời tự tin hoàn thành lại luồng mà không cần hỗ trợ. Tuy nhiên, form không hỏi trực tiếp về an toàn tài khoản hoặc cảm nhận khi đăng xuất, nên không suy rộng kết quả này thành đánh giá về bảo mật.
