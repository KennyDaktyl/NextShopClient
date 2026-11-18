import { getServiceLocalities } from "@/api/getServiceLocalities";
import {
	BUSINESS_ADDRESS,
	BUSINESS_HOURS,
	BUSINESS_NAME,
	BUSINESS_PHONE,
	MAIN_SERVICES,
} from "@/components/seo/businessInfo";

export const revalidate = 3600;

// Te same podstrony miejscowości co w sitemap.ts.
const LOCALITY_SERVICES = [
	{ slug: "mobilne-dorabianie-kluczy", label: "klucze" },
	{ slug: "mobilne-wyrob-pieczatek", label: "pieczątki" },
	{ slug: "mobilne-kodowanie-pilotow-do-bram", label: "piloty do bram" },
];

export async function GET() {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
	const localities = await getServiceLocalities();

	const lines = [
		`# ${BUSINESS_NAME}`,
		"",
		"> Dorabianie kluczy, piloty do bram i pieczątki. Punkt w Rybnej lub dojazd do klienta – Kraków i okolice.",
		"",
		"## Kontakt",
		"",
		`- Adres: ${BUSINESS_ADDRESS}`,
		`- Telefon: ${BUSINESS_PHONE}`,
		`- Godziny otwarcia punktu: ${BUSINESS_HOURS}`,
		`- Kontakt online: ${baseUrl}/kontakt`,
		"",
		"## Usługi",
		"",
		...MAIN_SERVICES.map(
			(service) => `- [${service.name}](${baseUrl}${service.path}): od ${service.priceFrom} zł`,
		),
		"",
		"## Obszar dojazdu",
		"",
		...localities.map((locality) => {
			const links = LOCALITY_SERVICES.map(
				(service) => `[${service.label}](${baseUrl}/uslugi/${service.slug}-${locality.slug})`,
			).join(", ");
			return `- ${locality.name} (${locality.region_label}): ${links}`;
		}),
		"",
	];

	return new Response(lines.join("\n"), {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
}
