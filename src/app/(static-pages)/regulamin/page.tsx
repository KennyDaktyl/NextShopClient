export async function generateMetadata() {
	return {
		title: `Regulamin sklepu internetowego.`,
		description: "Regulamin sklepu internetowego. Zasady korzystania z serwisu.",
		alternates: {
			canonical: "/requlamin",
		},
	};
}

export default function Page() {
	return (
		<div>
			<h1>Regulamin</h1>
		</div>
	);
}
