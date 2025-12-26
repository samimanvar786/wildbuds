export interface Category {
    id: number;
    name: string;
    description: string;
    image: string;
    productCount: number;
    color: string;
}

export const fetchCategories = async (): Promise<Category[]> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories`);
        console.log(`Fetching categories from ${res.url}`);

        if (!res.ok) {
            throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        return data.categories || data; // Adjust if your API returns { categories: [...] }
    } catch (error: any) {
        throw new Error(error.message || 'Unknown error');
    }
};
