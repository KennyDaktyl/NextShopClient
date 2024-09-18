import { getArticlesPath } from "@/api/getArticlesPath";
import { getCategoriesPath } from "@/api/getCategoriesPath";
import { getProductsPath } from "@/api/getProductsPath";
import { ArticlePath, CategoryPath, ProductPath } from "@/app/types";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const articles = (await getArticlesPath()) as ArticlePath[] | [];
	const categories = (await getCategoriesPath()) as CategoryPath[] | [];
	const products = (await getProductsPath()) as ProductPath[] | [];

	const publicUrl = process.env.NEXT_PUBLIC_BASE_URL;

	const staticRoutes = [
		{
			url: `${publicUrl}`,
			lastModified: new Date("2024-09-18").toISOString(),
		},
		{
			url: `${publicUrl}/szukaj`,
			lastModified: new Date("2024-09-18").toISOString(),
		},
		{
			url: `${publicUrl}/koszyk`,
			lastModified: new Date("2024-09-18").toISOString(),
		},
		{
			url: `${publicUrl}/kontakt`,
			lastModified: new Date("2024-09-18").toISOString(),
		},
		{
			url: `${publicUrl}/blog`,
			lastModified: new Date("2024-09-18").toISOString(),
		},
		{
			url: `${publicUrl}/regulamin`,
			lastModified: new Date("2024-09-18").toISOString(),
		},
		{
			url: `${publicUrl}/polityka-prywatnosci`,
			lastModified: new Date("2024-09-18").toISOString(),
		},
	];

	// Dynamiczne ścieżki dla artykułów, kategorii i produktów
	const dynamicRoutes = [
		...articles.map((article) => ({
			url: `${publicUrl}/article${article.full_path}`,
			lastModified: article.modified_date,
		})),
		...categories.map((category) => ({
			url: `${publicUrl}/category${category.full_path}`,
			lastModified: category.modified_date,
		})),
		...products.map((product) => ({
			url: `${publicUrl}/product${product.full_path}`,
			lastModified: product.modified_date,
		})),
	];

	// Łączenie statycznych i dynamicznych ścieżek
	return [...staticRoutes, ...dynamicRoutes];
}
