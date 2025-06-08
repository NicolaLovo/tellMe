import { Request, Response } from 'express';
import { SurveyAnswerModel } from '../../../database/survey/SurveyAnswerSchema';
import { TmResponse } from '../../../types/common/utils/TmResponse';
import { SurveyAnswer } from '../../../types/survey/answer/SurveyAnswer';

interface ReqParams {
  surveyId: string;
  uid: string;
}

type ResBody = TmResponse<{}>;

interface ReqBody {
  surveyAnswer: SurveyAnswer;
}
export const createSurveyAnswerController = async (
  req: Request<ReqParams, ResBody, ReqBody>,
  res: Response<ResBody>,
): Promise<void> => {
  try {
    const { surveyAnswer } = req.body;
    console.log(surveyAnswer);

    const exists = await SurveyAnswerModel.findOne({
      '_id.surveyId': surveyAnswer._id.surveyId,
      '_id.uid': surveyAnswer._id.uid,
    });

    if (exists) {
      res.status(409).json({
        status: 'error',
        data: {
          message: 'User already answered this survey.',
        },
      });
      return;
    }

    const created = await SurveyAnswerModel.create(surveyAnswer);

    res.status(201).json({
      status: 'success',
      data: {},
    });
    return;
  } catch (error) {
    console.error('Error creating survey answer:', error);
    if (error instanceof Error) {
      res.status(500).json({
        status: 'error',
        data: {
          message: error.message,
        },
      });
      return;
    } else {
      res.status(500).json({
        status: 'error',
        data: {
          message: 'Internal server error',
        },
      });
      return;
    }
  }
};
