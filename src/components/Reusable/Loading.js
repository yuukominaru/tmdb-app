import React from "react";
import { Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <div className="d-flex justify-content-center">
      <Spinner animation="border" variant="light" />
    </div>
  );
}
