# Logger

This folder implements the application's structured logging facade with Pino.

## Contents

- `logger.ts` exposes the application-facing `info`, `warn`, and `error` methods.
- `transports.ts` configures Pino and writes structured payloads.

## How to use

Import `logger` from `@/utils/logger` and provide a stable event name, readable message, and safe
structured context. Pass the original error to `logger.error` so its name, message, and stack are
preserved.

Never include passwords, tokens, cookies, authorization headers, or personal data. See
`docs/LOGGING.md` for event conventions and examples.
