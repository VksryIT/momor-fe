import './styles.scss';

import GNB from 'components/GNB';
import LNB from 'components/LNB';
import React, { FC, ReactNode } from 'react';

interface PageProps {
  children: ReactNode;
}

const Page: FC<PageProps> = ({ children }) => {
  return (
    <>
      <GNB />
      <LNB />
      <div className="contents">{children}</div>
    </>
  );
};

export default Page;
