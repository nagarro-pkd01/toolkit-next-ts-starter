# Logging Guidelines

## Principles

- Log structured key-value context with each message
- Avoid logging secrets, tokens, or customer PII
- Use stable event names to improve searchability

## Logger Utility

Use `src/lib/logger.ts`:

- `logger.info(message, context)`
- `logger.warn(message, context)`
- `logger.error(message, context)`

## Suggested Event Taxonomy

- `request.*` for API/route lifecycle events
- `feature.*` for user workflow milestones
- `integration.*` for external service operations
- `security.*` for access-control and auth signals
