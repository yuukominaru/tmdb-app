import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const token = process.env.REACT_APP_TOKEN;

export const useGetSearchResults = (query) => {
  const [searchResults, setSearchResults] = useState([]);
  const [srError, setSrError] = useState(false);

  useEffect(() => {
    getSearchResults();
  }, [query]);

  const getSearchResults = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${query}`;
      const response = await fetch(url, options);
      const responseJson = await response.json();

      if (responseJson && responseJson.results) {
        setSearchResults(responseJson.results);
      } else {
        toast.error("Failed to get Search Results");
        console.error("Failed to get Search Results", responseJson);
        setSrError(true);
      }
    } catch (error) {
      toast.error("Error fetching Search Results");
      console.error("Error fetching Search Results", error);
      setSrError(true);
    }
  };

  return { searchResults, srError };
};
