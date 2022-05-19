import React, { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import usePosts from '../../hooks/posts.hook'
import DeletePost from '../DeletePost/DeletePost'
import Loader from '../Loader/Loader'
import './PostList.scss'

const PostList = () => {
  const [deletionId, setDeletionId] = useState()
  const { userId } = useParams()
  const navigate = useNavigate()
  const { data: posts, isLoading, isError } = usePosts().Fetch(userId)

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return (
      <h3 className="list__error">
        Что-то пошло не так, пожалуйста, повторите попытку позже.
      </h3>
    )
  }

  return (
    <div className="list">
      <div className="list__block">
        <h1 className="list__heading">Посты</h1>
        <button
          className="list__buttonAdd"
          onClick={() => navigate(`/${userId}/posts/new`)}
        >
          Добавить новый пост
        </button>
        {posts.length === 0 && <h3 className="list__error">Постов нет</h3>}
        {posts.map(({ id, title, body }) => (
          <div key={id} className="list__blockPosts">
            <Link to={`/${userId}/posts/${id}`} className="list__posts">
              <p className="list__title">{title}</p>
            </Link>
            <p className="list__body">{body}</p>
            <div className="list__buttons">
              <Link
                to={`/${userId}/posts/${id}/edit`}
                className="list__buttonAdd list__btn"
              >
                Изменить пост
              </Link>
              <Link
                to="#delete"
                className="list__buttonAdd list__btn"
                onClick={() => setDeletionId(id)}
              >
                Удалить пост
              </Link>
            </div>
          </div>
        ))}
      </div>
      <DeletePost
        isOpen={deletionId}
        onClose={() => setDeletionId()}
        deletionId={deletionId}
      />
    </div>
  )
}

export default PostList
