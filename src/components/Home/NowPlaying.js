import React from "react";
import CardMovie from "../CardMovie";
import "./Home.css";
import { Col, Row } from "react-bootstrap";

export default function NowPlaying({ movie }) {
  return (
    <div className="container-fluid now-playing">
      <Row className="rows">
        {movie.map((mov) => (
          <Col className="mb-1">
            <CardMovie movie={mov} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
