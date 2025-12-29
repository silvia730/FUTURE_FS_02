import { Product } from "./store";

const API_URL = "https://fakestoreapi.com";

// Reliability Fix: Use Pexels images for fallback to guarantee they load 
// (Fakestore images often block hotlinking or time out on Vercel)
const FALLBACK_PRODUCTS: Product[] = [
    // Men's Clothing
    {
        id: 1,
        title: "Fjallraven - Foldsack No. 1 Backpack",
        price: 109.95,
        description: "Your perfect pack for everyday use and walks in the forest.",
        category: "men's clothing",
        image: "https://images.pexels.com/photos/1294731/pexels-photo-1294731.jpeg?auto=compress&cs=tinysrgb&w=800", // Backpack
        rating: { rate: 3.9, count: 120 }
    },
    {
        id: 2,
        title: "Mens Casual Premium Slim Fit T-Shirts",
        price: 22.3,
        description: "Slim-fitting style, contrast raglan long sleeve.",
        category: "men's clothing",
        image: "https://images.pexels.com/photos/2294342/pexels-photo-2294342.jpeg?auto=compress&cs=tinysrgb&w=800", // Men's T-shirt
        rating: { rate: 4.1, count: 259 }
    },
    {
        id: 3,
        title: "Mens Cotton Jacket",
        price: 55.99,
        description: "great outerwear jackets for Spring/Autumn/Winter.",
        category: "men's clothing",
        image: "https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=800", // Men's Jacket
        rating: { rate: 4.7, count: 500 }
    },
    {
        id: 4,
        title: "Mens Casual Slim Fit",
        price: 15.99,
        description: "The color could be slightly different between on the screen and in practice.",
        category: "men's clothing",
        image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800", // Men's Shirt
        rating: { rate: 2.1, count: 430 }
    },
    // Jewelery
    {
        id: 5,
        title: "John Hardy Women's Legends Naga Gold & Silver Dragon",
        price: 695,
        description: "From our Legends Collection, the Naga was inspired by the mythical water dragon.",
        category: "jewelery",
        image: "https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=800", // Jewelry
        rating: { rate: 4.6, count: 400 }
    },
    {
        id: 6,
        title: "Solid Gold Petite Micropave ",
        price: 168,
        description: "Satisfaction Guaranteed. Return or exchange any order within 30 days.",
        category: "jewelery",
        image: "https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=800", // Ring
        rating: { rate: 3.9, count: 70 }
    },
    {
        id: 7,
        title: "White Gold Plated Princess",
        price: 9.99,
        description: "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her.",
        category: "jewelery",
        image: "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&w=800", // Ring
        rating: { rate: 3, count: 400 }
    },
    {
        id: 8,
        title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
        price: 10.99,
        description: "Rose Gold Plated Double Flared Tunnel Plug Earrings.",
        category: "jewelery",
        image: "https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&cs=tinysrgb&w=800", // Earring
        rating: { rate: 1.9, count: 100 }
    },
    // Electronics
    {
        id: 9,
        title: "WD 2TB Elements Portable External Hard Drive",
        price: 64,
        description: "USB 3.0 and USB 2.0 Compatibility Fast data transfers",
        category: "electronics",
        image: "https://images.pexels.com/photos/5474295/pexels-photo-5474295.jpeg?auto=compress&cs=tinysrgb&w=800", // Hard Drive
        rating: { rate: 3.3, count: 203 }
    },
    {
        id: 10,
        title: "SanDisk SSD PLUS 1TB Internal SSD",
        price: 109,
        description: "Easy upgrade for faster boot up, shutdown, application load and response",
        category: "electronics",
        image: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=800", // SSD/Electronics
        rating: { rate: 2.9, count: 470 }
    },
    {
        id: 11,
        title: "Silicon Power 256GB SSD 3D NAND A55",
        price: 109,
        description: "3D NAND flash are applied to deliver high transfer speeds",
        category: "electronics",
        image: "https://images.pexels.com/photos/459653/pexels-photo-459653.jpeg?auto=compress&cs=tinysrgb&w=800", // Electronics
        rating: { rate: 4.8, count: 319 }
    },
    {
        id: 12,
        title: "WD 4TB Gaming Drive Works with Playstation 4",
        price: 114,
        description: "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup",
        category: "electronics",
        image: "https://images.pexels.com/photos/1637859/pexels-photo-1637859.jpeg?auto=compress&cs=tinysrgb&w=800", // Gaming
        rating: { rate: 4.8, count: 400 }
    },
    {
        id: 13,
        title: "Acer SB220Q bi 21.5 inches Full HD IPS Ultra-Thin",
        price: 599,
        description: "21. 5 inches Full HD (1920 x 1080) widescreen IPS display",
        category: "electronics",
        image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=800", // Monitor
        rating: { rate: 2.9, count: 250 }
    },
    {
        id: 14,
        title: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor",
        price: 999.99,
        description: "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR",
        category: "electronics",
        image: "https://images.pexels.com/photos/7043216/pexels-photo-7043216.jpeg?auto=compress&cs=tinysrgb&w=800", // Monitor
        rating: { rate: 2.2, count: 140 }
    },
    // Women's Clothing
    {
        id: 15,
        title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket",
        price: 56.99,
        description: "Note:The Jackets is US standard size, Please choose size as your usual wear",
        category: "women's clothing",
        image: "https://images.pexels.com/photos/375880/pexels-photo-375880.jpeg?auto=compress&cs=tinysrgb&w=800", // Jacket
        rating: { rate: 2.6, count: 235 }
    },
    {
        id: 16,
        title: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
        price: 29.95,
        description: "100% POLYURETHANE(shell) 100% POLYESTER(lining)",
        category: "women's clothing",
        image: "https://images.pexels.com/photos/1192601/pexels-photo-1192601.jpeg?auto=compress&cs=tinysrgb&w=800", // Jacket
        rating: { rate: 2.9, count: 340 }
    },
    {
        id: 17,
        title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
        price: 39.99,
        description: "Lightweight perfet for trip or casual wear---Long sleeve with hooded",
        category: "women's clothing",
        image: "https://images.pexels.com/photos/1755455/pexels-photo-1755455.jpeg?auto=compress&cs=tinysrgb&w=800", // Jacket
        rating: { rate: 3.8, count: 679 }
    },
    {
        id: 18,
        title: "MBJ Women's Solid Short Sleeve Boat Neck V ",
        price: 9.85,
        description: "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach",
        category: "women's clothing",
        image: "https://images.pexels.com/photos/6311687/pexels-photo-6311687.jpeg?auto=compress&cs=tinysrgb&w=800", // Top
        rating: { rate: 4.7, count: 130 }
    },
    {
        id: 19,
        title: "Opna Women's Short Sleeve Moisture",
        price: 7.95,
        description: "100% Polyester, Machine wash, 100% cationic polyester interlock",
        category: "women's clothing",
        image: "https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=800", // Top
        rating: { rate: 4.5, count: 146 }
    },
    {
        id: 20,
        title: "DANVOUY Womens T Shirt Casual Cotton Short",
        price: 12.99,
        description: "95%Cotton,5%Spandex, Features: Casual, Short Sleeve",
        category: "women's clothing",
        image: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=800", // T-shirt
        rating: { rate: 3.6, count: 145 }
    }
];

const FALLBACK_CATEGORIES = ["electronics", "jewelery", "men's clothing", "women's clothing"];

export async function getProducts(): Promise<Product[]> {
    try {
        const res = await fetch(`${API_URL}/products`, {
            next: { revalidate: 3600 }
        });

        // Sometimes the API returns 200 but valid JSON is not array, or fails
        // Or if it returns 403 Forbidden (common with Fakestore API on Vercel)
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
