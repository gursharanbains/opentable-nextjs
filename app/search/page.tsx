import { useSearchParams } from "next/navigation";
import NavBar from "../components/NavBar";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSideBar from "./components/SearchSideBar";
import { PRICE, PrismaClient } from "@prisma/client";
import { useRouter } from "next/navigation";
import { PromiseResolvedType } from "../page";

const prisma = new PrismaClient();

const fetchRestaurantsByParams = async (searchParams: SearchParams) => {
  const restaurants = await prisma.restaurant.findMany({
    where: {
      location: {
        name: searchParams.city.toLowerCase(),
      },
      cuisine: searchParams.cuisine
        ? { name: searchParams.cuisine.toLowerCase() }
        : undefined,
      price: searchParams.price ? searchParams.price : undefined,
    },
    select: {
      id: true,
      name: true,
      price: true,
      cuisine: true,
      location: true,
      slug: true,
      main_image: true,
      reviews: {
        select: {
          id: true,
          rating: true,
        },
      },
    },
  });

  return restaurants;
};

export type SearchParams = {
  city: string;
  cuisine?: string;
  price?: PRICE;
};

export default function Search({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const renderRestaurants = async () => {
    if (searchParams.city) {
      const restaurants = await fetchRestaurantsByParams(searchParams);

      if (restaurants.length)
        return restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ));
    }

    return <p>No restaurants found.</p>;
  };

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar params={searchParams} />
        <div className="w-5/6">{renderRestaurants()}</div>
      </div>
    </>
  );
}
