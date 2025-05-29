import { Request, Response } from 'express';
import { QuizModel } from '../../../database/quiz/QuizSchema';
import { TmResponse } from '../../../types/common/utils/TmResponse';
import { Quiz } from '../../../types/quiz/Quiz';

interface ReqBody {
  quiz: Quiz;
}

type ResBody = TmResponse<{
  quizId: string;
}>;

/**
 * Controller for creating a new quiz
 * Ensures the quiz is correctly filled before saving it into the database
 * Returns the quiz ID, if the save was successfull
 */
export const createQuizController = async (
  req: Request<
    {
      agencyId: string;
    },
    ResBody,
    ReqBody
  >,
  res: Response<ResBody>,
) => {
  try {
    const { quiz } = req.body;

    if (
      !quiz?.title?.trim() ||
      !Array.isArray(quiz.questions) ||
      quiz.questions.length === 0
    ) {
      res.status(400).json({
        status: 'error',
        data: {
          message: 'Missing or invalid required fields',
        },
      });
    }

    // Validate each question
    for (const question of quiz.questions) {
      if (!question.question?.trim()) {
        res.status(400).json({
          status: 'error',
          data: {
            message: 'Each question must have a non-empty question text',
          },
        });
      }
    }

    // Save the validated quiz to the database
    const newQuiz = new QuizModel({
      title: quiz.title,
      agencyId: req.params.agencyId,
      questions: quiz.questions,
      creationDate: new Date(),
    });
    await newQuiz.save();

    // Return the new quiz ID if successfull
    res.status(200).json({
      status: 'success',
      data: {
        quizId: newQuiz.id.toString(),
      },
    });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({
      status: 'error',
      data: {
        message: 'Internal server error',
      },
    });
  }
};
