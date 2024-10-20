/** @type {import('next').NextConfig} */

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "api.serwiswrybnej.pl",
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
							connect-src 'self' https://serwiswrybnej.pl https://api.serwiswrybnej.pl http://127.0.0.1:8000 https://geowidget.inpost.pl https://region1.google-analytics.com https://www.google-analytics.com; 
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
				source: "/dorabianie-kluczy-mieszkaniowych",
				destination: "/uslugi/dorabianie-kluczy-mieszkaniowych",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/21d-samsung-m31s/981",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/5d-huawei-p-smart-pro/982",
				destination: "/410",
				permanent: true,
			},
			{ source: "/produkty/akcesoria-gsm/5d-huawei-p20/983", destination: "/410", permanent: true },
			{
				source: "/produkty/akcesoria-gsm/5d-huawei-p20-lite/984",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/5d-huawei-p30-pro/985",
				destination: "/410",
				permanent: true,
			},
			{ source: "/produkty/akcesoria-gsm/5d-huawei-p40/986", destination: "/410", permanent: true },
			{
				source: "/produkty/akcesoria-gsm/5d-huawei-p40-lite/987",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/5d-huawei-p40-lite-e/988",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/5d-huawei-p40-x-one/989",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/5d-huawei-y7-2018/990",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/5d-iphone-6-plus-6s-plus/991",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/5d-iphone-6s-plus/992",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/5d-iphone-78-plus/993",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/5d-iphone-xs-max-11-pro-max/994",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/5d-iphone-xs-max-11-pro-max-monkey/995",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/5d-samsung-a51/996",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/5d-samsung-a6-2018/997",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/5d-samsung-a70/998",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/5d-samsung-note-10-plus/999",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/5d-samsung-s10/1000",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/5d-samsung-s10-lite/1001",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/5d-samsung-s10-plus/1002",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/5d-samsung-s8-plus/1003",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/5d-szko-samsung-a21-a21s/1004",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/5d-szko-xiaomi-mi-11-lite-4g5g/1005",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/5d-xiaomi-mi-10-lite/1006",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/5d-xiaomi-mi-10t-5g-mi-10t-pro-5g/1007",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/5d-xiaomi-mi-8t/1008",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/5d-xiaomi-mi-9t/1009",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/5d-xiaomi-mi-a3/1010",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/5d-xiaomi-redmi-7a/1011",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/5d-xiaomi-redmi-note-10-10s/1012",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/adapter-hfaudio-type-c-jack-35mm/1013",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/adapter-hoco-do-kart-pamieci/1014",
				destination: "/410",
				permanent: true,
			},
			{ source: "/produkty/akcesoria-gsm/adapter-sim/1015", destination: "/410", permanent: true },
			{
				source: "/produkty/akcesoria-gsm/adapter-wireless-charger-for-micro-usb/1016",
				destination: "/410",
				permanent: true,
			},
			{ source: "/produkty/akcesoria-gsm/aux-35-to-35/1017", destination: "/410", permanent: true },
			{
				source: "/produkty/klucze-mieszkaniowe/abus-d45/1809",
				destination: "/produkt/abus-d45-id-560",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/baseus-aux-35-to-35-15m/1018",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/baseus-transmiter-car-charger-t-typed-s-09a/1019",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/bateria-alkaliczna-varta-r3-aaa/1020",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/bateria-alkaliczna-varta-r6-aa/1021",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/bateria-iphone-5g/1022",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/bateria-iphone-5s/1023",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/bateria-iphone-6-plus/1024",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/bateria-iphone-6s/1025",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/bateria-iphone-7-plus/1026",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/bateria-iphone-8-plus/1027",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/bateria-iphone-se/1028",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/bateria-nokia-5220xm/1029",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/bateria-nokia-lumia-435532/1030",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/bateria-nokia-lumia-520/1031",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/bateria-nokia-lumia-620/1032",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/bateria-nokia-lumia-650/1033",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/bateria-nokia-lumia-730/1034",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/bateria-oryg-nokia-bl4u/1035",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/bateria-oryg-nokia-bl5c/1036",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/bateria-samsung-a5-2016/1037",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/bateria-samsung-b2710/1038",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/bateria-samsung-g530grand-prime/1039",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/bateria-samsung-j5-2016/1040",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/bateria-samsung-j5-2017/1041",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/bateria-samsung-s6/1042",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/bateria-samsung-s7-edge/1043",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/bezprzewodowa-lampka-led-biurko/1466",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/baseus-adapter-audio-type-c-35mm/1465",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/bateria-samsung-a41/1471",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/bateria-samsung-a70/1472",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/bateria-varta-cr2025/1467",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/tabliczki-informacyjne/bloczek-do-szatni/4",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/pieczatki-okrage-kwadratowe-inne/datownik-mini-dater-s126/1807",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/pieczatki-z-logiem/dodanie-grafiki-do-projektu/1792",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/systemy-www-dla-biznesu/dysk-twardy-2tb-wd21purx/1776",
				destination: "/410",
				permanent: true,
			},
			{
				source:
					"/produkty/akcesoria-gsm/folia-flexible-glass-iphone-xsmax11-pro-max12-pro-max/1044",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/folia-flexible-glass-samsaung-note-10/1045",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/folia-flexible-glass-xiaomi-mi-note-10-lite/1046",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/folia-huawei-mate-20-pro/1047",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/folia-huawei-p20/1048",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/folia-huawei-p30/1049",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/folia-huawei-p40-pro/1050",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/folia-iphone-13-mimi/1051",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/folia-iphone-6-plus-6s-plus/1052",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/folia-iphone-78-plus/1053",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/folia-opaska-xiaomi-miband-4/1054",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/folia-opaska-xiaomi-miband-5/1055",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/folia-opaska-xiaomi-miband-6/1056",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/folia-samsung-a32/1057",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/folia-samsung-a9-2018/1058",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/folia-samsung-note-9/1059",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/folia-samsung-s10/1060",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/folia-samsung-s10e/1061",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/folia-samsung-s20-plus/1062",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/folia-samsung-s20-ultra/1063",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/folia-samsung-s21/1064",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/folia-samsung-s21-plus/1065",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/folia-samsung-s21-ultra/1066",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/folia-samsung-s7-edge-monkey/1067",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/folia-samsung-s8-plus/1068",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/folia-samsung-s9/1069",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/folia-samsung-xcover-4/1070",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/folia-xiaomi-mi-10-pro/1071",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/folia-hydrozelowa-mat-do-11/7",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/folia-hydrozelowa-pro-kazdy-model-do-11/6",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/gumki-do-sluchawek/1073",
				destination: "/410",
				permanent: true,
			},
			{
				source:
					"/produkty/tabliczki-informacyjne/grawer-na-przeglad-piesni-i-przyspiewki-ludowej/9",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/pieczatki-firmowe/gumka-do-pieczatki-47x18mm/1486",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/gosnik-remax-bezprzewodowy/1072",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/hf-baseus-encok/1074",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/hf-bluetooth-jabra-talk-5/1075",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/hf-hoco-do-iphone-m1-pro/1076",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/hf-metal-box-jack/1077",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/hf-oppo-mh135-3-usb-c/1078",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/hf-remax-candy-505/1079",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/hf-remax-rb-t33/1080",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/hf-remax-tws-16/1081",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/hf-typ-c-hr-me25/1082",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/hf-typ-c-jh-081/1083",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/hoco-adapter-typ-c-to-usb-a/1084",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/hoco-suchawki-bluetooth-es57/1085",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/indukcja-baseus-wireless-charger-5w-10w/1086",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-huawei-mate-40-pro/1087",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-huawei-p-smart-2021/1088",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-huawei-p-smart-proplus-2019/1089",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-huawei-p-smart-z/1090",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-huawei-p20-lite/1091",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-huawei-p20-pro/1092",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-huawei-p30/1093",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-huawei-p30-lite/1094",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-huawei-p40/1095",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-huawei-p40-lite/1096",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-huawei-p40-lite-e/1097",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-huawei-p40-pro/1098",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-huawei-y5-2018/1099",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-huawei-y5-2019/1100",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-huawei-y5p/1101",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-huawei-y6-2018/1102",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-huawei-y6-2019/1103",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-huawei-y6p/1104",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-huawei-y7-2019/1105",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-iphone-11/1106",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-iphone-11-pro/1107",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-iphone-11-pro-max/1108",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-iphone-12-mini/1109",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-iphone-12-12-pro/1110",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-iphone-55sse/1111",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-iphone-66s/1112",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-iphone-66s-plus/1113",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-iphone-782020se/1114",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-iphone-7plus-8plus/1115",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-iphone-xxs/1116",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-iphone-xr/1117",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-iphone-xs-max/1118",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-note-20-ultra/1119",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-oppo-a15/1120",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-oppo-a52a72/1121",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-oppo-a54/1122",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-oppo-reno4/1123",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-org-samsung-s10-plus/1124",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-oryg-huawei-p40/1125",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-oryg-huawei-y6-2019/1126",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-p-smart-2019/1127",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-realme-8/1128",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-a02s/1129",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-a03s/1130",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-a10/1131",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-a20e/1132",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-a20s/1133",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-a21/1134",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-a21s/1135",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-a22-4g/1136",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-a22-5g/1137",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-a30/1138",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-a31/1139",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-a32-5g/1140",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-a40/1141",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-a41/1142",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-a42-5g/1143",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-a51/1144",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-a70/1145",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-a71/1146",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-j3-2017/1147",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-j5-2017/1148",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-j6-2018/1149",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-j7-2017/1150",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-m11-a11/1151",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-m31/1152",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-m31s/1153",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-m51/1154",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-note-10/1155",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-note-10-plus/1156",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-s10/1157",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-s10-lite/1158",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-s10-plus/1159",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-s10e/1160",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-s20/1161",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-s20-plus/1162",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-s20-ultra/1163",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-s20fe-s20fe-5g/1164",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-s21-plus/1165",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-s9/1166",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-s9-plus/1167",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-samsung-xcover-pro/1168",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-ciel-by-cyrill-iphone-11-pro-max/1169",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-huawei-mate-10-lite/1170",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-huawei-mate-20-lite/1171",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-huawei-p-smart-z/1172",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-huawei-p30-lite/1173",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-huawei-p30-pro/1174",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-huawei-p40-lite-e/1175",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-huawei-y5-2018/1176",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-huawei-y5-2019/1177",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-huawei-y7-2019/1178",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-iphone-11-pro/1179",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-iphone-11-pro-max/1180",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-iphone-12-mini/1181",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-iphone-12-pro/1182",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-iphone-12-pro-max/1183",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-iphone-13-mini/1184",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-iphone-13-pro-max/1185",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-iphone-66s/1186",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-iphone-782020se/1187",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-iphone-xxs/1188",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-iphone-xr/1189",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-iphone-xs-max/1190",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-samsung-a02s/1191",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-samsung-a10/1192",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-samsung-a20e/1193",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-samsung-a32/1194",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-samsung-a32-5g/1195",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-samsung-a40/1196",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-samsung-a41/1197",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-samsung-a50/1198",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-samsung-a51/1199",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-samsung-a52/1200",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-samsung-a70/1201",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-samsung-a72/1202",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-samsung-m21/1203",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-samsung-m31/1204",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-samsung-m31s/1205",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-samsung-m51/1206",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-samsung-note-10-plus/1207",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-samsung-s10-plus/1208",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-samsung-s10e/1209",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-samsung-s20/1210",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-samsung-s20-plus/1211",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-samsung-s20fe/1212",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-samsung-s21-plus/1213",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-samsung-s21-ultra/1214",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-samsung-s9/1215",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-xiaomi-redmi-7/1216",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-xiaomi-redmi-8a/1217",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-xiaomi-redmi-9/1218",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-xiaomi-redmi-9c/1219",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-xiaomi-redmi-note-10-5g/1220",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-xiaomi-redmi-note-10-pro/1221",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-xiaomi-redmi-note-10-10s/1222",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-xiaomi-redmi-note-8/1223",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-specjal-xiaomi-redmi-note-9-pro9s/1224",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-xiaomi-mi-note-10/1225",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-xiaomi-mi-note-10-lite/1226",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-xiaomi-mi11-lite-5g/1227",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-xiaomi-mi9-t/1228",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-xiaomi-redmi-5-plus/1229",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-xiaomi-redmi-7a/1230",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-xiaomi-redmi-8/1231",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-xiaomi-redmi-8a/1232",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-xiaomi-redmi-note-10/1233",
				destination: "/410",
				permanent: true,
			},
			{
				source:
					"/produkty/akcesoria-gsm/jelly-xiaomi-redmi-note-10-5g-poco-m3-pro-poco-m3-pro-5g/1234",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-xiaomi-redmi-note-10-pro/1235",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-xiaomi-redmi-note-10-10s/1236",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-xiaomi-redmi-note-7/1237",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-xiaomi-redmi-note-8/1238",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-xiaomi-redmi-note-9-pro9s/1239",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/jelly-xiaomi-redmi-note-9t-5g/1240",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabel-otg-type-c/1242",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabel-otg-t_0010289p1000/1241",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-huawei-p-smart-2021/1243",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-huawei-p30/1244",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-huawei-p30-lite/1245",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-huawei-p30-pro/1246",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-huawei-p40/1247",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-huawei-p40-lite-5g/1248",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-huawei-p40-pro/1249",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-huawei-p40lite/1250",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-huawei-p40lite-e/1251",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-huawei-y6p/1252",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-iphone-11/1253",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-iphone-12-mini/1254",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-iphone-12-pro-max/1255",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-iphone-13-pro/1256",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-iphone-13-pro-max/1257",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-iphone-782020se/1258",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-iphone-xr/1259",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-iphone-xs-max/1260",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-oppo-a31/1261",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-org-huawei-p20/1262",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-org-huawei-p30/1263",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-org-huawei-p40/1264",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-org-samsung-a40/1265",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-org-samsung-s8-plus/1266",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-a02s/1267",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-a10/1268",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-a20s/1269",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-a21/1270",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-a22-4g/1271",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-a30/1272",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-a31/1273",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-a40/1274",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-a51/1275",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-a70/1276",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-a71/1277",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-j5-2017/1278",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-j500/1279",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-j7-2017/1280",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-m11/1281",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-m21/1282",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-m31/1283",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-m31s/1284",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-note-10/1285",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-note-10-lite/1286",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-note-10-plus/1287",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-s10/1288",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-s10-lite/1289",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-s20/1290",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-s20-plus/1291",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-s20fe-s20fe-5g/1292",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-s7-edge/1293",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-s9-plus/1294",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-xcover-3/1295",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-xcover-4/1296",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-samsung-xcover-5/1297",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-huawei-p30/1298",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-huawei-p30-pro/1299",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-huawei-p40-lite-e/1300",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-huawei-y5p/1301",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-huawei-y6p/1302",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-iphone-11-pro/1303",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-iphone-11-pro-max/1304",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-iphone-13/1305",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-iphone-13-pro-max/1306",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-iphone-xr/1307",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-iphone-xs-max/1308",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-motorola-g9-play-e7-plus/1309",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-p40-lite/1310",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-p40-pro/1311",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-samsung-a10/1312",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-samsung-a20e/1313",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-samsung-a22-5g/1314",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-samsung-a30/1315",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-samsung-a32/1316",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-samsung-a32-5g/1317",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-samsung-a40/1318",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-samsung-a52/1319",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-samsung-a6-plus-2018/1320",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-samsung-j3-2017/1321",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-samsung-m21/1322",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-samsung-m51/1323",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-samsung-s10/1324",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-samsung-s10-lite/1325",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-samsung-s10-plus/1326",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-samsung-s10e/1327",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-samsung-s20-plus/1328",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-samsung-s20-ultra/1329",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-samsung-s21/1330",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-samsung-s21-plus/1331",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-samsung-s9-plus/1332",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-xiaomi-mi-10t-5g-mi-10t-pro-5g/1333",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-xiaomi-redmi-8/1334",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-xiaomi-redmi-8a/1335",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-xiaomi-redmi-note-10/1336",
				destination: "/410",
				permanent: true,
			},
			{
				source:
					"/produkty/akcesoria-gsm/kabura-specjal-xiaomi-redmi-note-10-5g-poco-m3-pro-poco-m3-pro-5g/1337",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-xiaomi-redmi-note-8/1338",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-xiaomi-redmi-note-8-pro/1339",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-specjal-xiaomi-redmi-note-9t-5g/1340",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-uniwersalna/1341",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-uniwersalna-na-pasek/1342",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-uniwersalna-sport/1343",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-uniwersalna-wsuwka/1344",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-xiaomi-mi-note-10/1345",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-xiaomi-mi-note-10-lite/1346",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-xiaomi-mi9-lite/1347",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-xiaomi-mi9-t/1348",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-xiaomi-redmi-7/1349",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-xiaomi-redmi-8/1350",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-xiaomi-redmi-8a/1351",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-xiaomi-redmi-9c/1352",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-xiaomi-redmi-note-10-10s/1353",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-xiaomi-redmi-note-8/1354",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-xiaomi-redmi-note-8t/1355",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-xiaomi-redmi-note-9/1356",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabura-xiaomi-redmi-note-9t-5g/1357",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-skrzynek-energetycznych/1528",
				destination: "/produkt/klucz-do-skrzynek-energetycznych-id-596",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabel-micro-usb-timer/1469",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabel-micro-usb-awei-boczny-1m/1470",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/kabel-usb-typ-c-to-typ-c/1468",
				destination: "/410",
				permanent: true,
			},
			{
				source:
					"/produkty/systemy-www-dla-biznesu/kameria-ip-dh-ipc-hfw2221rp-vfs-ire6-128-2mpx/1775",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/serwis-gsm/klapka-huawei-mate-10-pro/1481",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-klodki-af-7c/1668",
				destination: "/produkt/klucz-do-klodki-af-7c-id-593",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-klodki-dwo-1/1689",
				destination: "/produkt/klucz-do-klodki-dwo-1-id-594",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-klodki-no-name-1/1690",
				destination: "/produkt/klucz-do-klodki-no-name-1-id-595",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-klodki-siso/1661",
				destination: "/produkt/klucz-do-klodki-siso-id-592",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-klodki-tai-1/1560",
				destination: "/produkt/klucz-do-klodki-tai-1-id-590",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-klodki-tl-4/1656",
				destination: "/produkt/klucz-do-klodki-tl-4-id-591",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-klodki-tl-5r/1557",
				destination: "/produkt/klucz-do-klodki-tl-5r-id-588",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-klodki-tl-7r/1555",
				destination: "/produkt/klucz-do-klodki-tl-7r-id-586",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-skrzynki-eu-11r/1640",
				destination: "/produkt/klucz-do-skrzynki-eu-11r-id-348",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-skrzynki-eu-13r/1638",
				destination: "/produkt/klucz-do-skrzynki-eu-13r-id-346",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-skrzynki-eu-18r/1637",
				destination: "/produkt/klucz-do-skrzynki-eu-18r-id-345",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-skrzynki-eu-1r/1636",
				destination: "/produkt/klucz-do-skrzynki-eu-1r-id-344",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-skrzynki-eu-3k/1635",
				destination: "/produkt/klucz-do-skrzynki-eu-3k-id-343",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-skrzynki-eu-5r/1650",
				destination: "/produkt/klucz-do-skrzynki-eu-5r-id-358",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-skrzynki-eu-9/1634",
				destination: "/produkt/klucz-do-skrzynki-eu-9-id-342",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-skrzynki-eu-den/1639",
				destination: "/produkt/klucz-do-skrzynki-eu-den-id-347",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-skrzynki-euro-lock-duzy/3",
				destination: "/produkt/klucz-do-skrzynki-euro-lock-duzy-id-339",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-skrzynki-euro-locks-typ-1/1633",
				destination: "/produkt/klucz-do-skrzynki-euro-locks-typ-1-id-341",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-skrzynki-euro-locks-typ-2/1642",
				destination: "/produkt/klucz-do-skrzynki-euro-locks-typ-2-id-350",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-skrzynki-fhk/1654",
				destination: "/produkt/klucz-do-skrzynki-fhk-id-360",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-skrzynki-fhr-r/1652",
				destination: "/produkt/klucz-do-skrzynki-fhr-r-id-359",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-skrzynki-frt-5r/1644",
				destination: "/produkt/klucz-do-skrzynki-frt-5r-id-352",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-skrzynki-lf-23r/1643",
				destination: "/produkt/klucz-do-skrzynki-lf-23r-id-351",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-skrzynki-ls-11/1645",
				destination: "/produkt/klucz-do-skrzynki-ls-11-id-353",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-skrzynki-ls-11r/1648",
				destination: "/produkt/klucz-do-skrzynki-ls-11r-id-356",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-skrzynki-ls-13/1655",
				destination: "/produkt/klucz-do-skrzynki-ls-13-id-361",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-skrzynki-mrt-1r/1649",
				destination: "/produkt/klucz-do-skrzynki-mrt-1r-id-357",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-skrzynki-sis-s/1647",
				destination: "/produkt/klucz-do-skrzynki-sis-s-id-355",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-skrzynki-sis-w/1646",
				destination: "/produkt/klucz-do-skrzynki-sis-w-id-354",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-skrzynki-siso-bialy/1632",
				destination: "/produkt/klucz-do-skrzynki-siso-bialy-id-340",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-skrzynki-siso-czarny/1641",
				destination: "/produkt/klucz-do-skrzynki-siso-czarny-id-349",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-do-skrzynki-une/1675",
				destination: "/produkt/klucz-do-skrzynki-une-id-366",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-energetyczny-lob/1534",
				destination: "/produkt/klucz-energetyczny-lob-id-597",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-10/1691",
				destination: "/produkt/klucz-mieszkaniowy-10-id-531",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-2/1530",
				destination: "/produkt/klucz-mieszkaniowy-2-id-528",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-2/1715",
				destination: "/produkt/klucz-mieszkaniowy-2-id-528",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-260/1717",
				destination: "/produkt/klucz-mieszkaniowy-260-id-548",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-82/1669",
				destination: "/produkt/klucz-mieszkaniowy-82-id-570",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ab-1/1551",
				destination: "/produkt/klucz-mieszkaniowy-ab-1-id-481",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ab-1r/1761",
				destination: "/produkt/klucz-mieszkaniowy-ab-1r-id-524",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ab-40/1565",
				destination: "/produkt/klucz-mieszkaniowy-ab-40-id-419",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ab-52/1685",
				destination: "/produkt/klucz-mieszkaniowy-ab-52-id-577",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ab-74/1564",
				destination: "/produkt/klucz-mieszkaniowy-ab-74-id-418",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-abus-ec/1518",
				destination: "/produkt/klucz-mieszkaniowy-abus-ec-id-404",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-abus-extra-classe/1516",
				destination: "/produkt/klucz-mieszkaniowy-abus-extra-classe-id-402",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-abus-typ-1/1515",
				destination: "/produkt/klucz-mieszkaniowy-abus-typ-1-id-401",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-abus-typ-2/1517",
				destination: "/produkt/klucz-mieszkaniowy-abus-typ-2-id-403",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ad-500/1795",
				destination: "/produkt/klucz-mieszkaniowy-ad-500-id-527",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-af-7a/1734",
				destination: "/produkt/klucz-mieszkaniowy-af-7a-id-502",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-af-7c/1736",
				destination: "/produkt/klucz-mieszkaniowy-af-7c-id-504",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-apecs/1507",
				destination: "/produkt/klucz-mieszkaniowy-apecs-id-393",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-apk-2r/1511",
				destination: "/produkt/klucz-mieszkaniowy-apk-2r-id-397",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ass-137/1708",
				destination: "/produkt/klucz-mieszkaniowy-ass-137-id-542",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ass-172/1702",
				destination: "/produkt/klucz-mieszkaniowy-ass-172-id-539",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-az-6/1561",
				destination: "/produkt/klucz-mieszkaniowy-az-6-id-415",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-az-6r/1569",
				destination: "/produkt/klucz-mieszkaniowy-az-6r-id-423",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-bai-1/1755",
				destination: "/produkt/klucz-mieszkaniowy-bai-1-id-520",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-bk-1x/1749",
				destination: "/produkt/klucz-mieszkaniowy-bk-1x-id-515",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-bks/1546",
				destination: "/produkt/klucz-mieszkaniowy-bks-id-476",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-baodean/1608",
				destination: "/produkt/klucz-mieszkaniowy-baodean-id-457",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-barcz-w/1559",
				destination: "/produkt/klucz-mieszkaniowy-barcz-w-id-485",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-cb-29r/1758",
				destination: "/produkt/klucz-mieszkaniowy-cb-29r-id-557",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-cb-6/1754",
				destination: "/produkt/klucz-mieszkaniowy-cb-6-id-519",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-cb-6x/1752",
				destination: "/produkt/klucz-mieszkaniowy-cb-6x-id-517",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-cb29rx/1711",
				destination: "/produkt/klucz-mieszkaniowy-cb29rx-id-543",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-cs-48/1563",
				destination: "/produkt/klucz-mieszkaniowy-cs-48-id-417",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-cs-62/1525",
				destination: "/produkt/klucz-mieszkaniowy-cs-62-id-411",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-cs-70/1524",
				destination: "/produkt/klucz-mieszkaniowy-cs-70-id-410",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-delta/1519",
				destination: "/produkt/klucz-mieszkaniowy-delta-id-405",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-dk-6/1590",
				destination: "/produkt/klucz-mieszkaniowy-dk-6-id-444",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-dlt/1586",
				destination: "/produkt/klucz-mieszkaniowy-dlt-id-440",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-dlt-1/1508",
				destination: "/produkt/klucz-mieszkaniowy-dlt-1-id-394",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-dlt-2/1570",
				destination: "/produkt/klucz-mieszkaniowy-dlt-2-id-424",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-dlt-3/1509",
				destination: "/produkt/klucz-mieszkaniowy-dlt-3-id-395",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-dm-118/1577",
				destination: "/produkt/klucz-mieszkaniowy-dm-118-id-431",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-dm-120/1578",
				destination: "/produkt/klucz-mieszkaniowy-dm-120-id-432",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-dm-14/1744",
				destination: "/produkt/klucz-mieszkaniowy-dm-14-id-511",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-dm-145/1575",
				destination: "/produkt/klucz-mieszkaniowy-dm-145-id-429",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-dm-24/1587",
				destination: "/produkt/klucz-mieszkaniowy-dm-24-id-441",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-dm-64/1589",
				destination: "/produkt/klucz-mieszkaniowy-dm-64-id-443",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-dn-2/1695",
				destination: "/produkt/klucz-mieszkaniowy-dn-2-id-489",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-dom-ix6/1526",
				destination: "/produkt/klucz-mieszkaniowy-dom-ix6-id-412",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-dugi-ab-400/1707",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-dugi-ab-406/1706",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-dugi-tur/1705",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ec-5/1593",
				destination: "/produkt/klucz-mieszkaniowy-ec-5-id-447",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-epb/1703",
				destination: "/produkt/klucz-mieszkaniowy-epb-id-540",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-eu-17/1598",
				destination: "/produkt/klucz-mieszkaniowy-eu-17-id-452",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-eu-4r/1671",
				destination: "/produkt/klucz-mieszkaniowy-eu-4r-id-571",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ev-69/1716",
				destination: "/produkt/klucz-mieszkaniowy-ev-69-id-547",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ez-6/1596",
				destination: "/produkt/klucz-mieszkaniowy-ez-6-id-450",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-fan-1/1735",
				destination: "/produkt/klucz-mieszkaniowy-fan-1-id-503",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-fan-r/1733",
				destination: "/produkt/klucz-mieszkaniowy-fan-r-id-501",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-gam-3/1746",
				destination: "/produkt/klucz-mieszkaniowy-gam-3-id-513",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-gam-4/1718",
				destination: "/produkt/klucz-mieszkaniowy-gam-4-id-549",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-gam-6/1584",
				destination: "/produkt/klucz-mieszkaniowy-gam-6-id-438",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-gbw-2/1532",
				destination: "/produkt/klucz-mieszkaniowy-gbw-2-id-530",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-gda-1/1539",
				destination: "/produkt/klucz-mieszkaniowy-gda-1-id-469",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ge-113/1672",
				destination: "/produkt/klucz-mieszkaniowy-ge-113-id-572",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ge-118/1678",
				destination: "/produkt/klucz-mieszkaniowy-ge-118-id-574",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ge-119/1712",
				destination: "/produkt/klucz-mieszkaniowy-ge-119-id-544",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ge-1x/1740",
				destination: "/produkt/klucz-mieszkaniowy-ge-1x-id-507",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ge-34/1714",
				destination: "/produkt/klucz-mieszkaniowy-ge-34-id-545",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ge-34r/1531",
				destination: "/produkt/klucz-mieszkaniowy-ge-34r-id-529",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ge-6x/1742",
				destination: "/produkt/klucz-mieszkaniowy-ge-6x-id-509",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-gerda/1514",
				destination: "/produkt/klucz-mieszkaniowy-gerda-id-400",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-gerda-evo/1492",
				destination: "/produkt/klucz-mieszkaniowy-gerda-evo-id-378",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-gerda-h-plus/1512",
				destination: "/produkt/klucz-mieszkaniowy-gerda-h-plus-id-398",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-gerda-pro-system/1513",
				destination: "/produkt/klucz-mieszkaniowy-gerda-pro-system-id-399",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-gmb/1540",
				destination: "/produkt/klucz-mieszkaniowy-gmb-id-470",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-gmb/1499",
				destination: "/produkt/klucz-mieszkaniowy-gmb-id-470",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-gerda-dl-0/1667",
				destination: "/produkt/klucz-mieszkaniowy-gerda-dl-0-id-569",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-gerda-dl-1/1666",
				destination: "/produkt/klucz-mieszkaniowy-gerda-dl-1-id-568",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-gerda-dl-2/1665",
				destination: "/produkt/klucz-mieszkaniowy-gerda-dl-2-id-567",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-gerda-dl-3/1664",
				destination: "/produkt/klucz-mieszkaniowy-gerda-dl-3-id-566",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-hooply-m2/1497",
				destination: "/produkt/klucz-mieszkaniowy-hooply-m2-id-383",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ie-14/1523",
				destination: "/produkt/klucz-mieszkaniowy-ie-14-id-409",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ie-15/1568",
				destination: "/produkt/klucz-mieszkaniowy-ie-15-id-422",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ie-26/1522",
				destination: "/produkt/klucz-mieszkaniowy-ie-26-id-408",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ie-26s/1529",
				destination: "/produkt/klucz-mieszkaniowy-ie-26s-id-414",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ie-27r/1760",
				destination: "/produkt/klucz-mieszkaniowy-ie-27r-id-523",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ie-6/1552",
				destination: "/produkt/klucz-mieszkaniowy-ie-6-id-482",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-io-1/1521",
				destination: "/produkt/klucz-mieszkaniowy-io-1-id-407",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ianpai/1609",
				destination: "/produkt/klucz-mieszkaniowy-ianpai-id-458",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-jma/1763",
				destination: "/produkt/klucz-mieszkaniowy-jma-id-558",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-kale-c/1581",
				destination: "/produkt/klucz-mieszkaniowy-kale-c-id-435",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-kale-c-dwa-rowki-p/1591",
				destination: "/produkt/klucz-mieszkaniowy-kale-c-dwa-rowki-p-id-445",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-kle-2r/1571",
				destination: "/produkt/klucz-mieszkaniowy-kle-2r-id-425",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-kle-8r/1494",
				destination: "/produkt/klucz-mieszkaniowy-kle-8r-id-380",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-kmt/1741",
				destination: "/produkt/klucz-mieszkaniowy-kmt-id-508",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-kmt-1/1729",
				destination: "/produkt/klucz-mieszkaniowy-kmt-1-id-497",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ks-1/1694",
				destination: "/produkt/klucz-mieszkaniowy-ks-1-id-488",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-lf-4/1662",
				destination: "/produkt/klucz-mieszkaniowy-lf-4-id-564",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-lob-1/1663",
				destination: "/produkt/klucz-mieszkaniowy-lob-1-id-565",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-lob-maly/1679",
				destination: "/produkt/klucz-mieszkaniowy-lob-maly-id-575",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-lz/1748",
				destination: "/produkt/klucz-mieszkaniowy-lz-id-514",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-lob/1603",
				destination: "/produkt/klucz-mieszkaniowy-lob-1-id-565",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-lobix/1614",
				destination: "/produkt/klucz-mieszkaniowy-lobix-id-463",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-md-pl-2006/1550",
				destination: "/produkt/klucz-mieszkaniowy-md-pl-2006-id-480",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-md-pl-2011/1549",
				destination: "/produkt/klucz-mieszkaniowy-md-pl-2011-id-479",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-mc-10r/1510",
				destination: "/produkt/klucz-mieszkaniowy-mc-10r-id-396",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-mc-12/1745",
				destination: "/produkt/klucz-mieszkaniowy-mc-12-id-512",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-mc-14r/1582",
				destination: "/produkt/klucz-mieszkaniowy-mc-14r-id-436",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-mc-15r/1579",
				destination: "/produkt/klucz-mieszkaniowy-mc-15r-id-433",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-mc-26r/1527",
				destination: "/produkt/klucz-mieszkaniowy-mc-26r-id-413",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-mc-5r/1583",
				destination: "/produkt/klucz-mieszkaniowy-mc-5r-id-437",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-mc-8x/1554",
				destination: "/produkt/klucz-mieszkaniowy-mc-8x-id-484",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-mer-1/1686",
				destination: "/produkt/klucz-mieszkaniowy-mer-1-id-578",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-mt-1/1506",
				destination: "/produkt/klucz-mieszkaniowy-mt-1-id-392",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-masterlock-lm/1607",
				destination: "/produkt/klucz-mieszkaniowy-masterlock-lm-id-456",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-multilock-typ-3/1612",
				destination: "/produkt/klucz-mieszkaniowy-multilock-typ-3-id-461",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-multilock-typ-4/1613",
				destination: "/produkt/klucz-mieszkaniowy-multilock-typ-4-id-462",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-multilock-typ-1/1606",
				destination: "/produkt/klucz-mieszkaniowy-multilock-typ-1-id-455",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-mutlilock-typ-2/1611",
				destination: "/produkt/klucz-mieszkaniowy-mutlilock-typ-2-id-460",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-no-name-typ-2/1697",
				destination: "/produkt/klucz-mieszkaniowy-no-name-typ-2-id-534",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-no-name-typ-3/1701",
				destination: "/produkt/klucz-mieszkaniowy-no-name-typ-3-id-538",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-obw-1/1720",
				destination: "/produkt/klucz-mieszkaniowy-obw-1-id-551",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-obw-2/1721",
				destination: "/produkt/klucz-mieszkaniowy-obw-2-id-552",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-obw-6/1724",
				destination: "/produkt/klucz-mieszkaniowy-obw-6-id-555",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-obw-7/1723",
				destination: "/produkt/klucz-mieszkaniowy-obw-7-id-554",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-obw-8/1722",
				destination: "/produkt/klucz-mieszkaniowy-obw-8-id-553",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-omega/1709",
				destination: "/produkt/klucz-mieszkaniowy-omega-id-491",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-omega-k/1765",
				destination: "/produkt/klucz-mieszkaniowy-omega-k-id-559",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-pf-092/1693",
				destination: "/produkt/klucz-mieszkaniowy-pf-092-id-533",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-pf-092s/1692",
				destination: "/produkt/klucz-mieszkaniowy-pf-092s-id-532",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-phf-27/1704",
				destination: "/produkt/klucz-mieszkaniowy-phf-27-id-541",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-pl-2009/1495",
				destination: "/produkt/klucz-mieszkaniowy-pl-2009-id-381",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-rim/1541",
				destination: "/produkt/klucz-mieszkaniowy-rim-id-471",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-scm-1r/1566",
				destination: "/produkt/klucz-mieszkaniowy-scm-1r-id-420",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-sct-1r/1595",
				destination: "/produkt/klucz-mieszkaniowy-sct-1r-id-449",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-sis-20/1543",
				destination: "/produkt/klucz-mieszkaniowy-sis-20-id-473",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-sm-1/1688",
				destination: "/produkt/klucz-mieszkaniowy-sm-1-id-580",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-sm-1r/1687",
				destination: "/produkt/klucz-mieszkaniowy-sm-1r-id-579",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-sn-2/1553",
				destination: "/produkt/klucz-mieszkaniowy-sn-2-id-483",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-sn-2r/1757",
				destination: "/produkt/klucz-mieszkaniowy-sn-2r-id-521",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-stu-6r/1574",
				destination: "/produkt/klucz-mieszkaniowy-stu-6r-id-428",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-sanjin-l/1610",
				destination: "/produkt/klucz-mieszkaniowy-sanjin-l-id-459",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-tar-16r/1594",
				destination: "/produkt/klucz-mieszkaniowy-tar-16r-id-448",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-td/1520",
				destination: "/produkt/klucz-mieszkaniowy-td-id-406",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-te-19/1599",
				destination: "/produkt/klucz-mieszkaniowy-te-19-id-453",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-te-2x/1737",
				destination: "/produkt/klucz-mieszkaniowy-te-2x-id-505",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-te-4/1592",
				destination: "/produkt/klucz-mieszkaniowy-te-4-id-446",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-te-5/1588",
				destination: "/produkt/klucz-mieszkaniowy-te-5-id-442",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-te-7/1597",
				destination: "/produkt/klucz-mieszkaniowy-te-7-id-451",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-te-8x-fa/1743",
				destination: "/produkt/klucz-mieszkaniowy-te-8x-fa-id-510",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-tl-5/1558",
				destination: "/produkt/klucz-mieszkaniowy-tl-5-id-589",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-tl-6r/1556",
				destination: "/produkt/klucz-mieszkaniowy-tl-6r-id-587",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-to-1/1548",
				destination: "/produkt/klucz-mieszkaniowy-to-1-id-478",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-to-19/1700",
				destination: "/produkt/klucz-mieszkaniowy-to-19-id-537",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-to-1x/1753",
				destination: "/produkt/klucz-mieszkaniowy-to-1x-id-518",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-top-1r/1764",
				destination: "/produkt/klucz-mieszkaniowy-top-1r-id-525",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-top-6/1505",
				destination: "/produkt/klucz-mieszkaniowy-top-6-id-391",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-tr-4/1756",
				destination: "/produkt/klucz-mieszkaniowy-tr-4-id-556",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-trm-2/1725",
				destination: "/produkt/klucz-mieszkaniowy-trm-2-id-493",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-trm-3/1738",
				destination: "/produkt/klucz-mieszkaniowy-trm-3-id-506",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ts/1585",
				destination: "/produkt/klucz-mieszkaniowy-ts-id-439",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-tampai/1605",
				destination: "/produkt/klucz-mieszkaniowy-tampai-id-454",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-uc-5r/1504",
				destination: "/produkt/klucz-mieszkaniowy-uc-5r-id-390",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ul-051/1547",
				destination: "/produkt/klucz-mieszkaniowy-ul-051-id-477",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ul-050/1732",
				destination: "/produkt/klucz-mieszkaniowy-ul-050-id-500",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ul-058/1747",
				destination: "/produkt/klucz-mieszkaniowy-ul-058-id-581",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ul-2/1731",
				destination: "/produkt/klucz-mieszkaniowy-ul-2-id-499",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-uni-1/1762",
				destination: "/produkt/klucz-mieszkaniowy-uni-1-id-582",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-vi-19/1576",
				destination: "/produkt/klucz-mieszkaniowy-vi-19-id-430",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-vir-1x/1710",
				destination: "/produkt/klucz-mieszkaniowy-vir-1x-id-492",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-win-1/1542",
				destination: "/produkt/klucz-mieszkaniowy-win-1-id-472",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-wj-1r/1498",
				destination: "/produkt/klucz-mieszkaniowy-wj-1r-id-384",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-wj-2x/1573",
				destination: "/produkt/klucz-mieszkaniowy-wj-2x-id-427",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-wk-45x/1699",
				destination: "/produkt/klucz-mieszkaniowy-wk-45x-id-536",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-wk-70/1567",
				destination: "/produkt/klucz-mieszkaniowy-wk-70-id-421",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-wk-71x/1698",
				destination: "/produkt/klucz-mieszkaniowy-wk-71x-id-535",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-wk-92/1600",
				destination: "/produkt/klucz-mieszkaniowy-wk-92-id-486",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-wke-1/1537",
				destination: "/produkt/klucz-mieszkaniowy-wke-1-id-467",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-wsa-2r/1759",
				destination: "/produkt/klucz-mieszkaniowy-wsa-2r-id-522",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-y7/1503",
				destination: "/produkt/klucz-mieszkaniowy-y7-id-389",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ya-18/1659",
				destination: "/produkt/klucz-mieszkaniowy-ya-18-id-563",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ya-31/1544",
				destination: "/produkt/klucz-mieszkaniowy-ya-31-id-474",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ya-6/1493",
				destination: "/produkt/klucz-mieszkaniowy-ya-6-id-379",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-yale/1677",
				destination: "/produkt/klucz-mieszkaniowy-yale-id-573",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-yd-13r/1562",
				destination: "/produkt/klucz-mieszkaniowy-yd-13r-id-416",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-yd-14r/1580",
				destination: "/produkt/klucz-mieszkaniowy-yd-14r-id-434",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-yd-3r/1496",
				destination: "/produkt/klucz-mieszkaniowy-yd-3r-id-382",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-yd-6r/1502",
				destination: "/produkt/klucz-mieszkaniowy-yd-6r-id-388",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-yd-7r/1500",
				destination: "/produkt/klucz-mieszkaniowy-yd-7r-id-386",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-yet-3/1572",
				destination: "/produkt/klucz-mieszkaniowy-yet-3-id-426",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-yet-5/1545",
				destination: "/produkt/klucz-mieszkaniowy-yet-5-id-475",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-yet-6/1719",
				destination: "/produkt/klucz-mieszkaniowy-yet-6-id-550",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-yml/1657",
				destination: "/produkt/klucz-mieszkaniowy-yml-id-561",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-ymp/1658",
				destination: "/produkt/klucz-mieszkaniowy-ymp-id-562",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-yt-15/1726",
				destination: "/produkt/klucz-mieszkaniowy-yt-15-id-494",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-yt-15l/1730",
				destination: "/produkt/klucz-mieszkaniowy-yt-15l-id-498",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-yt-15r/1750",
				destination: "/produkt/klucz-mieszkaniowy-yt-15r-id-516",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-yt-15x-r/1770",
				destination: "/produkt/klucz-mieszkaniowy-yt-15x-r-id-526",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-yt-16/1727",
				destination: "/produkt/klucz-mieszkaniowy-yt-16-id-495",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-yt-17/1728",
				destination: "/produkt/klucz-mieszkaniowy-yt-17-id-496",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-yt15x-6/1696",
				destination: "/produkt/klucz-mieszkaniowy-yt15x-6-id-490",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-euro-profil/1535",
				destination: "/produkt/klucz-mieszkaniowy-euro-profil-id-465",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-euro-profil-kw/1536",
				destination: "/produkt/klucz-mieszkaniowy-euro-profil-kw-id-466",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-mieszkaniowy-universal/1538",
				destination: "/produkt/klucz-mieszkaniowy-universal-id-468",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-nacinany-standart/11",
				destination: "/produkt/klucz-nacinany-standart-id-464",
				permanent: true,
			},
			{
				source: "/produkty/klucze-samochodowe/klucz-samochodowy-fiat-typ-1/1797",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/klucze-samochodowe/klucz-samochodowy-hu-52p/1766",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/klucze-samochodowe/klucz-samochodowy-hu-72rp/1768",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/klucze-samochodowe/klucz-samochodowy-md-1p/1769",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/klucze-samochodowe/klucz-samochodowy-ne-66p/1767",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/klucze-samochodowe/klucz-samochodowy-toy-29rp/1602",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/klucze-samochodowe/klucz-samochodowy-toy-13/1601",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-szkrzynkowy-1e/1676",
				destination: "/produkt/klucz-szkrzynkowy-1e-id-367",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-szkrzynkowy-bt-2/1673",
				destination: "/produkt/klucz-szkrzynkowy-bt-2-id-364",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-szkrzynkowy-bt-5r/1670",
				destination: "/produkt/klucz-szkrzynkowy-bt-5r-id-363",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-szkrzynkowy-hpp-1r/1674",
				destination: "/produkt/klucz-szkrzynkowy-hpp-1r-id-365",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-szkrzynkowy-rst/1680",
				destination: "/produkt/klucz-szkrzynkowy-rst-id-368",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-szkrzynkowy-rst-r/1684",
				destination: "/produkt/klucz-szkrzynkowy-rst-r-id-371",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-szkrzynkowy-rst-rs/1660",
				destination: "/produkt/klucz-szkrzynkowy-rst-rs-id-362",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-szkrzynkowy-rst-s/1681",
				destination: "/produkt/klucz-szkrzynkowy-rst-s-id-369",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-szkrzynkowy-wtr/1682",
				destination: "/produkt/klucz-szkrzynkowy-wtr-id-370",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/klucz-szkrzynkowy-yet-1/1683",
				destination: "/produkt/klucz-szkrzynkowy-yet-1-id-576",
				permanent: true,
			},
			{
				source: "/produkty/klucze-samochodowe/klucz-z-immobiliserem/12",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/klucze-numeryczne/klucze-numeryczne-elto/1479",
				destination: "/produkt/klucze-numeryczne-elto-id-376",
				permanent: true,
			},
			{
				source: "/produkty/klucze-numeryczne/klucze-numeryczne-expres/1478",
				destination: "/produkt/klucze-numeryczne-expres-id-375",
				permanent: true,
			},
			{
				source: "/produkty/klucze-numeryczne/klucze-numeryczne-hobes/1480",
				destination: "/produkt/klucze-numeryczne-hobes-id-377",
				permanent: true,
			},
			{
				source: "/produkty/klucze-numeryczne/klucze-numeryczne-jania/1476",
				destination: "/produkt/klucze-numeryczne-jania-id-373",
				permanent: true,
			},
			{
				source: "/produkty/klucze-numeryczne/klucze-numeryczne-lob/1475",
				destination: "/produkt/klucze-numeryczne-lob-id-372",
				permanent: true,
			},
			{
				source: "/produkty/klucze-numeryczne/klucze-numeryczne-nemef/1477",
				destination: "/produkt/klucze-numeryczne-nemef-id-374",
				permanent: true,
			},
			{
				source: "/produkty/systemy-www-dla-biznesu/koszty-wysylki/1777",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/klucze-akcesoria/koleczko-metalowe-do-kluczy/1794",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/laminaty/laminat-laserables-2-lz-2903-016/1631",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/serwis-gsm/lcd-iphone-6-wymiana/1533",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/serwis-gsm/lcd-samsung-a40-sm-a405-wymiana/1487",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/serwis-gsm/lcd-samsung-m31s-wymiana/1484",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/laminaty/laminat-laserables-2-lz-2901-016/1615",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/laminaty/laminat-laserables-2-lz-2902-016/1616",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/laminaty/laminat-laserables-2-lz-2904-016/1618",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/laminaty/laminat-laserables-2-lz-2906-016/1619",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/laminaty/laminat-laserthins-lz-901-008/1629",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/laminaty/laminat-laserthins-lz-902-008/1630",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/laminaty/laminat-laserthins-lz-903-008/1626",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/laminaty/laminat-laserthins-lz-904-008/1627",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/laminaty/laminat-laserthins-lz-906-008/1628",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/laminaty/laminat-laserthins-lz-9346-008/1623",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/laminaty/laminat-laserthins-lz-9346-008d/1624",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/laminaty/laminat-laserthins-lz-9372-008/1625",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/laminaty/laminat-laserthins-lz-990-008/1620",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/laminaty/laminat-laserthins-lz-991-008/1621",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/laminaty/laminat-laserthins-lz-998-008/1622",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/systemy-www-dla-biznesu/monitor-lcd-24-akcesoria/1789",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/serwis-gsm/naprawa-zacza-adowania-lutowanie/8",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/tabliczki-informacyjne/niesmiertelnik-andrzej/5",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/serwis-gsm/oryginalny-wyswietlacz-lcd-xiaomi-note-8-pro-ramka/1793",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/pendrive-16gb-goodram/1363",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/pendrive-32gb-easy/1364",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/pendrive-32gb-goodram/1365",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/pendrive-64gb-kingston-micro-usbusb/1366",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/pieczatki-firmowe/pieczatka-firmowa-printer-compact-c30-czarny/1781",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/pieczatki-firmowe/pieczatka-firmowa-printer-compact-c30-zoty/1780",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/powerbank-case-for-iphone-xxs-3200/1367",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/pieczatki-okrage-kwadratowe-inne/printer-okragy-r40-czerwony/1803",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/przejsciowka-micro-do-lightning/1368",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/przejsciowka-micro-usb-to-type-c/1369",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/przejsciowka-type-c-do-micro-usb/1370",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/przejsciowka-usb-to-type-c-baseus/1371",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/pieczatki-okrage-kwadratowe-inne/pieczatka-duza-printer-colop-c60/1805",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/pieczatki-okrage-kwadratowe-inne/pieczatka-printer-55/1812",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/pieczatki-firmowe/pieczatka-firmowa-duza/1778",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/pieczatki-firmowe/pieczatka-firmowa-printer-compact-c30-czerwony/1779",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/pieczatki-firmowe/pieczatka-firmowa-printer-compact-c30-niebieska/1",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/pieczatki-z-logiem/pieczatka-firmowa-printer-compact-c40/2",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/pieczatki-z-logiem/pieczatka-firmowa-printer-compact-c40-z-logiem/1790",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/pieczatki-imienne/pieczatka-imienna-printer-compact-c20/1474",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/pieczatki-xxl/pieczatkia-colop-c60/1799",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/poduszki-z-tuszem/poduszka-5208-540-czerwona/1802",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/poduszki-z-tuszem/poduszka-e2800-czerwona/1800",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/poduszki-z-tuszem/poduszka-e55-czerowna/1801",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/pieczatki-firmowe/poduszka-z-tuszem/1787",
				destination: "/produkt/poduszka-z-tuszem-colop-micro-2-id-613",
				permanent: true,
			},
			{
				source: "/produkty/znakowanie-w-metalu/prezent-dla-szefa-kuchni-znakowanie-noza/1489",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/pieczatki-okrage-kwadratowe-inne/printer-colop-c50/1808",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/pieczatki-okrage-kwadratowe-inne/printer-colop-q30-kwadrat/1806",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/pieczatki-kieszonkowe/printer-stamp-mouse-20/1810",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/pieczatki-kieszonkowe/printer-stamp-mouse-30/1811",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/systemy-www-dla-biznesu/rejestrator-ip-4-kanalowy-nvr-2104-4ks2/1773",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/samochodowa-ad-baseus-grain-car-charger/1372",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/samochodowa-ad-hoco-iphone-z2/1373",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/samochodowa-ad-remax-4usb-adapter/1374",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/selfiestick-bluestar-jack/1375",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/selfiestick-bluestar-lightning/1376",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/spigen-huawei-p30/1378",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/spigen-huawei-p40/1379",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/spigen-iphone-11-pro/1380",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/spigen-iphone-11-pro-max/1381",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/spigen-iphone-13-pro-max/1382",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/spigen-iphone-xs-max/1383",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/spigen-samsung-a40/1384",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/spigen-samsung-a41/1385",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/spigen-samsung-m21/1386",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/spigen-samsung-s10/1387",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/spigen-samsung-s20/1388",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/spigen-samsung-s20-plus/1389",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/spigen-samsung-s20-ultra/1390",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/spigen-samsung-s21-ultra-5g/1391",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/spigen-samsung-s9/1392",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/spigen-xiaomi-mi9-t/1393",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/spigen-xiaomi-redmi-note-9pro-maxnote-9snote-9-pro/1394",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-hammer-active/1395",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-hammer-active-2/1396",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-hammer-energy/1397",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-hammer-explorer/1398",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-hammer-iron-2/1399",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-huawei-mate-10-lite/1400",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-huawei-p-smart/1401",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-huawei-p-smart-z/1402",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-huawei-p10/1403",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-huawei-p20-pro/1404",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-huawei-p40/1405",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-huawei-p9-lite/1406",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-huawei-y5-2019/1407",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-huawei-y5-lite-2018/1408",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-iphone-13-pro-max/1412",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-iphone-xs-max-11-pro-max/1413",
				destination: "/410",
				permanent: true,
			},
			{ source: "/produkty/akcesoria-gsm/szko-moto-e6/1414", destination: "/410", permanent: true },
			{
				source: "/produkty/akcesoria-gsm/szko-moto-g5-plus/1415",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-moto-g8-power/1416",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-oppo-a72/1417",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-p40-lite/1418",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-samsung-a21-a21s/1419",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-samsung-a3-2017/1420",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-samsung-a8-2018/1421",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-samsung-a9-2018/1422",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-samsung-galaxy-a20s/1423",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-samsung-j3-2016/1424",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-samsung-j5-2016/1425",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-samsung-j7-2016/1426",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-samsung-m12/1427",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-samsung-xcover-3/1428",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-uv-samsung-note-10-plus/1429",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-xiaomi-mi-10t-lite/1430",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-xiaomi-mi-11-lite-4g5g/1431",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-xiaomi-mi-8-lite/1432",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-xiaomi-mi-note-10/1433",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-xiaomi-note-8-t/1434",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-xiaomi-redmi-7a/1435",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-xiaomi-redmi-note-10-10s/1436",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-xiaomi-redmi-note-10-pro-max/1437",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-xiaomi-redmi-note-7/1438",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-xiaomi-redmi-note-9t-5g/1439",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-iphone-11-aparat/1409",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-iphone-11-xr/1410",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/szko-iphone-12-pro-max/1411",
				destination: "/410",
				permanent: true,
			},
			{
				source:
					"/produkty/systemy-www-dla-biznesu/system-obsugi-zamowien-w-gastronomi-pizzerii/1473",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/suchawki-hf-spigen-airpods-1st-gen-bluetooth/1377",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/uchwyt-baseus-future-gravity-car-mount/1440",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/uchwyt-baseus-osculum-type/1441",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/uchwyt-baseus-platinium-kips/1442",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/uchwyt-hoco-do-szyby-ca67/1449",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/uchwyt-na-motocykl-gpsmobile/1443",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/uchwyt-remax-rm-c57/1444",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/uchwyt-universal-car-mount-at03/1445",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/uchwyt-wireless-car-charger-sui-for-all-qi/1446",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/uchywt-baseus-do-kokpitu-small-ears-series/1447",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/uchywt-forcell-do-szyby-h-ct327/1448",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/uv-huawei-p40-pro/1450",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/uv-samsug-s9-bestsuit/1451",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/uv-samsug-s9-plus/1452",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/uv-samsung-note-8/1453",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/uv-samsung-note-9/1454",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/uv-samsung-s10/1455",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/uv-samsung-s10-plus/1456",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/uv-samsung-s20-light/1457",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/uv-samsung-s20-plus/1458",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/uv-samsung-s20-plus-monkey/1459",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/uv-samsung-s7-edge/1460",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/uv-samsung-s8/1461",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/uv-samsung-s8-plus/1462",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/laminaty/usluga-ciecia-laminatu-zetony/1782",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/klucze-samochodowe/usluga-dorobienie-klucza-samochodowego-z-immo/1804",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/kurier/usluga-kurierska-na-adres/1798",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/systemy-www-dla-biznesu/usluga-programistyczna/1784",
				destination: "/410",
				permanent: true,
			},
			{
				source:
					"/produkty/systemy-www-dla-biznesu/usluga-programistyczna-it-program-zarzadzania-pizzeria-vps-rezerwowy/1483",
				destination: "/410",
				permanent: true,
			},
			{
				source:
					"/produkty/systemy-www-dla-biznesu/usuga-programistyczna-it-program-zarzadzania-serwisem-gsm/1482",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/serwis-gsm/usluga-serwisowa-telefonu-komorkowego/1791",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/systemy-www-dla-biznesu/uslugi-programistyczne/1488",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/wireless-odbiornik-bluetooth/1463",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/wtyczka-hoco-21a/1464",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/sklejka-drewno/wieszak-na-medale-korona-maratonow-polskich/1771",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/klucze-samochodowe/wymiana-obudowy-klucza-typu-scyzoryk/1490",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/serwis-gsm/wymiana-oczka-kamery-samsung-m31s/1485",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/serwis-gsm/wymiana-plytki-ladowania-samsung-a71-sm-a715f/1604",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/serwis-gsm/wymiana-wyswietlacza-huawei-honor-10-pro/1786",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/serwis-gsm/wymiana-wyswietlacza-huawei-mate-20-lite/1785",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/serwis-gsm/wymiana-wyswietlacza-lcd-samsung-s10-blue/1796",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/serwis-gsm/wymiana-wyswietlacza-samsung-a70/1788",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/pieczatki-mini/wyrobienie-gumki-do-pieczatki-compact-10-wymiana/1783",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/serwis-gsm/wyswietlacz-samsung-m21-sm-m215f-wymiana/1772",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe/yd-6rx/1501",
				destination: "/produkt/klucz-mieszkaniowy-yd-6rx-id-387",
				permanent: true,
			},
			{
				source: "/produkty/systemy-www-dla-biznesu/zasilacz-poe-48nx-48-dc-24w/1774",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/ad-samochodowa-atx-max-2x-usb-21a/1358",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/ad-samochodowa-atx-micro-2a/1359",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/adowarka-samochodowa-remax-2w1/1360",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/adowarka-sieciowa-bluestar-nokia-3310-6101/1361",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/produkty/akcesoria-gsm/adowarka-sieciowa-bluestar-nokia-6101-n95/1362",
				destination: "/410",
				permanent: true,
			},
			{
				source: "/sklep_online/produkty/(.*)",
				destination: "/produkty",
				permanent: true,
			},
			{
				source: "/produkty/kategoria/(.*)",
				destination: "/produkty",
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
				source: "/wyrob-pieczatek-online-do-miast-na-(.*)",
				destination: "/wysylka-i-uslugi-na-miejscu-w-rybnej",
				permanent: true,
			},
			{
				source: "/produkty/klucze-mieszkaniowe(.*)",
				destination: "/produkty/klucze/klucze-mieszkaniowe",
				permanent: true,
			},
			{
				source: "/serwis-i-naprawy-telefonow-w-okolicy-(.*)",
				destination: "/wysylka-i-uslugi-na-miejscu-w-rybnej",
				permanent: true,
			},
		];
	},
	poweredByHeader: false,
};

module.exports = nextConfig;
