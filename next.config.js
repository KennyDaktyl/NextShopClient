/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "**",
			},
		],
	},
	reactStrictMode: true,
	// experimental: {
	// 	appDir: true,
	// },
	env: {
		API_URL: process.env.API_URL,
	},
};

module.exports = nextConfig;
