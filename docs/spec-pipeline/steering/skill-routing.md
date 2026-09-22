# Agent 2 — skill routing (keyword → files under `docs/spec-pipeline/skills/`)

Match case-insensitively on requirement/design text. Load **all** partial matches, dedupe paths.

| Keywords | Skill file |
|----------|------------|
| mongo, mongodb, bson | mongo-operations.md |
| validate, validation, bean validation, jakarta.validation | validation-rules.md |
| exception, error handling, ProblemDetail | exception-handling.md |
| async, @Async, CompletableFuture, reactive | async-processing.md |
| cache, redis, caffeine, ttl | caching-strategy.md |
| transaction, @Transactional, isolation | transaction-management.md |
| performance, optimize, n+1, batch | code-optimization.md |
| upload, download, csv, excel, multipart | file-handling.md |
| log, logging, structured, correlation | logging-strategy.md |
| pattern, strategy, factory, builder | design-patterns.md |
| document, readme, spec, api doc | documentation.md |

If no keyword matches, still read `docs/spec-pipeline/steering/coding-standards.md` and `docs/spec-pipeline/steering/springboot-patterns.md`.
