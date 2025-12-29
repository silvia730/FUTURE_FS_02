import { getProduct } from "@/lib/api";
import { AddToCartButton } from "@/components/products/add-to-cart-button";
import { Button } from "@/components/ui/button";
import { Star, ArrowLeft } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const product = await getProduct(params.id);

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <Button variant="ghost" asChild className="mb-8 pl-0 hover:bg-transparent hover:text-primary">
                <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Store</Link>
            </Button>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
                <div className="aspect-square overflow-hidden rounded-xl border bg-white p-8 flex items-center justify-center">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-contain object-center max-h-[500px]"
                    />
                </div>

                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl font-bold sm:text-4xl leading-tight">{product.title}</h1>
                    <div className="mt-4 flex items-center space-x-4">
                        <div className="flex items-center text-amber-500">
                            <Star className="h-5 w-5 fill-current" />
                            <span className="ml-1 text-base font-medium text-foreground">{product.rating.rate}</span>
                            <span className="ml-1 text-sm text-muted-foreground">({product.rating.count} reviews)</span>
                        </div>
                        <span className="text-sm font-medium text-muted-foreground uppercase px-2 py-1 bg-secondary rounded-full">{product.category}</span>
                    </div>

                    <div className="mt-8">
                        <span className="text-4xl font-bold text-primary">{formatPrice(product.price)}</span>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-sm font-medium text-foreground/80 uppercase tracking-wide">Description</h3>
                        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{product.description}</p>
                    </div>

                    <div className="mt-10 border-t pt-10">
                        <AddToCartButton product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
}
