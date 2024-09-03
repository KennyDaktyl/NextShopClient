import { formatMoney } from "@/utils";

const ServicePriceComponent = ({
	currentPrice,
	minPriceLast30,
}: {
	currentPrice: number;
	minPriceLast30: number;
}) => {
	const vatRate = 0.23;
	const netPrice = currentPrice / (1 + vatRate);

	return (
		<div>
			<p className="text:sm font-semibold sm:text-xl">
				Oferta zaczyna się od: {formatMoney(currentPrice)}*
			</p>
			<small className="text:xs sm:sm mb-2">Cena netto: {formatMoney(netPrice)} + VAT 23%</small>
			<small className="mb-4 block">Cena z ostatnich 30 dni: {formatMoney(minPriceLast30)}</small>
		</div>
	);
};

export default ServicePriceComponent;
