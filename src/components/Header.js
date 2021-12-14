import React from "react"
import headerLogo from "../images/header__logo.svg"

function Header() {
  return (
    <header className="header page__header">
      <img src={headerLogo} className="header__logo" alt="Логотип проекта" />
      <div className="header__info-block">
        <p className="header__email">SomeMail</p>
        <button type="button" className="header__button">Выйти</button>
      </div>
    </header>)
}

export default Header