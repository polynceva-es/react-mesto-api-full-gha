import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Header(props) {
  const navButtonMenuClassName = `header__nav-icon ${
    props.isMenuOpen && "header__nav-icon_close"
  }`;
  const headerLinkClassName = `header__link ${
    props.loggedIn ? "header__link_type_login" : "header__link_type_logout"
  }`;

  return (
    <>
      {props.loggedIn && props.isMenuOpen && (
        <div className="header__container_mobile_column">
          <p className="header__email_mobile">{props.email}</p>
          <Link
            to={`/${props.to}`}
            onClick={props.onClick}
            className="header__link_mobile"
          >
            {props.text}
          </Link>
        </div>
      )}
      <header className="header page__conteiner">
        <img className="header__logo" src={logo} alt="Логотип Место" />
        <div className="header__container_desctop_row">
          {props.loggedIn && (
            <>
              <button
                className="header__nav-button"
                onClick={props.handleMenuOpen}
              >
                <span className={navButtonMenuClassName}></span>
              </button>
              <p className="header__email">{props.email}</p>
            </>
          )}
          <Link
            to={`/${props.to}`}
            onClick={props.onClick}
            className={headerLinkClassName}
          >
            {props.text}
          </Link>
        </div>
      </header>
    </>
  );
}

export default Header;
