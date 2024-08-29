import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";

import { Favorite } from "@mui/icons-material";

export default function FavoriteButton({ id, addFavorite, removeFavorite }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("listFavorites") || []);
    const fav = favorites.some((mov) => mov.id === id);
    setIsFavorite(fav);
  }, [id]);

  const handleAddFavorite = (event) => {
    event.preventDefault();
    addFavorite(id);
    setIsFavorite(true);
  };

  const handleRemoveFavorite = (event) => {
    event.preventDefault();
    removeFavorite(id);

    let favorites = JSON.parse(localStorage.getItem("listFavorites")) || [];
    favorites = favorites.filter((fav) => fav.id !== id);
    localStorage.setItem("listFavorites", JSON.stringify(favorites));
    setIsFavorite(false);
  };

  return (
    <IconButton onClick={isFavorite ? handleRemoveFavorite : handleAddFavorite}>
      {isFavorite ? (
        <Favorite style={{ color: "white" }} />
      ) : (
        <FavoriteBorderOutlined style={{ color: "white" }} />
      )}
    </IconButton>
  );
}
