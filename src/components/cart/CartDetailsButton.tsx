import { formatMoney } from "@/utils";

export function CartDetailsButton({ totalPrice }: { totalPrice: number }) {
	return (
		<a className="w-full" href="/cart">
			<button className="mx-auto mt-4 w-full rounded-lg border bg-slate-950 py-2 text-white shadow transition-colors hover:bg-slate-800 dark:text-white">
				Go to card&nbsp;{formatMoney(totalPrice / 100)}
			</button>
		</a>
	);
}
