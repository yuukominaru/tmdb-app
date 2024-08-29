import React from "react";
import Card from "react-bootstrap/Card";
import WatchlistButton from "./Reusable/WatchlistButton";
import FavoriteButton from "./Reusable/FavoriteButton";

export default function CardMovie({ movie, addFavorite, removeFavorite }) {
  return (
    <Card className="d-flex flex-column h-100 bg-dark card-movie">
      <Card.Img
        variant="top"
        src={`https://image.tmdb.org/t/p/w500/` + movie.poster_path}
        alt={movie.title}
        className="card-img"
      />
      <Card.ImgOverlay className="d-flex flex-column justify-content-end card-box-shadow">
        <div className="d-flex justify-content-end card-actions">
          <WatchlistButton id={movie.id} />
          <FavoriteButton
            id={movie.id}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />
        </div>
        <Card.Title className="text-white">{movie.title}</Card.Title>
        <Card.Text className="text-white">
          {movie.release_date ? movie.release_date?.substring(0, 4) : ""}
        </Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
}
