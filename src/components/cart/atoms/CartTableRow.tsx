"use client";

import { formatMoney } from "@/utils";
import Link from "next/link";
import Image from "next/image";
import { ChangeQuantity } from "@/components/cart/ChangeItemQty";
import { RemoveItemButton } from "@/components/cart/RemoveItemButton";
import { UUID } from "crypto";

interface CartTableRowProps {
	item: any;
	onQuantityChange: (itemId: UUID, newQuantity: number) => void;
	onRemoveItem: (itemId: UUID) => void;
}

export const CartTableRow = ({ item, onQuantityChange, onRemoveItem }: CartTableRowProps) => {
	return (
		<tr className="border border-gray-300">
			<td className="min-w-[300px] px-4 py-2 text-lg">
				<div className="flex h-full items-center">
					<Link
						role="link"
						aria-current="page"
						href={item.url}
						className="h-full hover:text-gray-600"
					>
						<p className="text-md w-full text-left text-sm">{item.name}</p>
						{item.variant && (
							<p className="w-full text-left text-xs text-gray-500">{item.variant}</p>
						)}
						{item.selected_option && (
							<p className="w-full text-left text-xs text-gray-500">{item.selected_option}</p>
						)}
						{item.info && <p className="w-full text-left text-xs text-gray-500">{item.info}</p>}
					</Link>
				</div>
			</td>
			<td className="border border-gray-300 p-1">
				<div className="flex min-h-[90px] w-full items-center justify-center">
					{item.image ? (
						<Image
							src={item.image.url}
							alt={item.image.alt ? item.image.alt : item.name}
							title={item.image.title ? item.image.title : item.name}
							className="max-h-[80px] max-w-[80px] rounded-md object-cover md:max-h-[100px] md:max-w-[100px]"
							height={item.image.height}
							width={item.image.width}
						/>
					) : (
						<div className="flex h-[80px] w-[80px] items-center justify-center rounded-md bg-gray-200">
							<span className="text-center text-xs text-gray-500">No image available</span>
						</div>
					)}
				</div>
			</td>
			<td
				data-testid="product-price"
				className="w-[100px] border border-gray-300 px-4 py-2 text-center"
			>
				<div className="flex flex-wrap items-center justify-center">
					<p className="w-full text-center">{formatMoney(item.price)}</p>
					<span className="mt-1 w-full text-center text-xs">
						{formatMoney(item.price / 1.23)}+23% VAT
					</span>
				</div>
			</td>
			<ChangeQuantity
				itemId={item.item_id}
				quantity={item.quantity}
				availableQuantity={item.available_quantity}
				price={item.price}
				onQuantityChange={onQuantityChange}
			/>
			<td className="w-[100px] border border-gray-300 px-4 py-2 text-center">
				<RemoveItemButton itemId={item.item_id} onRemoveItem={onRemoveItem} />
			</td>
		</tr>
	);
};
