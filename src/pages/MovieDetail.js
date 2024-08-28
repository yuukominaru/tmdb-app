import React from "react";
import { useParams } from "react-router-dom";
import { useGetMovieDetail } from "../hooks/useGetMovieDetail";
import { Container, Row } from "react-bootstrap";
import Loading from "../components/Reusable/Loading";
import MainContent from "../components/Details/MainContent";
import { useGetRecommendations } from "../hooks/useGetRecommendations";
import HorizontalCard from "../components/Reusable/HorizontalCard";

export default function MovieDetail() {
  const { id } = useParams();
  const { movieDetail } = useGetMovieDetail(id);
  const { recommendation } = useGetRecommendations(id);

  if (!movieDetail) {
    return <Loading />;
  }

  return (
    <>
      <div
        className="detail-bg mb-5"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieDetail.backdrop_path})`,
        }}>
        <Container>
          <MainContent movieDetail={movieDetail} />
        </Container>
      </div>
      <Container className="mb-4">
        <h4>Recommendations</h4>
        <Row className="horizontal-rows">
          {recommendation.map((mov) => (
            <HorizontalCard movie={mov} />
          ))}
        </Row>
      </Container>
    </>
  );
}
