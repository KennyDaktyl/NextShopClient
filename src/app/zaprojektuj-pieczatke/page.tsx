import type { Metadata } from "next";
import Link from "next/link";
import StampDesigner from "@/components/widgets/StampDesigner/StampDesigner";

const CANONICAL_PATH = "/zaprojektuj-pieczatke";
const TITLE = "Zaprojektuj pieczątkę online — kreator z podglądem na żywo | Serwis w Rybnej";
const DESCRIPTION =
	"Darmowy kreator pieczątek online. Zbuduj treść pieczątki linia po linii, wybierz czcionkę, rozmiar i kształt, zobacz podgląd odcisku na żywo i wyślij projekt do bezpłatnej wyceny — odpowiadamy w 24h.";

export const metadata: Metadata = {
	title: TITLE,
	description: DESCRIPTION,
	alternates: {
		canonical: CANONICAL_PATH,
	},
	openGraph: {
		title: TITLE,
		description: DESCRIPTION,
		url: process.env.NEXT_PUBLIC_BASE_URL + CANONICAL_PATH,
		siteName: process.env.NEXT_PUBLIC_SITE_TITLE,
		locale: "pl_PL",
		type: "website",
	},
	twitter: {
		card: "summary",
		title: TITLE,
		description: DESCRIPTION,
	},
};

export default function DesignStampPage() {
	return (
		<div className="mb-10 w-full">
			<div className="mb-6 rounded-lg bg-gray-100 p-6 sm:p-10">
				<h1 className="mb-3 text-2xl font-bold sm:text-3xl">Zaprojektuj pieczątkę online</h1>
				<p className="max-w-2xl text-sm leading-relaxed text-gray-700 sm:text-base">
					Zbuduj treść pieczątki linia po linii — wybierz czcionkę (Arial, Times New Roman i inne),
					rozmiar, pogrubienie lub kursywę dla każdej linii, a także kształt pieczątki (prostokątna,
					okrągła, owalna). Podgląd odcisku aktualizuje się na żywo. Gotowy projekt wyślij do nas —
					odpowiemy z bezpłatną wyceną w ciągu 24h.
				</p>
			</div>

			<StampDesigner variant="page" />

			<section className="mt-10 rounded-lg border border-gray-200 p-6 sm:p-8">
				<h2 className="mb-3 text-xl font-semibold">Jak działa kreator pieczątek online?</h2>
				<p className="mb-4 text-sm leading-relaxed text-gray-700">
					Nasz konfigurator pieczątek pozwala samodzielnie zaprojektować treść pieczątki firmowej,
					imiennej lub okolicznościowej bez wychodzenia z domu. Dodaj do 8 linii tekstu, dobierz styl
					do każdej z osobna i sprawdź jak będzie wyglądał odcisk, zanim wyślesz zamówienie. Projekt
					trafia bezpośrednio do naszego serwisu w Rybnej — obsługujemy klientów stacjonarnie oraz z
					dojazdem na terenie Krakowa i okolic.
				</p>
				<div className="flex flex-wrap gap-4 text-sm">
					<Link href="/produkty/pieczatki" className="font-semibold text-blue-600 hover:underline">
						Zobacz gotowe pieczątki w ofercie →
					</Link>
					<Link
						href="/uslugi/mobilne-wyrob-pieczatek"
						className="font-semibold text-blue-600 hover:underline"
					>
						Pieczątki z dojazdem do klienta →
					</Link>
				</div>
			</section>
		</div>
	);
}
