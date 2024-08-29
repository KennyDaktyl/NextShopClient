import { getFirstPageData } from "@/api/getFirstPageData";
import { FirstPageDataResponse } from "@/app/types";
import { CategoryListOnFirstPage } from "@/components/front/CategoryListOnFirstPage";
import { HeroItem } from "@/components/front/Hero";
import { JsonLd, ownerWebsiteJsonLd } from "@/components/seo/LdJson";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: process.env.NEXT_PUBLIC_SITE_TITLE,
	description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
	alternates: {
		canonical: process.env.NEXT_PUBLIC_BASE_URL,
	},
};

export default async function Home() {
	const res = await getFirstPageData();

	const { categories, heros }: FirstPageDataResponse = res;

	if (!categories || !heros) {
		return null;
	}

	return (
		<section className="mt-5">
			{heros.map((hero, index) => (
				<div key={hero.id} className="mb-10 rounded-lg shadow-lg">
					<HeroItem heroData={hero} isFirst={index === 0} />
				</div>
			))}
			<div className="rounded-lg bg-gray-100 p-1 shadow-sm xl:p-8">
				<CategoryListOnFirstPage categories={categories} heros={[]} />
			</div>
			<JsonLd jsonLd={ownerWebsiteJsonLd()} />
		</section>
	);
}
