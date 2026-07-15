import { MessageCircle, Phone, Send } from "lucide-react";

export const DEFAULT_MOBILE_SERVICE_PHONE = "506029980";
export const DEFAULT_MOBILE_SERVICE_PHONE_LABEL = "506 029 980";
export const DEFAULT_MOBILE_SERVICE_WHATSAPP_URL = "https://wa.me/48506029980";
export const DEFAULT_MOBILE_SERVICE_MESSENGER_URL = "https://m.me/100032867754031";

interface MobileServiceContactBarProps {
	phoneNumber?: string;
	whatsappUrl?: string;
	messengerUrl?: string;
	title?: string;
	description?: string;
}

const formatPhoneLabel = (phone: string) => phone.replace(/(\d{3})(?=\d)/g, "$1 ").trim();

export const MobileServiceContactBar = ({
	phoneNumber,
	whatsappUrl,
	messengerUrl,
	title = "Wybierz najwygodniejszy sposób kontaktu",
	description = "Odpowiadamy od razu.",
}: MobileServiceContactBarProps) => {
	const phone = phoneNumber || DEFAULT_MOBILE_SERVICE_PHONE;
	const phoneLabel = phoneNumber ? formatPhoneLabel(phoneNumber) : DEFAULT_MOBILE_SERVICE_PHONE_LABEL;
	const whatsapp = whatsappUrl || DEFAULT_MOBILE_SERVICE_WHATSAPP_URL;
	const messenger = messengerUrl || DEFAULT_MOBILE_SERVICE_MESSENGER_URL;

	return (
		<section className="mt-6 rounded-lg bg-gray-100 p-5 sm:p-8">
			<h2 className="mb-1 text-xl font-semibold sm:text-2xl">{title}</h2>
			<p className="mb-5 text-sm text-gray-600 sm:text-base">{description}</p>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
				<a
					href={`tel:+48${phone}`}
					className="flex flex-col items-center gap-2 rounded-lg bg-gray-800 p-5 text-center text-white transition hover:bg-gray-900"
				>
					<Phone className="h-6 w-6" aria-hidden="true" />
					<span className="text-sm font-semibold">Zadzwoń</span>
					<span className="text-xs opacity-85">{phoneLabel}</span>
				</a>
				<a
					href={whatsapp}
					target="_blank"
					rel="noopener noreferrer"
					className="flex flex-col items-center gap-2 rounded-lg bg-[#25D366] p-5 text-center text-white transition hover:bg-[#1ea952]"
				>
					<MessageCircle className="h-6 w-6" aria-hidden="true" />
					<span className="text-sm font-semibold">WhatsApp</span>
					<span className="text-xs opacity-90">Napisz wiadomość</span>
				</a>
				<a
					href={messenger}
					target="_blank"
					rel="noopener noreferrer"
					className="flex flex-col items-center gap-2 rounded-lg bg-[#0084FF] p-5 text-center text-white transition hover:bg-[#0066cc]"
				>
					<Send className="h-6 w-6" aria-hidden="true" />
					<span className="text-sm font-semibold">Messenger</span>
					<span className="text-xs opacity-90">Napisz na Facebooku</span>
				</a>
			</div>
		</section>
	);
};

export default MobileServiceContactBar;
