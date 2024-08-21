import React from "react";

export const GoogleMap: React.FC = () => {
	return (
		<div className="relative h-64 w-full overflow-hidden rounded-lg pb-2">
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2562.3691222461857!2d19.638222876821033!3d50.04191621669454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47164510e2f0a6a1%3A0x420b1b371050814c!2sSerwis%20w%20Rybnej%20-%20Naprawa%20telefon%C3%B3w%2C%20piecz%C4%85tki%2C%20dorabianie%20kluczy.!5e0!3m2!1spl!2spl!4v1723792917870!5m2!1spl!2spl"
				width="100%"
				height="100%"
				allowFullScreen
				loading="lazy"
			/>
		</div>
	);
};
