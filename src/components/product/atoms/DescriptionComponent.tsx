const DescriptionComponent = ({ title, description }: { title: string; description: string }) => (
	<div className="mt-4 w-full">
		<p className="mx-auto w-full text-center font-bold">{title}</p>
		<div className="mb-4 mt-4" dangerouslySetInnerHTML={{ __html: description }} />
	</div>
);

export default DescriptionComponent;
