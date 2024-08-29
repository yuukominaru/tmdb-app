import { useEffect, useState } from "react";

const apiKey = process.env.REACT_APP_APIKEY;
const token = process.env.REACT_APP_TOKEN;

export const useGetNowPlayingMovies = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [npError, setNpError] = useState()

  const getNowPlayingMovies = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const url =
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

    await fetch(url, options)
      .then((response) => response.json())
      .then((response) => setNowPlaying(response.results))
      .catch((err) => setNpError(err));
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);

  return { nowPlaying, npError };
};
