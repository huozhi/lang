# Website verification

The website lives in `web/` and is built with Devjar. Do not run a TypeScript
type check for the website. Verify website changes with `bun run web:dev` when
interactive validation is needed and `bun run web:build` for production output.
