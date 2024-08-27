import React, { useEffect, useState } from "react";

const apiKey = process.env.REACT_APP_APIKEY;

export const useGetTopRatedMovies = () => {
  const [topRated, setTopRated] = useState([]);

  const getTopRatedMovies = async () => {
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;
    const response = await fetch(url);
    const responseJson = await response.json();

    setTopRated(responseJson.results)
  };

  useEffect(() => {
    getTopRatedMovies();
  }, []);

  return { topRated };
};
