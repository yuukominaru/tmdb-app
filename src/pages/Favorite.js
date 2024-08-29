import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useGetSessionToken } from "../hooks/useGetSessionToken";
import { useNavigate } from "react-router-dom";
import { useGetFavorites } from "../hooks/useGetFavorites";
import Loading from "../components/Reusable/Loading";
import Error from "../components/Reusable/Error";
import HorizontalCard from "../components/Reusable/HorizontalCard";

export default function Favorite() {
  const { favorite, favError, addFavorites, removeFavorites } =
    useGetFavorites();
  const { sessionToken } = useGetSessionToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionToken) {
      return navigate("/");
    }
  }, [navigate, sessionToken]);

  return (
    <Container>
      <h1>Your Favorite Movies</h1>
      {favorite?.length === 0 ? (
        <Loading />
      ) : favError ? (
        <Error />
      ) : (
        <div className="container-fluid favorite">
          <Row className="horizontal-rows">
            {favorite?.map((mov) => (
              <HorizontalCard
                key={mov.id}
                movie={mov}
                addFavorite={addFavorites}
                removeFavorite={removeFavorites}
              />
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
}
