import { Request, Response } from 'express';
import { SurveyModel } from '../../../database/survey/SurveySchema';
import { TmResponse } from '../../../types/common/utils/TmResponse';
import { Survey } from '../../../types/survey/Survey';

type ResBody = TmResponse<{
  survey: Survey;
}>;

export const readSurveyController = async (
  req: Request<{ surveyId: string }, ResBody, {}>,
  res: Response<ResBody>,
): Promise<void> => {
  try {
    // Extract the survey ID from the request parameters
    const { surveyId } = req.params;

    // Search for the survey by ID
    const survey = await SurveyModel.findById(surveyId);

    // Check if the survey exists
    if (!survey) {
      res.status(404).json({
        status: 'error',
        data: {
          message: 'Survey not found',
        },
      });
      return;
    }

    // Return the survey ID in the response
    res.status(200).json({
      status: 'success',
      data: {
        survey: {
          /**
           * Assume it is a string
           */
          _id: survey._id as string,
          title: survey.title,
          status: survey.status,
          creationDate: survey.creationDate,
          questions: survey.questions,
          rewardPoints: survey.rewardPoints,
        },
      },
    });
  } catch (error) {
    console.error('Error publishing survey:', error);
    res.status(500).json({
      status: 'error',
      data: {
        message: 'Internal server error',
      },
    });
  }
};
