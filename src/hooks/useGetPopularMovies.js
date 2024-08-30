import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const token = process.env.REACT_APP_TOKEN;

export const useGetPopularMovies = () => {
  const [popular, setPopular] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPopularMovies();
  }, []);

  const getPopularMovies = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = "https://api.themoviedb.org/3/movie/popular";
      const response = await fetch(url, options);
      const responseJson = await response.json();

      if (responseJson && responseJson.results) {
        setPopular(responseJson.results);
      } else {
        toast.error("Failed to get Popular movies");
        console.error("Failed to get Popular movies", responseJson);
        setError(true);
      }
    } catch (error) {
      toast.error("Error fetching Popular movies");
      console.error("Error fetching Popular movies", error);
      setError(true);
    }
  };

  return { popular, error };
};
