// app/sitemap.xml/route.ts
import { getArticlesPath } from "@/api/getArticlesPath";
import { getCategoriesPath } from "@/api/getCategoriesPath";
import { getProductsPath } from "@/api/getProductsPath";
import { ArticlePath, CategoryPath, ProductPath } from "@/app/types";
import { NextResponse } from "next/server";

// Static routes
const staticRoutes = [
	{
		url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
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
];

export async function GET() {
	try {
		// Fetch dynamic paths
		const articles = (await getArticlesPath()) as ArticlePath[];
		const categories = (await getCategoriesPath()) as CategoryPath[];
		const products = (await getProductsPath()) as ProductPath[];

		// Generate sitemap
		const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${staticRoutes
					.map(
						(route) => `
          <url>
            <loc>${route.url}</loc>
            ${route.lastModified ? `<lastmod>${route.lastModified.toISOString()}</lastmod>` : ""}
          </url>`,
					)
					.join("")}
        ${categories
					.map(
						(category) => `
          <url>
            <loc>${process.env.NEXT_PUBLIC_BASE_URL}${category.full_path}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
          </url>`,
					)
					.join("")}
        ${products
					.map(
						(product) => `
          <url>
            <loc>${process.env.NEXT_PUBLIC_BASE_URL}${product.full_path}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
          </url>`,
					)
					.join("")}
        ${articles
					.map(
						(article) => `
          <url>
            <loc>${process.env.NEXT_PUBLIC_BASE_URL}${article.full_path}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
          </url>`,
					)
					.join("")}
      </urlset>`;

		// Return the sitemap as XML
		return new NextResponse(sitemap, {
			headers: {
				"Content-Type": "application/xml",
			},
		});
	} catch (error) {
		console.error("Error generating sitemap:", error);
		return new NextResponse("Error generating sitemap", { status: 500 });
	}
}
