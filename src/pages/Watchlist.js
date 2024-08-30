import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useGetSessionToken } from "../hooks/useGetSessionToken";
import { useNavigate } from "react-router-dom";
import { useGetWatchlist } from "../hooks/useGetWatchlist";
import Loading from "../components/Reusable/Loading";
import Error from "../components/Reusable/Error";
import TiledCard from "../components/Reusable/TiledCard";

export default function Watchlist() {
  const { watchlist, wlError, addWatchlists, removeWatchlists } =
    useGetWatchlist();
  const { sessionToken } = useGetSessionToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionToken) {
      return navigate("/");
    }
  }, [navigate, sessionToken]);

  return (
    <Container>
      <h1>Your Watchlist</h1>
      {watchlist?.length === 0 ? (
        <Loading />
      ) : wlError ? (
        <Error />
      ) : (
        <div className="container-fluid watchlist">
          <Row xs="2" sm="3" md="4" lg="4" xl="5">
            {watchlist?.map((mov) => (
              <TiledCard
                key={mov.id}
                movie={mov}
                addWatchlist={addWatchlists}
                removeWatchlist={removeWatchlists}
              />
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
}
