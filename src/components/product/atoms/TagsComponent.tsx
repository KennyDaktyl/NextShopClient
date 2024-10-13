import { Tag } from "@/app/types";

const TagsComponent = ({ tags }: { tags: Tag[] }) => (
	<div className="flex flex-wrap">
		<span className="w-full font-semibold">Tagi:</span>
		{tags.map((tag) => (
			<span key={tag.id} className="mb-2 mr-2 text-sm text-gray-700">
				#{tag.name}
			</span>
		))}
	</div>
);

export default TagsComponent;
