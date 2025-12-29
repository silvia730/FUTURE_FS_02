import { Product } from "./store";

const API_URL = "https://fakestoreapi.com";

// Helper to add delay and headers
const fetchWithRetry = async (url: string, retries = 3) => {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                },
                next: { revalidate: 3600 } // Cache for 1 hour
            });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return await res.json();
        } catch (err) {
            if (i === retries - 1) throw err;
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Linear backoff
        }
    }
};

export async function getProducts(): Promise<Product[]> {
    try {
        return await fetchWithRetry(`${API_URL}/products`);
    } catch (error) {
        console.error("Failed to fetch products after retries:", error);
        // Fallback or empty array to prevent build fail
        return [];
    }
}

export async function getProduct(id: string): Promise<Product> {
    const res = await fetch(`${API_URL}/products/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
}

export async function getCategories(): Promise<string[]> {
    try {
        return await fetchWithRetry(`${API_URL}/products/categories`);
    } catch (error) {
        console.error("Failed to fetch categories after retries:", error);
        return [];
    }
}
