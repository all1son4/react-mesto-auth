import React from "react";
import { Link, withRouter } from 'react-router-dom';


function Register() {
  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form">
      <input
        type="text"
        id="register-mail"
        name="register-mail"
        placeholder="Email"
        className="auth__field auth__field_type_mail auth__input auth__input_type_mail"
        minLength="2"
        maxLength="30"
        required />
        <input
        type="text"
        id="register-pass"
        name="register-pass"
        placeholder="Пароль"
        className="auth__field auth__field_type_pass auth__input auth__input_type_pass"
        minLength="2"
        maxLength="30"
        required />
        <button type="submit" className="auth__submit-button">Зарегистрироваться</button>
      </form>
      <a href="#" target="_self" className="auth__login-link">Уже зарегистрированы? Войти</a>
    </div>
  )
}

export default Register