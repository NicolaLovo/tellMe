import { Request, Response } from 'express';
import { SurveyAnswerModel } from '../../../database/survey/SurveyAnswerSchema';
import { SurveyModel } from '../../../database/survey/SurveySchema';
import { TmResponse } from '../../../types/common/utils/TmResponse';
import { Survey } from '../../../types/survey/Survey';

interface ReqQuery {
  /**
   * 0-based index of the first document in the current page.
   *
   * @default 0
   */
  pageIndex?: string;
  /**
   * Number of documents to include in the current page.
   *
   * @default 10
   */
  pageSize?: string;
}

type ResBody = TmResponse<{
  surveys: Survey[];
  metadata: {
    totalCount: number;
  };
}>;

export const listCitizenSurveysController = async (
  req: Request<
    {
      uid: string;
    },
    ResBody,
    {},
    ReqQuery
  >,
  res: Response<ResBody>,
): Promise<void> => {
  try {
    const uid = req.params.uid;
    const { pageIndex = '0', pageSize = '10' } = req.query;

    const page = parseInt(pageIndex, 10);
    const size = parseInt(pageSize, 10);

    if (isNaN(page) || isNaN(size) || page < 0 || size <= 0) {
      res.status(400).json({
        status: 'error',
        data: {
          message: 'Invalid pagination parameters',
        },
      });
      return;
    }

    // Get all survey IDs already answered by the user
    const answeredSurveyIds = await SurveyAnswerModel.find(
      {
        '_id.uid': uid,
      },
      'surveyId',
    ).exec();
    const answeredIdsSet = new Set(
      answeredSurveyIds.map((a) => a._id.surveyId.toString()),
    );

    // Get all published surveys NOT in answered list
    const filter = {
      status: 'published',
      _id: { $nin: Array.from(answeredIdsSet) },
    };

    const surveys = await SurveyModel.find(filter)
      .sort({ creationDate: -1 })
      .skip(page * size)
      .limit(size)
      .exec();

    const totalCount = await SurveyModel.countDocuments(filter).exec();

    res.status(200).json({
      status: 'success',
      data: {
        surveys: surveys as Survey[],
        metadata: {
          totalCount,
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
