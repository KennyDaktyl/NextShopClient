import { formatMoney } from "@/utils";

const PriceComponent = ({
	currentPrice,
	minPriceLast30,
}: {
	currentPrice: number;
	minPriceLast30: number;
}) => (
	<div>
		<p className="mb-1 text-xl font-semibold">Cena: {formatMoney(currentPrice)}</p>
		<small className="mb-4 block">Cena z ostatnich 30 dni: {formatMoney(minPriceLast30)}</small>
	</div>
);

export default PriceComponent;
