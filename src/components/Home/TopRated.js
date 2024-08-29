import React from "react";
import { Row } from "react-bootstrap";
import TiledCard from "../Reusable/TiledCard";
import Loading from "../Reusable/Loading";
import Error from "../Reusable/Error";

export default function TopRated({
  movie,
  error,
  addFavorite,
  removeFavorite,
}) {
  return (
    <>
      {movie?.length === 0 ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <div className="container-fluid top-rated">
          <Row xs="2" sm="3" md="4" lg="4" xl="5">
            {movie?.map((mov) => (
              <TiledCard
                key={mov?.id}
                movie={mov}
                addFavorite={addFavorite}
                removeFavorite={removeFavorite}
              />
            ))}
          </Row>
        </div>
      )}
    </>
  );
}
