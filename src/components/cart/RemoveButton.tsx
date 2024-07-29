"use client";

import { useTransition } from "react";
// import { removeItem } from "@/api/carts";

export const RemoveButton = ({ cartId, productId }: { cartId: string; productId: string }) => {
	const [isPending, startTransition] = useTransition();

	return (
		<button
			disabled={isPending}
			// onClick={() =>
			// 	startTransition(async () => {
			// 		await removeItem(cartId, productId);
			// 		window.location.reload();
			// 	})
			// }
			className="text-sm font-medium text-indigo-600 hover:text-indigo-500 disabled:cursor-wait disabled:text-slate-400"
		>
			Remove
		</button>
	);
};
