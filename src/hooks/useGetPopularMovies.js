import { useEffect, useState } from "react";

const apiKey = process.env.REACT_APP_APIKEY;
const token = process.env.REACT_APP_TOKEN;

export const useGetPopularMovies = () => {
  const [popular, setPopular] = useState([]);
  const [error, setError] = useState();

  const getPopularMovies = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const url =
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

    await fetch(url, options)
      .then((response) => response.json())
      .then((response) => setPopular(response.results))
      .catch((err) => setError(err));
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  return { popular, error };
};
