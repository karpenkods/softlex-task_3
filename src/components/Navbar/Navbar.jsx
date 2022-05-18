import Search from '../Links/Links'
import './Navbar.scss'
import s from '../../assets/img/softlex.svg'

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="nav__container">
        <div className="nav__leftBlock">
          <a href="https://softlex.pro/" title="Softlex">
            <img className="nav__logo" src={s} alt="logo" />
          </a>
          <h1 className="nav__company">Softlex</h1>
        </div>
        <h1 className="nav__heading">Блог</h1>
        <p className="nav__description">Task_3</p>
      </div>
      <Search />
    </nav>
  )
}

export default Navbar
