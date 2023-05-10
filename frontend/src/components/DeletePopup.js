import React from "react";
import Popup from "./Popup";
import Form from "./Form";

function DeletePopup(props) {
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit(props.card);
  }
  return (
    <Popup
      name="delete-card"
      isOpen={props.card}
      onClose={props.onClose}
      handleCloseClickOverlay={props.handleCloseClickOverlay}
      children={
        <Form
          title="Вы уверены?"
          labelSubmit="Да"
          onSubmit={handleSubmit}
          isFormValid={true}
          theme="dark"
          children={<></>}
        />
      }
    />
  );
}

export default DeletePopup;
