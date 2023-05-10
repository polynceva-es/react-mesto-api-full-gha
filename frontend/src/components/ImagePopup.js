import React from "react";

function ImagePopup(props) {

  return (
    <div 
      className={'popup popup_type_image ' + (props.card && 'popup_opened')} 
      onClick={props.handleCloseClickOverlay}>
      <div className="popup__conteiner">
        <button
          className="button button_type_close"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        />
        <figure className="popup__figure">
          <img className="popup__image" src={(props.card && props.card.link)} alt="Фото места"/>
          <figcaption className="popup__figcaption">{(props.card && props.card.name)}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
