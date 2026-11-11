# Prompt 02 - Human Review và AI Gap Analysis

Review `checklist/ai-generated-checklist.md` theo EShop `README.md`, `docs/2026.HW03.md`, `task-1-gui-checklist/docs/requirements-mapping.md` và React interface thực tế của Login, Register và Forgot Password.

Giữ original AI-generated checklist như immutable Evidence. Đánh giá từng item về correctness, relevance, independent testability, duplication, requirement traceability và actual UI applicability. Xác định coverage còn thiếu trong IA-01, IA-02, IA-03 và IA-04, gồm accessibility, keyboard navigation, visible focus, responsive layout, zoom, contrast, error recovery và đặc tính liên quan khác. Không thêm dark mode, RTL hoặc criterion khác thành mandatory requirement nếu không applicable với product thực tế; đánh dấu recommendation rõ ràng.

Chỉ thêm human-reviewed item hợp lệ và có thể test độc lập. Với mỗi human-added item, ghi explanation cụ thể vì sao initial checklist bỏ sót, có actual comparison hỗ trợ. Không invent AI omission hoặc claim item bị bỏ sót nếu item đã có trong initial checklist. Giữ existing ID khi có thể, gán unique stable `HR-*` ID cho item thêm mới và bảo đảm final checklist cover cả ba screen, bốn IA aspect với hơn 40 item có ý nghĩa.

Không execute test hoặc fabricate execution result. Update `checklist/human-reviewed-checklist.md`, `docs/ai-gap-analysis.md`, primary Markdown checklist `checklist/gui-checklist.md` khi source record được populate và AI Review sheet trong backup `checklist/gui-checklist.xlsx`. Ghi interaction này trong `docs/ai-audit-log.md`.
