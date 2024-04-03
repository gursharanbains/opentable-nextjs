import { PRICE, PrismaClient } from "@prisma/client";
import Link from "next/link";
import { SearchParams } from "../page";

const prisma = new PrismaClient();

const fetchLocations = async () => {
  const locations = await prisma.location.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return locations;
};

const fetchCuisines = async () => {
  const cuisines = await prisma.cuisine.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return cuisines;
};

interface IProps {
  params: SearchParams;
}

export default async function SearchSideBar({ params }: IProps) {
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();
  return (
    <div className="w-1/5">
      <div className="flex flex-col border-b pb-4">
        <h1 className="mb-2">Region</h1>
        {locations.map((location) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...params,
                city: location.name,
              },
            }}
            className="font-light text-reg capitalize"
          >
            {location.name}
          </Link>
        ))}
      </div>
      <div className="flex flex-col border-b pb-4 mt-3">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map((cuisine) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...params,
                cuisine: cuisine.name,
              },
            }}
            className="font-light text-reg capitalize"
          >
            {cuisine.name}
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          <Link
            href={{
              pathname: "/search",
              query: {
                ...params,
                price: PRICE.CHEAP,
              },
            }}
            className="border text-center w-full text-reg font-light rounded-l p-2"
          >
            $$
          </Link>
          <Link
            href={{
              pathname: "/search",
              query: {
                ...params,
                price: PRICE.REGULAR,
              },
            }}
            className="border-r text-center border-t border-b w-full text-reg font-light p-2"
          >
            $$$
          </Link>
          <Link
            href={{
              pathname: "/search",
              query: {
                ...params,
                price: PRICE.EXPENSIVE,
              },
            }}
            className="border-r text-center border-t border-b w-full text-reg font-light p-2 rounded-r"
          >
            $$$$
          </Link>
        </div>
      </div>
    </div>
  );
}
