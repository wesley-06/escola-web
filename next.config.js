/** @type {import('next').NextConfig} */
const apiURL = process.env.NEXT_PUBLIC_API_URL

const nextConfig = {
    async rewrites () {
        return [
            {
                source: '/api/:path*',
                destination: `${apiURL}/:path*`
            }
        ]
    }
}

module.exports = nextConfig
