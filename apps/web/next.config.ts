
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
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
  env: {
    NEXT_PUBLIC_HOME_URL: process.env.NEXT_PUBLIC_HOME_URL,
    NEXT_PUBLIC_ADMIN_URL: process.env.NEXT_PUBLIC_ADMIN_URL,
    NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_AUTH_API_URL: process.env.NEXT_PUBLIC_AUTH_API_URL,
    NEXT_PUBLIC_COOKIE_DOMAIN: process.env.COOKIE_DOMAIN, // Use the non-prefixed version from .env
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

export default nextConfig;
