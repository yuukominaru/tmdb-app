import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const token = process.env.REACT_APP_TOKEN;

export const useGetRecommendations = (id) => {
  const [recommendation, setRecommendation] = useState([]);
  const [recError, setRecError] = useState();

  const getRecommendations = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/recommendations`;
      const response = await fetch(url, options);
      const responseJson = await response.json();

      if (responseJson && responseJson.results) {
        setRecommendation(responseJson.results);
      } else {
        toast.error("Failed to get Recommendation movies");
        console.error("Failed to get Recommendation movies", responseJson);
        setRecError(true);
      }
    } catch (error) {
      toast.error("Error fetching Recommendation movies");
      console.error("Error fetching Recommendation movies", error);
      setRecError(true);
    }
  };

  useEffect(() => {
    getRecommendations();
  }, []);

  return { recommendation, recError };
};
