import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import usePosts from '../../hooks/posts.hook'
import '../NewPost/NewPost.scss'

const EditPost = () => {
  const navigate = useNavigate()
  const { postId, userId } = useParams()
  const queryClient = useQueryClient()
  const { data } = usePosts().Show(
    { postId, userId },
    {
      onSuccess: (data) => setPost(data),
    },
  )
  const { mutate: updatePost } = usePosts().Update(postId, {
    onSuccess: () => {
      queryClient.setQueryData(['list-posts', userId], (posts) => {
        const postIndex = posts.findIndex(
          (post) => post.id === parseInt(postId),
        )
        posts[postIndex] = post
        return posts
      })
      queryClient.setQueryData(['show-post', postId], () => post)
      navigate(-1)
    },
  })
  const [post, setPost] = useState(data)

  const handleSubmit = async (event) => {
    event.preventDefault()
    updatePost(post)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setPost((post) => ({ ...post, [name]: value }))
  }

  return (
    <div className="new">
      <h1 className="post__heading">Изменить пост</h1>
      <form onSubmit={handleSubmit} className="login__form">
        <label>Пост</label>
        <input
          type="text"
          required
          name="title"
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
        <button className="list__buttonAdd">Изменить</button>
      </form>
    </div>
  )
}

export default EditPost
