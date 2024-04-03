import { Review } from "@prisma/client";

export const calculateReviewRatingAverage = (
  reviews: Pick<Review, "rating">[]
) => {
  if (!reviews) return 0;

  if (reviews.length === 0) return 0;

  const sum = reviews.reduce((sum, review) => sum + review.rating, 0);

  return Number((sum / reviews.length).toFixed(1));
};
