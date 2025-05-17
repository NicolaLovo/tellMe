import { Request, Response } from 'express';
import { SurveyModel } from '../../database/survey/SurveySchema';
import { TmResponse } from '../../types/common/utils/TmResponse';

type ResBody = TmResponse<{
  surveyId: string;
}>;

export const publishSurveyController = async (
  req: Request<{ id: string }>,
  res: Response<ResBody>,
) => {
  try {
    // Extract the survey ID from the request parameters
    const { id } = req.params;

    // Search for the survey by ID
    const survey = await SurveyModel.findById(id);

    // Check if the survey exists
    if (!survey) {
      return res.status(404).json({
        status: 'error',
        data: {
          message: 'Survey not found',
        },
      });
    }

    // Check if the survey is a draft, if not return an error
    if (survey.status !== 'draft') {
      return res.status(400).json({
        status: 'error',
        data: {
          message: 'Only surveys in draft status can be published',
        },
      });
    }

    // Set status to published
    survey.status = 'published';
    await survey.save();

    // Return the survey ID in the response
    return res.status(200).json({
      status: 'success',
      data: {
        surveyId: survey.id.toString(),
      },
    });
  } catch (error) {
    console.error('Error publishing survey:', error);
    return res.status(500).json({
      status: 'error',
      data: {
        message: 'Internal server error',
      },
    });
  }
};
