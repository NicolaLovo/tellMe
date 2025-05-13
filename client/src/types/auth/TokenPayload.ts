import { UserRole } from './UserRole'

export interface TokenPayload {
  uid: string
  email: string
  roles: UserRole[]
}
