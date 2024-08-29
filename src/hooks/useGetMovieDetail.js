import { useEffect } from "react";
import { useState } from "react";

const apiKey = process.env.REACT_APP_APIKEY;
const token = process.env.REACT_APP_TOKEN;

export const useGetMovieDetail = (id) => {
  const [movieDetail, setMovieDetail] = useState();
  const [detailError, setDetailError] = useState();

  const getMovieDetail = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    await fetch(url, options)
      .then((response) => response.json())
      .then((response) => setMovieDetail(response))
      .catch((err) => setDetailError(err));
  };

  useEffect(() => {
    getMovieDetail();
  }, []);

  return { movieDetail, detailError };
};
