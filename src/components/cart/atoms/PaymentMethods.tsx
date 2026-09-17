import Image from "next/image";
import { PaymentMethod } from "@/app/types";

interface PaymentMethodsProps {
	paymentMethods: PaymentMethod[];
	selectedMethod: PaymentMethod;
	onPaymentMethodChange: (method: PaymentMethod) => void;
	isPickupSelected: boolean;
}

export default function PaymentMethods({
	paymentMethods,
	selectedMethod,
	onPaymentMethodChange,
	isPickupSelected,
}: PaymentMethodsProps) {
	const isMethodDisabled = (method: PaymentMethod) => method.payment_on_delivery && !isPickupSelected;

	const handleChange = (method: PaymentMethod) => {
		if (isMethodDisabled(method)) return;
		onPaymentMethodChange(method);
	};

	return (
		<div className="mb-4 mt-10">
			<h2 className="w-full text-lg font-semibold">Rodzaj płatności</h2>
			<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
				{paymentMethods.map((method) => {
					const methodDisabled = isMethodDisabled(method);
					return (
						<label
							key={method.name}
							className={`flex h-[100px] items-center rounded-lg border p-4 shadow-md transition-colors duration-200 ${
								methodDisabled ? "cursor-not-allowed" : "cursor-pointer hover:border-blue-500"
							} ${
								method.id === selectedMethod.id
									? "border-gray-500 bg-gray-50"
									: methodDisabled
										? "border-gray-200 bg-gray-100 opacity-60"
										: "border-gray-300 bg-white"
							}`}
							onClick={() => handleChange(method)}
						>
							<input
								type="radio"
								name="paymentMethod"
								checked={method.id === selectedMethod.id}
								onChange={() => handleChange(method)}
								disabled={methodDisabled}
								className="shadcn-ui-radio mr-4"
								value={method.id}
							/>
							{method.image && (
								<Image
									src={method.image.url}
									alt={method.image.alt || method.name}
									title={method.image.title || method.name}
									width={method.image.width}
									height={method.image.height}
									className="mr-4 rounded-md"
								/>
							)}
							<div className="flex flex-col">
								<span className="text-sm font-semibold">{method.name}</span>
								{methodDisabled && (
									<small className="text-gray-600">Dostępne tylko przy odbiorze osobistym</small>
								)}
							</div>
						</label>
					);
				})}
			</div>
		</div>
	);
}
