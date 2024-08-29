import React, { useEffect, useState } from "react";

const apiKey = process.env.REACT_APP_APIKEY;
const token = process.env.REACT_APP_TOKEN;

export const useGetSearchResults = (query) => {
  const [searchResults, setSearchResults] = useState([]);
  const [srError, setSrError] = useState();

  const getSearchResults = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

    await fetch(url, options)
      .then((response) => response.json())
      .then((response) => setSearchResults(response.results))
      .catch((err) => setSrError(err));
  };

  useEffect(() => {
    getSearchResults();
  }, [query]);

  return { searchResults, srError };
};
