import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { ChangeEventHandler } from "react";

interface InfoFormProps {
	value: string;
	onChange: ChangeEventHandler<HTMLTextAreaElement>;
}

export default function InfoForm({ value, onChange }: InfoFormProps) {
	const { register } = useFormContext();

	return (
		<div className="mt-4 w-full">
			<Label htmlFor="info" className="block text-sm font-medium text-gray-700">
				Dodatkowe informacje (opcjonalne)
			</Label>
			<Textarea
				id="info"
				{...register("info")}
				value={value}
				onChange={onChange}
				className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				rows={4}
			></Textarea>
		</div>
	);
}
