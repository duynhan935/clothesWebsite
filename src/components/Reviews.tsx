import { reviews, type Review } from "../data/reviews";
import { Rate } from "antd";

function ReviewCard({ review }: { review: Review }) {
    return (
        <div className="border bg-white p-6">
            <h4 className="font-semibold text-gray-800 mb-1">{review.author}</h4>
            <Rate disabled defaultValue={review.rating} className="text-yellow-500 mb-3" />
            <h3 className="font-semibold mb-2">{review.title}</h3>
            <p className="text-sm text-gray-600">“{review.content}”</p>
        </div>
    );
}

export default function ReviewsGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rv) => (
                <ReviewCard key={rv.id} review={rv} />
            ))}
        </div>
    );
}
