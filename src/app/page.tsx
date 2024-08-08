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
			{activeHero && <HeroItem heroData={activeHero} />}
			<CategoryListOnFirstPage categories={categories} heros={[]} />
		</section>
	);
}
