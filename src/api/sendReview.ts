import { SendReviewResponse, SendReviewVariables } from "@/app/types";
import { fetchPostApiData } from "./fetchPostApiData";

export const sendReviewForm = async ({
	name,
	user,
	product,
	rating,
	message,
	token,
}: {
	name: string;
	user: number;
	product: number;
	rating: number;
	message: string;
	token?: string;
}): Promise<SendReviewResponse | { status: number }> => {
	const variables: SendReviewVariables = {
		name,
		user,
		product,
		rating,
		message,
	};

	const query = "/api/products/add-review";

	return fetchPostApiData<SendReviewResponse, SendReviewVariables>({
		query,
		variables,
		token,
		next: {},
	});
};
