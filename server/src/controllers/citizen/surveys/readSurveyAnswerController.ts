import { Request, Response } from 'express';
import { SurveyAnswerModel } from '../../../database/survey/SurveyAnswerSchema';
import { TmResponse } from '../../../types/common/utils/TmResponse';
import { SurveyAnswer } from '../../../types/survey/answer/SurveyAnswer';

interface ReqParams {
  uid: string;
  surveyId: string;
}

type ResBody = TmResponse<{
  answer: SurveyAnswer;
}>;

/**
 * Controller to search for an answer of a certain survey, in order to understand wheter it was already answered by a user
 */
export const readSurveyAnswerController = async (
  req: Request<ReqParams, ResBody, {}>,
  res: Response<ResBody>,
): Promise<void> => {
  try {
    const surveyAnswerData = await SurveyAnswerModel.findOne({
      _id: {
        surveyId: req.params.surveyId,
        uid: req.params.uid,
      },
    });

    // Check if survey exists
    if (!surveyAnswerData) {
      res.status(404).json({
        status: 'error',
        data: {
          message: 'Survey answer not found',
        },
      });
      return;
    }

    // Return survey answer if successfull
    res.status(200).json({
      status: 'success',
      data: {
        answer: {
          _id: surveyAnswerData._id,
          creationDate: surveyAnswerData.creationDate,
          answers: surveyAnswerData.answers,
        },
      },
    });
    return;
  } catch (error) {
    console.error('Error fetching citizen surveys:', error);
    res.status(500).json({
      status: 'error',
      data: {
        message: 'Internal server error',
      },
    });
    return;
  }
};
