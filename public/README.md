# Public Files

Files in this folder are copied unchanged and served from the website root.

## How to use

A file at `public/images/logo.svg` is available as `/images/logo.svg`. Use this folder for assets
that require a stable public URL, such as favicons, robots files, downloadable files, or social
sharing images.

Use `src/assets/` when an asset should be imported by TypeScript and processed by the build. Do not
place secrets or source-only files here because every public file can be requested by users.
