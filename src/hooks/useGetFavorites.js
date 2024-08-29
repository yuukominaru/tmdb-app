import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

const userToken = localStorage.getItem("userSessionToken");
const sessionId = localStorage.getItem("userSessionIdV3");

export const useGetFavorites = () => {
  const [favorite, setFavorite] = useState(
    JSON.parse(localStorage.getItem("favoriteMovies")) || []
  );
  const [favError, setFavError] = useState(false);

  const getFavorites = async (userToken, userId) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const url = `https://api.themoviedb.org/4/account/${userId}/movie/favorites`;
      const response = await fetch(url, options);
      const responseJson = await response.json();

      if (responseJson && responseJson.results) {
        setFavorite(responseJson.results);
        localStorage.setItem(
          "listFavorites",
          JSON.stringify(responseJson.results)
        );
      } else {
        toast.error("Failed to get Favorite movie list");
        console.error("Failed to get Favorite movie list", responseJson);
        setFavError(true);
      }
    } catch (error) {
      toast.error("Error fetching Favorite movie list");
      console.error("Error fetching Favorite movie list", error);
      setFavError(true);
    }
  };

  const addFavorites = async (movieId) => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        media_type: "movie",
        media_id: movieId,
        favorite: true,
      }),
    };

    try {
      const url = `https://api.themoviedb.org/3/account/account_id/favorite?session_id=${sessionId}`;
      const response = await fetch(url, options);
      const responseJson = await response.json();

      if (responseJson && responseJson.success) {
        toast.success("Success adding movie to Favorite List");
      } else {
        toast.error("Failed to add movie to Favorite List");
        console.error("Failed to add movie to Favorite List", responseJson);
        setFavError(true);
      }
    } catch (error) {
      toast.error("Error adding movie to Favorite List");
      console.error("Error adding movie to Favorite List", error);
      setFavError(true);
    }
  };

  const removeFavorites = async (movieId) => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        media_type: "movie",
        media_id: movieId,
        favorite: false,
      }),
    };

    try {
      const url = `https://api.themoviedb.org/3/account/account_id/favorite?session_id=${sessionId}`;
      const response = await fetch(url, options);
      const responseJson = await response.json();

      if (responseJson && responseJson.success) {
        toast.success("Success removing movie from Favorite List");
      } else {
        toast.error("Failed to remove movie from Favorite List");
        console.error(
          "Failed to remove movie from Favorite List",
          responseJson
        );
        setFavError(true);
      }
    } catch (error) {
      toast.error("Error removing movie from Favorite List");
      console.error("Error removing movie from Favorite List", error);
      setFavError(true);
    }
  };

  useEffect(() => {
    const userToken = localStorage.getItem("userSessionToken");
    const userId = localStorage.getItem("userSessionId");

    if (userToken && userId) {
      getFavorites(userToken, userId);
      const interval = setInterval(getFavorites(userToken, userId), 120000);
      return () => clearInterval(interval);
    }
  }, []);

  return { favorite, favError, addFavorites, removeFavorites };
};
