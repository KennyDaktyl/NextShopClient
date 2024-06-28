"use server";

import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest): Promise<NextResponse> {
	const body = await request.json();
	const tags = body.tags;

	if (!tags) {
		return new NextResponse("Tag is required", { status: 400 });
	}

	try {
		tags.forEach((tag: string) => {
			console.log(`Revalidating tag: ${tag}`);
			revalidateTag(tag);
		});
		return new NextResponse("Revalidation successful", { status: 200 });
	} catch (err) {
		console.error("Error revalidating", err);
		return new NextResponse("Error revalidating", { status: 500 });
	}
}
