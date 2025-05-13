import { TmErrorResponse } from '@/types/common/utils/TmResponse'

export const HTTP_TMRESPONSES: {
  error: TmErrorResponse
} = {
  error: {
    status: 'error',
    data: {
      message: 'Error in HTTP request',
    },
  },
}
