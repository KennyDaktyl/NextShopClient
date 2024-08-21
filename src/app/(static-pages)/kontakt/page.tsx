// contact-page.tsx (plik główny strony, bez "use client")

import { CompanyDetails } from "@/components/contact/CompanyDetails";
import { ContactFormWithReCaptcha } from "@/components/contact/ContactFormWithReCaptcha";
import { GoogleMap } from "@/components/contact/GoogleMap";
import React from "react";

export async function generateMetadata() {
	return {
		title: `Kontakt do nas`,
		description: "Kontakt do nas. Tu znajdziesz wszystkie informacje kontaktowe.",
	};
}

export default function ContactPage() {
	return (
		<section className="z-10 mx-auto mb-5 mt-5 w-full max-w-screen-xl p-0">
			<h1 className="mb-8 text-center text-3xl font-bold">Kontakt</h1>
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
				<div className="rounded-lg bg-white shadow-md xl:pr-6">
					<h2 className="mb-4 text-2xl font-semibold">Napisz do nas</h2>
					<ContactFormWithReCaptcha />
				</div>

				<div className="space-y-8">
					<CompanyDetails />
					<div className="rounded-lg bg-white shadow-md xl:pl-6">
						<h2 className="mb-4 text-2xl font-semibold">Nasza lokalizacja</h2>
						<GoogleMap />
					</div>
				</div>
			</div>
		</section>
	);
}
