import Link from "next/link";
import { RestaurantCardType } from "../../page";
import Price from "../../components/Price";
import { calculateReviewRatingAverage } from "../../../utilities/calculateReviewRatingAvg";
import { Review } from "@prisma/client";
import Stars from "../../components/Stars";

interface IProps {
  key: number;
  restaurant: RestaurantCardType;
}

const renderRatingText = (reviews: Pick<Review, "rating">[]) => {
  const rating = calculateReviewRatingAverage(reviews);

  if (rating > 4) return "Awesome";

  if (rating > 3) return "Good";

  if (rating > 2) return "Average";

  return "";
};

export default function RestaurantCard({ restaurant }: IProps) {
  return (
    <div className="border-b flex pb-5">
      <img src={restaurant.main_image} alt="" className="w-44 rounded" />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-center">
          <Stars rating={calculateReviewRatingAverage(restaurant.reviews)} />
          <p className="ml-2">{renderRatingText(restaurant.reviews)}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={restaurant.price} />
            <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
            <p className="mr-4 capitalize">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
}
