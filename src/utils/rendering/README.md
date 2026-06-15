# Rendering Utilities

This folder contains small helpers used by the rendering-strategy demonstrations.

## How to use

`delay.ts` intentionally delays asynchronous work so streaming and loading behavior can be seen.
Use it only in examples, tests, or controlled simulations.

Production latency, retries, and timeout behavior belong in the HTTP or service layer rather than
being simulated here.
