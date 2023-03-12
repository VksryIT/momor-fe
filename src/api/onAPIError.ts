import { AxiosError } from 'axios';

import { APIResponse } from './API';

const mapper = {
  404: 'NOT_FOUND',
  409: 'CONFLICT',
  422: 'UNPROCESSABLE_ENTITY',
} as const;

type Mapper = typeof mapper;
type ErrorStatus = keyof Mapper;
type ErrorCode = Mapper[keyof Mapper];

type ErrorHandler = {
  [key in ErrorCode]?: () => void | Promise<void>;
};

export const onAPIError = (handler: ErrorHandler) => (error: AxiosError) => {
  const status = (error.response?.data as APIResponse).status as ErrorStatus;

  handler[mapper[status]]?.();
};
