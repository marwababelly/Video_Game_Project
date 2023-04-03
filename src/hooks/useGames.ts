import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

export interface platform {
  id: number;
  name: string;
  slug: string;
}
export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: {platform: platform}[];
    metacritic: number;
  }
  
  interface FechGameResponse {
    count: number;
    results: Game[];
  }

const useGames = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [error, setErrors] = useState("");
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
      const controller = new AbortController();

      apiClient
        .get<FechGameResponse>("/games", {signal: controller.signal})
        .then((res) => {
          setGames(res.data.results);
          setLoading(false);
        })
        .catch((err) => {
          if(err instanceof CanceledError) return;
          setErrors(err.message);
          setLoading(false);
        });

        return () => controller.abort();
    }, []);
    return {games, error, isLoading};
}

export default useGames;