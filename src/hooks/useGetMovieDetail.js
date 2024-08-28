import { useEffect } from "react";
import { useState } from "react";

const apiKey = process.env.REACT_APP_APIKEY;

export const useGetMovieDetail = (id) => {
  const [movieDetail, setMovieDetail] = useState();

  const getMovieDetail = async () => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
    const response = await fetch(url);
    const responseJson = await response.json();

    setMovieDetail(responseJson);
  };

  useEffect(() => {
    getMovieDetail();
  }, []);

  return { movieDetail };
};
