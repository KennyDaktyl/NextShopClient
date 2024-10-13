declare module "react-star-ratings" {
	import { Component } from "react";

	interface StarRatingsProps {
		rating: number;
		starRatedColor?: string;
		starEmptyColor?: string;
		starHoverColor?: string;
		starDimension?: string;
		starSpacing?: string;
		numberOfStars?: number;
		name?: string;
		changeRating?: (newRating: number) => void;
		svgIconPath?: string;
		svgIconViewBox?: string;
	}

	class StarRatings extends Component<StarRatingsProps, any> {}

	export default StarRatings;
}
