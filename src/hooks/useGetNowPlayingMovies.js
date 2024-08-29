import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const token = process.env.REACT_APP_TOKEN;

export const useGetNowPlayingMovies = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [npError, setNpError] = useState(false);

  const getNowPlayingMovies = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = "https://api.themoviedb.org/3/movie/now_playing";
      const response = await fetch(url, options);
      const responseJson = await response.json();

      if (responseJson && responseJson.results) {
        setNowPlaying(responseJson.results);
      } else {
        toast.error("Failed to get Now Playing movies");
        console.error("Failed to get Now Playing movies", responseJson);
        setNpError(true);
      }
    } catch (error) {
      toast.error("Error fetching Now Playing movies");
      console.error("Error fetching Now Playing movies", error);
      setNpError(true);
    }
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);

  return { nowPlaying, npError };
};
