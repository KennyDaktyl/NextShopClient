const DescriptionComponent = ({ description }: { description: string }) => (
	<div className="mb-4 mt-4" dangerouslySetInnerHTML={{ __html: description }} />
);

export default DescriptionComponent;
