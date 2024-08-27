import React from "react";
import { Row } from "react-bootstrap";
import TiledCard from "../Reusable/TiledCard";
import Loading from "../Reusable/Loading";

export default function TopRated({ movie }) {
  if (movie.length === 0) {
    return <Loading />;
  }

  return (
    <div className="container top-rated">
      <Row xs="2" sm="3" md="4" lg="4" xl="5" className="rows">
        {movie.map((mov) => (
          <TiledCard movie={mov} />
        ))}
      </Row>
    </div>
  );
}
