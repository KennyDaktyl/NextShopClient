import axiosInstance from "@/axios";

export async function getMainMenuItems(): Promise<MenuItems> {
	const url = `/api/products/main-menu-items/`;
	try {
		const response = await axiosInstance<MenuItems>({
			method: "get",
			url,
			withToken: false,
		});
		return response;
	} catch (error: any) {
		if (error.status === 401) {
			console.error("Unauthorized access - 401");
			// obsłuż przekierowanie lub inne logowanie
			throw new Error("Unauthorized access - 401");
		} else {
			console.error("Error fetching menu items:", error);
			throw new Error("An error occurred while fetching menu items.");
		}
	}
}

export async function getSubMenuItems(slug: string): Promise<MenuItems> {
	const url = `/api/products/menu-items/${slug}/`;
	try {
		const response = await axiosInstance<MenuItems>({
			method: "get",
			url,
			withToken: false,
		});
		return response;
	} catch (error: any) {
		if (error.status === 401) {
			console.error("Unauthorized access - 401");
			// obsłuż przekierowanie lub inne logowanie
			throw new Error("Unauthorized access - 401");
		} else {
			console.error("Error fetching submenu items:", error);
			throw new Error("An error occurred while fetching submenu items.");
		}
	}
}
