import type { UserRole } from './UserRole'

export interface User {
  email: string
  /**
   * rbac
   */
  roles: UserRole[]

  /**
   * Jwt token of the authenticated user
   */
  token: string
}
