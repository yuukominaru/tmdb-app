import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import Search from "./pages/Search";
import Favorite from "./pages/Favorite";
import MovieDetail from "./pages/MovieDetail";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/favorite" element={<Favorite />} />
      <Route path="/watchlist" element={<Watchlist />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}

export default Routing;
