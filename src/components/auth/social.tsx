"use client";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export const Social = () => {
	return (
		<div className="flex w-full justify-center space-x-4">
			<Button size="lg" className="w-full" variant="secondary" onClick={() => {}}>
				<FcGoogle className="inline-block h-5 w-5" />
			</Button>
			<Button size="lg" className="w-full" variant="secondary" onClick={() => {}}>
				<FaFacebook className="inline-block h-5 w-5" />
			</Button>
		</div>
	);
};
