import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import NowPlaying from "../components/Home/NowPlaying";
import { useGetNowPlayingMovies } from "../hooks/useGetNowPlayingMovies";
import { useGetTopRatedMovies } from "../hooks/useGetTopRatedMovies";
import TopRated from "../components/Home/TopRated";
import { useGetFavorites } from "../hooks/useGetFavorites";
import { useGetWatchlist } from "../hooks/useGetWatchlist";
import { Box, Pagination, Stack } from "@mui/material";

export default function Home() {
  const ref = useRef();
  const [page, setPage] = useState(1);
  const { nowPlaying, npError } = useGetNowPlayingMovies();
  const { topRated, totalPage, trError, getTopRatedMovies } =
    useGetTopRatedMovies();
  const { addFavorites, removeFavorites } = useGetFavorites();
  const { addWatchlists, removeWatchlists } = useGetWatchlist();

  const handleChange = (event, value) => {
    setPage(value);
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    getTopRatedMovies(page);
  }, [page]);

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center mb-3 gap-1">
      <Container className="d-flex flex-column gap-5">
        <div>
          <h1>Now Playing</h1>
          <NowPlaying
            movie={nowPlaying}
            error={npError}
            addFavorite={addFavorites}
            removeFavorite={removeFavorites}
            addWatchlist={addWatchlists}
            removeWatchlist={removeWatchlists}
          />
        </div>
        <div>
          <h1 ref={ref}>Top Rated</h1>
          <TopRated
            movie={topRated}
            error={trError}
            addFavorite={addFavorites}
            removeFavorite={removeFavorites}
            addWatchlist={addWatchlists}
            removeWatchlist={removeWatchlists}
          />
        </div>
      </Container>
      <Stack spacing={2}>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Pagination
            variant="outlined"
            color="primary"
            count={totalPage}
            size="large"
            siblingCount={0}
            showFirstButton
            showLastButton
            page={page}
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <Pagination
            variant="outlined"
            color="primary"
            count={totalPage}
            siblingCount={0}
            showFirstButton
            showLastButton
            page={page}
            onChange={handleChange}
          />
        </Box>
      </Stack>
    </Container>
  );
}
