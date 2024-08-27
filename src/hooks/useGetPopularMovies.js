import { useEffect, useState } from "react";

const apiKey = process.env.REACT_APP_APIKEY;

export const useGetPopularMovies = () => {
  const [popular, setPopular] = useState([]);

  const getPopularMovies = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
    const response = await fetch(url);
    const responseJson = await response.json();

    console.log("populllra", popular);
    setPopular(responseJson.results);
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  return { popular };
};
