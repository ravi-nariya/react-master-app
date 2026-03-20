import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

const securityHeaders = {
  // Enforce anti-framing via HTTP header (not supported in CSP meta)
  'Content-Security-Policy': "frame-ancestors 'none'",
  // Prevent clickjacking
  'X-Frame-Options': 'DENY',
  // Prevent MIME-type sniffing
  'X-Content-Type-Options': 'nosniff',
  // Enable XSS filter in older browsers
  'X-XSS-Protection': '1; mode=block',
  // Control referrer information
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  // Restrict browser features
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  // Force HTTPS in production (HSTS)
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/view/components'),
      '@blocks': path.resolve(__dirname, './src/view/blocks'),
      '@layouts': path.resolve(__dirname, './src/view/layouts'),
      '@pages': path.resolve(__dirname, './src/view/pages'),
      '@view': path.resolve(__dirname, './src/view'),
    },
  },
  server: {
    headers: securityHeaders,
  },
  preview: {
    headers: securityHeaders,
  },
})
