// src/data/reviews.ts

export interface Review {
    id: number;
    author: string;
    rating: number; // 1‑5 stars
    title: string;
    content: string;
}

export const reviews: Review[] = [
    {
        id: 1,
        author: "Sarah Taylor",
        rating: 5,
        title: "Beautiful Sweater",
        content: "Really a beautiful sweater for women. I am really lucky that I could buy this sweater very easily",
    },
    {
        id: 2,
        author: "Meg Lanning",
        rating: 5,
        title: "Awesome Sweater",
        content: "Really a beautiful sweater for women. I am really lucky that I could buy this sweater very easily",
    },
    {
        id: 3,
        author: "Alyssa Healy",
        rating: 5,
        title: "Wonderful Sweater",
        content: "Really a beautiful sweater for women. I am really lucky that I could buy this sweater very easily",
    },
    {
        id: 4,
        author: "Ellyse Perry",
        rating: 5,
        title: "Best Sweater",
        content: "Really a beautiful sweater for women. I am really lucky that I could buy this sweater very easily",
    },
    {
        id: 5,
        author: "Beth Mooney",
        rating: 5,
        title: "Good Sweater",
        content: "Really a beautiful sweater for women. I am really lucky that I could buy this sweater very easily",
    },
    {
        id: 6,
        author: "Megan Schutt",
        rating: 5,
        title: "Nice Sweater",
        content: "Really a beautiful sweater for women. I am really lucky that I could buy this sweater very easily",
    },
];
