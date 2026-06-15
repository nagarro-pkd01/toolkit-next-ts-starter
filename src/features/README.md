# Views

Page-level screens live here. Views assemble templates, domain components, feature hooks, and
services into complete route interfaces.

## How to use

Create one feature folder per screen or closely related screen group. Route files in `src/app/`
should import and render these views while retaining route metadata and framework-specific caching
configuration.

Views may coordinate page behavior, but reusable interface pieces should move into
`src/components/`, and API or business operations should move into `src/services/`.

This folder is named `views` because Next.js reserves `src/pages/` for the optional Pages Router.
