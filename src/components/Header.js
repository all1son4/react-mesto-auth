import React from "react"
import headerLogo from "../images/header__logo.svg"

function Header() {
  return (
    <header className="header page__header">
      <img src={headerLogo} className="header__logo" alt="Логотип проекта" />
    </header>)
}

export default Header