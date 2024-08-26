export async function generateMetadata() {
	return {
		title: `Polityka prywatności.`,
		description:
			"Polityka prywatności. Tutaj znajdziesz informacje o tym, jakie dane przechowujemy i w jaki sposób je wykorzystujemy.",
		alternates: {
			canonical: "/polityka-prywatnosci",
		},
	};
}

export default function Page() {
	return (
		<div>
			<h1>Polityka prywatności.</h1>
		</div>
	);
}
