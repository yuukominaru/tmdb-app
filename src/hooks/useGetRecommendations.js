import { useEffect, useState } from "react";

const apiKey = process.env.REACT_APP_APIKEY;

export const useGetRecommendations = (id) => {
  const [recommendation, setRecommendation] = useState([]);

  const getRecommendations = async () => {
    const url = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}&language=en-US&page=1`;
    const response = await fetch(url);
    const responseJson = await response.json();

    setRecommendation(responseJson.results);
  };

  useEffect(() => {
    getRecommendations();
  }, []);

  return { recommendation };
};
