import { ActiveLink } from "@/components/ui/atoms/ActiveLink";

export async function generateMetadata() {
	return {
		title: `Polityka prywatności.`,
		description:
			"Polityka prywatności. Tutaj znajdziesz informacje o tym, jakie dane przechowujemy i w jaki sposób je wykorzystujemy.",
		alternates: {
			canonical: "/polityka-prywatnosci",
		},
		robots: "no-index, no-follow",
	};
}

export default function Page() {
	return (
		<div className="container mx-auto px-4 py-6">
			<h1 className="mb-4 text-2xl font-bold">Polityka Prywatności</h1>

			<p className="mb-4">
				Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych,
				przekazanych przez Użytkowników w związku z korzystaniem przez nich z serwisu internetowego{" "}
				<a href="https://serwiswrybnej.pl" className="text-blue-500 underline">
					serwiswrybnej.pl
				</a>
				.
			</p>

			<h2 className="mb-4 mt-6 w-full text-center text-xl font-semibold">
				§ 1 Postanowienia ogólne
			</h2>
			<p className="mb-4">
				1. Administratorem danych osobowych zawartych w serwisie{" "}
				<a href="https://serwiswrybnej.pl" className="text-blue-500 underline">
					serwiswrybnej.pl
				</a>{" "}
				jest Michał Pielak prowadzący działalność gospodarczą pod firmą Miktel Michał Pielak z
				siedzibą w Rybnej, ul. Wspólna 2, 32-061, NIP 678-280-52-34, REGON 120171088.
			</p>
			<p className="mb-4">
				2. Administrator przetwarza dane osobowe Użytkowników zgodnie z obowiązującymi przepisami
				prawa, w tym z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27
				kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych
				osobowych i w sprawie swobodnego przepływu takich danych (RODO).
			</p>
			<p className="mb-4">
				3. Administrator dokłada szczególnej staranności w celu ochrony interesów osób, których dane
				dotyczą, a w szczególności zapewnia, że dane osobowe są:
			</p>
			<ul className="mb-4 ml-6 list-disc">
				<li>a. przetwarzane zgodnie z prawem;</li>
				<li>
					b. zbierane dla oznaczonych, zgodnych z prawem celów i niepoddawane dalszemu przetwarzaniu
					niezgodnemu z tymi celami;
				</li>
				<li>
					c. merytorycznie poprawne i adekwatne w stosunku do celów, w jakich są przetwarzane;
				</li>
				<li>
					d. przechowywane w formie umożliwiającej identyfikację osób, których dotyczą, nie dłużej
					niż jest to niezbędne do osiągnięcia celu przetwarzania.
				</li>
			</ul>

			<h2 className="mb-4 mt-6 w-full text-center text-xl font-semibold">
				§ 2 Cel przetwarzania danych
			</h2>
			<p className="mb-4">1. Dane osobowe Użytkowników zbierane są w celu:</p>
			<ul className="mb-4 ml-6 list-disc">
				<li>
					a. realizacji zamówień składanych za pośrednictwem sklepu internetowego serwiswrybnej.pl;
				</li>
				<li>b. zawarcia i realizacji umowy sprzedaży produktów oferowanych przez sklep;</li>
				<li>
					c. realizacji obowiązków wynikających z przepisów prawa, w tym wystawiania faktur i innych
					dokumentów księgowych;
				</li>
				<li>
					d. marketingu bezpośredniego własnych produktów i usług, jeżeli Użytkownik wyrazi na to
					zgodę.
				</li>
			</ul>

			<h2 className="mb-4 mt-6 w-full text-center text-xl font-semibold">
				§ 3 Rodzaj zbieranych danych
			</h2>
			<p className="mb-4">1. Administrator przetwarza następujące dane osobowe Użytkowników:</p>
			<ul className="mb-4 ml-6 list-disc">
				<li>a. imię i nazwisko;</li>
				<li>b. adres zamieszkania/siedziby;</li>
				<li>c. adres e-mail;</li>
				<li>d. numer telefonu;</li>
				<li>e. dane do faktury (NIP, nazwa firmy);</li>
			</ul>

			<h2 className="mb-4 mt-6 w-full text-center text-xl font-semibold">
				§ 4 Podstawy prawne przetwarzania danych
			</h2>
			<p className="mb-4">
				1. Przetwarzanie danych osobowych odbywa się na podstawie zgody wyrażonej przez Użytkownika
				lub w przypadkach, gdy przepisy prawa uprawniają Administratora do przetwarzania danych
				osobowych.
			</p>
			<p className="mb-4">
				2. Użytkownik ma prawo do cofnięcia zgody na przetwarzanie danych osobowych w dowolnym
				momencie, co nie wpływa na zgodność z prawem przetwarzania, którego dokonano na podstawie
				zgody przed jej cofnięciem.
			</p>

			<h2 className="mb-4 mt-6 w-full text-center text-xl font-semibold">
				§ 5 Udostępnianie danych
			</h2>
			<p className="mb-4">
				1. Dane osobowe Użytkowników mogą być udostępniane podmiotom trzecim wyłącznie w zakresie
				niezbędnym do realizacji zamówień (np. firmy kurierskie) lub na podstawie obowiązujących
				przepisów prawa.
			</p>
			<p className="mb-4">
				2. Dane osobowe Użytkowników nie są przekazywane poza Europejski Obszar Gospodarczy (EOG).
			</p>

			<h2 className="mb-4 mt-6 w-full text-center text-xl font-semibold">
				§ 6 Okres przechowywania danych
			</h2>
			<p className="mb-4">
				1. Dane osobowe Użytkowników będą przechowywane przez okres niezbędny do realizacji
				zamówień, a także zgodnie z obowiązującymi przepisami dotyczącymi przechowywania dokumentów
				księgowych oraz roszczeń wynikających z umów.
			</p>

			<h2 className="mb-4 mt-6 w-full text-center text-xl font-semibold">§ 7 Prawa Użytkowników</h2>
			<p className="mb-4">
				1. Użytkownik ma prawo dostępu do treści swoich danych osobowych, ich poprawiania, usuwania
				lub ograniczenia przetwarzania.
			</p>
			<p className="mb-4">
				2. Użytkownik ma prawo do wniesienia sprzeciwu wobec przetwarzania jego danych osobowych
				oraz prawo do przenoszenia danych.
			</p>
			<p className="mb-4">
				3. W przypadku naruszenia przepisów o ochronie danych osobowych, Użytkownik ma prawo
				wniesienia skargi do organu nadzorczego (Prezesa Urzędu Ochrony Danych Osobowych).
			</p>

			<h2 className="mb-4 mt-6 w-full text-center text-xl font-semibold">
				§ 8 Zmiany Polityki Prywatności
			</h2>
			<p className="mb-4">
				1. Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej Polityce
				Prywatności. Zmiany będą publikowane na stronie internetowej{" "}
				<a href="https://serwiswrybnej.pl" className="text-blue-500 underline">
					serwiswrybnej.pl
				</a>
				.
			</p>

			<h2 className="mb-4 mt-6 w-full text-center text-xl font-semibold">§ 9 Kontakt</h2>
			<p className="mb-4">
				1. W sprawach związanych z Polityką Prywatności, Użytkownik może skontaktować się z
				Administratorem poprzez e-mail:{" "}
				<ActiveLink
					role="link"
					href={`mailto:${"michal.pielak81".replace(/\./g, "[dot]")}@gmail.com`.replace(
						/\[dot\]/g,
						".",
					)}
					aria-label="Wyślij email do nas"
				>
					Wyślij Email{" "}
				</ActiveLink>
				lub listownie na adres siedziby: ul. Wspólna 2, 32-061 Rybna.
			</p>
		</div>
	);
}
