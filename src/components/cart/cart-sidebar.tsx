"use client"
import { useCartStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { X, Plus, Minus, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"

export function CartSidebar() {
    const { isOpen, toggleCart, items, removeItem, updateQuantity } = useCartStore()
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="fixed inset-y-0 right-0 z-50 h-full w-full border-l bg-background p-6 shadow-lg sm:max-w-md flex flex-col"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Shopping Cart</h2>
                            <Button variant="ghost" size="icon" onClick={toggleCart}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto -mx-6 px-6">
                            {items.length === 0 ? (
                                <div className="flex h-full flex-col items-center justify-center space-y-2">
                                    <p className="text-muted-foreground">Your cart is empty.</p>
                                    <Button variant="link" onClick={toggleCart}>Continue Shopping</Button>
                                </div>
                            ) : (
                                <ul className="divide-y divide-border">
                                    {items.map((item) => (
                                        <li key={item.id} className="flex py-6">
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border bg-white">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="h-full w-full object-contain object-center p-2"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-foreground">
                                                        <h3 className="line-clamp-2 pr-4 text-sm"><Link href={`/product/${item.id}`} onClick={toggleCart}>{item.title}</Link></h3>
                                                        <p className="text-sm">{formatPrice(item.price)}</p>
                                                    </div>
                                                    <p className="mt-1 text-xs text-muted-foreground capitalize">{item.category}</p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <div className="flex items-center space-x-2 border rounded-md">
                                                        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-none" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                            <Minus className="h-3 w-3" />
                                                        </Button>
                                                        <span className="w-4 text-center">{item.quantity}</span>
                                                        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-none" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                            <Plus className="h-3 w-3" />
                                                        </Button>
                                                    </div>

                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-destructive hover:text-destructive/90 h-auto p-0 hover:bg-transparent"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {items.length > 0 && (
                            <div className="border-t pt-4 mt-auto">
                                <div className="flex justify-between text-base font-medium text-foreground mb-4">
                                    <p>Subtotal</p>
                                    <p>{formatPrice(subtotal)}</p>
                                </div>
                                <Link
                                    href="/checkout"
                                    onClick={toggleCart}
                                    className="flex w-full items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
                                >
                                    Checkout
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
