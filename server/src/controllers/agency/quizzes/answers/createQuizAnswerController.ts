import { Request, Response } from 'express';
import { QuizAnswerModel } from '../../../../database/quiz/QuizAnswerSchema';
import { TmResponse } from '../../../../types/common/utils/TmResponse';
import { QuizAnswer } from '../../../../types/quiz/answer/QuizAnswer';

interface ReqBody {
  quizAnswer: QuizAnswer;
}

type ResBody = TmResponse<{
  answerId: QuizAnswer['_id'];
}>;

/**
 * Controller for creating a new quiz answer
 */ export const createQuizAnswerController = async (
  req: Request<
    {
      agencyId: string;
      quizId: string;
      uid: string;
    },
    ResBody,
    ReqBody
  >,
  res: Response<ResBody>,
) => {
  try {
    const { uid } = req.params;

    if (!uid || uid.trim() === '') {
      res.status(400).json({
        status: 'error',
        data: { message: 'Missing required parameter: uid' },
      });
      return;
    }

    const { quizAnswer } = req.body;

    // eventualmente anche verifica che quizAnswer.uid corrisponda a params.uid
    if (
      !quizAnswer ||
      typeof quizAnswer !== 'object' ||
      quizAnswer.uid !== uid
    ) {
      res.status(400).json({
        status: 'error',
        data: {
          message: 'Invalid or missing quizAnswer object or uid mismatch',
        },
      });
      return;
    }

    const quizPayload: Omit<QuizAnswer, '_id'> = {
      ...quizAnswer,
      creationDate: new Date(),
    };

    delete (quizPayload as any)._id;

    const newQuiz = await QuizAnswerModel.create(quizPayload);

    res.status(200).json({
      status: 'success',
      data: {
        answerId: newQuiz.id.toString(),
      },
    });
    return;
  } catch (error) {
    console.error('Error creating quiz answer:', error);
    res.status(500).json({
      status: 'error',
      data: {
        message: 'Internal server error',
      },
    });
    return;
  }
};
