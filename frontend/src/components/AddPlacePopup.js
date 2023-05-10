import React from "react";
import Popup from "./Popup";
import Form from "./Form";
import useValidation from "../hooks/useValidation";

{
  /* Добавить карточку */
}
function AddPlacePopup(props) {
  const { values, errors, onChange, resetValidation, isFormValid } =
    useValidation();
  React.useEffect(() => {
    resetValidation({ title: "", url: "" });
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({ title: values.title, url: values.url });
    resetValidation();
  }

  return (
    <Popup
      name="addcard"
      isOpen={props.isOpen}
      onClose={props.onClose}
      handleCloseClickOverlay={props.handleCloseClickOverlay}
      children={
        <Form
          title="Новое место"
          labelSubmit="Создать"
          onSubmit={handleSubmit}
          isFormValid={isFormValid}
          theme="dark"
          children={
            <>
              <label className="form__label">
                <input
                  id="input-title"
                  className="form__input form__input_theme-dark"
                  type="text"
                  name="title"
                  value={values.title || ""}
                  placeholder="Название"
                  // onChange={handleChangeTitle}
                  onChange={onChange}
                  minLength="2"
                  maxLength="30"
                  required
                />
                <span className="form__error input-title-error">
                  {errors.title || ""}
                </span>
              </label>
              <label className="form__label">
                <input
                  id="input-url"
                  className="form__input form__input_theme-dark"
                  type="url"
                  name="url"
                  value={values.url || ""}
                  placeholder="Ссылка на картинку"
                  // onChange={handleChangeUrl}
                  onChange={onChange}
                  required
                />
                <span className="form__error input-url-error">
                  {errors.url || ""}
                </span>
              </label>
            </>
          }
        />
      }
    />
  );
}
export default AddPlacePopup;
