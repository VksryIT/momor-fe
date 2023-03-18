import './styles.scss';

import { PageType } from 'App';
import classNames from 'classnames';
import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

const LNB: FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="lnb">
      <ul className="menu">
        <li className={classNames('menu_item')}>쓰기</li>
        <li className={classNames('menu_item')}>보고서</li>
        <li className={classNames('menu_item')}>예산쓰기</li>
        <li className={classNames('menu_item', { click: pathname === PageType.MANAGE })}>
          통장관리
        </li>
      </ul>
    </div>
  );
};

export default LNB;
