"use client";

import { useEffect, useState } from "react";
import { ProductOption } from "@/app/types";

interface ProductOptionsProps {
	productOption: ProductOption;
	onOptionSelect: (optionId: number, valueId: number) => void;
	onAddToCartSuccess: boolean;
}

export const ProductOptionComponent: React.FC<ProductOptionsProps> = ({
	productOption: option,
	onOptionSelect,
	onAddToCartSuccess,
}) => {
	const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number }>({});

	const handleOptionChange = (optionId: number, valueId: number) => {
		setSelectedOptions((prevSelectedOptions) => ({
			...prevSelectedOptions,
			[optionId]: valueId,
		}));
		onOptionSelect(optionId, valueId);
	};

	useEffect(() => {
		if (onAddToCartSuccess) {
			setSelectedOptions({});
		}
	}, [onAddToCartSuccess]);

	return (
		<div className="product-options mb-4 w-full">
			<div
				key={option.id}
				className="option-group flex w-full flex-wrap items-center justify-start"
			>
				<label className="option-label w-full text-sm font-semibold">
					{option.name}:<span className="text-red-500">*</span>
				</label>
				<select
					value={selectedOptions[option.id] || ""}
					onChange={(e) => handleOptionChange(option.id, parseInt(e.target.value))}
					className="option-select"
				>
					<option value="" disabled>
						Wybierz opcję
					</option>
					{option.options.map((value) => (
						<option key={value.id} value={value.id}>
							{value.name}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default ProductOptionComponent;
