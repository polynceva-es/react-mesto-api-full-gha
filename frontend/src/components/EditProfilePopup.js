import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Popup from "./Popup";
import Form from "./Form";
import useValidation from "../hooks/useValidation";

{
  /* Редактировать профиль */
}
function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, errors, onChange, resetValidation, isFormValid } =
    useValidation();
  React.useEffect(() => {
    resetValidation(
      { name: currentUser.name, about: currentUser.about },
      { name: "", about: "" }
    );
  }, [currentUser, props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({ name: values.name, about: values.about });
    resetValidation();
  }
  return (
    <Popup
      name="editprofile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      handleCloseClickOverlay={props.handleCloseClickOverlay}
      children={
        <Form
          title="Редактировать профиль"
          labelSubmit="Сохранить"
          onSubmit={handleSubmit}
          isFormValid={isFormValid}
          theme="dark"
          children={
            <>
              <label className="form__label">
                <input
                  id="input-name"
                  className="form__input form__input_theme-dark"
                  type="text"
                  value={values.name || ""}
                  name="name"
                  placeholder="Имя"
                  // onChange={handleChangeName}
                  onChange={onChange}
                  minLength="2"
                  maxLength="40"
                  required
                />
                <span className="form__error input-name-error">
                  {errors.name || ""}
                </span>
              </label>
              <label className="form__label">
                <input
                  id="input-about"
                  className="form__input form__input_theme-dark"
                  type="text"
                  value={values.about || ""}
                  // onChange={handleChangeDescription}
                  onChange={onChange}
                  name="about"
                  placeholder="О себе"
                  minLength="2"
                  maxLength="200"
                  required
                />
                <span className="form__error input-about-error">
                  {errors.about || ""}
                </span>
              </label>
            </>
          }
        />
      }
    />
  );
}
export default EditProfilePopup;
