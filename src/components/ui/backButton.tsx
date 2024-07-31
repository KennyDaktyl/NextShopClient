"use client";
import { BackLinkProps } from "@/app/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function ButtonBack(back_link: BackLinkProps) {
	const router = useRouter();

	const handleClick = () => {
		if (back_link.full_path) {
			router.push(back_link.full_path);
		} else {
			router.push("/");
		}
	};

	return (
		<Button
			className="absolute left-0 top-0 z-10 text-gray-500"
			variant="outline"
			onClick={handleClick}
		>
			Cofnij
		</Button>
	);
}
