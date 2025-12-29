"use client"
import Link from 'next/link'
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { Button } from '../ui/button'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState, Suspense } from 'react'
import { User as SupabaseUser } from '@supabase/supabase-js'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'

function NavbarContent() {
    const { toggleCart, items } = useCartStore()
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)
    const [user, setUser] = useState<SupabaseUser | null>(null)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const supabase = createClient()
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentCategory = searchParams.get('category')

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        // Check initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
        setIsMobileMenuOpen(false)
    }

    const navLinks = [
        { href: '/', label: 'Home', category: null },
        { href: '/?category=men\'s clothing#products', label: 'Men', category: "men's clothing" },
        { href: '/?category=women\'s clothing#products', label: 'Women', category: "women's clothing" },
        { href: '/?category=electronics#products', label: 'Electronics', category: "electronics" },
        { href: '/?category=jewelery#products', label: 'Jewelery', category: "jewelery" },
    ]

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4">
                <div className="flex items-center">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="text-xl font-bold tracking-tight">StyleStore</span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                        {navLinks.map((link) => {
                            const isActive = currentCategory === link.category;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "transition-all relative py-1",
                                        isActive ? "text-primary" : "text-foreground/60 hover:text-foreground/80"
                                    )}
                                >
                                    {link.label}
                                    {/* Animated Underline */}
                                    <span className={cn(
                                        "absolute left-0 -bottom-1 w-full h-0.5 bg-primary transition-transform duration-300 origin-left scale-x-0",
                                        isActive ? "scale-x-100" : "group-hover:scale-x-100"
                                    )} />
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                <div className="flex items-center space-x-2">
                    {/* Desktop Auth */}
                    <div className="hidden md:flex items-center space-x-2">
                        {user ? (
                            <>
                                <span className="text-sm font-medium text-muted-foreground mr-2">{user.email}</span>
                                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Sign Out
                                </Button>
                            </>
                        ) : (
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/login"><User className="h-4 w-4 mr-2" /> Sign In</Link>
                            </Button>
                        )}
                    </div>

                    <Button variant="ghost" size="icon" onClick={toggleCart} className="relative" aria-label="Open cart">
                        <ShoppingCart className="h-5 w-5" />
                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center shadow-sm">
                                {itemCount}
                            </span>
                        )}
                    </Button>

                    {/* Mobile Menu Toggle */}
                    <Button className="md:hidden" variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t">
                    <div className="container py-4 flex flex-col space-y-4 px-4 bg-background">
                        {navLinks.map((link) => {
                            const isActive = currentCategory === link.category;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "text-sm font-medium transition-colors",
                                        isActive ? "text-primary font-bold" : "hover:text-primary"
                                    )}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                        <div className="pt-4 border-t">
                            {user ? (
                                <div className="flex flex-col space-y-2">
                                    <span className="text-sm font-medium text-muted-foreground">{user.email}</span>
                                    <Button variant="outline" size="sm" onClick={handleSignOut} className="justify-start">
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Sign Out
                                    </Button>
                                </div>
                            ) : (
                                <Button variant="outline" size="sm" asChild className="justify-start w-full">
                                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                        <User className="h-4 w-4 mr-2" /> Sign In
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}

export function Navbar() {
    return (
        <Suspense fallback={<div className="h-16 border-b bg-background" />}>
            <NavbarContent />
        </Suspense>
    )
}
