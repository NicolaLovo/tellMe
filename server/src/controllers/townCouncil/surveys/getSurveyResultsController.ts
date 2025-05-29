import { Request, Response } from 'express';
import { SurveyResult } from '../../../../../client/src/types/survey/SuveyResult';
import { SurveyAnswerModel } from '../../../database/survey/SurveyAnswerSchema';
import { TmResponse } from '../../../types/common/utils/TmResponse';

type ResBody = TmResponse<{ surveyResults: SurveyResult }>;

/**
 * Controller to retrieve aggregated survey results by survey ID.
 *
 * @route GET /api/surveys/:surveyId/results
 * @param req.params.surveyId - The ID of the survey to retrieve results for
 * @returns TmResponse containing the survey results or an error message
 */
export const getSurveyResultsController = async (
  req: Request<{ surveyId: string }, ResBody, {}>,
  res: Response<ResBody>,
): Promise<void> => {
  const { surveyId } = req.params;

  try {
    const results = await SurveyAnswerModel.aggregate([
      { $match: { '_id.surveyId': surveyId } },
      { $unwind: '$answers' },
      {
        $group: {
          _id: {
            questionId: '$answers.questionId',
            optionId: '$answers.optionId',
          },
          votes: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: '$_id.questionId',
          options: {
            $push: {
              optionId: '$_id.optionId',
              votes: '$votes',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          questionId: '$_id',
          options: 1,
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        surveyResults: {
          surveyId,
          results,
        },
      },
    });
  } catch (error) {
    console.error('Error retrieving survey results:', error);
    res.status(500).json({
      status: 'error',
      data: {
        message: 'Internal server error',
      },
    });
  }
};
