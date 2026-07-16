import Link from "next/link";

export interface AreaCard {
	town: string;
	phrase: string;
	href?: string;
}

interface MobileServiceAreaGridProps {
	title: string;
	description: string;
	areas: AreaCard[];
}

export const MobileServiceAreaGrid = ({ title, description, areas }: MobileServiceAreaGridProps) => {
	return (
		<section className="mt-6">
			<h2 className="mb-3 text-xl font-semibold sm:text-2xl">{title}</h2>
			<p className="mb-6 max-w-3xl text-sm leading-relaxed text-gray-700 sm:text-base">
				{description}
			</p>
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
				{areas.map((area) =>
					area.href ? (
						<Link
							key={area.town}
							href={area.href}
							className="rounded-lg bg-gray-100 p-4 transition hover:bg-gray-200"
						>
							<div className="mb-1 text-sm font-semibold text-blue-700">{area.town}</div>
							<div className="text-xs leading-relaxed text-gray-600">{area.phrase}</div>
						</Link>
					) : (
						<div key={area.town} className="rounded-lg bg-gray-100 p-4">
							<div className="mb-1 text-sm font-semibold">{area.town}</div>
							<div className="text-xs leading-relaxed text-gray-600">{area.phrase}</div>
						</div>
					),
				)}
			</div>
		</section>
	);
};

export default MobileServiceAreaGrid;
