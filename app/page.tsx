import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import {
  Cuisine,
  PrismaClient,
  Location,
  PRICE,
  Restaurant,
} from "@prisma/client";

const prisma = new PrismaClient();

const fetchRestaurants = async () => {
  return await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
      slug: true,
      reviews: {
        select: {
          id: true,
          rating: true,
        },
      },
    },
  });
};

export type PromiseResolvedType<T> = T extends Promise<infer R> ? R : never;

type RestaurantCardsArrayType = PromiseResolvedType<
  ReturnType<typeof fetchRestaurants>
>;

export type RestaurantCardType = RestaurantCardsArrayType[number];

export default async function Home() {
  const restaurants = await fetchRestaurants();

  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </main>
  );
}
