import React from "react";
import { Row } from "react-bootstrap";
import HorizontalCard from "../Reusable/HorizontalCard";
import Loading from "../Reusable/Loading";
import Error from "../Reusable/Error";

export default function NowPlaying({
  movie,
  error,
  addFavorite,
  removeFavorite,
  addWatchlist,
  removeWatchlist,
}) {
  return (
    <>
      {movie?.length === 0 ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <div className="container-fluid now-playing">
          <Row className="horizontal-rows">
            {movie?.map((mov) => (
              <HorizontalCard
                key={mov?.id}
                movie={mov}
                addFavorite={addFavorite}
                removeFavorite={removeFavorite}
                addWatchlist={addWatchlist}
                removeWatchlist={removeWatchlist}
              />
            ))}
          </Row>
        </div>
      )}
    </>
  );
}
