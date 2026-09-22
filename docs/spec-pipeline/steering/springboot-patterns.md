# Spring Boot patterns (this repo)

- Prefer constructor injection; keep beans focused.
- REST controllers return appropriate HTTP status codes; centralize exception handling if the project already does.
- For AWS Lambda + Serverless Java Container, preserve cold-start friendly initialization patterns used in existing handlers.
