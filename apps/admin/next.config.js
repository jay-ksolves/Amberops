/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    transpilePackages: ['@amberops/ui', '@amberops/api', '@amberops/design-tokens', '@amberops/lib'],
    webpack: (config) => {
        config.resolve.alias['@'] = path.resolve(__dirname, 'src')
        return config
    },
     async rewrites() {
        return [
            {
                source: '/api/v1/app/:path*',
                destination: 'http://localhost:3004/api/v1/app/:path*',
            },
            {
                source: '/api/v1/public/:path*',
                destination: 'http://localhost:3004/api/v1/public/:path*',
            },
        ]
    },
    env: {
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1',
        NEXT_PUBLIC_HOME_URL: process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3001',
        NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000',
        NEXT_PUBLIC_COOKIE_DOMAIN: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || 'localhost',
        NEXT_PUBLIC_LOGGING_ENABLED: process.env.NEXT_PUBLIC_LOGGING_ENABLED || 'true',
    },
};

module.exports = nextConfig;
