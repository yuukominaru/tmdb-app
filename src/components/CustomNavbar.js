import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

export default function CustomNavbar() {
  return (
    <Navbar
      expand="lg"
      sticky="top"
      bg="primary"
      data-bs-theme="dark"
      className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to={"/"}>
          <h3>CINEMA</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to={"/favorite"}>
              Favorite
            </Nav.Link>
            <Nav.Link as={Link} to={"/watchlist"}>
              Watchlist
            </Nav.Link>
            <Nav.Link as={Link} to={"/search"}>
              <SearchIcon style={{ color: "white" }} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
