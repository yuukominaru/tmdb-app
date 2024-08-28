import BookmarkBorderOutlined from "@mui/icons-material/BookmarkBorderOutlined";
import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import { IconButton } from "@mui/material";
import moment from "moment";
import React from "react";

export default function MainContent({ movieDetail }) {
  const runtimeHrs = Math.floor(movieDetail.runtime / 60);
  const runtimeMin = movieDetail.runtime % 60;

  return (
    <div className="d-flex align-items-center gap-4 detail-content">
      <img
        src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
        alt={movieDetail.title}
        className="img-fluid img-detail"
      />
      <div className="d-flex flex-column gap-2">
        <h2>
          {movieDetail.title} ({movieDetail?.release_date?.substring(0, 4)})
        </h2>
        {moment(movieDetail.release_date, "YYYY-MM-DD").format("MM/DD/YYYY")} •{" "}
        {movieDetail.genres.map(
          (g, idx) =>
            `${g.name}${idx !== movieDetail.genres.length - 1 ? ", " : ""}`
        )}{" "}
        • {runtimeHrs}h {runtimeMin}m
        <div>
          <IconButton>
            <BookmarkBorderOutlined
              style={{ color: "white" }}
              onClick={() => alert("bookmarked")}
            />
            {/* <Bookmark style={{ color: "white" }} /> */}
          </IconButton>
          <IconButton>
            <FavoriteBorderOutlined
              style={{ color: "white" }}
              onClick={() => alert("favorited")}
            />
            {/* <Favorite style={{ color: "white" }} /> */}
          </IconButton>
        </div>
        <i>{movieDetail.tagline}</i>
        <b>Overview</b>
        {movieDetail.overview}
      </div>
    </div>
  );
}
