import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const userToken = localStorage.getItem("userSessionToken");
const sessionId = localStorage.getItem("userSessionIdV3");

export const useGetWatchlist = () => {
  const [watchlist, setWatchlist] = useState(
    JSON.parse(localStorage.getItem("listWatchlist")) || []
  );
  const [wlError, setWlError] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("userSessionToken");
    const userId = localStorage.getItem("userSessionId");

    if (userToken && userId) {
      const fetchWatchlist = () => getWatchlist(userToken, userId);
      fetchWatchlist();
      const interval = setInterval(fetchWatchlist, 120000);
      return () => clearInterval(interval);
    }
  }, []);

  const getWatchlist = async (userToken, userId) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const url = `https://api.themoviedb.org/4/account/${userId}/movie/watchlist`;
      const response = await fetch(url, options);
      const responseJson = await response.json();

      if (responseJson && responseJson.results) {
        setWatchlist(responseJson.results);
        localStorage.setItem(
          "listWatchlist",
          JSON.stringify(responseJson.results)
        );
      } else {
        toast.error("Failed to get Watchlist");
        console.error("Failed to get Watchlist", responseJson);
        setWlError(true);
      }
    } catch (error) {
      toast.error("Error fetching Watchlist");
      console.error("Error fetching Watchlist", error);
      setWlError(true);
    }
  };

  const addWatchlists = async (movieId) => {
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
        watchlist: true,
      }),
    };

    try {
      const url = `https://api.themoviedb.org/3/account/account_id/watchlist?session_id=${sessionId}`;
      const response = await fetch(url, options);
      const responseJson = await response.json();

      if (responseJson && responseJson.success) {
        toast.success("Success adding movie to Watchlist");
      } else {
        toast.error("Failed to add movie to Watchlist");
        console.error("Failed to add movie to Watchlist", responseJson);
        setWlError(true);
      }
    } catch (error) {
      toast.error("Error adding movie to Watchlist");
      console.error("Error adding movie to Watchlist", error);
      setWlError(true);
    }
  };

  const removeWatchlists = async (movieId) => {
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
        watchlist: false,
      }),
    };

    try {
      const url = `https://api.themoviedb.org/3/account/account_id/watchlist?session_id=${sessionId}`;
      const response = await fetch(url, options);
      const responseJson = await response.json();

      if (responseJson && responseJson.success) {
        toast.success("Success removing movie from Watchlist");
      } else {
        toast.error("Failed to remove movie from Watchlist");
        console.error("Failed to remove movie from Watchlist", responseJson);
        setWlError(true);
      }
    } catch (error) {
      toast.error("Error removing movie from Watchlist");
      console.error("Error removing movie from Watchlist", error);
      setWlError(true);
    }
  };

  return { watchlist, wlError, getWatchlist, addWatchlists, removeWatchlists };
};
