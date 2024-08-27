import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import CardMovie from "../CardMovie";

export default function HorizontalCard({ movie }) {
  return (
    <Col key={movie.id} className="mb-1">
      <Link style={{ textDecoration: "none" }} to={`/movie/${movie.id}`}>
        <CardMovie movie={movie} />
      </Link>
    </Col>
  );
}
