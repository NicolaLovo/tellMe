import { Request, Response } from 'express';
import { QuizAnswerModel } from '../../../../database/quiz/QuizAnswerSchema';
import { QuizModel } from '../../../../database/quiz/QuizSchema';
import { TmResponse } from '../../../../types/common/utils/TmResponse';
import { QuizQuestion } from '../../../../types/quiz/QuizQuestion';
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

    const quizFindRes = await QuizModel.find({
      _id: quizId,
    });

    const quiz = quizFindRes[0];

    if (!quiz) {
      res.status(404).json({
        status: 'error',
        data: {
          message: 'Quiz not found',
        },
      });
      return;
    }

    /**
     * Convert quiz questions to a map for easy access.
     */
    const questionsMap: Record<string, QuizQuestion> = {};

    for (const question of quiz.questions) {
      questionsMap[question.id] = question;
    }

    // Fetch only completed answers for this quiz
    const completedAnswers = await QuizAnswerModel.find({
      '_id.quizId': quizId,
      status: 'completed',
    }).lean();

    const resultsMap: Record<
      string,
      {
        type: 'rating';
        question: string;
        optionVotes: Record<'1' | '2' | '3' | '4' | '5', number>;
      }
    > = {};

    // Aggregate the answers
    for (const answerDoc of completedAnswers) {
      for (const answer of answerDoc.answers || []) {
        const { questionId, optionId, type } = answer;
        const question = questionsMap[questionId];

        if (!question) {
          console.warn(`Question with ID ${questionId} not found in quiz.`);
          continue;
        }

        if (!resultsMap[questionId]) {
          resultsMap[questionId] = {
            type,
            question: question.question,
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
      results: [],
    };

    for (const [questionId, result] of Object.entries(resultsMap)) {
      const questionResult: QuizResults['results'][number] = {
        questionId,
        question: result.question,
        type: result.type,
        options: [],
      };

      // iterate over the option votes and create options array
      for (const [optionId, votes] of Object.entries(result.optionVotes)) {
        questionResult.options.push({
          optionId: optionId as '1' | '2' | '3' | '4' | '5',
          votes,
        });
      }

      // questionResult.options.sort((a, b) => {
      //   return parseInt(a.optionId) - parseInt(b.optionId);
      // });

      results.results.push(questionResult);
    }

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
