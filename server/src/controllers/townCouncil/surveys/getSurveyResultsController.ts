import { Request, Response } from 'express';
import { SurveyAnswerModel } from '../../../database/survey/SurveyAnswerSchema';
import {
  SurveyModel,
  SurveyModelSchema,
} from '../../../database/survey/SurveySchema';
import { TmResponse } from '../../../types/common/utils/TmResponse';
import { SurveyQuestion } from '../../../types/survey/SurveyQuestion';
import { SurveyResult } from '../../../types/survey/SurveyResult';

type ResBody = TmResponse<{ surveyResults: SurveyResult }>;

type AggregatedResult = {
  _id: string;
  options: { optionId: string; votes: number }[];
};

type OptionResult = {
  optionId: string;
  optionText: string;
  votes: number;
};

type QuestionResult = {
  questionId: string;
  questionText: string;
  options: OptionResult[];
};

/**
 * Controller used to retrive the results of a survey
 */
export const getSurveyResultsController = async (
  req: Request<{ surveyId: string }, ResBody, {}>,
  res: Response<ResBody>,
): Promise<void> => {
  const { surveyId } = req.params;

  try {
    const survey = await SurveyModel.findById(surveyId).lean();

    if (!survey) {
      res.status(404).json({
        status: 'error',
        data: {
          message: 'Survey not found',
        },
      });
      return;
    }

    const typedSurvey = survey as SurveyModelSchema;

    // Aggregation of the answers to count votes for each option
    const aggregatedResults: AggregatedResult[] =
      await SurveyAnswerModel.aggregate([
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
      ]);

    // Mapping aggregated results to include question and option text

    const resultsWithText: QuestionResult[] = aggregatedResults
      .map((questionResult): QuestionResult | null => {
        const question = typedSurvey.questions.find(
          (q: SurveyQuestion) => q.id === questionResult._id,
        );

        if (!question) return null;

        const options: OptionResult[] = questionResult.options.map((opt) => {
          const matchedOption = question.options.find(
            (o) => o.id === opt.optionId,
          );

          return {
            optionId: opt.optionId,
            optionText: matchedOption?.text ?? 'Opzione non trovata',
            votes: opt.votes,
          };
        });

        return {
          questionId: question.id,
          questionText: question.question,
          options,
        };
      })
      .filter((q): q is QuestionResult => q !== null);

    // Construct the final response object containing survey results
    
    const responseBody: SurveyResult = {
      surveyId,
      surveyTitle: typedSurvey.title,
      results: resultsWithText,
    };

    res.status(200).json({
      status: 'success',
      data: {
        surveyResults: responseBody,
      },
    });
    return;
  } catch (error) {
    console.error('Error retrieving survey results:', error);
    res.status(500).json({
      status: 'error',
      data: {
        message: 'Internal server error',
      },
    });
    return;
  }
};
