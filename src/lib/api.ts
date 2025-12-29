import { Product } from "./store";

const API_URL = "https://fakestoreapi.com";

export async function getProducts(): Promise<Product[]> {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
}

export async function getProduct(id: string): Promise<Product> {
    const res = await fetch(`${API_URL}/products/${id}`);
    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
}

export async function getCategories(): Promise<string[]> {
    const res = await fetch(`${API_URL}/products/categories`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
}
