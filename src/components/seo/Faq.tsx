import { FAQPage, WithContext } from "schema-dts";
import { ServiceLocality } from "@/app/types";
import { JsonLd } from "@/components/seo/LdJson";
import {
	CAR_KEY_PRICE,
	FLAT_KEY_PRICE,
	OBD_PROGRAMMING_PRICE,
	OBD_REMOTE_PART_FROM,
	OBD_TOTAL_FROM,
} from "@/components/mobile-services/prices";
import { localitiesTo } from "@/components/seo/businessInfo";

export type FaqItem = { q: string; a: string };

// Treść jest zawsze w HTML (bez akordeonu), a FAQPage zawiera dokładnie te same pytania.
// html: odpowiedzi z backendu (FAQ produktu) mogą zawierać link <a> – Google akceptuje go w Answer.text.
export const Faq = ({ items, html = false }: { items: FaqItem[]; html?: boolean }) => {
	if (items.length === 0) {
		return null;
	}

	const jsonLd: WithContext<FAQPage> = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: items.map((item) => ({
			"@type": "Question",
			name: item.q,
			acceptedAnswer: { "@type": "Answer", text: item.a },
		})),
	};

	return (
		<section className="mt-8">
			<h2 className="mb-4 text-xl font-semibold sm:text-2xl">Najczęstsze pytania</h2>
			<div className="space-y-4">
				{items.map((item) => (
					<div key={item.q} className="rounded-lg border border-gray-200 p-5">
						<h3 className="mb-2 text-base font-semibold">{item.q}</h3>
						{html ? (
							<p
								className="text-sm leading-relaxed text-gray-600"
								dangerouslySetInnerHTML={{ __html: item.a }}
							/>
						) : (
							<p className="text-sm leading-relaxed text-gray-600">{item.a}</p>
						)}
					</div>
				))}
			</div>
			<JsonLd jsonLd={jsonLd} />
		</section>
	);
};

// --- Wspólne pytania ---------------------------------------------------------------------------

export const FAQ_FLAT_KEY: FaqItem = {
	q: "Ile kosztuje dorobienie klucza mieszkaniowego?",
	a: `Od ${FLAT_KEY_PRICE} zł. W punkcie w Rybnej klucz jest gotowy w kilka minut.`,
};

export const CAR_KEY_PRICE_ANSWER = `Klucz z grotem i immobilizerem kosztuje ${CAR_KEY_PRICE} zł. Jeśli potrzebne jest programowanie nowego klucza lub pilota przez złącze OBD (np. gdy nie masz już żadnego działającego klucza), usługa kosztuje od ${OBD_PROGRAMMING_PRICE} zł plus koszt pilota lub klucza (np. od ok. ${OBD_REMOTE_PART_FROM} zł), czyli razem zwykle od ok. ${OBD_TOTAL_FROM} zł. Dokładną cenę podam przez telefon po marce, modelu i roczniku auta. Płacisz dopiero po sprawdzeniu, że klucz otwiera auto i uruchamia silnik.`;

export const FAQ_CAR_KEY: FaqItem = {
	q: "Ile kosztuje dorobienie klucza samochodowego z immobilizerem?",
	a: CAR_KEY_PRICE_ANSWER,
};

// Brak stałych godzin otwarcia (zastępuje dawne pytanie o godziny 8–17).
export const FAQ_APPOINTMENT: FaqItem = {
	q: "Czy trzeba się umówić? W jakich godzinach działacie?",
	a: "Nie mam stałych godzin otwarcia. Proszę o umówienie wizyty telefonicznie (506 029 980), przez WhatsApp lub e-mailem, ponieważ wykonuję zlecenia z dojazdem do klienta. Wizytę w punkcie w Rybnej (ul. Wspólna 2) również trzeba wcześniej umówić. Sklep internetowy działa 24 h.",
};

export const faqTravel = (localities: readonly ServiceLocality[]): FaqItem => ({
	q: "Czy dojeżdżacie do klienta?",
	a:
		localities.length > 0
			? `Tak, w całym Krakowie (wszystkie dzielnice) i okolicach, m.in. ${localitiesTo(localities)}.`
			: "Tak, w całym Krakowie (wszystkie dzielnice) i okolicach.",
});

// --- Klucze samochodowe (odpowiedzi z linkiem – renderuj przez <Faq html />) ---------------------

export const FAQ_CAR_KEY_NO_ORIGINAL: FaqItem = {
	q: "Czy dorobisz klucz samochodowy bez oryginału?",
	a: "Tak. Dekoderem Lishi odczytuję nacięcia zamka, docinam grot i programuję immobilizer.",
};

export const FAQ_VAG: FaqItem = {
	q: "Czy obsługujesz nowe Audi, Volkswagen i Seat?",
	a: "Tak, także roczniki po 2016. Możliwość potwierdzam po modelu, roczniku i VIN.",
};

export const FAQ_LOCKED_KEYS: FaqItem = {
	q: "Co zrobić, gdy kluczyki zatrzasnęły się w aucie?",
	a: 'Zadzwoń: 506 029 980. Otwieram samochód bez uszkodzeń narzędziami Lishi — szczegóły na stronie <a class="text-blue-600 underline" href="/uslugi/klucze-samochodowe/awaryjne-otwieranie-samochodow">awaryjne otwieranie samochodów</a>.',
};
