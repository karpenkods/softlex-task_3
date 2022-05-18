import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import './Login.scss'

const Login = ({ setIsLogined }) => {
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const handleSubmit = () => {
    setIsLogined(true)
    navigate(`/${id}/posts`)
  }

  return (
    <div className="login">
      <Helmet>
        <title>{'Task_3 | Авторизация'}</title>
      </Helmet>
      <h3 className="login__heading">Авторизация</h3>
      <form onSubmit={handleSubmit} className="login__form">
        <label>Логин</label>
        <input type="email" required className="login__mail" />
        <label>Пароль</label>
        <input type="password" required className="login__mail" />
        <label>ID пользователя</label>
        <input
          type="number"
          min="1"
          max="10"
          required
          className="login__mail"
          value={id}
          onChange={(event) => setId(event.target.value)}
        />
        <button type="submit" className="login__buttonLog">
          Войти
        </button>
      </form>
      <p>
        Данные берутся из удалённого сервера{' '}
        <a href="https://jsonplaceholder.typicode.com/" className="login__link">
          jsonplaceholder.typicode.com
        </a>
        <br />
        Чтобы войти в приложение, пожалуйста, авторизуйтесь.
        <br />
        <strong>Логин</strong> - ваш Email;
        <br />
        <strong>Пароль</strong> - любое количество символов;
        <br />
        <strong>ID пользователя</strong> - номер пользователя в системе (число
        от 0 до 10).
      </p>
    </div>     
  )
}

export default Login
