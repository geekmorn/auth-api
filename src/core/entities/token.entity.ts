import { User } from './user.entity'

export type Token = {
  id: string
  refreshToken: string
  userId: string
  user: User
}

export type TokenCreate = Omit<Token, 'id'>
