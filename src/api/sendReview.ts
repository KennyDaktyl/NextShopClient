import { SendReviewResponse, SendReviewVariables } from "@/app/types";
import { fetchPostApiData } from "./fetchPostApiData";

export const sendReviewForm = async ({
	name,
	product,
	rating,
	message,
	token,
}: {
	name: string;
	product: number;
	rating: number;
	message: string;
	token?: string;
}): Promise<SendReviewResponse | { status: number }> => {
	const variables: SendReviewVariables = {
		name,
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
