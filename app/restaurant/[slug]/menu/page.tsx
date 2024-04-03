import Link from "next/link";
import NavBar from "../../../components/NavBar";
import Header from "../components/Header";
import RestaurantNavBar from "../components/RestaurantNavBar";
import Menu from "../components/Menu";

import { Metadata } from "next";
import { PrismaClient } from "@prisma/client";

export const metadata: Metadata = {
  title: "Menu of Milestones Grill - OpenTable",
  description: "...",
};

const prisma = new PrismaClient();

const fetchMenuBySlug = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });

  if (!restaurant) throw new Error();

  return restaurant.items;
};

export default async function RestaurantMenu({
  params,
}: {
  params: { slug: string };
}) {
  const menu = await fetchMenuBySlug(params.slug);
  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      <RestaurantNavBar slug={params.slug} />
      <Menu menu={menu} />
    </div>
  );
}
