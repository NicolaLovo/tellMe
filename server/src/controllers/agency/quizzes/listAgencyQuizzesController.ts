import { Request, Response } from 'express';
import { QuizModel } from '../../../database/quiz/QuizSchema';
import { TmResponse } from '../../../types/common/utils/TmResponse';
import { Quiz } from '../../../types/quiz/Quiz';

interface ReqQuery {
  /**
   * 0-based index of the first document in the current page.
   * @default 0
   */
  pageIndex?: string;
  /**
   * Number of documents to include in the current page.
   * @default 10
   */
  pageSize?: string;
}

type ResBody = TmResponse<{
  quizzes: Quiz[];
  metadata: {
    /**
     * Total number of items that satisfy the query.
     */
    totalCount: number;
  };
}>;

export const listAgencyQuizzesController = async (
  req: Request<{}, ResBody, {}, ReqQuery>,
  res: Response<ResBody>,
): Promise<void> => {
  try {
    const { pageIndex = '0', pageSize = '10' } = req.query;

    const page = parseInt(pageIndex, 10);
    const size = parseInt(pageSize, 10);

    if (isNaN(page) || isNaN(size) || page < 0 || size <= 0) {
      res.status(400).json({
        status: 'error',
        data: {
          message: 'Invalid pagination parameters',
        },
      });
      return;
    }

    const rawQuizzes = await QuizModel.find()
      .sort({ creationDate: -1 })
      .skip(page * size)
      .limit(size)
      .lean()
      .exec();

    const quizzes: Quiz[] = rawQuizzes.map((q) => ({
      ...q,
      _id: q._id.toString(),
    }));

    const totalCount = await QuizModel.countDocuments().exec();

    res.status(200).json({
      status: 'success',
      data: {
        quizzes,
        metadata: {
          totalCount,
        },
      },
    });
  } catch (error) {
    console.error('Error listing quizzes:', error);
    res.status(500).json({
      status: 'error',
      data: {
        message: 'Internal server error',
      },
    });
  }
};
