import OrderInProgresPage from "@/components/cart/atoms/OrderInProgres";

export async function generateMetadata() {
	return {
		title: `Zamówienie w przygotowaniu`,
		description: "Zamówienie w przygotowaniu",
	};
}

export default function Page() {
	return <OrderInProgresPage />;
}
