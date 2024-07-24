"use client";
import { BackLinkProps } from "@/app/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function ButtonBack(back_link: BackLinkProps) {
	const router = useRouter();
	return (
		<Button
			className="absolute left-0 top-0 z-50 text-gray-500"
			variant="outline"
			onClick={() => router.push(back_link.full_path)}
		>
			Cofnij
		</Button>
	);
}
