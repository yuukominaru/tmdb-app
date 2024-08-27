import React from "react";
import { Col, Row } from "react-bootstrap";
import CardMovie from "../CardMovie";

export default function TopRated({ movie }) {
  return (
    <div className="container top-rated">
      <Row xs="2" sm="3" md="4" lg="5" xl="6" className="rows">
        {movie.map((mov) => (
          <Col key={mov.id} className="d-flex justify-content-center mb-2">
            <CardMovie movie={mov} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
