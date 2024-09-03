"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import React from "react";
import ContactForm from "@/components/product/atoms/ContactForm";

export function ContactFormWithReCaptcha({ productTitle }: { productTitle: string }) {
	return (
		<GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}>
			<ContactForm productTitle={productTitle} />
		</GoogleReCaptchaProvider>
	);
}
