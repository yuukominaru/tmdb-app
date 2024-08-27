import { InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useGetSearchResults } from "../hooks/useGetSearchResults";
import SearchIcon from "@mui/icons-material/Search";
import { AccountCircle } from "@mui/icons-material";
import CardMovie from "../components/CardMovie";
import { useGetPopularMovies } from "../hooks/useGetPopularMovies";

export default function Search() {
  const [searchValue, setSearchValue] = useState(null);
  const { popular } = useGetPopularMovies();
  const { searchResults } = useGetSearchResults(searchValue);
  console.log("serchres", searchResults);
  console.log("pops", popular);

  return (
    <Container className="d-flex flex-column justify-content-center mb-3 gap-5">
      <TextField
        variant="outlined"
        placeholder="Search for movies..."
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div>
        {!searchValue && <h1>Popular Movies Suggestion</h1>}
        <Row xs="2" sm="3" md="4" lg="4" xl="5" className="rows">
          {searchValue ? (
            <>
              {searchResults.map((mov) => (
                <Col
                  key={mov.id}
                  className="d-flex justify-content-center mb-2">
                  <CardMovie movie={mov} />
                </Col>
              ))}
            </>
          ) : (
            popular.map((mov) => (
              <Col key={mov.id} className="d-flex justify-content-center mb-2">
                <CardMovie movie={mov} />
              </Col>
            ))
          )}
        </Row>
      </div>
    </Container>
  );
}
