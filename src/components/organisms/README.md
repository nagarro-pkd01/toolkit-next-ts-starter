# Organisms

Organisms are substantial, reusable sections of an interface, such as navigation, product cards,
lists, summaries, or performance panels.

## How to use

Organisms may compose atoms and molecules and may use shared hooks when needed. Prefer receiving
feature data through props so the component remains testable and reusable.

Application-wide React providers do not belong here; place them in `src/providers/`. Route-specific
page composition belongs in `src/views/`.
