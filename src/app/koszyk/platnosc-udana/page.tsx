export default async function PaymentSuccessPage() {
	return (
		<div className="flex h-full flex-col items-center justify-center">
			<h1 className="text-3xl font-bold">Płatność zakończona pomyślnie</h1>
			<p className="mt-4 text-lg">Dziękujemy za dokonanie zakupu w naszym sklepie.</p>
			<p className="mt-4 text-lg">Za chwilę zostaniesz przekierowany na stronę główną.</p>
		</div>
	);
}
