import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
        rate: number
        count: number
    }
}

export interface CartItem extends Product {
    quantity: number
}

interface CartState {
    items: CartItem[]
    addItem: (product: Product) => void
    removeItem: (productId: number) => void
    updateQuantity: (productId: number, quantity: number) => void
    clearCart: () => void
    isOpen: boolean
    toggleCart: () => void
    setIsOpen: (isOpen: boolean) => void
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            isOpen: false,
            addItem: (product) => set((state) => {
                const existing = state.items.find((item) => item.id === product.id)
                if (existing) {
                    return {
                        items: state.items.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                        isOpen: true,
                    }
                }
                return { items: [...state.items, { ...product, quantity: 1 }], isOpen: true }
            }),
            removeItem: (id) => set((state) => ({
                items: state.items.filter((item) => item.id !== id)
            })),
            updateQuantity: (id, quantity) => set((state) => ({
                items: state.items.map((item) =>
                    item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
                ).filter(item => item.quantity > 0)
            })),
            clearCart: () => set({ items: [] }),
            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
            setIsOpen: (isOpen) => set({ isOpen }),
        }),
        {
            name: 'cart-storage',
        }
    )
)
