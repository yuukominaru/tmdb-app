import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const userToken = localStorage.getItem("userSessionToken");
const userId = localStorage.getItem("userSessionId");
const sessionId = localStorage.getItem("userSessionIdV3");

export const useGetRating = () => {
  const [rated, setRated] = useState([]);

  useEffect(() => {
    const userToken = localStorage.getItem("userSessionToken");
    const userId = localStorage.getItem("userSessionId");

    if (userToken && userId) {
      getRating();
    }
  }, []);

  const getRating = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const url = `https://api.themoviedb.org/4/account/${userId}/movie/rated`;
      const response = await fetch(url, options);
      const responseJson = await response.json();

      if (responseJson && responseJson.results) {
        setRated(responseJson.results);
      } else {
        toast.error("Failed to get Rated Movie list");
        console.error("Failed to get Rated Movie list", responseJson);
      }
    } catch (error) {
      toast.error("Error fetching Rated Movie list");
      console.error("Error fetching Rated Movie list", error);
    }
  };

  const addRating = async (movieId, value) => {
    console.log("val", value);

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({ value: value * 2 }),
    };

    try {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?session_id=${sessionId}`;
      const response = await fetch(url, options);
      const responseJson = await response.json();

      if (responseJson && responseJson.success) {
        toast.success("Add rating success!");
      } else {
        toast.error("Failed to add rating to movie");
        console.error("Failed to add rating to movie", responseJson);
      }
    } catch (error) {
      toast.error("Error adding rating to the movie");
      console.error("Error adding rating to the movie", error);
    }
  };

  const removeRating = async (movieId) => {
    const options = {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?session_id=${sessionId}`;
      const response = await fetch(url, options);
      const responseJson = await response.json();

      if (responseJson && responseJson.success) {
        toast.success("Remove rating success!");
      } else {
        toast.error("Failed to remove rating to movie");
        console.error("Failed to remove rating to movie", responseJson);
      }
    } catch (error) {
      toast.error("Error removing rating to the movie");
      console.error("Error removing rating to the movie", error);
    }
  };

  return { rated, addRating, removeRating };
};
