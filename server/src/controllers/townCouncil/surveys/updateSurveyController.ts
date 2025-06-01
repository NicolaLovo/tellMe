import { Request, Response } from 'express';
import { SurveyModel } from '../../../database/survey/SurveySchema';
import { TmResponse } from '../../../types/common/utils/TmResponse';
import { Survey } from '../../../types/survey/Survey';

interface ReqBody {
  survey: Partial<Survey>;
}

type ResBody = TmResponse<{
  surveyId: string;
}>;

export const updateSurveyController = async (
  req: Request<{ surveyId: string }, ResBody, ReqBody>,
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

    // Check if the survey is a draft, if not return an error
    if (survey.status !== 'created' && req.body.survey.status === 'published') {
      res.status(400).json({
        status: 'error',
        data: {
          message: 'Only surveys in draft status can be published',
        },
      });
      return;
    }

    if (survey.status !== 'published' && req.body.survey.status === 'closed') {
      res.status(400).json({
        status: 'error',
        data: {
          message: 'Only surveys in published status can be closed',
        },
      });
      return;
    }

    const updateBody: Partial<Survey> = {};

    /**
     * Allow update only of the following fields:
     * - title
     * - status
     * - questions
     */
    if (req.body.survey.title) {
      updateBody.title = req.body.survey.title;
    }
    if (req.body.survey.status) {
      updateBody.status = req.body.survey.status;
    }
    if (req.body.survey.questions) {
      updateBody.questions = req.body.survey.questions;
    }

    /**
     * Update the survey with the provided data
     */
    await survey.updateOne({ $set: updateBody });

    // Return the survey ID in the response
    res.status(200).json({
      status: 'success',
      data: {
        surveyId: survey.id.toString(),
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
