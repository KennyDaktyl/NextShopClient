"use server";

import { removeCart } from "@/api/removeCart";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function removeCartAction(formData: FormData) {
    await removeCart();
    cookies().set("cartId", "", { maxAge: 0 });
    revalidatePath("/cart");
    revalidatePath("/");
}