"use client";

import { useTransition } from "react";
// import { removeItem } from "@/api/carts";

export const RemoveButton = ({ productId }: { productId: number }) => {
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
			className="text-center font-medium text-indigo-600 hover:text-indigo-500 disabled:cursor-wait disabled:text-slate-400"
		>
			Usuń
		</button>
	);
};
