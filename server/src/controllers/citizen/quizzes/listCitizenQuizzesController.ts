import { Request, Response } from 'express';
import { QuizAnswerModel } from '../../../database/quiz/QuizAnswerSchema';
import { TmResponse } from '../../../types/common/utils/TmResponse';
import { QuizAnswer } from '../../../types/quiz/answer/QuizAnswer';

interface ReqParams {
  /**
   * The unique identifier of the citizen.
   * This is used to filter quizzes associated with the citizen.
   */
  uid: string;
}

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
  quizzes: QuizAnswer[];
  metadata: {
    totalCount: number;
  };
}>;

export const listCitizenQuizzesController = async (
  req: Request<ReqParams, ResBody, {}, ReqQuery>,
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

    const filter = { uid: req.params.uid, status: 'pending' };

    const quizzes = await QuizAnswerModel.find(filter)
      .sort({ creationDate: -1 })
      .skip(page * size)
      .limit(size)
      .exec();

    const totalCount = await QuizAnswerModel.countDocuments(filter).exec();

    res.status(200).json({
      status: 'success',
      data: {
        quizzes: quizzes as QuizAnswer[],
        metadata: {
          totalCount,
        },
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
