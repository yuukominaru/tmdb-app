import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { useGetSessionToken } from "../hooks/useGetSessionToken";
import Search from "@mui/icons-material/Search";
import { Logout } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ModalLogin from "./Login/ModalLogin";

export default function CustomNavbar() {
  const {
    sessionToken,
    sessionV3,
    getRequestToken,
    deleteSession,
    deleteSessionV3,
  } = useGetSessionToken();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (sessionToken) {
      setIsLoggedIn(true);
    }
  }, [sessionToken]);

  const handleNavigate = (path) => {
    if (isLoggedIn) {
      navigate(path);
      window.scrollTo(0, 0)
    } else {
      setModalShow(true);
    }
  };

  const handleDeleteSession = () => {
    deleteSession(sessionToken);
    deleteSessionV3(sessionV3);
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <Navbar
        expand="lg"
        sticky="top"
        bg="primary"
        data-bs-theme="dark"
        className={location.pathname.includes("/movie/") ? "" : "mb-4"}>
        <Container>
          <Navbar.Brand as={Link} to={"/"}>
            <h3>CINEMA</h3>
          </Navbar.Brand>
          <div className="d-flex align-items-center order-lg-3 order-md-0 ms-auto">
            <IconButton as={Link} to={"/search"}>
              <Search style={{ color: "white" }} />
            </IconButton>
            {isLoggedIn && (
              <IconButton onClick={handleDeleteSession}>
                <Logout style={{ color: "white" }} />
              </IconButton>
            )}
          </div>
          <Navbar.Toggle
            aria-controls="navbar-nav"
            className="order-lg-2 order-md-2"
          />
          <Navbar.Collapse
            id="navbar-nav"
            className="justify-content-end order-lg-1 order-md-3">
            <Nav>
              <Nav.Link onClick={() => handleNavigate("/favorite")}>
                Favorite
              </Nav.Link>
              <Nav.Link onClick={() => handleNavigate("/watchlist")}>
                Watchlist
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ModalLogin
        show={modalShow}
        onClose={() => setModalShow(false)}
        getToken={getRequestToken}
      />
    </>
  );
}
