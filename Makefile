BUNDLE_ARGS=-c tsconfig.json --unstable src/app.ts bundle.js

bundle:
	deno bundle $(BUNDLE_ARGS)

dev:
	deno bundle --watch $(BUNDLE_ARGS)