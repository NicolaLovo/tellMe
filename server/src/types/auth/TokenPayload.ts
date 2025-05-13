import { UserRole } from './UserRole';

export interface TokenPayload {
  email: string;
  roles: UserRole[];
}
