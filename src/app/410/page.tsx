import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "410 - Produkt usunięty",
	description:
		"Produkt, którego szukasz, został usunięty z naszej oferty. Wróć do listy produktów, aby zobaczyć inne dostępne opcje.",
	robots: "noindex, nofollow",
};

// Strona 410
export default function Custom410() {
	return (
		<div className="mt-5 flex h-[300px] flex-col items-center justify-center bg-gray-50 p-6">
			<h1 className="text-5xl font-bold">410 - Produkt usunięty</h1>
			<p className="mt-4 text-lg text-gray-700">
				Produkt, którego szukasz, został usunięty z naszej oferty lub nie jest już dostępny.
			</p>
			<p className="mt-2 text-gray-500">
				Zapraszamy do przeglądania innych produktów. Możliwe, że znajdziesz coś, co spełni Twoje
				oczekiwania.
			</p>
			<div className="mt-6">
				<Link href="/produkty">
					<Button className="text-white">Przejdź do listy produktów</Button>
				</Link>
			</div>
			<div className="mt-10 text-gray-400">
				<p>
					Jeżeli masz pytania,{" "}
					<Link href="/kontakt" className="underline hover:text-blue-600">
						skontaktuj się z nami
					</Link>
					.
				</p>
			</div>
		</div>
	);
}
