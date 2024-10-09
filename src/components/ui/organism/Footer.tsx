import { type SVGAttributes } from "react";
import { ActiveLink } from "@/components/ui/atoms/ActiveLink";

export function Footer() {
	return (
		<footer className="flex w-full flex-wrap items-center justify-start bg-neutral-50 p-6 text-neutral-800 md:py-12">
			<div className="container mx-auto flex max-w-7xl flex-wrap justify-center gap-16 text-sm sm:justify-between">
				<nav
					className="grid w-full grid-cols-1 gap-8 md:grid-cols-3"
					aria-labelledby="footer-navigation"
				>
					<h2 id="footer-navigation" className="sr-only">
						Nawigacja w stopce
					</h2>
					<section aria-labelledby="product-offer">
						<h3 id="product-offer" className="mb-2 font-semibold">
							Oferta produktów
						</h3>
						<ul role="list" className="grid gap-1">
							<li>
								<ActiveLink role="link" href={`/produkty`} aria-label="Zobacz wszystkie produkty">
									Produkty
								</ActiveLink>
							</li>
							<li>
								<ActiveLink role="link" href={`/produkty/pieczatki`} aria-label="Zobacz pieczątki">
									Pieczątki
								</ActiveLink>
							</li>
							<li>
								<ActiveLink role="link" href={`/produkty/klucze`} aria-label="Zobacz klucze">
									Klucze
								</ActiveLink>
							</li>
						</ul>
					</section>
					<section aria-labelledby="service-offer">
						<h3 id="service-offer" className="mb-2 w-full font-semibold xl:text-center">
							Oferta usługi
						</h3>
						<ul role="list" className="grid gap-1 xl:text-center">
							<li>
								<ActiveLink role="link" href={`/uslugi`} aria-label="Zobacz wszystkie usługi">
									Usługi
								</ActiveLink>
							</li>
							<li>
								<ActiveLink
									role="link"
									href={`/uslugi/klucze-samochodowe/programowanie-kluczy-samochodowych`}
									aria-label="Programowanie kluczy samochodowych"
								>
									Programowanie kluczy samochodowych
								</ActiveLink>
							</li>
							<li>
								<ActiveLink
									role="link"
									href={`/uslugi/klucze-samochodowe/kopiowanie-immobilizerow`}
									aria-label="Kopiowanie immobilizerów"
								>
									Kopiowanie immobilizerów
								</ActiveLink>
							</li>
							<li>
								<ActiveLink
									role="link"
									href={`/uslugi/naprawy-telefonow`}
									aria-label="Naprawa telefonów"
								>
									Naprawa telefonów
								</ActiveLink>
							</li>
						</ul>
					</section>
					<section aria-labelledby="support" className="xl:flex xl:flex-wrap xl:justify-end">
						<h3 id="support" className="mb-2 w-full font-semibold xl:text-right">
							Wsparcie
						</h3>
						<ul role="list" className="grid w-full gap-1 xl:text-right">
							<li>
								<ActiveLink role="link" href="/regulamin" aria-label="Przeczytaj regulamin serwisu">
									Regulamin serwisu
								</ActiveLink>
							</li>
							<li>
								<ActiveLink
									role="link"
									href="/polityka-prywatnosci"
									aria-label="Przeczytaj politykę prywatności"
								>
									Polityka prywatności
								</ActiveLink>
							</li>
							<li>
								<ActiveLink
									role="link"
									href="/dostawa-i-zwroty"
									aria-label="Informacje dotyczące dostaw i zwrotów"
								>
									Dostawa i zwroty
								</ActiveLink>
							</li>
							<li>
								<ActiveLink
									role="link"
									href={`mailto:${"admin".replace(/\./g, "[dot]")}@serwiswrybnej.pl`.replace(
										/\[dot\]/g,
										".",
									)}
									aria-label="Wyślij email do nas"
								>
									Wyślij Email
								</ActiveLink>
							</li>
							<li>
								<ActiveLink
									role="link"
									href="/wysylka-i-uslugi-na-miejscu-w-rybnej"
									aria-label="Informacje dla kogo świadczymy usługi i gdzie"
								>
									Wysyłka i usługi w Rybnej
								</ActiveLink>
							</li>
							<li>
								<ActiveLink role="link" href="/kontakt" aria-label="Skontaktuj się z nami">
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
					<ActiveLink
						role="link"
						href="https://www.facebook.com/profile.php?id=100032867754031"
						aria-label="Przejdź do profilu Facebook Serwis w Rybnej"
					>
						<FacebookIcon className="h-4 w-4" aria-hidden="true" /> @SerwisWRybnej
						<span className="sr-only">Facebook</span>
					</ActiveLink>
				</div>
			</div>
		</footer>
	);
}

function FacebookIcon(props: SVGAttributes<SVGSVGElement>) {
	return (
		<svg {...props} viewBox="0 0 596 596" fill="none" aria-hidden="true">
			<path
				fill="#fff"
				d="m1 19 230 307L0 577h52l203-219 164 219h177L353 252 568 19h-52L329 221 179 19H1Zm77 38h82l359 481h-81L78 57Z"
			/>
		</svg>
	);
}
