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

    if (
      !survey?.title?.trim() ||
      !survey?.status ||
      !Array.isArray(survey.questions) ||
      survey.questions.length === 0
    ) {
      res.status(400).json({
        status: 'error',
        data: {
          message: 'Missing or invalid required fields',
        },
      });
    }

    // Controllo ogni domanda
    for (const question of survey.questions) {
      if (!question.question?.trim()) {
        res.status(400).json({
          status: 'error',
          data: {
            message: 'Each question must have a non-empty question text',
          },
        });
      }

      if (question.type === 'multiple-choice') {
        if (
          !Array.isArray(question.options) ||
          question.options.length === 0 ||
          question.options.some((option) => !option.text?.trim())
        ) {
          return res.status(400).json({
            status: 'error',
            data: {
              message:
                'Multiple-choice questions must have at least one option',
            },
          });
        }
      }
    }

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
