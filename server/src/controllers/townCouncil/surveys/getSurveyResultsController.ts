import { Request, Response } from 'express';
import { SurveyAnswerModel } from '../../../database/survey/SurveyAnswerSchema';

export const getSurveyResultsController = async (
  req: Request,
  res: Response,
) => {
  const { surveyId } = req.params;

  try {
    const results = await SurveyAnswerModel.aggregate([
      { $match: { '_id.surveyId': surveyId } },
      { $unwind: '$answers' },
      {
        $group: {
          _id: {
            questionId: '$answers.questionId',
            optionId: '$answers.optionId',
          },
          votes: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: '$_id.questionId',
          options: {
            $push: {
              optionId: '$_id.optionId',
              votes: '$votes',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          questionId: '$_id',
          options: 1,
        },
      },
    ]);

    res.json({ surveyId, results });
  } catch (error) {
    console.error('Errore nel recuperare i risultati del sondaggio:', error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
};
