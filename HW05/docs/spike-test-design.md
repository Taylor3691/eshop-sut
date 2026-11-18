# Thiết kế Spike Test EShop — 23120157

**Plan:** `test-plans/23120157_Spike_20261118.jmx`  
**Test data:** tái sử dụng `test-data/users.csv` và cơ chế JWT từ Load/Stress.  
**Trạng thái:** Đã tạo để review; **chưa thực thi**. Prompt 06 yêu cầu người dùng duyệt cấu hình trước khi chạy.

## Workflow chung

Ba phase đều chạy cùng journey/endpoints như Load và Stress:

```text
POST /api/login
→ GET /api/products?search=...
→ GET /api/products/{product_id}
→ POST /api/cart
→ POST /api/checkout
```

Auth-heavy: login và trích `$.token`; read-heavy: search/list và product detail; transactional: thêm cart và checkout. Token truyền qua `Authorization: Bearer ...` ở hai request cần auth. Request body, product data và assertions lấy từ plan Load đã đối chiếu source. Labels chứa tên phase để tách baseline/peak/recovery khi phân tích JTL.

## Baseline, spike, recovery

| Phase | VU | Ramp-up | Start time (kể từ start plan) | Think-time | Data cần |
|---|---:|---:|---:|---:|---:|
| Baseline | 1 | 1 giây | 0 giây | 3 giây trước mỗi sampler | Account riêng 1 |
| Spike peak | 4 | 2 giây | 25 giây | 5 giây trước mỗi sampler | 4 account riêng |
| Recovery | 1 | 1 giây | 60 giây | 3 giây trước mỗi sampler | Account riêng 1 |

Peak được tăng từ 1 lên 4 VU trong 2 giây (mức tăng nhanh), giữ các VU trong một end-to-end journey khoảng 25 giây nhờ think-time, rồi để peak hoàn tất. Recovery bắt đầu ở giây 60, dự kiến khoảng 8 giây sau khi VU cuối cùng của peak hoàn tất (thời gian request thực tế có thể làm thay đổi mốc). Mỗi phase scheduler có giới hạn 120 giây để dừng thread bị treo; controller chạy một iteration nên VU kết thúc sau workflow, không giữ idle đến hết cap.

Đây là tải cục bộ thấp: tối đa 4 VU mới ở peak và tổng 6 account riêng cho cả bài. Máy đã khảo sát có i7-1355U, 10 cores/12 logical processors, 15.7 GiB RAM, Windows 11, Java 21. JMeter chưa có trong PATH. Mức 4 VU là cấu hình khởi đầu thận trọng được đề xuất, không phải tải đã đo hoặc bảo đảm an toàn; không có baseline hiệu năng trước đó để suy ra peak tối ưu.

## Data isolation và trạng thái

CSV Data Set Config dùng cùng file/auth schema với Load, đặt tại TestPlan scope; `recycle=false`, `stopThread=true`, sharing toàn plan. Cần **sáu dòng với sáu customer accounts khác nhau** để baseline, peak, recovery không dùng chung cart. CSV hiện chỉ có account seed duy nhất; do đó plan không sẵn sàng chạy. Không tự nhân bản credential, dùng admin, hoặc gửi sai password.

Mỗi VU chỉ checkout một lần để giới hạn side effect; tổng cộng tối đa 6 order trong một full run. Cart server-side ở RAM, keyed theo user, và không được xóa khi checkout. Dùng DB test cô lập, backup và quy trình reset được duyệt. `shipping_address` hiện trống do seed profile không có địa chỉ; cấp fixture test hợp lệ trước khi chạy.

Implementation khóa user sau một lần đăng nhập sai có thể xảy ra (mỗi sai password tăng attempt +2, khóa 180 giây), dù assignment mô tả ba lần. Plan không gửi sai password; `stopthread` dừng VU ở sample lỗi. Nếu account test bị khóa, chờ ít nhất 180 giây hoặc reset đúng account test trong DB cô lập (`login_attempts=0`, `locked_until=NULL`). Không restart backend chỉ để reset vì nó drop/reseed toàn database.

## Đo peak và recovery

Plan dùng **View Results Tree** theo yêu cầu riêng của Spike và lưu raw CSV JTL khi chạy. Phân tích JTL theo phase-prefixed labels để lấy response time, throughput, error count/rate; so sánh baseline trước spike với recovery sau spike. Bằng chứng recovery là các mẫu sau phase peak trở về gần baseline theo ngưỡng/SLO do nhóm xác định. Chưa có ngưỡng SLO nên không đặt số pass/fail tùy ý.

View Results Tree có chi phí bộ nhớ lớn hơn listener tổng hợp; ở cấu hình tối đa 6 user/30 HTTP samples xấp xỉ, rủi ro thấp hơn run lớn nhưng vẫn cần quan sát JMeter host và backend. Không dùng listener này cho tải lớn chưa được duyệt. Không có số liệu thực để khẳng định response time, throughput, error rate hay recovery.

## Giới hạn so với Spike test giữ tải lâu

Peak hiện giữ VU trong một workflow khoảng 25 giây, không lặp vô hạn. Điều này tránh tạo order/cart không giới hạn trong EShop. Nó tạo một spike ngắn có recovery window nhưng **không phải plateau tải kéo dài**. Muốn giữ peak lâu hơn phải thiết kế lại cơ chế data/state (tài khoản riêng, cách reset cart/order, DB cô lập) và có đủ hàng CSV; không kéo loop dài trên account seed hiện có.

## Preconditions và duyệt cấu hình

1. Cài/xác nhận phiên bản JMeter tương thích; `jmeter` hiện chưa có trong PATH nên native validation chưa làm được.
2. Thêm sáu account test được cấp phép, mỗi account một dòng CSV và không trùng; cấp shipping-address fixture hợp lệ.
3. Cô lập/backup DB và chấp nhận số order dự kiến; chuẩn bị output JTL/HTML directory rỗng.
4. Xác nhận mốc baseline (t=0), spike (t=25s), recovery (t=60s), peak 4 VU, think-time và resource monitoring phù hợp.
5. **Chờ người dùng duyệt workload configuration trước khi thực thi.** Plan chưa chạy.

## Lệnh tham khảo sau khi được duyệt (chưa chạy)

```powershell
jmeter -n -t HW05/test-plans/23120157_Spike_20261118.jmx -Jphase1_users=1 -Jphase2_users=4 -Jphase3_users=1 -Jphase1_think_time_ms=3000 -Jphase2_think_time_ms=5000 -Jphase3_think_time_ms=3000 -Jcsv_file=HW05/test-data/users.csv -l HW05/results/Spike/23120157_Spike_20261118.jtl -e -o HW05/html-reports/Spike/23120157_Spike_20261118
```

Command minh họa cách lưu evidence, chưa được chạy và không phải kết quả test.
