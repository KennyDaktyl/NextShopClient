import { ActiveLink } from "@/components/ui/atoms/ActiveLink";
import React from "react";

export const CompanyDetails: React.FC = () => {
	return (
		<div className="rounded-lg bg-white p-2 shadow-md">
			<h2 className="mb-4 text-2xl font-semibold">Dane Firmowe</h2>
			<p className="mb-2">
				<strong>Adres:</strong> ul. Wspólna 2, 32-061 Rybna
			</p>
			<div className="mb-2">
				<strong>Telefon:</strong>{" "}
				<a href="tel:+48506029980" className="text-blue-500">
					+48 506 029 980
				</a>
			</div>
			<ActiveLink
				role="link"
				href={`mailto:${"michal.pielak81".replace(/\./g, "[dot]")}@gmail.com`.replace(
					/\[dot\]/g,
					".",
				)}
			>
				<p className="mb-2">
					<strong>Wyślij Email</strong>
				</p>
			</ActiveLink>
			<div className="mb-2 flex flex-wrap justify-start">
				<p className="w-full">Michał Pielak Miktel</p>
				<p className="w-full">Nip: 678 280 52 34</p>
				<strong className="w-full">Numer konta bankowego:</strong>
				<p className="w-full">21 1020 2906 0000 1702 0373 8333</p>
			</div>
			<div className="mt-6">
				<h3 className="mb-2 text-xl font-semibold">Godziny Pracy</h3>
				<ul className="space-y-1">
					<li className="flex justify-between">
						<span>Poniedziałek - Piątek:</span>
						<span>08:00 - 17:00</span>
					</li>
					<li className="flex justify-between">
						<span>Sobota:</span>
						<span>Zamknięte</span>
					</li>
					<li className="flex justify-between">
						<span>Niedziela:</span>
						<span>Zamknięte</span>
					</li>
				</ul>
			</div>
		</div>
	);
};
