import { useEffect, useState } from "react";
const API_URL: string = import.meta.env.VITE_API_URL;
const API_KEY: string = import.meta.env.VITE_API_KEY;

interface DetailResponse {
  title: string;
  images: {
    original: {
      url: string;
    };
  };
  user: {
    display_name: string;
    avatar_url: string;
  };
}

export default function useDetails({ id }: { id: string }) {
  const [details, setDetails] = useState<DetailResponse>();

  useEffect(() => {
    fetch(`${API_URL}${id}?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((response) => {
        const { data }: { data: DetailResponse } = response;
        setDetails(data);
      });
  }, [id]);

  return { details };
}
