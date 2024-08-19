import { SendEmailResponse, SendEmailVariables } from "@/app/types";
import { fetchPostApiData } from "./fetchPostApiData";

export const sendContactEmail = async ({
	title,
	email,
	message,
	token,
}: {
	title: string;
	email: string;
	message: string;
	token?: string;
}): Promise<SendEmailResponse | { status: number }> => {
	const variables: SendEmailVariables = {
		title,
		email,
		message,
	};

	const query = "/api/front/contact-email";

	return fetchPostApiData<SendEmailResponse, SendEmailVariables>({
		query,
		variables,
		token,
		next: {},
	});
};
