import Image from "next/image";
import Link from "next/link";

export async function generateMetadata() {
	return {
		title: "Rybna i Okolice – Ekspresowa Wysyłka i Usługi Serwisowe",
		description:
			"Zapraszamy mieszkańców Rybnej oraz okolicznych miejscowości – Krzeszowice, Alwernia, Liszki, Kryspinów, Zabierzów – do skorzystania z naszych profesjonalnych usług. Oferujemy dorabianie kluczy, wyrób pieczątek, kopiowanie immobilizerów samochodowych oraz szeroki zakres napraw telefonów. Wysyłka realizowana na terenie całej Polski z ekspresową obsługą.",
	};
}

export default function Page() {
	return (
		<div className="container mx-auto py-8">
			<h1 className="mb-6 text-center text-3xl font-bold">
				Rybna i Okolice – Ekspresowa Wysyłka i Usługi Serwisowe
			</h1>
			<p className="mb-8 text-lg text-gray-700">
				Zapraszamy mieszkańców Rybnej oraz okolicznych miejscowości – Krzeszowice, Alwernia, Liszki,
				Kryspinów, Zabierzów – do skorzystania z naszych profesjonalnych usług. Oferujemy dorabianie
				kluczy, wyrób pieczątek, kopiowanie immobilizerów samochodowych oraz szeroki zakres napraw
				telefonów. Wysyłka realizowana na terenie całej Polski z ekspresową obsługą.
			</p>
			<h2 className="mt-8 text-center text-2xl font-semibold">
				Ekspresowa Wysyłka na Terenie Całej Polski
			</h2>
			<p className="my-6 text-lg text-gray-700">
				Nasze usługi oferujemy nie tylko lokalnie, ale również na terenie całej Polski. Dzięki
				współpracy z InPost, paczki wysyłamy błyskawicznie zarówno kurierem, jak i do paczkomatów.
				Szybka realizacja gwarantowana!
			</p>
			<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
				<Image
					src="/images/inpost-kurier.webp"
					alt="Kurier InPost"
					width={400}
					height={300}
					className="rounded-lg shadow-lg"
				/>
				<Image
					src="/images/inpost-paczkomaty.webp"
					alt="Paczkomaty InPost"
					width={400}
					height={300}
					className="rounded-lg shadow-lg"
				/>
			</div>

			<h2 className="mt-8 text-center text-2xl font-semibold">Usługi Dostępne w Serwisie</h2>

			<ul className="my-6 list-inside list-disc text-lg text-gray-700">
				<li>
					<Link
						href="/produkty/pieczatki-firmowe-imienne-i-personalizowane-szeroki-wybor"
						className="text-blue-500 hover:underline"
					>
						Wyrób pieczątek firmowych i personalizowanych
					</Link>{" "}
					– szybka realizacja i szeroki wybór.
				</li>
				<li>
					<Link href="/produkty/klucze" className="text-blue-500 hover:underline">
						Dorabianie kluczy
					</Link>{" "}
					– od kluczy mieszkaniowych po klucze samochodowe i piloty.
				</li>
				<li>
					<Link href="/dorabianie-kluczy-mieszkaniowych" className="text-blue-500 hover:underline">
						Dorabianie kluczy mieszkaniowych
					</Link>{" "}
					– 5 minut i gotowe!
				</li>
				<li>
					<Link
						href="/produkty/klucze/klucze-samochodowe-piloty"
						className="text-blue-500 hover:underline"
					>
						Kopiowanie immobilizerów samochodowych
					</Link>{" "}
					– gwarantujemy dokładność i jakość.
				</li>
				<li>
					<Link href="/uslugi/naprawy-telefonow" className="text-blue-500 hover:underline">
						Naprawy telefonów
					</Link>{" "}
					– wymiana wyświetlaczy, naprawa złącz ładowania i wiele więcej.
				</li>
			</ul>

			<Image
				src="/images/mapa.webp"
				alt="Mapa okolic Rybnej"
				width={1200}
				height={636}
				className="col-span-1 h-auto w-full rounded-lg shadow-lg md:col-span-3"
			/>

			<div className="mt-10 text-center">
				<Link href="/kontakt">
					<p className="inline-block rounded-lg bg-blue-600 px-8 py-3 text-white shadow-md hover:bg-blue-700">
						Zobacz pełne dane kontaktowe
					</p>
				</Link>
			</div>
		</div>
	);
}
