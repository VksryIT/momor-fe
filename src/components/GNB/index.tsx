import './styles.scss';

import authAPI from 'api/auth';
import { PageType } from 'App';
import Button from 'components/Button';
import React, { FC, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const GNB: FC = () => {
  const navigate = useNavigate();
  const [openUserTooltip, setOpenUserTooltip] = useState<boolean>(false);

  return (
    <div className="gnb">
      <span className="logo">MOMOR</span>
      <div className="user" onClick={() => setOpenUserTooltip((_open) => !_open)}>
        재영초이
        <AiFillCaretDown />
      </div>
      {openUserTooltip && (
        <div className="user_tooltip">
          <Button
            onClick={async () => {
              await authAPI.logout();
              navigate(PageType.LOGIN);
            }}
          >
            로그아웃
          </Button>
        </div>
      )}
    </div>
  );
};

export default GNB;
