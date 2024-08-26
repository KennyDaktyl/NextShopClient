import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Blog",
	description: "Blog description",
	alternates: {
		canonical: "/blog",
	},
};

export default async function BlogPage() {
	return (
		<div>
			<h1>Blog</h1>
		</div>
	);
}
