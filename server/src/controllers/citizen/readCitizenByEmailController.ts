import { Request, Response } from 'express';
import { UserModel } from '../../database/auth/UserSchema';
import { TmResponse } from '../../types/common/utils/TmResponse';

interface ReqParams {}

interface ReqQuery {
  email?: string;
}

type ResBody = TmResponse<{
  uid: string;
}>;

/**
 * Controller to find a citizen by their email address.
 */
export const readCitizenByEmailController = async (
  req: Request<ReqParams, ResBody, {}, ReqQuery>,
  res: Response<ResBody>,
): Promise<void> => {
  try {
    const { email } = req.query;

    if (!email) {
      res.status(400).json({
        status: 'error',
        data: {
          message: 'Email is required',
        },
      });
      return;
    }

    const citizen = await UserModel.findOne({ email }).exec();

    // Check if citizen exists
    if (!citizen) {
      res.status(404).json({
        status: 'error',
        data: {
          message: 'Citizen not found',
        },
      });
      return;
    }

    // Check if it is a citizen
    if (!citizen.roles.includes('citizen')) {
      res.status(403).json({
        status: 'error',
        data: {
          message: 'User is not a citizen',
        },
      });
      return;
    }

    // Return uid if successfull
    res.status(200).json({
      status: 'success',
      data: {
        uid: citizen.uid.toString(),
      },
    });
    return;
  } catch (error) {
    console.error('Error fetching citizen quizzes:', error);
    res.status(500).json({
      status: 'error',
      data: {
        message: 'Internal server error',
      },
    });
    return;
  }
};
