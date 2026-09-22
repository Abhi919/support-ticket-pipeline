# Template: Context compress (any stage)

**Variables:** `{{TICKET_ID}}`, `{{FILES}}` (comma-separated paths)

## Prompt

Compress the following spec artifacts for **{{TICKET_ID}}** into ≤40 bullets for the next prompt. Preserve all `AC-###`, `NFR-###`, and state-transition rules.

**Files:** {{FILES}}

**Output format (markdown):**

```markdown
## Summary
- ...

## Acceptance criteria (compressed)
| AC | One-line |
|----|----------|

## Risks / open questions
- ...

## Files not read (explicit)
- ...
```

Omit boilerplate and duplicate prose. Do not invent requirements not present in the files.
