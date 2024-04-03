import { NextApiRequest, NextApiResponse } from "next";
import { times } from "../../../../data";\
import { PrismaClient } from "@prisma/client"
import { tableSortLabelClasses } from "@mui/material";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug, day, time, partySize } = req.query as {
    slug: string;
    day: string;
    time: string;
    partySize: string;
  };

  if (!day || !time || !partySize) {
    return res.status(400).json({
      errorMessage: "Invalid data provided",
    });
  }

  const searchTimes = times.find((t) => t.time === time)?.searchTimes;

  if (!searchTimes) {
    return res.status(400).json({
      errorMessage: "Invalid data provided",
    });
  }

  // Fetch all current bookings that lie in the search time range
  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: convertToDate(day, searchTimes[0]),
        lte: convertToDate(day, searchTimes[searchTimes.length - 1])
      }
    },
    select: {
      id: true,
      number_of_people: true,
      booking_time: true,
      tables: true
    }
  })

  // Construct an object to track all current bookings
  const bookingTablesObj:{[key: string]:{[key: number]: true}} = {}

  bookings.forEach(b => {
    bookingTablesObj[b.booking_time.toISOString()] = b.tables.reduce((obj, table) => {
      return {
        ...obj,
        [table.table_id]: true
      }
    },{} )
  })

  // Fetch tables
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug
    },
    select: {
      Table: true,
      open_time: true,
      close_time: true
    }
  })

  if (!restaurant) {
    return res.status(400).json({
      errorMessage: "Invalid data provided",
    });
  }

  // Construct an object to show available tables for each search time
  // Add all tables by default to each search time
  const searchData = searchTimes.map(searchTime => {
    return {
      date: convertToDate(day, searchTime),
      time: searchTime,
      tables: restaurant.Table
    } 
  })

  // Filter out all tables that are already booked
  searchData.forEach(data => {
    data.tables = data.tables.filter((table, index) => {
      if(bookingTablesObj[data.date.toISOString()]) {
        if(bookingTablesObj[data.date.toISOString()][table.id]) return false
      }
      return true
    })
  })

  // Now check which search times do not have enough seats for this party
  // Also filter out search times that fall outside this restaurant's operating hours
  const availabilityData = searchData.map(data => {
    const availableSeats = data.tables.reduce((sum, table) =>
    { return sum + table.seats }, 0)
     
    return {
      time: data.time,
      available: availableSeats >= parseInt(partySize)
    }
  }).filter(availability => {
    const availabilityDate = convertToDate(day, availability.time)
    const openTime = convertToDate(day, restaurant.open_time)
    const closeTime = convertToDate(day, restaurant.close_time)
    return availabilityDate > openTime && availabilityDate <= closeTime
  })

  return res.status(200).json({ bookings: bookingTablesObj });
}

const convertToDate = (day: string, time: string) => {
  return new Date(`${day}T${time}`)
}
