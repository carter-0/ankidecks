/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ui-avatars.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'https://tailwindui.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'https://images.unsplash.com',
                pathname: '/**',
            }
        ]
    }
}

module.exports = nextConfig
