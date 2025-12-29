import { Product } from "./store";

const API_URL = "https://fakestoreapi.com";

// Hardcoded fallback data to ensure build succeeds even if API is rate-limiting/blocking
const FALLBACK_PRODUCTS: Product[] = [
    {
        id: 1,
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        price: 109.95,
        description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        rating: { rate: 3.9, count: 120 }
    },
    {
        id: 2,
        title: "Mens Casual Premium Slim Fit T-Shirts ",
        price: 22.3,
        description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        rating: { rate: 4.1, count: 259 }
    },
    {
        id: 3,
        title: "Mens Cotton Jacket",
        price: 55.99,
        description: "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors.",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
        rating: { rate: 4.7, count: 500 }
    }
];

const FALLBACK_CATEGORIES = ["electronics", "jewelery", "men's clothing", "women's clothing"];

export async function getProducts(): Promise<Product[]> {
    try {
        const res = await fetch(`${API_URL}/products`, {
            next: { revalidate: 3600 }
        });
        if (!res.ok) {
            console.warn(`API Error ${res.status}: Using fallback products.`);
            return FALLBACK_PRODUCTS;
        }
        return await res.json();
    } catch (error) {
        console.error("Failed to fetch products, using fallback:", error);
        return FALLBACK_PRODUCTS;
    }
}

export async function getProduct(id: string): Promise<Product> {
    try {
        const res = await fetch(`${API_URL}/products/${id}`, { next: { revalidate: 3600 } });
        if (!res.ok) throw new Error("Failed to fetch product");
        return await res.json();
    } catch (error) {
        console.error(`Failed to fetch product ${id}, using fallback logic`);
        // Return first fallback item as a safe failover for build
        return { ...FALLBACK_PRODUCTS[0], id: Number(id) };
    }
}

export async function getCategories(): Promise<string[]> {
    try {
        const res = await fetch(`${API_URL}/products/categories`, {
            next: { revalidate: 3600 }
        });
        if (!res.ok) {
            console.warn(`API Error ${res.status}: Using fallback categories.`);
            return FALLBACK_CATEGORIES;
        }
        return await res.json();
    } catch (error) {
        console.error("Failed to fetch categories, using fallback:", error);
        return FALLBACK_CATEGORIES;
    }
}
