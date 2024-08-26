import { type MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/koszyk", "/auth/*", "/szukaj", "/polityka-prywatnosci", "/regulamin"],
		},
		sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
	};
}
