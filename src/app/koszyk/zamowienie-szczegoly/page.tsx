import OrderDetailsByUid from "@/components/cart/atoms/OrderDetailsByUid";

export async function generateMetadata() {
	return {
		title: `Szczegóły zamówienia.`,
		description: "Szczegóły zamówienia.",
	};
}

export default function Page() {
	return <OrderDetailsByUid />;
}
