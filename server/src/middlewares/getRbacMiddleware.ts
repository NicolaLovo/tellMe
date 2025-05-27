import { NextFunction, Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from '../types/auth/TokenPayload';
import { UserRole } from '../types/auth/UserRole';
import { TmErrorResponse } from '../types/common/utils/TmResponse';

interface GetRbacMiddlewareProps {
  requiredRoles: UserRole[];
}

/**
 * Decodes a JWT token and extracts the claims as a `TokenPayload` object.
 *
 * @param token - The JWT token string to decode.
 * @returns The extracted `TokenPayload` claims if decoding is successful; otherwise, `null`.
 */
const decodeTokenClaims = (token: string): TokenPayload | null => {
  try {
    const decoded = jwtDecode(token);
    if (!decoded) {
      return null;
    }

    const data = decoded as {
      claims: TokenPayload;
    };

    return data.claims;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

const UNAUTHORIZED_RESPONSE: TmErrorResponse = {
  status: 'error',
  data: {
    message: 'Unauthorized',
  },
};

/**
 * Creates an Express middleware function for Role-Based Access Control (RBAC).
 *
 * This middleware checks if the incoming request contains a valid authorization token
 * and verifies that the user has all the required roles specified in `requiredRoles`.
 * If the authorization header is missing, malformed, or the token is invalid, it responds
 * with a 401 Unauthorized status. If the user does not have all required roles, it responds
 * with a 403 Forbidden status. Otherwise, it calls `next()` to proceed to the next middleware.
 *
 * @param requiredRoles - An array of roles that the user must have to access the route.
 * @returns An Express middleware function that enforces RBAC based on the provided roles.
 */
export const getRbacMiddleware = ({
  requiredRoles,
}: GetRbacMiddlewareProps) => {
  return async (
    req: Request,
    res: Response<TmErrorResponse>,
    next: NextFunction,
  ) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
      res.status(401).json(UNAUTHORIZED_RESPONSE);
      return;
    }

    const parts = authorization.split(' ');
    if (parts.length !== 2) {
      res.status(401).json(UNAUTHORIZED_RESPONSE);
      return;
    }

    // const scheme = parts[0];
    const token = parts[1];

    const claims = decodeTokenClaims(token);
    if (!claims) {
      res.status(401).end(UNAUTHORIZED_RESPONSE);
      return;
    }

    const userRoles = claims.roles;

    const hasAllRequiredRoles = requiredRoles.every((role) =>
      userRoles.includes(role),
    );
    if (!hasAllRequiredRoles) {
      res.status(403).end({
        status: 'error',
        data: {
          message: 'Forbidden',
        },
      });
      return;
    }

    // If the user has the required roles, proceed to the next middleware
    next();
  };
};
