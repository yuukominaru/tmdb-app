import React from "react";
import Card from "react-bootstrap/Card";
import WatchlistButton from "./Reusable/WatchlistButton";
import FavoriteButton from "./Reusable/FavoriteButton";
import { Link } from "react-router-dom";

export default function CardMovie({
  movie,
  addFavorite,
  removeFavorite,
  addWatchlist,
  removeWatchlist,
}) {
  return (
    <Card className="d-flex flex-column h-100 bg-dark card-movie">
      <Card.Img
        variant="top"
        src={`https://image.tmdb.org/t/p/w500/` + movie.poster_path}
        alt={movie.title}
        className="card-img"
      />
      <div className="d-flex justify-content-end card-actions">
        {addWatchlist && removeWatchlist && (
          <WatchlistButton
            id={movie.id}
            addWatchlist={addWatchlist}
            removeWatchlist={removeWatchlist}
          />
        )}
        {addFavorite && removeFavorite && (
          <FavoriteButton
            id={movie.id}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />
        )}
      </div>
      <Link style={{ textDecoration: "none" }} to={`/movie/${movie.id}`}>
        <Card.ImgOverlay className="d-flex flex-column justify-content-end card-box-shadow">
          <Card.Title className="text-white">{movie.title}</Card.Title>
          <Card.Text className="text-white">
            {movie.release_date ? movie.release_date?.substring(0, 4) : ""}
          </Card.Text>
        </Card.ImgOverlay>
      </Link>
    </Card>
  );
}
