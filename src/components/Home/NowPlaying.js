import React from "react";
import { Row } from "react-bootstrap";
import HorizontalCard from "../Reusable/HorizontalCard";
import Loading from "../Reusable/Loading";

export default function NowPlaying({ movie }) {
  if (movie.length === 0) {
    return <Loading />;
  }

  return (
    <div className="container-fluid now-playing">
      <Row className="horizontal-rows">
        {movie.map((mov) => (
          <HorizontalCard movie={mov} />
        ))}
      </Row>
    </div>
  );
}
