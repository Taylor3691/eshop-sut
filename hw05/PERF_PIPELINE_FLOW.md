# Luồng kiểm thử hiệu năng liên tục

Luồng ghép quy tắc phân loại commit với ba tầng đo. p95 lấy từ cột `elapsed` của từng label `01`–`05`. Sample `LOCK_*` không đưa vào p95 và không làm lần chạy thất bại.

```mermaid
flowchart TD
  pr["Commit hoặc PR"] --> kind{"Phân loại diff"}
  kind -->|"chỉ frontend, hw05, comment hoặc database.sqlite"| skip["Không chạy JMeter"]
  kind -->|"handler ngoài luồng, hoặc chỉ đổi số seed"| light["Nhẹ: 3 thread, 30 giây"]
  kind -->|"đụng 5 API, middleware, schema hoặc version dependency, nhánh không phải main"| prPlan["PR: 30 thread, 90 giây"]
  kind -->|"cùng loại bắt buộc, merge hoặc push vào main"| mergePlan["Merge: 80 thread, 150 giây"]

  clock["Đến lịch"] --> when{"Loại lịch"}
  when -->|"mỗi ngày, máy rảnh, đang cắm sạc"| soak["Nightly: Soak 150 thread, 960 giây"]
  when -->|"mỗi tuần"| stress["Weekly: Stress lên 200 thread"]

  light --> prep["Restart node, tạo user, xóa lockout"]
  prPlan --> prep
  mergePlan --> prep
  soak --> prep
  stress --> prep

  prep --> run["Chạy JMeter và giữ kết nối"]
  run --> calc["Tính p95 từ elapsed, bỏ LOCK"]
  calc --> ok{"5 label chính còn lỗi?"}
  ok -->|"có, lần đầu"| retryEnv["Restart node và chạy lại một lần"]
  retryEnv --> ok2{"Hết lỗi chưa?"}
  ok2 -->|"chưa"| badEnv["Báo lỗi môi trường, không ghi baseline"]
  ok2 -->|"rồi"| gate{"Tầng đang chạy"}
  ok -->|"không"| gate

  gate -->|"nhẹ"| gLight{"p95 mỗi label dưới 50 ms?"}
  gLight -->|"có"| passLight["Pass, không ghi baseline"]
  gLight -->|"không"| warnLight["Cảnh báo, không chặn merge"]

  gate -->|"PR hoặc merge"| cmp{"p95 label ≥ trung vị main + 3 ms?"}
  cmp -->|"không, lệch tối đa 1 ms"| pass["Pass"]
  cmp -->|"có"| confirm["Restart node và chạy lại đúng plan"]
  confirm --> cmp2{"Cùng label vẫn ≥ +3 ms?"}
  cmp2 -->|"có"| block["Chặn merge và báo"]
  cmp2 -->|"không"| warn["Chỉ cảnh báo, bỏ lần chậm"]

  gate -->|"nightly"| nEarly{"p95 phút 1 đến 7 ≥ trung vị + 3 ms?"}
  nEarly -->|"có"| warnNight["Cảnh báo Soak, không chặn merge"]
  nEarly -->|"không"| nLate{"Từ phút 8: p99 ≥ 20 ms, hoặc dưới 6120 req/s, hoặc p95 ≥ 9 ms?"}
  nLate -->|"có"| warnNight
  nLate -->|"không"| pass

  gate -->|"weekly"| w{"Đỉnh dưới 8000 req/s, hoặc p95 ≥ trung vị + 3 ms?"}
  w -->|"có"| warnWeek["Cảnh báo trần throughput"]
  w -->|"không"| pass

  pass --> dest{"Lần chạy này của main?"}
  dest -->|"có"| save["Ghi baseline của đúng tầng"]
  dest -->|"là PR"| tellPr["Báo pass, không ghi baseline"]
  save --> tellMain["Báo pass"]
```

Nhãn PR và commit message không có mặt trên sơ đồ, vì chúng không được phép hạ mức phân loại. Baseline chỉ ghi khi lần chạy đạt và xảy ra trên `main`. PR, tầng nhẹ, lần chạy lại trở về mức khỏe, và lần Soak từ phút 8 bị lệch đều không ghi đè baseline. p95 của cả file Soak vẫn là 2 ms dù phút 8 đã hỏng, nên nightly xét từng phút chứ không xét một p95 cho cả 960 giây.
