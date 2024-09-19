import { getArticlesPath } from "@/api/getArticlesPath";
import { getCategoriesPath } from "@/api/getCategoriesPath";
import { getProductsPath } from "@/api/getProductsPath";
import { ArticlePath, CategoryPath, ProductPath } from "@/app/types";
import { MetadataRoute } from "next";

// Funkcja do formatowania daty bez milisekund
function formatDate(date: string | Date): string {
	const d = new Date(date);
	return d.toISOString().split("T")[0]; // Usunięcie części czasu i milisekund
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const articles = (await getArticlesPath()) as ArticlePath[] | [];
	const categories = (await getCategoriesPath()) as CategoryPath[] | [];
	const products = (await getProductsPath()) as ProductPath[] | [];

	const publicUrl = process.env.NEXT_PUBLIC_BASE_URL;

	const staticRoutes = [
		{
			url: `${publicUrl}`,
			lastModified: formatDate("2024-09-18"),
		},
		{
			url: `${publicUrl}/szukaj`,
			lastModified: formatDate("2024-09-18"),
		},
		{
			url: `${publicUrl}/koszyk`,
			lastModified: formatDate("2024-09-18"),
		},
		{
			url: `${publicUrl}/kontakt`,
			lastModified: formatDate("2024-09-18"),
		},
		{
			url: `${publicUrl}/blog`,
			lastModified: formatDate("2024-09-18"),
		},
		{
			url: `${publicUrl}/regulamin`,
			lastModified: formatDate("2024-09-18"),
		},
		{
			url: `${publicUrl}/polityka-prywatnosci`,
			lastModified: formatDate("2024-09-18"),
		},
		{
			url: `${publicUrl}/wysylka-i-uslugi-na-miejscu-w-rybnej`,
			lastModified: formatDate("2024-09-18"),
		},
	];

	// Dynamiczne ścieżki dla artykułów, kategorii i produktów
	const dynamicRoutes = [
		...articles.map((article) => ({
			url: `${publicUrl}${article.full_path}`,
			lastModified: formatDate(article.modified_date),
		})),
		...categories.map((category) => ({
			url: `${publicUrl}${category.full_path}`,
			lastModified: formatDate(category.modified_date),
		})),
		...products.map((product) => ({
			url: `${publicUrl}${product.full_path}`,
			lastModified: formatDate(product.modified_date),
		})),
	];

	// Łączenie statycznych i dynamicznych ścieżek
	return [...staticRoutes, ...dynamicRoutes];
}
