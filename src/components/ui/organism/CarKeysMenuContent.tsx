import Link from "next/link";

interface CarKeysMenuContentProps {
	onNavigate?: () => void;
}

const CAR_KEYS = "/uslugi/klucze-samochodowe";

const ITEMS = [
	{
		href: `${CAR_KEYS}/programowanie-kluczy-samochodowych`,
		label: "Programowanie kluczy i pilotów",
		hint: "Przez OBD, z dojazdem do klienta",
	},
	{
		href: `${CAR_KEYS}/kopiowanie-immobilizerow`,
		label: "Kopiowanie immobilizera",
		hint: "Zapasowy klucz z grotem i immobilizerem",
	},
	{
		href: `${CAR_KEYS}/awaryjne-otwieranie-samochodow`,
		label: "Awaryjne otwieranie samochodów",
		hint: "Nowość – bez uszkodzeń, narzędzia Lishi",
	},
	{
		href: `${CAR_KEYS}/programowanie-kluczy-samochodowych`,
		label: "Marki",
		hint: "Audi, Volkswagen, Seat, Opel, Ford, Toyota…",
	},
];

export const CarKeysMenuContent = ({ onNavigate }: CarKeysMenuContentProps) => {
	return (
		<div className="w-full p-3 sm:w-72">
			{ITEMS.map((item) => (
				<Link
					key={item.label}
					href={item.href}
					onClick={onNavigate}
					className="flex flex-col gap-0.5 rounded-md px-3 py-2.5 hover:bg-gray-100"
				>
					<span className="font-semibold text-gray-900">{item.label}</span>
					<span className="text-xs text-gray-500">{item.hint}</span>
				</Link>
			))}
			<Link
				href={CAR_KEYS}
				onClick={onNavigate}
				className="mt-1 block rounded-md px-3 py-2 text-sm font-semibold text-blue-600 hover:underline"
			>
				Wszystkie usługi: klucze samochodowe →
			</Link>
		</div>
	);
};

export default CarKeysMenuContent;
