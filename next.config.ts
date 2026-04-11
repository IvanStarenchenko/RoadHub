/** @type {import('next').NextConfig} */
const nextConfig = {
	basePath: '/roadmaps',
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
