import { Request, Response } from 'express';
import { getAuth } from 'firebase-admin/auth';
import { UserModel } from '../../database/auth/UserSchema';
import { TokenPayload } from '../../types/auth/TokenPayload';
import { TmResponse } from '../../types/common/utils/TmResponse';

// This controller handles the registration of a citizen user, used in the authRouter to handle the POST request to /register/citizen
// It verifies the firebase token, checks if the email is valid and not already in use, and creates a new user in the database
// It also creates a custom token for the user and returns it in the response

// Response body: contains the custom token
type ResBody = TmResponse<{
  token: string;
}>;

// Request body: contains the citizen email and firebase token
interface ReqBody {
  email: string;
  firebaseToken: string;
}

// Controller function to handle the registration of a citizen user
export const registerCitizenController = async (
  req: Request<{}, ResBody, ReqBody>,
  res: Response<ResBody>,
) => {
  try {
    const { firebaseToken, email } = req.body;

    // Retrieve the current instance of the Firebase Authentication service
    const auth = getAuth();

    // Decode the firebase token
    const decodedFirebaseToken = await auth.verifyIdToken(firebaseToken);

    // Check email not empty
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

    // Create new citizen user
    const newUser = new UserModel({
      uid: decodedFirebaseToken.uid,
      email: email,
      roles: ['citizen'],
    });

    // Save user to database
    await newUser.save();

    // Create a token payload that contains the email and role of the user
    const tokenPayload: TokenPayload = {
      email: email,
      roles: ['citizen'],
    };

    // Create custom token using firebase uid and token payload (email and role of the user)
    const token = await auth.createCustomToken(
      decodedFirebaseToken.uid,
      tokenPayload,
    );

    // Return the custom token
    res.status(201).json({
      status: 'success',
      data: {
        token: token,
      },
    });
  } catch (error) {
    // Handle server error
    console.error('Error registering citizen:', error);
    res.status(500).json({
      status: 'error',
      data: {
        message: 'Internal server error',
      },
    });
  }
};
