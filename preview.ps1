# Build the Astro site to dist/
Write-Host "Building site..."
npm run build
if ($LASTEXITCODE -ne 0) { throw "build failed with exit code $LASTEXITCODE" }

# Start local Cloudflare Pages preview server
Write-Host "Starting local preview server..."
npx wrangler pages dev dist
