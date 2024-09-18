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
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "Content-Security-Policy",
						value: `
				  default-src 'self'; 
				  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://geowidget.inpost.pl; 
				  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://geowidget.inpost.pl; 
				  img-src 'self' data: https://geowidget.inpost.pl; 
				  font-src 'self' https://fonts.gstatic.com; 
				  connect-src 'self' https://serwiswrybnej.pl https://serwiswrybnej.pl https://new-serwiswrybnej-api.resto-app.pl http://127.0.0.1:8000 https://geowidget.inpost.pl; 
				  frame-src 'self' https://geowidget.inpost.pl https://geowidget-app.inpost.pl;
				`
							.replace(/\s{2,}/g, " ")
							.trim(),
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
