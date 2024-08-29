import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const token = process.env.REACT_APP_TOKEN;

export const useGetTopRatedMovies = () => {
  const [topRated, setTopRated] = useState([]);
  const [trError, setTrError] = useState(false);

  const getTopRatedMovies = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = "https://api.themoviedb.org/3/movie/top_rated";
      const response = await fetch(url, options);
      const responseJson = await response.json();

      if (responseJson && responseJson.results) {
        setTopRated(responseJson.results);
      } else {
        toast.error("Failed to get Top Rated movies");
        console.error("Failed to get Top Rated movies", responseJson);
        setTrError(true);
      }
    } catch (error) {
      toast.error("Error fetching Top Rated movies");
      console.error("Error fetching Top Rated Movies", error);
      setTrError(true);
    }
  };

  useEffect(() => {
    getTopRatedMovies();
  }, []);

  return { topRated, trError };
};
