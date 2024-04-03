import { useState } from "react";
import axios, { AxiosError } from "axios";

interface BookingSearch {
  slug: string;
  partySize: string;
  day: string;
  time: string;
}

export default function useAvailabilities() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchAvailabilities = async ({
    slug,
    partySize,
    day,
    time,
  }: BookingSearch) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/restaurant/${slug}/availability`,
        {
          params: {
            day,
            time,
            partySize,
          },
        }
      );
      setLoading(false);
      setData(res.data);
    } catch (e) {
      setLoading(false);
      const error = e as AxiosError;
      setError(
        error.response
          ? (error.response as any).data.errorMessage
          : error.message
      );
    }
  };

  return { loading, data, error, fetchAvailabilities };
}
