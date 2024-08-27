import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import CardMovie from "../CardMovie";

export default function TiledCard({ movie }) {
  return (
    <Link
      key={movie.id}
      style={{ textDecoration: "none" }}
      to={`/movie/${movie.id}`}>
      <Col key={movie.id} className="d-flex justify-content-center mb-2">
        <CardMovie movie={movie} />
      </Col>
    </Link>
  );
}
