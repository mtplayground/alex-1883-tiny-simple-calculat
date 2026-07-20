# Self-Hosted Static Deployment

This app builds to static files only. It does not require a Node.js server,
runtime environment variables, a database, containers, or CI/CD to serve the
production bundle.

## Build

```bash
npm ci
npm run check
npm run build
```

The production artifact is the `dist/` directory:

- `dist/index.html`
- `dist/assets/*`

## Local Verification

After building, verify the exact production output with:

```bash
npm run serve:dist
```

The preview server listens on `0.0.0.0:8080`.

## Bare Static Serving

Serve the contents of `dist/` from the web root. Because this is a client-side
SPA, unknown paths should fall back to `index.html`.

Example Caddy setup:

```caddyfile
:8080 {
	root * /absolute/path/to/dist
	try_files {path} /index.html
	file_server
}
```

Example nginx location:

```nginx
location / {
	root /absolute/path/to/dist;
	try_files $uri $uri/ /index.html;
}
```

Cache `dist/assets/*` aggressively because Vite emits hashed filenames. Keep
`dist/index.html` on a short cache lifetime so new asset references are picked
up quickly after a deploy.
