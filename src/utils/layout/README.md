# Layout Utilities

This folder contains helper logic used to resolve layout behavior.

## How to use

`get-client-key.ts` reads the optional client identifier used by the multi-client layout example.
Use its result with the layout configuration in `src/constants/layoutConfig.ts`.

Keep parsing and resolution helpers here. Visual layout components belong in
`src/components/templates/`, while route layouts belong in `src/app/`.
