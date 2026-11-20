import { FAQPage, WithContext } from "schema-dts";
import { ServiceLocality } from "@/app/types";
import { JsonLd } from "@/components/seo/LdJson";
import { CAR_KEY_PRICE, FLAT_KEY_PRICE } from "@/components/mobile-services/prices";
import { BUSINESS_ADDRESS, BUSINESS_HOURS, localitiesTo } from "@/components/seo/businessInfo";

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

export const FAQ_CAR_KEY: FaqItem = {
	q: "Ile kosztuje dorobienie klucza samochodowego z immobilizerem?",
	a: `Od ${CAR_KEY_PRICE} zł, klucz kodujemy na miejscu.`,
};

export const FAQ_OPENING_HOURS: FaqItem = {
	q: "W jakich godzinach działa punkt w Rybnej?",
	a: `${BUSINESS_HOURS.charAt(0).toUpperCase()}${BUSINESS_HOURS.slice(1)}, ${BUSINESS_ADDRESS}.`,
};

export const faqTravel = (localities: readonly ServiceLocality[]): FaqItem => ({
	q: "Czy dojeżdżacie do klienta?",
	a:
		localities.length > 0
			? `Tak, dojeżdżamy na terenie Krakowa i okolic, m.in. ${localitiesTo(localities)}.`
			: "Tak, dojeżdżamy na terenie Krakowa i okolic.",
});
