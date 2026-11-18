# Rà soát độc lập JMeter Test Plans — HW05

**Ngày rà soát:** 2026-11-18  
**Phạm vi:** Load, Stress, Spike plans, shared CSV, API source/specification, assignment PDF.  
**Trạng thái chung:** JMX well-formed và các tham chiếu chính được kiểm tra tĩnh; **chưa đủ điều kiện coi là các plan đã được JMeter native-validation hoặc sẵn sàng chạy performance**. Không plan nào được thực thi trong lần rà soát.

Đối chiếu assertion semantics với [Apache JMeter Component Reference — Assertions](https://jmeter.apache.org/usermanual/component_reference.html), trong đó Response Assertion cho phép kiểm tra Response Code và được xử lý sau sampler cùng scope.

## Tóm tắt

Ba plan dùng cùng thứ tự endpoint và data-driven request. Listener lần lượt là Summary Report, Aggregate Report, View Results Tree. Review phát hiện response body assertions chưa kiểm tra status code; đã sửa bằng HTTP 200 Response Assertion cho toàn bộ 35 sampler (5 Load, 15 Stress, 15 Spike). Các request POST có body JSON parseable sau khi thay biến theo CSV hiện có.

Các blocker còn lại: `users.csv` chỉ có một customer, `shipping_address` trống; Stress cần tối đa 7 account riêng và Spike cần 6 để chạy đúng cấu hình; JMeter không có trên PATH nên không thể mở/native-validate plan. Load/Stress là one-pass, Stress stage 2/3 tắt mặc định; Spike giữ peak trong một journey khoảng 25 giây. Chưa thể kết luận capacity, sustained load, recovery thực tế hoặc threshold.

## Kiểm tra theo Prompt 07

| # | Hạng mục | Kết quả | Bằng chứng / nhận xét |
|---:|---|---|---|
| 1 | XML/JMX well-formed | PASS (XML syntax) | `xml.etree.ElementTree` parse đủ ba JMX. Đây không phải native JMeter validation. |
| 2 | Endpoint path/method | PASS | Đối chiếu `backend/server.js`: `POST /api/login`, `GET /api/products`, `GET /api/products/:id`, `POST /api/cart`, `POST /api/checkout`; ba plan có cùng sequence. |
| 3 | Request payloads | CONDITIONAL | Login khớp `{email,password}`; cart khớp object product trong `api_specification.md`; checkout gửi `total_amount` và `shipping_address` theo spec/source. CSV truyền `shipping_address` rỗng nên fixture chưa hợp lệ/được duyệt. |
| 4 | CSV path và variable mapping | PARTIAL | Default path `HW05/test-data/users.csv` tồn tại khi chạy từ repository root; cột CSV trùng `variableNames`. File chỉ có một row. |
| 5 | Token extraction | PASS (static) | Mỗi login sampler có JSON PostProcessor `$.token`, default `TOKEN_NOT_EXTRACTED`. Chưa có runtime response để xác nhận extractor hoạt động. |
| 6 | Authorization headers | PASS (static) | Cart và checkout có `Authorization: Bearer ${auth_token}` cùng `Content-Type: application/json`. |
| 7 | Cookies/session | PASS (theo source) | Source dùng JWT Bearer, không có cookie/session middleware cho các endpoint đã chọn; không cần HTTP Cookie Manager theo flow này. Chưa xác nhận bằng HTTP capture. |
| 8 | Assertions | FIXED | Từng sampler có body/business assertion; đã thêm response-code assertion kỳ vọng `200` cho mọi sampler. Xem phần correction. |
| 9 | Think-time | PASS (configured) | Load/Stress 3000 ms trước mỗi sampler; Spike baseline/recovery 3000 ms và peak 5000 ms. Timer cũng áp dụng trước login đầu tiên. Chưa có user study chứng minh các khoảng này đại diện hành vi thật. |
| 10 | Ramp/workload | PARTIAL | Load: 1 VU, 1 pass. Stress: stage 1=1 active; stage 2=2 và stage 3=4 disabled mặc định; mỗi VU 1 pass. Spike: 1 baseline, tăng 4 VU trong 2s, recovery 1 VU ở t=60s; mỗi VU 1 pass. Các cấu hình one-pass không tạo plateau/sustained duration. |
| 11 | Listener uniqueness | PASS | Load `Summary Report`; Stress `Aggregate Report`; Spike `View Results Tree`; ba loại khác nhau. View Results Tree có chi phí bộ nhớ cao hơn, nhưng cấu hình dự kiến chỉ 6 VU/30 HTTP samples nếu đủ data. |
| 12 | Login lockout | PASS (hazard addressed) | Không gửi password sai có chủ đích; thread dừng khi sampler/assertion lỗi. `server.js` cộng attempt thêm 2 nên một lần sai có thể khóa 180 giây, khác mô tả ba lần trong PDF/guide. |
| 13 | VU data isolation | BLOCKED by data | CSV `recycle=false`, `stopThread=true`, tránh reuse account. Hiện một account; stress cần bảy dòng unique cho cả stages, spike sáu. Nếu thiếu dòng, VU dừng và workload khai báo không đạt. |
| 14 | Cart/checkout dependencies | PARTIAL | Token và product values được cấp cho request sau. Source lưu cart trong RAM theo user, nhưng checkout không đọc/clear cart; mỗi VU chỉ checkout một lần để hạn chế side effect. |
| 15 | Duplicate orders | CONTROLLED, not eliminated across runs | Mỗi VU một checkout/plan pass: tối đa 1/7/6 order ở Load/Stress/Spike cấu hình đầy đủ. Lặp chạy trên cùng DB tiếp tục thêm order. DB snapshot trước đó có 3 order. |
| 16 | Cleanup/reset | BLOCKER for repeated runs | Không có cleanup API khách hàng cho cart/order. `backend/database.js` drop/recreate bảng khi import; không restart server trên DB cần bảo toàn. Cần DB test cô lập/backup/restore được duyệt. |
| 17 | JMeter compatibility | UNVERIFIED | JMX khai báo JMeter 5.6.3, phiên bản cũng xuất hiện trong thông tin workspace, nhưng `jmeter` không có trên PATH. Không kiểm tra được mở/import, save, hoặc chạy `-n` bằng native JMeter. |

## Kết quả validation đã thực hiện

- Parse XML ba file JMX và kiểm tra số Thread Group/sampler/listener.
- So sánh path/method của từng group với workflow Load và source backend.
- So sánh CSV header với `CSVDataSet.variableNames`; xác nhận các command-default paths.
- Thay giá trị từ row CSV hiện tại vào các JSON POST body rồi parse JSON.
- Xác nhận 35 sampler đều có response-code `200` assertion và body assertion.
- Không chạy server/JMeter, không tạo JTL/HTML report, không tạo metric giả.

## Corrections applied

Thêm vào mỗi sampler một `ResponseAssertion` với `Assertion.test_field=Assertion.response_code`, `test_type=2` (contains), giá trị `200`; tổng 35 assertion mới. Lý do: body substring một mình không bảo đảm response thuộc HTTP success class và không phát hiện đủ rõ trường hợp body lỗi khác định dạng. Các business assertions được giữ nguyên.

## Blockers và kết luận sử dụng

Không chạy full plan cho đến khi cấp CSV đúng số account riêng và shipping address fixture hợp lệ; hiện data có một dòng, không đủ cho workload khai báo. JMeter native compatibility còn unverified. Các plan one-pass không đo sustained Load, maximum sustainable Stress, hoặc peak plateau dài; chỉ có thể thu thập một burst ngắn khi các prerequisite đã sẵn sàng. Stress stage 2/3 disabled để tăng tải theo từng bước sau khi đọc evidence stage trước. Cần review lại sau khi cài JMeter và chuẩn bị test DB.

Workflow chưa được xác nhận không trùng với các thành viên khác vì workspace không chứa roster/plan của nhóm.
