import { type SVGAttributes } from "react";
import { ActiveLink } from "@/components/ui/atoms/ActiveLink";

export async function Footer() {
	return (
		<footer className="flex w-full flex-wrap items-center justify-start bg-neutral-50 p-6 text-neutral-800 md:py-12">
			<div className="container mx-auto flex max-w-7xl flex-wrap justify-center gap-16 text-sm sm:justify-between">
				<nav className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
					<section>
						<h3 className="mb-2 font-semibold">Oferta produktów</h3>
						<ul role="list" className="grid gap-1">
							<li>
								<ActiveLink role="link" href={`/produkty`}>
									Produkty
								</ActiveLink>
							</li>
							<li>
								<ActiveLink role="link" href={`/produkty/pieczatki`}>
									Pieczątki
								</ActiveLink>
							</li>
							<li>
								<ActiveLink role="link" href={`/produkty/klucze`}>
									Klucze
								</ActiveLink>
							</li>
						</ul>
					</section>
					<section className="xl:flex xl:flex-wrap xl:justify-center">
						<h3 className="mb-2 w-full font-semibold xl:text-center">Oferta usługi</h3>
						<ul role="list" className="grid gap-1 xl:text-center">
							<li>
								<ActiveLink role="link" href={`/produkty`}>
									Usługi
								</ActiveLink>
							</li>
							<li>
								<ActiveLink role="link" href={`/produkty/pieczatki`}>
									Programowanie kluczy samochodowych
								</ActiveLink>
							</li>
							<li>
								<ActiveLink role="link" href={`/produkty/klucze`}>
									Kopiowanie immobilizerów
								</ActiveLink>
							</li>
						</ul>
					</section>
					<section className="xl:flex xl:flex-wrap xl:justify-end">
						<h3 className="mb-2 w-full font-semibold xl:text-right">Wsparcie</h3>
						<ul role="list" className="grid w-full gap-1 xl:text-right">
							<li>
								<ActiveLink role="link" href="https://yournextstore.com/#features">
									Regulamin serwisu
								</ActiveLink>
							</li>
							<li>
								<ActiveLink role="link" href="https://yournextstore.com/#pricing">
									Polityka prywatności
								</ActiveLink>
							</li>
							<li>
								<ActiveLink
									role="link"
									href={`mailto:${"michal.pielak81".replace(/\./g, "[dot]")}@gmail.com`.replace(
										/\[dot\]/g,
										".",
									)}
								>
									Wyślij Email
								</ActiveLink>
							</li>
							<li>
								<ActiveLink role="link" href="/kontakt">
									Kontakt z nami
								</ActiveLink>
							</li>
						</ul>
					</section>
				</nav>
			</div>
			<div className="container mx-auto mt-8 flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-neutral-500 md:flex-row">
				<div>
					<p>© 2024 Serwis w Rybnej.</p>
					<p>Produkty i usługi. Lokalny przedsiębiorca.</p>
				</div>
				<div className="flex items-center gap-4">
					<ActiveLink role="link" href="https://www.facebook.com/profile.php?id=100032867754031">
						<FacebookIcon className="h-4 w-4" /> @SerwisWRybnej
						<span className="sr-only">Facebook</span>
					</ActiveLink>
				</div>
			</div>
		</footer>
	);
}

function FacebookIcon(props: SVGAttributes<SVGSVGElement>) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 596 596" fill="none">
			<path
				fill="#fff"
				d="m1 19 230 307L0 577h52l203-219 164 219h177L353 252 568 19h-52L329 221 179 19H1Zm77 38h82l359 481h-81L78 57Z"
			/>
		</svg>
	);
}
