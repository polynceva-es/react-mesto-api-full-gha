import React from "react";
import Popup from "./Popup";

function InfoTooltip(props) {
  return (
    <>
      <Popup
        name="autorisation"
        isOpen={props.isOpen}
        onClose={props.onClose}
        handleCloseClickOverlay={props.handleCloseClickOverlay}
        children={props.children}
      />
    </>
  );
}

export default InfoTooltip;
