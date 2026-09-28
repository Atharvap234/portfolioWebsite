/** @type {import('next').NextConfig} */

// 'unsafe-eval' and ws: are needed only by next dev (HMR); production stays strict.
// 'unsafe-inline' is required by Next.js App Router hydration scripts and inline styles.
const isDev = process.env.NODE_ENV === 'development'

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self'${isDev ? ' ws:' : ''}`,
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join('; ')

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
}

module.exports = nextConfig
