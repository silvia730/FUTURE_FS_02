"use client"
import { Product } from "@/lib/store";
import { useCartStore } from "@/lib/store";
import { Button } from "../ui/button";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProductCardProps {
    product: Product;
    className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
    const { addItem } = useCartStore();

    return (
        <div className={cn("group relative flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-lg", className)}>
            <Link href={`/product/${product.id}`} className="aspect-square w-full overflow-hidden bg-white p-6">
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-110"
                />
            </Link>
            <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{product.category}</span>
                    <div className="flex items-center text-amber-500">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="ml-1 text-xs font-medium text-muted-foreground">{product.rating.rate}</span>
                    </div>
                </div>
                <h3 className="line-clamp-2 text-sm font-medium leading-tight mb-4 flex-1">
                    <Link href={`/product/${product.id}`} className="hover:underline">
                        {product.title}
                    </Link>
                </h3>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold">{formatPrice(product.price)}</span>
                    <Button size="sm" onClick={(e) => {
                        e.preventDefault();
                        addItem(product);
                    }}>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add
                    </Button>
                </div>
            </div>
        </div>
    );
}
