import { Button } from "@/components/ui/button";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form"; // Import `useForm` and `FormProvider`
import { SendReviewVariables } from "@/app/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { handleReviewFormSubmission } from "@/app/produkt/[productSlug]/actions";

interface ReviewFormProps {
	product_id: number;
	ratings: number;
	reviewsCount: number;
	onSuccess: () => void;
}

const reviewFormSchema = z.object({
	name: z.string().min(1, "Imię jest wymagane"),
	product: z.number(),
	rating: z.number().min(1, "Ocena jest wymagana"),
	message: z.string().min(1, "Wiadomość jest wymagana"),
});

type reviewFormData = z.infer<typeof reviewFormSchema>;

const ReviewForm: React.FC<ReviewFormProps> = ({
	product_id,
	ratings,
	reviewsCount,
	onSuccess,
}) => {
	const [rating, setRating] = useState(5);

	const methods = useForm<reviewFormData>({
		resolver: zodResolver(reviewFormSchema),
		defaultValues: {
			name: "",
			product: product_id,
			rating: 5,
			message: "",
		},
	});
	const [loading, setLoading] = React.useState(false);
	const [submitStatus, setSubmitStatus] = React.useState<string>("");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = methods;

	const onSubmit: SubmitHandler<SendReviewVariables> = async (data) => {
		setSubmitStatus("");
		setLoading(true);

		try {
			const dataToSubmit = {
				...data,
			};

			const result = await handleReviewFormSubmission(dataToSubmit);

			if (result.success) {
				toast.success("Opinia została wysłana.", {
					position: "top-right",
					autoClose: 1500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				methods.reset();
				onSuccess();
			} else {
				setSubmitStatus("Nie udało się wysłać opinii. Spróbuj ponownie.");
				toast.error("Nie udało się wysłać opinii. Spróbuj ponownie.", {
					position: "top-right",
					autoClose: 1500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				onSuccess();
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			setSubmitStatus("Wystąpił błąd. Spróbuj ponownie.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-md">
			<div className="mb-4 text-center">
				<h3 className="text-xl font-semibold">Średnia ocena produktu</h3>
				<div className="mt-2 flex items-center justify-center">
					<StarRatings
						rating={ratings}
						starRatedColor="gold"
						numberOfStars={5}
						starDimension="24px"
						starSpacing="5px"
					/>
					<span className="ml-2 text-lg font-bold">{ratings.toFixed(1)} / 5</span>
				</div>
				<p className="mt-1 text-gray-500">{reviewsCount} opinii</p>
			</div>

			<h2 className="mb-4 text-2xl font-bold">Dodaj opinię o produkcie</h2>

			<FormProvider {...methods}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input type="hidden" {...methods.register("product")} />
					{/* Pole na imię */}
					<FormItem>
						<FormLabel htmlFor="name">Twoje imię</FormLabel>
						<FormControl>
							<Input
								type="text"
								id="name"
								{...methods.register("name")}
								placeholder="Wpisz swoje imię"
								required
								className="w-full border border-gray-300 p-2"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>

					{/* Pole na ocenę (gwiazdki) */}
					<FormItem className="mt-4">
						<FormLabel>Twoja ocena</FormLabel>
						<FormControl>
							<StarRatings
								rating={rating}
								changeRating={(newRating) => setRating(newRating)}
								starRatedColor="gold"
								numberOfStars={5}
								starDimension="20px"
								starSpacing="5px"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>

					{/* Pole na opinię */}
					<FormItem className="mt-4">
						<FormLabel>Twoja opinia</FormLabel>
						<FormControl>
							<Textarea
								{...methods.register("message")}
								placeholder="Napisz krótką opinię"
								required
								className="h-32 w-full border border-gray-300 p-2"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>

					{/* Przycisk do wysyłania formularza */}
					<Button type="submit" className="mt-6 w-full">
						Dodaj opinię
					</Button>
				</form>
			</FormProvider>
		</div>
	);
};

export default ReviewForm;
