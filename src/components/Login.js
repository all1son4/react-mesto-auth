import React from "react";
import { Link, withRouter } from 'react-router-dom';


function Login() {
  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form">
      <input
        type="text"
        id="login-mail"
        name="login-mail"
        placeholder="Email"
        className="auth__field auth__field_type_mail auth__input auth__input_type_mail"
        minLength="2"
        maxLength="30"
        required />
        <input
        type="text"
        id="login-pass"
        name="login-pass"
        placeholder="Пароль"
        className="auth__field auth__field_type_pass auth__input auth__input_type_pass"
        minLength="2"
        maxLength="30"
        required />
        <button type="submit" className="auth__submit-button">Войти</button>
      </form>
    </div>
  )
}

export default Login