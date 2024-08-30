import { Bookmark } from "@mui/icons-material";
import BookmarkBorderOutlined from "@mui/icons-material/BookmarkBorderOutlined";
import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetSessionToken } from "../../hooks/useGetSessionToken";
import ModalLogin from "../Login/ModalLogin";

export default function WatchlistButton({ id, addWatchlist, removeWatchlist }) {
  const { sessionToken, getRequestToken } = useGetSessionToken();
  const [isWatchlist, setIsWatchlist] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("listWatchlist")) {
      const watchlist = JSON.parse(localStorage.getItem("listWatchlist") || []);
      const wl = watchlist.some((mov) => mov.id === id);
      setIsWatchlist(wl);
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

  const handleAddWatchlist = () => {
    addWatchlist(id);
    setIsWatchlist(true);
  };

  const handleRemoveWatchlist = () => {
    removeWatchlist(id);
    setIsWatchlist(false);
  };

  return (
    <>
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          isLoggedIn
            ? isWatchlist
              ? handleRemoveWatchlist(e)
              : handleAddWatchlist(e)
            : handleNavigate(e);
        }}>
        {isWatchlist ? (
          <Bookmark style={{ color: "white" }} />
        ) : (
          <BookmarkBorderOutlined style={{ color: "white" }} />
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
