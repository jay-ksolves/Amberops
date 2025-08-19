/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh',
        port: '',
        pathname: '/**',
      },
    ],
  },
  transpilePackages: ['@amberops/ui', '@amberops/api', '@amberops/design-tokens', '@amberops/lib'],
  async rewrites() {
    return [
      {
        source: '/api/v1/app/:path*',
        destination: 'http://localhost:3004/api/v1/app/:path*',
      },
    ]
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1',
    NEXT_PUBLIC_HOME_URL: process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3001',
    NEXT_PUBLIC_ADMIN_URL: process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3003',
    NEXT_PUBLIC_COOKIE_DOMAIN: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || 'localhost',
    NEXT_PUBLIC_LOGGING_ENABLED: process.env.NEXT_PUBLIC_LOGGING_ENABLED || 'true',
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
   webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'async_hooks': false,
        'child_process': false,
        'dns': false,
        'fs': false,
        'net': false,
        'tls': false,
      };
    }
    // These modules are imported by genkit, but are not used in the browser.
    config.externals.push('dgram', 'os', 'path', 'stream/web');
    // These are optional peer dependencies of genkit that we are not using.
    config.externals.push('@genkit-ai/firebase', '@opentelemetry/exporter-jaeger');

    return config;
  },
};

module.exports = nextConfig;
