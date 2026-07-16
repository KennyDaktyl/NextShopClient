import { ServiceLocality } from "@/app/types";
import { fetchGetApiData } from "./fetchApiData";

export const getServiceLocalities = async (): Promise<ServiceLocality[]> => {
	try {
		const response = await fetchGetApiData<ServiceLocality[], {}>({
			query: `/api/categories/service-localities/`,
			variables: {},
			cache: "force-cache",
			next: { tags: ["service-localities"], revalidate: 3600 },
		});
		if (!Array.isArray(response)) {
			return [];
		}
		return response;
	} catch (error) {
		console.error("getServiceLocalities error:", error);
		return [];
	}
};
