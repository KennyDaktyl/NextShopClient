import { ActiveLink } from "@/components/ui/atoms/ActiveLink";

export async function generateMetadata() {
	return {
		title: `Dostawa i zwroty.`,
		description:
			"Polityka dostaw i zwrotów w sklepie internetowym. Informacje dotyczące form dostawy, płatności za pobraniem oraz zwrotów produktów.",
		alternates: {
			canonical: "/dostawa-i-zwroty",
		},
		robots: "no-index, no-follow",
	};
}

export default function Page() {
	return (
		<div className="container mx-auto py-6">
			<h1 className="mb-4 text-2xl font-bold">Polityka Dostaw i Zwrotów</h1>

			<h2 className="mb-4 mt-6 w-full text-center text-xl font-semibold">§ 1 Dostawa</h2>
			<p className="mb-4">
				1. Oferujemy dostawę za pośrednictwem firmy InPost, zarówno kurierem, jak i do paczkomatów
				na terenie Polski.
			</p>
			<p className="mb-4">
				2. Czas dostawy wynosi zazwyczaj od 2 do 5 dni roboczych, w zależności od wybranej metody
				dostawy i lokalizacji.
			</p>
			<p className="mb-4">
				3. Koszt dostawy jest uzależniony od wybranej formy dostawy oraz wartości zamówienia i jest
				wyświetlany w koszyku przed finalizacją zamówienia.
			</p>
			<p className="mb-4">
				4. Oferujemy możliwość płatności za pobraniem dla przesyłek realizowanych przez InPost.
				Opłata za tę usługę jest naliczana dodatkowo i widoczna w koszyku.
			</p>

			<h2 className="mb-4 mt-6 w-full text-center text-xl font-semibold">§ 2 Zwroty</h2>
			<p className="mb-4">
				1. Zgodnie z ustawą o prawach konsumenta, masz prawo odstąpić od umowy zawartej na odległość
				bez podania przyczyny w ciągu 14 dni od otrzymania produktu.
			</p>
			<p className="mb-4">
				2. Aby odstąpić od umowy, poinformuj nas o swojej decyzji za pomocą jednoznacznego
				oświadczenia, które możesz wysłać na adres e-mail:{" "}
				<ActiveLink
					role="link"
					href={`mailto:${"admin".replace(/\./g, "[dot]")}@serwiswrybnej.pl`.replace(
						/\[dot\]/g,
						".",
					)}
					aria-label="Wyślij email do nas"
				>
					Wyślij Email
				</ActiveLink>{" "}
				lub listownie na adres naszej siedziby.
			</p>
			<p className="mb-4">
				3. Zwrot produktów powinien nastąpić nie później niż 14 dni od momentu poinformowania nas o
				odstąpieniu od umowy. Koszty zwrotu produktów ponosi Klient.
			</p>
			<p className="mb-4">
				4. Prawo do odstąpienia nie przysługuje w przypadku produktów wykonanych na specjalne
				zamówienie, produktów higienicznych, jeśli zostały otwarte, oraz innych określonych w
				przepisach prawa.
			</p>
			<p className="mb-4">
				5. Zwrot środków nastąpi w ciągu 14 dni od otrzymania zwróconego produktu. Zwrot nastąpi na
				to samo konto, z którego dokonano płatności, chyba że ustalimy inaczej.
			</p>

			<h2 className="mb-4 mt-6 w-full text-center text-xl font-semibold">§ 3 Reklamacje</h2>
			<p className="mb-4">
				1. W przypadku, gdy produkt okaże się wadliwy, masz prawo do złożenia reklamacji z tytułu
				rękojmi zgodnie z przepisami kodeksu cywilnego.
			</p>
			<p className="mb-4">
				2. Reklamacje można zgłaszać drogą mailową na adres:{" "}
				<ActiveLink
					role="link"
					href={`mailto:${"admin".replace(/\./g, "[dot]")}@serwiswrybnej.pl`.replace(
						/\[dot\]/g,
						".",
					)}
					aria-label="Wyślij email do nas"
				>
					Wyślij Email
				</ActiveLink>{" "}
				lub pisemnie na adres naszej siedziby.
			</p>
			<p className="mb-4">
				3. Prosimy o dołączenie opisu wady oraz zdjęcia produktu w celu przyspieszenia procesu
				reklamacyjnego.
			</p>
			<p className="mb-4">
				4. Reklamacje rozpatrywane są w ciągu 14 dni od ich otrzymania. W przypadku uznania
				reklamacji produkt zostanie wymieniony na nowy lub zostanie zwrócona jego wartość.
			</p>
			<p className="mb-4">
				5. Jeśli nie zgadzasz się z rozstrzygnięciem reklamacji, masz prawo do zgłoszenia sprawy do
				Urzędu Ochrony Konkurencji i Konsumentów (UOKiK) lub do sądu powszechnego.
			</p>
		</div>
	);
}
