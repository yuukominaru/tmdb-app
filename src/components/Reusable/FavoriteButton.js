import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";

import { Favorite } from "@mui/icons-material";
import { useGetSessionToken } from "../../hooks/useGetSessionToken";
import ModalLogin from "../Login/ModalLogin";

export default function FavoriteButton({ id, addFavorite, removeFavorite }) {
  const { sessionToken, getRequestToken } = useGetSessionToken();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("listFavorites")) {
      const favorites = JSON.parse(localStorage.getItem("listFavorites") || []);
      const fav = favorites.some((mov) => mov.id === id);
      setIsFavorite(fav);
    }
  }, [id]);

  useEffect(() => {
    if (sessionToken) {
      setIsLoggedIn(true);
    }
  }, [sessionToken]);

  const handleNavigate = () => {
    setModalShow(true);
  };

  const handleAddFavorite = () => {
    addFavorite(id);
    setIsFavorite(true);
  };

  const handleRemoveFavorite = () => {
    removeFavorite(id);

    let favorites = JSON.parse(localStorage.getItem("listFavorites")) || [];
    favorites = favorites.filter((fav) => fav.id !== id);
    localStorage.setItem("listFavorites", JSON.stringify(favorites));
    setIsFavorite(false);
  };

  return (
    <>
      <IconButton
        onClick={
          isLoggedIn
            ? isFavorite
              ? handleRemoveFavorite
              : handleAddFavorite
            : handleNavigate
        }>
        {isFavorite ? (
          <Favorite style={{ color: "white" }} />
        ) : (
          <FavoriteBorderOutlined style={{ color: "white" }} />
        )}
      </IconButton>

      <ModalLogin
        show={modalShow}
        onClose={() => setModalShow(false)}
        getToken={getRequestToken}
      />
    </>
  );
}
