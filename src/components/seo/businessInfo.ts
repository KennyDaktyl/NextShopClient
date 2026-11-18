import { ServiceLocality } from "@/app/types";
import {
	CAR_KEY_PRICE,
	FLAT_KEY_PRICE,
	REMOTE_CODING_PRICE,
	STAMP_PRICE,
} from "@/components/mobile-services/prices";
import { localityTo } from "@/utils";

export const BUSINESS_NAME = "Serwis w Rybnej";
export const BUSINESS_ADDRESS = "ul. Wspólna 2, 32-061 Rybna";
export const BUSINESS_PHONE = "+48 506 029 980";
export const BUSINESS_HOURS = "od poniedziałku do piątku, 8:00–17:00";

export const MAIN_SERVICES: { name: string; path: string; priceFrom: number }[] = [
	{
		name: "Dorabianie kluczy mieszkaniowych",
		path: "/uslugi/mobilne-dorabianie-kluczy",
		priceFrom: FLAT_KEY_PRICE,
	},
	{
		name: "Klucze samochodowe z immobilizerem",
		path: "/uslugi/mobilne-dorabianie-kluczy",
		priceFrom: CAR_KEY_PRICE,
	},
	{
		name: "Piloty do bram garażowych i wjazdowych",
		path: "/uslugi/mobilne-kodowanie-pilotow-do-bram",
		priceFrom: REMOTE_CODING_PRICE,
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
