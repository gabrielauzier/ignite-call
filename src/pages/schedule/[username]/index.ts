import { database } from '@/common/infra/database/connection'
import { UserModel } from '@/website/auth/domain/models'
import { makeSchedulePage } from '@/website/calendar/presentation/factories/pages'
import { GetStaticPaths, GetStaticProps } from 'next'

interface ISchedulePage {
  user: UserModel
}

export default ({ user }: ISchedulePage) => makeSchedulePage(user)

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  const user = await database.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url,
        username: user.username,
        email: user.email,
      },
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
