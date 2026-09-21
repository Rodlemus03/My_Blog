import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const devCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "connect-src 'self' ws://localhost:5173 ws://127.0.0.1:5173 http://localhost:3000 http://127.0.0.1:3000",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
].join('; ')

const prodCsp = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data:",
  "connect-src 'self' http://localhost:3000 http://127.0.0.1:3000",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
].join('; ')

export default defineConfig({
  plugins: [react()],
  server: {
    cors: false,
    headers: {
      'Content-Security-Policy': devCsp,
      'X-Content-Type-Options': 'nosniff',
    },
  },
  preview: {
    cors: false,
    headers: {
      'Content-Security-Policy': prodCsp,
      'X-Content-Type-Options': 'nosniff',
    },
  },
})