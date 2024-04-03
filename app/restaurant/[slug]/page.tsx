import Link from "next/link";
import NavBar from "../../components/NavBar";
import Header from "./components/Header";
import { notFound } from "next/navigation";
import RestaurantNavBar from "./components/RestaurantNavBar";
import Title from "./components/Title";
import Ratings from "./components/Ratings";
import Description from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import ReservationCard from "./components/ReservationCard";
import { PrismaClient } from "@prisma/client";
import { NextPage } from "next";
import { PromiseResolvedType } from "../../page";

type RestaurantType = PromiseResolvedType<
  ReturnType<typeof fetchRestaurantBySlug>
>;

const prisma = new PrismaClient();

const fetchRestaurantBySlug = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    notFound();
  }

  return restaurant;
};

export default async function RestaurantDetails({
  params,
}: {
  params: { slug: string };
}) {
  const restaurant: RestaurantType = await fetchRestaurantBySlug(params.slug);
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant.slug} />
        <Title name={restaurant.name} />
        <Ratings reviews={restaurant.reviews} />
        <Description description={restaurant.description} />
        <Images images={restaurant.images} />
        <Reviews reviews={restaurant.reviews} />
      </div>
      <div className="w-[40%] relative text-reg ml-5">
        <ReservationCard
          openTime={restaurant.open_time}
          closeTime={restaurant.close_time}
        />
      </div>
    </>
  );
}
