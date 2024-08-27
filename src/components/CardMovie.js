import React from "react";
import Card from "react-bootstrap/Card";
import "./Home/Home.css";
import { Icon, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

export default function CardMovie({ movie }) {
  return (
    <Card className="d-flex flex-column h-100 bg-dark card-movie">
      <Card.Img
        variant="top"
        src={`https://image.tmdb.org/t/p/w500/` + movie.poster_path}
        alt={movie.title}
        className="card-img"
      />
      <Card.ImgOverlay className="d-flex flex-column justify-content-end card-box-shadow">
        <Card.Text className="d-flex justify-content-end card-actions">
          <IconButton>
            <BookmarkBorderOutlinedIcon
              style={{ color: "white" }}
              onClick={() => alert("bookmarked")}
            />
            {/* <BookmarkIcon style={{ color: "white" }} /> */}
          </IconButton>
          <IconButton>
            <FavoriteBorderOutlinedIcon
              style={{ color: "white" }}
              onClick={() => alert("favorited")}
            />
            {/* <FavoriteIcon style={{ color: "white" }} /> */}
          </IconButton>
        </Card.Text>
        <Card.Title className="text-white">{movie.title}</Card.Title>
        <Card.Text className="text-white">
          {movie.release_date.substring(0, 4)}
        </Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
}
