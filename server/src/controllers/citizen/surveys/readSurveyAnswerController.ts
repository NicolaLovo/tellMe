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

    if (!surveyAnswerData) {
      res.status(404).json({
        status: 'error',
        data: {
          message: 'Survey answer not found',
        },
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: {
        answer: {
          _id: surveyAnswerData._id,
          creationDate: surveyAnswerData.creationDate,
          answer: surveyAnswerData.answers,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching citizen surveys:', error);
    res.status(500).json({
      status: 'error',
      data: {
        message: 'Internal server error',
      },
    });
  }
};
