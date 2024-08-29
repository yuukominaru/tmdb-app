import React from "react";
import { Modal } from "react-bootstrap";
import tmdbLogo from "../../assets/tmdb-logo.png";

export default function ModalLogin({ show, onClose, getToken }) {
  return (
    <Modal show={show} onHide={onClose} size="sm" data-bs-theme="dark" centered>
      <Modal.Body onClick={getToken}>
        <div className="d-flex flex-column justify-content-center align-items-center gap-4">
          <img src={tmdbLogo} alt="tmdb logo" className="login-logo" />
          <h4>Login with TMDB</h4>
        </div>
      </Modal.Body>
    </Modal>
  );
}
