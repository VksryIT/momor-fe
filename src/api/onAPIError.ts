import { AxiosError } from 'axios';

import { APIError } from './API';

type ErrorHandler = Record<string, () => void | Promise<void>>;

export const onAPIError = (handler: ErrorHandler) => (error: AxiosError) => {
  const status = (error.response?.data as APIError).code || '';

  handler[status]?.();
};
