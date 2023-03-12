import authAPI from 'api/auth';
import { LoginData } from 'api/auth/types';
import { onAPIError } from 'api/onAPIError';
import { PageType } from 'App';
import { UseFormReset } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export const useSignup = (reset: UseFormReset<LoginData>) => {
  const mutate = (data: LoginData) => {
    return authAPI.signup(data);
  };

  return useMutation(mutate, {
    onSuccess: () => {
      alert('회원가입이 완료되었습니다.');
    },
    onError: onAPIError({
      CONFLICT: () => {
        alert('이미 존재하는 ID입니다');
      },
    }),
    onSettled: () => {
      reset();
    },
  });
};

export const useLogin = (reset: UseFormReset<LoginData>) => {
  const navigate = useNavigate();

  const mutate = (data: LoginData) => {
    return authAPI.login(data);
  };

  return useMutation(mutate, {
    onSuccess: () => {
      navigate(PageType.MANAGE);
    },
    onError: onAPIError({
      NOT_FOUND: () => {
        alert('존재하지 않는 ID입니다.');
        reset();
      },
      UNPROCESSABLE_ENTITY: () => {
        alert('잘못된 비밀번호입니다.');
        reset({ password: '' });
      },
    }),
  });
};
