import { Request, Response } from 'express';
import { QuizAnswerModel } from '../../../database/quiz/QuizAnswerSchema';
import { TmResponse } from '../../../types/common/utils/TmResponse';
import { QuizAnswer } from '../../../types/quiz/answer/QuizAnswer';

interface ReqBody {
  quizAnswer: Partial<QuizAnswer>;
}

type ResBody = TmResponse<{
  quizAnswerId: string;
}>;

export const updateQuizAnswerController = async (
  req: Request<{ quizAnswerId: string }, ResBody, ReqBody>,
  res: Response<ResBody>,
): Promise<void> => {
  try {
    // Extract the quiz answer ID from the request parameters
    const { quizAnswerId } = req.params;

    // Search for the quiz answer by ID
    const quizAnswer = await QuizAnswerModel.findById(quizAnswerId);

    // Check if the quiz answer exists
    if (!quizAnswer) {
      res.status(404).json({
        status: 'error',
        data: {
          message: 'Quiz answer not found',
        },
      });
      return;
    }

    let updateBody: Partial<QuizAnswer> = {};

    /**
     * Allow update only of the following fields:
     * - status
     * - answers
     */
    if (req.body.quizAnswer.status) {
      updateBody.status = req.body.quizAnswer.status;
    }
    if (
      req.body.quizAnswer.status === 'completed' &&
      req.body.quizAnswer.answers
    ) {
      updateBody = {
        ...updateBody,
        status: 'completed',
        answers: req.body.quizAnswer.answers,
      };
    }

    /**
     * Update the quizAnswer with the provided data
     */
    await quizAnswer.updateOne({ $set: updateBody });

    // Return the quizAnswer ID in the response
    res.status(200).json({
      status: 'success',
      data: {
        quizAnswerId: quizAnswer.id.toString(),
      },
    });
  } catch (error) {
    console.error('Error quizAnswer:', error);
    res.status(500).json({
      status: 'error',
      data: {
        message: 'Internal server error',
      },
    });
  }
};
