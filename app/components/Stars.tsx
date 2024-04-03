import React from "react";

import fullStar from "../../public/icons/full-star.png";
import halfStar from "../../public/icons/half-star.png";
import emptyStar from "../../public/icons/empty-star.png";

import Image from "next/image";

interface IProps {
  rating: number;
}

function FullStar() {
  return <Image className="h-4 w-4" src={fullStar} alt="full-star" />;
}

function HalfStar() {
  return <Image className="h-4 w-4" src={halfStar} alt="half-star" />;
}

function EmptyStar() {
  return <Image className="h-4 w-4" src={emptyStar} alt="empty-star" />;
}

function renderStar(starNumber: number, rating: number) {
  if (rating >= starNumber) return <FullStar />;

  if (rating >= starNumber - 1 && rating < starNumber) {
    const decimal = rating - (starNumber - 1);

    if (decimal <= 0.2) return <EmptyStar />;
    if (decimal > 0.2 && decimal < 0.6) return <HalfStar />;
    return <FullStar />;
  }

  return <EmptyStar />;
}

export default function Stars(props: IProps) {
  return (
    <div className="flex items-center">
      {renderStar(1, props.rating)}
      {renderStar(2, props.rating)}
      {renderStar(3, props.rating)}
      {renderStar(4, props.rating)}
      {renderStar(5, props.rating)}
    </div>
  );
}
