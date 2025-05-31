import { Request, Response } from 'express';
import {
  QuizAnswer,
  QuizAnswerModel,
} from '../../../../database/quiz/QuizQuestionAnswer';
import { TmResponse } from '../../../../types/common/utils/TmResponse';

interface ReqBody {
  quizAnswer: QuizAnswer;
}

type ResBody = TmResponse<{
  answerId: QuizAnswer['_id'];
}>;

/**
 * Controller for creating a new quiz answer
 */
export const createQuizAnswerController = async (
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
    const { quizAnswer } = req.body;

    // Save the quiz answer to the database
    const newQuiz = await QuizAnswerModel.create({
      ...quizAnswer,
      _id: {
        quizId: req.params.quizId,
        uid: req.params.uid,
      },
      creationDate: new Date(),
    });

    // Return the new quiz ID if successfull
    res.status(200).json({
      status: 'success',
      data: {
        answerId: newQuiz._id,
      },
    });
  } catch (error) {
    console.error('Error creating quiz answer:', error);
    res.status(500).json({
      status: 'error',
      data: {
        message: 'Internal server error',
      },
    });
  }
};
