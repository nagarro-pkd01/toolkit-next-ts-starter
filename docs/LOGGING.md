# Logging Guidelines

## Principles

- Log structured key-value context with each message
- Avoid logging secrets, tokens, or customer PII
- Use stable event names to improve searchability

## Logger Utility

Use `src/utils/logger/logger.ts`:

- `logger.info(event, message, context)`
- `logger.warn(event, message, context)`
- `logger.error(event, message, error, context)`

The logger uses Pino in both browser and server code and emits structured logs.
production output is structured JSON that can later be collected by any monitoring platform.

Errors retain their stack trace, which provides source file and line information when source maps
are available.

Next.js instrumentation captures unhandled browser and server errors. The HTTP interceptor records
the endpoint, method, status, duration, and network failures.

## Suggested Event Taxonomy

- `request.*` for API/route lifecycle events
- `feature.*` for user workflow milestones
- `integration.*` for external service operations
- `security.*` for access-control and auth signals
