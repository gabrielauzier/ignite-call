import { z } from 'zod'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth]'

import { database } from '@/common/infra/database/connection'

const updateProfileBodySchema = z.object({
  bio: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
    return res.status(405).end()
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) {
    return res.status(401).end()
  }

  const { bio } = updateProfileBodySchema.parse(req.body)

  await database.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      bio,
    },
  })

  return res.status(200).end()
}
