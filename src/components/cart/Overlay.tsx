"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Overlay({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	return (
		<div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-black bg-opacity-50">
			<aside className="z-60 absolute right-0 top-0 h-screen w-full max-w-sm overflow-y-auto bg-white p-2">
				<Button
					onClick={() => {
						router.back();
					}}
					className="flex items-center justify-center bg-opacity-50"
					variant="outline"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="mr-2 h-6 w-6 dark:text-gray-800"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
					<span className="dark:text-gray-800">Zamknij podgląd</span>
				</Button>
				{children}
			</aside>
		</div>
	);
}
