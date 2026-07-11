# Type-check before building
Write-Host "Type-checking..."
npm run check
if ($LASTEXITCODE -ne 0) { throw "check failed with exit code $LASTEXITCODE" }

# Run unit tests before building
Write-Host "Running unit tests..."
npm run test:unit
if ($LASTEXITCODE -ne 0) { throw "unit tests failed with exit code $LASTEXITCODE" }

# Build the Astro site to dist/
Write-Host "Building site..."
npm run build
if ($LASTEXITCODE -ne 0) { throw "build failed with exit code $LASTEXITCODE" }

# Deploy to Cloudflare Pages
Write-Host "Deploying to Cloudflare Pages..."
npx wrangler pages deploy dist --branch main
