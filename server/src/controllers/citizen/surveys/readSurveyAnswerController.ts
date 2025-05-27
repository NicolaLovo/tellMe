import { Request, Response } from 'express';
import { TmResponse } from '../../../types/common/utils/TmResponse';

interface ReqParams {
  uid: string;
  surveyId: string;
}

type ResBody = TmResponse<{
  ciao: string;
}>;

export const readSurveyAnswerController = async (
  req: Request<{}, ResBody, ReqParams>,
  res: Response<ResBody>,
): Promise<void> => {
  try {
    console.log(req.params);

    res.status(200).json({
      status: 'success',
      data: {
        ciao: 'test',
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
