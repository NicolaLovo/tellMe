import { Request, Response } from 'express';
import { PrizeModel } from '../../../database/prize/PrizeSchema';
import { TmResponse } from '../../../types/common/utils/TmResponse';
import { Prize } from '../../../types/prizes/Prize';

interface ReqQuery {
  /**
   * 0-based index of the first document in the current page.
   *
   * @default 0
   */
  pageIndex?: string;
  /**
   * Number of documents to include in the current page.
   *
   * @default 10
   */
  pageSize?: string;
}

type ResBody = TmResponse<{
  prizes: Prize[];
  metadata: {
    /**
     * Total number of items that satisfy the query.
     */
    totalCount: number;
  };
}>;

export const listPrizesController = async (
  req: Request<{}, ResBody, {}, ReqQuery>,
  res: Response<ResBody>,
): Promise<void> => {
  try {
    const { pageIndex = '0', pageSize = '10' } = req.query;

    // Convert query parameters to numbers
    const page = parseInt(pageIndex, 10);
    const size = parseInt(pageSize, 10);

    // Validate the page and size parameters
    if (isNaN(page) || isNaN(size) || page < 0 || size <= 0) {
      res.status(400).json({
        status: 'error',
        data: {
          message: 'Invalid pagination parameters',
        },
      });
      return;
    }

    // Fetch prizes from the database
    const prizes = await PrizeModel.find()
      .sort({ creationDate: -1 })
      .skip(page * size)
      .limit(size)
      .exec();

    // Get the total count of prizes
    const totalCount = await PrizeModel.countDocuments().exec();

    // Return the prizes
    res.status(200).json({
      status: 'success',
      data: {
        prizes: prizes as unknown as Prize[],
        metadata: {
          totalCount,
        },
      },
    });
    return;
  } catch (error) {
    console.error('Error listing prizes:', error);
    res.status(500).json({
      status: 'error',
      data: {
        message: 'Internal server error',
      },
    });
    return;
  }
};
