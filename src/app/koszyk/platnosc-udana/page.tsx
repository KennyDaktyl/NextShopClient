import PaymentSuccess from "@/components/cart/atoms/PaymentSuccess";

export async function generateMetadata() {
	return {
		title: `Płatność udana.`,
		description: "Płatność udana.",
	};
}

export default function Page() {
	return <PaymentSuccess />;
}
