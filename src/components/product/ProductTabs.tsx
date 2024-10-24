"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import StarRatings from "react-star-ratings";
import ReviewForm from "@/components/product/ReviewForm";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { ProductDetails, UserData } from "@/app/types";
import DescriptionComponent from "@/components/product/atoms/DescriptionComponent";

export default function ProductTabs({
	product,
	userData,
}: {
	product: ProductDetails;
	userData?: UserData;
}) {
	const [isModalReviewOpen, setIsModalReviewOpen] = useState(false);

	const toggleReviewModal = () => {
		setIsModalReviewOpen(!isModalReviewOpen);
	};

	return (
		<Tabs defaultValue="details" className="w-full">
			<TabsList className="grid w-full grid-cols-3 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
				<TabsTrigger
					value="details"
					className="h-14 rounded-md data-[state=active]:rounded-md data-[state=active]:bg-white data-[state=active]:text-black"
				>
					Opis produktu
				</TabsTrigger>
				<TabsTrigger
					value="specyfication"
					className="h-14 rounded-md data-[state=active]:rounded-md data-[state=active]:bg-white data-[state=active]:text-black"
				>
					Specyfikacja
				</TabsTrigger>
				<TabsTrigger
					value="reviews"
					className="h-14 rounded-md data-[state=active]:rounded-md data-[state=active]:bg-white data-[state=active]:text-black"
				>
					Opinie
				</TabsTrigger>
			</TabsList>

			<TabsContent value="details">
				{product.seo_text && (
					<DescriptionComponent title="Szczegóły produktu" description={product.seo_text} />
				)}
			</TabsContent>

			<TabsContent value="specyfication">
				<p className="mb-3 mt-3 px-2">Brak specyfikacji</p>
			</TabsContent>

			<TabsContent value="reviews" className="p-2">
				<h2 className="mb-4 text-2xl font-bold">Opinie o produkcie</h2>

				{/* Sprawdzanie, czy są dane użytkownika */}
				{userData ? (
					<Button onClick={toggleReviewModal} className="mb-3 mt-1">
						Dodaj opinię
					</Button>
				) : (
					<p className="mb-3 mt-1 text-red-500">Musisz być zalogowany, aby dodać opinię</p>
				)}

				{userData && (
					<Dialog open={isModalReviewOpen} onOpenChange={setIsModalReviewOpen}>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Dodaj opinię o produkcie</DialogTitle>
								<DialogClose className="absolute right-2 top-2"></DialogClose>
							</DialogHeader>
							<ReviewForm
								product_id={product.id}
								user={userData.id}
								ratings={product.average_rating}
								reviewsCount={product.review_count}
								onSuccess={() => setIsModalReviewOpen(false)}
							/>
						</DialogContent>
					</Dialog>
				)}

				{product.review_count === 0 ? (
					<p className="mb-3 mt-3 px-2">Brak opinii</p>
				) : (
					<div className="space-y-4">
						{product.reviews.map((review: any) => (
							<div key={review.id} className="rounded-lg border bg-gray-50 p-4">
								<div className="flex flex-wrap items-center">
									<span className="mr-2 w-full text-sm font-semibold text-gray-500">
										{review.name}
									</span>
									<span className="mr-2 w-full text-sm text-gray-500">
										{format(new Date(review.created_at), "dd MMMM yyyy", { locale: pl })}
									</span>
									<StarRatings
										rating={review.rating}
										starRatedColor="gold"
										numberOfStars={5}
										starDimension="20px"
										starSpacing="5px"
									/>
								</div>
								<p className="mt-2 text-gray-700">{review.message}</p>
							</div>
						))}
					</div>
				)}
			</TabsContent>
		</Tabs>
	);
}
