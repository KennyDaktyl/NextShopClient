import { Variant } from "@/app/types";
import { Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { Badge } from "@/components/ui/badge";

const COLOR_CLASSES: { [key: string]: string } = {
	"Brak koloru": "bg-white border-black text-gray-800",
	Biały: "bg-white text-gray-800",
	Szary: "bg-gray-500 text-white",
	Czerwony: "bg-red-500 text-white",
	Niebieski: "bg-blue-500 text-white",
	Zielony: "bg-green-500 text-white",
	Żółty: "bg-yellow-500 text-gray-800",
	Pomarańczowy: "bg-orange-500 text-white",
	Brązowy: "bg-brown-500 text-white",
	Różowy: "bg-pink-500 text-white",
	Fioletowy: "bg-purple-500 text-white",
	Beżowy: "bg-orange-100 text-gray-800",
	Czarny: "bg-black text-white",
};

const ColorVariantsComponent = ({
	variants,
	label,
	onHandleClick,
}: {
	variants: Variant[];
	label: string;
	onHandleClick: (variant: Variant) => void;
}) => (
	<div className="mt-1 flex flex-wrap">
		<span className="w-full text-sm font-semibold uppercase">{label}</span>
		{variants.map((variant) => (
			<Tooltip key={variant.id}>
				<TooltipTrigger asChild>
					<div className="m-0 p-0">
						<Badge
							className={`mb-2 mr-2 cursor-pointer rounded-full ${COLOR_CLASSES[variant.color]}`}
							onClick={() => onHandleClick(variant)}
						></Badge>
					</div>
				</TooltipTrigger>
				<TooltipContent className="z-10 rounded bg-gray-800 px-2 py-1 text-xs text-white">
					{variant.name}
				</TooltipContent>
			</Tooltip>
		))}
	</div>
);

export default ColorVariantsComponent;
