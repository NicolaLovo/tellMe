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
  req: Request<{ id: string }, ResBody, ReqBody>,
  res: Response<ResBody>,
): Promise<void> => {
  try {
    // Extract the survey ID from the request parameters
    const { id } = req.params;

    // Search for the survey by ID
    const survey = await SurveyModel.findById(id);

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
    if (survey.status !== 'draft') {
      res.status(400).json({
        status: 'error',
        data: {
          message: 'Only surveys in draft status can be published',
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
    if (updateBody.title) {
      updateBody.title = req.body.survey.title;
    }
    if (updateBody.status) {
      updateBody.status = req.body.survey.status;
    }
    if (updateBody.questions) {
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
