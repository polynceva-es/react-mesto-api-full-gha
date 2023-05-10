import React from "react";
import Header from "../Header";
import Form from "../Form";
import InfoTooltip from "../InfoTooltip";
import useValidation from "../../hooks/useValidation";
import logInFalse from "../../images/authorization_false.svg";

function Login(props) {
  const { values, onChange, resetValidation, isFormValid } = useValidation();
  const textLogInFalse = "Что-то пошло не так! Попробуйте ещё раз.";
  React.useEffect(() => {
    resetValidation({ email: "", password: "" });
  }, []);
  function handleSubmitLogin(evt) {
    evt.preventDefault();
    props.onSubmitLogin(values);
  }
  return (
    <>
      <Header to="sign-up" text="Регистрация" loggedIn={props.loggedIn} />
      <div className="page__conteiner">
        <Form
          title="Вход"
          onSubmit={handleSubmitLogin}
          labelSubmit="Войти"
          isFormValid={isFormValid}
          theme="light"
          children={
            <>
              <label className="form__label">
                <input
                  className="form__input form__input_theme-light"
                  type="email"
                  name="email"
                  onChange={onChange}
                  value={values.email || ""}
                  placeholder="Email"
                  minLength="2"
                  maxLength="30"
                  required
                />
                <span className="form__error"></span>
              </label>
              <label className="form__label">
                <input
                  className="form__input form__input_theme-light"
                  type="password"
                  name="password"
                  onChange={onChange}
                  value={values.password || ""}
                  placeholder="Пароль"
                  minLength="2"
                  maxLength="30"
                  required
                />
                <span className="form__error"></span>
              </label>
            </>
          }
        />
      </div>
      <InfoTooltip
        isOpen={props.isOpen}
        onClose={props.onClose}
        handleCloseClickOverlay={props.handleCloseClickOverlay}
        children={
          <div className="authorization">
            <img
              className="authorization__image"
              src={logInFalse}
              alt="Image"
            />
            <p className="authorization__text">
              {textLogInFalse}
            </p>
          </div>
        }
      />
    </>
  );
}

export default Login;
