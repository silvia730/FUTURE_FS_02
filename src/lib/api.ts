import { Product } from "./store";

const API_URL = "https://fakestoreapi.com";

// Comprehensive fallback data to ensure the app looks good even if the API fails
// Using Pexels/Placeholder images where Fakestore ones might be rate-limited
const FALLBACK_PRODUCTS: Product[] = [
    // Men's Clothing
    {
        id: 1,
        title: "Fjallraven - Foldsack No. 1 Backpack",
        price: 109.95,
        description: "Your perfect pack for everyday use and walks in the forest.",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        rating: { rate: 3.9, count: 120 }
    },
    {
        id: 2,
        title: "Mens Casual Premium Slim Fit T-Shirts",
        price: 22.3,
        description: "Slim-fitting style, contrast raglan long sleeve.",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        rating: { rate: 4.1, count: 259 }
    },
    // Jewelery
    {
        id: 5,
        title: "John Hardy Women's Legends Naga Gold & Silver Dragon",
        price: 695,
        description: "From our Legends Collection, the Naga was inspired by the mythical water dragon.",
        category: "jewelery",
        image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
        rating: { rate: 4.6, count: 400 }
    },
    // Electronics
    {
        id: 9,
        title: "WD 2TB Elements Portable External Hard Drive",
        price: 64,
        description: "USB 3.0 and USB 2.0 Compatibility Fast data transfers",
        category: "electronics",
        image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
        rating: { rate: 3.3, count: 203 }
    },
    {
        id: 13,
        title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
        price: 599,
        description: "21. 5 inches Full HD (1920 x 1080) widescreen IPS display",
        category: "electronics",
        image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
        rating: { rate: 2.9, count: 250 }
    },
    // Women's Clothing
    {
        id: 15,
        title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
        price: 56.99,
        description: "Note:The Jackets is US standard size, Please choose size as your usual wear.",
        category: "women's clothing",
        image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
        rating: { rate: 2.6, count: 235 }
    },
    {
        id: 19,
        title: "Opna Women's Short Sleeve Moisture",
        price: 7.95,
        description: "100% Polyester, Machine wash, 100% cationic polyester interlock.",
        category: "women's clothing",
        image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
        rating: { rate: 4.5, count: 146 }
    }
];

const FALLBACK_CATEGORIES = ["electronics", "jewelery", "men's clothing", "women's clothing"];

export async function getProducts(): Promise<Product[]> {
    try {
        const res = await fetch(`${API_URL}/products`, {
            next: { revalidate: 3600 }
        });

        // Sometimes the API returns 200 but valid JSON is not array, or fails
        if (!res.ok) {
            console.warn(`API Error ${res.status}: Using fallback products.`);
            return FALLBACK_PRODUCTS;
        }

        const data = await res.json();
        if (!Array.isArray(data)) {
            console.warn("API Error: Response is not an array. Using fallback.");
            return FALLBACK_PRODUCTS;
        }

        return data;
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
        console.error(`Failed to fetch product ${id}, using fallback logic. Error: ${error}`);
        // Find matching in fallback or return default
        const fallbackParams = FALLBACK_PRODUCTS.find(p => p.id === Number(id)) || FALLBACK_PRODUCTS[0];
        return { ...fallbackParams, id: Number(id) };
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
        const data = await res.json();
        if (!Array.isArray(data)) {
            return FALLBACK_CATEGORIES;
        }
        return data;
    } catch (error) {
        console.error("Failed to fetch categories, using fallback:", error);
        return FALLBACK_CATEGORIES;
    }
}
