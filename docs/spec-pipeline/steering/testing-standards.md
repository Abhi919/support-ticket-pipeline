# Testing standards

- Prefer fast unit tests for pure logic; integration tests where wiring matters.
- Name tests for behavior, not implementation details.
- Each failing scenario should assert a clear message or contract.
- Do not assert on log output unless logs are part of the public contract.
