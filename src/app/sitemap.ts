import { getArticlesPath } from "@/api/getArticlesPath";
import { getCategoriesPath } from "@/api/getCategoriesPath";
import { getProductsPath } from "@/api/getProductsPath";
import { getServiceLocalities } from "@/api/getServiceLocalities";
import { ArticlePath, CategoryPath, ProductPath } from "@/app/types";
import { MetadataRoute } from "next";

const MOBILE_SERVICE_SLUGS = [
	"mobilne-dorabianie-kluczy",
	"mobilne-wyrob-pieczatek",
	"mobilne-kodowanie-pilotow-do-bram",
];

function formatDate(date: string | Date): string {
	const d = new Date(date);
	return d.toISOString().split("T")[0];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const articles = (await getArticlesPath()) as ArticlePath[] | [];
	const categories = (await getCategoriesPath()) as CategoryPath[] | [];
	const products = (await getProductsPath()) as ProductPath[] | [];
	const localities = await getServiceLocalities();

	const publicUrl = process.env.NEXT_PUBLIC_BASE_URL;

	const staticRoutes = [
		{
			url: `${publicUrl}`,
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
			url: `${publicUrl}/wysylka-i-uslugi-na-miejscu-w-rybnej`,
			lastModified: formatDate("2024-09-18"),
		},
		{
			url: `${publicUrl}/zaprojektuj-pieczatke`,
			lastModified: formatDate("2026-07-10"),
		},
		{
			url: `${publicUrl}/uslugi/mobilne-dorabianie-kluczy`,
			lastModified: formatDate("2026-07-15"),
		},
		{
			url: `${publicUrl}/uslugi/mobilne-wyrob-pieczatek`,
			lastModified: formatDate("2026-07-15"),
		},
	];

	const localityRoutes = MOBILE_SERVICE_SLUGS.flatMap((parentSlug) =>
		localities.map((locality) => ({
			url: `${publicUrl}/uslugi/${parentSlug}-${locality.slug}`,
			lastModified: formatDate("2026-10-01"),
		})),
	);

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

	return [...staticRoutes, ...localityRoutes, ...dynamicRoutes];
}
