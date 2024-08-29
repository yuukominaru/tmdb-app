import { useEffect, useState } from "react";

const apiKey = process.env.REACT_APP_APIKEY;
const token = process.env.REACT_APP_TOKEN;

export const useGetRecommendations = (id) => {
  const [recommendation, setRecommendation] = useState([]);
  const [recError, setRecError] = useState()

  const getRecommendations = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const url = `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`;
    await fetch(url, options)
      .then((response) => response.json())
      .then((response) => setRecommendation(response.results))
      .catch((err) => setRecError(err));
  };

  useEffect(() => {
    getRecommendations();
  }, []);

  return { recommendation, recError };
};
