/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			"127.0.0.1",
			"localhost:3000",
			"static-ourstore.hyperfunctor.com",
			"images.unsplash.com",
		],
	},
	reactStrictMode: true,
	experimental: {
		appDir: true,
	},
	env: {
		API_URL: process.env.API_URL,
	},
};

module.exports = nextConfig;
