import { useParams } from 'react-router-dom'
import useComments from '../../hooks/comments.hook'
import Loader from '../Loader/Loader'
import './Post.scss'

const Post = () => {
  const { postId } = useParams()
  const { data: comments, isLoading, isError } = useComments().Fetch(postId)

  if (isLoading) {
    return <Loader />
  }
  if (isError) {
    return (
      <h3 className="post__error">
        Что-то пошло не так, пожалуйста, повторите попытку позже.
      </h3>
    )
  }

  return (
    <div className="post">
      <h1 className="post__heading">Комментарии</h1>
      {comments.map(({ id, name, email, body }) => (
        <div key={id} className="list__blockPosts">
          <a href={`mailto:${email}`} className="post__mail">
            {email}
          </a>
          <h5 className="post__name">{name}</h5>
          <p className="post__comment">{body}</p>
        </div>
      ))}
    </div>
  )
}

export default Post
