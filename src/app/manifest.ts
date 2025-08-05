import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'QRickit - QR Code Generator',
    short_name: 'QRickit',
    description: 'Create professional QR codes instantly',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#9F50C7',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
