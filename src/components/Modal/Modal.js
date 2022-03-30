import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { Overlay, ModalBackdrop } from "./Modal.styled";
const modalRoot = document.querySelector("#modal-root");
function Modal({ onClose, children }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  function handleBackdropClick(e) {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalBackdrop>{children}</ModalBackdrop>
    </Overlay>,
    modalRoot
  );
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default Modal;
