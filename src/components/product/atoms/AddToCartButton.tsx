// components/AddToCartButton.tsx
"use client";

import { addToCartAction } from "@/app/cart/actions";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";

type AddToCartButtonProps = {
    formData: FormData;
    onAddedToCart: () => void;
};

export default function AddToCartButton({ formData, onAddedToCart }: AddToCartButtonProps) {
    const [isPending, startTransition] = useTransition();

    const handleClick = async () => {
        startTransition(async () => {
            await addToCartAction(formData);
            onAddedToCart();
        });
    };

    return (
        <Button
            type="button"
            onClick={handleClick}
            disabled={isPending}
            className={`w-full rounded-md text-white transition hover:bg-gray-500 ${isPending ? 'cursor-wait hover:cursor-wait' : 'cursor-pointer'}  transition-shadow`}
        >
            Dodaj do koszyka 
        </Button>
    );
}
