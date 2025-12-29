import { ProductGrid } from "@/components/products/product-grid";
import { getProducts, getCategories } from "@/lib/api";
import { Suspense } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <div className="min-h-screen">
      <section className="relative h-[600px] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 z-0 h-full w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1920")',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl drop-shadow-sm">
            Elevate Your Style
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-200 sm:text-xl drop-shadow-sm">
            Discover the latest trends in fashion and electronics. curated for the modern lifestyle. Quality you can trust, aesthetics you'll love.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="h-12 px-8 text-lg font-semibold bg-white text-black hover:bg-gray-100 border-0">
              <Link href="#products">
                Shop Collection <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-lg font-semibold border-white text-white hover:bg-white/20 hover:text-white bg-transparent">
              <Link href="/?category=men's clothing#products">
                Men's Fashion
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div id="products" className="container mx-auto px-4 py-16">
        <div className="mb-12 space-y-4 text-center sm:text-left sm:flex sm:items-end sm:justify-between sm:space-y-0">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Trending Now</h2>
            <p className="mt-2 text-muted-foreground">Hand-picked favorites just for you.</p>
          </div>
        </div>
        <Suspense fallback={<div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
          <ProductGrid products={products} categories={categories} />
        </Suspense>
      </div>
    </div>
  );
}
