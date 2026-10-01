import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import CategoryLayout from "@/app/produkty/layout";
import SideBar from "@/components/ui/organism/SideBar";
import CategoryDetails from "@/components/category/CategoryDetails";
import ProductListPage from "@/components/product/ProductListPage";
import { getMenuItems } from "@/api/getMenuItems";
import { getProductsByCategory } from "@/api/getProductsByCategory";
import { getServiceLocalities } from "@/api/getServiceLocalities";
import { MenuItemsResponse, ProductsResponse, ProductListItem, ServiceLocality } from "@/app/types";
import { getCategoryMetaData } from "@/api/getCategoryMetaData";
import {
	generateCategoryJsonLd,
	JsonLd,
	mappedMenuItemsToJsonLd,
	mappedProductsToJsonLd,
} from "@/components/seo/LdJson";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import LocalityServicePage, {
	LocalityServiceType,
} from "@/components/mobile-services/LocalityServicePage";
import CityDeliveryIllustration from "@/components/mobile-services/CityDeliveryIllustration";
import { localityTo } from "@/utils";

const slugsToGenerate = [
	"dorabianie-kluczy-mieszkaniowych",
	"klucze-samochodowe",
	"programowanie-kluczy-samochodowych",
	"kopiowanie-immobilizerow",
];

const MOBILE_KEY_CUTTING_CTA_SLUGS = ["dorabianie-kluczy-mieszkaniowych"];
const MOBILE_KEY_CUTTING_HREF = "/uslugi/mobilne-dorabianie-kluczy";
const CAR_KEYS_ROOT_SLUG = "klucze-samochodowe";

const LOCALITY_SERVICE_PREFIXES: Record<string, LocalityServiceType> = {
	"mobilne-dorabianie-kluczy": "klucze",
	"mobilne-wyrob-pieczatek": "pieczatki",
	"mobilne-kodowanie-pilotow-do-bram": "piloty",
};

const parseLocalitySlug = (
	slug: string,
): { parentSlug: string; serviceType: LocalityServiceType; localitySlug: string } | null => {
	for (const [parentSlug, serviceType] of Object.entries(LOCALITY_SERVICE_PREFIXES)) {
		const prefix = `${parentSlug}-`;
		if (slug.startsWith(prefix) && slug.length > prefix.length) {
			return { parentSlug, serviceType, localitySlug: slug.slice(prefix.length) };
		}
	}
	return null;
};

export async function generateStaticParams() {
	const localities = await getServiceLocalities();
	const localityParams = Object.keys(LOCALITY_SERVICE_PREFIXES).flatMap((parentSlug) =>
		localities.map((locality) => ({ routes: [`${parentSlug}-${locality.slug}`] })),
	);

	return [...slugsToGenerate.map((slug) => ({ routes: [slug] })), ...localityParams];
}

export async function generateMetadata({
	params,
	searchParams,
}: {
	params: { routes: string[] };
	searchParams: { page?: string };
}): Promise<Metadata | ResolvingMetadata> {
	const routes = params.routes;
	const lastRoute = routes[routes.length - 1];
	const currentCategorySlug = lastRoute;

	const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

	const localityMatch = parseLocalitySlug(currentCategorySlug);
	if (localityMatch) {
		const localities = await getServiceLocalities();
		const locality = localities.find((l) => l.slug === localityMatch.localitySlug);
		if (locality) {
			const toLocality = localityTo(locality);
			const title =
				localityMatch.serviceType === "klucze"
					? `Dorabianie kluczy z dojazdem – ${locality.name} | Kraków`
					: localityMatch.serviceType === "pieczatki"
						? `Pieczątki z dojazdem – ${locality.name} | Kraków`
						: `Pilot do bramy garażowej i wjazdowej – ${locality.name}`;
			const description =
				localityMatch.serviceType === "klucze"
					? `Dorabianie kluczy mieszkaniowych i samochodowych z dojazdem ${toLocality}. Przyjeżdżam z przenośnym sprzętem i wykonuję klucz na miejscu.`
					: localityMatch.serviceType === "pieczatki"
						? `Pieczątki firmowe i imienne z dojazdem ${toLocality}. Projekt ustalisz online, gotową pieczątkę dostarczam na miejsce.`
						: `Nowy pilot do bramy garażowej lub wjazdowej z dojazdem ${toLocality}. Sprawdzam sterownik, dobieram pilota i programuję na miejscu – 199 zł.`;
			const full_path = `/uslugi/${currentCategorySlug}`;

			return {
				title,
				description,
				alternates: { canonical: full_path },
				openGraph: {
					title,
					description,
					url: process.env.NEXT_PUBLIC_BASE_URL + full_path,
					siteName: process.env.NEXT_PUBLIC_SITE_TITLE,
					locale: "pl_PL",
					type: "website",
				},
				twitter: { card: "summary_large_image", title, description },
			};
		}
	}

	const response = await getCategoryMetaData({
		currentCategorySlug,
	});
	const category = response;

	let title = category.meta_title || `Usługi z kategorii ${category.name}`;
	let description = category.meta_description || `Lista usług w kategorii ${category.name}`;
	let alternates = {
		canonical: category.full_path,
	};

	if (category.has_children) {
		title = category.meta_title || `Usługa ${category.name} i lista jej podkategorii`;
		description =
			category.meta_description || `Lista usług dla kategorii Usługi - ${category.description}`;
	}

	return {
		title,
		description,
		alternates,
		openGraph: {
			title: category.meta_title || `Usługa ${category.name}`,
			description: category.meta_description || category.description?.slice(0, 160),
			url: process.env.NEXT_PUBLIC_BASE_URL + category.full_path,
			siteName: process.env.NEXT_PUBLIC_SITE_TITLE,
			images: [
				{
					url: category.image?.url || "",
					width: category.image?.width || 0,
					height: category.image?.height || 0,
					alt: category.image?.alt || "",
				},
			],
			locale: "pl_PL",
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: category.meta_title || `Usługa ${category.name}`,
			description: category.meta_description || category.description?.slice(0, 160),
			images: [
				{
					url: category.image?.url || "",
					width: category.image?.width || 0,
					height: category.image?.height || 0,
					alt: category.image?.alt || "",
				},
			],
		},
	};
}

export default async function Page({
	params,
	searchParams,
}: {
	params: { routes: string[] };
	searchParams: {
		page: string;
	};
}) {
	const routes = params.routes;
	const lastRoute = routes[routes.length - 1];
	const currentCategorySlug = lastRoute;
	const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

	const localityMatch = parseLocalitySlug(currentCategorySlug);
	if (localityMatch) {
		const localities = await getServiceLocalities();
		const locality = localities.find((l) => l.slug === localityMatch.localitySlug);
		if (!locality) {
			notFound();
		}

		const parentMenuItems: MenuItemsResponse = await getMenuItems({
			categorySlug: localityMatch.parentSlug,
		});
		const productsResponse = await getProductsByCategory({
			categorySlug: localityMatch.parentSlug,
			params: { page: "1" },
		});
		const products: ProductListItem[] =
			productsResponse &&
			typeof productsResponse === "object" &&
			"results" in (productsResponse as ProductsResponse)
				? (productsResponse as ProductsResponse).results
				: [];

		const otherLocalities: ServiceLocality[] = localities.filter((l) => l.slug !== locality.slug);

		return (
			<LocalityServicePage
				serviceType={localityMatch.serviceType}
				locality={locality}
				otherLocalities={otherLocalities}
				menuItems={parentMenuItems}
				products={products}
			/>
		);
	}

	const menuItems: MenuItemsResponse = await getMenuItems({ categorySlug: currentCategorySlug });
	const category = {
		slug: menuItems.slug,
		meta_title: menuItems.meta_title || menuItems.name,
		meta_description: menuItems.meta_description || menuItems.description,
		name: menuItems.name,
		h1_tag: menuItems.h1_tag || null,
		description: menuItems.description || "",
		seo_text: menuItems.seo_text || "",
		image: menuItems.image || null,
		items: menuItems.items,
		full_path: menuItems.full_path,
	};

	const isCarKeysPage = (menuItems.full_path || "").includes(`/${CAR_KEYS_ROOT_SLUG}`);
	const carKeysMobileSection = isCarKeysPage ? (
		<CarKeysMobileSection localities={await getServiceLocalities()} />
	) : null;

	if (menuItems.has_children) {
		return (
			<CategoryLayout>
				<SideBar menuItems={menuItems} isMenuActive={false} />
				<div className="flex w-full flex-col">
					<CategoryDetails category={category} />
					{carKeysMobileSection}
					{MOBILE_KEY_CUTTING_CTA_SLUGS.includes(currentCategorySlug) && (
						<section className="mb-5 mt-6 grid w-full grid-cols-1 items-center gap-5 rounded-md border border-gray-200 bg-white p-5 shadow-sm md:grid-cols-[1.3fr_0.7fr] md:p-7">
							<div>
								<p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
									Nowa usługa z dojazdem
								</p>
								<h2 className="mb-3 text-xl font-bold leading-tight md:text-2xl">
									Dorabianie kluczy u klienta, bez wizyty w punkcie
								</h2>
								<p className="mb-5 text-sm leading-6 text-gray-700">
									Jeśli nie możesz przyjechać do Rybnej, mogę dojechać pod wskazany adres z
									przenośnym sprzętem i dorobić klucze na miejscu. Usługa obejmuje klucze
									mieszkaniowe, do skrzynek, piwnic i wybrane klucze samochodowe w Krakowie oraz
									okolicach.
								</p>
								<Link
									href={MOBILE_KEY_CUTTING_HREF}
									className="inline-flex items-center gap-2 rounded-md bg-gray-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-900"
								>
									Sprawdź mobilne dorabianie kluczy
									<ArrowRight className="h-4 w-4" aria-hidden="true" />
								</Link>
							</div>
							<div className="h-44 md:h-52">
								<CityDeliveryIllustration />
							</div>
						</section>
					)}
				</div>
				<JsonLd jsonLd={generateCategoryJsonLd(category)} />
				<JsonLd
					jsonLd={mappedMenuItemsToJsonLd(menuItems.items, category.name, category.full_path)}
				/>
			</CategoryLayout>
		);
	} else {
		const response = await getProductsByCategory({
			categorySlug: currentCategorySlug,
			params: { page: currentPage.toString() },
		});

		if (Array.isArray(response) && response.length === 0) {
			notFound();
		}

		if (response && typeof response === "object" && "count" in response && "results" in response) {
			const productsResponse: ProductsResponse = response;
			const products: ProductListItem[] = productsResponse.results;
			const totalPages: number = Math.ceil(productsResponse.count / 20);
			const nextPage: string | null = productsResponse.next;
			const prevPage: string | null = productsResponse.previous;
			const showMobileKeyCuttingCta = MOBILE_KEY_CUTTING_CTA_SLUGS.includes(currentCategorySlug);

			return (
				<CategoryLayout>
					<SideBar menuItems={menuItems} isMenuActive={false} />
					<div className="mb-5 mt-10 flex w-full flex-wrap md:mt-0">
						<div className="flex w-full flex-wrap items-center justify-center rounded-md bg-gray-100 shadow-md md:h-[350px]">
							<div className="flex w-full items-center justify-center md:h-[350px] md:w-1/2">
								<div className="flex flex-wrap items-center justify-start px-2 py-4">
									<h1 className="w-full text-lg font-bold">{category.h1_tag || category.name}</h1>
									<p className="mt-4 text-sm leading-6">{category.description}</p>
								</div>
							</div>
							{category.image && (
								<div className="flex h-[250px] w-full items-center justify-center p-3 px-2 py-4 md:h-[320px] md:w-1/2">
									<div className="relative h-full max-h-[320px] w-full">
										<Image
											src={category.image.url || ""}
											alt={category.image.alt || category.name}
											title={category.image.title || category.name}
											loading="eager"
											className="rounded-md object-contain"
											fill
											sizes="(max-width: 768px) 100vw, 50vw"
										/>
									</div>
								</div>
							)}
						</div>

						{showMobileKeyCuttingCta && (
							<section className="mt-6 grid w-full grid-cols-1 items-center gap-5 rounded-md border border-gray-200 bg-white p-5 shadow-sm md:grid-cols-[1.3fr_0.7fr] md:p-7">
								<div>
									<p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
										Nowa usługa z dojazdem
									</p>
									<h2 className="mb-3 text-xl font-bold leading-tight md:text-2xl">
										Dorabianie kluczy u klienta, bez wizyty w punkcie
									</h2>
									<p className="mb-5 text-sm leading-6 text-gray-700">
										Jeśli nie możesz przyjechać do Rybnej, mogę dojechać pod wskazany adres z
										przenośnym sprzętem i dorobić klucze na miejscu. Usługa obejmuje klucze
										mieszkaniowe, do skrzynek, piwnic i wybrane klucze samochodowe w Krakowie oraz
										okolicach.
									</p>
									<Link
										href={MOBILE_KEY_CUTTING_HREF}
										className="inline-flex items-center gap-2 rounded-md bg-gray-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-900"
									>
										Sprawdź mobilne dorabianie kluczy
										<ArrowRight className="h-4 w-4" aria-hidden="true" />
									</Link>
								</div>
								<div className="h-44 md:h-52">
									<CityDeliveryIllustration />
								</div>
							</section>
						)}

						{carKeysMobileSection}

						<ProductListPage
							products={products}
							category={category}
							containerName="product-list-by-category"
							nextPage={nextPage}
							prevPage={prevPage}
							totalPages={totalPages}
							currentPage={currentPage}
						/>
					</div>
					<JsonLd jsonLd={mappedProductsToJsonLd(products)} />
					<JsonLd
						jsonLd={mappedMenuItemsToJsonLd(menuItems.items, category.name, category.full_path)}
					/>
				</CategoryLayout>
			);
		} else {
			console.error("Error fetching products:", response);
			return <div>Error fetching products</div>;
		}
	}
}

const CarKeysMobileSection = ({ localities }: { localities: ServiceLocality[] }) => (
	<section className="mt-6 w-full rounded-md border border-gray-200 bg-white p-5 shadow-sm md:p-7">
		<p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
			Usługa z dojazdem do klienta
		</p>
		<h2 className="mb-3 text-xl font-bold leading-tight md:text-2xl">
			Klucze i piloty samochodowe z dojazdem — Kraków i okolice
		</h2>
		<p className="mb-4 text-sm leading-6 text-gray-700">
			Nie musisz holować auta do serwisu. Przyjeżdżam pod dom, pracę lub na parking z urządzeniem
			diagnostycznym, dorabiam klucz, programuję pilota albo kopiuję immobilizer na miejscu. Płacisz
			dopiero po sprawdzeniu, że klucz otwiera auto i uruchamia silnik. Zadzwoń i podaj markę, model
			oraz rocznik — przed przyjazdem potwierdzę, czy wykonam usługę.
		</p>
		<div className="mb-5 flex flex-wrap gap-3">
			<a
				href="tel:+48506029980"
				className="rounded-md bg-gray-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-900"
			>
				Zadzwoń: 506 029 980
			</a>
			<Link
				href={MOBILE_KEY_CUTTING_HREF}
				className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-800 transition hover:border-gray-400"
			>
				Dorabianie kluczy z dojazdem
				<ArrowRight className="h-4 w-4" aria-hidden="true" />
			</Link>
		</div>
		{localities.length > 0 && (
			<>
				<h3 className="mb-3 text-base font-semibold">Dojeżdżam m.in. do:</h3>
				<ul className="flex flex-wrap gap-2">
					{localities.map((locality) => (
						<li key={locality.slug}>
							<Link
								href={`/uslugi/mobilne-dorabianie-kluczy-${locality.slug}`}
								className="inline-block rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-800 transition hover:bg-gray-200"
							>
								{locality.name}
							</Link>
						</li>
					))}
				</ul>
			</>
		)}
	</section>
);
