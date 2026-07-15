export const CityDeliveryIllustration = () => {
	return (
		<svg
			viewBox="0 0 400 200"
			className="h-full w-full"
			role="img"
			aria-label="Ilustracja: samochód dojeżdżający z usługą po mieście"
		>
			<rect x="0" y="0" width="400" height="200" fill="none" />

			{/* skyline */}
			<g opacity="0.9">
				<rect x="10" y="90" width="34" height="80" fill="#374151" />
				<rect x="50" y="60" width="30" height="110" fill="#1f2937" />
				<rect x="86" y="100" width="26" height="70" fill="#374151" />
				<rect x="250" y="80" width="30" height="90" fill="#374151" />
				<rect x="286" y="50" width="34" height="120" fill="#1f2937" />
				<rect x="326" y="95" width="28" height="75" fill="#374151" />
				<rect x="360" y="70" width="30" height="100" fill="#1f2937" />
				{/* windows */}
				{[16, 56, 92, 256, 292, 332, 366].map((x, i) => (
					<g key={x}>
						<rect x={x + 4} y={110} width="6" height="8" fill="#60a5fa" opacity="0.7" />
						<rect x={x + 14} y={110} width="6" height="8" fill="#60a5fa" opacity="0.5" />
						<rect x={x + 4} y={130} width="6" height="8" fill="#60a5fa" opacity="0.5" />
						<rect x={x + 14} y={130} width="6" height="8" fill="#60a5fa" opacity="0.7" />
					</g>
				))}
			</g>

			{/* road */}
			<rect x="0" y="170" width="400" height="30" fill="#111827" />
			<g stroke="#9ca3af" strokeWidth="4" strokeDasharray="16 14">
				<line x1="0" y1="185" x2="400" y2="185" />
			</g>

			{/* speed lines */}
			<g stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" opacity="0.6">
				<line x1="60" y1="150" x2="95" y2="150" />
				<line x1="50" y1="160" x2="90" y2="160" />
			</g>

			{/* car */}
			<g transform="translate(110,140)">
				<rect x="0" y="14" width="90" height="26" rx="6" fill="#2563eb" />
				<path d="M14 14 L26 -4 L64 -4 L78 14 Z" fill="#2563eb" />
				<path d="M28 12 L34 0 L60 0 L66 12 Z" fill="#bfdbfe" />
				<circle cx="20" cy="42" r="10" fill="#111827" />
				<circle cx="20" cy="42" r="4" fill="#9ca3af" />
				<circle cx="70" cy="42" r="10" fill="#111827" />
				<circle cx="70" cy="42" r="4" fill="#9ca3af" />
				<rect x="-4" y="20" width="6" height="6" fill="#fbbf24" />
			</g>
		</svg>
	);
};

export default CityDeliveryIllustration;
