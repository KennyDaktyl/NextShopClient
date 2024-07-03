"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function ButtonBack() {
	const router = useRouter();
	return (
		<Button
			className="absolute left-0 top-0 z-50 text-gray-500"
			variant="outline"
			onClick={() => router.back()}
		>
			Cofnij
		</Button>
	);
}
