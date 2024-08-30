import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const token = process.env.REACT_APP_TOKEN;

export const useGetMovieDetail = (id) => {
  const [movieDetail, setMovieDetail] = useState();
  const [detailError, setDetailError] = useState(false);

  useEffect(() => {
    getMovieDetail();
    window.scrollTo(0, 0)
  }, [id]);

  const getMovieDetail = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
      const response = await fetch(url, options);
      const responseJson = await response.json();

      if (responseJson) {
        setMovieDetail(responseJson);
      } else {
        toast.error("Failed to get movie detail");
        console.error("Failed to get movie detail", responseJson);
        setDetailError(true);
      }
    } catch (error) {
      toast.error("Error fetching movie detail");
      console.error("Error fetching movie detail", error);
      setDetailError(true);
    }
  };

  return { movieDetail, detailError };
};
