import { CheckoutForm } from "@/components/checkout/checkout-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <Button variant="ghost" asChild className="mb-6 pl-0 hover:bg-transparent hover:text-primary">
                <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Store</Link>
            </Button>
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <CheckoutForm />
        </div>
    )
}
