import React from "react";
import { useNavigate } from "react-router-dom"; 
import Header from "../Header";
import Form from "../Form";
import InfoTooltip from "../InfoTooltip";
import useValidation from "../../hooks/useValidation";
import authorizationTrue from "../../images/authorization_true.svg";
import authorizationFalse from "../../images/authorization_false.svg";
import { Link } from "react-router-dom";

function Register(props) {
  const { values, onChange, resetValidation, isFormValid } = useValidation();
  const navigate = useNavigate();
React.useEffect(() => {
  resetValidation({ email: "", password: "" });
}, []);
  const textauthorizationTrue = "Вы успешно зарегистрировались!";
  const textauthorizationFalse = "Что-то пошло не так! Попробуйте ещё раз.";
  function closePopup() {
    if(props.regedIn) {navigate ('/sign-in', {replace: true})};
    props.onClose();
  }

  function handleSubmitRegister(evt) {
    evt.preventDefault();
    props.onSubmitRegister(values);
  }
  return (
    <>
      <Header to="sign-in" text="Войти" loggedIn={props.loggedIn}/>
      <div className="page__conteiner">
        <Form
          title="Регистрация"
          onSubmit={handleSubmitRegister}
          labelSubmit="Зарегистрироваться"
          isFormValid={isFormValid}
          theme="light"
          children={
            <>
              <label className="form__label">
                <input
                  className="form__input form__input_theme-light"
                  type="email"
                  name="email"
                  value={values.email || ''}
                  onChange={onChange}
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
                  value={values.password || ''}
                  onChange={onChange}
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
        <Link to="/sign-in" className="form__caption">Уже зарегистрированы? Войти</Link>
      </div>
      <InfoTooltip
        isOpen={props.isOpen}
        onClose={closePopup}
        handleCloseClickOverlay={props.handleCloseClickOverlay}
        children={
          <div className="authorization">
            <img 
              className="authorization__image" 
              src={(props.regedIn ? authorizationTrue : authorizationFalse)} 
              alt="Image"
            />
            <p className="authorization__text">
              {props.regedIn ? textauthorizationTrue : textauthorizationFalse}
            </p>
          </div>
        }
      />
    </>
  );
}

export default Register;
