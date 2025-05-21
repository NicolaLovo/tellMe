import { UserRole } from './UserRole';

/**
 * The payload of the TellMe JWT token that contains the claims of the user.
 */
export interface TokenPayload {
  /**
   * The unique identifier of the user.
   */
  uid: string;
  email: string;
  /**
   * The roles assigned to the user.
   */
  roles: UserRole[];
}
