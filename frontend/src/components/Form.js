import React from "react";

function Form(props) {
  const submitButtonClassName = 'button button_type_submit ' + (props.isFormValid ? 'button_type_submit-' + props.theme : 'button_type_submit-error-' + props.theme);
  const formTitleClassName = (`form__title form__title_theme-${props.theme}`)
  
  return (
    <div>
      <h2 className={formTitleClassName}>{props.title}</h2>
      <form
        className="form"
        name={props.title}
        onSubmit={props.onSubmit}
        action="#"
      >
        {props.children}
        <button
          className={submitButtonClassName}
          type="submit"
          aria-label={props.labelSubmit}
          disabled={!props.isFormValid}
        >
          {props.labelSubmit}
        </button>   
      </form>
    </div>
  );
}

export default Form;
