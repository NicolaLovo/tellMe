import { Request, Response } from 'express';
import { QuizModel } from '../../../database/quiz/QuizSchema';
import { TmResponse } from '../../../types/common/utils/TmResponse';
import { Quiz } from '../../../types/quiz/Quiz';

interface ReqQuery {
  pageIndex?: string;
  pageSize?: string;
}

type ResBody = TmResponse<{
  quizzes: Quiz[];
  metadata: {
    totalCount: number;
  };
}>;

/**
 * Controller used to list all the quizzes
 */
export const listAgencyQuizzesController = async (
  req: Request<
    {
      agencyId: string;
    },
    ResBody,
    {},
    ReqQuery
  >,
  res: Response<ResBody>,
): Promise<void> => {
  try {
    const { agencyId } = req.params;
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

    // Check if agencyId is valid
    if (!agencyId) {
      res.status(400).json({
        status: 'error',
        data: {
          message: 'Missing agencyId parameter',
        },
      });
      return;
    }

    const filter = { agencyId };

    const rawQuizzes = await QuizModel.find(filter)
      .sort({ creationDate: -1 })
      .skip(page * size)
      .limit(size)
      .lean()
      .exec();

    const quizzes: Quiz[] = rawQuizzes.map((q) => ({
      ...q,
      _id: q._id.toString(),
    }));

    const totalCount = await QuizModel.countDocuments(filter).exec();

    // Return quizzes and metadata
    res.status(200).json({
      status: 'success',
      data: {
        quizzes,
        metadata: {
          totalCount,
        },
      },
    });
    return;
  } catch (error) {
    console.error('Error listing quizzes:', error);
    res.status(500).json({
      status: 'error',
      data: {
        message: 'Internal server error',
      },
    });
    return;
  }
};
