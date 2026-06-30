# Build the Astro site to dist/
Write-Host "Building site..."
npm run build
if ($LASTEXITCODE -ne 0) { throw "build failed with exit code $LASTEXITCODE" }

# Deploy to Cloudflare Pages
Write-Host "Deploying to Cloudflare Pages..."
npx wrangler pages deploy dist --branch main
