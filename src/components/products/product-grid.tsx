"use client"
import { useState, useMemo, useEffect } from 'react'
import { Product } from '@/lib/store'
import { ProductCard } from './product-card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

interface ProductGridProps {
    products: Product[]
    categories: string[]
}

export function ProductGrid({ products, categories }: ProductGridProps) {
    const [search, setSearch] = useState('')
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const selectedCategory = searchParams.get('category')

    const updateCategory = (category: string | null) => {
        const params = new URLSearchParams(searchParams.toString())
        if (category) {
            params.set('category', category)
        } else {
            params.delete('category')
        }
        router.push(`${pathname}?${params.toString()}`)
    }

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase())
            // Check if selectedCategory is set and matches, handling URL decoding automatically done by searchParams
            const matchesCategory = selectedCategory
                ? product.category === selectedCategory
                : true
            return matchesSearch && matchesCategory
        })
    }, [products, search, selectedCategory])

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-card p-4 rounded-lg border shadow-sm">
                <div className="relative w-full md:max-w-xs">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search products..."
                        className="pl-9"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant={selectedCategory === null ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => updateCategory(null)}
                    >
                        All
                    </Button>
                    {categories.map(cat => (
                        <Button
                            key={cat}
                            variant={selectedCategory === cat ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => updateCategory(cat)}
                            className="capitalize"
                        >
                            {cat}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-lg font-semibold">No products found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                    <Button variant="link" onClick={() => { setSearch(''); updateCategory(null); }}>Clear all filters</Button>
                </div>
            )}
        </div>
    )
}
