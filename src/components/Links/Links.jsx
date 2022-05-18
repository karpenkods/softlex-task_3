import { Link, Outlet, useParams } from 'react-router-dom'
import useUsers from '../../hooks/users.hook'
import './Links.scss'

const Links = ({ handleLogout }) => {
  const { userId } = useParams()
  const user = useUsers().Show(userId)

  return (
    <div className="links">
      {userId && (
        <div className="links__block">
          <Link className="links__great" to={userId ? `/${userId}/posts` : '/'}>
            Главная
          </Link>
          <div className="links__user">
            Пользователь <strong>{user.data?.name}</strong>
          </div>
          <Link className="links__great" to="login" onClick={handleLogout}>
            Выйти
          </Link>
        </div>
      )}
      <Outlet />
    </div>
  )
}

export default Links
