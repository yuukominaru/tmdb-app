import { useEffect, useState } from "react";

const apiKey = process.env.REACT_APP_APIKEY;
const token = process.env.REACT_APP_TOKEN;

export const useGetTopRatedMovies = () => {
  const [topRated, setTopRated] = useState([]);
  const [trError, setTrError] = useState();

  const getTopRatedMovies = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const url =
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

    await fetch(url, options)
      .then((response) => response.json())
      .then((response) => setTopRated(response.results))
      .catch((err) => setTrError(err));
  };

  useEffect(() => {
    getTopRatedMovies();
  }, []);

  return { topRated, trError };
};
