import { useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import usePosts from '../../hooks/posts.hook'
import './DeletePost.scss'

const DeletePost = ({ isOpen, onClose, deletionId }) => {
  const queryClient = useQueryClient()
  const { userId } = useParams()

  const { mutateAsync: deletePost } = usePosts().Destroy(deletionId, {
    onSuccess: () => {
      queryClient.setQueryData(['list-posts', userId], (posts) =>
        posts.filter((post) => post.id !== parseInt(deletionId)),
      )
    },
  })

  const handleSubmit = async () => {
    await deletePost(deletionId)
    onClose()
  }

  return (
    <dialog open={isOpen} className="del">
      <div className="del__modal">
        <p className="del__description">
          Вы действительно хотите удалить этот пост ?
        </p>
        <div className="del__buttons">
          <a
            href="#cancel"
            role="button"
            onClick={onClose}
            className="del__buttonCancel"
          >
            Отмена
          </a>
          <a
            href="#confirm"
            role="button"
            onClick={handleSubmit}
            className="del__buttonDel"
          >
            Удалить
          </a>
        </div>
      </div>
    </dialog>
  )
}

export default DeletePost
