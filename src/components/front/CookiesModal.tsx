"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { DialogTitle } from "@radix-ui/react-dialog";

// Funkcja do odczytywania ciasteczek
const getCookie = (name: string) => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop()?.split(";").shift();
	return null;
};

export default function CookiesModal() {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const cookiesAccepted = getCookie("cookies_accepted");
		if (!cookiesAccepted) {
			setOpen(true);
		}
	}, []);

	const handleAccept = () => {
		document.cookie = "cookies_accepted=true; path=/; max-age=" + 60 * 60 * 24 * 365;
		setOpen(false);
	};

	const handleDecline = () => {
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="max-w-md rounded-lg bg-white p-6 shadow-md">
				<DialogHeader>
					<DialogTitle className="text-lg font-semibold">Akceptuj Pliki Cookies</DialogTitle>
				</DialogHeader>
				<p className="my-4 text-sm text-gray-600">
					Używamy plików cookies, aby zapewnić jak najlepsze doświadczenia na naszej stronie. Więcej
					informacji znajdziesz w naszej
					<Link href="/polityka-prywatnosci" className="ml-1 text-blue-600 hover:underline">
						Polityce prywatności
					</Link>
					.
				</p>
				<DialogFooter className="flex justify-between">
					<Button
						onClick={handleDecline}
						variant={"destructive"}
						className="flex items-center rounded-md px-4 py-2"
					>
						<XIcon className="mr-2 h-5 w-5" />
						Odrzuć
					</Button>
					<Button onClick={handleAccept} className="flex items-center rounded-md px-4 py-2">
						<CheckIcon className="mr-2 h-5 w-5" />
						Akceptuj
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
