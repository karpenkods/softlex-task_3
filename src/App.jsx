import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import PostList from './components/PostList/PostList'
import Post from './components/Post/Post'
import NewPost from './components/NewPost/NewPost'
import EditPost from './components/EditPost/EditPost'
import Login from './components/Login/Login'
import Navbar from './components/Navbar/Navbar'
import Links from './components/Links/Links'
import './index.scss'

const App = () => {
  const [isLogined, setIsLogined] = useState(false)
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<Links handleLogout={() => setIsLogined(false)} />}
          >
            <Route
              path="login"
              element={<Login setIsLogined={setIsLogined} />}
            />
            {isLogined ? (
              <>
                <Route path=":userId/posts" element={<PostList />} />
                <Route path=":userId/posts/:postId" element={<Post />} />
                <Route path=":userId/posts/new" element={<NewPost />} />
                <Route
                  path=":userId/posts/:postId/edit"
                  element={<EditPost />}
                />
              </>
            ) : (
              <Route path="/" element={<Navigate to="login" />} />
            )}
            {/* Дублирующий код ниже нужен для обновления страницы в браузере, 
            т.к. данные авторизации пока никуда не передаются  */}
            <Route path=":userId/posts" element={<PostList />} />
            <Route path=":userId/posts/:postId" element={<Post />} />
            <Route path=":userId/posts/new" element={<NewPost />} />
            <Route path=":userId/posts/:postId/edit" element={<EditPost />} />
          </Route>
        </Routes>
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
