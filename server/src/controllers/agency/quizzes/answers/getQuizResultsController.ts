import { Request, Response } from 'express';
import { QuizAnswerModel } from '../../../../database/quiz/QuizAnswerSchema';
import { TmResponse } from '../../../../types/common/utils/TmResponse';
import { QuizResults } from '../../../../types/quiz/QuizResults';

type ResBody = TmResponse<{
  results: QuizResults;
}>;

/**
 * Controller to get aggregated results of completed quiz answers
 */
export const getQuizResultsController = async (
  req: Request<{ quizId: string }, ResBody>,
  res: Response<ResBody>,
) => {
  try {
    const { quizId } = req.params;

    // Fetch only completed answers for this quiz
    const completedAnswers = await QuizAnswerModel.find({
      '_id.quizId': quizId,
      status: 'completed',
    }).lean();

    const resultsMap: Record<
      string,
      {
        type: 'rating';
        optionVotes: Record<'1' | '2' | '3' | '4' | '5', number>;
      }
    > = {};

    // Aggregate the answers
    for (const answerDoc of completedAnswers) {
      for (const answer of answerDoc.answers || []) {
        const { questionId, optionId, type } = answer;

        if (!resultsMap[questionId]) {
          resultsMap[questionId] = {
            type,
            optionVotes: {
              '1': 0,
              '2': 0,
              '3': 0,
              '4': 0,
              '5': 0,
            },
          };
        }

        resultsMap[questionId].optionVotes[optionId]++;
      }
    }

    // Convert resultsMap to QuizResults format
    const results: QuizResults = {
      quizId,
      results: Object.entries(resultsMap).map(
        ([questionId, { type, optionVotes }]) => ({
          questionId,
          type,
          options: (['1', '2', '3', '4', '5'] as const).map((opt) => ({
            optionId: opt,
            votes: optionVotes[opt],
          })),
        }),
      ),
    };

    res.status(200).json({
      status: 'success',
      data: {
        results,
      },
    });
  } catch (error) {
    console.error('Error generating quiz results:', error);
    res.status(500).json({
      status: 'error',
      data: {
        message: 'Internal server error',
      },
    });
  }
};
