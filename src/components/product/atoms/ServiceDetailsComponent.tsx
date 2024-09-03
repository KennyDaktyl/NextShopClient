import { BackLinkProps, ProductDetails } from "@/app/types";
import { CarouselPlugin } from "@/components/product/carouselPlugin";
import { ButtonBack } from "@/components/ui/backButton";
import DescriptionComponent from "@/components/product/atoms/DescriptionComponent";
import TagsComponent from "@/components/product/atoms/TagsComponent";
import ServicePriceComponent from "@/components/product/atoms/ServicePriceComponent";
import { ContactFormWithReCaptcha } from "@/components/product/atoms/ContactFormWithReCaptcha";
import { formatMoney } from "@/utils";

export const ServiceDetailsComponent = ({
	product,
	back_link,
}: {
	product: ProductDetails;
	back_link: BackLinkProps;
}) => {
	const images = product.images;
	const tags = product.tags;

	return (
		<div className="relative flex w-full min-w-full flex-wrap items-start justify-center rounded-lg bg-white shadow-lg">
			<ButtonBack {...back_link} />
			<div className="w-full">
				<h1 className="tx:xl mb-2 w-full text-center font-bold uppercase sm:text-2xl">
					{product.name}
				</h1>
			</div>
			<div className="w-full pb-1 pt-1 md:w-2/3">
				<CarouselPlugin images={images} />
			</div>

			<div className="w-full p-4 md:w-1/3">
				<div className="mb-2 text-sm">
					<span className="font-semibold">Kategoria:</span> {product.category.name}
				</div>
				{product.brand && (
					<div className="mb-2 text-sm">
						<span className="font-semibold">Marka:</span> {product.brand.name}
					</div>
				)}
				{tags && tags.length > 0 && (
					<div className="mb-2 flex flex-wrap text-sm">
						<TagsComponent tags={tags} />
					</div>
				)}
				<p className="text:sm mb-2 mt-5 font-semibold sm:text-xl">
					Oferta zaczyna się od: {formatMoney(Number(product.current_price))}*
				</p>
				<div className="text:xs sm:sm mb-2 mt-5">
					<small className="text-red-500">Skontaktuj się z Nami! </small>
					<ContactFormWithReCaptcha productTitle={product.name} />
				</div>
				<DescriptionComponent title="Opis usługi" description={product.description} />
			</div>
			{product.seo_text && (
				<DescriptionComponent title="Szczegóły oferty" description={product.seo_text} />
			)}
		</div>
	);
};

export default ServiceDetailsComponent;
