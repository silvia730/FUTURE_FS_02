"use client"
import { Product, useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export function AddToCartButton({ product }: { product: Product }) {
    const { addItem } = useCartStore();
    return (
        <Button size="lg" className="w-full md:w-auto text-lg py-6" onClick={() => addItem(product)}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
        </Button>
    )
}
