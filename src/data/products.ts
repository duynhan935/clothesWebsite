// src/data/products.ts

import ao1 from "../assets/ao1.svg?url";
// Dùng chung 1 ảnh cho demo. Có thể thêm ao2.svg, ao3.svg… nếu bạn có.

export interface Product {
    id: number;
    name: string;
    category: string;
    rating: number;
    price: number;
    image: string;
}

export const products: Product[] = [
    {
        id: 1,
        name: "Mid‑Century Modern T‑Shirt",
        category: "Men's Clothes",
        rating: 5,
        price: 110,
        image: ao1,
    },
    {
        id: 2,
        name: "Modern Basic Tee",
        category: "Men's Clothes",
        rating: 4,
        price: 89,
        image: ao1,
    },
    {
        id: 3,
        name: "Classic Cotton Shirt",
        category: "Men's Clothes",
        rating: 5,
        price: 120,
        image: ao1,
    },
    {
        id: 4,
        name: "Vintage Denim Jacket",
        category: "Men's Clothes",
        rating: 5,
        price: 199,
        image: ao1,
    },
    {
        id: 5,
        name: "Slim Fit Chinos",
        category: "Men's Pants",
        rating: 4,
        price: 79,
        image: ao1,
    },
    {
        id: 6,
        name: "Athletic Joggers",
        category: "Men's Pants",
        rating: 5,
        price: 99,
        image: ao1,
    },
    {
        id: 7,
        name: "Comfy Hoodie",
        category: "Men's Clothes",
        rating: 5,
        price: 129,
        image: ao1,
    },
    {
        id: 8,
        name: "Summer Linen Shirt",
        category: "Men's Clothes",
        rating: 4,
        price: 109,
        image: ao1,
    },
    {
        id: 9,
        name: "Graphic Tee – Mountain",
        category: "Men's Clothes",
        rating: 5,
        price: 49,
        image: ao1,
    },
    {
        id: 10,
        name: "Essential Crewneck",
        category: "Men's Clothes",
        rating: 4,
        price: 59,
        image: ao1,
    },
    {
        id: 11,
        name: "Casual Shorts",
        category: "Men's Pants",
        rating: 4,
        price: 69,
        image: ao1,
    },
    {
        id: 12,
        name: "Lightweight Windbreaker",
        category: "Outerwear",
        rating: 5,
        price: 149,
        image: ao1,
    },
    {
        id: 13,
        name: "Oversized Sweatshirt",
        category: "Unisex",
        rating: 5,
        price: 99,
        image: ao1,
    },
    {
        id: 14,
        name: "Polo Shirt Classic",
        category: "Men's Clothes",
        rating: 4,
        price: 89,
        image: ao1,
    },
    {
        id: 15,
        name: "Checked Flannel Shirt",
        category: "Men's Clothes",
        rating: 5,
        price: 119,
        image: ao1,
    },
    {
        id: 16,
        name: "Rugged Parka Coat",
        category: "Outerwear",
        rating: 5,
        price: 249,
        image: ao1,
    },
];
