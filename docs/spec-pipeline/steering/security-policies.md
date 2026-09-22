# Security policies

- No hardcoded secrets, API keys, tokens, or private keys in code, tests, or specs.
- Validate untrusted input at boundaries; fail closed on authZ.
- TLS by default for external calls; do not disable certificate verification.
- Logging must avoid PII/secrets; use structured redaction patterns where applicable.
- Follow OWASP ASVS-style thinking for auth, session, injection, SSRF, and deserialization.
