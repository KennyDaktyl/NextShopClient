import { SendEmailResponse, SendEmailVariables, StampDesignLine } from "@/app/types";
import { fetchPostApiData } from "./fetchPostApiData";

export const sendContactEmail = async ({
	title,
	email,
	message,
	phone,
	stampDesign,
	token,
}: {
	title: string;
	email: string;
	message: string;
	phone?: string;
	stampDesign?: StampDesignLine[];
	token?: string;
}): Promise<SendEmailResponse | { status: number }> => {
	const variables: SendEmailVariables = {
		title,
		email,
		message,
		...(phone && { phone }),
		...(stampDesign && { stamp_design: stampDesign }),
	};

	const query = "/api/front/contact-email";

	return fetchPostApiData<SendEmailResponse, SendEmailVariables>({
		query,
		variables,
		token,
		next: {},
	});
};
