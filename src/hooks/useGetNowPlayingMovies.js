import { useEffect, useState } from "react";

const apiKey = process.env.REACT_APP_APIKEY;

export const useGetNowPlayingMovies = () => {
  const [nowPlaying, setNowPlaying] = useState([]);

  const getNowPlayingMovies = async () => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
    const response = await fetch(url);
    const responseJson = await response.json();

    setNowPlaying(responseJson.results);
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);

  return { nowPlaying };
};
