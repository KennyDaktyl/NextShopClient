import { useState } from "react";
import Image from "next/image";
import { DeliveryMethod } from "@/app/types";
import { formatMoney } from "@/utils";
import {
	DialogTitle,
	DialogContent,
	Dialog,
	DialogHeader,
	DialogClose,
} from "@/components/ui/dialog";
import { InpostGeowidget } from "@/components/cart/atoms/InpostGeoWidget";
import { useFormContext } from "react-hook-form";

interface DeliveryMethodsProps {
	deliveryMethods: DeliveryMethod[];
	onDeliveryMethodChange: (method: DeliveryMethod) => void;
	setInpostBoxId: (id: string) => void;
}

export default function DeliveryMethods({
	deliveryMethods,
	onDeliveryMethodChange,
	setInpostBoxId,
}: DeliveryMethodsProps) {
	const [selectedMethod, setSelectedMethod] = useState<DeliveryMethod>(deliveryMethods[0]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [inpostBox, setInpostBox] = useState("");
	const { setValue } = useFormContext();

	const handleChange = (method: DeliveryMethod) => {
		setSelectedMethod(method);
		onDeliveryMethodChange(method);

		if (method.inpost_box) {
			setIsModalOpen(true);
		} else {
			setInpostBoxId("");
			setValue("inpost_box_id", "");
		}
	};

	const handleCloseModal = () => {
		if (!inpostBox) {
			const defaultMethod = deliveryMethods[0];
			setSelectedMethod(defaultMethod);
			onDeliveryMethodChange(defaultMethod);
		}
		setIsModalOpen(false);
	};

	const onPointCallback = (e: any) => {
		setInpostBox(e.name);
		setInpostBoxId(e.name);
		setValue("inpost_box_id", e.name);
		setIsModalOpen(false);
	};

	return (
		<div className="mb-4 mt-10">
			<h2 className="w-full text-lg font-semibold">Rodzaj dostawy</h2>
			<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
				{deliveryMethods.map((method) => (
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
							name="deliveryMethod"
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
						<div className="flex w-full flex-col">
							<span className="text-sm font-semibold">{method.name}</span>
							{method.inpost_box && inpostBox && (
								<div className="flex w-full justify-start">
									<span className="text-gray-600">Paczkomat: {inpostBox}</span>
								</div>
							)}
							<span className="text-gray-600">
								{method.price_promo !== Number("0.00")
									? formatMoney(method.price_promo)
									: formatMoney(method.price)}
							</span>
						</div>
					</label>
				))}
			</div>

			<Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
				<DialogContent className="max-w-3xl p-4">
					<DialogHeader>
						<DialogTitle>Wybierz paczkomat</DialogTitle>
						<DialogClose className="absolute right-2 top-2">Zamknij</DialogClose>
					</DialogHeader>
					<div className="h-[500px]">
						<InpostGeowidget
							token={process.env.NEXT_PUBLIC_INPOST_API_KEY || ""}
							onPoint={onPointCallback}
							language="pl"
						/>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
