import React from "react";
import { useParams } from "react-router-dom";
import { useGetMovieDetail } from "../hooks/useGetMovieDetail";
import { Container, Row } from "react-bootstrap";
import Loading from "../components/Reusable/Loading";
import MainContent from "../components/Details/MainContent";
import { useGetRecommendations } from "../hooks/useGetRecommendations";
import HorizontalCard from "../components/Reusable/HorizontalCard";
import Error from "../components/Reusable/Error";
import { useGetWatchlist } from "../hooks/useGetWatchlist";
import { useGetFavorites } from "../hooks/useGetFavorites";
import { useGetRating } from "../hooks/useGetRating";

export default function MovieDetail() {
  const { id } = useParams();
  const { movieDetail, detailError } = useGetMovieDetail(id);
  const { recommendation, recError } = useGetRecommendations(id);
  const { addFavorites, removeFavorites } = useGetFavorites();
  const { addWatchlists, removeWatchlists } = useGetWatchlist();
  const { rated, addRating, removeRating } = useGetRating();

  return (
    <>
      {!movieDetail ? (
        <div className="mt-4">
          <Loading />
        </div>
      ) : detailError ? (
        <div className="mt-4">
          <Error />
        </div>
      ) : (
        <div
          className="detail-bg mb-5"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieDetail.backdrop_path})`,
          }}>
          <Container>
            <MainContent
              movieDetail={movieDetail}
              addFavorite={addFavorites}
              removeFavorite={removeFavorites}
              addWatchlist={addWatchlists}
              removeWatchlist={removeWatchlists}
              rated={rated}
              addRating={addRating}
              removeRating={removeRating}
            />
          </Container>
        </div>
      )}

      <Container className="mb-4">
        <h4>Recommendations</h4>
        {!recommendation ? (
          <Loading />
        ) : (
          <>
            {recError ? (
              <Error />
            ) : (
              <div className="container-fluid">
                <Row className="horizontal-rows">
                  {recommendation.map((mov) => (
                    <HorizontalCard
                      key={mov.id}
                      movie={mov}
                      addFavorite={addFavorites}
                      removeFavorite={removeFavorites}
                      addWatchlist={addWatchlists}
                      removeWatchlist={removeWatchlists}
                    />
                  ))}
                </Row>
              </div>
            )}
          </>
        )}
      </Container>
    </>
  );
}
