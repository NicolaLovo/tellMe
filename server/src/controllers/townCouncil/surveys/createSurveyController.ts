import { Request, Response } from 'express';
import { SurveyModel } from '../../../database/survey/SurveySchema';
import { TmResponse } from '../../../types/common/utils/TmResponse';
import { Survey } from '../../../types/survey/Survey';

interface ReqBody {
  survey: Survey;
}

type ResBody = TmResponse<{
  surveyId: string;
}>;

/**
 * Controller for creating a new survey
 * Ensures the survey is correctly filled before saving it into the database
 * Returns the survey ID, if the save was successfull
 */
export const createSurveyController = async (
  req: Request<{}, ResBody, ReqBody>,
  res: Response<ResBody>,
) => {
  try {
    const { survey } = req.body;

    if (
      !survey?.title.trim() ||
      !survey?.status ||
      !Array.isArray(survey.questions) ||
      survey.questions.length === 0 ||
      typeof survey.rewardPoints !== 'number' ||
      survey.rewardPoints < 1
    ) {
      res.status(400).json({
        status: 'error',
        data: {
          message: 'Missing or invalid required fields',
        },
      });
      return;
    }

    // Validate each question
    for (const question of survey.questions) {
      if (!question.question?.trim()) {
        res.status(400).json({
          status: 'error',
          data: {
            message: 'Each question must have a non-empty question text',
          },
        });
        return;
      }

      // Validate multiple-choice question options
      if (question.type === 'multiple-choice') {
        if (
          !Array.isArray(question.options) ||
          question.options.length < 2 ||
          question.options.some((option) => !option.text?.trim())
        ) {
          res.status(400).json({
            status: 'error',
            data: {
              message:
                'Multiple-choice questions must have at least two options',
            },
          });
          return;
        }
      }
    }

    // Save the validated survey to the database
    const newSurvey = new SurveyModel({
      title: survey.title,
      rewardPoints: survey.rewardPoints,
      status: survey.status,
      questions: survey.questions,
      creationDate: new Date(),
    });
    await newSurvey.save();

    // Return the new survey ID if successfull
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
