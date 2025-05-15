import { Request, Response } from 'express';
import { SurveyModel } from '../../database/survey/SurveySchema';
import { TmResponse } from '../../types/common/utils/TmResponse';
import { Survey } from '../../types/survey/Survey';

interface ReqBody {
  survey: Survey;
}

type ResBody = TmResponse<{
  surveyId: string;
}>;

export const createSurveyController = async (
  req: Request<{}, ResBody, ReqBody>,
  res: Response<ResBody>,
) => {
  try {
    const { survey } = req.body;

    const newSurvey = new SurveyModel(survey);

    await newSurvey.save();

    res.status(200).json({
      status: 'success',
      data: {
        surveyId: newSurvey.id.toString(),
      },
    });
  } catch (error) {
    console.error('Error creating survey:', error);
    res.status(500).json({
      status: 'error',
      data: {
        message: 'Internal server error',
      },
    });
  }
};
