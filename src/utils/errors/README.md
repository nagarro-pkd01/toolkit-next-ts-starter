# Error Utilities

This folder standardizes application errors, error-boundary integration, and centralized handling.

## Contents

- `app-error.ts` defines errors with a stable code, status, and context.
- `error-handler.ts` normalizes and logs caught failures.
- `error-boundary.ts` provides reusable React boundary behavior.

## How to use

Throw `AppError` when callers need a stable machine-readable code or HTTP status. Pass caught
unknown values to the error handler and preserve the original error for stack traces.

Show safe, actionable messages to users. Keep stacks, internal endpoints, and implementation detail
in logs rather than API responses or UI messages.
