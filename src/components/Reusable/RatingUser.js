import {
  RemoveCircleOutlineOutlined,
  StarsOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Popover, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetSessionToken } from "../../hooks/useGetSessionToken";
import ModalLogin from "../Login/ModalLogin";

const labels = {
  0.5: "10",
  1: "20",
  1.5: "30",
  2: "40",
  2.5: "50",
  3: "60",
  3.5: "70",
  4: "80",
  4.5: "90",
  5: "100",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function RatingUser({ id, rated, addRating, removeRating }) {
  const { sessionToken, getRequestToken } = useGetSessionToken();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(-1);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (sessionToken) {
      setIsLoggedIn(true);
    }
  }, [sessionToken]);

  useEffect(() => {
    if (isLoggedIn) {
      rated.forEach((mov) => {
        if (mov.id === id) {
          setRating(mov?.account_rating?.value / 2);
        }
      });
    }
  }, [id, isLoggedIn, rated]);

  const handleClick = (event) => {
    if (isLoggedIn) {
      setAnchorEl(event.currentTarget);
    } else {
      setModalShow(true);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRatingChange = (event, value) => {
    addRating(id, value);
    setRating(value);
  };

  const handleRemoveRating = () => {
    removeRating(id);
    setRating(0);
  };

  return (
    <>
      <div className="d-flex align-items-center gap-50">
        <IconButton onClick={handleClick}>
          <StarsOutlined />
        </IconButton>
        Rate it
      </div>

      <Popover
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "1rem",
            gap: ".5rem",
          }}>
          <IconButton onClick={handleRemoveRating}>
            <RemoveCircleOutlineOutlined />
          </IconButton>
          <div className="d-flex align-items-center">
            <Rating
              name="movie-rating"
              size="large"
              precision={0.5}
              value={rating}
              onChange={handleRatingChange}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              getLabelText={getLabelText}
            />
            {rating !== null && (
              <Box sx={{ ml: 2 }}>
                <h5>{labels[hover !== -1 ? hover : rating]}</h5>
              </Box>
            )}
          </div>
        </Box>
      </Popover>

      <ModalLogin
        show={modalShow}
        onClose={() => setModalShow(false)}
        getToken={getRequestToken}
      />
    </>
  );
}
