# Molecules

Molecules combine atoms into a focused, reusable interaction, such as a form field or search bar.

## How to use

A molecule may manage local interaction state, but it should receive business data and actions
through props. Keep it independent of routes and feature-specific API calls.

Use atoms for its primitive controls. Move a larger composition into the relevant domain folder,
such as `components/shop/` or `components/layout/`, when it represents a substantial interface
section.
