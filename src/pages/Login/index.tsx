import './index.scss';

import React, { FC } from 'react';

const Login: FC = () => {
  return (
    <>
      <div className="header">
        <span className="logo">NMCFE</span>
      </div>

      <div className="login_wrap">
        <ul className="menu_wrap">
          <li className="menu_item on">
            <span className="menu_text">ID 로그인</span>
          </li>
          <li className="menu_item menu_ones">
            <span className="menu_text">일회용 번호</span>
          </li>
          <li className="menu_item">
            <span className="menu_text">ID 로그인</span>
          </li>
        </ul>
        <div className="form_wrap">
          <div className="id_pw_wrap">
            <div className="input_row">
              <input type="text" className="input_text" placeholder="아이디" />
            </div>
            <div className="input_row">
              <input type="text" className="input_text" placeholder="비밀번호" />
            </div>
          </div>
          <div className="login_btn_wrap">
            <button type="submit" className="login_btn">
              <span className="btn_text">로그인</span>
            </button>
          </div>
        </div>
      </div>

      <div className="other_wrap">
        <span className="join">회원가입</span>
      </div>
    </>
  );
};

export default Login;
