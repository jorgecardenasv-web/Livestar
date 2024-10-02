import { User, Session as PrismaSession } from "@prisma/client"



export interface Session extends PrismaSession {
  id: string
  userId: number
  active: boolean
  createdAt: Date
  user: User
}