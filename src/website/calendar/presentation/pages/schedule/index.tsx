import { Avatar, Heading, Text } from '@ignite-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Container, UserHeader } from './styles'

import { database } from '@/common/infra/database/connection'

interface ScheduleProps {
  user: {
    name: string
    bio: string
    avatarUrl: string
  }
}

export default function Schedule({ user }: ScheduleProps) {
  return (
    <Container>
      <UserHeader>
        <Avatar src={user.avatarUrl} />
        <Heading>{user.name}</Heading>
        <Text>{user.bio}</Text>
      </UserHeader>
    </Container>
  )
}
