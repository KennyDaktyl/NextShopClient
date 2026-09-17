import Image from "next/image";
import { PaymentMethod } from "@/app/types";
import { formatMoney } from "@/utils";

interface PaymentMethodsProps {
	paymentMethods: PaymentMethod[];
	selectedMethod: PaymentMethod;
	onPaymentMethodChange: (method: PaymentMethod) => void;
	disabled?: boolean;
}

export default function PaymentMethods({
	paymentMethods,
	selectedMethod,
	onPaymentMethodChange,
	disabled = false,
}: PaymentMethodsProps) {
	const handleChange = (method: PaymentMethod) => {
		if (disabled) return;
		onPaymentMethodChange(method);
	};

	return (
		<div className="mb-4 mt-10">
			<h2 className="w-full text-lg font-semibold">Rodzaj płatności</h2>
			{disabled && (
				<p className="mt-1 text-sm text-gray-500">
					Wybór formy płatności jest dostępny tylko dla odbioru osobistego. Dla pozostałych form
					dostawy płatność online jest wybierana automatycznie.
				</p>
			)}
			<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
				{paymentMethods.map((method) => (
					<label
						key={method.name}
						className={`flex h-[100px] items-center rounded-lg border p-4 shadow-md transition-colors duration-200 ${
							disabled ? "cursor-not-allowed" : "cursor-pointer hover:border-blue-500"
						} ${
							method.id === selectedMethod.id
								? "border-gray-500 bg-gray-50"
								: disabled
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
							disabled={disabled}
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
