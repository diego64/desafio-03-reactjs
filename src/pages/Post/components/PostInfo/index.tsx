import { useNavigate } from 'react-router-dom'
import ptBR from 'date-fns/locale/pt-BR'
import { formatDistanceToNow } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faCalendar, faChevronLeft, faComment } from '@fortawesome/free-solid-svg-icons'
import { Spinner } from '../../../../components/Spinner'
import { Link } from '../../../../components/Link'
import { Post } from '../../../Blog'
import { Icon, IconContainer, PostInfoContainer } from './styles'

interface PostInfoProps {
  post: Post
  isLoading: boolean
}

export const PostInfo = ({ post, isLoading }: PostInfoProps) => {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }
  return (
    <PostInfoContainer>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <header>
            <Link
              as="button"
              text="voltar"
              variant="iconLeft"
              icon={<FontAwesomeIcon icon={faChevronLeft} />}
              onClick={goBack}
            />

            <Link text="ver no gihub" href={post.html_url} target="_blank" />
          </header>

          <strong>{post.title}</strong>

          <IconContainer>
            <Icon>
              <FontAwesomeIcon icon={faGithub} />
              <span>{post.user?.login}</span>
            </Icon>

            <Icon>
              <FontAwesomeIcon icon={faCalendar} />
              <span>
                {formatDistanceToNow(new Date(post?.created_at), {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </span>
            </Icon>

            <Icon>
              <FontAwesomeIcon icon={faComment} />
              <span>{post.comments}</span>
            </Icon>
          </IconContainer>
        </>
      )}
    </PostInfoContainer>
  )
}
