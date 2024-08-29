import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useGetSearchResults } from "../hooks/useGetSearchResults";
import { useGetPopularMovies } from "../hooks/useGetPopularMovies";
import TiledCard from "../components/Reusable/TiledCard";
import Loading from "../components/Reusable/Loading";
import Error from "../components/Reusable/Error";
import { useGetFavorites } from "../hooks/useGetFavorites";
import { useGetWatchlist } from "../hooks/useGetWatchlist";

export default function Search() {
  const [searchValue, setSearchValue] = useState(null);
  const { popular, error } = useGetPopularMovies();
  const { searchResults, srError } = useGetSearchResults(searchValue);
  const { addFavorites, removeFavorites } = useGetFavorites();
  const { addWatchlists, removeWatchlists } = useGetWatchlist();

  return (
    <>
      {(!searchValue && popular.length === 0) ||
      (searchValue && searchResults.length === 0) ? (
        <Loading />
      ) : (
        <Container className="d-flex flex-column justify-content-center mb-3 gap-5">
          <TextField
            variant="outlined"
            placeholder="Search for movies..."
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div>
            {!searchValue && (
              <h1 className="mb-3">Popular Movies Suggestion</h1>
            )}
            {error || srError ? (
              <Error />
            ) : (
              <Row xs="2" sm="3" md="4" lg="4" xl="5" className="row-search">
                {searchValue
                  ? searchResults.map((mov) => (
                      <TiledCard
                        key={mov.id}
                        movie={mov}
                        addFavorite={addFavorites}
                        removeFavorite={removeFavorites}
                        addWatchlist={addWatchlists}
                        removeWatchlist={removeWatchlists}
                      />
                    ))
                  : popular.map((mov) => (
                      <TiledCard
                        key={mov.id}
                        movie={mov}
                        addFavorite={addFavorites}
                        removeFavorite={removeFavorites}
                        addWatchlist={addWatchlists}
                        removeWatchlist={removeWatchlists}
                      />
                    ))}
              </Row>
            )}
          </div>
        </Container>
      )}
    </>
  );
}
