const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0078d4"/>
      <stop offset="100%" style="stop-color:#106ebe"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="102" fill="url(#bg)"/>
  <circle cx="256" cy="179" r="92" fill="white"/>
  <path d="M256 282 C128 282, 77 384, 77 461 L435 461 C435 384, 384 282, 256 282" fill="white"/>
  <circle cx="384" cy="128" r="41" fill="#fbbf24"/>
  <path d="M384 87 L384 67 M384 169 L384 189 M343 128 L323 128 M425 128 L445 128 M355 99 L340 84 M413 157 L428 172 M355 157 L340 172 M413 99 L428 84" stroke="#fbbf24" stroke-width="10" stroke-linecap="round"/>
</svg>`;

async function generateIcons() {
  const publicDir = path.join(__dirname, '..', 'public');
  
  // Generate 192x192
  await sharp(Buffer.from(svgContent))
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));
  console.log('Created pwa-192x192.png');

  // Generate 512x512
  await sharp(Buffer.from(svgContent))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));
  console.log('Created pwa-512x512.png');

  // Generate apple-touch-icon (180x180)
  await sharp(Buffer.from(svgContent))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Created apple-touch-icon.png');

  console.log('All icons generated successfully!');
}

generateIcons().catch(console.error);
