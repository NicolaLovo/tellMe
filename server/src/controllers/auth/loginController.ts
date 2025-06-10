import { Request, Response } from 'express';
import { getAuth } from 'firebase-admin/auth';
import { UserModel } from '../../database/auth/UserSchema';
import { TokenPayload } from '../../types/auth/TokenPayload';
import { TmResponse } from '../../types/common/utils/TmResponse';

interface ReqBody {
  firebaseToken: string;
}

type ResBody = TmResponse<{
  token: string;
}>;

export const loginController = async (
  req: Request<{}, ResBody, ReqBody>,
  res: Response<ResBody>,
): Promise<void> => {
  try {
    const { firebaseToken } = req.body;

    const auth = getAuth();

    // decode the firebase token to ensure it's valid
    const decodedFirebaseToken = await auth.verifyIdToken(firebaseToken);

    // retrieve user from database
    const userEntity = await UserModel.findOne({
      uid: decodedFirebaseToken.uid,
    });

    if (!userEntity) {
      res.status(404).json({
        status: 'error',
        data: {
          message: 'User not found',
        },
      });
      return;
    }

    const additionalClaims: TokenPayload = {
      email: userEntity.email,
      roles: userEntity.roles,
      uid: userEntity.uid,
    };

    // Encode custom claims in the token
    const token = await auth.createCustomToken(
      decodedFirebaseToken.uid,
      additionalClaims,
    );

    res.status(200).json({
      status: 'success',
      data: {
        token,
      },
    });
    return;
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({
      status: 'error',
      data: {
        message: 'Internal server error',
      },
    });
    return;
  }
};
