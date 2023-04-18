import authAPI from 'api/auth';
import { onAPIError } from 'api/onAPIError';
import { PageType } from 'App';
import { UseFormReset } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { UserAuthData } from 'types/auth';

export const useSignup = (reset: UseFormReset<UserAuthData>) => {
  const mutate = (data: UserAuthData) => {
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

export const useLogin = (reset: UseFormReset<UserAuthData>) => {
  const navigate = useNavigate();

  const mutate = (data: UserAuthData) => {
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

export const useLogout = () => {
  const mutate = () => {
    return authAPI.logout();
  };

  return useMutation(mutate);
};
