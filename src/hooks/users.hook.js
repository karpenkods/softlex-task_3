import { useQuery } from 'react-query'
import usersApi from '../api/users'

const useUsers = () => {
  return {
    Show: (userId, options) =>
      useQuery(
        ['show-user', userId],
        async () => {
          const { data } = await usersApi.show(userId)
          return data
        },
        {
          staleTime: 500000,
          refetchOnWindowFocus: false,
          ...options,
        },
      ),
  }
}

export default useUsers
