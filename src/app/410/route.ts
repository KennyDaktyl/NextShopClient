export async function GET() {
	return new Response(
		`<!doctype html>
<html lang="pl">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="robots" content="noindex, nofollow" />
	<title>410 - Produkt usuniety</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 48px; color: #111827; background: #f9fafb;">
	<main style="max-width: 760px; margin: 0 auto; text-align: center;">
		<h1 style="font-size: 48px; margin-bottom: 16px;">410 - Produkt usuniety</h1>
		<p style="font-size: 18px; line-height: 1.6;">Produkt, ktorego szukasz, zostal usuniety z naszej oferty lub nie jest juz dostepny.</p>
		<p style="font-size: 16px; line-height: 1.6; color: #4b5563;">Przejdz do listy produktow albo skontaktuj sie z nami, jezeli potrzebujesz pomocy.</p>
		<p style="margin-top: 28px;">
			<a href="/produkty" style="display: inline-block; padding: 12px 18px; background: #111827; color: white; text-decoration: none; border-radius: 6px;">Przejdz do produktow</a>
			<a href="/kontakt" style="display: inline-block; margin-left: 12px; color: #111827;">Kontakt</a>
		</p>
	</main>
</body>
</html>`,
		{
			status: 410,
			headers: {
				"Content-Type": "text/html; charset=utf-8",
				"X-Robots-Tag": "noindex, nofollow",
			},
		},
	);
}
