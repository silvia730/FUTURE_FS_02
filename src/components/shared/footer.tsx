import Link from "next/link";
import { Facebook, Instagram, Twitter, Github } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-background border-t">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
                    <div className="md:col-span-2">
                        <Link href="/" className="text-xl font-bold tracking-tight">
                            StyleStore
                        </Link>
                        <p className="mt-4 text-sm text-muted-foreground w-full max-w-xs">
                            Your one-stop destination for premium fashion, electronics, and lifestyle products. Quality meets affordability.
                        </p>
                        <div className="mt-6 flex space-x-4">
                            <a href="#" className="text-muted-foreground hover:text-foreground">
                                <span className="sr-only">Facebook</span>
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-foreground">
                                <span className="sr-only">Instagram</span>
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-foreground">
                                <span className="sr-only">Twitter</span>
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-foreground">
                                <span className="sr-only">GitHub</span>
                                <Github className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold tracking-wider uppercase">Shop</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/?category=men%27s%20clothing" className="text-sm text-muted-foreground hover:text-foreground">
                                    Men's Clothing
                                </Link>
                            </li>
                            <li>
                                <Link href="/?category=women%27s%20clothing" className="text-sm text-muted-foreground hover:text-foreground">
                                    Women's Clothing
                                </Link>
                            </li>
                            <li>
                                <Link href="/?category=electronics" className="text-sm text-muted-foreground hover:text-foreground">
                                    Electronics
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold tracking-wider uppercase">Support</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                                    Shipping & Returns
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold tracking-wider uppercase">Company</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8">
                    <p className="text-center text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} StyleStore. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
