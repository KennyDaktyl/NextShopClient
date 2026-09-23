import { FooterLink } from "@/app/types";
import { fetchGetApiData } from "./fetchApiData";

export const getFooterLinks = async (): Promise<FooterLink[]> => {
	try {
		const response = await fetchGetApiData<FooterLink[], {}>({
			query: `/api/front/footer-links`,
			variables: {},
			cache: "force-cache",
			next: { tags: ["footer-links"], revalidate: 3600 },
		});
		if (!Array.isArray(response)) {
			return [];
		}
		return response;
	} catch (error) {
		console.error("getFooterLinks error:", error);
		return [];
	}
};
