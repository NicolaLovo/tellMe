import { Request, Response } from 'express';
import { getAuth } from 'firebase-admin/auth';
import { UserModel } from '../../database/auth/UserSchema';
import { TokenPayload } from '../../types/auth/TokenPayload';
import { TmResponse } from '../../types/common/utils/TmResponse';

// This controller handles the registration of a agency user, used in the authRouter to handle the POST request to /register/agency
// It verifies the firebase token, checks if the email is valid and not already in use, and creates a new user in the database
// It also creates a custom token for the user and returns it in the response

// Response body: contains the custom token
type ResBody = TmResponse<{
  token: string;
}>;

// Request body: contains the agency email and firebase token
interface ReqBody {
  email: string;
  firebaseToken: string;
}

/**
 * Controller function to handle the registration of a agency user
 */
export const registerAgencyController = async (
  req: Request<{}, ResBody, ReqBody>,
  res: Response<ResBody>,
) => {
  try {
    const { firebaseToken, email } = req.body;

    // Retrieve the current instance of the Firebase Authentication service
    const auth = getAuth();

    // decode the firebase token to ensure it's valid
    const decodedFirebaseToken = await auth.verifyIdToken(firebaseToken);

    // Check email is not empty
    if (!email) {
      res.status(400).json({
        status: 'error',
        data: {
          message: 'Email is required',
        },
      });
      return;
    }

    // Check email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        status: 'error',
        data: {
          message: 'Email is invalid',
        },
      });
      return;
    }

    // Check email is not already in use
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({
        status: 'error',
        data: {
          message: 'Email is already in use',
        },
      });
      return;
    }

    // Create new agency user
    const newUser = new UserModel({
      uid: decodedFirebaseToken.uid,
      email: email,
      roles: ['agency'],
    });

    // Save user to database
    await newUser.save();

    // Create a token payload that contains Firebase uid, the email and role of the user
    const additionalClaims: TokenPayload = {
      uid: decodedFirebaseToken.uid,
      email: email,
      roles: ['agency'],
    };

    // Create custom token
    const token = await auth.createCustomToken(
      decodedFirebaseToken.uid,
      additionalClaims,
    );

    // Return the custom token
    res.status(200).json({
      status: 'success',
      data: {
        token: token,
      },
    });
    return;
  } catch (error) {
    // Handle server error
    console.error('Error registering agency:', error);
    res.status(500).json({
      status: 'error',
      data: {
        message: 'Internal server error',
      },
    });
    return;
  }
};
