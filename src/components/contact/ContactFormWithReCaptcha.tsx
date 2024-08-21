"use client";

import { ContactForm } from "@/components/contact/ContactForm";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import React from "react";

export function ContactFormWithReCaptcha() {
	return (
		<GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}>
			<ContactForm />
		</GoogleReCaptchaProvider>
	);
}
