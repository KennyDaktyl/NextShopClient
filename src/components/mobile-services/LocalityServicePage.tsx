import Link from "next/link";
import { formatMoney } from "@/utils";
import { MenuItemsResponse, ProductListItem, ServiceLocality } from "@/app/types";
import CityDeliveryIllustration from "@/components/mobile-services/CityDeliveryIllustration";
import MobileServiceContactBar from "@/components/mobile-services/MobileServiceContactBar";
import KeyPhotoInquiry from "@/components/widgets/KeyPhotoInquiry/KeyPhotoInquiry";
import StampDesigner from "@/components/widgets/StampDesigner/StampDesigner";

export type LocalityServiceType = "klucze" | "pieczatki";

const DEFAULT_DELIVERY_TIME_HOURS = 2;
const DEFAULT_MIN_KEYS_QTY = 3;
const DEFAULT_MIN_STAMP_ORDER_VALUE = 100;

const SERVICE_COPY: Record<
	LocalityServiceType,
	{
		parentSlug: string;
		parentLabel: string;
		siblingSlug: string;
		siblingLabel: string;
		h1: (locality: string) => string;
		heroVerb: string;
		widgetTitle: string;
		widgetIntro: string;
	}
> = {
	klucze: {
		parentSlug: "mobilne-dorabianie-kluczy",
		parentLabel: "Mobilne dorabianie kluczy",
		siblingSlug: "mobilne-wyrob-pieczatek",
		siblingLabel: "Mobilne pieczątki",
		h1: (locality) => `Dorabianie kluczy z dojazdem — ${locality}`,
		heroVerb: "dorabiam klucze",
		widgetTitle: "Sprawdź, czy dorobimy Twój klucz",
		widgetIntro:
			"Nie wiesz, czy mamy odpowiednią ostrugę? Wyślij zdjęcie klucza, a ocenimy to jeszcze przed Twoim zamówieniem.",
	},
	pieczatki: {
		parentSlug: "mobilne-wyrob-pieczatek",
		parentLabel: "Mobilne pieczątki",
		siblingSlug: "mobilne-dorabianie-kluczy",
		siblingLabel: "Mobilne dorabianie kluczy",
		h1: (locality) => `Mobilny wyrób pieczątek — dojazd do: ${locality}`,
		heroVerb: "wykonuję pieczątki",
		widgetTitle: "Zaprojektuj pieczątkę online",
		widgetIntro:
			"Zbuduj treść pieczątki linia po linii i wyślij projekt do wyceny — bez wychodzenia z domu.",
	},
};

interface LocalityServicePageProps {
	serviceType: LocalityServiceType;
	locality: ServiceLocality;
	otherLocalities: ServiceLocality[];
	menuItems: MenuItemsResponse;
	products: ProductListItem[];
}

export const LocalityServicePage = ({
	serviceType,
	locality,
	otherLocalities,
	menuItems,
	products,
}: LocalityServicePageProps) => {
	const copy = SERVICE_COPY[serviceType];
	const settings = menuItems.mobile_service_settings;
	const deliveryTimeHours = settings?.delivery_time_hours ?? DEFAULT_DELIVERY_TIME_HOURS;
	const deliveryTimeLabel = `${deliveryTimeHours} ${deliveryTimeHours === 1 ? "godziny" : "godzin"}`;
	const minKeysQty = settings?.min_keys_qty ?? DEFAULT_MIN_KEYS_QTY;
	const minStampOrderValue = settings?.min_stamp_order_value ?? DEFAULT_MIN_STAMP_ORDER_VALUE;

	return (
		<div className="mb-10 w-full">
			<section className="rounded-lg bg-gray-100 p-6 sm:p-10">
				<div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
					<div>
						<p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
							{locality.region_label}
						</p>
						<h1 className="mb-4 text-2xl font-bold leading-tight sm:text-3xl">
							{copy.h1(locality.name)}
						</h1>
						<p className="mb-3 text-base leading-relaxed text-gray-700">
							Na terenie miejscowości {locality.name} {copy.heroVerb} z dojazdem — przyjeżdżam pod
							wskazany adres z pełnym, przenośnym wyposażeniem i wykonuję usługę na miejscu, bez
							konieczności wizyty w punkcie stacjonarnym w Rybnej. Dojazd zajmuje zwykle do{" "}
							{deliveryTimeLabel} od zgłoszenia.
						</p>
						<p className="mb-5 text-sm leading-relaxed text-gray-600">{locality.local_note}</p>
						<div className="flex flex-wrap gap-3">
							<a
								href={`tel:+48${settings?.phone_number || "506029980"}`}
								className="rounded-md bg-gray-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-900"
							>
								Zadzwoń: {(settings?.phone_number || "506029980").replace(/(\d{3})(?=\d)/g, "$1 ")}
							</a>
							<a
								href={settings?.whatsapp_url || "https://wa.me/48506029980"}
								target="_blank"
								rel="noopener noreferrer"
								className="rounded-md bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1ea952]"
							>
								WhatsApp
							</a>
						</div>
					</div>
					<div className="h-48 sm:h-64">
						<CityDeliveryIllustration />
					</div>
				</div>
			</section>

			<section className="mt-8 rounded-lg border border-gray-200 p-6 sm:p-8">
				<h2 className="mb-4 text-xl font-semibold sm:text-2xl">
					Jak działamy w {locality.name}?
				</h2>
				<p className="mb-3 text-sm leading-relaxed text-gray-700">
					Dzwonisz lub piszesz z zapytaniem, ustalamy dogodny termin, a ja osobiście przyjeżdżam pod
					wskazany adres w {locality.name} z przenośnym sprzętem. Usługę wykonuję na Twoich oczach —
					sprawdzasz efekt, zanim zapłacisz. Płatność dopiero po wykonaniu, gotówką lub kartą. Nie
					musisz nigdzie jechać ani tracić czasu na szukanie punktu stacjonarnego.
				</p>
				{serviceType === "klucze" ? (
					<p className="text-sm leading-relaxed text-gray-700">
						Dorabiam zarówno klucze mieszkaniowe (do drzwi, piwnic, skrzynek pocztowych), jak i
						samochodowe — w tym z transponderem. Jeśli potrzebujesz też{" "}
						<Link href="/uslugi/programowanie-kluczy-samochodowych" className="underline">
							zaprogramowania pilota
						</Link>{" "}
						lub{" "}
						<Link href="/uslugi/kopiowanie-immobilizerow" className="underline">
							skopiowania immobilizera
						</Link>
						, wykonuję to tym samym przyjazdem.
					</p>
				) : (
					<p className="text-sm leading-relaxed text-gray-700">
						Wykonuję pieczątki firmowe, imienne oraz personalizowane — treść możesz zaprojektować
						wcześniej online (widget poniżej) albo ustalić na miejscu, przy dojeździe.
					</p>
				)}
			</section>

			<section className="mt-8 rounded-lg border border-gray-200 p-6 sm:p-8">
				<h2 className="mb-1 text-xl font-semibold sm:text-2xl">{copy.widgetTitle}</h2>
				<p className="mb-5 text-sm text-gray-600">{copy.widgetIntro}</p>
				{serviceType === "klucze" ? <KeyPhotoInquiry /> : <StampDesigner variant="embedded" />}
			</section>

			<MobileServiceContactBar
				title={`Zamów ${serviceType === "klucze" ? "dorobienie kluczy" : "pieczątkę"} z dojazdem do: ${locality.name}`}
				phoneNumber={settings?.phone_number}
				whatsappUrl={settings?.whatsapp_url}
				messengerUrl={settings?.messenger_url}
			/>

			{products.length > 0 && (
				<section className="mt-8">
					<h2 className="mb-5 text-xl font-semibold sm:text-2xl">
						{serviceType === "klucze" ? "Jakie klucze dorabiamy z dojazdem" : "Pieczątki — wybierz rodzaj"}
					</h2>
					<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
						{products.map((product) => (
							<Link
								key={product.id}
								href={product.full_path}
								className="rounded-lg border border-gray-200 p-5 shadow-sm transition hover:border-gray-300 hover:shadow-md"
							>
								<h3 className="mb-2 text-base font-semibold">{product.name}</h3>
								<p className="mb-3 text-sm leading-relaxed text-gray-600">{product.description}</p>
								<div className="text-sm font-bold">od {formatMoney(product.current_price)}</div>
							</Link>
						))}
					</div>
				</section>
			)}

			<section className="mt-8 rounded-lg bg-gray-100 p-6 sm:p-8">
				<h2 className="mb-1 text-xl font-semibold sm:text-2xl">Minimum logistyczne na dojazd</h2>
				<p className="text-sm leading-relaxed text-gray-600">
					{serviceType === "klucze" ? (
						<>
							Dojazd do {locality.name} bez dodatkowej opłaty przy zamówieniu od {minKeysQty} szt.
							kluczy — przy mniejszej liczbie doliczamy opłatę logistyczną, zapytaj przy zgłoszeniu.
						</>
					) : (
						<>
							Dojazd do {locality.name} bez dodatkowej opłaty przy zamówieniu od{" "}
							{formatMoney(minStampOrderValue)} — poniżej tej kwoty doliczamy opłatę za dojazd.
						</>
					)}
				</p>
			</section>

			<section className="mt-8">
				<h2 className="mb-4 text-xl font-semibold sm:text-2xl">
					Dojeżdżam też do innych miejscowości
				</h2>
				<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
					{otherLocalities.map((other) => (
						<Link
							key={other.slug}
							href={`/uslugi/${copy.parentSlug}-${other.slug}`}
							className="rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium transition hover:border-gray-300 hover:shadow-sm"
						>
							{other.name}
						</Link>
					))}
				</div>
			</section>

			<Link
				href={`/uslugi/${copy.parentSlug}`}
				className="mt-6 flex items-center justify-between rounded-lg border border-gray-200 p-4 transition hover:border-gray-300 hover:shadow-md"
			>
				<span className="text-sm font-medium sm:text-base">
					Zobacz pełną ofertę: <span className="font-semibold text-blue-600">{copy.parentLabel}</span>
				</span>
			</Link>
			<Link
				href={`/uslugi/${copy.siblingSlug}-${locality.slug}`}
				className="mt-3 flex items-center justify-between rounded-lg border border-gray-200 p-4 transition hover:border-gray-300 hover:shadow-md"
			>
				<span className="text-sm font-medium sm:text-base">
					Potrzebujesz też: <span className="font-semibold text-blue-600">{copy.siblingLabel} — {locality.name}</span>
				</span>
			</Link>
		</div>
	);
};

export default LocalityServicePage;
