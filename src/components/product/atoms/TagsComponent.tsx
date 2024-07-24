import { Tag } from "@/app/types";

const TagsComponent = ({ tags }: { tags: Tag[] }) => (
	<div className="mb-4">
		<p className="mb-2 text-sm">
			<span className="font-semibold">Tagi:</span>
		</p>
		<div className="mt-1 flex flex-wrap">
			{tags.map((tag) => (
				<span
					key={tag.id}
					className="mb-2 mr-2 rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700"
				>
					{tag.name}
				</span>
			))}
		</div>
	</div>
);

export default TagsComponent;
