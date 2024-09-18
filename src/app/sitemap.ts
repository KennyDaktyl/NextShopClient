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
			lastModified: new Date().toISOString(),
		},
		{
			url: `${publicUrl}/szukaj`,
			lastModified: new Date().toISOString(),
		},
		{
			url: `${publicUrl}/koszyk`,
			lastModified: new Date().toISOString(),
		},
		{
			url: `${publicUrl}/kontakt`,
			lastModified: new Date().toISOString(),
		},
		{
			url: `${publicUrl}/blog`,
			lastModified: new Date().toISOString(),
		},
		{
			url: `${publicUrl}/regulamin`,
			lastModified: new Date().toISOString(),
		},
		{
			url: `${publicUrl}/polityka-prywatnosci`,
			lastModified: new Date().toISOString(),
		},
	];

	// Dynamiczne ścieżki dla artykułów, kategorii i produktów
	const dynamicRoutes = [
		...articles.map((article) => ({
			url: `${publicUrl}/article/${article.full_path}`,
			lastModified: new Date().toISOString(),
		})),
		...categories.map((category) => ({
			url: `${publicUrl}/category/${category.full_path}`,
			lastModified: new Date().toISOString(),
		})),
		...products.map((product) => ({
			url: `${publicUrl}/product/${product.full_path}`,
			lastModified: new Date().toISOString(),
		})),
	];

	// Łączenie statycznych i dynamicznych ścieżek
	return [...staticRoutes, ...dynamicRoutes];
}
