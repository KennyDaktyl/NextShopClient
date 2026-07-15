import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface MobileServiceCrossLinkProps {
	href: string;
	label: string;
}

export const MobileServiceCrossLink = ({ href, label }: MobileServiceCrossLinkProps) => {
	return (
		<Link
			href={href}
			className="mt-6 flex items-center justify-between rounded-lg border border-gray-200 p-4 transition hover:border-gray-300 hover:shadow-md"
		>
			<span className="text-sm font-medium sm:text-base">
				Potrzebujesz też: <span className="font-semibold text-blue-600">{label}</span>
			</span>
			<ArrowRight className="h-5 w-5 flex-shrink-0 text-blue-600" aria-hidden="true" />
		</Link>
	);
};

export default MobileServiceCrossLink;
