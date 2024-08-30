import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useGetSessionToken } from "../hooks/useGetSessionToken";
import { useNavigate } from "react-router-dom";
import { useGetFavorites } from "../hooks/useGetFavorites";
import Loading from "../components/Reusable/Loading";
import Error from "../components/Reusable/Error";
import TiledCard from "../components/Reusable/TiledCard";

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
          <Row xs="2" sm="3" md="4" lg="4" xl="5">
            {favorite?.map((mov) => (
              <TiledCard
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
