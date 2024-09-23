import { ActiveLink } from "@/components/ui/atoms/ActiveLink";

export async function generateMetadata() {
	return {
		title: `Regulamin sklepu internetowego.`,
		description: "Regulamin sklepu internetowego. Zasady korzystania z serwisu.",
		alternates: {
			canonical: "/requlamin",
		},
		robots: "no-index, no-follow",
	};
}

export default function Page() {
	return (
		<div className="container mx-auto px-4 py-6">
			<h1 className="mb-4 text-2xl font-bold">REGULAMIN SKLEPU INTERNETOWEGO</h1>

			<h2 className="mb-4 mt-6 w-full text-center text-xl font-semibold">
				§ 1 POSTANOWIENIA WSTĘPNE
			</h2>
			<p className="mb-4">
				1. Sklep internetowy Miktel Michał Pielak, dostępny pod adresem internetowym{" "}
				<a href="https://serwiswrybnej.pl" className="text-blue-500 underline">
					serwiswrybnej.pl
				</a>
				, prowadzony jest przez Michał Pielak Miktel z siedzibą w Rybnej 32-061 ul. Wspólna 2, NIP
				678-280-52-34, REGON 120171088.
			</p>
			<p className="mb-4">
				2. Niniejszy Regulamin skierowany jest zarówno do Konsumentów, jak i do Przedsiębiorców
				korzystających ze Sklepu i określa zasady korzystania ze Sklepu internetowego oraz zasady i
				tryb zawierania Umów Sprzedaży z Klientem na odległość za pośrednictwem Sklepu.
			</p>

			<h2 className="mb-4 mt-6 w-full text-center text-xl font-semibold">§ 2 DEFINICJE</h2>
			<ul className="ml-6 list-disc">
				<li>
					<strong>Konsument</strong> - osoba fizyczna zawierająca ze Sprzedawcą umowę w ramach
					Sklepu, której przedmiot nie jest związany bezpośrednio z jej działalnością gospodarczą
					lub zawodową.
				</li>
				<li>
					<strong>Sprzedawca</strong> - Michał Pielak Miktel z siedzibą w Rybnej przy ul. Wspólna 2,
					kod pocztowy 32-061, NIP 678-280-52-34, REGON 120171088.
				</li>
				<li>
					<strong>Klient</strong> - każdy podmiot dokonujący zakupów za pośrednictwem Sklepu.
				</li>
				<li>
					<strong>Przedsiębiorca</strong> - osoba fizyczna, osoba prawna i jednostka organizacyjna
					niebędąca osobą prawną, której odrębna ustawa przyznaje zdolność prawną, wykonująca we
					własnym imieniu działalność gospodarczą, która korzysta ze Sklepu.
				</li>
				<li>
					<strong>Sklep</strong> - sklep internetowy prowadzony przez Sprzedawcę pod adresem
					internetowym{" "}
					<a href="https://serwiswrybnej.pl" className="text-blue-500 underline">
						serwiswrybnej.pl
					</a>
					.
				</li>
				<li>
					<strong>Umowa zawarta na odległość</strong> - umowa zawarta z Klientem w ramach
					zorganizowanego systemu zawierania umów na odległość (w ramach Sklepu), bez jednoczesnej
					fizycznej obecności stron, z wyłącznym wykorzystaniem jednego lub większej liczby środków
					porozumiewania się na odległość do chwili zawarcia umowy włącznie.
				</li>
				<li>
					<strong>Regulamin</strong> - niniejszy regulamin Sklepu.
				</li>
				<li>
					<strong>Zamówienie</strong> - oświadczenie woli Klienta składane za pomocą Formularza
					Zamówienia i zmierzające bezpośrednio do zawarcia Umowy Sprzedaży Produktu lub Produktów
					ze Sprzedawcą.
				</li>
				<li>
					<strong>Konto</strong> - konto klienta w Sklepie, są w nim gromadzone są dane podane przez
					Klienta oraz informacje o złożonych przez niego Zamówieniach w Sklepie.
				</li>
				<li>
					<strong>Formularz rejestracji</strong> - formularz dostępny w Sklepie, umożliwiający
					utworzenie Konta.
				</li>
				<li>
					<strong>Formularz zamówienia</strong> - interaktywny formularz dostępny w Sklepie
					umożliwiający złożenie Zamówienia, w szczególności poprzez dodanie Produktów do Koszyka
					oraz określenie warunków Umowy Sprzedaży, w tym sposobu dostawy i płatności.
				</li>
				<li>
					<strong>Koszyk</strong> – element oprogramowania Sklepu, w którym widoczne są wybrane
					przez Klienta Produkty do zakupu, a także istnieje możliwość ustalenia i modyfikacji
					danych Zamówienia, w szczególności ilości produktów.
				</li>
				<li>
					<strong>Produkt</strong> - dostępna w Sklepie rzecz ruchoma/usługa będąca przedmiotem
					Umowy Sprzedaży między Klientem a Sprzedawcą.
				</li>
				<li>
					<strong>Umowa Sprzedaży</strong> - umowa sprzedaży Produktu zawierana albo zawarta między
					Klientem a Sprzedawcą za pośrednictwem Sklepu internetowego. Przez Umowę Sprzedaży rozumie
					się też - stosowanie do cech Produktu - umowę o świadczenie usług i umowę o dzieło.
				</li>
			</ul>

			<h2 className="mb-4 mt-6 w-full text-center text-xl font-semibold">§ 3 KONTAKT ZE SKLEPEM</h2>
			<ul className="ml-6 list-none">
				<li>Adres Sprzedawcy: ul. Wspólna 2, 32-061 Rybna</li>
				<li>
					Adres e-mail Sprzedawcy:{" "}
					<ActiveLink
						role="link"
						href={`mailto:${"michal.pielak81".replace(/\./g, "[dot]")}@gmail.com`.replace(
							/\[dot\]/g,
							".",
						)}
						aria-label="Wyślij email do nas"
					>
						Wyślij Email
					</ActiveLink>
				</li>
				<li>
					Numer telefonu Sprzedawcy:{" "}
					<a href="tel:+48506029980" className="text-blue-500 underline">
						506-029-980
					</a>
				</li>
			</ul>

			<h2 className="mb-4 mt-6 w-full text-center text-xl font-semibold">
				§ 4 WYMAGANIA TECHNICZNE
			</h2>
			<ul className="ml-6 list-disc">
				<li>
					Urządzenie końcowe z dostępem do sieci Internet i przeglądarką internetową typu komputer
					PC, laptop, smartfon.
				</li>
				<li>Aktywne konto poczty elektronicznej (e-mail).</li>
				<li>Włączona obsługa plików cookies.</li>
			</ul>

			<h2 className="mb-4 mt-6 w-full text-center text-xl font-semibold">§ 5 INFORMACJE OGÓLNE</h2>
			<p className="mb-4">
				1. Sprzedawca w najszerszym dopuszczalnym przez prawo zakresie nie ponosi odpowiedzialności
				za zakłócenia w funkcjonowaniu Sklepu spowodowane siłą wyższą, niedozwolonym działaniem osób
				trzecich lub niekompatybilnością Sklepu internetowego z infrastrukturą techniczną Klienta.
			</p>
			<p className="mb-4">
				2. Przeglądanie asortymentu Sklepu nie wymaga zakładania Konta. Składanie zamówień przez
				Klienta na Produkty znajdujące się w asortymencie Sklepu możliwe jest albo po założeniu
				Konta zgodnie z postanowieniami Regulaminu albo przez podanie niezbędnych danych osobowych i
				adresowych umożliwiających realizację Zamówienia bez zakładania Konta.
			</p>
			<p className="mb-4">
				3. Ceny podane w Sklepie są podane w polskich złotych i są cenami brutto (uwzględniają
				podatek VAT).
			</p>
			<p className="mb-4">
				4. Na końcową (ostateczną) kwotę do zapłaty przez Klienta składa się cena za Produkt oraz
				koszt dostawy (w tym opłaty za transport, dostarczenie i usługi pocztowe), o której Klient
				jest informowany na stronach Sklepu w trakcie składania Zamówienia, w tym także w chwili
				wyrażenia woli związania się Umową Sprzedaży.
			</p>

			<h2 className="mb-4 mt-6 w-full text-center text-xl font-semibold">
				§ 6 ZAKŁADANIE KONTA W SKLEPIE
			</h2>
			<p className="mb-4">
				1. Aby założyć Konto w Sklepie, należy wypełnić Formularz rejestracji. Niezbędne jest
				podanie następujących danych: email, imię i nazwisko, telefon.
			</p>
			<p className="mb-4">2. Założenie Konta w Sklepie jest darmowe.</p>
			<p className="mb-4">
				3. Logowanie się na Konto odbywa się poprzez podanie loginu i hasła ustanowionych w
				Formularzu rejestracji.
			</p>
			<p className="mb-4">
				4. Klient ma możliwość w każdej chwili, bez podania przyczyny i bez ponoszenia z tego tytułu
				jakichkolwiek opłat usunąć Konto poprzez wysłanie stosownego żądania do Sprzedawcy, w
				szczególności za pośrednictwem poczty elektronicznej lub pisemnie na adresy podane w § 3.
			</p>

			<h2 className="mb-4 mt-6 w-full text-center text-xl font-semibold">
				§ 7 ZASADY SKŁADANIA ZAMÓWIENIA
			</h2>
			<p className="mb-4">
				W celu złożenia Zamówienia należy:
				<ol className="ml-6 list-decimal">
					<li>Zalogować się do Sklepu.</li>
					<li>
						Wybrać Produkt będący przedmiotem Zamówienia, a następnie kliknąć przycisk „Do koszyka”.
					</li>
					<li>Skorzystać z możliwości złożenia Zamówienia bez rejestracji.</li>
					<li>
						Wypełnić Formularz zamówienia poprzez wpisanie danych odbiorcy Zamówienia oraz adresu,
						na który ma nastąpić dostawa Produktu, wybrać rodzaj przesyłki (sposób dostarczenia
						Produktu), wpisać dane do faktury, jeśli są inne niż dane odbiorcy Zamówienia.
					</li>
					<li>Kliknąć przycisk „Zamawiam i płacę”.</li>
				</ol>
			</p>

			<h2 className="mb-4 mt-6 w-full text-center text-xl font-semibold">
				§ 8 OFEROWANE METODY DOSTAWY ORAZ PŁATNOŚCI
			</h2>
			<p className="mb-4">
				1. Klient może skorzystać z następujących metod dostawy lub odbioru zamówionego Produktu:
				<ul className="ml-6 list-disc">
					<li>Przesyłka pocztowa, przesyłka pocztowa pobraniowa.</li>
					<li>Przesyłka kurierska, przesyłka kurierska pobraniowa.</li>
					<li>Odbiór osobisty dostępny pod adresem ul. Wspólna 2, 32-961 Rybna.</li>
				</ul>
			</p>
			<p className="mb-4">
				2. Klient może skorzystać z następujących metod płatności:
				<ul className="ml-6 list-disc">
					<li>Płatność przy odbiorze.</li>
					<li>Płatność za pobraniem.</li>
					<li>Płatność przelewem na konto Sprzedawcy.</li>
					<li>Płatności elektroniczne.</li>
				</ul>
			</p>

			<div className="container mx-auto px-4 py-6">
				<h2 className="mb-4 mt-6 w-full text-center text-xl font-semibold">
					§ 9 WYKONANIE UMOWY SPRZEDAŻY
				</h2>
				<p className="mb-4">
					1. Zawarcie Umowy Sprzedaży między Klientem a Sprzedawcą następuje po uprzednim złożeniu
					przez Klienta Zamówienia za pomocą Formularza zamówienia w Sklepie internetowym zgodnie z
					§ 7 Regulaminu.
				</p>
				<p className="mb-4">
					2. Po złożeniu Zamówienia Sprzedawca niezwłocznie potwierdza jego otrzymanie oraz
					jednocześnie przyjmuje Zamówienie do realizacji. Potwierdzenie następuje poprzez
					przesłanie wiadomości e-mail do Klienta, zawierającej oświadczenie Sprzedawcy o otrzymaniu
					Zamówienia i jego przyjęciu do realizacji oraz potwierdzenie zawarcia Umowy Sprzedaży.
				</p>
				<p className="mb-4">3. W przypadku wyboru przez Klienta:</p>
				<ul className="mb-4 ml-6 list-disc">
					<li>
						a. płatności przelewem, płatności elektronicznych albo płatności kartą płatniczą –
						Klient obowiązany jest do dokonania płatności w terminie 7 dni kalendarzowych od dnia
						zawarcia Umowy Sprzedaży.
					</li>
					<li>
						b. płatności za pobraniem przy odbiorze przesyłki – Klient obowiązany jest do dokonania
						płatności przy odbiorze przesyłki.
					</li>
					<li>
						c. płatności gotówką przy odbiorze osobistym przesyłki – Klient obowiązany jest do
						dokonania płatności w terminie 7 dni od dnia otrzymania informacji o gotowości przesyłki
						do odbioru.
					</li>
				</ul>

				<p className="mb-4">
					4. Jeżeli Klient wybrał sposób dostawy inny niż odbiór osobisty, Produkt zostanie wysłany
					przez Sprzedawcę w terminie wskazanym w jego opisie.
				</p>

				<p className="mb-4">5. W przypadku zamówienia Produktów o różnych terminach dostawy:</p>
				<ul className="mb-4 ml-6 list-disc">
					<li>A. Termin dostawy jest najdłuższy podany termin.</li>
					<li>
						B. Klient może żądać dostarczenia Produktów częściami lub po skompletowaniu całego
						zamówienia.
					</li>
				</ul>

				<p className="mb-4">6. Początek biegu terminu dostawy Produktu liczy się:</p>
				<ul className="mb-4 ml-6 list-disc">
					<li>
						a. w przypadku płatności przelewem, płatności elektronicznej lub kartą – od dnia uznania
						rachunku bankowego Sprzedawcy.
					</li>
					<li>b. w przypadku płatności za pobraniem – od dnia zawarcia Umowy Sprzedaży.</li>
				</ul>

				<p className="mb-4">
					7. W przypadku zamówienia Produktów o różnych terminach gotowości do odbioru, Klient może
					odbierać je częściami lub po skompletowaniu całego zamówienia.
				</p>

				<p className="mb-4">
					8. Początek biegu terminu gotowości Produktu do odbioru liczy się od:
				</p>
				<ul className="mb-4 ml-6 list-disc">
					<li>
						a. uznania rachunku bankowego Sprzedawcy (przy płatności przelewem, elektronicznie lub
						kartą).
					</li>
					<li>b. zawarcia Umowy Sprzedaży (przy odbiorze gotówką).</li>
				</ul>

				<p className="mb-4">9. Dostawa Produktu odbywa się wyłącznie na terenie Polski.</p>
				<p className="mb-4">
					10. Koszty dostawy Produktu są wskazywane Klientowi na stronach Sklepu oraz w trakcie
					składania Zamówienia.
				</p>
				<p className="mb-4">11. Odbiór osobisty Produktu przez Klienta jest bezpłatny.</p>
			</div>

			<div className="container mx-auto px-4 py-6">
				<h2 className="mb-4 mt-6 w-full text-center text-xl font-semibold">
					§ 10 PRAWO ODSTĄPIENIA OD UMOWY
				</h2>

				<p className="mb-4">
					1. Konsument może w terminie 14 dni odstąpić od Umowy Sprzedaży bez podania jakiejkolwiek
					przyczyny.
				</p>
				<p className="mb-4">
					2. Bieg terminu określonego w ust. 1 rozpoczyna się od dostarczenia Produktu Konsumentowi
					lub wskazanej przez niego osobie innej niż przewoźnik.
				</p>
				<p className="mb-4">
					3. W przypadku Umowy, która obejmuje wiele Produktów, które są dostarczane osobno,
					partiami lub w częściach, termin wskazany w ust. 1 biegnie od dostawy ostatniej rzeczy,
					partii lub części.
				</p>
				<p className="mb-4">
					4. W przypadku Umowy, która polega na regularnym dostarczaniu Produktów przez czas
					oznaczony (prenumerata), termin wskazany w ust. 1 biegnie od objęcia w posiadanie
					pierwszej z rzeczy.
				</p>
				<p className="mb-4">
					5. Konsument może odstąpić od Umowy, składając Sprzedawcy oświadczenie o odstąpieniu od
					Umowy. Do zachowania terminu odstąpienia od Umowy wystarczy wysłanie przez Konsumenta
					oświadczenia przed upływem tego terminu.
				</p>
				<p className="mb-4">
					6. Oświadczenie może być wysłane za pomocą tradycyjnej poczty, faxem bądź drogą
					elektroniczną poprzez przesłanie oświadczenia na adres e-mail Sprzedawcy lub przez
					złożenie oświadczenia na stronie internetowej Sprzedawcy – dane kontaktowe Sprzedawcy
					zostały określone w § 3. Oświadczenie można złożyć również na formularzu, którego wzór
					stanowi załącznik nr 1 do niniejszego Regulaminu oraz załącznik do ustawy z dnia 30 maja
					2014 roku o prawach konsumenta, jednak nie jest to obowiązkowe.
				</p>
				<p className="mb-4">
					7. W przypadku przesłania oświadczenia przez Konsumenta drogą elektroniczną, Sprzedawca
					niezwłocznie prześle Konsumentowi na podany przez Konsumenta adres e-mail potwierdzenie
					otrzymania oświadczenia o odstąpieniu od Umowy.
				</p>

				<p className="mb-4">8. Skutki odstąpienia od Umowy:</p>
				<ul className="mb-4 ml-6 list-disc">
					<li>
						a. W przypadku odstąpienia od Umowy zawartej na odległość Umowę uważa się za niezawartą.
					</li>
					<li>
						b. W przypadku odstąpienia od Umowy Sprzedawca zwraca Konsumentowi niezwłocznie, nie
						później niż w terminie 14 dni od dnia otrzymania oświadczenia Konsumenta o odstąpieniu
						od Umowy, wszystkie dokonane przez niego płatności, w tym koszty dostarczenia rzeczy, z
						wyjątkiem dodatkowych kosztów wynikających z wybranego przez Konsumenta sposobu
						dostarczenia innego niż najtańszy zwykły sposób dostarczenia oferowany przez Sprzedawcę.
					</li>
					<li>
						c. Zwrotu płatności Sprzedawca dokona przy użyciu takich samych metod płatności, jakie
						zostały przez Konsumenta użyte w pierwotnej transakcji, chyba że Konsument wyraźnie
						zgodził się na inne rozwiązanie, które nie będzie się wiązało dla niego z żadnymi
						kosztami.
					</li>
					<li>
						d. Sprzedawca może wstrzymać się ze zwrotem płatności do czasu otrzymania Produktu z
						powrotem lub do czasu dostarczenia mu dowodu jego odesłania, w zależności od tego, które
						zdarzenie nastąpi wcześniej.
					</li>
					<li>
						e. Konsument powinien odesłać Produkt na adres Sprzedawcy podany w niniejszym
						Regulaminie niezwłocznie, nie później niż 14 dni od dnia, w którym poinformował
						Sprzedawcę o odstąpieniu od Umowy. Termin zostanie zachowany, jeśli Konsument odeśle
						Produkt przed upływem terminu 14 dni.
					</li>
					<li>
						f. Konsument ponosi bezpośrednie koszty zwrotu Produktu, także koszty zwrotu Produktu,
						jeśli ze względu na swój charakter Produkt ten nie mógł zostać w zwykłym trybie odesłany
						pocztą.
					</li>
					<li>
						g. Konsument odpowiada tylko za zmniejszenie wartości Produktu wynikające z korzystania
						z niego w sposób inny niż było to konieczne do stwierdzenia charakteru, cech i
						funkcjonowania Produktu.
					</li>
				</ul>

				<p className="mb-4">
					9. W przypadku gdy ze względu na charakter Produktu nie może on zostać odesłany w zwykłym
					trybie pocztą, informacja o tym, a także o kosztach zwrotu Produktu, będzie się znajdować
					w opisie Produktu w Sklepie.
				</p>
				<p className="mb-4">
					10. Prawo do odstąpienia od umowy zawartej na odległość nie przysługuje Konsumentowi w
					odniesieniu do Umowy:
				</p>
				<ul className="mb-4 ml-6 list-disc">
					<li>
						a. w której przedmiotem świadczenia jest rzecz nieprefabrykowana, wyprodukowana według
						specyfikacji Konsumenta lub służąca zaspokojeniu jego zindywidualizowanych potrzeb,
					</li>
					<li>
						b. w której przedmiotem świadczenia jest rzecz dostarczana w zapieczętowanym opakowaniu,
						której po otwarciu opakowania nie można zwrócić ze względu na ochronę zdrowia lub ze
						względów higienicznych, jeżeli opakowanie zostało otwarte po dostarczeniu,
					</li>
					<li>
						c. w które przedmiotem świadczenia jest rzecz ulegająca szybkiemu zepsuciu lub mająca
						krótki termin przydatności do użycia,
					</li>
					<li>
						d. o świadczenie usług, jeżeli Sprzedawca wykonał w pełni usługę za wyraźną zgodą
						Konsumenta, który został poinformowany przez rozpoczęciem świadczenia, że po spełnieniu
						świadczenia przez Sprzedawcę utraci prawo odstąpienia od Umowy,
					</li>
					<li>
						e. w którym cena lub wynagrodzenie zależy od wahań na rynku finansowym, nad którym
						Sprzedawca nie sprawuje kontroli, i które mogą wystąpić przed upływem terminu do
						odstąpienia od Umowy,
					</li>
					<li>
						f. w której przedmiotem świadczenia są rzeczy, które po dostarczeniu, ze względu na swój
						charakter, zostają nierozłącznie połączone z innymi rzeczami,
					</li>
					<li>
						g. w której przedmiotem świadczenia są napoje alkoholowe, których cena została
						uzgodniona przy zawarciu umowy sprzedaży, a których dostarczenie może nastąpić dopiero
						po upływie 30 dni i których wartość zależy od wahań na rynku, nad którymi Sprzedawca nie
						ma kontroli,
					</li>
					<li>
						h. w której przedmiotem świadczenia są nagrania dźwiękowe lub wizualne albo programy
						komputerowe dostarczane w zapieczętowanym opakowaniu, jeżeli opakowanie zostało otwarte
						po dostarczeniu,
					</li>
					<li>
						i. o dostarczanie dzienników, periodyków lub czasopism, z wyjątkiem umowy o prenumeratę,
					</li>
					<li>
						j. o dostarczenie treści cyfrowych, które nie są zapisane na nośniku materialnym, jeżeli
						spełnianie świadczenia rozpoczęło się za wyraźną zgodą Konsumenta przed upływem terminu
						do odstąpienia od umowy i po poinformowaniu go przez Sprzedawcę o utracie prawa
						odstąpienia od Umowy,
					</li>
				</ul>
			</div>

			<div className="container mx-auto px-4 py-6">
				<h2 className="mb-4 mt-6 w-full text-center text-xl font-semibold">
					§ 11 REKLAMACJA I GWARANCJA
				</h2>

				<p className="mb-4">
					1. Umową Sprzedaży objęte są Produkty nowe i używane. Na stronach Sklepu szczegółowo
					opisany jest stan każdego używanego Produktu.
				</p>
				<p className="mb-4">
					2. Sprzedawca jest obowiązany dostarczyć Klientowi rzecz wolną od wad.
				</p>
				<p className="mb-4">
					3. W przypadku wystąpienia wady zakupionego u Sprzedawcy towaru, Klient ma prawo do
					reklamacji w oparciu o przepisy dotyczące rękojmi w kodeksie cywilnym.
				</p>
				<p className="mb-4">
					4. Jeżeli Klientem jest Przedsiębiorca, strony wyłączają odpowiedzialność z tytułu
					rękojmi.
				</p>
				<p className="mb-4">
					5. Reklamację należy zgłosić pisemnie lub drogą elektroniczną na podane w niniejszym
					Regulaminie adresy Sprzedawcy.
				</p>
				<p className="mb-4">
					6. Zaleca się, aby w reklamacji zawrzeć m.in. zwięzły opis wady, okoliczności (w tym datę)
					jej wystąpienia, dane Klienta składającego reklamację oraz żądanie Klienta w związku z
					wadą towaru.
				</p>
				<p className="mb-4">
					7. Sprzedawca ustosunkuje się do żądania reklamacyjnego niezwłocznie, nie później niż w
					terminie 14 dni, a jeśli nie zrobi tego w tym terminie, uważa się, że żądanie Klienta
					uznał za uzasadnione.
				</p>
				<p className="mb-4">
					8. Towary odsyłane w ramach procedury reklamacyjnej należy wysyłać na adres podany w § 3
					niniejszego Regulaminu.
				</p>
				<p className="mb-4">
					9. W przypadku, gdy na Produkt została udzielona gwarancja, informacja o niej, a także jej
					treść, będą zawarte przy opisie Produktu w Sklepie.
				</p>
			</div>
			<div className="container mx-auto px-4 py-6">
				<h2 className="mb-4 mt-6 w-full text-center text-xl font-semibold">
					§ 12 POZASĄDOWE SPOSOBY ROZPATRYWANIA REKLAMACJI I DOCHODZENIA ROSZCZEŃ
				</h2>

				<p className="mb-4">
					1. Szczegółowe informacje dotyczące możliwości skorzystania przez Konsumenta z
					pozasądowych sposobów rozpatrywania reklamacji i dochodzenia roszczeń oraz zasady dostępu
					do tych procedur dostępne są w siedzibach oraz na stronach internetowych powiatowych
					(miejskich) rzeczników konsumentów, organizacji społecznych, do których zadań statutowych
					należy ochrona konsumentów, Wojewódzkich Inspektoratów Inspekcji Handlowej oraz pod
					następującymi adresami internetowymi Urzędu Ochrony Konkurencji i Konsumentów:
					<a
						href="http://www.uokik.gov.pl/spory_konsumenckie.php"
						className="text-blue-500 underline"
					>
						{" "}
						www.uokik.gov.pl/spory_konsumenckie.php
					</a>
					,
					<a
						href="http://www.uokik.gov.pl/sprawy_indywidualne.php"
						className="text-blue-500 underline"
					>
						{" "}
						www.uokik.gov.pl/sprawy_indywidualne.php
					</a>{" "}
					oraz
					<a href="http://www.uokik.gov.pl/wazne_adresy.php" className="text-blue-500 underline">
						{" "}
						www.uokik.gov.pl/wazne_adresy.php
					</a>
					.
				</p>

				<p className="mb-4">
					2. Konsument posiada następujące przykładowe możliwości skorzystania z pozasądowych
					sposobów rozpatrywania reklamacji i dochodzenia roszczeń:
				</p>
				<ul className="mb-4 ml-6 list-disc">
					<li>
						a. Konsument uprawniony jest do zwrócenia się do stałego polubownego sądu
						konsumenckiego, o którym mowa w art. 37 ustawy z dnia 15 grudnia 2000 r. o Inspekcji
						Handlowej (Dz.U. z 2014 r. poz. 148 z późn. zm.), z wnioskiem o rozstrzygnięcie sporu
						wynikłego z Umowy zawartej ze Sprzedawcą.
					</li>
					<li>
						b. Konsument uprawniony jest do zwrócenia się do wojewódzkiego inspektora Inspekcji
						Handlowej, zgodnie z art. 36 ustawy z dnia 15 grudnia 2000 r. o Inspekcji Handlowej
						(Dz.U. z 2014 r. poz. 148 z późn. zm.), z wnioskiem o wszczęcie postępowania
						mediacyjnego w sprawie polubownego zakończenia sporu między Konsumentem a Sprzedawcą.
					</li>
					<li>
						c. Konsument może uzyskać bezpłatną pomoc w sprawie rozstrzygnięcia sporu między nim a
						Sprzedawcą, korzystając także z bezpłatnej pomocy powiatowego (miejskiego) rzecznika
						konsumentów lub organizacji społecznej, do której zadań statutowych należy ochrona
						konsumentów (m.in. Federacja Konsumentów, Stowarzyszenie Konsumentów Polskich).
					</li>
				</ul>
			</div>

			<div className="container mx-auto px-4 py-6">
				<h2 className="mb-4 mt-6 w-full text-center text-xl font-semibold">
					§ 13 DANE OSOBOWE W SKLEPIE INTERNETOWYM
				</h2>

				<p className="mb-4">
					1. Administratorem danych osobowych Klientów zbieranych za pośrednictwem Sklepu
					internetowego jest Sprzedawca.
				</p>
				<p className="mb-4">
					2. Dane osobowe Klientów zbierane przez administratora za pośrednictwem Sklepu
					internetowego zbierane są w celu realizacji Umowy Sprzedaży, a jeżeli Klient wyrazi na to
					zgodę - także w celu marketingowym.
				</p>
				<p className="mb-4">
					3. Odbiorcami danych osobowych Klientów Sklepu internetowego mogą być:
				</p>
				<ul className="mb-4 ml-6 list-disc">
					<li>
						a. W przypadku Klienta, który korzysta w Sklepie internetowym ze sposobu dostawy
						przesyłką pocztową lub przesyłką kurierską, Administrator udostępnia zebrane dane
						osobowe Klienta wybranemu przewoźnikowi lub pośrednikowi realizującemu przesyłki na
						zlecenie Administratora.
					</li>
					<li>
						b. W przypadku Klienta, który korzysta w Sklepie internetowym ze sposobu płatności
						elektronicznych lub kartą płatniczą, Administrator udostępnia zebrane dane osobowe
						Klienta wybranemu podmiotowi obsługującemu powyższe płatności w Sklepie internetowym.
					</li>
				</ul>
				<p className="mb-4">
					4. Klient ma prawo dostępu do treści swoich danych oraz ich poprawiania.
				</p>
				<p className="mb-4">
					5. Podanie danych osobowych jest dobrowolne, aczkolwiek niepodanie wskazanych w
					Regulaminie danych osobowych niezbędnych do zawarcia Umowy Sprzedaży skutkuje brakiem
					możliwości zawarcia tejże umowy.
				</p>

				<h2 className="mb-4 mt-6 w-full text-center text-xl font-semibold">
					§ 14 POSTANOWIENIA KOŃCOWE
				</h2>

				<p className="mb-4">
					1. Umowy zawierane poprzez Sklep internetowy zawierane są w języku polskim.
				</p>
				<p className="mb-4">
					2. Sprzedawca zastrzega sobie prawo do dokonywania zmian Regulaminu z ważnych przyczyn to
					jest: zmiany przepisów prawa, zmiany sposobów płatności i dostaw - w zakresie, w jakim te
					zmiany wpływają na realizację postanowień niniejszego Regulaminu. O każdej zmianie
					Sprzedawca poinformuje Klienta z co najmniej 7 dniowym wyprzedzeniem.
				</p>
				<p className="mb-4">
					3. W sprawach nieuregulowanych w niniejszym Regulaminie mają zastosowanie powszechnie
					obowiązujące przepisy prawa polskiego, w szczególności: Kodeksu cywilnego; ustawy o
					świadczeniu usług drogą elektroniczną; ustawy o prawach konsumenta; ustawy o ochronie
					danych osobowych.
				</p>
				<p className="mb-4">
					4. Klient ma prawo skorzystać z pozasądowych sposobów rozpatrywania reklamacji i
					dochodzenia roszczeń. W tym celu może złożyć skargę za pośrednictwem unijnej platformy
					internetowej ODR dostępnej pod adresem:
					<a href="http://ec.europa.eu/consumers/odr/" className="text-blue-500 underline">
						{" "}
						http://ec.europa.eu/consumers/odr/
					</a>
					.
				</p>
			</div>
		</div>
	);
}
