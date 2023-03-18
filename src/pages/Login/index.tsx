import './styles.scss';

import { LoginData } from 'api/auth/types';
import classNames from 'classnames';
import Button from 'components/Button';
import { useLogin, useSignup } from 'queries/AuthQuery';
import React, { FC, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { BiUser } from 'react-icons/bi';
import { Bs1Square } from 'react-icons/bs';
import { IoIosLogIn } from 'react-icons/io';
import { MdQrCode } from 'react-icons/md';
import { SlLock } from 'react-icons/sl';

enum FocusedField {
  NONE = 'NONE',
  USERNAME = 'USERNAME',
  PASSWORD = 'PASSWORD',
}

const Login: FC = () => {
  const {
    control,
    formState: { isValid },
    handleSubmit,
    register,
    reset,
  } = useForm<LoginData>({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const [username, password] = useWatch<LoginData>({ control, name: ['username', 'password'] });
  const [focusedField, setFocusedField] = useState<FocusedField>(FocusedField.NONE);
  const loginMutation = useLogin(reset);
  const signupMutation = useSignup(reset);

  const login = () => {
    loginMutation.mutate({ username, password });
  };

  const signup = async () => {
    signupMutation.mutate({ username, password });
  };

  return (
    <div className="login_page">
      <div className="header">
        <span className="logo">MOMOR</span>
      </div>

      <div className="login_wrap">
        <ul className="menu">
          <li className="menu_item on">
            <span className="menu_text">
              <IoIosLogIn />
              <span className="text">ID 로그인</span>
            </span>
          </li>
          <li className="menu_item menu_ones">
            <span className="menu_text">
              <Bs1Square />
              <span className="text">일회용 번호</span>
            </span>
          </li>
          <li className="menu_item">
            <span className="menu_text">
              <MdQrCode />
              <span className="text">QR 코드</span>
            </span>
          </li>
        </ul>

        <form onSubmit={handleSubmit(login)}>
          <div className="form_wrap">
            <div className="id_pw_wrap">
              <div
                className={classNames('input_row', {
                  focused: focusedField === FocusedField.USERNAME,
                })}
              >
                <BiUser />
                <input
                  {...register('username', {
                    required: true,
                  })}
                  type="text"
                  className={'input_text'}
                  placeholder="아이디"
                  onFocus={() => setFocusedField(FocusedField.USERNAME)}
                  onBlur={() => setFocusedField(FocusedField.NONE)}
                />
              </div>
              <div
                className={classNames('input_row', {
                  focused: focusedField === FocusedField.PASSWORD,
                })}
              >
                <SlLock />
                <input
                  {...register('password', {
                    required: true,
                  })}
                  type="text"
                  className={'input_text'}
                  placeholder="비밀번호"
                  onFocus={() => setFocusedField(FocusedField.PASSWORD)}
                  onBlur={() => setFocusedField(FocusedField.NONE)}
                />
              </div>
            </div>
            <input type="submit" hidden />

            <div className="login_btn_wrap">
              <Button className="login_btn" disabled={!isValid} onClick={login}>
                <span className="btn_text">로그인</span>
              </Button>
              <Button className="login_btn" disabled={!isValid} onClick={signup}>
                <span className="btn_text">회원가입</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
