# Skill — Mongo-style persistence

- Prefer repository boundaries; avoid leaking driver types into domain APIs.
- Index design belongs in `design.md`; state migration risks explicitly.
- Use transactions when multi-document invariants are required.
