---
name: ai-audit-logger
description: Structure, verify, and format AI interaction logs into the mandatory HW03 AI Audit Report appendix and validate AI Critique word counts (200-300 words). Use after completing an AI-assisted testing session to document the AI tool name, date/time, exact prompt, AI output, and human review refinements without fabricating logs.
---

# AI Audit Logger & Critique Checker (HW03)

Use this skill at the end of an AI-assisted testing session to compile the mandatory **AI Audit Report** (`§9`) and verify the **AI Critique** (`§10`).

## Core Rules

1. **No fabricated logs:** Record only actual interactions from the current session or real logs provided by the student. Never invent timestamps, prompts, or AI outputs.
2. **Exact mandatory declaration:** Begin the AI Audit Report with the exact required phrase:
   - `"I use AI tools for the following tasks,"` (or `"I do not use any AI help in this exercise."` if unused).
3. **Complete fields per interaction:** Every logged interaction must include:
   - Name of the AI tool (e.g., Gemini, Claude, ChatGPT, Copilot, Cursor)
   - Date and time
   - Your prompt
   - The AI output (or exact summary + reference to saved output)
   - Human review / edits made by the student
4. **Word-count compliance for AI Critique:** Ensure the AI Critique paragraph stays strictly within **200–300 words** and directly answers all three required questions.

## Workflow

### Step 1 — Collect Session Interactions
Extract or request from the student:
- AI tool and model used
- Timestamp (`YYYY-MM-DD HH:MM`)
- Exact prompt submitted
- Output produced by AI
- What the student corrected, rejected, or added during Human Review

### Step 2 — Format AI Audit Report Appendix
Generate the Markdown appendix using this structure:

```markdown
# AI Audit Report (Mandatory Appendix)

**Declaration:** I use AI tools for the following tasks, ...

## Summary of Tools Used
- **AI Tools:** <Tool names>
- **Cross-Platform Tools (if applicable):** <BrowserStack / LambdaTest / Physical Devices>
- **Bloom-AI Level Targeted:** G9.3 (Analyse), G9.4 (Collaborate)

## Interaction Log

### Interaction #1 — <Task / Step Name>
- **Name of the AI tool:** <Tool name>
- **Date and time:** <YYYY-MM-DD HH:MM>
- **Your prompt:**
  > <Exact prompt text>
- **The AI output:**
  > <Exact output or structured summary of generated artifact>
- **Human review & refinements:** <What you verified, corrected, or added manually>
```

### Step 3 — Validate AI Critique (200–300 words)
When the student drafts their **AI Critique**, verify:
1. Word count is between **200 and 300 words** (report the exact word count).
2. All 3 required questions are answered:
   - Where did the AI get something wrong, biased, or incomplete?
   - Why did it fail to catch the issue?
   - What principle did you learn about collaborating with AI during this assignment?

## Definition of Done
- [ ] Mandatory declaration line included verbatim
- [ ] Every AI-assisted task has tool name, date/time, exact prompt, output, and human edits
- [ ] AI Critique verified at 200–300 words and covers all 3 questions
- [ ] Ready to export to both Markdown and PDF (`AI-audit-report.md/.pdf`, `AI-critique.md/.pdf`)
