import React from "react";
import { Container } from "react-bootstrap";
import NowPlaying from "../components/Home/NowPlaying";
import { useGetNowPlayingMovies } from "../hooks/useGetNowPlayingMovies";
import { useGetTopRatedMovies } from "../hooks/useGetTopRatedMovies";
import TopRated from "../components/Home/TopRated";

export default function Home() {
  const { nowPlaying, npError } = useGetNowPlayingMovies();
  const { topRated, trError } = useGetTopRatedMovies();

  return (
    <Container className="d-flex flex-column mb-3 gap-5">
      <div>
        <h1>Now Playing</h1>
        <NowPlaying movie={nowPlaying} error={npError} />
      </div>
      <div>
        <h1>Top Rated</h1>
        <TopRated movie={topRated} error={trError} />
      </div>
    </Container>
  );
}
