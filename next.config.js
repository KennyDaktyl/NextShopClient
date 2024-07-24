/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "new-serwiswrybnej-api.resto-app.pl",
				pathname: "/media/thumbnails/**",
			},
			{
				protocol: "http",
				hostname: "127.0.0.1",
				port: "8000",
				pathname: "/media/thumbnails/**",
			},
		],
	},
	reactStrictMode: true,
	// experimental: {
	//  appDir: true,
	// },
	env: {
		API_URL: process.env.API_URL,
	},
};

module.exports = nextConfig;
