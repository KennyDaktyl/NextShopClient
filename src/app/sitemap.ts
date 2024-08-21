import { getCategoriesPath } from "@/api/getCategoriesPath";
import { type MetadataRoute } from "next";
import { CategoryPath } from "@/app/types";
import { getProductsPath } from "@/api/getProductsPath";
import { url } from "inspector";

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
	let categories = await getCategoriesPath();
	if ("status" in categories) {
		categories = [];
	}

	let products = await getProductsPath();
	if ("status" in products) {
		products = [];
	}

	const staticRoutes = [
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
			lastModified: new Date(),
		},
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/produkty`,
			lastModified: new Date(),
		},
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/uslugi`,
			lastModified: new Date(),
		},
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/szukaj`,
			lastModified: new Date(),
		},
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/koszyk`,
		},
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/moje-konto`,
		},
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/kontakt`,
			lastModified: new Date(),
		},
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
			lastModified: new Date(),
		},
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/regulamin`,
			lastModified: new Date(),
		},
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/polityka-prywatnosci`,
			lastModified: new Date(),
		},
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
		},
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
		},
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/forgot-password`,
		},
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password`,
		},
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password/confirm`,
		},
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email`,
		},
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/confirm`,
		},
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`,
		},
	];

	const categoryRoutes = categories.map((category: CategoryPath) => ({
		url: `${process.env.NEXT_PUBLIC_BASE_URL}${category.full_path}`,
		lastModified: new Date(),
	}));

	const productRoutes = products.map((product) => ({
		url: `${process.env.NEXT_PUBLIC_BASE_URL}${product.get_absolute_url}`,
		lastModified: new Date(),
	}));

	return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
