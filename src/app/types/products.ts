
type Rating = {
    rate: number;
    count: number;
}

export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    image2: string;
    rating: Rating;
}