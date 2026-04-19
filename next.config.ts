/** @type {import('next').NextConfig} */
const nextConfig = {
	basePath: '/roadmaps',
	output: 'standalone',
	images: {
		unoptimized: true,

		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'encrypted-tbn0.gstatic.com',
			},
		],
	},
}

export default nextConfig
