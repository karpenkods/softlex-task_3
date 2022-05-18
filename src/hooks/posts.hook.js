import { useMutation, useQuery, useQueryClient } from 'react-query'
import postsApi from '../api/posts'

const usePosts = () => {
  const queryClient = useQueryClient()

  return {
    Fetch: (userId, options) =>
      useQuery(
        ['list-posts', userId],
        async () => {
          const { data } = await postsApi.fetch(userId)
          return data
        },
        {
          staleTime: 500000,
          refetchInterval: 500000,
          ...options,
        },
      ),

    Show: ({ postId, userId }, options) => {
      const post = queryClient
        .getQueryData(['list-posts', userId])
        ?.find((post) => post.id === parseInt(postId))

      return useQuery(
        ['show-post', postId],
        async () => {
          const { data } = await postsApi.show(postId)
          return data
        },
        {
          staleTime: 500000,
          refetchOnWindowFocus: false,
          initialData: post,
          ...options,
        },
      )
    },

    Create: (options) =>
      useMutation(
        'create-post',
        async (payload) => {
          const { data } = await postsApi.create(payload)
          return data
        },
        options,
      ),

    Update: (postId, options) =>
      useMutation(
        ['update-post', postId],
        async ({ payload }) => {
          const { data } = postsApi.update(postId, payload)
          return data
        },
        options,
      ),

    Destroy: (postId, options) =>
      useMutation(
        ['destroy-post', postId],
        async () => {
          const { data } = await postsApi.destroy(postId)
          return data
        },
        options,
      ),
  }
}

export default usePosts
