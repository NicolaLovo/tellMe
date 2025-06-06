import { Request, Response } from 'express';
import { PrizeModel } from '../../../database/prize/PrizeSchema';
import { TmResponse } from '../../../types/common/utils/TmResponse';
import { Prize } from '../../../types/prizes/Prize';

interface ReqBody {
  prize: Prize;
}

type ResBody = TmResponse<{
  prizeId: string;
}>;

/**
 * Controller for creating a new prize
 * Ensures the prize is correctly filled before saving it into the database
 * Returns the prize ID, if the save was successfull
 */
export const createPrizeController = async (
  req: Request<{}, ResBody, ReqBody>,
  res: Response<ResBody>,
) => {
  try {
    const { prize } = req.body;

    if (!prize?.title?.trim() || prize.points <= 0) {
      res.status(400).json({
        status: 'error',
        data: {
          message: 'Missing or invalid required fields',
        },
      });
    }

    // Save the validated survey to the database
    const newPrize = new PrizeModel({
      title: prize.title,
      points: prize.points,
      creationDate: new Date(),
    });
    await newPrize.save();

    // Return the new survey ID if successfull
    res.status(200).json({
      status: 'success',
      data: {
        prizeId: newPrize.id.toString(),
      },
    });
  } catch (error) {
    console.error('Error creating prize:', error);
    res.status(500).json({
      status: 'error',
      data: {
        message: 'Internal server error',
      },
    });
  }
};
