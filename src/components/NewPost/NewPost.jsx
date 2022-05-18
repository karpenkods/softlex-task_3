import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { Helmet } from 'react-helmet'
import usePosts from '../../hooks/posts.hook'
import './NewPost.scss'

const NewPost = () => {
  const navigate = useNavigate()
  const [post, setPost] = useState({})
  const queryClient = useQueryClient()
  const { userId } = useParams()
  const { mutate: addPost } = usePosts().Create({
    onSuccess: (post) => {
      post.userId = userId
      queryClient.setQueryData(['list-posts', userId], (posts) => {
        posts.unshift(post)
        return posts
      })
      navigate(-1)
    },
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    addPost(post)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setPost((post) => ({ ...post, [name]: value }))
  }

  return (
    <div className="new">
      <Helmet>
        <title>{'Task_3 | Создать пост'}</title>
      </Helmet>
      <h1 className="post__heading">Создать пост</h1>
      <form onSubmit={handleSubmit} className="login__form">
        <label>Пост</label>
        <input
          type="text"
          required
          name="title"
          rows={2}
          value={post.title}
          onChange={handleChange}
          className="new__title"
        />
        <label>Комментарий</label>
        <textarea
          type="text"
          required
          rows={7}
          name="body"
          value={post.body}
          onChange={handleChange}
          className="new__body"
        />
        <button className="list__buttonAdd">Создать</button>
      </form>
    </div>
  )
}

export default NewPost
