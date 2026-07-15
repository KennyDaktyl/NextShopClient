import Link from "next/link";

interface MobileServicesMenuContentProps {
	onNavigate?: () => void;
}

export const MobileServicesMenuContent = ({ onNavigate }: MobileServicesMenuContentProps) => {
	return (
		<div className="w-full p-3 sm:w-72">
			<Link
				href="/uslugi/mobilne-dorabianie-kluczy"
				onClick={onNavigate}
				className="flex flex-col gap-0.5 rounded-md px-3 py-2.5 hover:bg-gray-100"
			>
				<span className="font-semibold text-gray-900">Klucze z dojazdem</span>
				<span className="text-xs text-gray-500">Dorabiamy klucze u Ciebie, w 2h</span>
			</Link>
			<Link
				href="/uslugi/mobilne-wyrob-pieczatek"
				onClick={onNavigate}
				className="flex flex-col gap-0.5 rounded-md px-3 py-2.5 hover:bg-gray-100"
			>
				<span className="font-semibold text-gray-900">Pieczątki z dojazdem</span>
				<span className="text-xs text-gray-500">Ekspresowy wyrób z dostawą</span>
			</Link>
			<Link
				href="/zaprojektuj-pieczatke"
				onClick={onNavigate}
				className="mt-1 flex flex-col gap-0.5 rounded-md border-t border-gray-200 px-3 pb-2.5 pt-3 hover:bg-gray-100"
			>
				<span className="font-semibold text-blue-600">Zaprojektuj pieczątkę online</span>
				<span className="text-xs text-gray-500">Własny projekt w kilka minut</span>
			</Link>
			<Link
				href="/uslugi"
				onClick={onNavigate}
				className="mt-1 block rounded-md px-3 py-2 text-sm font-semibold text-blue-600 hover:underline"
			>
				Zobacz wszystkie usługi →
			</Link>
		</div>
	);
};

export default MobileServicesMenuContent;
