import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'QRickit - Free QR Code Generator',
    short_name: 'QRickit',
    description: 'Create professional QR codes instantly for URLs, Wi-Fi, contacts, phone numbers, and text. AI-powered design tools included.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f0f23',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/apple-icon.svg',
        sizes: '180x180',
        type: 'image/svg+xml',
      },
      {
        src: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
    ],
  }
}
