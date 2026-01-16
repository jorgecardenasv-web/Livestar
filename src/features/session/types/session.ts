import { User, Session as PrismaSession } from "@generated/prisma/client"



export interface Session extends PrismaSession {
  id: string
  userId: string
  active: boolean
  createdAt: Date
  user: User
}