import { Request, Response } from 'express';
import { QuizModel } from '../../../database/quiz/QuizSchema';
import { TmResponse } from '../../../types/common/utils/TmResponse';
import { Quiz } from '../../../types/quiz/Quiz';

type ResBody = TmResponse<{
  quiz: Quiz;
}>;


/**
 * Controller used to read a quiz
 */
export const readQuizController = async (
  req: Request<{ agencyId: string; quizId: string }, ResBody, {}>,
  res: Response<ResBody>,
): Promise<void> => {
  try {
    // Extract the quiz ID and agency from the request parameters
    const { quizId, agencyId } = req.params;

    // Search for the quiz by ID
    const quiz = await QuizModel.findOne({
      _id: quizId,
      agencyId: agencyId,
    });

    // Check if the quiz exists
    if (!quiz) {
      res.status(404).json({
        status: 'error',
        data: {
          message: 'Quiz not found',
        },
      });
      return;
    }

    quiz.toJSON();

    // Return the quiz ID in the response
    res.status(200).json({
      status: 'success',
      data: {
        quiz: quiz.toJSON() as unknown as Quiz,
      },
    });
    return;
  } catch (error) {
    console.error('Error reading quiz:', error);
    res.status(500).json({
      status: 'error',
      data: {
        message: 'Internal server error',
      },
    });
    return;
  }
};
