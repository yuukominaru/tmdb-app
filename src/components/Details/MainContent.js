import moment from "moment";
import React from "react";
import WatchlistButton from "../Reusable/WatchlistButton";
import FavoriteButton from "../Reusable/FavoriteButton";
import RatingUser from "../Reusable/RatingUser";

export default function MainContent({
  movieDetail,
  addFavorite,
  removeFavorite,
  addWatchlist,
  removeWatchlist,
  rated,
  addRating,
  removeRating,
}) {
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
        <div className="d-flex justify-content-start align-items-center gap-1">
          <RatingUser
            id={movieDetail.id}
            rated={rated}
            addRating={addRating}
            removeRating={removeRating}
          />
          <WatchlistButton
            id={movieDetail.id}
            addWatchlist={addWatchlist}
            removeWatchlist={removeWatchlist}
          />
          <FavoriteButton
            id={movieDetail.id}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />
        </div>
        <i>{movieDetail.tagline}</i>
        <b>Overview</b>
        {movieDetail.overview}
      </div>
    </div>
  );
}
