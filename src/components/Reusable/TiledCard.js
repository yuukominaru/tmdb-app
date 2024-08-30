import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import CardMovie from "../CardMovie";

export default function TiledCard({
  movie,
  addFavorite,
  removeFavorite,
  addWatchlist,
  removeWatchlist,
}) {
  return (
    <Col
      key={movie.id}
      lg="auto"
      className="d-flex justify-content-center mb-2">
      <CardMovie
        movie={movie}
        addFavorite={addFavorite}
        removeFavorite={removeFavorite}
        addWatchlist={addWatchlist}
        removeWatchlist={removeWatchlist}
      />
    </Col>
  );
}
