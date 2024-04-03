import { Review } from "@prisma/client";
import Stars from "../../../components/Stars";

interface IProps {
  key: number;
  review: Review;
}

const getInitials = (review: Review) => {
  return (
    review.first_name.charAt(0) + review.last_name.charAt(0)
  ).toUpperCase();
};

export default function ReviewCard(props: IProps) {
  return (
    <div className="border-b pb-7 mb-7">
      <div className="flex">
        <div className="w-1/6 flex flex-col items-center">
          <div className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center">
            <h2 className="text-white text-2xl">{getInitials(props.review)}</h2>
          </div>
          <p className="text-center">
            {props.review.first_name} {props.review.last_name}
          </p>
        </div>
        <div className="ml-10 w-5/6">
          <div className="flex items-center">
            <div className="flex mr-5">
              <Stars rating={props.review.rating} />
            </div>
          </div>
          <div className="mt-5">
            <p className="text-lg font-light">{props.review.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
