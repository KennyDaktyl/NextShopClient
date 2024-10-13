import StarRatings from "react-star-ratings";

const ProductRating = ({ rating, reviewCount }: { rating: number; reviewCount: number }) => {
	return (
		<div>
			<StarRatings
				rating={rating}
				starRatedColor="gold"
				numberOfStars={5}
				name="rating"
				starDimension="20px"
				starSpacing="5px"
			/>
			<p>
				{rating.toFixed(1)} out of 5 stars ({reviewCount} reviews)
			</p>
		</div>
	);
};

export default ProductRating;
