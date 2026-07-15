import Link from "next/link";
import { MegaMenuSection } from "@/api/getProductsMegaMenu";

interface ProductsMegaMenuContentProps {
	sections: MegaMenuSection[];
	onNavigate?: () => void;
}

export const ProductsMegaMenuContent = ({ sections, onNavigate }: ProductsMegaMenuContentProps) => {
	if (sections.length === 0) {
		return (
			<div className="p-5">
				<Link
					href="/produkty"
					onClick={onNavigate}
					className="font-semibold text-blue-600 hover:underline"
				>
					Zobacz wszystkie produkty →
				</Link>
			</div>
		);
	}

	return (
		<div className="w-[calc(100vw-40px)] p-5 sm:w-[480px]">
			<div className="grid grid-cols-1 gap-x-7 gap-y-1 sm:grid-cols-2">
				{sections.map((section) => (
					<div key={section.full_path} className="mb-2">
						<Link
							href={section.full_path}
							onClick={onNavigate}
							className="block rounded-md px-2.5 py-2 font-semibold text-gray-900 hover:bg-gray-100"
						>
							{section.name}
						</Link>
						{section.subcategories.map((sub) => (
							<Link
								key={sub.full_path}
								href={sub.full_path}
								onClick={onNavigate}
								className="block rounded-md px-2.5 py-2 text-sm text-gray-700 hover:bg-gray-100"
							>
								{sub.item_label || sub.name}
							</Link>
						))}
					</div>
				))}
			</div>
			<Link
				href="/produkty"
				onClick={onNavigate}
				className="mt-2 block border-t border-gray-200 px-2.5 pt-3 font-semibold text-blue-600 hover:underline"
			>
				Zobacz wszystkie produkty →
			</Link>
		</div>
	);
};

export default ProductsMegaMenuContent;
