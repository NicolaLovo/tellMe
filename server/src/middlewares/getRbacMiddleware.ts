import { NextFunction, Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';
import { TmErrorResponse } from '../../../client/src/types/common/utils/TmResponse';
import { TokenPayload } from '../types/auth/TokenPayload';
import { UserRole } from '../types/auth/UserRole';

interface GetRbacMiddlewareProps {
  requiredRoles: UserRole[];
}

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

export const getRbacMiddleware = ({
  requiredRoles,
}: GetRbacMiddlewareProps) => {
  return async (
    req: Request,
    res: Response<TmErrorResponse>,
    next: NextFunction,
  ) => {
    const authorization = req.headers.authorization;

    const UNAUTHORIZED_RESPONSE: TmErrorResponse = {
      status: 'error',
      data: {
        message: 'Unauthorized',
      },
    };

    if (!authorization) {
      res.status(401).end(UNAUTHORIZED_RESPONSE);
      return;
    }

    const parts = authorization.split(' ');
    if (parts.length !== 2) {
      res.status(401).end(UNAUTHORIZED_RESPONSE);
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
