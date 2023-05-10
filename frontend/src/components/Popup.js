import React from "react";

function Popup(props) {
    return (
    <div 
      className={`popup popup_type_form popup_type_form-${props.name} ` + (props.isOpen && 'popup_opened') }
      onClick={props.handleCloseClickOverlay}>
      <div className="popup__conteiner popup__conteiner_form">
        <button
          className="button button_type_close"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        />
        {props.children}
      </div>
    </div>
    )
}

export default Popup;