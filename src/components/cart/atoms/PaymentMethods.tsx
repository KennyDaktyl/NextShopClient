import Image from "next/image";
import { PaymentMethod } from "@/app/types";
import { useState } from "react";
import { formatMoney } from "@/utils";

interface PaymentMethodsProps {
	paymentMethods: PaymentMethod[];
	onPaymentMethodChange: (method: PaymentMethod) => void;
}

export default function PaymentMethods({
	paymentMethods,
	onPaymentMethodChange,
}: PaymentMethodsProps) {
	const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(paymentMethods[0]);

	const handleChange = (method: PaymentMethod) => {
		setSelectedMethod(method);
		onPaymentMethodChange(method);
	};

	return (
		<div className="mb-4 mt-10">
			<h2 className="w-full text-lg font-semibold">Rodzaj płatności</h2>
			<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
				{paymentMethods.map((method) => (
					<label
						key={method.name}
						className={`flex h-[100px] cursor-pointer items-center rounded-lg border p-4 shadow-md transition-colors duration-200 hover:border-blue-500 ${
							method.id === selectedMethod.id
								? "border-gray-500 bg-gray-50"
								: "border-gray-300 bg-white"
						}`}
						onClick={() => handleChange(method)}
					>
						<input
							type="radio"
							name="paymentMethod"
							checked={method.id === selectedMethod.id}
							onChange={() => handleChange(method)}
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
							{method.payment_on_delivery && (
								<small className="text-gray-600">
									W przypadku wysyłki + {formatMoney(method.price)}
								</small>
							)}
						</div>
					</label>
				))}
			</div>
		</div>
	);
}
