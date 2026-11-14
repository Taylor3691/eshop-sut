# Phase 3 — Findings xếp theo mức độ nghiêm trọng

## Thang severity

| Mức | Tên | Tiêu chí |
|---:|---|---|
| 4 | Blocker | Người dùng không thể hoàn tất mốc/toàn luồng; không có cách khôi phục hợp lý. |
| 3 | Serious | Hoàn tất được nhưng phải thử sai, mất nhiều thời gian hoặc cần hỗ trợ; tác động rõ đến nhiều người. |
| 2 | Moderate | Gây do dự/hiểu nhầm đáng kể nhưng vẫn có thể tự hoàn tất. |
| 1 | Minor | Bất tiện hoặc khiếm khuyết trình bày nhỏ, không cản trở mục tiêu. |
| 0 | Observation | Ý kiến/cơ hội cải tiến chưa đủ bằng chứng để gọi là vấn đề. |

Severity là kết hợp của tác động, tần suất và khả năng khôi phục; không xếp mức chỉ vì một người không thích giao diện.

## Quy tắc xếp hạng nhất quán

1. Bắt đầu từ **tác động** đến M1–M6: không hoàn tất, hoàn tất nhưng phải giúp, hay chỉ khó chịu nhẹ.
2. Ghi **tần suất** theo số người khác nhau trên 7, không đếm lần click.
3. Ghi **khả năng khôi phục**: tự khôi phục, sau nhiều thử nghiệm, hay cần moderator.
4. Chọn mức cao hơn chỉ khi bằng chứng trong P0x hỗ trợ; không nâng severity để tăng số bug.
5. Một lỗi tái hiện được chỉ có thể trở thành genuine bug sau khi có expected behavior/FR hoặc hành vi mong đợi rõ ràng, steps tái hiện và screenshot thật.

## Danh sách ưu tiên

| Ưu tiên | Finding ID | Vấn đề | Bằng chứng (P0x) | Tần suất /7 | Severity | Kiến nghị | Cần tái hiện bug? | GitHub Issue |
|---:|---|---|---|---:|---:|---|---|---|
| 1 | `[QF-xx]` | `[TỰ ĐIỀN]` | `[ ]` | `[ ]` | `[0–4]` | `[TỰ ĐIỀN]` | `[Có/Không]` | `[URL/# hoặc N/A]` |
| 2 | `[QF-xx]` | `[TỰ ĐIỀN]` | `[ ]` | `[ ]` | `[0–4]` | `[TỰ ĐIỀN]` | `[Có/Không]` | `[URL/# hoặc N/A]` |

## Phân biệt finding và bug

- **Finding usability:** hành vi/cảm nhận hợp lệ của người dùng; có thể dẫn đến cải tiến thiết kế nhưng không nhất thiết là lỗi.
- **Genuine bug:** hành vi của SUT có thể tái hiện, sai so với yêu cầu/expected behavior hoặc gây lỗi thực thi. Chỉ loại này phải có GitHub Issue và screenshot theo `HW03.md`.
