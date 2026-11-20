import { ServiceLocality } from "@/app/types";
import {
	CAR_KEY_PRICE,
	FLAT_KEY_PRICE,
	OBD_PROGRAMMING_PRICE,
	REMOTE_CODING_PRICE,
	STAMP_PRICE,
} from "@/components/mobile-services/prices";
import { localityTo } from "@/utils";

export const BUSINESS_NAME = "Serwis w Rybnej";
export const BUSINESS_ADDRESS = "ul. Wspólna 2, 32-061 Rybna";
export const BUSINESS_PHONE = "+48 506 029 980";
// Opis całej witryny (JSON-LD WebSite) – z polskimi znakami, bez zależności od zmiennej środowiskowej.
export const SITE_DESCRIPTION =
	"Klucze samochodowe, immobilizery i piloty z dojazdem – Kraków i okolice. Punkt w Rybnej.";
// Brak stałych godzin otwarcia – wizyty (także w punkcie w Rybnej) tylko po umówieniu.
export const BUSINESS_APPOINTMENT_NOTE =
	"Proszę o umówienie wizyty, ponieważ wykonuję zlecenia z dojazdem do klienta.";

export const MAIN_SERVICES: { name: string; path: string; priceFrom: number }[] = [
	{
		name: "Klucz samochodowy z grotem i immobilizerem",
		path: "/uslugi/klucze-samochodowe/kopiowanie-immobilizerow",
		priceFrom: CAR_KEY_PRICE,
	},
	{
		name: "Programowanie kluczy i pilotów samochodowych przez OBD (+ koszt pilota)",
		path: "/uslugi/klucze-samochodowe/programowanie-kluczy-samochodowych",
		priceFrom: OBD_PROGRAMMING_PRICE,
	},
	{
		name: "Piloty do bram garażowych i wjazdowych",
		path: "/uslugi/mobilne-kodowanie-pilotow-do-bram",
		priceFrom: REMOTE_CODING_PRICE,
	},
	{
		name: "Dorabianie kluczy mieszkaniowych",
		path: "/uslugi/mobilne-dorabianie-kluczy",
		priceFrom: FLAT_KEY_PRICE,
	},
	{ name: "Wyrób pieczątek", path: "/uslugi/mobilne-wyrob-pieczatek", priceFrom: STAMP_PRICE },
];

/** „a, b i c” */
export const joinPolish = (items: readonly string[]): string =>
	items.length <= 1
		? (items[0] ?? "")
		: `${items.slice(0, -1).join(", ")} i ${items[items.length - 1]}`;

/** „do Krzeszowic, do Alwerni i na Krowodrzę” – odmiana z pól ServiceLocality. */
export const localitiesTo = (localities: readonly ServiceLocality[]): string =>
	joinPolish(localities.map(localityTo));
