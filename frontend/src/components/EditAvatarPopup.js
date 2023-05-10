import React from "react";
import Popup from "./Popup";
import Form from "./Form";
import useValidation from "../hooks/useValidation";

{
  /* Редактировать аватар */
}
function EditAvatarPopup(props) {
  const avatar = React.useRef();
  const { values, errors, onChange, resetValidation, isFormValid } = useValidation();
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({ avatar: avatar.current.value });
    resetValidation();
  }
  React.useEffect(() => {
    if (props.isOpen) {
      avatar.current.value = "";
    }
    resetValidation({ avatar: "" });
  }, [props.isOpen]);

  return (
    <Popup
      name="editavatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      handleCloseClickOverlay={props.handleCloseClickOverlay}
      children={
        <Form
          title="Обновить аватар"
          labelSubmit="Сохранить"
          onSubmit={handleSubmit}
          isFormValid={isFormValid}
          theme="dark"
          children={
            <label className="form__label">
              <input
                id="input-urlavatar"
                className="form__input form__input_theme-dark"
                type="url"
                name="avatar"
                ref={avatar}
                onChange={onChange}
                placeholder="Ссылка на картинку"
                required
              />
              <span className="form__error input-urlavatar-error">
                {errors.avatar || ""}
              </span>
            </label>
          }
        />
      }
    />
  );
}
export default EditAvatarPopup;
