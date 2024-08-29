import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import CardMovie from "../CardMovie";

export default function HorizontalCard({
  movie,
  addFavorite,
  removeFavorite,
  addWatchlist,
  removeWatchlist,
}) {
  return (
    <Col key={movie.id} className="mb-1" lg="auto">
      <Link style={{ textDecoration: "none" }} to={`/movie/${movie.id}`}>
        <CardMovie
          movie={movie}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
          addWatchlist={addWatchlist}
          removeWatchlist={removeWatchlist}
        />
      </Link>
    </Col>
  );
}
