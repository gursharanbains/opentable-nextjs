import { Review } from "@prisma/client";
import ReviewCard from "./ReviewCard";

interface IProps {
  reviews: Review[];
}

export default function Reviews(props: IProps) {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
        What {props.reviews.length > 1 ? props.reviews.length : ""} people are
        saying
      </h1>
      <div>
        {/*REVIEW CARD */}

        {props.reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
        {/*REVIEW CARD */}
      </div>
    </div>
  );
}
