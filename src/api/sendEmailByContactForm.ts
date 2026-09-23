import { SendEmailResponse, SendEmailVariables, StampDesignLine } from "@/app/types";
import { fetchPostApiData } from "./fetchPostApiData";

export const sendContactEmail = async ({
	title,
	email,
	message,
	phone,
	stampDesign,
	stampImage,
	token,
}: {
	title: string;
	email: string;
	message: string;
	phone?: string;
	stampDesign?: StampDesignLine[];
	stampImage?: string;
	token?: string;
}): Promise<SendEmailResponse | { status: number }> => {
	const variables: SendEmailVariables = {
		title,
		email,
		message,
		...(phone && { phone }),
		...(stampDesign && { stamp_design: stampDesign }),
		...(stampImage && { stamp_image: stampImage }),
	};

	const query = "/api/front/contact-email";

	return fetchPostApiData<SendEmailResponse, SendEmailVariables>({
		query,
		variables,
		token,
		next: {},
	});
};
