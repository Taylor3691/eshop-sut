# GUI Checklist (Markdown Conversion)

> **Source of truth:** File này là bản Markdown conversion của `checklist/gui-checklist.xlsx` để dùng trực tiếp trên GitHub. Excel workbook được giữ làm backup.
>
> **Conversion limitation:** Worksheet Checklist trong workbook chỉ có header row và không có checklist record được populate. Vì vậy conversion này giữ nguyên zero checklist record, không import row từ `human-reviewed-checklist.md` và không invent execution value. Worksheet AI Review có 92 record và được giữ đầy đủ bên dưới.

## 1. Checklist

Tại thời điểm conversion, worksheet Checklist trong workbook không có checklist item record được populate. Worksheet header là:

`ID | IA Aspect | Screen | Checklist Item | Requirement Reference | Expected Result | Source | AI Gap Reason | Actual Result | Status | Notes | Evidence`

Bốn aspect section bắt buộc được giữ ở trạng thái empty vì source worksheet không có checklist row.

### IA-01 - General UI Standards

_Source workbook Checklist worksheet không có row được populate._

### IA-02 - Forms

_No populated rows in the source workbook Checklist worksheet._

### IA-03 - Navigation

_No populated rows in the source workbook Checklist worksheet._

### IA-04 - Feedback / State

_No populated rows in the source workbook Checklist worksheet._

## 2. Test Summary

Source workbook có formula cell trong `Test Summary`. Vì worksheet Checklist không có row được populate, formula evaluate thành zero. Không fabricate execution result.

| Dimension | Total | Passed | Failed | Not Executed |
|---|---:|---:|---:|---:|
| IA-01 | 0 | 0 | 0 | 0 |
| IA-02 | 0 | 0 | 0 | 0 |
| IA-03 | 0 | 0 | 0 | 0 |
| IA-04 | 0 | 0 | 0 | 0 |
| Login | 0 | 0 | 0 | 0 |
| Register | 0 | 0 | 0 | 0 |
| Forgot Password | 0 | 0 | 0 | 0 |

### Diễn giải Summary

- Total checklist item: `0` trong workbook Checklist worksheet.
- Passed: `0`.
- Failed: `0`.
- Not Executed: `0`.
- Formula vẫn được giữ trong Excel backup; numeric value ở trên là giá trị evaluate của source range hiện đang empty.

## 3. AI Review

Source workbook có 92 AI Review record. Tất cả record được giữ nguyên bên dưới.

| Checklist Item ID | AI-generated or Human-added | Review Decision | Reason for Addition/Modification | Related Interface Aspect |
|---|---|---|---|---|
| GUI-001 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-01 General UI standards |
| GUI-002 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-01 General UI standards |
| GUI-003 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-01 General UI standards |
| GUI-004 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-01 General UI standards |
| GUI-005 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-01 General UI standards |
| GUI-006 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-01 General UI standards |
| GUI-007 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-01 General UI standards |
| GUI-008 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-01 General UI standards |
| GUI-009 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-02 Forms |
| GUI-010 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-02 Forms |
| GUI-011 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-02 Forms |
| GUI-012 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-02 Forms |
| GUI-013 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-02 Forms |
| GUI-014 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-02 Forms |
| GUI-015 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-02 Forms |
| GUI-016 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-04 Feedback / state |
| GUI-017 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-04 Feedback / state |
| GUI-018 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-03 Navigation |
| GUI-019 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-03 Navigation |
| GUI-020 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-03 Navigation |
| GUI-021 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-03 Navigation |
| GUI-022 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-04 Feedback / state |
| GUI-023 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-01 General UI standards |
| GUI-024 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-01 General UI standards |
| GUI-025 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-01 General UI standards |
| GUI-026 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-01 General UI standards |
| GUI-027 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-01 General UI standards |
| GUI-028 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-01 General UI standards |
| GUI-029 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-01 General UI standards |
| GUI-030 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-02 Forms |
| GUI-031 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-02 Forms |
| GUI-032 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-02 Forms |
| GUI-033 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-02 Forms |
| GUI-034 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-02 Forms |
| GUI-035 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-02 Forms |
| GUI-036 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-02 Forms |
| GUI-037 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-02 Forms |
| GUI-038 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-04 Feedback / state |
| GUI-039 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-04 Feedback / state |
| GUI-040 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-04 Feedback / state |
| GUI-041 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-03 Navigation |
| GUI-042 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-03 Navigation |
| GUI-043 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-03 Navigation |
| GUI-044 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-01 General UI standards |
| GUI-045 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-01 General UI standards |
| GUI-046 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-01 General UI standards |
| GUI-047 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-01 General UI standards |
| GUI-048 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-01 General UI standards |
| GUI-049 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-01 General UI standards |
| GUI-050 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-01 General UI standards |
| GUI-051 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-02 Forms |
| GUI-052 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-02 Forms |
| GUI-053 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-02 Forms |
| GUI-054 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-02 Forms |
| GUI-055 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-02 Forms |
| GUI-056 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-02 Forms |
| GUI-057 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-02 Forms |
| GUI-058 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-02 Forms |
| GUI-059 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-02 Forms |
| GUI-060 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-04 Feedback / state |
| GUI-061 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-04 Feedback / state |
| GUI-062 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-04 Feedback / state |
| GUI-063 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-04 Feedback / state |
| GUI-064 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-04 Feedback / state |
| GUI-065 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-04 Feedback / state |
| GUI-066 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-03 Navigation |
| GUI-067 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-03 Navigation |
| GUI-068 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-03 Navigation |
| GUI-069 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-03 Navigation |
| GUI-070 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-03 Navigation |
| GUI-071 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-01 General UI standards |
| GUI-072 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-01 General UI standards |
| GUI-073 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-02 Forms |
| GUI-074 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-04 Feedback / state |
| GUI-075 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-04 Feedback / state |
| GUI-076 | AI-generated | Retain | Reviewed against requirements and source UI; no correction required. | IA-01 General UI standards |
| HR-001 | Human-added | Add | The initial checklist checked for one visible heading (GUI-001) but did not separately verify the explicit h1 semantic requirement. | IA-01 General UI standards |
| HR-002 | Human-added | Add | The initial checklist checked for one visible heading (GUI-023) but did not separately verify the explicit h1 semantic requirement. | IA-01 General UI standards |
| HR-003 | Human-added | Add | The initial checklist checked for one visible heading (GUI-044) but did not separately verify the explicit h1 semantic requirement. | IA-01 General UI standards |
| HR-004 | Human-added | Add | The initial checklist covered a supported desktop viewport (GUI-005) and 200% zoom (GUI-008), but not narrow responsive layout. | IA-01 General UI standards |
| HR-005 | Human-added | Add | The initial checklist covered a supported desktop viewport (GUI-027) and did not add a narrow responsive check for Register. | IA-01 General UI standards |
| HR-006 | Human-added | Add | The initial checklist covered a supported desktop viewport (GUI-047) but did not add a narrow responsive check for either recovery state. | IA-01 General UI standards |
| HR-007 | Human-added | Add | GUI-010 checked the email input type and browser validation capability, but did not separately check the observable invalid-format response and submission prevention. | IA-02 Forms |
| HR-008 | Human-added | Add | The initial checklist covered unsuccessful feedback (GUI-016/017) but had no successful-login outcome item. | IA-04 Feedback / state |
| HR-009 | Human-added | Add | GUI-032 checked the email input type, but did not separately check the observable invalid-format response and submission prevention. | IA-02 Forms |
| HR-010 | Human-added | Add | GUI-036 checked whether a confirmation field exists, but no initial item checked the required mismatch outcome. | IA-04 Feedback / state |
| HR-011 | Human-added | Add | GUI-035 checked that guidance is displayed and GUI-038 checked weak-password feedback, but neither tests the minimum-length boundary. | IA-04 Feedback / state |
| HR-012 | Human-added | Add | GUI-038 checked generic weak-password feedback, but did not distinguish the four required character-class partitions. | IA-04 Feedback / state |
| HR-013 | Human-added | Add | GUI-054 checked that the three step-2 inputs exist, but no initial item checked the required mismatch outcome. | IA-04 Feedback / state |
| HR-014 | Human-added | Add | GUI-063 addressed invalid OTP/reset failure, but the initial checklist did not cover failure while requesting the OTP in step 1. | IA-04 Feedback / state |
| HR-015 | Human-added | Add | GUI-066/067 checked the requirement generically and the reset-state back action, but did not isolate availability from step 1. | IA-03 Navigation |
| HR-016 | Human-added | Add | The initial checklist covered visible focus (GUI-007/029/050) and non-color feedback (GUI-074), but did not cover contrast as a separate visual accessibility characteristic. | IA-04 Feedback / state |

## 4. Các source worksheet đã được đối chiếu

- **Checklist:** Giữ nguyên header; zero populated record.
- **Test Summary:** Giữ nguyên seven dimension row với evaluated zero value.
- **AI Review:** Giữ nguyên 92 record.
- **Execution status:** Không thêm PASS/FAIL result trong quá trình conversion.
- **Evidence paths:** Source workbook không có Evidence path được populate. Evidence sau này phải dùng repository-relative path dưới `task-1-gui-checklist/evidence/`.
