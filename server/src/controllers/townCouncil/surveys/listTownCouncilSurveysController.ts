import { Request, Response } from 'express';
import { SurveyModel } from '../../../database/survey/SurveySchema';
import { TmResponse } from '../../../types/common/utils/TmResponse';
import { Survey } from '../../../types/survey/Survey';

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
  surveys: Survey[];
  metadata: {
    /**
     * Total number of items that satisfy the query.
     */
    totalCount: number;
  };
}>;

export const listTownCouncilSurveysController = async (
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

    // Fetch surveys from the database
    const surveys = await SurveyModel.find()
      .sort({ creationDate: -1 })
      .skip(page * size)
      .limit(size)
      .exec();

    // Get the total count of surveys
    const totalCount = await SurveyModel.countDocuments().exec();

    // Return the surveys and metadata in the response
    res.status(200).json({
      status: 'success',
      data: {
        surveys,
        metadata: {
          totalCount,
        },
      },
    });
  } catch (error) {
    console.error('Error creating survey:', error);
    res.status(500).json({
      status: 'error',
      data: {
        message: 'Internal server error',
      },
    });
  }
};
