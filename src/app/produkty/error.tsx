"use client";

import { Button } from "@/components/ui/button";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="mx-auto flex flex-wrap">
			<div className="w-full">
				<h2 className="text-center">Wystąpił błąd z pobraniem listy produktów.</h2>
			</div>
			<Button onClick={() => reset()} className="mx-auto bg-black text-white" size="lg">
				Reset
			</Button>
		</div>
	);
}
