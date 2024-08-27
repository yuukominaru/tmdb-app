import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useGetSearchResults } from "../hooks/useGetSearchResults";
import { useGetPopularMovies } from "../hooks/useGetPopularMovies";
import TiledCard from "../components/Reusable/TiledCard";
import Loading from "../components/Reusable/Loading";

export default function Search() {
  const [searchValue, setSearchValue] = useState(null);
  const { popular } = useGetPopularMovies();
  const { searchResults } = useGetSearchResults(searchValue);

  if (!searchValue && popular.length === 0) {
    return <Loading />;
  }

  if (searchValue && searchResults.length === 0) {
    return <Loading />;
  }

  return (
    <Container className="d-flex flex-column justify-content-center mb-3 gap-5">
      <TextField
        variant="outlined"
        placeholder="Search for movies..."
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div>
        {!searchValue && <h1 className="mb-3">Popular Movies Suggestion</h1>}
        <Row xs="2" sm="3" md="4" lg="4" xl="5" className="row-search">
          {searchValue
            ? searchResults.map((mov) => <TiledCard movie={mov} />)
            : popular.map((mov) => <TiledCard movie={mov} />)}
        </Row>
      </div>
    </Container>
  );
}
