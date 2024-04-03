import { Review } from "@prisma/client";
import { calculateReviewRatingAverage } from "../../../../utilities/calculateReviewRatingAvg";
import Stars from "../../../components/Stars";

interface IProps {
  reviews: Review[];
}

export default function Ratings(props: IProps) {
  const averageRating = calculateReviewRatingAverage(props.reviews);
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <p>
          <Stars rating={averageRating} />
        </p>
        <p className="text-reg ml-3">{averageRating}</p>
      </div>
      <div>
        <p className="text-reg ml-4">
          {props.reviews.length}{" "}
          {props.reviews.length === 1 ? "review" : "reviews"}
        </p>
      </div>
    </div>
  );
}
