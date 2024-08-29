import PaymentFailed from "@/components/cart/atoms/PaymentFailed";

export async function generateMetadata() {
	return {
		title: `Płatność anulowana.`,
		description: "Płatność anulowana.",
	};
}

export default function Page() {
	return <PaymentFailed />;
}
