import { getFirstPageData } from "@/api/getFirstPageData";
import { FirstPageDataResponse } from "@/app/types";
import { CategoryListOnFirstPage } from "@/components/front/CategoryListOnFirstPage";
import { HeroItem } from "@/components/front/Hero";

export default async function Home() {
	const res = await getFirstPageData();

	const { categories, heros }: FirstPageDataResponse = res;

	if (!categories || !heros) {
		return null;
	}

	const activeHero = heros.find((hero) => hero.is_active);
	return (
		<section className="mt-5">
			{activeHero && (
				<div className="mb-10 rounded-lg shadow-lg">
					<HeroItem heroData={activeHero} />
				</div>
			)}
			<div className="rounded-lg bg-gray-100 p-1 shadow-sm xl:p-8">
				<CategoryListOnFirstPage categories={categories} heros={[]} />
			</div>
		</section>
	);
}
