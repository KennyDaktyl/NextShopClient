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
							script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://geowidget.inpost.pl https://www.google.com https://www.gstatic.com/recaptcha/ https://www.googletagmanager.com; 
							style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://geowidget.inpost.pl; 
							img-src 'self' data: https://geowidget.inpost.pl; 
							font-src 'self' https://fonts.gstatic.com; 
							connect-src 'self' https://serwiswrybnej.pl https://new-serwiswrybnej-api.resto-app.pl http://127.0.0.1:8000 https://geowidget.inpost.pl https://region1.google-analytics.com https://www.google-analytics.com; 
							frame-src 'self' https://geowidget.inpost.pl https://geowidget-app.inpost.pl https://www.google.com https://www.google.com/maps/embed;
							`
							.replace(/\s{2,}/g, " ")
							.trim(),
					},
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
				],
			},
		];
	},

	async redirects() {
		return [
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-energetyczny-lob/1534",
				destination: "/produkt/klucz-energetyczny-lob-id-597",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-skrzynek-energetycznych/1528",
				destination: "/produkt/klucz-do-skrzynek-energetycznych-id-596",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-delta/1519",
				destination: "/produkt/klucz-mieszkaniowy-delta-id-405",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-skrzynki-ls-13/1655",
				destination: "/produkt/klucz-do-skrzynki-ls-13-id-361",
				permanent: true,
			},
			{
				source: "/produkty/klucze-numeryczne/klucze-numeryczne-lob/1475",
				destination: "/produkty/klucze/klucze-mieszkaniowe/klucze-numerowane",
				permanent: true,
			},
			{
				source: "/produkty/kategoria/pieczatki/(.*)",
				destination: "/produkty/pieczatki-firmowe-imienne-i-personalizowane-szeroki-wybor",
				permanent: true,
			},
			{
				source: "/dorabianie-kluczy-mieszkaniowych-i-samochodowych-w-okolicy-(.*)",
				destination: "/wysylka-i-uslugi-na-miejscu-w-rybnej",
				permanent: true,
			},
			{
				source: "/wyrob-pieczatek-online-w-(.*)",
				destination: "/wysylka-i-uslugi-na-miejscu-w-rybnej",
				permanent: true,
			},
			{
				source: "/klucze-mieszkaniowe/klucz-mieszkaniowy-(.*)",
				destination: "/produkty/klucze/klucze-mieszkaniowe",
				permanent: true,
			},
			{
				source: "/produkty/kategoria/dorabianie-kluczy/(.*)",
				destination: "/uslugi/dorabianie-kluczy-mieszkaniowych",
				permanent: true,
			},
			{
				source: "/serwis-gsm/(.*)",
				destination: "/uslugi/naprawy-telefonow",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/(.*)",
				destination: "/uslugi/naprawy-telefonow",
				permanent: true,
			},
			{
				source: "/blog/dorabianie-kluczy/czas-wymienic-obudowe-klucza-w-twoim-samochodzie/1",
				destination:
					"/blog/wymiana-obudowy-pilota-samochodowego-profesjonalna-usluga-w-okolicach-czernichowa-liszek-alwerni-i-krzeszowic-id-3",
				permanent: true,
			},
			{
				source: "/blog/telefony/jakie-usugi-napraw-telefonow-sa-w-ofercie/3",
				destination:
					"/blog/naprawa-telefonow-komorkowych-w-rybnej-i-okolicach-wymiana-wyswietlaczy-naprawa-zlaczy-ladowania-i-wiecej-id-5",
				permanent: true,
			},
			{
				source: "/blog/pieczatki/jak-zaprojektowac-pieczatke-firmowa/2",
				destination: "/blog/jak-zaprojektowac-pieczatke-firmowa-kompletny-przewodnik-id-2",
				permanent: true,
			},
			{
				source: "/ekspresowe-dorabianie-kluczy-lista-miast-w-okolicy-rybnej",
				destination: "/wysylka-i-uslugi-na-miejscu-w-rybnej",
				permanent: true,
			},
			{
				source: "/wyrob-pieczatek-wysylka-lista-miast",
				destination: "/wysylka-i-uslugi-na-miejscu-w-rybnej",
				permanent: true,
			},
		];
	},
	poweredByHeader: false,
};

module.exports = nextConfig;
