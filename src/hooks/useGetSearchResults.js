import React, { useEffect, useState } from "react";

const apiKey = process.env.REACT_APP_APIKEY;

export const useGetSearchResults = (query) => {
  const [searchResults, setSearchResults] = useState([]);

  const getSearchResults = async () => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}&include_adult=false&language=en-US&page=1`;
    const response = await fetch(url);
    const responseJson = await response.json();

    setSearchResults(responseJson.results);
  };

  useEffect(() => {
    getSearchResults();
  }, [query]);

  return { searchResults };
};
