# AI Misinterpretation Hunt

## Cách rà soát

Đối chiếu nhận định/bảng AI-assisted trong các báo cáo JTL đã có với raw CSV, JMeter logs và resource evidence. Chỉ ghi lỗi diễn giải đã tái lập được; khác biệt do sampling/rounding hoặc khuyến nghị chưa được kiểm nghiệm không tự động gọi là AI error.

## Các trường hợp xác nhận

| AI-generated statement / output | Giá trị đúng từ raw JTL | Bằng chứng / phép tính | Vì sao sai | Diễn giải đã sửa |
|---|---|---|---|---|
| `results/performance-analysis-20261122.md`: “Mean recovery thấp hơn baseline… `n=5` mỗi phase” | Baseline n=5; Spike Peak n=20; Recovery n=5. Peak mean 69.90 ms, p95 354 ms, max 595 ms. | Đếm các dòng raw `Spike.jtl` theo prefix label `Baseline`, `Spike Peak`, `Recovery`; 5 + 20 + 5 = 30. | Cỡ mẫu peak bị ghi thiếu 15 sample. Câu “mỗi phase” không đúng với JTL, dù hướng thận trọng về kết luận recovery vẫn hợp lý. | So sánh recovery với baseline phải nêu phase n=5 và peak n=20. Recovery mean11ms thấp baseline30.4ms trong các sample đã ghi, nhưng recovery chỉ có 5 request nên chưa chứng minh trạng thái phục hồi bền vững. |
| Các analyzer Markdown theo nhãn báo `Throughput=1000.00 samples/s` cho label chỉ có một sample (ví dụ Load `01 - Login`, Spike baseline/recovery labels). | Với mỗi label n=1, không có đủ thời gian quan sát riêng để ước lượng endpoint throughput; 1000 là artefact của công thức: 1 sample / cửa sổ tối thiểu 1 ms. Ví dụ Load login response 48 ms, không phải 1000 request/s. | Raw `Load.jtl` có 1 dòng cho từng label. Analyzer dùng `max(timeStamp)-min(timeStamp)+1`; trong nhóm một dòng span=1 ms nên cho 1000. | Phép tính chia cho cửa sổ suy biến của một sample, rồi trình bày như endpoint RPS. Đó không phải tốc độ hệ thống gửi endpoint và dễ bị hiểu nhầm thành năng lực. | Không báo RPS cho endpoint khi chỉ có một hoặc vài sample rời. Báo latency và n; tính throughput theo cửa sổ scenario đủ dài, ghi rõ cách chọn cửa sổ. |
| Các bảng tóm tắt JTL cũ không có Median nhưng mô tả “metric đầy đủ”/chưa tính median. | Median tính lại: Load 5 ms; Stress stage1 4 ms, stage2 4.5 ms, stage3 5 ms; Spike toàn run 6 ms; Endurance 5 ms (309 dòng hợp lệ). | Raw `elapsed`, median truyền thống; khi n chẵn lấy trung bình 2 giá trị giữa. | Bỏ sót một metric mà Prompt 10 yêu cầu; không thể suy ra median từ mean hoặc p95. | Median đã được tính và bổ sung trong `analysis/AI_Analysis.md`; các số summary analyzer cũ không được dùng làm thay thế. |

## Những nguy cơ đã kiểm tra nhưng chưa phải misinterpretation đã xác nhận

1. **Percentile ở mẫu nhỏ:** Load n=5 nên p90/p95/p99 đều bằng max 48ms; Stress Stage 1 n=5 cho cả ba =141ms. Đây là kết quả nearest-rank đúng về số học, nhưng tail percentile không ổn định và không đại diện quần thể. Analyzer cũ đã có cảnh báo `n<20`; không ghi nhận lỗi công thức percentile cho các ví dụ này.
2. **Average so với p95:** Spike toàn run mean53.5ms nhưng p95=354ms; hai đại lượng khác nhau. Không dùng mean để mô tả tail latency. Endurance mean21.04ms/p95=98ms cũng cho thấy khác biệt này.
3. **Throughput giữa các Stress stage:** Stage 1/2/3 lần lượt 0.405/0.780/1.340 request/s theo từng JTL. Không gộp thành RPS duy nhất vì ba stage là các execution rời; mức tăng không chứng minh saturation chưa xảy ra.
4. **Recovery sau Spike:** recovery samples 5/5 pass, mean11ms; baseline 5/5 pass, mean30.4ms. Cỡ mẫu nhỏ và chỉ một vòng workflow mỗi VU; không kết luận hệ thống “đã recovery ổn định”.
5. **Endurance timestamp và count:** 309 dòng đủ schema không bằng toàn bộ JMeter samples. Log báo 341 sample xử lý; raw JTL có một dòng dở dang, và DB isolated ghi 70 orders so với 61 checkout rows hoàn chỉnh. Không được dùng 309 như toàn bộ request của process run.
6. **Client/host và server:** CPU/RAM đo được là host; backend process private memory riêng có max61.9MiB. Không thể quy CPU host 100% hoặc latency spike trực tiếp cho SQLite/backend.

## Kết luận

Đã xác nhận lỗi ghi nhầm số sample Spike peak, throughput endpoint suy biến bị trình bày như RPS, và thiếu median trong các bảng cũ. Các lỗi này được nêu rõ để người đọc không dựa vào số cũ. Không thấy failed sample trong các raw rows hợp lệ; điều đó không chứng minh hệ thống không lỗi ngoài cửa sổ capture hoặc khi chạy lâu hơn.
