import { Order } from "@/app/types";
import OrderDetails from "@/components/orders/OrderDetails";

interface OrderDetailsByUidProps {
	order: Order | null;
}

export default function OrderDetailsByUid({ order }: OrderDetailsByUidProps) {
	if (!order) {
		return <div>Nie znaleziono zamówienia.</div>;
	}

	return (
		<div className="flex h-full w-full flex-col items-center justify-center">
			<h1 className="text-3xl font-bold">Szczegóły zamówienia {order.order_number}</h1>
			<OrderDetails order={order} />
		</div>
	);
}
